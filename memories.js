(() => {
  const form = document.querySelector("#memory-form");
  const list = document.querySelector("#memory-list");
  if (!form || !list) return;

  const storageKey = "ask-her-out-memories-v1";
  const starterEntries = Array.isArray(window.SITE_MEMORIES) ? window.SITE_MEMORIES : [];
  const labels = { story: "Story", event: "Special event", memory: "Special memory" };
  const fields = {
    id: document.querySelector("#memory-id"),
    type: document.querySelector("#memory-type"),
    title: document.querySelector("#memory-title"),
    date: document.querySelector("#memory-date"),
    story: document.querySelector("#memory-story")
  };
  const submitButton = document.querySelector("#memory-submit");
  const cancelButton = document.querySelector("#memory-cancel");
  const status = document.querySelector("#memory-status");
  let entries = loadEntries();

  function copyStarters() {
    return starterEntries.map((entry, index) => ({
      id: `starter-${index + 1}`,
      type: labels[entry.type] ? entry.type : "memory",
      title: String(entry.title || "A favorite moment"),
      date: String(entry.date || ""),
      story: String(entry.story || "")
    }));
  }

  function loadEntries() {
    try {
      const saved = window.localStorage.getItem(storageKey);
      if (saved !== null) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (error) {
      // Private browsing or a restricted browser may disable local storage.
    }
    return copyStarters();
  }

  function saveEntries() {
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(entries));
      status.textContent = "Saved in this browser.";
    } catch (error) {
      status.textContent = "Your changes are shown for now, but this browser could not save them.";
    }
  }

  function formatDate(value) {
    if (!value) return "";
    const date = new Date(`${value}T00:00:00`);
    return Number.isNaN(date.getTime()) ? value : new Intl.DateTimeFormat(undefined, { dateStyle: "long" }).format(date);
  }

  function render() {
    list.replaceChildren();
    if (entries.length === 0) {
      const empty = document.createElement("p");
      empty.className = "memory-empty";
      empty.textContent = "Your collection is ready for its first story.";
      list.append(empty);
      return;
    }

    entries.forEach((entry) => {
      const card = document.createElement("article");
      card.className = "memory-card";
      const heading = document.createElement("div");
      heading.className = "memory-card-heading";
      const type = document.createElement("span");
      type.className = `memory-tag memory-tag-${labels[entry.type] ? entry.type : "memory"}`;
      type.textContent = labels[entry.type] || labels.memory;
      heading.append(type);
      const dateText = formatDate(entry.date);
      if (dateText) {
        const date = document.createElement("time");
        date.dateTime = entry.date;
        date.textContent = dateText;
        heading.append(date);
      }
      const title = document.createElement("h3");
      title.textContent = entry.title;
      const story = document.createElement("p");
      story.textContent = entry.story;
      const actions = document.createElement("div");
      actions.className = "memory-card-actions";
      const edit = document.createElement("button");
      edit.className = "text-button";
      edit.type = "button";
      edit.textContent = "Edit";
      edit.setAttribute("aria-label", `Edit ${entry.title}`);
      edit.addEventListener("click", () => startEdit(entry));
      const remove = document.createElement("button");
      remove.className = "text-button memory-delete";
      remove.type = "button";
      remove.textContent = "Remove";
      remove.setAttribute("aria-label", `Remove ${entry.title}`);
      remove.addEventListener("click", () => {
        entries = entries.filter((item) => item.id !== entry.id);
        saveEntries();
        render();
      });
      actions.append(edit, remove);
      card.append(heading, title, story, actions);
      list.append(card);
    });
  }

  function clearForm() {
    form.reset();
    fields.id.value = "";
    submitButton.innerHTML = 'Save to our collection <span aria-hidden="true">♥</span>';
    cancelButton.hidden = true;
  }

  function startEdit(entry) {
    fields.id.value = entry.id;
    fields.type.value = entry.type;
    fields.title.value = entry.title;
    fields.date.value = entry.date || "";
    fields.story.value = entry.story;
    submitButton.textContent = "Save changes";
    cancelButton.hidden = false;
    fields.title.focus();
    form.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const next = {
      id: fields.id.value || `memory-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      type: fields.type.value,
      title: fields.title.value.trim(),
      date: fields.date.value,
      story: fields.story.value.trim()
    };
    if (!next.title || !next.story) return;
    const existingIndex = entries.findIndex((entry) => entry.id === next.id);
    if (existingIndex >= 0) entries[existingIndex] = next;
    else entries.unshift(next);
    saveEntries();
    render();
    clearForm();
    status.textContent = existingIndex >= 0 ? "Your changes have been saved." : "Added to your collection.";
  });

  cancelButton.addEventListener("click", clearForm);
  document.querySelector("#memory-reset").addEventListener("click", () => {
    entries = copyStarters();
    saveEntries();
    render();
    clearForm();
    status.textContent = "Starter entries restored.";
  });

  render();
})();

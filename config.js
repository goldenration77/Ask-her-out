// Forkers can edit these values in one place to personalize their copy.
window.SITE_NAMES = {
  recipient: "[Recipient Name]",
  sender: "[Your Name]"
};

// Starter stories, events, and memories. Edit, remove, or add entries here.
// Visitors can also personalize the list in their browser; those changes are
// saved locally and do not change the files in your repository.
window.SITE_MEMORIES = [
  {
    type: "memory",
    title: "A little moment I love",
    date: "",
    story: "The conversations that run longer than planned, the laughter over something silly, and how easy it feels to be myself around you."
  },
  {
    type: "event",
    title: "Our next little adventure",
    date: "",
    story: "A new place to explore, something delicious to share, and plenty of time to enjoy the day together."
  },
  {
    type: "story",
    title: "A favorite kind of day",
    date: "",
    story: "No big plans—just good company, a favorite song, and one of those ordinary days that somehow becomes special."
  }
];

document.querySelectorAll("[data-name]").forEach((element) => {
  const name = window.SITE_NAMES[element.dataset.name];
  if (name) element.textContent = name;
});

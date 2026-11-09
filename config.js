// Forkers can edit these values in one place to personalize their copy.
window.SITE_NAMES = {
  recipient: "[Recipient Name]",
  sender: "[Your Name]"
};

document.querySelectorAll("[data-name]").forEach((element) => {
  const name = window.SITE_NAMES[element.dataset.name];
  if (name) element.textContent = name;
});

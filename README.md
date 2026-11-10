# Ask-out

## Personalize the names

Edit `config.js` and replace `[Recipient Name]` and `[Your Name]`. The recipient name appears on the main page; the sender name is shared across the main page and the follow-up pages.

## Add stories, events, and memories

Edit the `window.SITE_MEMORIES` array in `config.js` to change the starter collection that ships with your fork. Each entry has a `type` (`story`, `event`, or `memory`), a `title`, an optional `date` in `YYYY-MM-DD` format, and a `story` description. Add, remove, or rewrite entries to make them your own.

Open `memories.html` to manage the collection in the browser: visitors can add entries, edit the starter entries, or remove them. Browser edits are saved to local storage on that device and are not committed back to the repository. Use **Restore starter entries** to return to the version in `config.js`.

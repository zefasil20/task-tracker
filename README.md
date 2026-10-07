# Task Tracker

A lightweight, responsive task tracker built with vanilla HTML, CSS, and JavaScript.

## Features

- Add a task by entering a description and pressing Enter or the add button.
- Mark tasks as complete; completed tasks move to the end of the list and appear with strikethrough text.
- Unmark completed tasks to return them to the pending list.
- Delete tasks from the list.
- View the number of pending tasks.
- Use the tracker with a keyboard or screen reader.

## Run locally

No installation or build step is required. Open `index.html` in a web browser.

The project files are:

- `index.html` - page structure and links to the stylesheet and script.
- `styles.css` - layout, visual styles, and responsive behavior.
- `script.js` - task state, rendering, and interaction handlers.

## Data storage

Tasks are stored in a JavaScript array while the page is open. Reloading the page clears the list.

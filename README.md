# jdfigueroa.com

Portfolio of Juan David Figueroa: plain HTML, CSS and JavaScript, hosted on GitHub Pages.

## Making changes
- **With Claude:** open a chat, attach this repository and describe what you want changed, e.g. "add a new project called X with these images" or "make the nav text bigger". Claude edits the files and pushes them, and the site updates about a minute later. `CLAUDE.md` explains the site's structure to Claude.
- **By hand:** edit files on github.com (pencil icon) or locally, then commit to `main`.

## Preview locally
```
python3 -m http.server 8000
```
Then open http://localhost:8000

## Structure
| Path | What it is |
| --- | --- |
| `index.html` | Home page |
| `archive.html` | Archive list |
| `work/*.html` | Project pages |
| `assets/css/style.css` | Styles |
| `assets/js/site.js` | Interactions |
| `assets/media/` | Images |
| `tools/` | One-time image import from Cargo |

## Fonts
The site uses Inter and JetBrains Mono. Cargo's Diatype license only covers Cargo-hosted sites. See `assets/css/fonts.css` to add Diatype if you license it from Dinamo.

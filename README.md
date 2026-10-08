# HTML/CSS to Image — MohamedTechTurf

A client-side HTML and CSS image converter built with plain HTML, CSS and JavaScript.

## Features

- Upload HTML, XHTML, or plain-text markup (`.html`, `.htm`, `.xhtml`, `.txt`).
- Optionally upload a CSS or plain-text stylesheet (`.css`, `.txt`).
- Preview updates automatically whenever a source file is loaded.
- Live preview in a sandboxed iframe.
- Select a specific DOM element as the export target.
- Export to PNG, JPEG, WEBP, BMP, or SVG.
- SVG exports contain an embedded PNG; BMP is an opaque bitmap.
- Theme follows the operating-system setting by default, with a persistent manual toggle.
- Transparent PNG/WEBP/SVG backgrounds.
- Solid background color for non-transparent exports.
- 1×, 2×, 3× and 4× output scale.
- JPEG/WEBP quality control.
- No backend and no file uploads.
- Self-contained coastal field-guide demo.
- Responsive light and dark interfaces branded for MohamedTechTurf.

## Run

Open `index.html` in a modern Chromium-based browser such as Google Chrome or Microsoft Edge. The renderer is bundled locally in `vendor/html2canvas.min.js`.

The renderer is bundled locally in `vendor/html2canvas.min.js`. External images must allow CORS to appear in exports; browser security prevents exporting images from servers that do not allow it.

## Files

- `index.html` — app structure
- `styles.css` — UI styling
- `script.js` — uploader, preview, selection and rasterization logic

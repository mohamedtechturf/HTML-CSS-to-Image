(() => {
  "use strict";

  const $ = (id) => document.getElementById(id);
  const htmlInput = $("htmlInput");
  const cssInput = $("cssInput");
  const htmlDropzone = $("htmlDropzone");
  const cssDropzone = $("cssDropzone");
  const htmlFileName = $("htmlFileName");
  const cssFileName = $("cssFileName");
  const previewStage = $("previewStage");
  const previewFrame = $("previewFrame");
  const emptyState = $("emptyState");
  const selectOverlay = $("selectOverlay");
  const selectToolBtn = $("selectToolBtn");
  const refreshBtn = $("refreshBtn");
  const clearBtn = $("clearBtn");
  const loadDemoBtn = $("loadDemoBtn");
  const themeToggle = $("themeToggle");
  const themeIcon = $("themeIcon");
  const themeLabel = $("themeLabel");
  const themeColorMeta = document.querySelector('meta[name="theme-color"]');
  const downloadBtn = $("downloadBtn");
  const formatSelect = $("formatSelect");
  const scaleSelect = $("scaleSelect");
  const transparentToggle = $("transparentToggle");
  const backgroundColor = $("backgroundColor");
  const backgroundHex = $("backgroundHex");
  const backgroundField = $("backgroundField");
  const qualityRange = $("qualityRange");
  const qualityValue = $("qualityValue");
  const dimensionLabel = $("dimensionLabel");
  const alphaHint = $("alphaHint");
  const selectionLabel = $("selectionLabel");
  const selectedPath = $("selectedPath");
  const status = $("status");
  const statusText = $("statusText");
  const targetButtons = [...document.querySelectorAll(".segment")];

  let htmlSource = "";
  let cssSource = "";
  let selectedElement = null;
  let selectMode = true;
  let targetMode = "viewport";
  let renderTimer = null;
  let renderVersion = 0;
  let themePreference = null;
  const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");

  try {
    const savedTheme = localStorage.getItem("html-css-image-theme");
    if (savedTheme === "light" || savedTheme === "dark") themePreference = savedTheme;
  } catch {}

  const demoHtml = `<!doctype html>
<html lang="en">
<head><meta charset="UTF-8"><title>Tideline Field Notes</title></head>
<body>
  <main class="field-guide">
    <header class="guide-header"><span>TIDELINE <i>FIELD NOTES</i></span><span>ISSUE 08 <b>·</b> PACIFIC COAST</span></header>
    <section class="guide-hero">
      <div class="guide-copy">
        <div class="guide-kicker"><span></span> A WEEKEND OUTSIDE</div>
        <h1>Follow<br>the <em>coast.</em></h1>
        <p>A slower route through salt air, open water, and the small places worth pulling over for.</p>
        <div class="guide-byline"><span>CURATED ROUTE</span><b>36° 37' N &nbsp; 121° 55' W</b></div>
      </div>
      <figure class="coast-illustration" aria-label="Illustrated California coastline">
        <svg viewBox="0 0 620 540" role="img" aria-hidden="true">
          <rect width="620" height="540" fill="#d5e8e0"/>
          <path d="M0 0h365c-24 55-44 97-42 145 2 43 34 77 26 121-7 39-47 65-45 111 1 49 54 91 43 163H0z" fill="#edc38e"/>
          <path d="M0 0h244c-30 69-55 108-46 157 7 43 41 71 32 112-8 40-51 71-48 117 3 53 55 91 44 154H0z" fill="#f5e3bf"/>
          <path d="M365 0c-24 55-44 97-42 145 2 43 34 77 26 121-7 39-47 65-45 111 1 49 54 91 43 163" fill="none" stroke="#fffaf0" stroke-width="8"/>
          <path d="M414 0c-24 60-43 106-35 151 9 48 38 81 29 123-8 39-44 74-39 119 5 46 49 87 38 147" fill="none" stroke="#a9cfc3" stroke-width="2"/>
          <path d="M482 0c-26 62-39 108-31 158 8 50 33 82 24 126-8 41-37 70-32 115 5 47 40 87 30 141" fill="none" stroke="#a9cfc3" stroke-width="2"/>
          <path d="M548 0c-29 70-38 116-26 165 12 47 30 83 21 124-8 40-28 73-24 115 4 44 28 84 21 136" fill="none" stroke="#a9cfc3" stroke-width="2"/>
          <path d="M85 472l64-118 45 34 58-105 62 189" fill="#607f69"/>
          <path d="M126 472l47-86 31 22 47-84 52 148" fill="#79977b"/>
          <path d="M72 456c52-21 82-20 120-5 27 11 56 11 91-1" fill="none" stroke="#f5f0df" stroke-width="4"/>
          <circle cx="487" cy="84" r="30" fill="#d98250"/>
          <path d="M423 85h128M430 101h111M443 117h84" stroke="#fffaf0" stroke-opacity=".72" stroke-width="2"/>
          <path d="M355 302l14-18 14 18-14 18z" fill="#d98250" stroke="#fffaf0" stroke-width="3"/>
          <circle cx="369" cy="302" r="4" fill="#fffaf0"/>
          <text x="391" y="298" fill="#36594e" font-size="13" font-family="sans-serif" letter-spacing="2">POINT SUR</text>
          <text x="391" y="317" fill="#607f69" font-size="10" font-family="sans-serif" letter-spacing="1">STOP 04</text>
        </svg>
        <figcaption>BIG SUR, CALIFORNIA <span>36.2704° N</span></figcaption>
      </figure>
    </section>
    <section class="route-strip">
      <div><strong>03</strong><span>DAYS OUT</span></div>
      <div><strong>07</strong><span>COASTAL STOPS</span></div>
      <div><strong>82 <small>mi</small></strong><span>SCENIC ROUTE</span></div>
      <p>Leave room for the unplanned turn.</p>
    </section>
    <footer class="guide-footer"><span>FIELD GUIDE No. 08</span><span>MADE FOR THE LONG WAY ROUND <b>↗</b></span></footer>
  </main>
</body>
</html>`;

  const demoCss = `
* { box-sizing: border-box; }
html, body { min-height: 100%; margin: 0; font-family: Arial, sans-serif; }
body { min-height: 100vh; padding: 34px; color: #18372f; background: #f3efe5; }
.field-guide { width: min(100%, 1040px); margin: 0 auto; padding: 36px 42px 24px; background: #fffdf6; box-shadow: 0 18px 54px rgba(31,54,43,.12); }
.guide-header, .guide-footer { display: flex; align-items: center; justify-content: space-between; gap: 16px; font-size: 10px; font-weight: 700; letter-spacing: 2px; }
.guide-header { padding-bottom: 18px; border-bottom: 1px solid #d8dfd4; }
.guide-header i { color: #6e8977; font-style: normal; }
.guide-header b, .guide-footer b { color: #d98250; }
.guide-hero { display: grid; grid-template-columns: .82fr 1.18fr; align-items: center; gap: 34px; padding: 32px 0; }
.guide-copy { padding: 10px 0; }
.guide-kicker { display: flex; align-items: center; gap: 8px; color: #65816f; font-size: 10px; font-weight: 700; letter-spacing: 1.6px; }
.guide-kicker span { width: 20px; height: 2px; background: #d98250; }
.guide-copy h1 { margin: 20px 0 14px; font-family: Georgia, serif; font-size: clamp(56px,8vw,94px); font-weight: 400; line-height: .86; letter-spacing: -4px; }
.guide-copy h1 em { color: #d98250; font-weight: 400; }
.guide-copy p { max-width: 310px; margin: 0; color: #68776d; font-family: Georgia, serif; font-size: 16px; line-height: 1.55; }
.guide-byline { display: grid; gap: 5px; margin-top: 30px; padding-top: 13px; border-top: 1px solid #d8dfd4; font-size: 9px; letter-spacing: 1px; }
.guide-byline span { color: #7c8d80; }
.guide-byline b { font-size: 10px; letter-spacing: 1px; }
.coast-illustration { position: relative; margin: 0; overflow: hidden; background: #d5e8e0; }
.coast-illustration svg { display: block; width: 100%; height: auto; }
.coast-illustration figcaption { position: absolute; right: 12px; bottom: 12px; left: 12px; display: flex; justify-content: space-between; padding: 9px 11px; color: #315b4d; background: #fffdf6; font-size: 9px; font-weight: 700; letter-spacing: 1px; }
.coast-illustration figcaption span { color: #d98250; }
.route-strip { display: grid; grid-template-columns: repeat(3,auto) 1fr; align-items: center; gap: 24px; padding: 17px 0; border-top: 1px solid #d8dfd4; border-bottom: 1px solid #d8dfd4; }
.route-strip div { display: grid; gap: 3px; }
.route-strip strong { font-family: Georgia, serif; font-size: 25px; font-weight: 400; }
.route-strip small { font-size: 15px; }
.route-strip span { color: #7c8d80; font-size: 8px; font-weight: 700; letter-spacing: 1px; }
.route-strip p { justify-self: end; margin: 0; color: #d98250; font-family: Georgia, serif; font-size: 14px; font-style: italic; }
.guide-footer { padding-top: 17px; color: #72847a; font-size: 8px; letter-spacing: 1.4px; }
@media (max-width: 680px) {
  body { padding: 12px; }
  .field-guide { padding: 24px 20px 17px; }
  .guide-header, .guide-footer { font-size: 8px; letter-spacing: 1px; }
  .guide-hero { grid-template-columns: 1fr; gap: 22px; padding: 25px 0; }
  .guide-copy h1 { font-size: 64px; }
  .guide-copy p { max-width: 360px; }
  .guide-byline { margin-top: 19px; }
  .coast-illustration { max-width: 480px; }
  .route-strip { grid-template-columns: repeat(3,1fr); gap: 10px; }
  .route-strip p { grid-column: 1/-1; justify-self: start; }
  .guide-footer span:last-child { text-align: right; }
}`;

  function setStatus(message, type = "") {
    status.className = "status" + (type ? " " + type : "");
    statusText.textContent = message;
  }

  function applyTheme() {
    const dark = themePreference ? themePreference === "dark" : systemTheme.matches;
    const theme = dark ? "dark" : "light";
    document.documentElement.dataset.theme = theme;
    themeIcon.textContent = dark ? "☀" : "☾";
    themeLabel.textContent = dark ? "Light" : "Dark";
    themeToggle.setAttribute("aria-label", `Switch to ${dark ? "light" : "dark"} theme`);
    themeToggle.setAttribute("aria-pressed", String(dark));
    themeToggle.title = `Switch to ${dark ? "light" : "dark"} theme`;
    themeColorMeta.content = dark ? "#17221d" : "#f2f5f1";
    syncTransparencyPreview();
  }

  function updateFormatControls() {
    const format = formatSelect.value;
    const supportsTransparency = ["png", "webp", "svg"].includes(format);
    const supportsQuality = ["jpeg", "webp"].includes(format);
    if (!supportsTransparency) transparentToggle.checked = false;
    transparentToggle.disabled = !supportsTransparency;
    qualityRange.disabled = !supportsQuality;
    qualityRange.closest(".field").classList.toggle("is-disabled", !supportsQuality);
    const backgroundDisabled = supportsTransparency && transparentToggle.checked;
    backgroundField.classList.toggle("is-disabled", backgroundDisabled);
    previewStage.classList.toggle("alpha-preview", backgroundDisabled);
    alphaHint.hidden = !backgroundDisabled;
    syncTransparencyPreview();
  }

  function syncTransparencyPreview() {
    const doc = previewFrame.contentDocument;
    const previewStyle = doc?.getElementById("mtif-transparency-preview");
    if (!previewStyle) return;
    const alphaPreview = ["png", "webp", "svg"].includes(formatSelect.value) && transparentToggle.checked;
    if (!alphaPreview) {
      previewStyle.textContent = "";
      return;
    }

    const stageStyle = getComputedStyle(previewStage);
    const stage = stageStyle.getPropertyValue("--stage").trim();
    const checker = stageStyle.getPropertyValue("--checker").trim();
    const bodyStyle = getComputedStyle(doc.body);
    const translucentColor = bodyStyle.backgroundColor.match(/^rgba\([^,]+,[^,]+,[^,]+,\s*([\d.]+)\s*\)$/i);
    const hasTransparentColor = bodyStyle.backgroundColor === "transparent" || (translucentColor && Number(translucentColor[1]) < 1);
    if (bodyStyle.backgroundImage === "none" && !hasTransparentColor) {
      previewStyle.textContent = "";
      return;
    }
    const checkerLayers = `linear-gradient(45deg,${checker} 25%,transparent 25%,transparent 75%,${checker} 75%),linear-gradient(45deg,${checker} 25%,transparent 25%,transparent 75%,${checker} 75%)`;
    const backgroundImage = bodyStyle.backgroundImage === "none"
      ? checkerLayers
      : `${bodyStyle.backgroundImage},${checkerLayers}`;
    const backgroundPosition = bodyStyle.backgroundImage === "none"
      ? "0 0,10px 10px"
      : `${bodyStyle.backgroundPosition},0 0,10px 10px`;
    const backgroundSize = bodyStyle.backgroundImage === "none"
      ? "20px 20px"
      : `${bodyStyle.backgroundSize},20px 20px,20px 20px`;
    const backgroundRepeat = bodyStyle.backgroundImage === "none"
      ? "repeat"
      : `${bodyStyle.backgroundRepeat},repeat,repeat`;
    previewStyle.textContent = `body { background-color:${bodyStyle.backgroundColor} !important; background-image:${backgroundImage} !important; background-position:${backgroundPosition} !important; background-size:${backgroundSize} !important; background-repeat:${backgroundRepeat} !important; }`;
  }

  function readFile(file) {
    return new Promise((resolve, reject) => {
      if (!file) return resolve("");
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result || ""));
      reader.onerror = () => reject(new Error("Could not read the file."));
      reader.readAsText(file);
    });
  }

  async function loadSourceFile(input, file, nameEl, acceptCheck) {
    if (!file) return;
    if (!acceptCheck(file)) {
      setStatus("Choose a supported markup or stylesheet file.", "error");
      return;
    }
    try {
      const text = await readFile(file);
      if (input === htmlInput) htmlSource = text;
      else cssSource = text;
      nameEl.textContent = file.name;
      if (htmlSource.trim()) renderPreview();
      else setStatus("Stylesheet loaded. Add a markup file to build the preview.", "success");
    } catch (err) {
      setStatus(err.message, "error");
    }
  }

  function setupDropzone(zone, input, nameEl, acceptCheck) {
    zone.addEventListener("click", () => input.click());
    zone.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        input.click();
      }
    });
    input.addEventListener("change", () => loadSourceFile(input, input.files?.[0], nameEl, acceptCheck));

    ["dragenter", "dragover"].forEach(type => zone.addEventListener(type, (e) => {
      e.preventDefault();
      zone.classList.add("dragging");
    }));
    ["dragleave", "drop"].forEach(type => zone.addEventListener(type, (e) => {
      e.preventDefault();
      zone.classList.remove("dragging");
    }));
    zone.addEventListener("drop", e => {
      const file = e.dataTransfer.files?.[0];
      loadSourceFile(input, file, nameEl, acceptCheck);
    });
  }

  setupDropzone(
    htmlDropzone,
    htmlInput,
    htmlFileName,
    file => ["text/html", "application/xhtml+xml", "text/plain"].includes(file.type) || /\.(html?|xhtml|txt)$/i.test(file.name)
  );
  setupDropzone(
    cssDropzone,
    cssInput,
    cssFileName,
    file => ["text/css", "text/plain"].includes(file.type) || /\.(css|txt)$/i.test(file.name)
  );

  function normalizeHtml(html, css) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html || "<!doctype html><html><head></head><body></body></html>", "text/html");

    doc.querySelectorAll("script").forEach(s => s.remove());
    doc.querySelectorAll('link[rel="stylesheet"]').forEach(link => link.remove());

    if (css.trim()) {
      const style = doc.createElement("style");
      style.setAttribute("data-converter-css", "");
      style.textContent = css;
      doc.head.appendChild(style);
    }

    const base = doc.createElement("base");
    base.href = window.location.href;
    doc.head.prepend(base);

    const safety = doc.createElement("style");
    safety.textContent = `
      html { background: transparent !important; }
      body { margin: 0; }
      img { max-width: none; }
      [data-mtif-selected] { outline: 0 !important; }
    `;
    doc.head.appendChild(safety);

    const transparencyPreview = doc.createElement("style");
    transparencyPreview.id = "mtif-transparency-preview";
    doc.head.appendChild(transparencyPreview);

    return "<!doctype html>" + doc.documentElement.outerHTML;
  }

  function renderPreview() {
    if (!htmlSource.trim()) {
      setStatus("Upload an HTML file first.", "error");
      return;
    }

    const version = ++renderVersion;
    downloadBtn.disabled = true;
    setStatus("Updating preview…");
    selectedElement = null;
    selectOverlay.hidden = true;
    selectedPath.textContent = "";
    selectionLabel.textContent = "Nothing selected";
    targetMode = "viewport";
    targetButtons.forEach(button => button.classList.toggle("active", button.dataset.target === targetMode));

    previewStage.classList.add("ready");
    emptyState.style.display = "none";

    previewFrame.onload = () => {
      if (version !== renderVersion) return;
      updateDimensions();
      bindSelection();
      syncTransparencyPreview();
      downloadBtn.disabled = false;
      setStatus("Preview updated. Select an element or export the page.", "success");
    };

    previewFrame.srcdoc = normalizeHtml(htmlSource, cssSource);
  }

  function bindSelection() {
    const doc = previewFrame.contentDocument;
    if (!doc) return;

    const handler = (e) => {
      if (!selectMode) return;
      const target = e.target;
      if (!target || target.nodeType !== Node.ELEMENT_NODE) return;
      e.preventDefault();
      e.stopPropagation();

      if (selectedElement) selectedElement.removeAttribute("data-mtif-selected");
      selectedElement = target;
      selectedElement.setAttribute("data-mtif-selected", "true");

      const rect = target.getBoundingClientRect();
      const frameRect = previewFrame.getBoundingClientRect();
      const stageRect = previewStage.getBoundingClientRect();
      const left = frameRect.left - stageRect.left + rect.left;
      const top = frameRect.top - stageRect.top + rect.top;
      selectOverlay.style.left = `${left + previewStage.scrollLeft}px`;
      selectOverlay.style.top = `${top + previewStage.scrollTop}px`;
      selectOverlay.style.width = `${Math.max(rect.width, 2)}px`;
      selectOverlay.style.height = `${Math.max(rect.height, 2)}px`;
      selectOverlay.hidden = false;

      const path = elementPath(target);
      selectedPath.textContent = path;
      selectionLabel.textContent = `${target.tagName.toLowerCase()} selected`;
      setStatus("Element selected. Export target is ready.", "success");
    };

    doc.addEventListener("click", handler, true);
    doc.addEventListener("submit", e => e.preventDefault(), true);
    doc.addEventListener("dragstart", e => e.preventDefault(), true);
    updateDimensions();
  }

  function elementPath(el) {
    const parts = [];
    let cur = el;
    while (cur && cur.nodeType === 1 && cur !== previewFrame.contentDocument.documentElement) {
      let part = cur.tagName.toLowerCase();
      if (cur.id) part += "#" + cur.id;
      else {
        const cls = [...cur.classList].slice(0, 2);
        if (cls.length) part += "." + cls.join(".");
      }
      parts.unshift(part);
      cur = cur.parentElement;
      if (parts.length >= 4) break;
    }
    return parts.join(" > ");
  }

  function updateDimensions() {
    if (!previewFrame.contentDocument) return;
    const doc = previewFrame.contentDocument;
    const root = doc.documentElement;
    const body = doc.body;
    const width = Math.max(root?.scrollWidth || 0, root?.clientWidth || 0, body?.scrollWidth || 0, body?.clientWidth || 0);
    const height = Math.max(root?.scrollHeight || 0, root?.clientHeight || 0, body?.scrollHeight || 0, body?.clientHeight || 0);
    dimensionLabel.textContent = `${width || 0} × ${height || 0} px`;
  }

  function toggleSelectionMode() {
    selectMode = !selectMode;
    selectToolBtn.classList.toggle("active", selectMode);
    selectToolBtn.textContent = selectMode ? "Select element" : "Selection locked";
    previewFrame.style.cursor = selectMode ? "crosshair" : "default";
  }

  async function exportImage() {
    if (!previewFrame.contentDocument?.documentElement) {
      setStatus("Choose a markup file before exporting.", "error");
      return;
    }

    downloadBtn.disabled = true;
    setStatus("Rendering image…");
    try {
      const format = formatSelect.value;
      const {canvas, width, height} = await rasterize(format);
      const quality = Number(qualityRange.value) / 100;
      const blob = await createExportBlob(canvas, format, quality);
      const suffix = format === "jpeg" ? "jpg" : format;
      const name = targetMode === "element" && selectedElement
        ? `${safeName(selectedElement)}.${suffix}`
        : `html-css-export.${suffix}`;
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = name;
      anchor.click();
      setTimeout(() => URL.revokeObjectURL(url), 1200);
      const note = format === "svg" ? " (PNG embedded)" : format === "bmp" ? " (opaque bitmap)" : "";
      setStatus(`Exported ${width} × ${height} ${format.toUpperCase()} image${note}.`, "success");
    } catch (err) {
      const message = err.name === "SecurityError"
        ? "Export blocked by a cross-origin image or background. Use a data URL, a same-origin asset, or a server that allows CORS."
        : err.message || "Export failed.";
      setStatus(message, "error");
    } finally {
      downloadBtn.disabled = false;
    }
  }

  async function createExportBlob(canvas, format, quality) {
    if (format === "bmp") return encodeBitmap(canvas);
    if (format === "svg") {
      const png = canvas.toDataURL("image/png");
      const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${canvas.width}" height="${canvas.height}" viewBox="0 0 ${canvas.width} ${canvas.height}"><image width="100%" height="100%" href="${png}"/></svg>`;
      return new Blob([svg], {type: "image/svg+xml"});
    }

    const mimeType = format === "jpeg" ? "image/jpeg" : `image/${format}`;
    const blob = await new Promise((resolve, reject) => {
      try {
        canvas.toBlob(resolve, mimeType, format === "png" ? undefined : quality);
      } catch (error) {
        reject(error);
      }
    });
    if (!blob || blob.type !== mimeType) throw new Error(`${format.toUpperCase()} export is not supported by this browser.`);
    return blob;
  }

  function encodeBitmap(canvas) {
    const width = canvas.width;
    const height = canvas.height;
    const pixels = canvas.getContext("2d").getImageData(0, 0, width, height).data;
    const rowSize = Math.ceil(width * 3 / 4) * 4;
    const imageSize = rowSize * height;
    const buffer = new ArrayBuffer(54 + imageSize);
    const header = new DataView(buffer);
    const bytes = new Uint8Array(buffer);

    header.setUint8(0, 0x42);
    header.setUint8(1, 0x4d);
    header.setUint32(2, buffer.byteLength, true);
    header.setUint32(10, 54, true);
    header.setUint32(14, 40, true);
    header.setInt32(18, width, true);
    header.setInt32(22, height, true);
    header.setUint16(26, 1, true);
    header.setUint16(28, 24, true);
    header.setUint32(34, imageSize, true);
    header.setInt32(38, 2835, true);
    header.setInt32(42, 2835, true);

    for (let y = 0; y < height; y++) {
      const row = 54 + (height - 1 - y) * rowSize;
      for (let x = 0; x < width; x++) {
        const pixel = (y * width + x) * 4;
        const alpha = pixels[pixel + 3] / 255;
        const output = row + x * 3;
        bytes[output] = Math.round(pixels[pixel + 2] * alpha + 255 * (1 - alpha));
        bytes[output + 1] = Math.round(pixels[pixel + 1] * alpha + 255 * (1 - alpha));
        bytes[output + 2] = Math.round(pixels[pixel] * alpha + 255 * (1 - alpha));
      }
    }
    return new Blob([buffer], {type: "image/bmp"});
  }

  function safeName(el) {
    const base = el.id || [...el.classList][0] || el.tagName.toLowerCase() || "element";
    return base.replace(/[^a-z0-9_-]+/gi, "-").replace(/^-+|-+$/g, "") || "element";
  }

  async function rasterize(format) {
    const doc = previewFrame.contentDocument;
    const win = previewFrame.contentWindow;
    const scale = Math.max(1, Number(scaleSelect.value) || 1);
    const capture = targetMode === "element" && selectedElement ? selectedElement : doc.documentElement;

    if (typeof window.html2canvas !== "function") {
      throw new Error("The image renderer did not load. Refresh the page and try again.");
    }

    const rect = targetMode === "element" && selectedElement
      ? selectedElement.getBoundingClientRect()
      : {
          left: 0,
          top: 0,
          width: Math.max(doc.documentElement.scrollWidth, doc.documentElement.clientWidth, doc.body?.scrollWidth || 0, doc.body?.clientWidth || 0),
          height: Math.max(doc.documentElement.scrollHeight, doc.documentElement.clientHeight, doc.body?.scrollHeight || 0, doc.body?.clientHeight || 0)
        };

    const width = Math.max(1, Math.ceil(rect.width));
    const height = Math.max(1, Math.ceil(rect.height));
    const supportsTransparency = ["png", "webp", "svg"].includes(format);
    const transparent = supportsTransparency && transparentToggle.checked;
    const bg = backgroundHex.value || backgroundColor.value || "#ffffff";
    const canvas = await window.html2canvas(capture, {
      backgroundColor: transparent ? null : bg,
      height,
      logging: false,
      onclone: clonedDocument => clonedDocument.getElementById("mtif-transparency-preview")?.remove(),
      scale,
      scrollX: 0,
      scrollY: 0,
      useCORS: true,
      allowTaint: false,
      width,
      windowHeight: Math.max(1, win.innerHeight),
      windowWidth: Math.max(1, win.innerWidth)
    });

    return {canvas, width: canvas.width, height: canvas.height};
  }

  function clearAll() {
    renderVersion++;
    htmlSource = "";
    cssSource = "";
    htmlInput.value = "";
    cssInput.value = "";
    htmlFileName.textContent = "Choose HTML file";
    cssFileName.textContent = "Optional CSS file";
    previewFrame.srcdoc = "";
    previewFrame.style.cursor = "default";
    previewStage.classList.remove("ready");
    emptyState.style.display = "flex";
    selectedElement = null;
    selectOverlay.hidden = true;
    selectedPath.textContent = "";
    selectionLabel.textContent = "Nothing selected";
    dimensionLabel.textContent = "0 × 0 px";
    targetMode = "viewport";
    targetButtons.forEach(button => button.classList.toggle("active", button.dataset.target === targetMode));
    downloadBtn.disabled = true;
    setStatus("Choose an HTML, XHTML, or text file to begin.");
  }

  function loadDemo() {
    htmlSource = demoHtml;
    cssSource = demoCss;
    htmlFileName.textContent = "tideline.html";
    cssFileName.textContent = "tideline.css";
    renderPreview();
  }

  targetButtons.forEach(btn => btn.addEventListener("click", () => {
    targetButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    targetMode = btn.dataset.target;
    setStatus(targetMode === "element"
      ? "Selected-element mode enabled. Click an element in the preview."
      : "Preview mode enabled. The full rendered preview will be exported.");
  }));

  selectToolBtn.addEventListener("click", toggleSelectionMode);
  refreshBtn.addEventListener("click", renderPreview);
  downloadBtn.addEventListener("click", exportImage);
  clearBtn.addEventListener("click", clearAll);
  loadDemoBtn.addEventListener("click", loadDemo);
  themeToggle.addEventListener("click", () => {
    themePreference = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    try {
      localStorage.setItem("html-css-image-theme", themePreference);
    } catch {}
    applyTheme();
  });
  systemTheme.addEventListener("change", () => {
    if (!themePreference) applyTheme();
  });
  applyTheme();

  formatSelect.addEventListener("change", updateFormatControls);
  transparentToggle.addEventListener("change", updateFormatControls);
  updateFormatControls();

  backgroundColor.addEventListener("input", () => {
    backgroundHex.value = backgroundColor.value;
  });

  backgroundHex.addEventListener("input", () => {
    const value = backgroundHex.value.trim();
    if (/^#[0-9a-f]{6}$/i.test(value)) backgroundColor.value = value;
  });

  qualityRange.addEventListener("input", () => {
    qualityValue.textContent = `${qualityRange.value}%`;
  });

  window.addEventListener("resize", () => {
    if (renderTimer) clearTimeout(renderTimer);
    renderTimer = setTimeout(() => {
      if (selectedElement && previewFrame.contentDocument) {
        const rect = selectedElement.getBoundingClientRect();
        const frameRect = previewFrame.getBoundingClientRect();
        const stageRect = previewStage.getBoundingClientRect();
        selectOverlay.style.left = `${frameRect.left - stageRect.left + rect.left + previewStage.scrollLeft}px`;
        selectOverlay.style.top = `${frameRect.top - stageRect.top + rect.top + previewStage.scrollTop}px`;
        selectOverlay.style.width = `${rect.width}px`;
        selectOverlay.style.height = `${rect.height}px`;
      }
    }, 100);
  });

  previewStage.addEventListener("scroll", () => {
    if (!selectedElement || !previewFrame.contentDocument) return;
    const rect = selectedElement.getBoundingClientRect();
    const frameRect = previewFrame.getBoundingClientRect();
    const stageRect = previewStage.getBoundingClientRect();
    selectOverlay.style.left = `${frameRect.left - stageRect.left + rect.left + previewStage.scrollLeft}px`;
    selectOverlay.style.top = `${frameRect.top - stageRect.top + rect.top + previewStage.scrollTop}px`;
  });
})();

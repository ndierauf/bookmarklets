javascript:(async function () {
  function getSelectedText() {
    const sel = window.getSelection();
    return sel ? sel.toString().trim() : "";
  }

  /** Escape text for use inside HTML text nodes / attributes we build as strings. */
  function escapeHtml(s) {
    return s
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  /** Backslash-escape ] so a markdown label does not break on brackets in the selection. */
  function escapeMarkdownLabel(s) {
    return s.replace(/\]/g, "\\]");
  }

  function copyWithExecCommand(value) {
    const textarea = document.createElement("textarea");
    textarea.value = value;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    textarea.style.pointerEvents = "none";
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    const copied = document.execCommand("copy");
    document.body.removeChild(textarea);
    return copied;
  }

  async function copyToClipboard(html, text) {
    try {
      await navigator.clipboard.write([
        new ClipboardItem({
          "text/html": new Blob([html], { type: "text/html" }),
          "text/plain": new Blob([text], { type: "text/plain" }),
        }),
      ]);
      return;
    } catch (richClipboardError) {
      try {
        await navigator.clipboard.writeText(text);
        return;
      } catch (plainClipboardError) {
        if (copyWithExecCommand(text)) {
          return;
        }
        const isFocusError =
          richClipboardError?.name === "NotAllowedError" ||
          plainClipboardError?.name === "NotAllowedError";
        if (isFocusError) {
          throw new Error(
            "Clipboard access requires a focused page. Click the page and run the bookmarklet again."
          );
        }
        throw plainClipboardError;
      }
    }
  }

  const labelRaw = getSelectedText() || document.title || "Link";
  const labelSingleLine = labelRaw.replace(/\s+/g, " ").trim();
  const pageUrl = location.href;

  const html =
    '<a href="' +
    escapeHtml(pageUrl) +
    '">' +
    escapeHtml(labelSingleLine) +
    "</a>";
  const text =
    "[" + escapeMarkdownLabel(labelSingleLine) + "](" + pageUrl + ")";

  if (!document.hasFocus()) {
    window.focus();
  }

  await copyToClipboard(html, text);
})();

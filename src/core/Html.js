import DOMPurify from "dompurify";

const entities = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };

export const sanitize = (html) => DOMPurify.sanitize(html, { USE_PROFILE: { html: true } });

export const escapeHtml = (text) => String(text).replace(/[&<>"']/g, (char) => entities[char]);

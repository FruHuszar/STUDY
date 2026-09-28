const apiUrl = (import.meta.env.VITE_API_URL || "").trim().replace(/\/+$/, "");
const googleClientId = (import.meta.env.VITE_GOOGLE_CLIENT_ID || "").trim();

const config = Object.freeze({
  apiUrl,
  googleClientId,
  privateNotesEnabled: apiUrl.length > 0 && googleClientId.length > 0
});

export default config;

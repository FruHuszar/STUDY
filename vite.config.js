import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

function contentSecurityPolicy(apiUrl) {
  const apiOrigin = apiUrl ? new URL(apiUrl).origin : "";
  const policy = [
    "default-src 'self'",
    "script-src 'self' https://accounts.google.com/gsi/client",
    `connect-src 'self' ${apiOrigin} https://accounts.google.com/gsi/ https://fonts.googleapis.com https://fonts.gstatic.com`,
    "frame-src https://accounts.google.com/gsi/",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://accounts.google.com/gsi/style",
    "font-src 'self' https://fonts.gstatic.com",
    "img-src 'self' data: https:",
    "object-src 'none'",
    "base-uri 'self'"
  ]
    .join("; ")
    .replace(/ {2,}/g, " ");

  return {
    name: "content-security-policy",
    apply: "build",
    transformIndexHtml: (html) =>
      html.replace(
        /(<meta charset="utf-8" \/>)/,
        `$1\n    <meta http-equiv="Content-Security-Policy" content="${policy}" />`
      )
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "VITE_");

  return {
    base: "./",
    build: { sourcemap: false },
    plugins: [
      react(),
      contentSecurityPolicy(env.VITE_API_URL),
      VitePWA({
        registerType: "autoUpdate",
        includeAssets: ["icons/icon-192.png", "icons/icon-512.png"],
        workbox: {
          globPatterns: ["**/*.{js,css,html,png,svg,woff2}"],
          runtimeCaching: [
            {
              urlPattern: /^https:\/\/fonts\.(googleapis|gstatic)\.com\/.*/,
              handler: "CacheFirst",
              options: { cacheName: "fonts", expiration: { maxEntries: 24 } }
            }
          ]
        },
        manifest: {
          name: "Study Notes",
          short_name: "Notes",
          start_url: "./",
          scope: "./",
          display: "standalone",
          background_color: "#1e1512",
          theme_color: "#1e1512",
          icons: [
            { src: "icons/icon-192.png", sizes: "192x192", type: "image/png" },
            { src: "icons/icon-512.png", sizes: "512x512", type: "image/png" },
            { src: "icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" }
          ]
        }
      })
    ]
  };
});

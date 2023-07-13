import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { VitePWA } from "vite-plugin-pwa";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),

     //<-----------------------pwa config start manual setup-------------------->
    VitePWA({
      registerType: "autoUpdate",
      devOptions: {
        enabled: true,
      },
      includeAssets: [
        "favicon.svg",
        "favicon.ico",
        "robots.txt",
        "apple-touch-icon.png",
      ],

     
      manifest: {
        name: "BB SAAS LMS",
        short_name: "LMS",
        description: "BB SAAS LMS",
        theme_color: "#ffffff",
        background_color: "#ffffff",
        scope: "/",
        start_url: "/",
        orientation: "portrait",
        icons: [
          {
            src: "./src/assets/icons/icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "./src/assets/icons/icon-256x256.png",
            sizes: "256x256",
            type: "image/png",
          },
          {
            src: "./src/assets/icons/icon-384x384.png",
            sizes: "384x384",
            type: "image/png",
          },

          {
            src: "./src/assets/icons/icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "./src/assets/icons/icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: ({ url }) => {
              url.pathname.startsWith("/api");
            },
            handler: "CacheFirst",
            options: {
              cacheName: "api-cache",
              expiration: {
                maxEntries: 30,
                maxAgeSeconds: 60 * 60 * 24 * 365, // 365 days
              },

              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
        ],
      },
    }),
     //<-----------------------pwa config end manual setup-------------------->
  ],
  
});


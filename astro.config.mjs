// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  base: '/',
  vite: {
    server: {
      allowedHosts: true,  // permite cualquier host
      watch: {
        // Polling necesario en WSL2 + Docker — inotify no propaga cambios del host al contenedor
        usePolling: true,
        interval: 300,
      },
    },
  },
});

import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 3000,
  },
  build: {
    target: 'esnext',
    polyfillModulePreload: false,
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks: {
          core: ['./src/app/router.js', './src/app/store.js', './src/app/events.js']
        }
      }
    }
  },
  test: {
    environment: 'jsdom'
  }
});

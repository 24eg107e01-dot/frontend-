import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'force-js-mime-type',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (
            req.url &&
            (req.url.endsWith('.js') ||
              req.url.endsWith('.jsx') ||
              req.url.endsWith('.mjs') ||
              req.url.includes('.js?') ||
              req.url.includes('.jsx?'))
          ) {
            res.setHeader('Content-Type', 'application/javascript; charset=utf-8');
          }
          next();
        });
      },
    },
  ],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});

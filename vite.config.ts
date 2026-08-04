import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Relative base so dist/ runs from any path, not just a domain root.
  base: './',
  build: {
    outDir: 'dist',
    // Single CSS file and an IIFE bundle instead of ES modules. Both exist so that
    // scripts/inline-dist.mjs can fold everything into one standalone HTML file:
    // a <script type="module"> is CORS-blocked over file://, so a module build cannot be
    // opened by double-clicking it. A classic script can. That standalone file is the
    // venue fallback if the laptop has no node and no local server.
    cssCodeSplit: false,
    rollupOptions: {
      output: {
        format: 'iife',
        inlineDynamicImports: true,
        entryFileNames: 'assets/deck.js',
        assetFileNames: 'assets/deck.[ext]',
      },
    },
  },
});

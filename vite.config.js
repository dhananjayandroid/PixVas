import { defineConfig } from 'vite';
import { resolve } from 'path';
import wasm from 'vite-plugin-wasm';
import topLevelAwait from 'vite-plugin-top-level-await';

export default defineConfig({
  plugins: [
    wasm(),
    topLevelAwait()
  ],
  worker: {
    format: 'es',
    plugins: [
      wasm()
    ]
  },
  build: {
    target: 'esnext',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        vectorize: resolve(__dirname, 'vectorize.html'),
        bgremover: resolve(__dirname, 'bg-remover.html'),
        about: resolve(__dirname, 'about.html'),
        editor: resolve(__dirname, 'editor.html'),
        contact: resolve(__dirname, 'contact.html'),
        legal: resolve(__dirname, 'legal.html'),
      },
    },
  },
  server: {
    headers: {
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Cross-Origin-Embedder-Policy': 'require-corp',
    },
  },
});

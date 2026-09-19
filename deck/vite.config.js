import { defineConfig } from 'vite';
import { viteSingleFile } from 'vite-plugin-singlefile';

export default defineConfig(({ mode }) => ({
  // GitHub Pages publishes the uploaded deck/dist artifact at the repository
  // root, not under the source directory name.
  base: mode === 'pages' ? '/Github-Workshop-26/' : './',
  plugins: mode === 'offline' ? [viteSingleFile()] : [],
  build: { outDir: mode === 'offline' ? 'dist-offline' : 'dist' },
}));

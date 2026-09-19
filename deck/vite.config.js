import { defineConfig } from 'vite';
import { viteSingleFile } from 'vite-plugin-singlefile';

export default defineConfig(({ mode }) => ({
  base: mode === 'pages' ? '/Github-Workshop-26/deck/' : './',
  plugins: mode === 'offline' ? [viteSingleFile()] : [],
  build: { outDir: mode === 'offline' ? 'dist-offline' : 'dist' },
}));

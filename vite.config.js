import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import path from 'node:path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [svelte(
    {
      compilerOptions: {
        runes: true
      }
    }
  )],
  resolve: {
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.svelte']
  },
  server: {
    historyApiFallback: true
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        stats: path.resolve(__dirname, 'public/stats/index.html'),
        user: path.resolve(__dirname, 'public/user/index.html'),
      },
    },
  },
})

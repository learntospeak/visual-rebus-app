import { rmSync } from 'node:fs'
import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const assetVersion = Date.now().toString(36)
const excludedProductionPublicPaths = [
  'build-the-clue',
  'word-playtest.html',
  'clue-rooms',
  'hotel-mystery',
]

export default defineConfig({
  base: './',
  build: {
    rollupOptions: {
      output: {
        entryFileNames: 'assets/app.js',
        chunkFileNames: 'assets/[name].js',
        assetFileNames: 'assets/[name][extname]',
      },
    },
  },
  plugins: [
    react(),
    {
      name: 'version-built-assets',
      apply: 'build',
      enforce: 'post',
      transformIndexHtml(html) {
        return html.replace(/((?:src|href)="\.\/assets\/[^"?]+)(")/g, `$1?v=${assetVersion}$2`)
      },
    },
    {
      name: 'exclude-prototypes-from-production',
      apply: 'build',
      closeBundle() {
        for (const publicPath of excludedProductionPublicPaths) {
          rmSync(resolve('dist', publicPath), { recursive: true, force: true })
        }
      },
    },
  ],
})

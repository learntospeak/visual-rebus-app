import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const assetVersion = Date.now().toString(36)

export default defineConfig({
  base: './',
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
  ],
})

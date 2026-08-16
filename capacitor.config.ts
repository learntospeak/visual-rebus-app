import type { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
  appId: 'games.cluecanvas.app',
  appName: 'Clue Canvas',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
  },
}

export default config

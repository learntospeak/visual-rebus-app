import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { GameStoreProvider } from './state/GameStore'
import ArtworkGallery from './screens/ArtworkGallery'
import './styles.css'

const showArtworkGallery = new URLSearchParams(window.location.search).get('artworks') === 'all'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {showArtworkGallery ? <ArtworkGallery /> : <GameStoreProvider>
      <App />
    </GameStoreProvider>}
  </StrictMode>,
)

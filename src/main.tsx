import { lazy, StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { GameStoreProvider } from './state/GameStore'
import './styles.css'

const ArtworkGallery = lazy(() => import('./screens/ArtworkGallery'))
const showArtworkGallery = new URLSearchParams(window.location.search).get('artworks') === 'all'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {showArtworkGallery ? <Suspense fallback={<p role="status">Loading the artwork gallery…</p>}><ArtworkGallery /></Suspense> : <GameStoreProvider>
      <App />
    </GameStoreProvider>}
  </StrictMode>,
)

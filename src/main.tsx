import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { GameStoreProvider } from './state/GameStore'
import './styles.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GameStoreProvider>
      <App />
    </GameStoreProvider>
  </StrictMode>,
)

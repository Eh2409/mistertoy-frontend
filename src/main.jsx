
// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './assets/style/scss/main.scss'
import { RootCpm } from './RootCpm'

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <RootCpm />
  // </StrictMode>,
)

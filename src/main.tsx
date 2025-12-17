import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import ErrorBoundary from './components/ErrorBoundary.tsx'
import WebGLCheck from './components/WebGLCheck.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <WebGLCheck>
        <App />
      </WebGLCheck>
    </ErrorBoundary>
  </React.StrictMode>,
)

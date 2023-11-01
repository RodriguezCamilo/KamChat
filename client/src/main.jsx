import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App.jsx'
import './index.css'
import { NextUIProvider } from "@nextui-org/react"

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <NextUIProvider>
      <main className="grid justify-center dark text-foreground bg-background font-sans">
      <App />
      </main>
    </NextUIProvider>
  </React.StrictMode>,
)

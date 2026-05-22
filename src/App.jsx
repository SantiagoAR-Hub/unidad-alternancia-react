/**
 * App.jsx
 * Componente raíz de la aplicación.
 * - Configura el BrowserRouter para la navegación SPA con React Router.
 * - Gestiona el estado del tema (claro/oscuro) con useState y useEffect,
 *   aplicando la clase "dark" al elemento <html>.
 * - Renderiza el Navbar y las rutas principales.
 */

import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Services from './pages/Services'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'

function App() {
  // Estado del tema: 'light' | 'dark'
  const [theme, setTheme] = useState(() => {
    // Recupera la preferencia guardada en localStorage o usa 'light' por defecto
    return localStorage.getItem('theme') || 'light'
  })

  // Aplica la clase "dark" al <html> cada vez que cambia el tema
  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
    localStorage.setItem('theme', theme)
  }, [theme])

  /**
   * toggleTheme
   * Alterna entre modo claro y oscuro.
   */
  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'))
  }

  return (
    <BrowserRouter>
      <div className="app-layout">
        {/* Navbar recibe el tema actual y la función para cambiarlo */}
        <Navbar theme={theme} toggleTheme={toggleTheme} />

        <main className="main-content">
          <Routes>
            {/* Ruta: Inicio */}
            <Route path="/" element={<Home />} />

            {/* Ruta: Servicios (incluye Galería y Blog) */}
            <Route path="/servicios" element={<Services />} />

            {/* Ruta: Contacto (incluye Formulario) */}
            <Route path="/contacto" element={<Contact />} />

            {/* Ruta 404: cualquier ruta no reconocida */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App

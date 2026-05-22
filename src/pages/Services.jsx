/**
 * Services.jsx – Página de Servicios
 *
 * Agrupa los componentes Galería y Blog dentro de la sección de Servicios.
 * Usa pestañas internas para alternar entre los dos componentes.
 */

import { useState } from 'react'
import Gallery from '../components/Gallery'
import Blog from '../components/Blog'
import './Services.css'

function Services() {
  // Estado de la pestaña activa: 'gallery' | 'blog'
  const [activeTab, setActiveTab] = useState('gallery')

  return (
    <section className="services-page">
      <h1 className="services-title">Servicios</h1>
      <p className="services-subtitle">
        Explora nuestra galería de imágenes o el blog de publicaciones.
      </p>

      {/* Pestañas de navegación interna */}
      <div className="tabs" role="tablist">
        <button
          role="tab"
          aria-selected={activeTab === 'gallery'}
          className={`tab-btn ${activeTab === 'gallery' ? 'tab-active' : ''}`}
          onClick={() => setActiveTab('gallery')}
        >
          🖼️ Galería
        </button>
        <button
          role="tab"
          aria-selected={activeTab === 'blog'}
          className={`tab-btn ${activeTab === 'blog' ? 'tab-active' : ''}`}
          onClick={() => setActiveTab('blog')}
        >
          📰 Blog
        </button>
      </div>

      {/* Contenido según la pestaña activa – renderizado condicional */}
      <div className="tab-content">
        {activeTab === 'gallery' ? <Gallery /> : <Blog />}
      </div>
    </section>
  )
}

export default Services

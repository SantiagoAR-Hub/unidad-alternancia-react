/**
 * Home.jsx – Página de Inicio
 *
 * Pantalla de bienvenida con descripción del proyecto.
 * Presenta brevemente los ejercicios incluidos en la aplicación.
 */

import { Link } from 'react-router-dom'
import './Home.css'

function Home() {
  // Lista de funcionalidades para mostrar en la página de inicio
  const features = [
    {
      icon: '🗺️',
      title: 'Navegación SPA',
      desc: 'Routing con React Router sin recargas de página.',
    },
    {
      icon: '📝',
      title: 'Formulario con Validación',
      desc: 'Campos con validación en tiempo real usando useState.',
    },
    {
      icon: '🖼️',
      title: 'Galería Interactiva',
      desc: 'Miniaturas y vista principal con animaciones Framer Motion.',
    },
    {
      icon: '📰',
      title: 'Blog Dinámico',
      desc: 'Crea, edita, destaca y elimina posts en tiempo real.',
    },
    {
      icon: '🌙',
      title: 'Modo Oscuro / Claro',
      desc: 'Toggle de tema con variables CSS, sin recargar.',
    },
  ]

  return (
    <section className="home-page">
      {/* Hero */}
      <div className="home-hero card">
        <h1 className="home-title">
          Bienvenido a <span className="highlight">Mi App React</span>
        </h1>
        <p className="home-subtitle">
          Proyecto de prácticas de Desarrollo Web — Unidad de Alternancia.
          Construido con <strong>React 18</strong>, <strong>React Router v6</strong> y{' '}
          <strong>Framer Motion</strong>.
        </p>
        <div className="home-actions">
          <Link to="/servicios" className="btn btn-primary">Ver Servicios →</Link>
          <Link to="/contacto" className="btn btn-secondary">Contacto</Link>
        </div>
      </div>

      {/* Listado de funcionalidades */}
      <h2 className="features-title">¿Qué incluye esta aplicación?</h2>
      <div className="features-grid">
        {features.map((f, i) => (
          <div key={i} className="feature-card card">
            <span className="feature-icon">{f.icon}</span>
            <h3>{f.title}</h3>
            <p>{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Home

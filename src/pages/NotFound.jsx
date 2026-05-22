/**
 * NotFound.jsx – Página 404
 *
 * Se muestra cuando el usuario accede a una ruta no definida.
 */

import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
      <h1 style={{ fontSize: '4rem', color: 'var(--color-primary)' }}>404</h1>
      <p style={{ color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>
        La página que buscas no existe.
      </p>
      <Link to="/" className="btn btn-primary">← Volver al Inicio</Link>
    </div>
  )
}

export default NotFound

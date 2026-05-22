/**
 * Navbar.jsx – Ejercicio 1: Navegación con React Router
 *
 * Muestra los enlaces de navegación usando NavLink de react-router-dom.
 * - NavLink aplica automáticamente la clase "active" a la ruta actual,
 *   lo que permite resaltar la sección activa sin lógica adicional.
 * - La navegación es SPA: no recarga la página al cambiar de sección.
 * - Incluye el botón de toggle de tema (Ejercicio 5).
 */

import { NavLink } from 'react-router-dom'
import './Navbar.css'

/**
 * @param {object} props
 * @param {'light'|'dark'} props.theme - Tema actual de la aplicación
 * @param {function} props.toggleTheme - Función para alternar el tema
 */
function Navbar({ theme, toggleTheme }) {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <span className="brand-icon">⚛️</span>
        <span className="brand-name">Mi App React</span>
      </div>

      <ul className="navbar-links">
        {/* NavLink añade la clase "active" automáticamente en la ruta coincidente */}
        <li>
          <NavLink to="/" end className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            Inicio
          </NavLink>
        </li>
        <li>
          <NavLink to="/servicios" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            Servicios
          </NavLink>
        </li>
        <li>
          <NavLink to="/contacto" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            Contacto
          </NavLink>
        </li>
      </ul>

      {/* Botón toggle de tema – Ejercicio 5 */}
      <button
        className="theme-toggle"
        onClick={toggleTheme}
        aria-label={theme === 'dark' ? 'Activar modo claro' : 'Activar modo oscuro'}
        title={theme === 'dark' ? 'Modo claro' : 'Modo oscuro'}
      >
        {theme === 'dark' ? '☀️' : '🌙'}
      </button>
    </nav>
  )
}

export default Navbar

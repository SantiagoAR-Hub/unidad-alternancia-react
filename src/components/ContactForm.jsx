/**
 * ContactForm.jsx – Ejercicio 2: Formulario con validación en React
 *
 * Gestiona el estado del formulario con useState para cada campo.
 * Aplica validaciones en tiempo real:
 *   - Nombre: obligatorio, mínimo 2 caracteres.
 *   - Email: obligatorio, formato válido (regex).
 *   - Mensaje: obligatorio, mínimo 10 caracteres.
 *
 * Eventos manejados:
 *   - onChange: actualiza el valor del campo en tiempo real.
 *   - onBlur: marca el campo como "tocado" para mostrar errores.
 *   - onSubmit: valida todo antes de enviar; impide envío si hay errores.
 */

import { useState } from 'react'
import './ContactForm.css'

// ── Funciones de validación ──────────────────────────────────────────────────

/**
 * Valida un único campo.
 * @param {string} name  - Nombre del campo
 * @param {string} value - Valor actual
 * @returns {string} Mensaje de error, o '' si es válido
 */
function validateField(name, value) {
  switch (name) {
    case 'nombre':
      if (!value.trim()) return 'El nombre es obligatorio.'
      if (value.trim().length < 2) return 'El nombre debe tener al menos 2 caracteres.'
      return ''

    case 'email':
      if (!value.trim()) return 'El email es obligatorio.'
      // Expresión regular para validar formato de email
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
        return 'Introduce un email con formato válido.'
      return ''

    case 'mensaje':
      if (!value.trim()) return 'El mensaje es obligatorio.'
      if (value.trim().length < 10) return 'El mensaje debe tener al menos 10 caracteres.'
      return ''

    default:
      return ''
  }
}

// ── Componente principal ─────────────────────────────────────────────────────

function ContactForm() {
  // Estado de los valores de los campos
  const [values, setValues] = useState({ nombre: '', email: '', mensaje: '' })

  // Estado de los errores de validación
  const [errors, setErrors] = useState({ nombre: '', email: '', mensaje: '' })

  // Estado de los campos "tocados" (el usuario ha salido del campo al menos una vez)
  const [touched, setTouched] = useState({ nombre: false, email: false, mensaje: false })

  // Estado del envío exitoso
  const [submitted, setSubmitted] = useState(false)

  /**
   * handleChange – Evento onChange
   * Actualiza el valor del campo y revalida en tiempo real si ya fue tocado.
   */
  const handleChange = (e) => {
    const { name, value } = e.target
    setValues(prev => ({ ...prev, [name]: value }))
    // Mostrar error en tiempo real solo si el campo ya ha sido tocado
    if (touched[name]) {
      setErrors(prev => ({ ...prev, [name]: validateField(name, value) }))
    }
  }

  /**
   * handleBlur – Evento onBlur
   * Marca el campo como tocado y muestra el error si lo hay.
   */
  const handleBlur = (e) => {
    const { name, value } = e.target
    setTouched(prev => ({ ...prev, [name]: true }))
    setErrors(prev => ({ ...prev, [name]: validateField(name, value) }))
  }

  /**
   * handleSubmit – Evento onSubmit
   * Valida todos los campos antes de permitir el envío.
   * Si hay errores, los muestra y bloquea el envío.
   */
  const handleSubmit = (e) => {
    e.preventDefault() // Impide la recarga de página

    // Marcar todos los campos como tocados para mostrar todos los errores
    setTouched({ nombre: true, email: true, mensaje: true })

    // Calcular errores de todos los campos
    const newErrors = {
      nombre: validateField('nombre', values.nombre),
      email:  validateField('email',  values.email),
      mensaje: validateField('mensaje', values.mensaje),
    }
    setErrors(newErrors)

    // Si hay algún error, no continuar
    const hasErrors = Object.values(newErrors).some(err => err !== '')
    if (hasErrors) return

    // Simulación de envío exitoso
    setSubmitted(true)
  }

  /**
   * handleReset – Reinicia el formulario
   */
  const handleReset = () => {
    setValues({ nombre: '', email: '', mensaje: '' })
    setErrors({ nombre: '', email: '', mensaje: '' })
    setTouched({ nombre: false, email: false, mensaje: false })
    setSubmitted(false)
  }

  // Determina el estado visual de un campo: 'valid' | 'error' | ''
  const fieldStatus = (name) => {
    if (!touched[name]) return ''
    return errors[name] ? 'error' : 'valid'
  }

  // ── Render: mensaje de éxito ──────────────────────────────────────────────
  if (submitted) {
    return (
      <div className="form-success card">
        <span className="success-icon">✅</span>
        <h3>¡Mensaje enviado!</h3>
        <p>Gracias, <strong>{values.nombre}</strong>. Nos pondremos en contacto contigo en breve.</p>
        <button className="btn btn-primary" onClick={handleReset}>
          Enviar otro mensaje
        </button>
      </div>
    )
  }

  // ── Render: formulario ────────────────────────────────────────────────────
  return (
    <form className="contact-form card" onSubmit={handleSubmit} noValidate>
      {/* Campo: Nombre */}
      <div className={`form-group ${fieldStatus('nombre')}`}>
        <label htmlFor="nombre">
          Nombre <span className="required">*</span>
        </label>
        <input
          type="text"
          id="nombre"
          name="nombre"
          value={values.nombre}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Tu nombre completo"
          autoComplete="name"
        />
        {/* Indicador de estado visual */}
        {touched.nombre && (
          <span className="field-indicator">
            {errors.nombre ? '✗' : '✓'}
          </span>
        )}
        {/* Mensaje de error en tiempo real */}
        {touched.nombre && errors.nombre && (
          <p className="error-msg">{errors.nombre}</p>
        )}
      </div>

      {/* Campo: Email */}
      <div className={`form-group ${fieldStatus('email')}`}>
        <label htmlFor="email">
          Email <span className="required">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="tu@email.com"
          autoComplete="email"
        />
        {touched.email && (
          <span className="field-indicator">
            {errors.email ? '✗' : '✓'}
          </span>
        )}
        {touched.email && errors.email && (
          <p className="error-msg">{errors.email}</p>
        )}
      </div>

      {/* Campo: Mensaje */}
      <div className={`form-group ${fieldStatus('mensaje')}`}>
        <label htmlFor="mensaje">
          Mensaje <span className="required">*</span>
        </label>
        <textarea
          id="mensaje"
          name="mensaje"
          value={values.mensaje}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Escribe tu mensaje aquí (mínimo 10 caracteres)…"
          rows={5}
        />
        {/* Contador de caracteres */}
        <span className="char-count">{values.mensaje.length} caracteres</span>
        {touched.mensaje && (
          <span className="field-indicator">
            {errors.mensaje ? '✗' : '✓'}
          </span>
        )}
        {touched.mensaje && errors.mensaje && (
          <p className="error-msg">{errors.mensaje}</p>
        )}
      </div>

      <button type="submit" className="btn btn-primary submit-btn">
        Enviar mensaje ✉️
      </button>
    </form>
  )
}

export default ContactForm

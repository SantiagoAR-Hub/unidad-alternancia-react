/**
 * Contact.jsx – Página de Contacto
 *
 * Envuelve el componente de formulario con contexto y encabezado.
 */

import ContactForm from '../components/ContactForm'
import './Contact.css'

function Contact() {
  return (
    <section className="contact-page">
      <h1 className="contact-title">Contacto</h1>
      <p className="contact-subtitle">
        ¿Tienes alguna pregunta? Rellena el formulario y te responderemos pronto.
      </p>
      <ContactForm />
    </section>
  )
}

export default Contact

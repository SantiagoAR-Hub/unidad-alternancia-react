/**
 * Blog.jsx – Ejercicio 4: Sistema de posts dinámicos
 *
 * Mini CMS con React. Permite:
 *   - Crear posts con título y descripción mediante un formulario.
 *   - Visualizar los posts como tarjetas independientes (componente PostCard).
 *   - Editar el contenido de un post en línea.
 *   - Eliminar un post de la lista.
 *   - Destacar / desmarcar un post.
 *
 * El estado global de los posts se gestiona aquí y se pasa a PostCard vía props.
 */

import { useState } from 'react'
import PostCard from './PostCard'
import './Blog.css'

// Posts de ejemplo para que la página no arranque vacía
const INITIAL_POSTS = [
  { id: 1, title: 'Bienvenido al Blog', body: 'Este es el primer post del blog. Puedes editarlo, destacarlo o eliminarlo.', featured: true },
  { id: 2, title: 'React Hooks', body: 'useState y useEffect son los hooks más utilizados en React para gestionar estado y efectos secundarios.', featured: false },
]

function Blog() {
  // Estado: lista de posts
  const [posts, setPosts] = useState(INITIAL_POSTS)

  // Estado: campos del formulario de nuevo post
  const [form, setForm] = useState({ title: '', body: '' })

  // Estado: errores de validación del formulario
  const [formErrors, setFormErrors] = useState({ title: '', body: '' })

  // Contador para generar IDs únicos
  const [nextId, setNextId] = useState(3)

  // ── Validación del formulario ──────────────────────────────────────────────

  /**
   * Valida un campo del formulario de creación de posts.
   * @param {string} name  - Nombre del campo
   * @param {string} value - Valor del campo
   * @returns {string} Mensaje de error o ''
   */
  const validateFormField = (name, value) => {
    if (name === 'title') {
      if (!value.trim()) return 'El título es obligatorio.'
      if (value.trim().length < 3) return 'El título debe tener al menos 3 caracteres.'
    }
    if (name === 'body') {
      if (!value.trim()) return 'La descripción es obligatoria.'
      if (value.trim().length < 5) return 'La descripción debe tener al menos 5 caracteres.'
    }
    return ''
  }

  // ── Manejadores del formulario ─────────────────────────────────────────────

  /** Actualiza el estado del formulario en tiempo real */
  const handleFormChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    setFormErrors(prev => ({ ...prev, [name]: validateFormField(name, value) }))
  }

  /**
   * handleAddPost – Crea un nuevo post y lo añade al inicio de la lista.
   * Bloquea el envío si hay errores.
   */
  const handleAddPost = (e) => {
    e.preventDefault()
    const errors = {
      title: validateFormField('title', form.title),
      body:  validateFormField('body',  form.body),
    }
    setFormErrors(errors)
    if (errors.title || errors.body) return

    const newPost = { id: nextId, title: form.title.trim(), body: form.body.trim(), featured: false }
    setPosts(prev => [newPost, ...prev]) // Añade al inicio de la lista
    setNextId(n => n + 1)
    setForm({ title: '', body: '' })    // Limpia el formulario
    setFormErrors({ title: '', body: '' })
  }

  // ── Operaciones sobre posts ────────────────────────────────────────────────

  /**
   * handleDelete – Elimina un post por su ID.
   * @param {number} id
   */
  const handleDelete = (id) => {
    setPosts(prev => prev.filter(p => p.id !== id))
  }

  /**
   * handleToggleFeatured – Alterna el estado "destacado" de un post.
   * @param {number} id
   */
  const handleToggleFeatured = (id) => {
    setPosts(prev =>
      prev.map(p => p.id === id ? { ...p, featured: !p.featured } : p)
    )
  }

  /**
   * handleEdit – Actualiza el título y/o descripción de un post existente.
   * @param {number} id
   * @param {{ title: string, body: string }} updates
   */
  const handleEdit = (id, updates) => {
    setPosts(prev =>
      prev.map(p => p.id === id ? { ...p, ...updates } : p)
    )
  }

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div className="blog">
      <h2 className="blog-heading">Blog</h2>

      {/* ── Formulario de nuevo post ─────────────────────────────────── */}
      <form className="new-post-form card" onSubmit={handleAddPost} noValidate>
        <h3>Nuevo post</h3>

        <div className={`form-group ${formErrors.title ? 'error' : ''}`}>
          <label htmlFor="post-title">Título <span style={{ color: 'var(--color-error)' }}>*</span></label>
          <input
            id="post-title"
            type="text"
            name="title"
            value={form.title}
            onChange={handleFormChange}
            placeholder="Título del post"
          />
          {formErrors.title && <p className="error-msg">{formErrors.title}</p>}
        </div>

        <div className={`form-group ${formErrors.body ? 'error' : ''}`}>
          <label htmlFor="post-body">Descripción <span style={{ color: 'var(--color-error)' }}>*</span></label>
          <textarea
            id="post-body"
            name="body"
            value={form.body}
            onChange={handleFormChange}
            placeholder="Contenido del post…"
            rows={3}
          />
          {formErrors.body && <p className="error-msg">{formErrors.body}</p>}
        </div>

        <button type="submit" className="btn btn-primary">
          + Publicar post
        </button>
      </form>

      {/* ── Lista de posts ───────────────────────────────────────────── */}
      {posts.length === 0 ? (
        // Renderizado condicional: mensaje cuando no hay posts
        <p className="no-posts">No hay publicaciones. ¡Crea la primera!</p>
      ) : (
        <div className="posts-grid">
          {posts.map(post => (
            <PostCard
              key={post.id}
              post={post}
              onDelete={handleDelete}
              onToggleFeatured={handleToggleFeatured}
              onEdit={handleEdit}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default Blog

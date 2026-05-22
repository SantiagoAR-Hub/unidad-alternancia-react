/**
 * PostCard.jsx – Componente de tarjeta de post (Ejercicio 4)
 *
 * Muestra un post individual con sus acciones:
 *   - Destacar / desmarcar (estrella)
 *   - Editar en línea (modo edición inline)
 *   - Eliminar
 *
 * @param {object}   props.post               - Datos del post { id, title, body, featured }
 * @param {function} props.onDelete           - Callback para eliminar el post
 * @param {function} props.onToggleFeatured   - Callback para destacar/desmarcar
 * @param {function} props.onEdit             - Callback para guardar cambios editados
 */

import { useState } from 'react'
import './PostCard.css'

function PostCard({ post, onDelete, onToggleFeatured, onEdit }) {
  // Estado: modo edición activo o no
  const [editing, setEditing] = useState(false)

  // Estado: campos en edición (copia local mientras se edita)
  const [editValues, setEditValues] = useState({ title: post.title, body: post.body })

  /**
   * handleSave – Guarda los cambios y sale del modo edición.
   * Ignora el guardado si el título está vacío.
   */
  const handleSave = () => {
    if (!editValues.title.trim()) return
    onEdit(post.id, { title: editValues.title.trim(), body: editValues.body.trim() })
    setEditing(false)
  }

  /** handleCancel – Descarta los cambios y sale del modo edición */
  const handleCancel = () => {
    setEditValues({ title: post.title, body: post.body })
    setEditing(false)
  }

  return (
    <article className={`post-card card ${post.featured ? 'featured' : ''}`}>
      {/* Insignia de "Destacado" – renderizado condicional con && */}
      {post.featured && (
        <span className="featured-badge">⭐ Destacado</span>
      )}

      {editing ? (
        // ── Modo edición ──────────────────────────────────────────────────
        <div className="edit-mode">
          <input
            className="edit-title"
            value={editValues.title}
            onChange={e => setEditValues(prev => ({ ...prev, title: e.target.value }))}
            placeholder="Título"
          />
          <textarea
            className="edit-body"
            value={editValues.body}
            onChange={e => setEditValues(prev => ({ ...prev, body: e.target.value }))}
            rows={3}
            placeholder="Descripción"
          />
          <div className="card-actions">
            <button className="btn btn-primary btn-sm" onClick={handleSave}>💾 Guardar</button>
            <button className="btn btn-secondary btn-sm" onClick={handleCancel}>Cancelar</button>
          </div>
        </div>
      ) : (
        // ── Modo visualización ────────────────────────────────────────────
        <>
          <h3 className="post-title">{post.title}</h3>
          <p className="post-body">{post.body}</p>
          <div className="card-actions">
            {/* Botón destacar: ternario para cambiar emoji/texto según estado */}
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => onToggleFeatured(post.id)}
              title={post.featured ? 'Quitar destacado' : 'Destacar'}
            >
              {post.featured ? '★ Quitar' : '☆ Destacar'}
            </button>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => setEditing(true)}
            >
              ✏️ Editar
            </button>
            <button
              className="btn btn-danger btn-sm"
              onClick={() => onDelete(post.id)}
            >
              🗑 Eliminar
            </button>
          </div>
        </>
      )}
    </article>
  )
}

export default PostCard

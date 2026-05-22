/**
 * Gallery.jsx – Ejercicio 3: Galería de imágenes interactiva
 *
 * Muestra una imagen principal y miniaturas clicables.
 * Al hacer clic en una miniatura:
 *   - Pasa a ser la imagen principal (estado con useState).
 *   - Queda visualmente resaltada con la clase "selected".
 * Usa Framer Motion para animar la transición de la imagen principal.
 *
 * Las imágenes se obtienen de Picsum Photos (placeholder gratuito).
 * Propiedades usadas: src, alt, className, renderizado condicional (&&, ternario).
 */

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './Gallery.css'

// ── Datos de la galería ──────────────────────────────────────────────────────
// Cada imagen tiene id, src (Picsum), alt y título descriptivo.
const IMAGES = [
  { id: 1, src: 'https://picsum.photos/seed/react1/800/500', thumb: 'https://picsum.photos/seed/react1/200/140', alt: 'Paisaje montañoso', title: 'Montañas' },
  { id: 2, src: 'https://picsum.photos/seed/react2/800/500', thumb: 'https://picsum.photos/seed/react2/200/140', alt: 'Playa tropical', title: 'Playa' },
  { id: 3, src: 'https://picsum.photos/seed/react3/800/500', thumb: 'https://picsum.photos/seed/react3/200/140', alt: 'Bosque verde', title: 'Bosque' },
  { id: 4, src: 'https://picsum.photos/seed/react4/800/500', thumb: 'https://picsum.photos/seed/react4/200/140', alt: 'Ciudad nocturna', title: 'Ciudad' },
  { id: 5, src: 'https://picsum.photos/seed/react5/800/500', thumb: 'https://picsum.photos/seed/react5/200/140', alt: 'Desierto al atardecer', title: 'Desierto' },
  { id: 6, src: 'https://picsum.photos/seed/react6/800/500', thumb: 'https://picsum.photos/seed/react6/200/140', alt: 'Lago nevado', title: 'Lago' },
]

// ── Variantes de animación Framer Motion ────────────────────────────────────
const mainImageVariants = {
  initial: { opacity: 0, scale: 0.97 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
  exit:    { opacity: 0, scale: 1.02, transition: { duration: 0.2 } },
}

// ── Componente principal ─────────────────────────────────────────────────────
function Gallery() {
  // Estado: imagen actualmente seleccionada como principal
  const [selected, setSelected] = useState(IMAGES[0])

  return (
    <div className="gallery">
      <h2 className="gallery-heading">Galería de Imágenes</h2>

      {/* ── Imagen principal con animación ─────────────────────────────── */}
      <div className="gallery-main">
        <AnimatePresence mode="wait">
          {/* La key cambia al seleccionar otra imagen, forzando la animación */}
          <motion.div
            key={selected.id}
            variants={mainImageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="main-image-wrapper"
          >
            <img
              src={selected.src}
              alt={selected.alt}
              className="main-image"
            />
            {/* Título superpuesto – renderizado condicional con && */}
            {selected.title && (
              <div className="main-image-caption">{selected.title}</div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Miniaturas ─────────────────────────────────────────────────── */}
      <div className="thumbnails" role="list">
        {IMAGES.map(img => (
          <button
            key={img.id}
            role="listitem"
            className={`thumb-btn ${selected.id === img.id ? 'selected' : ''}`}
            onClick={() => setSelected(img)}
            aria-label={`Ver imagen: ${img.title}`}
            aria-pressed={selected.id === img.id}
          >
            <img
              src={img.thumb}
              alt={img.alt}
              className="thumb-img"
            />
            {/* Indicador visual de selección – ternario */}
            <span className="thumb-overlay">
              {selected.id === img.id ? '✓' : ''}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default Gallery

import { useCallback, useEffect, useRef, useState } from 'react'
import { GALLERY } from '../config'

export default function Gallery() {
  const [open, setOpen] = useState<number | null>(null)
  const [active, setActive] = useState(0)
  const trackRef = useRef<HTMLDivElement>(null)

  // Atualiza os pontinhos conforme o carrossel (celular) é deslizado
  const onTrackScroll = () => {
    const track = trackRef.current
    if (!track) return
    const item = track.firstElementChild as HTMLElement | null
    if (!item) return
    const index = Math.round(track.scrollLeft / (item.offsetWidth + 12))
    setActive(Math.min(GALLERY.length - 1, Math.max(0, index)))
  }

  const goTo = (index: number) => {
    const track = trackRef.current
    const item = track?.children[index] as HTMLElement | undefined
    if (track && item) track.scrollTo({ left: item.offsetLeft - track.offsetLeft, behavior: 'smooth' })
  }

  return (
    <section id="galeria" className="section gallery">
      <p className="section__kicker">Momentos</p>
      <h2 className="section__title">Nossa galeria</h2>

      <div className="gallery__track" ref={trackRef} onScroll={onTrackScroll}>
        {GALLERY.map((photo, i) => (
          <button
            key={photo.src}
            className="gallery__item"
            onClick={() => setOpen(i)}
            aria-label={`Ampliar foto: ${photo.alt}`}
          >
            <img
              src={photo.src}
              alt={photo.alt}
              loading="lazy"
              decoding="async"
              style={{ objectPosition: photo.position }}
            />
          </button>
        ))}
      </div>

      <div className="gallery__dots" aria-hidden>
        {GALLERY.map((photo, i) => (
          <button
            key={photo.src}
            tabIndex={-1}
            className={i === active ? 'is-active' : ''}
            onClick={() => goTo(i)}
          />
        ))}
      </div>

      {open !== null && <Lightbox index={open} onChange={setOpen} onClose={() => setOpen(null)} />}
    </section>
  )
}

interface LightboxProps {
  index: number
  onChange: (index: number) => void
  onClose: () => void
}

function Lightbox({ index, onChange, onClose }: LightboxProps) {
  const touchX = useRef<number | null>(null)
  const photo = GALLERY[index]
  const total = GALLERY.length

  const prev = useCallback(() => onChange((index - 1 + total) % total), [index, total, onChange])
  const next = useCallback(() => onChange((index + 1) % total), [index, total, onChange])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose, prev, next])

  return (
    <div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label="Foto ampliada"
      onClick={onClose}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return
        const dx = e.changedTouches[0].clientX - touchX.current
        touchX.current = null
        if (Math.abs(dx) > 50) {
          if (dx > 0) prev()
          else next()
        }
      }}
    >
      <button className="lightbox__close" aria-label="Fechar" onClick={onClose}>×</button>
      <button
        className="lightbox__nav lightbox__nav--prev"
        aria-label="Foto anterior"
        onClick={(e) => {
          e.stopPropagation()
          prev()
        }}
      >
        ‹
      </button>
      <img
        key={photo.src}
        className="lightbox__img"
        src={photo.src}
        alt={photo.alt}
        onClick={(e) => e.stopPropagation()}
      />
      <button
        className="lightbox__nav lightbox__nav--next"
        aria-label="Próxima foto"
        onClick={(e) => {
          e.stopPropagation()
          next()
        }}
      >
        ›
      </button>
      <p className="lightbox__count">
        {index + 1} / {total}
      </p>
    </div>
  )
}

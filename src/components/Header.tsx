import { useEffect, useState } from 'react'

const LINKS = [
  { href: '#inicio', label: 'Início' },
  { href: '#casal', label: 'O casal' },
  { href: '#galeria', label: 'Fotos' },
  { href: '#cerimonia', label: 'Cerimônia' },
  { href: '#presentes', label: 'Presentes' },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`header ${scrolled ? 'header--solid' : ''}`}>
      <a href="#inicio" className="header__brand">V &amp; G</a>
      <button
        className="header__toggle"
        aria-label="Abrir menu"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        <span /><span /><span />
      </button>
      <nav className={`header__nav ${open ? 'header__nav--open' : ''}`}>
        {LINKS.map((link) => (
          <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
            {link.label}
          </a>
        ))}
      </nav>
    </header>
  )
}

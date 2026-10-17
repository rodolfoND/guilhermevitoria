import { EVENT } from '../config'

export default function Footer() {
  return (
    <footer className="footer">
      <p className="footer__names">{EVENT.groom} &amp; {EVENT.bride}</p>
      <p>07 · 11 · 2026 · {EVENT.church} · {EVENT.city}</p>
      <p className="footer__small">Aguardamos vocês no nosso grande dia!</p>
    </footer>
  )
}

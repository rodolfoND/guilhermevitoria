import { COUPLE_PHOTO, EVENT } from '../config'
import Countdown from './Countdown'

export default function Hero() {
  return (
    <section id="inicio" className="hero">
      <div className="hero__bg" style={{ backgroundImage: `url(${COUPLE_PHOTO})` }} />
      <div className="hero__content">
        <p className="hero__kicker">Vamos nos casar!</p>
        <h1 className="hero__names">
          <span>{EVENT.groom}</span> <span className="hero__amp">&amp;</span> <span>{EVENT.bride}</span>
        </h1>
        <p className="hero__date">07 · 11 · 2026</p>
        <p className="hero__place">
          <span>{EVENT.church}</span> <span>{EVENT.city} · {EVENT.timeLabel}</span>
        </p>
        <Countdown target={EVENT.date} />
        <a href="#cerimonia" className="btn btn--light">Como chegar</a>
      </div>
    </section>
  )
}

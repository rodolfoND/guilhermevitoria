import { useState } from 'react'
import { GIFTS, formatBRL, type Gift } from '../data/gifts'
import GiftModal from './GiftModal'

export default function GiftList() {
  const [selected, setSelected] = useState<Gift | null>(null)

  return (
    <section id="presentes" className="section gifts">
      <p className="section__kicker">Com carinho</p>
      <h2 className="section__title">Lista de presentes</h2>
      <p className="section__lead">
        Sua presença é o nosso maior presente! Mas, se quiser nos presentear, escolha um item abaixo
        e pague via PIX com o valor correspondente.
      </p>

      <div className="gifts__grid">
        {GIFTS.map((gift) => (
          <button key={gift.id} className="gift-card" onClick={() => setSelected(gift)}>
            <span className="gift-card__icon" aria-hidden>{gift.icon}</span>
            <span className="gift-card__name">{gift.name}</span>
            <span className="gift-card__desc">{gift.description}</span>
            <span className="gift-card__price">{formatBRL(gift.price)}</span>
            <span className="gift-card__cta">Presentear</span>
          </button>
        ))}
      </div>

      {selected && <GiftModal gift={selected} onClose={() => setSelected(null)} />}
    </section>
  )
}

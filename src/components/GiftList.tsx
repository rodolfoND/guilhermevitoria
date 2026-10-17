import { useState } from 'react'
import { EVENT, PIX } from '../config'
import { GIFTS, formatPrice, type Gift } from '../data/gifts'
import { useCopy } from '../lib/useCopy'
import GiftModal from './GiftModal'

const SHARE_TEXT = `Chave PIX para o presente de casamento de ${EVENT.bride} & ${EVENT.groom}: ${PIX.keyCopy} (${PIX.keyType}, em nome de ${PIX.receiver})`
const canShare = typeof navigator !== 'undefined' && typeof navigator.share === 'function'

export default function GiftList() {
  const [selected, setSelected] = useState<Gift | null>(null)
  const { copied, copy } = useCopy<'key'>()

  const share = async () => {
    try {
      await navigator.share({ title: 'Chave PIX dos noivos', text: SHARE_TEXT })
    } catch {
      // Compartilhamento cancelado pelo usuário
    }
  }

  return (
    <section id="presentes" className="section gifts">
      <p className="section__kicker">Com carinho</p>
      <h2 className="section__title">Lista de presentes</h2>
      <p className="section__lead">
        Sua presença é o nosso maior presente! Mas, se quiser nos presentear, escolha um item abaixo
        e pague via PIX com o valor correspondente.
      </p>

      <div className="pix-key">
        <div className="pix-key__info">
          <span className="pix-key__label">Chave PIX dos noivos</span>
          <strong className="pix-key__value">{PIX.keyLabel}</strong>
          <span className="pix-key__hint">Celular · em nome de {PIX.receiver}</span>
          <span className="pix-key__hint">
            Prefere enviar direto ou passar para outra pessoa? Use a chave acima.
          </span>
        </div>
        <div className="pix-key__actions">
          <button className="btn btn--small" onClick={() => copy(PIX.keyCopy, 'key')}>
            {copied === 'key' ? 'Copiada! ✓' : 'Copiar chave'}
          </button>
          {canShare && (
            <button className="btn btn--outline btn--small" onClick={share}>
              Compartilhar
            </button>
          )}
        </div>
      </div>

      <div className="gifts__grid">
        {GIFTS.map((gift) => (
          <button
            key={gift.id}
            className={`gift-card ${gift.price ? '' : 'gift-card--free'}`}
            onClick={() => setSelected(gift)}
          >
            <span className="gift-card__icon" aria-hidden>{gift.icon}</span>
            <span className="gift-card__name">{gift.name}</span>
            <span className="gift-card__desc">{gift.description}</span>
            <span className="gift-card__price">{formatPrice(gift)}</span>
            <span className="gift-card__cta">Presentear</span>
          </button>
        ))}
      </div>

      {selected && <GiftModal gift={selected} onClose={() => setSelected(null)} />}
    </section>
  )
}

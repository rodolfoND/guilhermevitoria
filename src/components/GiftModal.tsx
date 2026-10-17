import { useEffect, useMemo, useState } from 'react'
import QRCode from 'qrcode'
import { PIX } from '../config'
import { formatPrice, type Gift } from '../data/gifts'
import { buildPixPayload, maxMessageLength } from '../lib/pix'
import { useCopy } from '../lib/useCopy'

const MESSAGE_MAX = maxMessageLength(PIX.key)

interface Props {
  gift: Gift
  onClose: () => void
}

export default function GiftModal({ gift, onClose }: Props) {
  const [donor, setDonor] = useState('')
  const freeValue = !gift.price
  const label = freeValue ? 'Presente para os noivos' : gift.name
  // Limita o nome para que "<nome> - <presente>" caiba inteiro na descrição do PIX
  const donorMax = MESSAGE_MAX - label.length - 3
  const fallback = freeValue ? label : `Presente: ${gift.name}`
  const message = donor.trim() ? `${donor.trim()} - ${label}` : fallback
  const payload = useMemo(
    () => buildPixPayload({ ...PIX, amount: gift.price, message }),
    [gift.price, message],
  )
  const [qr, setQr] = useState('')
  const { copied, copy } = useCopy<'code' | 'key'>()

  useEffect(() => {
    QRCode.toDataURL(payload, { width: 280, margin: 1, color: { dark: '#2f3a2c', light: '#ffffff' } })
      .then(setQr)
      .catch(() => setQr(''))
  }, [payload])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div className="modal" role="dialog" aria-modal="true" aria-labelledby="gift-title" onClick={onClose}>
      <div className="modal__box" onClick={(e) => e.stopPropagation()}>
        <button className="modal__close" aria-label="Fechar" onClick={onClose}>×</button>

        <div className="modal__head">
          <span className="modal__icon" aria-hidden>{gift.icon}</span>
          <h3 id="gift-title" className="modal__title">{gift.name}</h3>
          <p className="modal__price">{formatPrice(gift)}</p>
        </div>

        <div className="modal__pay">
          <label className="modal__donor">
            <span>
              Seu nome <em>(opcional)</em>
            </span>
            <input
              type="text"
              value={donor}
              maxLength={donorMax}
              placeholder="Ex.: Maria e João"
              onChange={(e) => setDonor(e.target.value)}
              enterKeyHint="done"
              autoComplete="name"
              autoCapitalize="words"
            />
            <small>Assim os noivos sabem quem enviou o presente.</small>
          </label>

          <p className="modal__hint">PIX copia e cola</p>
          <a
            className="modal__code"
            href="#pix"
            onClick={(e) => {
              e.preventDefault()
              copy(payload, 'code')
            }}
            title="Clique para copiar o código PIX"
          >
            <span>{payload}</span>
          </a>
          <button className="btn modal__btn" onClick={() => copy(payload, 'code')}>
            {copied === 'code' ? 'Código copiado! ✓' : 'Copiar código PIX'}
          </button>
          <p className="modal__hint modal__hint--small">
            Cole o código na opção “PIX copia e cola” do app do seu banco
            {freeValue ? ' e digite o valor que quiser.' : '.'}
          </p>
        </div>

        <div className="modal__key">
          <div>
            <span>Chave PIX ({PIX.keyType}) · {PIX.receiver}</span>
            <strong>{PIX.keyLabel}</strong>
          </div>
          <button className="btn btn--outline btn--small" onClick={() => copy(PIX.keyCopy, 'key')}>
            {copied === 'key' ? 'Copiada! ✓' : 'Copiar chave'}
          </button>
        </div>

        <div className="modal__scan">
          <div className="modal__qr">
            {qr ? <img src={qr} alt={freeValue ? 'QR code PIX com valor livre' : `QR code PIX de ${formatPrice(gift)}`} /> : <span>Gerando QR code…</span>}
          </div>
          <p className="modal__hint modal__hint--small">
            Escaneie com o app do seu banco.{' '}
            {freeValue ? 'Depois, digite o valor que quiser.' : 'O valor já vem preenchido.'}
          </p>
        </div>

        <p className="modal__thanks">Muito obrigado pelo carinho! ♥</p>
      </div>
    </div>
  )
}

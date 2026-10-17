import { useEffect, useMemo, useState } from 'react'
import QRCode from 'qrcode'
import { PIX } from '../config'
import { formatBRL, type Gift } from '../data/gifts'
import { buildPixPayload, maxMessageLength } from '../lib/pix'

const MESSAGE_MAX = maxMessageLength(PIX.key)

interface Props {
  gift: Gift
  onClose: () => void
}

export default function GiftModal({ gift, onClose }: Props) {
  const [donor, setDonor] = useState('')
  // Limita o nome para que "<nome> - <presente>" caiba inteiro na descrição do PIX
  const donorMax = MESSAGE_MAX - gift.name.length - 3
  const message = donor.trim() ? `${donor.trim()} - ${gift.name}` : `Presente: ${gift.name}`
  const payload = useMemo(
    () => buildPixPayload({ ...PIX, amount: gift.price, message }),
    [gift.price, message],
  )
  const [qr, setQr] = useState('')
  const [copied, setCopied] = useState<'code' | 'key' | null>(null)

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

  const copy = async (text: string, what: 'code' | 'key') => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(what)
      setTimeout(() => setCopied(null), 2000)
    } catch {
      window.prompt('Copie o texto abaixo:', text)
    }
  }

  return (
    <div className="modal" role="dialog" aria-modal="true" aria-labelledby="gift-title" onClick={onClose}>
      <div className="modal__box" onClick={(e) => e.stopPropagation()}>
        <button className="modal__close" aria-label="Fechar" onClick={onClose}>×</button>

        <div className="modal__head">
          <span className="modal__icon" aria-hidden>{gift.icon}</span>
          <h3 id="gift-title" className="modal__title">{gift.name}</h3>
          <p className="modal__price">{formatBRL(gift.price)}</p>
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
            Cole o código na opção “PIX copia e cola” do app do seu banco.
          </p>
        </div>

        <div className="modal__key">
          <div>
            <span>Chave PIX (e-mail)</span>
            <strong>{PIX.key}</strong>
          </div>
          <button className="btn btn--outline btn--small" onClick={() => copy(PIX.key, 'key')}>
            {copied === 'key' ? 'Copiada! ✓' : 'Copiar chave'}
          </button>
        </div>

        <div className="modal__scan">
          <div className="modal__qr">
            {qr ? <img src={qr} alt={`QR code PIX de ${formatBRL(gift.price)}`} /> : <span>Gerando QR code…</span>}
          </div>
          <p className="modal__hint modal__hint--small">
            Escaneie com o app do seu banco. O valor já vem preenchido.
          </p>
        </div>

        <p className="modal__thanks">Muito obrigado pelo carinho! ♥</p>
      </div>
    </div>
  )
}

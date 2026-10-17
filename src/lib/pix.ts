// Gerador de BR Code PIX estático (padrão EMV usado pelo Banco Central)

function field(id: string, value: string): string {
  return id + value.length.toString().padStart(2, '0') + value
}

function sanitize(text: string, maxLength: number): string {
  return text
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^A-Za-z0-9 ]/g, '')
    .toUpperCase()
    .slice(0, maxLength)
}

// CRC16-CCITT (polinômio 0x1021, valor inicial 0xFFFF)
function crc16(payload: string): string {
  let crc = 0xffff
  for (let i = 0; i < payload.length; i++) {
    crc ^= payload.charCodeAt(i) << 8
    for (let bit = 0; bit < 8; bit++) {
      crc = crc & 0x8000 ? (crc << 1) ^ 0x1021 : crc << 1
      crc &= 0xffff
    }
  }
  return crc.toString(16).toUpperCase().padStart(4, '0')
}

interface PixOptions {
  key: string
  merchantName: string
  merchantCity: string
  amount?: number
  txid?: string
  // Descrição exibida pelo banco do pagador (campo opcional "infoAdicional")
  message?: string
}

const accountBase = (key: string) => field('00', 'br.gov.bcb.pix') + field('01', key)

// O campo 26 inteiro não pode passar de 99 caracteres
export function maxMessageLength(key: string): number {
  return 99 - accountBase(key).length - 4
}

// Remove acentos e símbolos que alguns bancos não aceitam
export function sanitizeMessage(message: string): string {
  return message
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^A-Za-z0-9 .,:;!?()'/-]/g, '')
}

export function buildPixPayload({ key, merchantName, merchantCity, amount, txid = '***', message }: PixOptions): string {
  let account = accountBase(key)
  if (message) {
    const text = sanitizeMessage(message).trim().slice(0, maxMessageLength(key))
    if (text) account += field('02', text)
  }

  const payload =
    field('00', '01') +
    field('26', account) +
    field('52', '0000') +
    field('53', '986') +
    (amount ? field('54', amount.toFixed(2)) : '') +
    field('58', 'BR') +
    field('59', sanitize(merchantName, 25)) +
    field('60', sanitize(merchantCity, 15)) +
    field('62', field('05', txid)) +
    '6304'
  return payload + crc16(payload)
}

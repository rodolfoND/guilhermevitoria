export const EVENT = {
  bride: 'Vitória',
  groom: 'Guilherme',
  // 07/11/2026 às 20h (horário de Brasília)
  date: new Date('2026-11-07T20:00:00-03:00'),
  dateLabel: 'Sábado, 07 de novembro de 2026',
  timeLabel: '20h',
  church: 'Igreja de São Sebastião',
  city: 'Pará de Minas – MG',
  address: 'R. Aprígio Guimarães Pena – Bairro São José',
  // Consulta usada no mapa e na rota
  mapsQuery: 'Igreja São Sebastião, R. Aprígio Guimarães Pena, São José, Pará de Minas - MG, 35660-575',
}

export const PIX = {
  // Chave celular no formato exigido pelo BR Code (+55 DDD número)
  key: '+5537999369799',
  // Versões exibida e copiada pelo convidado
  keyLabel: '(37) 99936-9799',
  keyCopy: '37999369799',
  keyType: 'celular',
  receiver: 'Vitória Carvalho Sousa Alvernaz',
  // Nome e cidade do recebedor: sem acentos, até 25 e 15 caracteres
  merchantName: 'VITORIA CARVALHO ALVERNAZ',
  merchantCity: 'PARA DE MINAS',
}

export const PHOTOS = {
  hero: '/fotos/casal.jpg',
  couple: '/fotos/ensaio-escada.jpg',
}

export interface Photo {
  src: string
  alt: string
  // Enquadramento da miniatura (object-position)
  position: string
}

export const GALLERY: Photo[] = [
  { src: '/fotos/ensaio-abraco.jpg', alt: 'Vitória e Guilherme abraçados, ela sorrindo', position: '30% 45%' },
  { src: '/fotos/ensaio-escada.jpg', alt: 'Vitória e Guilherme sentados na escada de pedra entre as folhagens', position: '50% 75%' },
  { src: '/fotos/ensaio-caminho.jpg', alt: 'Vitória e Guilherme de costas, abraçados no caminho de pedras', position: '55% 70%' },
  { src: '/fotos/casal.jpg', alt: 'Vitória e Guilherme sorrindo juntos', position: '55% 25%' },
]

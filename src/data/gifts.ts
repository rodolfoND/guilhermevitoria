export interface Gift {
  id: string
  name: string
  description: string
  // Sem valor: o convidado escolhe quanto enviar no app do banco
  price?: number
  icon: string
}

export const GIFTS: Gift[] = [
  { id: 'tacas', name: 'Jogo de taças de cristal', description: 'Para brindar todas as conquistas.', price: 50, icon: '🥂' },
  { id: 'liquidificador', name: 'Liquidificador', description: 'Sucos e vitaminas no café da manhã.', price: 100, icon: '🍹' },
  { id: 'churrasco', name: 'Kit churrasco', description: 'Para reunir a família no fim de semana.', price: 150, icon: '🔥' },
  { id: 'jantar', name: 'Jantar romântico', description: 'Uma noite especial a dois na lua de mel.', price: 200, icon: '🍷' },
  { id: 'cama', name: 'Jogo de cama king', description: 'Lençóis macios para noites tranquilas.', price: 250, icon: '🛏️' },
  { id: 'cafeteira', name: 'Cafeteira expresso', description: 'Porque todo dia começa com um bom café.', price: 300, icon: '☕' },
  { id: 'panelas', name: 'Jogo de panelas', description: 'Para as receitas da nova casa.', price: 400, icon: '🍳' },
  { id: 'airfryer', name: 'Air fryer', description: 'Praticidade na cozinha dos recém-casados.', price: 500, icon: '🍟' },
  { id: 'luademel', name: 'Cota lua de mel', description: 'Ajude a realizar a viagem dos sonhos.', price: 700, icon: '✈️' },
  { id: 'balao', name: 'Passeio de balão', description: 'Uma vista inesquecível lá do alto.', price: 800, icon: '🎈' },
  { id: 'aluguel', name: 'Primeiro aluguel', description: 'Uma ajudinha para o lar doce lar.', price: 1000, icon: '🏡' },
  { id: 'robo', name: 'Aspirador robô', description: 'Mais tempo juntos, menos tempo limpando.', price: 1500, icon: '🤖' },
  { id: 'outras', name: 'Outras', description: 'Presenteie com o valor que preferir.', icon: '💝' },
]

export const formatBRL = (value: number) =>
  value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

export const formatPrice = (gift: Gift) => (gift.price ? formatBRL(gift.price) : 'Valor livre')

export interface Gift {
  id: string
  name: string
  description: string
  price: number
  icon: string
}

export const GIFTS: Gift[] = [
  { id: 'jantar', name: 'Jantar romântico', description: 'Uma noite especial a dois na lua de mel.', price: 200, icon: '🍷' },
  { id: 'tacas', name: 'Jogo de taças de cristal', description: 'Para brindar todas as conquistas.', price: 150, icon: '🥂' },
  { id: 'liquidificador', name: 'Liquidificador', description: 'Sucos e vitaminas no café da manhã.', price: 180, icon: '🍹' },
  { id: 'churrasco', name: 'Kit churrasco', description: 'Para reunir a família no fim de semana.', price: 250, icon: '🔥' },
  { id: 'cama', name: 'Jogo de cama king', description: 'Lençóis macios para noites tranquilas.', price: 280, icon: '🛏️' },
  { id: 'cafeteira', name: 'Cafeteira expresso', description: 'Porque todo dia começa com um bom café.', price: 300, icon: '☕' },
  { id: 'panelas', name: 'Jogo de panelas', description: 'Para as receitas da nova casa.', price: 350, icon: '🍳' },
  { id: 'airfryer', name: 'Air fryer', description: 'Praticidade na cozinha dos recém-casados.', price: 450, icon: '🍟' },
  { id: 'luademel', name: 'Cota lua de mel', description: 'Ajude a realizar a viagem dos sonhos.', price: 500, icon: '✈️' },
  { id: 'balao', name: 'Passeio de balão', description: 'Uma vista inesquecível lá do alto.', price: 800, icon: '🎈' },
  { id: 'aluguel', name: 'Primeiro aluguel', description: 'Uma ajudinha para o lar doce lar.', price: 1000, icon: '🏡' },
  { id: 'robo', name: 'Aspirador robô', description: 'Mais tempo juntos, menos tempo limpando.', price: 1200, icon: '🤖' },
]

export const formatBRL = (value: number) =>
  value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

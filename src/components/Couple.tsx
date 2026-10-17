import { COUPLE_PHOTO } from '../config'

export default function Couple() {
  return (
    <section id="casal" className="section couple">
      <div className="couple__photo">
        <img src={COUPLE_PHOTO} alt="Guilherme e Vitória sorrindo juntos" />
      </div>
      <div className="couple__text">
        <p className="section__kicker">Nossa história</p>
        <h2 className="section__title">O casal</h2>
        <p>
          Histórias de amor existem, e, às vezes, nem nós mesmos acreditamos todo o tempo que já
          estamos juntos. O brilho no olhar de cada um nos lembra, todos os dias, por que essa
          caminhada tem sido tão leve e tão cheia de alegria.
        </p>
        <p>
          Agora chegou a hora de dar o próximo passo: <strong>vamos nos casar!</strong> Estamos
          preparando tudo com muito carinho para viver esse momento ao lado de quem amamos.
        </p>
        <p>
          Criamos este site para compartilhar com vocês os detalhes do nosso casamento. Aguardamos
          vocês no nosso grande dia!
        </p>
        <p className="couple__signature">Guilherme &amp; Vitória</p>
      </div>
    </section>
  )
}

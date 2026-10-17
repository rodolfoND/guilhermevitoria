import { EVENT } from '../config'

const query = encodeURIComponent(EVENT.mapsQuery)
const embedUrl = `https://www.google.com/maps?q=${query}&output=embed`
const routeUrl = `https://www.google.com/maps/dir/?api=1&destination=${query}`
const wazeUrl = `https://waze.com/ul?q=${query}&navigate=yes`

export default function Ceremony() {
  return (
    <section id="cerimonia" className="section ceremony">
      <p className="section__kicker">Cerimônia religiosa</p>
      <h2 className="section__title">Quando e onde</h2>

      <div className="ceremony__grid">
        <div className="ceremony__info">
          <div className="info-item">
            <span className="info-item__label">Data</span>
            <span className="info-item__value">{EVENT.dateLabel}</span>
          </div>
          <div className="info-item">
            <span className="info-item__label">Horário</span>
            <span className="info-item__value">{EVENT.timeLabel}</span>
          </div>
          <div className="info-item">
            <span className="info-item__label">Local</span>
            <span className="info-item__value">
              {EVENT.church}
              <br />
              <small>{EVENT.address}</small>
              <br />
              {EVENT.city}
            </span>
          </div>

          <div className="ceremony__actions">
            <a className="btn" href={routeUrl} target="_blank" rel="noreferrer">
              Rota no Google Maps
            </a>
            <a className="btn btn--outline" href={wazeUrl} target="_blank" rel="noreferrer">
              Abrir no Waze
            </a>
          </div>
        </div>

        <div className="ceremony__map">
          <iframe
            title="Mapa da Igreja de São Sebastião"
            src={embedUrl}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>

      <div className="notice">
        <span className="notice__icon" aria-hidden>♥</span>
        <p>
          <strong>Os noivos receberão os cumprimentos no local</strong>, logo após a cerimônia.
          Contamos com a presença e o abraço de cada um de vocês!
        </p>
      </div>
    </section>
  )
}

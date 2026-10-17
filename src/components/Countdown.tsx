import { useEffect, useState } from 'react'

function getRemaining(target: Date) {
  const diff = Math.max(0, target.getTime() - Date.now())
  return {
    done: diff === 0,
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor(diff / 3_600_000) % 24,
    minutes: Math.floor(diff / 60_000) % 60,
    seconds: Math.floor(diff / 1000) % 60,
  }
}

export default function Countdown({ target }: { target: Date }) {
  const [remaining, setRemaining] = useState(() => getRemaining(target))

  useEffect(() => {
    const id = setInterval(() => setRemaining(getRemaining(target)), 1000)
    return () => clearInterval(id)
  }, [target])

  if (remaining.done) {
    return <p className="countdown__done">Chegou o grande dia! ♥</p>
  }

  const units = [
    { value: remaining.days, label: remaining.days === 1 ? 'dia' : 'dias' },
    { value: remaining.hours, label: 'horas' },
    { value: remaining.minutes, label: 'min' },
    { value: remaining.seconds, label: 'seg' },
  ]

  return (
    <div className="countdown" role="timer" aria-label="Contagem regressiva para o casamento">
      {units.map((unit) => (
        <div key={unit.label} className="countdown__unit">
          <span className="countdown__value">{String(unit.value).padStart(2, '0')}</span>
          <span className="countdown__label">{unit.label}</span>
        </div>
      ))}
    </div>
  )
}

import { useState } from 'react'

// Copia um texto e lembra por 2s qual item foi copiado (para trocar o rótulo do botão)
export function useCopy<T extends string>() {
  const [copied, setCopied] = useState<T | null>(null)

  const copy = async (text: string, what: T) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(what)
      setTimeout(() => setCopied(null), 2000)
    } catch {
      window.prompt('Copie o texto abaixo:', text)
    }
  }

  return { copied, copy }
}

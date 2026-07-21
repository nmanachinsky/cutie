import { useEffect, useRef, useState } from 'react'

const CHARS_PER_TICK = 2
const TICK_MS = 20

export function useTypewriter(text: string): { displayed: string; isDone: boolean; finish: () => void } {
  const [displayed, setDisplayed] = useState('')
  const indexRef = useRef(0)

  useEffect(() => {
    indexRef.current = 0
    setDisplayed('')

    const interval = setInterval(() => {
      indexRef.current = Math.min(indexRef.current + CHARS_PER_TICK, text.length)
      setDisplayed(text.slice(0, indexRef.current))
      if (indexRef.current >= text.length) clearInterval(interval)
    }, TICK_MS)

    return () => clearInterval(interval)
  }, [text])

  const finish = () => {
    indexRef.current = text.length
    setDisplayed(text)
  }

  return { displayed, isDone: displayed.length === text.length, finish }
}

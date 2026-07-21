import { type ReactNode, useEffect, useState } from 'react'
import styles from './PhoneFrame.module.css'

const PHONE_WIDTH = 390

function isTouchDevice() {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0
}

export function PhoneFrame({ children }: { children: ReactNode }) {
  const [isMobile, setIsMobile] = useState(isTouchDevice)

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${PHONE_WIDTH}px)`)
    const update = () => setIsMobile(isTouchDevice() || mql.matches)
    mql.addEventListener('change', update)
    return () => mql.removeEventListener('change', update)
  }, [])

  if (isMobile) return <>{children}</>

  return (
    <div className={styles.frame}>
      <div className={styles.screen}>{children}</div>
    </div>
  )
}

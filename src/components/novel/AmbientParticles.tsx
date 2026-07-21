import { useMemo } from 'react'
import { motion } from 'framer-motion'
import styles from './AmbientParticles.module.css'

const PARTICLE_COUNT = 14

interface Particle {
  id: number
  left: number
  size: number
  duration: number
  delay: number
}

function generateParticles(): Particle[] {
  return Array.from({ length: PARTICLE_COUNT }, (_, id) => ({
    id,
    left: Math.random() * 100,
    size: 6 + Math.random() * 10,
    duration: 12 + Math.random() * 10,
    delay: Math.random() * 10,
  }))
}

export function AmbientParticles() {
  const particles = useMemo(generateParticles, [])

  return (
    <div className={styles.layer} aria-hidden="true">
      {particles.map((particle) => (
        <motion.span
          key={particle.id}
          className={styles.particle}
          style={{ left: `${particle.left}%`, width: particle.size, height: particle.size }}
          initial={{ y: '110vh', opacity: 0 }}
          animate={{ y: '-10vh', opacity: [0, 0.8, 0.8, 0] }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  )
}

import { motion } from 'framer-motion'
import type { ComponentProps } from 'react'
import styles from './Button.module.css'

type Variant = 'primary' | 'secondary' | 'outline'

interface ButtonProps extends ComponentProps<typeof motion.button> {
  variant?: Variant
}

export function Button({ variant = 'primary', className, children, ...rest }: ButtonProps) {
  return (
    <motion.button
      type="button"
      className={[styles.button, styles[variant], className].filter(Boolean).join(' ')}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.15, ease: 'easeOut' }}
      {...rest}
    >
      {children}
    </motion.button>
  )
}

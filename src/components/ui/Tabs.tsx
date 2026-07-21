import { createContext, useContext, useState } from 'react'
import type { ReactNode } from 'react'
import styles from './Tabs.module.css'

interface TabsContextValue {
  value: string
  setValue: (value: string) => void
}

const TabsContext = createContext<TabsContextValue | null>(null)

function useTabsContext(): TabsContextValue {
  const ctx = useContext(TabsContext)
  if (!ctx) throw new Error('Tabs.* must be used inside <Tabs>')
  return ctx
}

interface TabsProps {
  defaultValue: string
  children: ReactNode
}

export function Tabs({ defaultValue, children }: TabsProps) {
  const [value, setValue] = useState(defaultValue)
  return <TabsContext.Provider value={{ value, setValue }}>{children}</TabsContext.Provider>
}

Tabs.List = function TabsList({ children }: { children: ReactNode }) {
  return <div className={styles.list}>{children}</div>
}

Tabs.Trigger = function TabsTrigger({ value, children }: { value: string; children: ReactNode }) {
  const ctx = useTabsContext()
  const isActive = ctx.value === value
  return (
    <button
      type="button"
      className={[styles.trigger, isActive ? styles.active : ''].join(' ')}
      onClick={() => ctx.setValue(value)}
    >
      {children}
    </button>
  )
}

Tabs.Panel = function TabsPanel({ value, children }: { value: string; children: ReactNode }) {
  const ctx = useTabsContext()
  if (ctx.value !== value) return null
  return <div className={styles.panel}>{children}</div>
}

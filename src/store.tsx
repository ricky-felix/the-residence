import { createContext, useContext, useMemo, useState } from 'react'
import type { ReactNode } from 'react'

/** State shared between sections. Most state is local to its component;
    only the calculator price is shared (the unit picker sets it). */
interface SiteState {
  /** Sample property price in IDR used by the payment calculator. */
  price: number
  setPrice: (price: number) => void
}

const SiteContext = createContext<SiteState | null>(null)

export function SiteProvider({ children }: { children: ReactNode }) {
  const [price, setPrice] = useState(1_800_000_000)
  const value = useMemo(() => ({ price, setPrice }), [price])
  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>
}

export function useSite(): SiteState {
  const ctx = useContext(SiteContext)
  if (!ctx) throw new Error('useSite must be used inside <SiteProvider>')
  return ctx
}

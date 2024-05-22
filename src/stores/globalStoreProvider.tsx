// src/providers/global-store-provider.tsx
'use client'


import React, { type ReactNode, createContext, useRef, useContext } from 'react'
import { type StoreApi, useStore } from 'zustand'

import {
  type GlobalStore,
  createGlobalStore,
  defaultInitState as initGlobalStore,
} from './globalStore'

export const GlobalStoreContext = createContext<StoreApi<GlobalStore> | null>(
  null,
)

export interface GlobalStoreProviderProps {
  children: ReactNode
}

export const GlobalStoreProvider = ({
  children,
}: GlobalStoreProviderProps) => {
  const storeRef = useRef<StoreApi<GlobalStore>>()
  if (!storeRef.current) {
    storeRef.current = createGlobalStore()
  }

  return (
    <GlobalStoreContext.Provider value={storeRef.current}>
      {children}
    </GlobalStoreContext.Provider>
  )
}

export const useGlobalStore = <T,>(
  selector: (store: GlobalStore) => T,
): T => {
  const globalStoreContext = useContext(GlobalStoreContext)

  if (!globalStoreContext) {
    throw new Error(`useGlobalStore must be use within GlobalStoreProvider`)
  }

  return useStore(globalStoreContext, selector)
}


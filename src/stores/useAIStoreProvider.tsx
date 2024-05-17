// src/providers/ai-store-provider.tsx
'use client' // This directive tells Next.js to render this component on the client-side

import React, { type ReactNode, createContext, useRef, useContext } from 'react'
import { type StoreApi, useStore } from 'zustand' // Importing types and hooks from the zustand library

// Importing types and functions related to the AIStore
import {
  type AIStore,
  createAIStore,
  defaultInitState as initAIStore,
} from './useAIStore'

// Creating a context for the AIStore
export const AIStoreContext = createContext<StoreApi<AIStore> | null>(null)

// Interface for the props of the AIStoreProvider component
export interface AIStoreProviderProps {
  children: ReactNode
}

// AIStoreProvider component
export const AIStoreProvider = ({ children }: AIStoreProviderProps) => {
  // Using a ref to store the AIStore instance
  const storeRef = useRef<StoreApi<AIStore>>()

  // Creating the AIStore instance if it doesn't exist
  if (!storeRef.current) {
    storeRef.current = createAIStore()
  }

  // Providing the AIStore instance to the context
  return (
    <AIStoreContext.Provider value={storeRef.current}>
      {children}
    </AIStoreContext.Provider>
  )
}

// Custom hook to access the AIStore
export const useAIStore = <T,>(selector: (store: AIStore) => T): T => {
  // Getting the AIStore instance from the context
  const aiStoreContext = useContext(AIStoreContext)

  // Throwing an error if the AIStore context is not available
  if (!aiStoreContext) {
    throw new Error(`useAIStore must be used within AIStoreProvider`)
  }

  // Using the zustand useStore hook to access the AIStore
  return useStore(aiStoreContext, selector)
}
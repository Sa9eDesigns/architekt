// src/providers/ai-store-provider.tsx
'use client' // This directive tells Next.js to render this component on the client-side

import React, { type ReactNode, createContext, useRef, useContext } from 'react'
import { type StoreApi, useStore } from 'zustand' // Importing types and hooks from the zustand library

// Importing types and functions related to the AIStore
import {
  type T_AIStore,
  createAIStore,
  defaultInitState as initAIStore,
} from './useAIStore'

// Creating a context for the AIStore
export const AIStoreContext = createContext<StoreApi<T_AIStore> | null>(null)

// Interface for the props of the AIStoreProvider component
export interface AIStoreProviderProps {
  children: ReactNode
}

// AIStoreProvider component
export const AIStoreProvider = ({ children }: AIStoreProviderProps) => {
  // Using a ref to store the AIStore instance
  const storeRef = useRef<StoreApi<T_AIStore>>()

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
export const useAIStore = <T,>(selector: (store: T_AIStore) => T): T => {
  // Getting the AIStore instance from the context
  const aiStoreContext = useContext(AIStoreContext)

  // Throwing an error if the AIStore context is not available
  if (!aiStoreContext) {
    throw new Error(`useAIStore must be used within AIStoreProvider`)
  }

  // Using the zustand useStore hook to access the AIStore
  return useStore(aiStoreContext, selector)
}

/*AIStoreProvider Example Usage:

// Import the AIStoreProvider in your _app.tsx file
import { AIStoreProvider } from '@/providers/ai-store-provider'

// Wrap your application with the AIStoreProvider
function MyApp({ Component, pageProps }) {
  return (
    <AIStoreProvider>
      <Component {...pageProps} />
    </AIStoreProvider>
  )
}

export default MyApp


// Use the useAIStore hook in your components to access the AIStore
import { useAIStore } from '@/providers/ai-store-provider'

function MyComponent() {
  const isAssistantVisible = useAIStore((state) => state.isAssistantVisible)
  return <div>{isAssistantVisible ? 'Assistant is visible' : 'Assistant is hidden'}</div>
}

 //To call the actions of the AIStore, you can use the useAIStore hook with the action functions
 e.g: Lets use the assignAssistantVisibility action function

  import { useAIStore } from '@/providers/ai-store-provider'

  function MyComponent() {
    const assignAssistantVisibility = useAIStore((state) => state.assignAssistantVisibility)
    return <button onClick={() => assignAssistantVisibility(true)}>Show Assistant</button>
  }
  
*/

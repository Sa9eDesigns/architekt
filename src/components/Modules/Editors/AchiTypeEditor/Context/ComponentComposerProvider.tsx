"use client"; // This directive tells Next.js to render this component on the client-side

import React, {
  type ReactNode,
  createContext,
  useRef,
  useContext,
} from "react";
import { type StoreApi, useStore } from "zustand";
import {
  useComponentComposerStore,
  T_ComponentComposerStore,
} from "./ComponentComposerStore";

// Creating a context for the ComponentComposerStore
export const ComponentComposerStoreContext =
  createContext<StoreApi<T_ComponentComposerStore> | null>(null);

// Interface for the props of the ComponentComposerStoreProvider component
export interface ComponentComposerStoreProviderProps {
  children: ReactNode;
}

// ComponentComposerStoreProvider component
export const ComponentComposerStoreProvider = ({
  children,
}: ComponentComposerStoreProviderProps) => {
  // Using a ref to store the ComponentComposerStore instance
  const storeRef = useRef<StoreApi<T_ComponentComposerStore>>();

  // Creating the ComponentComposerStore instance if it doesn't exist
  if (!storeRef.current) {
    storeRef.current = useComponentComposerStore;
  }

  // Providing the ComponentComposerStore instance to the context
  return (
    <ComponentComposerStoreContext.Provider value={storeRef.current}>
      {children}
    </ComponentComposerStoreContext.Provider>
  );
};

// Custom hook to access the ComponentComposerStore
export const useComponentComposerStoreContext = <T,>(
  selector: (store: T_ComponentComposerStore) => T
): T => {
  // Getting the ComponentComposerStore instance from the context
  const storeContext = useContext(ComponentComposerStoreContext);

  // Throwing an error if the ComponentComposerStore context is not available
  if (!storeContext) {
    throw new Error(
      `useComponentComposerStoreContext must be used within ComponentComposerStoreProvider`
    );
  }

  // Using the zustand useStore hook to access the ComponentComposerStore
  return useStore(storeContext, selector);
};



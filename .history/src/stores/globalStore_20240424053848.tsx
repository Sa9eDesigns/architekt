import { createStore } from 'zustand/vanilla'

// Define the types for all the states
export type GlobalState = {
  theme: 'light' | 'dark',
  sidebarOpen: boolean,
}

// Define the types for all the actions
export type GlobalActions = {
  toggleTheme: () => void,
  toggleSidebar: () => void,
}

// Define the types for the store
export type GlobalStore = GlobalState & GlobalActions

// Define the default initial values for the state
export const initGlobalStore: GlobalState = {
  theme: 'dark',
  sidebarOpen: true,
}

// Create the store
export const createGlobalStore = (
  //use the default initial values if none are provided
  initState: GlobalState = initGlobalStore
) => {
  //use the defined types for the store
  return createStore<GlobalStore>((set) => ({
    ...initState,
    
    // The actions are functions that take the current state and return the new state
    //--toggle theme
    toggleTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),

    //--toggle sidebar
    toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  }))
}

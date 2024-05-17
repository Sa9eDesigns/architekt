import { createStore } from 'zustand/vanilla';

// Define the types for all the states
export type AIState = {
  isContextAware: boolean;
  isCoPilot: boolean;
};

// Define the types for all the actions
export type AIActions = {
  toggleContextAware: () => void;
  toggleCoPilot: () => void;
  useRewrite: () => void;
  useSend: () => void;
};

// Define the types for the store
export type AIStore = AIState & AIActions;

// Define the default initial values for the state
export const defaultInitState: AIState = {
  isContextAware: false,
  isCoPilot: false,
};

// Create the store
export const createAIStore = (
  // Use the default initial values if none are provided
  initState: AIState = defaultInitState
) => {
  // Use the defined types for the store
  return createStore<AIStore>((set) => ({
    ...initState,
    
    // The actions are functions that take the current state and return the new state
    toggleContextAware: () => set((state) => ({ isContextAware: !state.isContextAware })),
    toggleCoPilot: () => set((state) => ({ isCoPilot: !state.isCoPilot })),
    useRewrite: () => set((state) => ({ /* your logic here */ })),
    useSend: () => set((state) => ({ /* your logic here */ })),
  }));
};
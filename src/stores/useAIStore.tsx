/*This Defines the States, Functions, Events and Actions For the AI */

import { createStore } from 'zustand/vanilla';
import _ from 'lodash';

// Define the types for all the states
export type T_AIState = {
  //-if the assistant is open or not
  isAssistantVisible: boolean;

  isContextAware: boolean;
  isCoPilot: boolean;
};

// Define the types for all the actions
export type T_AIActions = {

  //-function to open the assistant
  assignAssistantVisibility: (visibility: boolean) => void;

  toggleContextAware: () => void;
  toggleCoPilot: () => void;
  useRewrite: () => void;
  useSend: () => void;
};

// Define the types for the store
export type T_AIStore = T_AIState & T_AIActions;

// Define the default initial values for the state
export const defaultInitState: T_AIState = {

  isAssistantVisible: false,

  isContextAware: false,
  isCoPilot: false,
};

// Create the store
export const createAIStore = (
  // Use the default initial values if none are provided
  initState: T_AIState = defaultInitState
) => {
  // Use the defined types for the store
  return createStore<T_AIStore>((set) => ({
    ...initState,
    // The actions are functions that take the current state and return the new state

    //--function to toggle the assistant visibility
    assignAssistantVisibility: (visibility) => set(() => ({
      //-set the assistant visibility to the provided value
      isAssistantVisible: visibility,
    })),


    toggleContextAware: () => set((state) => ({ isContextAware: !state.isContextAware })),
    toggleCoPilot: () => set((state) => ({ isCoPilot: !state.isCoPilot })),
    useRewrite: () => set((state) => ({ /* your logic here */ })),
    useSend: () => set((state) => ({ /* your logic here */ })),
  }));
};
/*This Defines the Editor Zustand Store
The Editor Store is responsible for managing the state of the Editor Component.
*/

import { createStore } from "zustand";

// Define the types for all the states
export type EditorState = {
  components: Array<any>,
  selectedComponent: any,
}

// Define the types for all the actions
export type EditorActions = {
  addComponent: (component: any) => void,
  removeComponent: (id: string) => void,
  selectComponent: (id: string) => void,
}

// Define the types for the store
export type EditorStore = EditorState & EditorActions

// Define the default initial values for the state
export const defaultInitState: EditorState = {
  components: [],
  selectedComponent: null,
}

// Create the store
export const createEditorStore = (
  //use the default initial values if none are provided
  initState: EditorState = defaultInitState
) => {
  //use the defined types for the store
  return createStore<EditorStore>((set) => ({
    ...initState,
    
    // The actions are functions that take the current state and return the new state
    //--add component
    addComponent: (component) => set((state) => ({ components: [...state.components, component] })),

    //--remove component
    removeComponent: (id) => set((state) => ({ components: state.components.filter((component) => component.id !== id) })),

    //--select component
    selectComponent: (id) => set((state) => ({ selectedComponent: state.components.find((component) => component.id === id) })),
  }))
}
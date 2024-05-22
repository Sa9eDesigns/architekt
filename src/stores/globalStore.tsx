import { ProjectItem } from '@/types/projects'
import { createStore } from 'zustand/vanilla'

// Define the types for all the states
export type GlobalState = {
  //General
  theme: 'light' | 'dark',
  sidebarOpen: boolean,

  //Project
  allProjects: ProjectItem[],
  currentProject: ProjectItem,
}

// Define the types for all the actions
export type GlobalActions = {
  //General
  toggleTheme: () => void,
  toggleSidebar: () => void,

  //Project
  setAllProjects: (projects: ProjectItem[]) => void,
  setCurrentProject: (project: ProjectItem) => void,
}

// Define the types for the store
export type GlobalStore = GlobalState & GlobalActions

// Define the default initial values for the state
export const defaultInitState: GlobalState = {

  //General
  theme: 'dark',
  sidebarOpen: true,

  //Project
  allProjects: [],
  currentProject: {
    id: '',
    name: '',
    description: '',
    organization: '',
    created_at: '',
    updated_at: '',
    status: '',
    template: {
      id: '',
      name: '',
      description: '',
      ui: "MUI",
      templateUrl: '',
      directory: '',
    },
    image: '',
  },
}

// Create the store
export const createGlobalStore = (
  //use the default initial values if none are provided
  initState: GlobalState = defaultInitState
) => {
  //use the defined types for the store
  return createStore<GlobalStore>((set) => ({
    ...initState,
    
    // The actions are functions that take the current state and return the new state
    //--toggle theme
    toggleTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),

    //--toggle sidebar
    toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),

    //--set all projects
    setAllProjects: (projects: ProjectItem[]) => set((state) => ({ allProjects: projects })),

    //--set current project
    setCurrentProject: (project: ProjectItem) => set((state) => ({ currentProject: project })),
  }))
}
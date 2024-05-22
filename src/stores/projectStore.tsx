/*This Defines the Project Store. It is a Zustand store that contains the state and actions for Project related data.
*/
import { createStore } from 'zustand/vanilla'
import _ from 'lodash';
import { createClient } from '@/supabase/server';
/*Project States
- currentProject: The current project that is being viewed
- allProjects: All the projects that the user has access to
*/
export type T_ProjectState = {
  currentProject: {
    created_at: string | null;
    description: string | null;
    end_date: string | null;
    id: number;
    name: string;
    organization: string | null;
    start_date: string | null;
    status: string | null;
    updated_at: string | null;
  };
  allProjects: {
    created_at: string | null;
    description: string | null;
    end_date: string | null;
    id: number;
    name: string;
    organization: string | null;
    start_date: string | null;
    status: string | null;
    updated_at: string | null;
  }[];
};

/*Project Actions
- setCurrentProject: Function to set the current project
- getAllProjects: Function to get all the projects
- getProjectById: Function to get a project by its id
*/

export type T_ProjectActions = {
  setCurrentProject: (project: T_ProjectState['currentProject']) => void;
  getAllUserProjects: () => Promise<void>;
  setAllProjects: (projects: T_ProjectState['allProjects']) => void;
  getProjectById: (id: number) => Promise<void>;
  createProject: (project: T_ProjectState['currentProject']) => Promise<void>;
  updateProject: (project: T_ProjectState['currentProject']) => Promise<void>;
  deleteProject: (id: number) => Promise<void>;

}

/*Project Store
- The Project Store is a combination of the Project State and the Project Actions
*/
export type T_ProjectStore = T_ProjectState & T_ProjectActions;

/*Default Initial State for the Project Store*/
const initialState: T_ProjectState = {
  currentProject: {
    created_at: null,
    description: null,
    end_date: null,
    id: 0,
    name: '',
    organization: null,
    start_date: null,
    status: null,
    updated_at: null,
  },
  allProjects: [],
};

/*Project Store*/

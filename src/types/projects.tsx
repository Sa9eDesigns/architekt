/*
This Defines the Typings for everything related to Projects.
*/

// ProjectItem
//--Defines the Typings for a Project Item. Usually used in a List of Projects.
export interface ProjectItem {
  id: string;
  organization: string //an ID of the Organization that this project belongs to
  name: string;
  description: string;
  image: string | null;
  url: string;
  categories: string[];
}

// ProjectBlock
//--Defines the Typings for a Project Block. A block is a building block of a Project.


// Project
//--Defines the Typings for a Project. This is the full details of a Project.
export interface Project extends ProjectItem {
  slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  
  //The content of the Project
  /* blocks: ProjectBlock[],
  pages: ProjectPage[],
  files: ProjectFile[],
  database: ProjectDatabase[],
  workflows: ProjectWorkflow[],

  //The Settings of the Project
  template: projectTemplate, */
}
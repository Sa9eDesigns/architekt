/*===========================
Project Types And Interfaces
===========================*/
export interface Project {
  id: number;
  name: string;
  description: string;
  organization: string;
  start_date: string;
  end_date: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface ProjectForm {
  name: string;
  description: string;
  template: ITemplate;
  created_at: string;
}

export interface ITemplate {
  id: number;
  name: string;
  description: string;
  ui: "MUI" | "BaseUI",
  created_at: string;
  updated_at: string;
}

export interface ProjectItem {
  id: number;
  name: string;
  description: string;
  template: ITemplate;
  created_at: string;
  updated_at: string;
}

import { ProjectItem } from "@/types/projects";
import { v4 } from "uuid";

const demoProjects: ProjectItem[] = [
  {
    id: v4(),
    name: "Project 1",
    description: "This is a project description",
    organization: "Organization 1",
    created_at: "2021-07-01T00:00:00Z",
    updated_at: "2021-07-01T00:00:00Z",
    status: "active",
    template: {
      id: v4(),
      name: "Template 1",
      description: "This is a template description",
      ui: "MUI",
      templateUrl: "",
      directory: "res/templates/joy-ui-nextjs-ts.zip",
    },
    image: "",
  },
];

export default demoProjects;

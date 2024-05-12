/*
  This file contains the models for the Project feature.
  The models define the structure of the data that will be used in the application.
*/

export const ProjectModel = {
  id: String, // unique identifier for the project
  organization: String, // the organization that the project belongs to
  name: String, // the name of the application being developed
  description: String, // a brief description of the project
  startDate: Date, // the date the project started
  endDate: Date, // the date the project ended
  status: String, // the status of the project (Active, Completed, On Hold, Cancelled)
  application: {
    directory: String, // the directory where the source code is stored
    repository: String // the repository where the source code is stored
  },
  projectTeam: {
    projectManager: {
      id: String, // unique identifier for the user
      name: String, // the name of the project manager
      email: String // the email of the project manager
    },
    developers: [{
      id: String, // unique identifier for the user
      name: String, // the name of the developer
      email: String // the email of the developer
    }],
    guests: [{
      id: String, // unique identifier for the user
      name: String, // the name of the guest
      email: String // the email of the guest
    }]
  },
  progress: {
    progress: Number, // the progress of the project in percentage
    milestones: [{
      id: String, // unique identifier for the milestone
      name: String, // the name of the milestone
      description: String, // a brief description of the milestone
      dueDate: Date, // the due date of the milestone
      status: String // the status of the milestone (Not Started, In Progress, Completed)
    }],
    tasks: [{
      id: String, // unique identifier for the task
      name: String, // the name of the task
      description: String, // a brief description of the task
      dueDate: Date, // the due date of the task
      status: String, // the status of the task (Not Started, In Progress, Completed)
      assignee: String // the id of the user assigned to the task
    }],
    issues: [{
      id: String, // unique identifier for the issue
      name: String, // the name of the issue
      description: String, // a brief description of the issue
      status: String, // the status of the issue (Open, In Progress, Resolved)
      priority: String, // the priority of the issue (Low, Medium, High)
    }],
    notes: [{
      id: String, // unique identifier for the note
      text: String, // the text of the note
      author: String, // the id of the user who wrote the note
      createdAt: Date // the date the note was created
    }]
  }
};

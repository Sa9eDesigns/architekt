'use server'
/**
 * Project Server Actions
 * This file contains all the actions that can be performed on the Project model
 * This includes functions such as creating a new project, updating a project, deleting a project, etc.
 * These function use Node apis and Modules to for acrions such as file system operations, shell commands, etc.
 */

import fs from 'fs-extra';
import path from 'path';
import execa from 'execa';
import { simpleGit, SimpleGit, CleanOptions } from 'simple-git';
import { ProjectModel } from './models';

const git: SimpleGit = simpleGit().clean(CleanOptions.FORCE);

/**
 * Create a new project
 * This function creates a new project directory and initializes a git repository
 * @param project - The project object containing the project details
 */
export const createProject = async (project: ProjectModel) => {
  try {
    // Create the project directory
    const projectDir = path.join(__dirname, `../../projects/${project.id}`);
    await fs.ensureDir(projectDir);

    // Initialize a git repository
    await git.cwd(projectDir).init();

    // Create the project file
    const projectFile = path.join(projectDir, 'project.json');
    await fs.writeJson(projectFile, project);

    return project;
  } catch (error) {
    console.error(error);
    return null;
  }

}
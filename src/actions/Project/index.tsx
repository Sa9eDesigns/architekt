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
//supabase - server
import { createClient } from "@/supabase/server";
import { Database } from '@/types/supabase';

const git: SimpleGit = simpleGit().clean(CleanOptions.FORCE);

/**
  * Get all projects for the user
  * @param userId - the id of the user
  * @returns - an array of all the projects for the user
  * @returns - an empty array if the user has no projects
  * @throws - an error if the user does not exist || if authentication fails
  */
export const getProjects = async (userId: string) => {
  // Create a supabase client
  const supabase = createClient();

  // Get all the projects for the user
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('user_id', userId);

  // Throw an error if there was an error fetching the projects
  if (error) {
    throw new Error(error.message);
  }

  // Return the projects
  return data || [];
}



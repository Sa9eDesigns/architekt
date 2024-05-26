"use client";

/*Define The Context for The Projects
- The Context will be used to query, store and pass the project data to the components that need it
}*/

import React, { createContext, useContext, useState } from "react";
import _ from "lodash";
import { createClient } from "@/supabase/client";

/*CONTEXT*/
const ProjectContext = createContext();

/*PROVIDER*/
export const ProjectProvider = ({ children }) => {
  //STATES
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  //FUNCTIONS
  const fetchProjects = async () => {
    const { data, error } = await createClient().from("projects").select("*");
    if (error) {
      console.log("error", error);
    } else {
      setProjects(data);
      setLoading(false);
    }
  };

  const createProject = async (project) => {
    const { data, error } = await createClient().from("projects").insert([project]);
    if (error) {
      console.log("error", error);
    } else {
      setProjects([...projects, ...data]);
    }
  };

  const updateProject = async (project) => {
    const { data, error } = await createClient().from("projects").update(project).eq("id", project.id);
    if (error) {
      console.log("error", error);
    } else {
      const updatedProjects = _.map(projects, (p) => (p.id === project.id ? project : p));
      setProjects(updatedProjects);
    }
  };

  import { delete as deleteRecord } from "@supabase/supabase-js";

  const deleteProject = async (projectId) => {
    const { data, error } = await createClient().from("projects").delete().eq("id", projectId);
    if (error) {
      console.log("error", error);
    } else {
      const updatedProjects = _.filter(projects, (p) => p.id !== projectId);
      setProjects(updatedProjects);
    }
  };

  return (
    <ProjectContext.Provider
      value={{
        projects,
        loading,
        fetchProjects,
        createProject,
        updateProject,
        deleteProject,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};


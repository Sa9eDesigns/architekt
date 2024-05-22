import { ProjectItem } from "@/types/projects";
import { NextPage } from "next";
import { useRouter } from "next/router";

interface PageProps {
  project: ProjectItem;

}

export default function Page({ project }: PageProps) {
  return(
    <div>
      <h1>{project.name}</h1>
      <p>{project.description}</p>
    </div>
  )
}
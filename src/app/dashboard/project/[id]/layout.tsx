/*
Defines the layout of the project dashboard page
that includes the sidebar and the main content area
*/

"use client";

import * as React from "react";
import Box from "@mui/joy/Box";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

import ProjectNav from "@/components/Project/ProjectNav";

import { AppGlobalsContext } from "@/contexts/AppGlobalsContext";
import { Sheet } from "@mui/joy";

import { useGlobalStore } from "@/stores/globalStoreProvider";

export default function ProjectLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Params;
}) {
  //PARAMS
  const { id } = params;

  //CONSTANTS

  //STATES

  //CONTEXT

  //FUNCTIONS

  //EFFECTS

  //HOOKS

  //RENDER
  return (
    <Sheet>
      <Box sx={{ display: "flex", height: "100vh", overflow: "hidden" }}>
        {/*Project Navigation*/}
        <ProjectNav />

        {/*Main Content*/}
        <Box
          component="main"
          className="MainContent"
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            minWidth: 0,
            height: "100vh",
            gap: 1,
          }}
        >
          {children}
        </Box>
      </Box>
    </Sheet>
  );
}

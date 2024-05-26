'use client';

/*This page Defines the Layout Editor Page
 - 3 Column Layout
 - Left Sidebar : Contains the Components
 - Center : Contains the Layout 
 - Right Sidebar : Contains the Layout Settings
*/

import React from "react";
import { Box, Grid } from "@mui/joy";
import LeftSidebar from "@/components/Modules/Editors/AchiTypeEditor/Components/LeftSidebar";
import LayoutEditor from "@/components/Editor";

export default function LayoutEditorPage() {
  
  //COMPONENTS

  //STATES

  //FUNCTION

  //EFFECTS

  //RENDER
  return (
    <Box sx={{ height: "100vh", overflow: "hidden", width: "100%" }}>
      <LayoutEditor />
    </Box>
  );
}


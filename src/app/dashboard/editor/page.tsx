/*This page Defines the Layout Editor Page
 - 3 Column Layout
 - Left Sidebar : Contains the Components
 - Center : Contains the Layout 
 - Right Sidebar : Contains the Layout Settings
*/

import React from "react";
import { Box, Grid } from "@mui/joy";
import LeftSidebar from "@/components/Modules/Editors/AchiTypeEditor/Components/LeftSidebar";
import LayoutEditor from "@/components/Modules/Editors/AchiTypeEditor/LayoutEditor";

export default function LayoutEditorPage() {
  
  //COMPONENTS

  //STATES

  //FUNCTION

  //EFFECTS

  //RENDER
  return (
    <Box sx={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      <Grid container>
        <Grid xs={3}>
          <LeftSidebar />
        </Grid>
        <Grid xs={6}>
          <LayoutEditor />
        </Grid>
        <Grid xs={3}>
        </Grid>
      </Grid>
    </Box>
  )
}


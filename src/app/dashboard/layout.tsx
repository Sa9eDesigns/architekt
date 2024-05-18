"use client";

/*DashboardLayout
- This component is a layout component that wraps the dashboard pages.
- Its a "blank" layout that doesn't have any specific styles or components because:
  * It will contain the dashboard pages that will have their own styles and components.
  * These Pages have their own Nested Layouts
- It will be used to wrap the dashboard pages.
*/


import * as React from "react";
import { 
  Box,
  Sheet,
  Stack,
 } from "@mui/joy";
import { AIStoreContext } from "@/stores/useAIStoreProvider";
import { useAIStore } from "@/stores/useAIStoreProvider";
import { motion } from "framer-motion";
import SageAI from "@/components/AI/ChatUI";



export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  
  //CONTEXT
  const isAssistantVisible = useAIStore((state) => state.isAssistantVisible);

  return (
    /*The Main Container for the Dashboard Pages is Full Width and Height by default
    But it shares it with the Assistant when its visible
    if the Assistant is visible, the Assistant will take 1/3 of the screen width, essentially making the Dashboard Pages 2/3 of the screen width,
    if the Assistant is not visible, the Dashboard Pages will take the full width of the screen
    this is achieved by using the framer-motion library to animate the width of the Assistant
    */
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        height: "100vh",
        width: "100vw",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/*The Assistant Container will take 1/3 of the screen width when its visible*/}
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: isAssistantVisible ? "33.33%" : 0 }}
        transition={{ duration: 0.4 }}
        style={{
          height: "100%",
          backgroundColor: "background.level1",
          borderRight: "1px solid",
          borderColor: "divider",
          zIndex: 100,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/*The Assistant Component*/}
        <SageAI chat={undefined}/>
      </motion.div>
      {/*The Dashboard Pages Container will take 2/3 of the screen width when the Assistant is visible*/}
      <Box
        sx={{
          flex: 1,
          height: "100%",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/*The Dashboard Pages*/}
        {children}
      </Box>
    </Box>

  )
  
}

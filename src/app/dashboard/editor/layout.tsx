"use client";

import * as React from "react";
import {DndContext} from '@dnd-kit/core';
import { Box, Sheet } from "@mui/joy";

export default function Editor({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DndContext>
      <Sheet>
        <Box sx={{ display: "flex", height: "100vh", overflow: "hidden", width: "100%" }}>
          {children}
        </Box>
      </Sheet>
    </DndContext>
  );
}

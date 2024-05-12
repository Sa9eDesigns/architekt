/*
This Defines The Left Sidebar of the Layout Editor
*/

import React from "react";
import {
  Box,
  Button,
  Card,
  Divider,
  Grid,
  IconButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/joy";
import { Icon } from "@iconify/react";
//import { useEditor } from "../Hooks/useEditor";
import { atom } from "jotai";
//Draggable
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

const LeftSidebar = () => {
  //COMPONENTS

  //FUNCTIONS

  //EFFECTS

  //RENDER
  return (
    <Box p={2}>
      <ToggleButtonGroup
        buttonFlex={1}
        orientation="horizontal"
        size="sm"
      >
        <Button
          variant="solid"
          color="primary"
          size="sm"
          startDecorator={<Icon icon="fluent:layer-diagonal-add-20-filled" />}
        >
          Elements
        </Button>

        <Button
          variant="solid"
          color="primary"
          size="sm"
          startDecorator={<Icon icon="fluent:slide-layout-20-filled" />}
        >
          Blocks
        </Button>
      </ToggleButtonGroup>
    </Box>
  );
};

export default LeftSidebar;

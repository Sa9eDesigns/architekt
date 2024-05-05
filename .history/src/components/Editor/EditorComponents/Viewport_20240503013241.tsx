/*
  This file contains the Viewport component which is the main component of the Editor.
  It is responsible for rendering the selected component and its children in the canvas.
  --uses the useNode and useEditor hooks from the @craftjs/core package
  --it is the main canvas component
*/

import React, { Component } from "react";
import { 
  useNode, 
  useEditor,
  Frame,
  Element,
  NodeHelpers
} from "@craftjs/core";
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  ToggleButtonGroup,
  Typography,
  Modal,
  ModalDialog,
  Stack,
  Dropdown,
  MenuButton,
  MenuItem,
  Menu,
  ListItemDecorator,
  ListDivider,
} from "@mui/joy";
import { Icon } from "@iconify/react";

//Viewport Component
const Viewport = () => {
  const { query } = useEditor();
  const { id, related } = useNode((node) => ({
    id: node.id,
    related: node.related,
  }));

  return (
    <Box sx={{ position: "relative", width: "100%", height: "100%" }}>
      <Frame>
        <Element
          canvas
          is={FrameContainer}
          custom={{ displayName: "App" }}
          children={[]}
        />
      </Frame>
    </Box>
  );
}


//FrameContainer Component
interface FrameContainerProps {
  children: React.ReactNode
}
interface FrameContainerInterface extends React.FC<FrameContainerProps> {
  craft: object
}

export const FrameContainer: FrameContainerInterface = ({ children }) => {
  const { connectors } = useNode()

  return (
    <div
      ref={(ref) => connectors.connect(ref as HTMLElement)}
      style={{ width: '100%', minHeight: '800px' }}
      className="bg-white"
    >
      {children}
    </div>
  )
}

FrameContainer.craft = {
  displayName: 'Container',
  props: {},
  rules: {
    canDrag: () => true,
  },
  related: {},
}




"use client";

/*This Defines the Editor Component
The Editor is the main component that will be used to create the components.
*/

import React, { Component } from "react";
import {
  useNode,
  useEditor,
  Frame,
  Element,
  Editor,
  Resolver,
} from "@craftjs/core";
//MUI Joy Components
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
//Iconify Icon
import { Icon } from "@iconify/react";
//Editor Elements
import Section from "./EditorElements/Section";
import FrameContainer from "./EditorComponents/FrameContainer";
import { EditorProvider } from "./Context/EditorContext";

/*====================
RESOLVERS
====================*/
const ElementResolver: Resolver = {
  //Viewports
  FrameContainer,
  //Layout Elements
  Section,
};

/*====================
Editor Canvas Component
====================*/
const LayoutEditor = () => {
  //CRAFTJS
  const { query } = useEditor();
  const { id, related } = useNode((node) => ({
    id: node.id,
    related: node.related,
  }));

  //CONSTANTS

  //CONTEXT

  //STATE

  //EFFECTS

  //FUNCTIONS

  //RENDER
  return (
    <Editor resolver={ElementResolver}>
      <EditorProvider>
        <Grid container>

          {/* Left Panel - Components */}
          <Grid xs={2}>

          </Grid>

          {/* Center Panel - Canvas */}
          <Grid xs={7.5}>
            <Box sx={{ position: "relative", width: "100%", height: "100%" }}>
              <Frame>
                <Element
                  canvas
                  is={FrameContainer}
                  custom={{ displayName: "App" }}
                >
                  <Section></Section>
                </Element>
              </Frame>
            </Box>
          </Grid>

          {/* Right Panel - Properties */}
          <Grid xs={2.5}>

          </Grid>
        </Grid>
      </EditorProvider>
    </Editor>
  );
};

export default LayoutEditor;

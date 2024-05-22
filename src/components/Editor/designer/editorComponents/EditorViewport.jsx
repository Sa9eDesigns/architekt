/*
  This Is The Editor Canvas Where Child Components Are Rendered
  It simulates a browser window where the user can drag and drop components to build a webpage
  It Forces child components to render within its boundaries regardless of the size of the child component

  CraftJS:
  - Used for creating drop zones for child components to be rendered
  - Used for setting the position of child components within the parent component
  - Used for setting the size of child components within the parent component

  Props:
  - device: The device type to simulate the editor canvas | Desktop, Tablet, Mobile
  - editMode: The mode of the editor | true: Edit Mode, false: Preview Mode
*/

import React, { Component } from "react";
import { useNode } from "@craftjs/core";
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
} from "@mui/joy";
import { AppBar, Dialog, Stack } from "@mui/material";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import Header from "src/components/Header";
import Footer from "src/components/Footer";

export const EditorViewport = ({ device, editMode, children }) => {
  //CRAFTJS
  /*create parent node for child components
  - cannot be dragged or resized by the user
  - is used as the base canvas area for page building
  */
  const {
    connectors: { connect, drag },
  } = useNode();

  //--Prevent Element Selection
  document.addEventListener("mousedown", (e) => {
    e.preventDefault();
  });

  //NAVIGATION
  const navigate = useNavigate();

  //CONSTANTS
  const deviceWidth = device.width;
  const deviceHeight = device.height;
  const deviceType = device.type;

  //STATES
  const [width, setWidth] = React.useState(deviceWidth);
  const [height, setHeight] = React.useState(deviceHeight);
  const [openExitDialog, setOpenExitDialog] = React.useState(false);

  //STYLES
  const styles = {
    width: width,
    height: height,
    border: "1px solid #000",
    position: "relative",
    overflow: "hidden",
  };

  //FUNCTIONS
  const handleResize = (width, height) => {
    setWidth(width);
    setHeight(height);
  };
  //--handle editor exit
  const handleEditorExit = () => {
    //navigate to the dashboard Pages list
    navigate("/dashboard/pages", { replace: true });
  };

  //--handle editor preview
  const handleEditorPreview = () => {
    console.log("Preview Editor Content");
  };

  //RENDER
  return (
    <>
      {/*Scrollable Canvas*/}
      <Box
        className="editor-viewport craftjs-renderer"
        sx={{
          width: "100%",
          height: "calc(100vh - px)",
          overflow: "auto",
          backgroundColor: "#fff",
        }}
      >
        <div
          ref={(ref) =>
            connect(drag(ref, { snapToGrid: 16, snapToContainer: true }))
          }
          style={{
            minHeight: "100vh",
          }}
        >
          {/*Main Content*/}
          <div className={"cs_dark"}>

          {/*Global Header*/}
            <Header
              logoUrl="/soimagine/logo-white.png"
              colorVariant="cs_color_1"
              actionBtnText="Getting Started"
              actionBtnUrl="/contact"
              isEditorMode={true}
            />
            {/*End Global Header*/}

            {/*Editor Canvas*/}
            <div
              className="editor-canvas"
            >
              {children}
            </div>
            
            {/*End Editor Canvas*/}

            {/*Global Footer*/}
            <Footer />
            {/*End Global Footer*/}
            
          </div>
        </div>
      </Box>

      {/*Logout Confirmation Dialog*/}
      <Dialog open={openExitDialog} onClose={() => setOpenExitDialog(false)}>
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography level="title-md">Logout</Typography>
          <IconButton onClick={() => setOpenExitDialog(false)}>
            <Icon icon="eva:close-outline" width="24" height="24" />
          </IconButton>
        </DialogTitle>
        <Divider />

        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            p: 2,
          }}
        >
          <Typography level="body-md">
            Are you sure you want to exit?
          </Typography>
        </DialogContent>
        <Divider />

        <DialogActions
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            gap: 2,
            p: 2,
          }}
        >
          <Button
            variant="outlined"
            color="neutral"
            onClick={() => setOpenExitDialog(false)}
          >
            Cancel
          </Button>
          <Button
            variant="solid"
            color="danger"
            onClick={() => handleEditorExit()}
          >
            Leave
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

/*Editor Viewport Settings
-- layout
-- Sizing
-- Spacing
-- Borders
-- Background
*/
function EditorViewportSettings() {
  
}


EditorViewport.craft = {
  displayName: "EditorViewport",
  props: {
    device: {
      width: 1024,
      height: 768,
      type: "Desktop",
    },
    editMode: true,
  },
  rules: {
    canDrag: () => false, //cannot be dragged
    canDrop: () => false, // cannot be dropped - is the parent container
    canMoveIn: () => true, //can move child components into it
    canMoveOut: () => false, //cannot move out of it - where would it go?
  },
  related: {
    settings: EditorViewportSettings,
  },
};

export default EditorViewport;

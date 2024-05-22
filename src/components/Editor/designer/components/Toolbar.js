/*This Defines the SideBar of the Editor Page*/

import React, { useContext, useState } from "react";
import { Icon } from "@iconify/react";
//Accordion
import {
  AccordionDetails,
  AccordionSummary,
  Accordion,
} from "./EditorAccordion.js";
//craft-js
import { Element, useEditor } from "@craftjs/core";
import Text from "../editorComponents/Text.js";
import {
  /* Accordion,
  AccordionDetails,
  AccordionSummary, */
  Box,
  Button,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemContent,
  ListItemDecorator,
  ToggleButtonGroup,
  Typography,
  accordionDetailsClasses,
  accordionSummaryClasses,
} from "@mui/joy";
import Sections from "../editorComponents/editorSections/Sections.jsx";
import { EditorContext } from "../context/EditorContext.jsx";

export default function Toolbar() {
  //CONSTANTS
  const { connectors, query } = useEditor();

  //CONTEXT
  const {
    //CONSTANTS
    //STATES
    sidebarOpen,
    //FUNCTIONS
    handleSidebarVisibility,
  } = useContext(EditorContext);

  //STATES
  const [currentSidebarView, setCurrentSidebarView] = useState("components");
  const [expanded, setExpanded] = useState("panel-0");

  //HANDLERS
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  //
  const handleCurrentSidebarView = (val) => {
    setCurrentSidebarView(val);
  };
  //--close sidebar when component is dragged out of the Toolbar
  const handleDragEvent = () => {
    handleSidebarVisibility(false);
  }

  //RENDER
  return (
    <Box
      sx={{
        width: "auto",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
      onDragLeave={handleDragEvent}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/*Tabbed Buttons: Components, LayoutTree, Templates*/}
        <ToggleButtonGroup
          buttonFlex={1}
          variant="soft"
          size="lg"
          spacing={0}
          sx={{
            "--ButtonGroup-radius": "0px",
            "--ButtonGroup-separatorSize": "0px",
            "--ButtonGroup-connected": "1",
            maxWidth: "100%",
            overflow: "auto",
            resize: "horizontal",
          }}
          orientation="horizontal"
          value={currentSidebarView}
          exclusive
          onChange={(ev, val) => {
            handleCurrentSidebarView(val);
          }}
          aria-label="current sidebar view"
        >
          <Button value="components" aria-label="components" fullWidth>
            <Icon icon="carbon:3d-software" width="100%" height="24" />
          </Button>

          <Button value="templates" aria-label="templates" fullWidth>
            <Icon icon="carbon:template" width="24" height="24" />
          </Button>

          <Button value="layoutTree" aria-label="layoutTree" fullWidth>
            <Icon icon="carbon:layers" width="24" height="24" />
          </Button>
        </ToggleButtonGroup>

        <Divider />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            paddingBottom: 3,
          }}
        >
          {currentSidebarView === "components" ? (
            <div>
            {/* basic components */}
              {/* basic components */}
              <Accordion
                variant="outlined"
                size="lg"
                expanded={expanded === `panel-${2}`}
                onChange={handleChange(`panel-${2}`)}
                transition="0.2s"
                sx={{
                  maxWidth: 400,
                  [`& .${accordionSummaryClasses.button}:hover`]: {
                    bgcolor: "transparent",
                  },
                  [`& .${accordionDetailsClasses.content}`]: {
                    boxShadow: (theme) =>
                      `inset 0 1px ${theme.vars.palette.divider}`,
                    [`&.${accordionDetailsClasses.expanded}`]: {
                      paddingBlock: "0.75rem",
                    },
                  },
                }}
              >
                <AccordionSummary
                  aria-controls={`panel${0}-content`}
                  id={`panel${0}-header`}
                >
                  <Typography>Basic Elements</Typography>
                </AccordionSummary>
                <AccordionDetails variant="soft">
                  <List
                    sx={{
                      width: "100%",
                      bgcolor: "background.paper",
                      display: "flex",
                      flexDirection: "column",
                      padding: 0,
                    }}
                  >
                    {/* Text */}
                    <ListItem
                      ref={(ref) =>
                        connectors.create(
                          ref,
                          <Text content="Enter Text Here" />
                        )
                      }
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        transition: "all 0.3s ease",
                        //borderBlockEnd: "1px solid #eee",
                        "&:hover": {
                          cursor: "pointer",
                          bgcolor: "primary.light",
                          color: "primary.contrastText",
                        },
                      }}
                    >
                      <ListItemDecorator>
                        <Icon icon="carbon:letter-aa" width="25" height="25" />
                      </ListItemDecorator>

                      <ListItemContent
                        primary="Text"
                        sx={{
                          textAlign: "flex-start",
                          "& MuiListItemText-primary": {
                            fontSize: "13px",
                            fontWeight: "bold",
                            color: "primary.light",
                          },
                        }}
                      />
                    </ListItem>

                    {/* Image */}
                  </List>
                </AccordionDetails>
              </Accordion>
              {/* advanced components */}
              <Accordion
                expanded={expanded === `panel-${1}`}
                onChange={handleChange(`panel-${1}`)}
              >
                <AccordionSummary
                  aria-controls={`panel${1}-content`}
                  id={`panel${1}-header`}
                >
                  <Typography>Tables / Charts </Typography>
                </AccordionSummary>
                <AccordionDetails
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    padding: 0,
                  }}
                >
                  <List
                    sx={{
                      width: "100%",
                      bgcolor: "background.paper",
                      display: "flex",
                      flexDirection: "column",
                      padding: 0,
                    }}
                  ></List>
                </AccordionDetails>
              </Accordion>
            </div>
          ) : currentSidebarView === "layoutTree" ? (
            <></>
          ) : currentSidebarView === "templates" ? (
            <Sections />
          ) : (
            <></>
          )}
        </Box>
      </Box>
    </Box>
  );
}

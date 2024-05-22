/*These Are The Available Options For The Page. These Options Will Be Applied  When the a user access a url that matches the page url.
Options Include:
- Page Title
- Page Description
- Page URL
- Page Layout
- Page Theme
- Page Header
- Page Footer
 */

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
  FormControl,
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
import LayoutContainer from "../editorComponents/LayoutContainer.js";
import Sections from "../editorComponents/editorSections/Sections.jsx";
import { EditorContext } from "../context/EditorContext.jsx";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function PageOptions({ currentPage }){
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

  //FORMIK
  const formik = useFormik({
    initialValues: {
      pageTitle: currentPage.title,
      pageDescription: currentPage.description,
      pageURL: currentPage.url,
      pageLayout: currentPage.layout,
      pageTheme: currentPage.theme,
      pageHeader: currentPage.header,
      pageFooter: currentPage.footer,
    },
    validationSchema: Yup.object({
      pageTitle: Yup.string().required("Required"),
      pageDescription: Yup.string().required("Required"),
      pageURL: Yup.string().required("Required"),
      pageLayout: Yup.string().required("Required"),
      pageTheme: Yup.string().required("Required"),
      pageHeader: Yup.string().required("Required"),
      pageFooter: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });


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
            <Icon icon={"carbon:settings-view"} width="24" height="24" />
          </Button>

          <Button value="templates" aria-label="templates" fullWidth>
          <Icon icon="carbon:rule-locked" width="24" height="24" />
          </Button>

          <Button value="layoutTree" aria-label="layoutTree" fullWidth>
            <Icon icon="carbon:tree-view" width="24" height="24" />
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
            {
              <FormControl>

              </FormControl>
            }
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

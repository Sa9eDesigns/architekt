import React from "react";
import { Icon } from "@iconify/react";
import { useNode } from "@craftjs/core";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary
} from "../components/EditorAccordion";
import {
  Box,
  Typography,
  Input,
  Textarea,
  ToggleButtonGroup,
  Button
} from "@mui/joy";
import LayoutSettings from "./fieldSettings/LayoutSettings";
import TypographySettings from "./fieldSettings/TypographySettings";
import BackgroundSettings from "./fieldSettings/BackgroundSettings";


/* EDITOR SETTINGS */
export const ComponentSettings = () => {
  //CRAFTS - NODE
  const {
    actions: { setProp },
    //Custom Settings
    settings,
    //elementProps
    id, classes,
    //Styling Props
    layout, size, spacing, position, borders, background, effects, typography,
  } = useNode((node) => ({
    //Custom Settings
    settings: node.data.custom.settings,
    //elementProps
    id: node.id,
    classes: node.data.props.classes,
    //Styling Props
    layout: node.data.props.layout,
    size: node.data.props.size,
    spacing: node.data.props.spacing,
    position: node.data.props.position,
    borders: node.data.props.borders,
    background: node.data.props.background,
    effects: node.data.props.effects,
    typography: node.data.props.typography,
  }));

  //COMPONENT STATES
  const [expanded, setExpanded] = React.useState(false);
  const [currentTab, setCurrentTab] = React.useState(0);

  //COMPONENT HANDLERS
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  //--handle Props Change
  const handleLayoutProps = (prop) => {
    setProp((props) => {
      props.layout = { ...props.layout, ...prop };
    });
  };

  const handleTypographyProps = (prop) => {
    setProp((props) => {
      props.typography = { ...props.typography, ...prop };
    });
  };

  //RENDER
  return (
    <>
      {/*--Tab Buttons*/}
      <ToggleButtonGroup
        variant="outlined"
        size="sm"
        value={currentTab}
        exclusive
        buttonFlex={1}
        onChange={(e, value) => setCurrentTab(value)}
      >
        {/*--Content*/}
        <Button
          fullWidth
          value={0}
          aria-label="content"
          sx={{ borderRadius: "0px" }}
        >
          <Icon icon="bi:card-text" />
        </Button>

        {/*--Layout*/}
        <Button
          fullWidth
          value={1}
          aria-label="layout"
          sx={{ borderRadius: "0px" }}
        >
          <Icon icon="bi:aspect-ratio" />
        </Button>

        {/*--Typography*/}
        <Button
          fullWidth
          value={2}
          aria-label="style"
          sx={{ borderRadius: "0px" }}
        >
          <Icon icon="bi:type" />
        </Button>

        {/*--Background*/}
        <Button
          fullWidth
          value={3}
          aria-label="background"
          sx={{ borderRadius: "0px" }}
        >
          <Icon icon="bi:brush" />
        </Button>

        {/*--Borders*/}
        <Button
          fullWidth
          value={4}
          aria-label="borders"
          sx={{ borderRadius: "0px" }}
        >
          <Icon icon="bi:border-all" />
        </Button>


      </ToggleButtonGroup>

      {currentTab === 0 ? (
        <>
          {settings}
        </>
      ) : currentTab === 1 ? (
        <LayoutSettings
          settings={layout}
          onSettingsChange={handleLayoutProps} />
      ) : currentTab === 2 ? (
        <TypographySettings
          settings={typography}
          onSettingsChange={handleTypographyProps} />
      ) : currentTab === 3 ? (
        <BackgroundSettings
          settings={background}
          onSettingsChange={(prop, value) => setProp((props) => (props.background[prop] = value))}
        />
      ) : null}
    </>
  );
};
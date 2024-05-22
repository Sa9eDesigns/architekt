/* 
  This is a CraftJS component for the that allows the user to add and edit 
  using a custom rich text editor.
*/

import React from "react";
import { Icon } from "@iconify/react";
//import sanitizeHtml from "sanitize-html";
//craft-js
import { useNode } from "@craftjs/core";
import { motion } from "framer-motion";
/*SETTINGS PANEL*/
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "../../components/EditorAccordion";
//component to customize
import AboutStyle8 from "src/components/About/AboutStyle8";
import { Box, Button, Card, CardActions, CardContent, FormControl, Input, Select, Slider, Stack, Typography } from "@mui/joy";
import FileUploader from "src/dashboard/components/FileUploader";

/* EDITOR COMPONENT */
const About_1 = ({ thumbnailSrc, title, subTitle, grothData }) => {
  //CONSTANTS
  const {
    connectors: { connect, drag },
    actions: { setProp },
    hasSelectedNode,
    hasDraggedNode,
  } = useNode((state) => ({
    hasSelectedNode: state.events.selected,
    hasDraggedNode: state.events.dragged,
  }));

  //STATES

  //HANDLERS
  //--scale the component to be contained within the parent
  //--this is to prevent the component from overflowing
  const scaleToFitParent = () => {
    //--we get the editor viewport dimensions
    const editorViewport = document.querySelector(".editor-viewport").getBoundingClientRect();
    //--and the Device window dimensions
    const deviceH = window.innerHeight;
    const deviceW = window.innerWidth;

    //--we calculate the value of the scale proportional to the device window
    return Math.min(deviceW / editorViewport.width, deviceH / editorViewport.height);
   }
  //EFFECTS

  //RENDER
  return (
    <Box
      className="editor-component"
      ref={(ref) => connect(drag(ref))}
      sx={{
        display: "block",
        width: "100%",
        height: "auto",
        padding: "10px",
        backgroundColor: "transparent",
        cursor: hasDraggedNode ? "grabbing" : "grab",
        border: hasSelectedNode ? "2px solid #2196f3" : "none",
        "&:hover": {
          border: !hasSelectedNode
            ? "1px dashed #2196f3"
            : "1px dashed #2196f3",
        },
        transition: "border 0.3s ease-in-out",
      }}
    >
      {/* <ContentEditable
        html={content}
        disabled={!editMode}
        onChange={(e) => setProp((prop) => (prop.content = e.target.value))}
      /> */}
      <AboutStyle8
        thumbnailSrc={thumbnailSrc}
        title={title}
        subTitle={subTitle}
        grothData={grothData}
      />
      
    </Box>
  );
};

/* EDITOR SETTINGS */
const ComponentSettings = () => {
  //CRAFTS - NODE
  const {
    actions: { setProp },
    thumbnailSrc,
    title,
    subTitle,
    grothData,
  } = useNode((node) => ({
    thumbnailSrc: node.data.props.thumbnailSrc,
    title: node.data.props.title,
    subTitle: node.data.props.subTitle,
    grothData: node.data.props.grothData,
  }));

  //COMPONENT STATES
  const [expanded, setExpanded] = React.useState(false);
  const [growthDataItems, setGrowthDataItems] = React.useState(grothData);

  //COMPONENT HANDLERS
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  //--add growth data item
  const addGrowthDataItem = () => {
    setGrowthDataItems((items) => [
      ...items,
      {
        title: "Title",
        percentage: "0",
      },
    ]);
  };

  //--remove growth data item
  const removeGrowthDataItem = (index) => {
    setGrowthDataItems((items) => items.filter((item, i) => i !== index));
  };

  //--update growth data item
  const updateGrowthDataItem = (index, key, value) => {
    setGrowthDataItems((items) =>
      items.map((item, i) => {
        if (i === index) {
          return {
            ...item,
            [key]: value,
          };
        }
        return item;
      })
    );
  };

  //COMPONENT EFFECTS
  React.useEffect(() => {
    setProp((prop) => (prop.grothData = growthDataItems));
  }, [growthDataItems]);

  return (
    <>
      <Accordion
        expanded={expanded === `panel-${0}`}
        onChange={handleChange(`panel-${0}`)}
      >
        <AccordionSummary
          aria-controls={`panel${0}-content`}
          id={`panel${0}-header`}
        >
          <Typography level="title-sm">Featured Image</Typography>
        </AccordionSummary>
        
        <AccordionDetails
          sx={{
            display: "flex",
            flexDirection: "column",
            padding: 0,
          }}
        >
          <FileUploader url={""} onUpload={(url) => setProp((prop) => (prop.thumbnailSrc = url))} />
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === `panel-${1}`}
        onChange={handleChange(`panel-${1}`)}
      >
        <AccordionSummary
          aria-controls={`panel${1}-content`}
          id={`panel${1}-header`}
        >
          <Typography>Typography</Typography>
        </AccordionSummary>
        <AccordionDetails
          sx={{
            display: "flex",
            flexDirection: "column",
            padding: 1,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              padding: 1,
            }}
          >
            <Typography level="title-sm" >Title</Typography>
            <Input
              size="lg"
              placeholder="Large"
              onChange={(e) => setProp((prop) => (prop.title = e.target.value))}
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              padding: 1,
            }}
          >
            <Typography level="title-sm" >Subtitle</Typography>
            <Input
              size="lg"
              placeholder="Large"
              onChange={(e) =>
                setProp((prop) => (prop.subTitle = e.target.value))
              }
            />
          </Box>
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === `panel-${3}`}
        onChange={handleChange(`panel-${3}`)}
      >
        <AccordionSummary
          aria-controls={`panel${3}-content`}
          id={`panel${3}-header`}
        >
          <Typography>Growth Data</Typography>
        </AccordionSummary>
        <AccordionDetails
          sx={{
            display: "flex",
            flexDirection: "column",
            padding: 1,
          }}
        >
          {growthDataItems?.map((item, index) => (
            <DataItemForm
              key={index}
              item={item}
              index={index}
              onChange={updateGrowthDataItem}
              onRemove={() => removeGrowthDataItem(index)}
            />
          ))}

          <Button size="sm" fullWidth onClick={addGrowthDataItem}>
            Add Growth Data
          </Button>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

//SETTINGS COMPONENTS
//--Growth Data Item Form
//COMPONENTS
const DataItemForm = ({ item, index, onChange, onRemove }) => {
  return (
    <Card key={index} sx={{ margin: 1 }}>
      <CardContent>
        <Stack spacing={2}>
          <FormControl fullWidth>
            <Input
              size="lg"
              placeholder="Title"
              onChange={(e) => onChange(index, "title", e.target.value)}
            />
          </FormControl>
          <FormControl fullWidth>
            <Typography level="title-sm">Percentage</Typography>
            <Slider
              value={parseInt(item.percentage)}
              onChange={(e, value) =>
                onChange(index, "percentage", value.toString())
              }
              aria-labelledby="discrete-slider"
              valueLabelDisplay="auto"
              step={1}
              marks
              min={0}
              max={100}
            />
          </FormControl>
        </Stack>
      </CardContent>
      <CardActions>
        <Button size="sm" color="error" onClick={onRemove}>
          Remove
        </Button>
      </CardActions>
    </Card>
  );
};

//EDITOR SETTINGS
About_1.craft = {
  details: {
    name: "About Style 1",
    description: "Custom About Style 1",
    image: "https://image.flaticon.com/icons/png/512/25/25694.png",
  },
  props: {
    thumbnailSrc: "https://via.placeholder.com/150",
    title: "Title",
    subTitle: "Subtitle",
    grothData: [
      {
        title: "Title",
        percentage: "0",
      },
    ],
  },
  rules: {
    canDrag: (node) => node.data.props.text != "Drag",
    //can be moved in and out of the layout/flex container
    canMoveIn: (node) => false,
    canMoveOut: (node) => true,
  },
  related: {
    settings: ComponentSettings,
  },
};

export default About_1;

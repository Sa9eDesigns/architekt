/* 
  This is a CraftJS component for the that allows the user to add and edit 
  using a custom rich text editor.
*/

import React, { useContext } from "react";
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

import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  FormControl,
  Input,
  Select,
  Slider,
  Stack,
  ToggleButtonGroup,
  Typography,
} from "@mui/joy";
import FileUploader from "src/dashboard/components/FileUploader";
import "react-quill/dist/quill.snow.css";
import { EditorContext } from "../../context/EditorContext";
import { ComponentActions } from "./ComponentActions";

/* EDITOR COMPONENT */
const BaseComponent = ({
  thumbnailSrc,
  miniTitle,
  title,
  subTitle,
  btnText,
  btnUrl,
}) => {
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

  //CONTEXT
  const { sidebarOpen, currentTab, handleSidebarVisibility, handleCurrentTab } =
    useContext(EditorContext);

  //RENDER
  return (
    <Box
      className="editor-component"
      ref={(ref) => connect(drag(ref))}
      sx={{
        position: "relative",
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
      {
        //--show the component actions if the component is selected
        hasSelectedNode && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
            }}
          >
            <ComponentActions />
          </motion.div>
        )
      }

      {}
    </Box>
  );
};

/* EDITOR SETTINGS */
const ComponentSettings = () => {
  //CRAFTS - NODE
  const {
    actions: { setProp },
    title,
    subTitle,
    thumbnailSrc,
    miniTitle,
    btnText,
    btnUrl,
  } = useNode((node) => ({
    thumbnailSrc: node.data.props.thumbnailSrc,
    miniTitle: node.data.props.miniTitle,
    title: node.data.props.title,
    subTitle: node.data.props.subTitle,
    btnText: node.data.props.btnText,
    btnUrl: node.data.props.btnUrl,
  }));

  //COMPONENT STATES
  const [expanded, setExpanded] = React.useState(false);
  const [dataItems, setDataItems] = React.useState();

  //COMPONENT HANDLERS
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  //REPEATABLE DATA HANDLERS
  //--add growth data item
  const addDataItem = () => {
    setDataItems((items) => [
      ...items,
      {
        title: "Title",
        percentage: "0",
      },
    ]);
  };
  //--remove growth data item
  const removeDataItem = (index) => {
    setDataItems((items) => items.filter((item, i) => i !== index));
  };
  //--update growth data item
  const updateDataItem = (index, key, value) => {
    setDataItems((items) =>
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
    setProp((prop) => (prop.grothData = dataItems));
  }, [dataItems]);

  return (
    <>
      {/*LAYOUT */}
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
          <FileUploader
            url={""}
            onUpload={(url) => setProp((prop) => (prop.thumbnailSrc = url))}
          />
        </AccordionDetails>
      </Accordion>
    </>
  );
};

/*SETTINGS SUB-COMPONENTS */
const LayoutSettings = ({
  dis
}) => {
  

}

//EDITOR SETTINGS
BaseComponent.craft = {
  details: {
    name: "Base Component",
    description: "This is a base component",
    image: "https://image.flaticon.com/icons/png/512/25/25694.png",
  },
  props: {
    thumbnailSrc: "/static/images/placeholder.jpg",
    miniTitle: "Mini Title",
    title: "Title",
    subTitle: "Subtitle",
    btnText: "Button",
    btnUrl: "/",
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

export default BaseComponent;

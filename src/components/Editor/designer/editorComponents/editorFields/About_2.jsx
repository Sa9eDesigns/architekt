/* 
  This is a CraftJS component for the that allows the user to add and edit 
  using a custom rich text editor.
*/

import React, { useContext } from "react";
import { Icon } from "@iconify/react";
//import sanitizeHtml from "sanitize-html";
//craft-js
import { useEditor, useNode } from "@craftjs/core";
import { motion } from "framer-motion";
/*SETTINGS PANEL*/
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "../../components/EditorAccordion";
//component to customize
import AboutStyle4 from "src/components/About/AboutStyle4";
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardActions,
  CardContent,
  Divider,
  FormControl,
  IconButton,
  Input,
  Select,
  Slider,
  Stack,
  ToggleButtonGroup,
  Typography,
} from "@mui/joy";
import FileUploader from "src/dashboard/components/FileUploader";
import QuillEditor from "react-quill";
import "react-quill/dist/quill.snow.css";
import { EditorContext } from "../../context/EditorContext";

/* EDITOR COMPONENT */
const About_2 = ({
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

  //STATES

  //HANDLERS
  //--scale the component to be contained within the parent
  //--this is to prevent the component from overflowing
  const scaleToFitParent = () => {
    //--we get the editor viewport dimensions
    const editorViewport = document
      .querySelector(".editor-viewport")
      .getBoundingClientRect();
    //--and the Device window dimensions
    const deviceH = window.innerHeight;
    const deviceW = window.innerWidth;

    //--we calculate the value of the scale proportional to the device window
    return Math.min(
      deviceW / editorViewport.width,
      deviceH / editorViewport.height
    );
  };
  //EFFECTS

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
      <AboutStyle4
        thumbnailSrc={thumbnailSrc}
        miniTitle={miniTitle}
        title={title}
        subTitle={subTitle}
        btnText={btnText}
        btnUrl={btnUrl}
      />
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
            overflowY: "auto",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              padding: 1,
            }}
          >
            <Typography level="title-sm">Mini Title</Typography>
            <Input
              size="sm"
              placeholder="Mini Title"
              value={miniTitle}
              onChange={(e) =>
                setProp((prop) => (prop.miniTitle = e.target.value))
              }
            />

            <Typography level="title-sm">Title</Typography>
            <Input
              size="sm"
              placeholder="Mini Title"
              value={title}
              onChange={(e) =>
                setProp((prop) => (prop.title = e.target.value))
              }
            />
          </Box>
          <Divider />

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              padding: 1,
            }}
          >
            <Typography level="title-sm">Subtitle</Typography>
            <Input
              size="sm"
              placeholder="Mini Title"
              value={subTitle}
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
          {dataItems?.map((item, index) => (
            <DataItemForm
              key={index}
              item={item}
              index={index}
              onChange={updateDataItem}
              onRemove={() => removeDataItem(index)}
            />
          ))}

          <Button size="sm" fullWidth onClick={addDataItem}>
            Add Growth Data
          </Button>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

/* COMPONENT ACTIONS */
const ComponentActions = () => {
  //CONSTANTS

  //CONTEXT
  const { sidebarOpen, currentTab, handleSidebarVisibility, handleCurrentTab } =
    useContext(EditorContext);

  //CRAFT-JS
  const { actions, selected } = useEditor((state, query) => {
    const [currentNodeId] = state.events.selected;
    let selected;

    if (currentNodeId) {
      selected = {
        id: currentNodeId,
        name: state.nodes[currentNodeId].data.name,
        settings:
          state.nodes[currentNodeId].related &&
          state.nodes[currentNodeId].related.settings,
        isDeletable: query.node(currentNodeId).isDeletable(),
      };
    }

    return {
      selected,
    };
  });

  //HANDLERS
  //--open settings
  const handleSettings = () => {
    handleCurrentTab("element_options");
    handleSidebarVisibility(true);
  };
  //--open info
  const handleInfo = () => {
    handleCurrentTab("element_info");
    handleSidebarVisibility(true);
  };
  //--delete component
  const handleDelete = () => {
    actions.delete(selected.id);
  };

  //EFFECTS

  //RENDER
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        padding: 1,
      }}
    >
      <ButtonGroup aria-label="outlined primary button group" variant="soft">
        <IconButton aria-label="settings" onClick={() => handleSettings()}>
          <Icon icon="eva:settings-2-outline" />
        </IconButton>

        <IconButton aria-label="info" onClick={() => handleInfo()}>
          <Icon icon="eva:info-outline" />
        </IconButton>

        <IconButton
          aria-label="delete"
          onClick={() => {
            handleDelete();
          }}
        >
          <Icon
            icon="material-symbols:cancel"
            width={25}
            height={25}
            color="danger"
          />
        </IconButton>
      </ButtonGroup>
    </Box>
  );
};

//SETTINGS COMPONENTS
//--Data Item Form
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

//--Rich Text Editor
const RichTextEditor = ({ content, onTextChange }) => {
  //CONSTANTS
  const styles = {
    wrapper: {
      display: "flex",
      flexDirection: "column",
      padding: "10px",
    },
    label: {
      fontSize: "1rem",
      fontWeight: "bold",
      marginBottom: "5px",
    },
    editor: {
      border: "1px solid #ccc",
      borderRadius: "5px",
      padding: "10px",
      minHeight: "200px",
    },
  };

  //STATES
  const [value, setValue] = React.useState("");

  //HANDLERS

  //CALLBACKS
  React.useCallback(() => {
    onTextChange(value);
  }, [value]);

  //EFFECTS
  React.useEffect(() => {
    onTextChange(value);
  }, [value]);

  //RENDER
  return (
    <div>
      <QuillEditor
        className={styles.editor}
        theme="snow"
        value={value}
        onChange={(value) => setValue(value)}
      />
    </div>
  );
};


//EDITOR SETTINGS
About_2.craft = {
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

export default About_2;

/* 
  This is a CraftJS component for the that allows the user to add and edit 
  using a custom rich text editor.
*/
import * as THREE from "three";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Icon } from "@iconify/react";
//import sanitizeHtml from "sanitize-html";
//craft-js
import { Canvas, useEditor, useNode } from "@craftjs/core";
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
import { useLocation, useRoute } from "wouter";
import getUuid from "uuid-by-string";
import {
  Environment,
  Image,
  MeshReflectorMaterial,
  useCursor,
} from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { easing } from "maath";
import { RotateLogo } from "./RotateLogo";

/* EDITOR COMPONENT */
const Gallery_1 = ({ images, frames }) => {
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

      {/*Gallery Scene*/}
      <Canvas dpr={[1, 1.5]} camera={{ fov: 70, position: [0, 2, 15] }}>
        <color attach="background" args={["#191920"]} />
        <fog attach="fog" args={["#191920", 0, 15]} />

        <group position={[0, -0.5, 0]}>
          <Frames images={images} />

          <RotateLogo position={[0, 4, -5.0]} scale={[0.1, 0.1, 0.1]} />

          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[50, 50]} />
            <MeshReflectorMaterial
              blur={[300, 100]}
              resolution={512}
              mixBlur={1}
              mixStrength={80}
              roughness={1}
              depthScale={1.2}
              minDepthThreshold={0.4}
              maxDepthThreshold={1.4}
              color="#050505"
              metalness={0.5}
            />
          </mesh>
        </group>
        <Environment preset="city" />
      </Canvas>
    </Box>
  );
};

/* SUB-COMPONENTS */
//
function Frames({
  images,
  q = new THREE.Quaternion(),
  p = new THREE.Vector3(),
}) {
  const GOLDENRATIO = 1.61803398875;

  const ref = useRef();
  const clicked = useRef();
  const [, params] = useRoute("/item/:id");
  const [, setLocation] = useLocation();

  useEffect(() => {
    clicked.current = ref.current.getObjectByName(params?.id);
    if (clicked.current) {
      clicked.current.parent.updateWorldMatrix(true, true);
      clicked.current.parent.localToWorld(p.set(0, GOLDENRATIO / 2, 1.25));
      clicked.current.parent.getWorldQuaternion(q);
    } else {
      p.set(0, 0.5, 5);
      q.identity();
    }
  });
  useFrame((state, dt) => {
    easing.damp3(state.camera.position, p, 0.4, dt);
    easing.dampQ(state.camera.quaternion, q, 0.4, dt);
  });
  return (
    <group
      ref={ref}
      onClick={(e) => (
        e.stopPropagation(),
        setLocation(
          clicked.current === e.object ? "/" : "/item/" + e.object.name
        )
      )}
      onPointerMissed={() => setLocation("/")}
    >
      {images.map(
        (props) => <Frame key={props.url} {...props} /> /* prettier-ignore */
      )}
    </group>
  );
}

function Frame({ url, c = new THREE.Color(), ...props }) {
  const GOLDENRATIO = 1.61803398875;

  const image = useRef();
  const frame = useRef();
  const [, params] = useRoute("/item/:id");
  const [hovered, hover] = useState(false);
  const [rnd] = useState(() => Math.random());
  const name = getUuid(url);
  const isActive = params?.id === name;
  useCursor(hovered);
  useFrame((state, dt) => {
    image.current.material.zoom =
      2 + Math.sin(rnd * 10000 + state.clock.elapsedTime / 3) / 2;
    easing.damp3(
      image.current.scale,
      [
        0.85 * (!isActive && hovered ? 0.85 : 1),
        0.9 * (!isActive && hovered ? 0.905 : 1),
        1,
      ],
      0.1,
      dt
    );
    easing.dampC(
      frame.current.material.color,
      hovered ? "orange" : "white",
      0.1,
      dt
    );
  });
  return (
    <group {...props}>
      <mesh
        name={name}
        onPointerOver={(e) => (e.stopPropagation(), hover(true))}
        onPointerOut={() => hover(false)}
        scale={[1, GOLDENRATIO, 0.05]}
        position={[0, GOLDENRATIO / 2, 0]}
      >
        <boxGeometry />
        <meshStandardMaterial
          color="#151515"
          metalness={0.5}
          roughness={0.5}
          envMapIntensity={2}
        />
        <mesh
          ref={frame}
          raycast={() => null}
          scale={[0.9, 0.93, 0.9]}
          position={[0, 0, 0.2]}
        >
          <boxGeometry />
          <meshBasicMaterial toneMapped={false} fog={false} />
        </mesh>
        <Image
          raycast={() => null}
          ref={image}
          position={[0, 0, 0.7]}
          url={url}
        />
      </mesh>
    </group>
  );
}

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
  const removeFrameItem = (index) => {
    setDataItems((items) => items.filter((item, i) => i !== index));
  };
  //--update growth data item
  const updateFrameItem = (index, key, value) => {
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
          {images.map((item, index) => (
            <FrameItemForm
              key={index}
              item={item}
              index={index}
              onChange={updateFrameItem}
              onRemove={() => removeFrameItem(index)}
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

const FrameItemForm = ({ item, index, onChange, onRemove }) => {
  return (
    <>
    <FileUploader
      url={item.url}
      onUpload={(url) => onChange(index, "url", url)}
    />

      <Button size="sm" color="error" onClick={onRemove}>
        Remove
      </Button>
    </>
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
Gallery_1.craft = {
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

export default Gallery_1;

/*Used To create a container that can hold other components and can be dragged and dropped in the editor*/

import React, { useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "src/dashboard/modules/pages/designer/components/EditorAccordion";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Input,
  Option,
  Select,
  Stack,
  ToggleButtonGroup,
  Typography,
} from "@mui/joy";
import { Icon } from "@iconify/react";
import * as _ from "lodash";
//Craftjs
import "react-color-palette/css";
import { FilePickerOpener } from "src/dashboard/components/FilePicker";
import ColorPicker, {useColorPicker} from "react-best-gradient-color-picker";

/*Editor Settings*/
const BackgroundSettings = () => {
  // Initialize state for background items
  const [backgroundItems, setBackgroundItems] = React.useState([]);
  const [expanded, setExpanded] = React.useState(false);

  // FUNCTION TO HANDLE CHANGING THE EXPANDED PANEL
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  // FUNCTION TO HANDLE ADDING A NEW BACKGROUND ITEM
  const handleBgItemAdd = () => {
    const newBgItem = {
      type: "color",
      color: "rgba(255, 255, 255, 0)",
      image: {
        url: "",
        repeat: "no-repeat",
        size: "auto",
        position: { x: 50, y: 50 },
        attachment: "scroll",
      },
      gradient:
        "linear-gradient(90deg, rgba(96,93,93,1) 0%, rgba(255,255,255,1) 100%)",
      blendMode: "normal",
    };

    setBackgroundItems([...backgroundItems, newBgItem]);
  };

  // FUNCTION TO HANDLE CHANGING A BACKGROUND ITEM
  const handleBgItemChange = (index, newBgItem) => {
    const updatedBgArray = [...backgroundItems];
    updatedBgArray[index] = newBgItem;
    setBackgroundItems(updatedBgArray);
  };

  // FUNCTION TO HANDLE REMOVING A BACKGROUND ITEM
  const handleBgItemRemove = (index) => {
    const updatedBgArray = [...backgroundItems];
    updatedBgArray.splice(index, 1);
    setBackgroundItems(updatedBgArray);
  };

  // FUNCTION TO HANDLE REORDERING BACKGROUND ITEMS
  const handleBgItemReorder = (oldIndex, newIndex) => {
    const updatedBgArray = [...backgroundItems];
    const [reorderedItem] = updatedBgArray.splice(oldIndex, 1);
    updatedBgArray.splice(newIndex, 0, reorderedItem);
    setBackgroundItems(updatedBgArray);
  };

  // RENDER COMPONENT
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        padding: 1,
        marginY: 1,
        flex: 1,
      }}
    >
      {backgroundItems.length === 0 ? (
        <Box
          sx={{
            display: "flex",
            flex: 1,
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="subtitle1">No Backgrounds Added</Typography>
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            flex: 1,
            flexDirection: "column",
          }}
        >
          {backgroundItems.map((bgItem, index) => (
            <Accordion
              key={index}
              expanded={expanded === `panel-${index}`}
              onChange={handleChange(`panel-${index}`)}
            >
              <AccordionSummary
                aria-controls={`panel${0}-content`}
                id={`panel${0}-header`}
              >
                <Typography level="title-sm">Background {index + 1}</Typography>
              </AccordionSummary>

              <AccordionDetails
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  padding: 0,
                }}
              >
                <BackgroundItem
                  bgItem={bgItem}
                  onBgItemUpdate={(newBgItem) =>
                    handleBgItemChange(index, newBgItem)
                  }
                  onBgItemRemove={() => {
                    handleBgItemRemove(index);
                  }}
                />
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      )}

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 1,
          borderTop: "1px solid #ccc",
        }}
      >
        <Button
          size="sm"
          variant="soft"
          color="primary"
          onClick={handleBgItemAdd}
          startIcon={<Icon icon="dashicons:plus" />}
        >
          Add Background
        </Button>
      </Box>
    </Box>
  );
};
/*Image Background Settings
-- These are the settings shown if Image is selected as the background
-- returns an image url, repeat, size, position, and attachment as an object
*/
const ImageBackgroundSettings = ({ settings, onSettingsChange }) => {
  //PROPS
  const {
    //Main Settings
    image,
    repeat,
    size,
    position,
    attachment,
  } = settings;

  //DESTURCTURE ALL SETTINGS

  //position
  const { x, y } = position;

  //attachment
  const { scroll, fixed } = attachment;

  //FUNCTIONS
  const handleGroupSettingChange = (prop, value) => {
    //check if prop use object notation
    if (prop.includes(".")) {
      const [parent, child] = prop.split(".");
      onSettingsChange({
        ...settings,
        [parent]: {
          ...settings[parent],
          [child]: value,
        },
      });
    } else {
      onSettingsChange({
        ...settings,
        [prop]: value,
      });
    }
  };

  //RETURN
  return (
    <Stack spacing={1}>
      {/*Image*/}
      <FilePickerOpener
        currentFile={image}
        onSelected={(file) => handleGroupSettingChange("image", file)}
      />

      {/*Repeat*/}
      <Stack spacing={1}>
        <Typography variant="subtitle2">Repeat</Typography>
        <ToggleButtonGroup
          size="sm"
          value={repeat}
          exclusive
          onChange={(_e, value) => handleGroupSettingChange("repeat", value)}
        >
          <Button value="no-repeat">No Repeat</Button>
          <Button value="repeat">Repeat</Button>
          <Button value="repeat-x">Repeat X</Button>
          <Button value="repeat-y">Repeat Y</Button>
        </ToggleButtonGroup>
      </Stack>

      {/*Size*/}
      <Stack spacing={1}>
        <Typography variant="subtitle2">Size</Typography>
        <Select
          value={size}
          onChange={(e) => handleGroupSettingChange("size", e.target.value)}
        >
          <Option value="auto">Auto</Option>
          <Option value="cover">Cover</Option>
          <Option value="contain">Contain</Option>
        </Select>
      </Stack>

      {/*Position*/}
      <Stack spacing={1}>
        <Typography variant="subtitle2">Position</Typography>
        <Input
          type="number"
          label="X"
          value={x}
          onChange={(e) =>
            handleGroupSettingChange("position.x", e.target.value)
          }
        />
        <Input
          type="number"
          label="Y"
          value={y}
          onChange={(e) =>
            handleGroupSettingChange("position.y", e.target.value)
          }
        />
      </Stack>

      {/*Attachment*/}
      <Stack spacing={1}>
        <Typography variant="subtitle2">Attachment</Typography>
        <ToggleButtonGroup
          value={scroll}
          exclusive
          onChange={(_e, value) =>
            handleGroupSettingChange("attachment", value)
          }
        >
          <Button value="scroll">Scroll</Button>
          <Button value="fixed">Fixed</Button>
        </ToggleButtonGroup>
      </Stack>
    </Stack>
  );
};

/*BackgroundItem
-- This is the individual background item that can be selected, added, or removed
-- returns a background item object with type, color, image, gradient, and blendMode
*/
const BackgroundItem = ({ bgItem, onBgItemUpdate, onBgItemRemove }) => {
  //PROPS
  const {
    //Main Settings
    id,
    color,
    image,
    blendMode,
  } = bgItem;

  //STATE
  //-what type of background is selected
  const [type, setType] = useState("color");
  //value of the background item color
  const [bgColor, setBgColor] = useState();

  //Color Picker
  const { setSolid, setGradient, isGradient } = useColorPicker(bgColor, setBgColor);

  //FUNCTIONS
  const handleBgItemChange = (prop, value) => {
    onBgItemChange({
      ...bgItem,
      [prop]: value,
    });
  };

  const handleBgItemRemove = () => {
    onBgItemRemove(id);
  };

  const handleImageTypeChange = (newImage) => {
    onBgItemChange({
      ...bgItem,
      type: "image",
      image: newImage,
    });
  };

  const onBgItemChange = (newBgItem) => {
    //--use the type to determine the value to update
    if (newBgItem.type === "color") {
      //--if color, create a new color object
      handleBgItemChange("color", newBgItem.color);
    } else if (newBgItem.type === "image") {
      //--if image, return the image object
      handleImageTypeChange(newBgItem);
    }
  
    //--assign unique id if not present
    if (!newBgItem.id) {
      handleBgItemChange("id", _.uniqueId("bg_"));
    }
  
    //--update the blend mode
    handleBgItemChange("blendMode", newBgItem.blendMode);
  
    //--update the type
    setType(newBgItem.type);
  
    //--update the parent state
    onBgItemUpdate(newBgItem);
  };
  const handleColorSelect = (newColor) => {
    if(isGradient){
      setGradient(newColor)
    }
    else{
      setSolid(newColor)
    }
  }

  //RETURN
  return (
    <Box
      sx={{
        justifyContent: "center",
        display: "flex",
        flexDirection: "column",
        padding: 1,
      }}
    >
      {/*Type*/}
      <Stack spacing={1}
        sx={{ display: "flex", flexDirection: "column", padding: 1 }}
      >
        <ToggleButtonGroup
          size="sm"
          buttonFlex={1}
          value={type}
          exclusive
          onChange={(_e, value) => {
            setType(value);
          }}
        >
          <Button value="color">Color</Button>
          <Button value="image">Image</Button>
        </ToggleButtonGroup>
      </Stack>

      {/*Color*/}
      {type === "color" && (
        <Stack spacing={1}>
          <Typography variant="subtitle2">Color</Typography>
          <ColorPicker
            value={bgColor}
            onChange={handleColorSelect}
            width={225}
            hideInputs={true}
            hidePresets={true}
            hideOpacity={true}
            hideEyeDrop={true}
            hideAdvancedSliders={true}
            hideColorGuide={true}
            hideInputType={true}
          />
        </Stack>
      )}

      {/*Image*/}
      {type === "image" && (
        <ImageBackgroundSettings
          settings={image}
          onSettingsChange={(newSettings) => onBgItemChange(newSettings)}
        />
      )}

      {/*Blend Mode*/}
      <Stack spacing={1}>
        <Typography variant="subtitle2">Blend Mode</Typography>
        <Select
          value={blendMode}
          onChange={(e) => handleBgItemChange("blendMode", e.target.value)}
        >
          <Option value="normal">Normal</Option>
          <Option value="multiply">Multiply</Option>
          <Option value="screen">Screen</Option>
          <Option value="overlay">Overlay</Option>
          <Option value="darken">Darken</Option>
          <Option value="lighten">Lighten</Option>
          <Option value="color-dodge">Color Dodge</Option>
          <Option value="color-burn">Color Burn</Option>
          <Option value="hard-light">Hard Light</Option>
          <Option value="soft-light">Soft Light</Option>
          <Option value="difference">Difference</Option>
          <Option value="exclusion">Exclusion</Option>
          <Option value="hue">Hue</Option>
          <Option value="saturation">Saturation</Option>
          <Option value="color">Color</Option>
          <Option value="luminosity">Luminosity</Option>
        </Select>
      </Stack>
    </Box>
  );
};

//If display is Block then show these layout settings
BackgroundSettings.defaultProps = {
  settings: {
    //Main Settings
    display: "block",
    position: "relative",
    overflow: "visible",
    //Background Settings
    background: {
      type: "color", //color, image, gradient
      color: "rgba(255, 255, 255, 0)",
      //color | transparent by default
      //Can also return gradient string
      image: {
        url: "", //image url
        repeat: "no-repeat", //no-repeat | repeat | repeat-x | repeat-y
        size: "auto", //auto | cover | contain
        position: { x: 50, y: 50 }, //x: 0-100, y: 0-100
        attachment: "scroll", //scroll | fixed
      },
      blendMode: "normal",
      //normal | multiply | screen | overlay | darken | lighten | color-dodge | color-burn | hard-light | soft-light | difference | exclusion | hue | saturation | color | luminosity
    },
  },
  onSettingsChange: () => {},
};

export default BackgroundSettings;

import React, { useState } from "react";
import {
  Box,
  Button,
  Stack,
  Typography,
  Select,
  Option,
  ToggleButtonGroup,
  Input,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/joy";
import { Icon } from "@iconify/react";
import _ from "lodash";
import { FilePickerOpener } from "./FilePicker";
import ColorPicker, { useColorPicker } from "react-best-gradient-color-picker";

interface BackgroundItem {
  id?: string;
  type: "color" | "image";
  color?: string;
  image?: {
    url: string;
    repeat: string;
    size: string;
    position: { x: number; y: number };
    attachment: string;
  };
  blendMode: string;
}

interface BackgroundSettingsProps {
  settings: any;
  onSettingsChange: (settings: any) => void;
}

const BackgroundSettings: React.FC<BackgroundSettingsProps> = ({
  settings,
  onSettingsChange,
}) => {
  const [backgroundItems, setBackgroundItems] = useState<BackgroundItem[]>([]);
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const handleBgItemAdd = () => {
    const newBgItem: BackgroundItem = {
      type: "color",
      color: "rgba(255, 255, 255, 0)",
      image: {
        url: "",
        repeat: "no-repeat",
        size: "auto",
        position: { x: 50, y: 50 },
        attachment: "scroll",
      },
      blendMode: "normal",
    };
    setBackgroundItems([...backgroundItems, newBgItem]);
  };

  const handleBgItemChange = (index: number, newBgItem: BackgroundItem) => {
    const updatedBgArray = [...backgroundItems];
    updatedBgArray[index] = newBgItem;
    setBackgroundItems(updatedBgArray);
  };

  const handleBgItemRemove = (index: number) => {
    const updatedBgArray = [...backgroundItems];
    updatedBgArray.splice(index, 1);
    setBackgroundItems(updatedBgArray);
  };

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
          <Typography level="body-md">No Backgrounds Added</Typography>
        </Box>
      ) : (
        <Box sx={{ display: "flex", flex: 1, flexDirection: "column" }}>
          {backgroundItems.map((bgItem, index) => (
            <Accordion
              key={index}
              expanded={expanded === `panel-${index}`}
              onChange={handleChange(`panel-${index}`)}
            >
              <AccordionSummary
                aria-controls={`panel${index}-content`}
                id={`panel${index}-header`}
              >
                <Typography level="title-sm">Background {index + 1}</Typography>
              </AccordionSummary>
              <AccordionDetails
                sx={{ display: "flex", flexDirection: "column", padding: 0 }}
              >
                <BackgroundItem
                  bgItem={bgItem}
                  onBgItemUpdate={(newBgItem: BackgroundItem) =>
                    handleBgItemChange(index, newBgItem)
                  }
                  onBgItemRemove={() => handleBgItemRemove(index)}
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

interface BackgroundItemProps {
  bgItem: BackgroundItem;
  onBgItemUpdate: (bgItem: BackgroundItem) => void;
  onBgItemRemove: () => void;
}

const BackgroundItem: React.FC<BackgroundItemProps> = ({
  bgItem,
  onBgItemUpdate,
  onBgItemRemove,
}) => {
  const { type, color, image, blendMode } = bgItem;
  const [bgColor, setBgColor] = useState(color);
  const { setSolid, setGradient, isGradient } = useColorPicker(
    bgColor,
    setBgColor
  );

  const handleBgItemChange = (prop: keyof BackgroundItem, value: any) => {
    onBgItemUpdate({ ...bgItem, [prop]: value });
  };

  const handleColorSelect = (newColor: string) => {
    if (isGradient) {
      setGradient(newColor);
    } else {
      setSolid(newColor);
    }
    handleBgItemChange("color", newColor);
  };

  return (
    <Box
      sx={{
        justifyContent: "center",
        display: "flex",
        flexDirection: "column",
        padding: 1,
      }}
    >
      <Stack
        spacing={1}
        sx={{ display: "flex", flexDirection: "column", padding: 1 }}
      >
        <ToggleButtonGroup
          size="sm"
          buttonFlex={1}
          value={type}
          exclusive
          onChange={(_e, value) => handleBgItemChange("type", value)}
        >
          <Button value="color">Color</Button>
          <Button value="image">Image</Button>
        </ToggleButtonGroup>
      </Stack>
      {type === "color" && (
        <Stack spacing={1}>
          <Typography variant="subtitle2">Color</Typography>
          <ColorPicker
            value={bgColor}
            onChange={handleColorSelect}
            width={225}
            hideInputs
            hidePresets
            hideOpacity
            hideEyeDrop
            hideAdvancedSliders
            hideColorGuide
            hideInputType
          />
        </Stack>
      )}
      {type === "image" && (
        <ImageBackgroundSettings
          settings={image}
          onSettingsChange={(newSettings) =>
            handleBgItemChange("image", newSettings)
          }
        />
      )}
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

interface ImageBackgroundSettingsProps {
  settings: any;
  onSettingsChange: (settings: any) => void;
}

const ImageBackgroundSettings: React.FC<ImageBackgroundSettingsProps> = ({
  settings,
  onSettingsChange,
}) => {
  const { image, repeat, size, position, attachment } = settings;

  const handleGroupSettingChange = (prop: string, value: any) => {
    const [parent, child] = prop.split(".");
    onSettingsChange({
      ...settings,
      [parent]: {
        ...settings[parent],
        [child]: value,
      },
    });
  };

  return (
    <Stack spacing={1}>
      <FilePickerOpener
        currentFile={image.url}
        onSelected={(file) => handleGroupSettingChange("image.url", file)}
      />
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
      <Stack spacing={1}>
        <Typography variant="subtitle2">Position</Typography>
        <Input
          type="number"
          label="X"
          value={position.x}
          onChange={(e) =>
            handleGroupSettingChange("position.x", e.target.value)
          }
        />
        <Input
          type="number"
          label="Y"
          value={position.y}
          onChange={(e) =>
            handleGroupSettingChange("position.y", e.target.value)
          }
        />
      </Stack>
      <Stack spacing={1}>
        <Typography variant="subtitle2">Attachment</Typography>
        <ToggleButtonGroup
          value={attachment}
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

export default BackgroundSettings;

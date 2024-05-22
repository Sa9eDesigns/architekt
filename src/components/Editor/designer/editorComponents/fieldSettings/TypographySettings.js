/*Used To create a container that can hold other components and can be dragged and dropped in the editor*/

import React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "src/dashboard/modules/pages/designer/components/EditorAccordion";
import {
  Box,
  Button,
  Divider,
  FormControl,
  FormLabel,
  Input,
  Modal,
  Option,
  Select,
  Stack,
  ToggleButtonGroup,
  Typography,
} from "@mui/joy";
import { Icon } from "@iconify/react";
import { useFormik } from "formik";
import * as yup from "yup";
//Craftjs
import { useNode, useEditor } from "@craftjs/core";
import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/css";

/*Editor Settings*/
const TypographySettings = ({ settings, onSettingsChange }) => {
  //PROPS
  const {
    //Main Settings
    //family, color, size, Weight, lineHeight, letterSpacing, alignment, transform, decoration, spacing, height, width, overflow,
    fontFamily,
    fontSize,
    fontWeight,
    lineHeight,
    letterSpacing,
    textAlign,
    textDecoration,
    textTransform,
    color,
    backgroundColor,
    padding,
    margin,
    borderRadius,
    boxShadow,
    overflow,
  } = settings;

  //CONSTANTS
  const units = ["px", "em", "%", "vh", "vw", "rem"];
  const alignments = [
    {
      value: "left",
      icon: <Icon icon="bi:justify-left" />,
    },
    {
      value: "center",
      icon: <Icon icon="bi:text-center" />,
    },
    {
      value: "right",
      icon: <Icon icon="bi:justify-right" />,
    },
    {
      value: "justify",
      icon: <Icon icon="bi:justify" />,
    }
  ]
  const transforms = [{
    value: "none",
    icon: <Icon icon="carbon:checkbox-indeterminate" />,
  },
  {
    value: "uppercase",
    icon: <Icon icon="carbon:character-upper-case" />,
  },
  {
    value: "lowercase",
    icon: <Icon icon="carbon:character-lower-case" />,
  },
  {
    value: "capitalize",
    icon: <Icon icon="carbon:character-sentence-case" />,
  }]
  const decorations = [{
    value: "none",
    icon: <Icon icon="carbon:checkbox-indeterminate" />,
  },
  {
    value: "underline",
    icon: <Icon icon="bi:type-underline" />,
  },
  {
    value: "line-through",
    icon: <Icon icon="bi:type-strikethrough" />,
  }]

  const overflows = ["visible", "hidden", "scroll", "auto"];

  //FORMIK
  const formik = useFormik({
    initialValues: {},
    validationSchema: yup.object({}),
  });

  const handlePropValueChange = (prop, value) => {
    formik.setFieldValue(prop, value);

    onSettingsChange({
      ...formik.values,
      [prop]: value,
    });
  };

  //STATES
  const [expanded, setExpanded] = React.useState(false);
  const [openColorPicker, setOpenColorPicker] = React.useState(false);
  const [colorPickerAnchor, setColorPickerAnchor] = React.useState(null);
  const [textColor, setTextColor] = useColor("hex", "#333");

  //--handle accordion
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  //RETURN
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        padding: 1,
        marginY: 1,
      }}
    >
      {/*Font Family*/}
      <Stack
        direction="row"
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Typography level="body-sm">Font</Typography>
        <Select
          name="display"
          id="display"
          defaultValue={fontFamily}
          value={formik.values.fontFamily}
          onChange={(e, val) => handlePropValueChange("fontFamily", val)}
          size="sm"
          sx={{
            "& input": {
              padding: "2px 7px",
              fontSize: "14px",
            },
          }}
        >
          <Option value="Arial">Arial</Option>
          <Option value="Helvetica">Helvetica</Option>
          <Option value="Georgia">Georgia</Option>
          <Option value="Times New Roman">Times New Roman</Option>
          <Option value="Tahoma">Tahoma</Option>
          <Option value="Verdana">Verdana</Option>
        </Select>
      </Stack>

      {/*Font Size*/}
      <Stack
        direction="row"
        justifyContent={"space-between"}
        alignItems={"center"}
        sx={{ marginY: 1 }}
      >
        <Typography level="body-sm">Font Size</Typography>
        <Input
          name="fontSize"
          id="fontSize"
          value={formik.values.fontSize}
          onChange={(e) => {
            //get the current unit
            const unit = formik.values.fontSizeUnit;
            //get the value
            const value = e.target.value;
            //update the value
            handlePropValueChange("fontSize", `${value}${unit}`);
          }}
          size="sm"
          sx={{
            "& input": {
              padding: "2px 7px",
              fontSize: "14px",
            },
            width: "50%",
          }}
          endDecorator={
            <>
              <Divider orientation="vertical" />
              <Select
                variant="plain"
                name="fontSizeUnit"
                id="fontSizeUnit"
                defaultValue="px"
                value={formik.values.fontSizeUnit}
                onChange={(e, val) =>
                  handlePropValueChange("fontSizeUnit", val)
                }
                size="sm"
                sx={{
                  "& input": {
                    padding: "2px 7px",
                    fontSize: "14px",
                  },
                  mr: -1,
                }}
              >
                {units.map((unit) => (
                  <Option key={unit} value={unit}>
                    {unit}
                  </Option>
                ))}
              </Select>
            </>
          }
        />
      </Stack>

      {/*Font Weight*/}
      <Stack
        direction="row"
        justifyContent={"space-between"}
        alignItems={"center"}
        sx={{ marginY: 1 }}
      >
        <Typography level="body-sm">Font Weight</Typography>
        <Select
          name="fontWeight"
          id="fontWeight"
          defaultValue={fontWeight}
          value={formik.values.fontWeight}
          onChange={(e, val) => handlePropValueChange("fontWeight", val)}
          size="sm"
          sx={{
            "& input": {
              padding: "2px 7px",
              fontSize: "14px",
            },
          }}
        >
          <Option value="100">100</Option>
          <Option value="200">200</Option>
          <Option value="300">300</Option>
          <Option value="400">400</Option>
          <Option value="500">500</Option>
          <Option value="600">600</Option>
          <Option value="700">700</Option>
          <Option value="800">800</Option>
          <Option value="900">900</Option>
        </Select>
      </Stack>

      {/*Line Height*/}
      <Stack
        direction="row"
        justifyContent={"space-between"}
        alignItems={"center"}
        sx={{ marginY: 1 }}
      >
        <Typography level="body-sm">Line Height</Typography>
        <Input
          name="lineHeight"
          id="lineHeight"
          value={formik.values.lineHeight}
          onChange={(e) => handlePropValueChange("lineHeight", e.target.value)}
          size="sm"
          sx={{
            "& input": {
              padding: "2px 7px",
              fontSize: "14px",
            },
            width: "50%",
          }}
          endDecorator={
            <>
              <Divider orientation="vertical" />
              <Select
              variant="plain"
                name="lineHeightUnit"
                id="lineHeightUnit"
                defaultValue="px"
                value={formik.values.lineHeightUnit}
                onChange={(e, val) =>
                  handlePropValueChange("lineHeightUnit", val)
                }
                size="sm"
                sx={{
                  "& input": {
                    padding: "2px 7px",
                    fontSize: "14px",
                  },
                  mr: -1,
                }}
              >
                {units.map((unit) => (
                  <Option key={unit} value={unit}>
                    {unit}
                  </Option>
                ))}
              </Select>
            </>
          }
        />
      </Stack>

      {/*Letter Spacing*/}
      <Stack
        direction="row"
        justifyContent={"space-between"}
        alignItems={"center"}
        sx={{ marginY: 1 }}
      >
        <Typography level="body-sm">Letter Spacing</Typography>
        <Input
          name="letterSpacing"
          id="letterSpacing"
          value={formik.values.letterSpacing}
          onChange={(e) =>
            handlePropValueChange("letterSpacing", e.target.value)
          }
          size="sm"
          sx={{
            "& input": {
              padding: "2px 7px",
              fontSize: "14px",
            },
            width: "50%",
          }}
          endDecorator={
            <>
              <Divider orientation="vertical" />
              <Select
              variant="plain"
                name="letterSpacingUnit"
                id="letterSpacingUnit"
                defaultValue="px"
                value={formik.values.letterSpacingUnit}
                onChange={(e, val) =>
                  handlePropValueChange("letterSpacingUnit", val)
                }
                size="sm"
                sx={{
                  "& input": {
                    padding: "2px 7px",
                    fontSize: "14px",
                  },
                  mr: -1,
                }}
              >
                {units.map((unit) => (
                  <Option key={unit} value={unit}>
                    {unit}
                  </Option>
                ))}
              </Select>
            </>
          }
        />
      </Stack>

      {/*Text Align*/}
      <Stack
        direction="column"
        alignItems={"flex-start"}
        sx={{ marginY: 1 }}
      >
        <Typography level="body-sm">Text Align</Typography>
        <ToggleButtonGroup
        buttonFlex={1}
          value={formik.values.textAlign}
          onChange={(e, val) => handlePropValueChange("textAlign", val)}
          size="sm"
        >
          {alignments.map((alignment) => (
            <Button key={alignment.value} value={alignment.value}>
              {alignment.icon}
            </Button>
          ))}
        </ToggleButtonGroup>
      </Stack>

      {/*Text Transform*/}
      <Stack
        direction="column"
        alignItems={"flex-start"}
        sx={{ marginY: 1 }}
      >
        <Typography level="body-sm">Text Transform</Typography>
        <ToggleButtonGroup
        buttonFlex={1}
          value={formik.values.textTransform}
          onChange={(e, val) => handlePropValueChange("textTransform", val)}
          size="sm"
        >
          {transforms.map((transform) => (
            <Button key={transform.value} value={transform.value}>
              {transform.icon}
            </Button>
          ))}
        </ToggleButtonGroup>
      </Stack>

      {/*Text Decoration*/}
      <Stack
        direction="column"
        justifyContent={"space-between"}
        alignItems={"flex-start"}
        sx={{ marginY: 1 }}
      >
        <Typography level="body-sm">Text Decoration</Typography>
        <ToggleButtonGroup
        buttonFlex={1}
          value={formik.values.textDecoration}
          onChange={(e, val) => handlePropValueChange("textDecoration", val)}
          size="sm"
        >
          {decorations.map((decoration) => (
            <Button key={decoration.value} value={decoration.value}>
              {decoration.icon}
            </Button>
          ))}
        </ToggleButtonGroup>
      </Stack>

      {/*Color*/}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          marginY: 1,
        }}
      >
        <Accordion
          expanded={expanded === `panel-${0}`}
          onChange={handleChange(`panel-${0}`)}
        >
          <AccordionSummary
            aria-controls={`panel${0}-content`}
            id={`panel${0}-header`}
          >
            <Typography level="title-sm">Color</Typography>
          </AccordionSummary>
          <AccordionDetails
            sx={{
              display: "flex",
              flexDirection: "column",
              padding: 0,
            }}
          >
            <ColorPicker
              width={130}
              height={130}
              color={textColor}
              onChange={(color) =>{
                setTextColor(color);
                handlePropValueChange("color", color.hex);
              }}
            />
          </AccordionDetails>
        </Accordion>
      </Box>
    </Box>
  );
};

//If display is Block then show these layout settings
TypographySettings.defaultProps = {
  settings: {
    display: "flex",
    direction: "row",
    justify: "flex-start",
    align: "flex-start",
  },
  onSettingsChange: () => {},
};

export default TypographySettings;

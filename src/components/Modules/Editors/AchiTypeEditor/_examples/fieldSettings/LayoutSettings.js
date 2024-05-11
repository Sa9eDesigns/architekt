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

/*Editor Settings*/
const LayoutSettings = ({ settings, onSettingsChange }) => {
  //PROPS
  const {
    //Main Layout Settings
    display,
    direction,
    justify,
    align,
    gap,
    wrap,
  } = settings;

  //FORMIK
  const formik = useFormik({
    initialValues: {
      display: display,
      direction: direction,
      justify: justify,
      align: align,
    },
    validationSchema: yup.object({
      display: yup.string(),
      direction: yup.string(),
      justify: yup.string(),
      align: yup.string(),
    }),
  });

  //STATE
  const [expanded, setExpanded] = React.useState(false);

  //HANDLERS
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const handlePropValueChange = (prop, value) => {
    formik.setFieldValue(prop, value);

    //When the formik value changes, create a new settings object and pass it to the parent component
    const newSettings = {
      display: formik.values.display,
      direction: formik.values.direction,
      justify: formik.values.justify,
      align: formik.values.align,
    };

    //Pass the new settings to the parent component
    onSettingsChange(newSettings);
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
      <Stack
        direction="row"
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Typography level="body-sm">Display</Typography>
        <Select
          name="display"
          id="display"
          defaultValue={display}
          value={formik.values.display}
          onChange={(e, val) => handlePropValueChange("display", val)}
          size="sm"
          sx={{
            "& input": {
              padding: "2px 7px",
              fontSize: "14px",
            },
          }}
        >
          <Option value="flex">Flex</Option>
          <Option value="block">Block</Option>
          <Option value="inline">Inline</Option>
          <Option value="inline-block">Inline Block</Option>
          <Option value="grid">Grid</Option>
          <Option value="none">None</Option>
        </Select>
      </Stack>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          //Bottom border and margin
          borderBottom: "1px solid var(--divider-color)",
          paddingY: 1,
        }}
      >
        <Typography level="title-sm">Direction</Typography>
        <ToggleButtonGroup
          name="direction"
          id="direction"
          buttonFlex="1"
          value={formik.values.direction}
          exclusive
          onChange={(e, value) => handlePropValueChange("direction", value)}
          aria-label="text alignment"
          size="sm"
          sx={{
            "& .MuiToggleButtonGroup-grouped": {
              borderRadius: 0,
            },
          }}
        >
          <Button value="row" aria-label="row">
            <Icon icon="akar-icons:arrow-right" width="14" height="14" />
          </Button>
          <Button value="row-reverse" aria-label="row-reverse">
            <Icon icon="akar-icons:arrow-left" width="14" height="14" />
          </Button>
          <Button value="column" aria-label="column">
            <Icon icon="akar-icons:arrow-down" width="14" height="14" />
          </Button>
          <Button value="column-reverse" aria-label="column-reverse">
            <Icon icon="akar-icons:arrow-up" width="14" height="14" />
          </Button>
        </ToggleButtonGroup>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          //Bottom border and margin
          borderBottom: "1px solid var(--divider-color)",
          paddingY: 1,
        }}
      >
        <Typography level="title-sm">Justify</Typography>
        <ToggleButtonGroup
          name="justify"
          id="justify"
          buttonFlex="1"
          value={formik.values.justify}
          exclusive
          onChange={(e, value) => handlePropValueChange("justify", value)}
          aria-label="text alignment"
          size="sm"
          sx={{
            "& .MuiToggleButtonGroup-grouped": {
              borderRadius: 0,
            },
          }}
        >
          <Button value="flex-start" aria-label="flex-start">
            <Icon icon="akar-icons:align-left" width="14" height="14" />
          </Button>
          <Button value="center" aria-label="center">
            <Icon
              icon="akar-icons:align-horizontal-center"
              width="14"
              height="14"
            />
          </Button>
          <Button value="flex-end" aria-label="flex-end">
            <Icon icon="akar-icons:align-right" width="14" height="14" />
          </Button>
          <Button value="space-between" aria-label="space-between">
            <Icon
              icon="material-symbols:align-justify-space-between-rounded"
              width="14"
              height="14"
            />
          </Button>
          <Button value="space-around" aria-label="space-around">
            <Icon
              icon="material-symbols:align-justify-space-around-rounded"
              width="14"
              height="14"
            />
          </Button>
          <Button value="space-evenly" aria-label="space-evenly">
            <Icon
              icon="material-symbols:align-justify-space-even-rounded"
              width="14"
              height="14"
            />
          </Button>
        </ToggleButtonGroup>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          //Bottom border and margin
          borderBottom: "1px solid var(--divider-color)",
          paddingY: 1,
        }}
      >
        <Typography level="title-sm">Align</Typography>
        <ToggleButtonGroup
          name="align"
          id="align"
          buttonFlex="1"
          value={formik.values.align}
          exclusive
          onChange={(e, value) => handlePropValueChange("align", value)}
          aria-label="Align"
          size="sm"
          sx={{
            "& .MuiToggleButtonGroup-grouped": {
              borderRadius: 0,
            },
          }}
        >
          <Button value="flex-start" aria-label="flex-start">
            <Icon icon="akar-icons:align-left" width="14" height="14" />
          </Button>
          <Button value="center" aria-label="center">
            <Icon
              icon="akar-icons:align-horizontal-center"
              width="14"
              height="14"
            />
          </Button>
          <Button value="flex-end" aria-label="flex-end">
            <Icon icon="akar-icons:align-right" width="14" height="14" />
          </Button>
          <Button value="space-between" aria-label="space-between">
            <Icon
              icon="material-symbols:align-justify-space-between-rounded"
              width="14"
              height="14"
            />
          </Button>
          <Button value="space-around" aria-label="space-around">
            <Icon
              icon="material-symbols:align-justify-space-around-rounded"
              width="14"
              height="14"
            />
          </Button>
          <Button value="space-evenly" aria-label="space-evenly">
            <Icon
              icon="material-symbols:align-justify-space-even-rounded"
              width="14"
              height="14"
            />
          </Button>
        </ToggleButtonGroup>
      </Box>
    </Box>
  );
};

//If display is Block then show these layout settings
LayoutSettings.defaultProps = {
  settings: {
    display: "flex",
    direction: "row",
    justify: "flex-start",
    align: "flex-start",
  },
  onSettingsChange: () => {},
};

export default LayoutSettings;

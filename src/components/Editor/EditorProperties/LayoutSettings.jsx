/*Used To create a container that can hold other components and can be dragged and dropped in the editor*/

import React, { useState } from "react";
import {
  Box,
  Button,
  Option,
  Select,
  Stack,
  ToggleButtonGroup,
  Typography,
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "@mui/joy";
import { Icon } from "@iconify/react";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";

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

  //REACT-HOOK-FORM
  const schema = yup.object().shape({
    display: yup.string().required("Display is required"),
    direction: yup.string().required("Direction is required"),
    justify: yup.string().required("Justify is required"),
    align: yup.string().required("Align is required"),
    gap: yup.number().min(0, "Gap must be a positive number"),
    wrap: yup.boolean(),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      display,
      direction,
      justify,
      align,
      gap,
      wrap,
    },
  });

  //STATE
  const [expanded, setExpanded] = useState(false);

  //HANDLERS
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const handlePropValueChange = (prop, value) => {
    const newSettings = {
      ...settings,
      [prop]: value,
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
        <Controller
          name="display"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
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
          )}
        />
        {errors.display && (
          <Typography level="body-sm" sx={{ color: "error.500" }}>
            {errors.display.message}
          </Typography>
        )}
      </Stack>

      <Accordion
        expanded={expanded === "direction"}
        onChange={handleChange("direction")}
        sx={{
          borderBottom: "1px solid var(--divider-color)",
          paddingY: 1,
        }}
      >
        <AccordionSummary>
          <Typography level="title-sm">Direction</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Controller
            name="direction"
            control={control}
            render={({ field }) => (
              <ToggleButtonGroup
                {...field}
                buttonFlex="1"
                exclusive
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
            )}
          />
          {errors.direction && (
            <Typography level="body-sm" sx={{ color: "error.500" }}>
              {errors.direction.message}
            </Typography>
          )}
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === "justify"}
        onChange={handleChange("justify")}
        sx={{
          borderBottom: "1px solid var(--divider-color)",
          paddingY: 1,
        }}
      >
        <AccordionSummary>
          <Typography level="title-sm">Justify</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Controller
            name="justify"
            control={control}
            render={({ field }) => (
              <ToggleButtonGroup
                {...field}
                buttonFlex="1"
                exclusive
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
            )}
          />
          {errors.justify && (
            <Typography level="body-sm" sx={{ color: "error.500" }}>
              {errors.justify.message}
            </Typography>
          )}
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === "align"}
        onChange={handleChange("align")}
        sx={{
          borderBottom: "1px solid var(--divider-color)",
          paddingY: 1,
        }}
      >
        <AccordionSummary>
          <Typography level="title-sm">Align</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Controller
            name="align"
            control={control}
            render={({ field }) => (
              <ToggleButtonGroup
                {...field}
                buttonFlex="1"
                exclusive
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
            )}
          />
          {errors.align && (
            <Typography level="body-sm" sx={{ color: "error.500" }}>
              {errors.align.message}
            </Typography>
          )}
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === "gap"}
        onChange={handleChange("gap")}
        sx={{
          borderBottom: "1px solid var(--divider-color)",
          paddingY: 1,
        }}
      >
        <AccordionSummary>
          <Typography level="title-sm">Gap</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Controller
            name="gap"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                size="sm"
                sx={{
                  "& input": {
                    padding: "2px 7px",
                    fontSize: "14px",
                  },
                }}
              >
                <Option value={0}>0</Option>
                <Option value={1}>1</Option>
                <Option value={2}>2</Option>
                <Option value={3}>3</Option>
                <Option value={4}>4</Option>
                <Option value={5}>5</Option>
              </Select>
            )}
          />
          {errors.gap && (
            <Typography level="body-sm" sx={{ color: "error.500" }}>
              {errors.gap.message}
            </Typography>
          )}
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === "wrap"}
        onChange={handleChange("wrap")}
        sx={{
          borderBottom: "1px solid var(--divider-color)",
          paddingY: 1,
        }}
      >
        <AccordionSummary>
          <Typography level="title-sm">Wrap</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Controller
            name="wrap"
            control={control}
            render={({ field }) => (
              <ToggleButtonGroup
                {...field}
                buttonFlex="1"
                exclusive
                aria-label="Wrap"
                size="sm"
                sx={{
                  "& .MuiToggleButtonGroup-grouped": {
                    borderRadius: 0,
                  },
                }}
              >
                <Button value={true} aria-label="wrap">
                  <Icon icon="akar-icons:wrap-text" width="14" height="14" />
                </Button>
                <Button value={false} aria-label="no-wrap">
                  <Icon icon="akar-icons:no-wrap" width="14" height="14" />
                </Button>
              </ToggleButtonGroup>
            )}
          />
          {errors.wrap && (
            <Typography level="body-sm" sx={{ color: "error.500" }}>
              {errors.wrap.message}
            </Typography>
          )}
        </AccordionDetails>
      </Accordion>
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
    gap: 0,
    wrap: false,
  },
  onSettingsChange: () => {},
};

export default LayoutSettings;
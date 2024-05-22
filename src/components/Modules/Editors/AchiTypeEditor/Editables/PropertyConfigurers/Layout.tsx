import React from "react";
import {
  Box,
  Button,
  Option,
  Select,
  Stack,
  ToggleButtonGroup,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/joy";
import { Icon } from "@iconify/react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNode, useEditor } from "@craftjs/core";

interface LayoutSettingsProps {
  settings: {
    display: string;
    direction: string;
    justify: string;
    align: string;
    gap?: string;
    wrap?: string;
  };
  onSettingsChange: (newSettings: any) => void;
}

const validationSchema = yup.object().shape({
  display: yup.string().required("Display is required"),
  direction: yup.string().required("Direction is required"),
  justify: yup.string().required("Justify is required"),
  align: yup.string().required("Align is required"),
});

const LayoutSettings: React.FC<LayoutSettingsProps> = React.memo(
  ({ settings, onSettingsChange }) => {
    const { display, direction, justify, align } = settings;

    const { control, getValues, setValue } = useForm({
      defaultValues: {
        display,
        direction,
        justify,
        align,
      },
      resolver: yupResolver(validationSchema),
    });

    const handlePropValueChange = (prop: "display" | "direction" | "justify" | "align", value: any) => {
      setValue(prop, value);

      // Create a new settings object and pass it to the parent component
      const newSettings = {
        display: getValues("display"),
        direction: getValues("direction"),
        justify: getValues("justify"),
        align: getValues("align"),
      };

      onSettingsChange(newSettings);
    };

    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          padding: 1,
          marginY: 1,
        }}
      >
        <FormRow label="Display">
          <Controller
            name="display"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                size="sm"
                onChange={(e, val) => handlePropValueChange("display", val)}
              >
                {[
                  "flex",
                  "block",
                  "inline",
                  "inline-block",
                  "grid",
                  "none",
                ].map((option) => (
                  <Option key={option} value={option}>
                    {option}
                  </Option>
                ))}
              </Select>
            )}
          />
        </FormRow>

        <FormRow label="Direction">
          <Controller
            name="direction"
            control={control}
            render={({ field }) => (
              <ToggleButtonGroup
                {...field}
                buttonFlex="1"
                exclusive
                size="sm"
                onChange={(e, value) =>
                  handlePropValueChange("direction", value)
                }
                aria-label="Direction"
              >
                {["row", "row-reverse", "column", "column-reverse"].map(
                  (option) => (
                    <Button key={option} value={option} aria-label={option}>
                      <Icon
                        icon={`akar-icons:arrow-${
                          option.includes("row") ? "horizontal" : "vertical"
                        }-${option.includes("reverse") ? "left" : "right"}`}
                        width="14"
                        height="14"
                      />
                    </Button>
                  )
                )}
              </ToggleButtonGroup>
            )}
          />
        </FormRow>

        <FormRow label="Justify">
          <Controller
            name="justify"
            control={control}
            render={({ field }) => (
              <ToggleButtonGroup
                {...field}
                buttonFlex="1"
                exclusive
                size="sm"
                onChange={(e, value) => handlePropValueChange("justify", value)}
                aria-label="Justify"
              >
                {[
                  "flex-start",
                  "center",
                  "flex-end",
                  "space-between",
                  "space-around",
                  "space-evenly",
                ].map((option) => (
                  <Button key={option} value={option} aria-label={option}>
                    <Icon
                      icon={`akar-icons:align-${option
                        .replace("flex-", "")
                        .replace("space-", "")}`}
                      width="14"
                      height="14"
                    />
                  </Button>
                ))}
              </ToggleButtonGroup>
            )}
          />
        </FormRow>

        <FormRow label="Align">
          <Controller
            name="align"
            control={control}
            render={({ field }) => (
              <ToggleButtonGroup
                {...field}
                buttonFlex="1"
                exclusive
                size="sm"
                onChange={(e, value) => handlePropValueChange("align", value)}
                aria-label="Align"
              >
                {[
                  "flex-start",
                  "center",
                  "flex-end",
                  "space-between",
                  "space-around",
                  "space-evenly",
                ].map((option) => (
                  <Button key={option} value={option} aria-label={option}>
                    <Icon
                      icon={`akar-icons:align-${option
                        .replace("flex-", "")
                        .replace("space-", "")}`}
                      width="14"
                      height="14"
                    />
                  </Button>
                ))}
              </ToggleButtonGroup>
            )}
          />
        </FormRow>
      </Box>
    );
  }
);

interface FormRowProps {
  label: string;
  children: React.ReactNode;
}

const FormRow: React.FC<FormRowProps> = ({ label, children }) => (
  <Stack
    direction="row"
    justifyContent={"space-between"}
    alignItems={"center"}
    sx={{
      marginY: 1,
      borderBottom: "1px solid var(--divider-color)",
      paddingY: 1,
    }}
  >
    <Typography level="body-sm">{label}</Typography>
    {children}
  </Stack>
);

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

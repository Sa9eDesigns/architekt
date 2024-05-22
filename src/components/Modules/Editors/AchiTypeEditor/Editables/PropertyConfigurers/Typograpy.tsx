import React from "react";
import {
  Box,
  Button,
  Divider,
  Input,
  Select,
  Stack,
  ToggleButtonGroup,
  Typography,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Option,
} from "@mui/joy";
import { Icon } from "@iconify/react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import ColorPicker from "react-best-gradient-color-picker";

interface TypographySettingsProps {
  settings: {
    fontFamily: string;
    fontSize: string;
    fontWeight: string;
    lineHeight: string;
    letterSpacing: string;
    textAlign: string;
    textDecoration: string;
    textTransform: string;
    color: string;
    backgroundColor?: string;
    padding?: string;
    margin?: string;
    borderRadius?: string;
    boxShadow?: string;
    overflow?: string;
  };
  onSettingsChange: (name: string, value: any) => void;
}

const units = ["px", "em", "%", "vh", "vw", "rem"];
const alignments = [
  { value: "left", icon: <Icon icon="bi:justify-left" /> },
  { value: "center", icon: <Icon icon="bi:text-center" /> },
  { value: "right", icon: <Icon icon="bi:justify-right" /> },
  { value: "justify", icon: <Icon icon="bi:justify" /> },
];
const transforms = [
  { value: "none", icon: <Icon icon="carbon:checkbox-indeterminate" /> },
  { value: "uppercase", icon: <Icon icon="carbon:character-upper-case" /> },
  { value: "lowercase", icon: <Icon icon="carbon:character-lower-case" /> },
  { value: "capitalize", icon: <Icon icon="carbon:character-sentence-case" /> },
];
const decorations = [
  { value: "none", icon: <Icon icon="carbon:checkbox-indeterminate" /> },
  { value: "underline", icon: <Icon icon="bi:type-underline" /> },
  { value: "line-through", icon: <Icon icon="bi:type-strikethrough" /> },
];

const validationSchema = yup.object().shape({
  fontFamily: yup.string().required("Font family is required"),
  fontSize: yup.number().required("Font size is required").min(1),
  fontSizeUnit: yup.string().required("Unit is required"),
  fontWeight: yup.number().required("Font weight is required"),
  lineHeight: yup.number().required("Line height is required").min(1),
  lineHeightUnit: yup.string().required("Unit is required"),
  letterSpacing: yup.number().required("Letter spacing is required").min(0),
  letterSpacingUnit: yup.string().required("Unit is required"),
  textAlign: yup.string().required("Text align is required"),
  textDecoration: yup.string().required("Text decoration is required"),
  textTransform: yup.string().required("Text transform is required"),
  color: yup.string().required("Color is required"),
});

const TypographySettings: React.FC<TypographySettingsProps> = React.memo(
  ({ settings, onSettingsChange }) => {
    const {
      fontFamily,
      fontSize,
      fontWeight,
      lineHeight,
      letterSpacing,
      textAlign,
      textDecoration,
      textTransform,
      color,
    } = settings;

    const { control, getValues, setValue } = useForm({
      defaultValues: {
        fontFamily,
        fontSize: parseFloat(fontSize),
        fontSizeUnit: fontSize.replace(/[0-9]/g, ""),
        fontWeight: parseInt(fontWeight, 10),
        lineHeight: parseFloat(lineHeight),
        lineHeightUnit: lineHeight.replace(/[0-9]/g, ""),
        letterSpacing: parseFloat(letterSpacing),
        letterSpacingUnit: letterSpacing.replace(/[0-9]/g, ""),
        textAlign,
        textDecoration,
        textTransform,
        color,
      },
      resolver: yupResolver(validationSchema),
    });

    const handlePropValueChange = (name: "fontFamily" | "textAlign" | "textDecoration" | "textTransform" | "color" | "fontSize" | "fontSizeUnit" | "fontWeight" | "lineHeight" | "lineHeightUnit" | "letterSpacing" | "letterSpacingUnit", value: any) => {
      setValue(name, value);
      onSettingsChange(name, value);
    };

    const renderSelectOptions = (options: string[]) =>
      options.map((option) => (
        <Option key={option} value={option}>
          {option}
        </Option>
      ));

    const renderToggleButtons = (
      options: { value: string; icon: JSX.Element }[]
    ) =>
      options.map((option) => (
        <Button key={option.value} value={option.value}>
          {option.icon}
        </Button>
      ));

    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          padding: 1,
          marginY: 1,
        }}
      >
        <FormRow label="Font">
          <Controller
            name="fontFamily"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                size="sm"
                onChange={(e, val) => handlePropValueChange("fontFamily", val)}
              >
                {renderSelectOptions([
                  "Arial",
                  "Helvetica",
                  "Georgia",
                  "Times New Roman",
                  "Tahoma",
                  "Verdana",
                ])}
              </Select>
            )}
          />
        </FormRow>

        <FormRow label="Font Size">
          <Controller
            name="fontSize"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                size="sm"
                onChange={(e) => {
                  const unit = getValues("fontSizeUnit");
                  const value = e.target.value;
                  handlePropValueChange("fontSize", `${value}${unit}`);
                }}
                endDecorator={
                  <Controller
                    name="fontSizeUnit"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        variant="plain"
                        size="sm"
                        onChange={(e, val) =>
                          handlePropValueChange("fontSizeUnit", val)
                        }
                      >
                        {renderSelectOptions(units)}
                      </Select>
                    )}
                  />
                }
              />
            )}
          />
        </FormRow>

        <FormRow label="Font Weight">
          <Controller
            name="fontWeight"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                size="sm"
                onChange={(e, val) => handlePropValueChange("fontWeight", val)}
              >
                {[...Array(9)].map((_, i) => (
                  <Option key={i} value={(i + 1) * 100}>
                    {(i + 1) * 100}
                  </Option>
                ))}
              </Select>
            )}
          />
        </FormRow>

        <FormRow label="Line Height">
          <Controller
            name="lineHeight"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                size="sm"
                onChange={(e) =>
                  handlePropValueChange("lineHeight", e.target.value)
                }
                endDecorator={
                  <Controller
                    name="lineHeightUnit"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        variant="plain"
                        size="sm"
                        onChange={(e, val) =>
                          handlePropValueChange("lineHeightUnit", val)
                        }
                      >
                        {renderSelectOptions(units)}
                      </Select>
                    )}
                  />
                }
              />
            )}
          />
        </FormRow>

        <FormRow label="Letter Spacing">
          <Controller
            name="letterSpacing"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                size="sm"
                onChange={(e) =>
                  handlePropValueChange("letterSpacing", e.target.value)
                }
                endDecorator={
                  <Controller
                    name="letterSpacingUnit"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        variant="plain"
                        size="sm"
                        onChange={(e, val) =>
                          handlePropValueChange("letterSpacingUnit", val)
                        }
                      >
                        {renderSelectOptions(units)}
                      </Select>
                    )}
                  />
                }
              />
            )}
          />
        </FormRow>

        <FormRow label="Text Align">
          <Controller
            name="textAlign"
            control={control}
            render={({ field }) => (
              <ToggleButtonGroup
                {...field}
                buttonFlex={1}
                size="sm"
                onChange={(e, val) => handlePropValueChange("textAlign", val)}
              >
                {renderToggleButtons(alignments)}
              </ToggleButtonGroup>
            )}
          />
        </FormRow>

        <FormRow label="Text Transform">
          <Controller
            name="textTransform"
            control={control}
            render={({ field }) => (
              <ToggleButtonGroup
                {...field}
                buttonFlex={1}
                size="sm"
                onChange={(e, val) =>
                  handlePropValueChange("textTransform", val)
                }
              >
                {renderToggleButtons(transforms)}
              </ToggleButtonGroup>
            )}
          />
        </FormRow>

        <FormRow label="Text Decoration">
          <Controller
            name="textDecoration"
            control={control}
            render={({ field }) => (
              <ToggleButtonGroup
                {...field}
                buttonFlex={1}
                size="sm"
                onChange={(e, val) =>
                  handlePropValueChange("textDecoration", val)
                }
              >
                {renderToggleButtons(decorations)}
              </ToggleButtonGroup>
            )}
          />
        </FormRow>

        <Box sx={{ display: "flex", flexDirection: "column", marginY: 1 }}>
          <Accordion>
            <AccordionSummary
              aria-controls={`panel${0}-content`}
              id={`panel${0}-header`}
            >
              <Typography level="title-sm">Color</Typography>
            </AccordionSummary>
            <AccordionDetails
              sx={{ display: "flex", flexDirection: "column", padding: 0 }}
            >
              <Controller
                name="color"
                control={control}
                render={({ field }) => (
                  <ColorPicker
                    {...field}
                    width={130}
                    height={130}
                    value={field.value}
                    onChange={(color) => handlePropValueChange("color", color)}
                  />
                )}
              />
            </AccordionDetails>
          </Accordion>
        </Box>
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
    sx={{ marginY: 1 }}
  >
    <Typography level="body-sm">{label}</Typography>
    {children}
  </Stack>
);

TypographySettings.defaultProps = {
  settings: {
    fontFamily: "Arial",
    fontSize: "16px",
    fontWeight: "400",
    lineHeight: "normal",
    letterSpacing: "normal",
    textAlign: "left",
    textDecoration: "none",
    textTransform: "none",
    color: "#000000",
  },
  onSettingsChange: () => {},
};

export default TypographySettings;

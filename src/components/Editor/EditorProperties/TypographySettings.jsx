import React from "react";
import {
  Box,
  Button,
  Divider,
  Input,
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
import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/css";

const TypographySettings = ({ settings, onSettingsChange }) => {
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
    backgroundColor,
    padding,
    margin,
    borderRadius,
    boxShadow,
    overflow,
  } = settings;

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
    },
  ];
  const transforms = [
    {
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
    },
  ];

  const decorations = [
    {
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
    },
  ];

  const overflows = ["visible", "hidden", "scroll", "auto"];

  const [expanded, setExpanded] = React.useState(false);
  const [openColorPicker, setOpenColorPicker] = React.useState(false);
  const [colorPickerAnchor, setColorPickerAnchor] = React.useState(null);
  const [textColor, setTextColor] = useColor("hex", "#333");

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const validationSchema = yup.object().shape({
    fontFamily: yup.string().required("Font family is required"),
    fontSize: yup
      .string()
      .matches(/^\d+(\.\d+)?(px|em|%|vh|vw|rem)$/, "Invalid font size format")
      .required("Font size is required"),
    fontWeight: yup
      .string()
      .oneOf(["100", "200", "300", "400", "500", "600", "700", "800", "900"])
      .required("Font weight is required"),
    lineHeight: yup
      .string()
      .matches(/^\d+(\.\d+)?(px|em|%|vh|vw|rem)$/, "Invalid line height format")
      .required("Line height is required"),
    letterSpacing: yup
      .string()
      .matches(
        /^\d+(\.\d+)?(px|em|%|vh|vw|rem)$/,
        "Invalid letter spacing format"
      )
      .required("Letter spacing is required"),
    textAlign: yup
      .string()
      .oneOf(["left", "center", "right", "justify"])
      .required("Text alignment is required"),
    textDecoration: yup
      .string()
      .oneOf(["none", "underline", "line-through"])
      .required("Text decoration is required"),
    textTransform: yup
      .string()
      .oneOf(["none", "uppercase", "lowercase", "capitalize"])
      .required("Text transformation is required"),
    color: yup.string().required("Text color is required"),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: settings,
  });

  const handlePropValueChange = (prop, value) => {
    onSettingsChange({ ...settings, [prop]: value });
  };

  const onSubmit = (data) => {
    onSettingsChange(data);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        display: "flex",
        flexDirection: "column",
        padding: 1,
        marginY: 1,
      }}
    >
      {/* Font Family */}
      <Stack
        direction="row"
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Typography level="body-sm">Font</Typography>
        <Controller
          name="fontFamily"
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
              <Option value="Arial">Arial</Option>
              <Option value="Helvetica">Helvetica</Option>
              <Option value="Georgia">Georgia</Option>
              <Option value="Times New Roman">Times New Roman</Option>
              <Option value="Tahoma">Tahoma</Option>
              <Option value="Verdana">Verdana</Option>
            </Select>
          )}
        />
        {errors.fontFamily && (
          <Typography level="body-sm" sx={{ color: "error.500" }}>
            {errors.fontFamily.message}
          </Typography>
        )}
      </Stack>

      {/* Font Size */}
      <Stack
        direction="row"
        justifyContent={"space-between"}
        alignItems={"center"}
        sx={{ marginY: 1 }}
      >
        <Typography level="body-sm">Font Size</Typography>
        <Controller
          name="fontSize"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
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
                    defaultValue="px"
                    value={field.value.replace(/\d+/g, "")}
                    onChange={(e, val) => {
                      const value = field.value.replace(/\D+/g, "");
                      field.onChange(`${value}${val}`);
                    }}
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
          )}
        />
        {errors.fontSize && (
          <Typography level="body-sm" sx={{ color: "error.500" }}>
            {errors.fontSize.message}
          </Typography>
        )}
      </Stack>

      {/* Font Weight */}
      <Stack
        direction="row"
        justifyContent={"space-between"}
        alignItems={"center"}
        sx={{ marginY: 1 }}
      >
        <Typography level="body-sm">Font Weight</Typography>
        <Controller
          name="fontWeight"
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
          )}
        />
        {errors.fontWeight && (
          <Typography level="body-sm" sx={{ color: "error.500" }}>
            {errors.fontWeight.message}
          </Typography>
        )}
      </Stack>

      {/* Line Height */}
      <Stack
        direction="row"
        justifyContent={"space-between"}
        alignItems={"center"}
        sx={{ marginY: 1 }}
      >
        <Typography level="body-sm">Line Height</Typography>
        <Controller
          name="lineHeight"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
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
                    defaultValue="px"
                    value={field.value.replace(/\d+/g, "")}
                    onChange={(e, val) => {
                      const value = field.value.replace(/\D+/g, "");
                      field.onChange(`${value}${val}`);
                    }}
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
          )}
        />
        {errors.lineHeight && (
          <Typography level="body-sm" sx={{ color: "error.500" }}>
            {errors.lineHeight.message}
          </Typography>
        )}
      </Stack>

      {/* Letter Spacing */}
      <Stack
        direction="row"
        justifyContent={"space-between"}
        alignItems={"center"}
        sx={{ marginY: 1 }}
      >
        <Typography level="body-sm">Letter Spacing</Typography>
        <Controller
          name="letterSpacing"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
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
                    defaultValue="px"
                    value={field.value.replace(/\d+/g, "")}
                    onChange={(e, val) => {
                      const value = field.value.replace(/\D+/g, "");
                      field.onChange(`${value}${val}`);
                    }}
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
          )}
        />
        {errors.letterSpacing && (
          <Typography level="body-sm" sx={{ color: "error.500" }}>
            {errors.letterSpacing.message}
          </Typography>
        )}
      </Stack>

      {/* Text Align */}
      <Stack direction="column" alignItems={"flex-start"} sx={{ marginY: 1 }}>
        <Typography level="body-sm">Text Align</Typography>
        <Controller
          name="textAlign"
          control={control}
          render={({ field }) => (
            <ToggleButtonGroup {...field} buttonFlex={1} size="sm">
              {alignments.map((alignment) => (
                <Button key={alignment.value} value={alignment.value}>
                  {alignment.icon}
                </Button>
              ))}
            </ToggleButtonGroup>
          )}
        />
        {errors.textAlign && (
          <Typography level="body-sm" sx={{ color: "error.500" }}>
            {errors.textAlign.message}
          </Typography>
        )}
      </Stack>

      {/* Text Transform */}
      <Stack direction="column" alignItems={"flex-start"} sx={{ marginY: 1 }}>
        <Typography level="body-sm">Text Transform</Typography>
        <Controller
          name="textTransform"
          control={control}
          render={({ field }) => (
            <ToggleButtonGroup {...field} buttonFlex={1} size="sm">
              {transforms.map((transform) => (
                <Button key={transform.value} value={transform.value}>
                  {transform.icon}
                </Button>
              ))}
            </ToggleButtonGroup>
          )}
        />
        {errors.textTransform && (
          <Typography level="body-sm" sx={{ color: "error.500" }}>
            {errors.textTransform.message}
          </Typography>
        )}
      </Stack>

      {/* Text Decoration */}
      <Stack
        direction="column"
        justifyContent={"space-between"}
        alignItems={"flex-start"}
        sx={{ marginY: 1 }}
      >
        <Typography level="body-sm">Text Decoration</Typography>
        <Controller
          name="textDecoration"
          control={control}
          render={({ field }) => (
            <ToggleButtonGroup {...field} buttonFlex={1} size="sm">
              {decorations.map((decoration) => (
                <Button key={decoration.value} value={decoration.value}>
                  {decoration.icon}
                </Button>
              ))}
            </ToggleButtonGroup>
          )}
        />
        {errors.textDecoration && (
          <Typography level="body-sm" sx={{ color: "error.500" }}>
            {errors.textDecoration.message}
          </Typography>
        )}
      </Stack>

      {/* Color */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          marginY: 1,
        }}
      >
        <Typography level="body-sm">Text Color</Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            marginY: 1,
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={(e) => {
              setColorPickerAnchor(e.currentTarget);
              setOpenColorPicker(true);
            }}
            sx={{
              width: 30,
              height: 30,
              borderRadius: "50%",
              backgroundColor: textColor.hex,
            }}
          />
          <Typography level="body-sm" sx={{ marginLeft: 1 }}>
            {textColor.hex}
          </Typography>
        </Box>
        <ColorPicker
          color={textColor}
          onChange={setTextColor}
          hideHSV
          hideHEX
          hideRGB
          hideHSB
          hideCMYK
          hideAlpha
          hideFooter
          hideControls
          style={{ display: openColorPicker ? "block" : "none" }}
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          marginY: 1,
        }}
      >
        <Accordion
          expanded={expand === "panel2"}
          onChange={handleChange("panel2")}
        >
          <AccordionSummary>
            <Typography level="body-sm">Background Color</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Controller
                name="backgroundColor"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    size="sm"
                    sx={{
                      "& input": {
                        padding: "2px 7px",
                        fontSize: "14px",
                      },
                      width: "50%",
                    }}
                    endDecorator={
                      <Button
                        size="sm"
                        variant="outlined"
                        onClick={(e) => {
                          setOpenColorPicker(!openColorPicker);
                          setColorPickerAnchor(e.currentTarget);
                        }}
                      >
                        <Icon icon="bi:eyedropper" />
                      </Button>
                    }
                  />
                )}
              />
            </Stack>
            {openColorPicker && (
              <ColorPicker
                width={300}
                color={textColor}
                onChange={setTextColor}
                onChangeComplete={(color) => {
                  handlePropValueChange("backgroundColor", color.hex);
                  setOpenColorPicker(false);
                }}
                position="bottom"
                anchorEl={colorPickerAnchor}
              />
            )}
          </AccordionDetails>
        </Accordion>
      </Box>

      {/* Padding */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ marginY: 1 }}
      >
        <Typography level="body-sm">Padding</Typography>
        <Controller
          name="padding"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
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
                    name="paddingUnit"
                    defaultValue="px"
                    value={field.value.replace(/\d+/g, "")}
                    onChange={(e, val) => {
                      const value = field.value.replace(/\D+/g, "");
                      field.onChange(`${value}${val}`);
                    }}
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
          )}
        />
      </Stack>

      {/* Margin */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ marginY: 1 }}
      >
        <Typography level="body-sm">Margin</Typography>
        <Controller
          name="margin"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
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
                    name="marginUnit"
                    defaultValue="px"
                    value={field.value.replace(/\d+/g, "")}
                    onChange={(e, val) => {
                      const value = field.value.replace(/\D+/g, "");
                      field.onChange(`${value}${val}`);
                    }}
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
          )}
        />
      </Stack>

      {/* Border Radius */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ marginY: 1 }}
      >
        <Typography level="body-sm">Border Radius</Typography>
        <Controller
          name="borderRadius"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
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
                    name="borderRadiusUnit"
                    defaultValue="px"
                    value={field.value.replace(/\d+/g, "")}
                    onChange={(e, val) => {
                      const value = field.value.replace(/\D+/g, "");
                      field.onChange(`${value}${val}`);
                    }}
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
          )}
        />
      </Stack>

      {/* Box Shadow */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ marginY: 1 }}
      >
        <Typography level="body-sm">Box Shadow</Typography>
        <Controller
          name="boxShadow"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              size="sm"
              sx={{
                "& input": {
                  padding: "2px 7px",
                  fontSize: "14px",
                },
                width: "50%",
              }}
            />
          )}
        />
      </Stack>

      {/* Overflow */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ marginY: 1 }}
      >
        <Typography level="body-sm">Overflow</Typography>
        <Controller
          name="overflow"
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
              {overflows.map((overflow) => (
                <Option key={overflow} value={overflow}>
                  {overflow}
                </Option>
              ))}
            </Select>
          )}
        />
      </Stack>

      <Button type="submit" variant="solid" sx={{ marginY: 1 }}>
        Apply
      </Button>
    </Box>
  );
};

export default TypographySettings;

/*Style Properties Field Generator
 */

import React from "react";
import {
  Button,
  ButtonGroup,
  Grid,
  Input,
  Typography,
  Select,
  Option,
  Slider,
  Switch,
} from "@mui/joy";
import ColorPicker from "react-best-gradient-color-picker";

export interface StylePropertiesGeneratorProps {
  style: any;
  onChange: (style: any) => void;
}

export function generateSelectField(
  label: string,
  value: string,
  options: string[],
  onChange: (value: string) => void
) {
  return (
    <Grid container spacing={2} alignItems="center">
      <Grid>
        <Typography>{label}</Typography>
      </Grid>
      <Grid item>
        <Select value={value} onChange={(e) => onChange(e.target.value)}>
          {options.map((option) => (
            <Option key={option} value={option}>
              {option}
            </Option>
          ))}
        </Select>
      </Grid>
    </Grid>
  );
}
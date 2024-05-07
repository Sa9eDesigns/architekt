/* This File is used to define the Input Field Component
  - At its core it is an "@mui/joy" Input Component 
  But it has been customized to include the following features:
  - react-hook-forms integration
  - Optimized for use with the "Architekt Form-Builder"
  - Generative AI Integration
  - Dynamic Styling

  Editor Configuration:

  In this file, we define the Input Field Component Along with its 
  Editor Panel, GenerativeAI configuration, and Styling configuration
 */

import React from "react";
import { useForm, Controller, Form } from "react-hook-form";
import { FormControl, FormHelperText, FormLabel, Input } from "@mui/joy";

/** InputField Component */
interface InputFieldProps {
  id: string;
  name: string;
  control: any;
  className?: string;
  //mui props
  color?: "neutral" | "danger" | "primary" | "success" | "warning" | string;
  variant?: "solid" | "soft" | "outlined" | "plain";
  sizes?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  startDecorator?: null | React.ReactNode;
  endDecorator?: null | React.ReactNode;
  csx?: null | object;
  //Parent Props
  label?: null | string;
}

export const InputField: React.FC<InputFieldProps> = ({
  //defaults
  id,
  name,
  control,
  //props
  className,
  color,
  variant,
  sizes,
  fullWidth,
  startDecorator,
  endDecorator,
  csx,
  //Parent Props
  label,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange, value },
        fieldState: { error },
        formState,
      }) => (
        <FormControl>
          {label && <FormLabel htmlFor={id}>{label}</FormLabel>}
          <Input
            id={id}
            className={className}
            color={
              color as "neutral" | "danger" | "primary" | "success" | "warning"
            }
            variant={variant}
            size={sizes}
            fullWidth={fullWidth}
            startDecorator={startDecorator}
            endDecorator={endDecorator}
            sx={csx}
            //react-hook-form props
            onChange={onChange}
            value={value}
          />
          <FormHelperText>{error?.message}</FormHelperText>
        </FormControl>
      )}
    />
  );
};

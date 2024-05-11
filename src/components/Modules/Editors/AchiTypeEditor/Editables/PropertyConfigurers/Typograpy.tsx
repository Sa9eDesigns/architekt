/*This page Defines the Typography Properties Configurer
- Provides the UI to configure the Typography Properties
- It uses Jotai to update the Properties of the Component whose Properties are being Configured

*/
import React, { useState } from "react";
import { Box, Button, Option, Select, Stack, ToggleButtonGroup, Typography } from "@mui/joy";
import { Icon } from "@iconify/react/dist/iconify.js";
import ColorPicker, {useColorPicker} from "react-best-gradient-color-picker";
import { Accordion, AccordionDetails, AccordionSummary, Divider, Input } from "@mui/material";
//Jotai State Management
import { atom, useAtom } from "jotai";
import { useEditor } from "../../../../Hooks/useEditor";

//Typography Properties
const typographyPropertiesAtom = atom({
  fontFamily: "Arial",
  fontSize: 12,
  fontWeight: "normal",
  fontStyle: "normal",
  textDecoration: "none",
  color: "#000000",
  backgroundColor: "#FFFFFF",
  textAlign: "left",
  lineHeight: 1.5,
  letterSpacing: 0,
  textTransform: "none",
  whiteSpace: "normal",
  wordWrap: "normal",
  wordBreak: "normal",
  overflowWrap: "normal",
  hyphens: "none",
  verticalAlign: "baseline",
  textIndent: 0,
  textOverflow: "clip",
  textShadow: "none",
});


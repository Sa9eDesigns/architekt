/*
  This file contains the Viewport component which is the main component of the Editor.
  It is responsible for rendering the selected component and its children in the canvas.
  --uses the useNode and useEditor hooks from the @craftjs/core package
  --it is the main canvas component
*/

import React, { Component } from "react";
import { 
  useNode, 
  useEditor,
  Frame,
  Element,
} from "@craftjs/core";
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  ToggleButtonGroup,
  Typography,
  Modal,
  ModalDialog,
  Stack,
  Dropdown,
  MenuButton,
  MenuItem,
  Menu,
  ListItemDecorator,
  ListDivider,
} from "@mui/joy";
import { Icon } from "@iconify/react";
//Next
import { useRouter } from "next/router";

//Viewport Component

'use client'

/*This Defines the Editor Component
The Editor is the main component that will be used to create the components.
*/ 

import React, { Component } from "react";
import { 
  useNode, 
  useEditor,
  Frame,
  Element,
} from "@craftjs/core";
//MUI Joy Components
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
//Iconify Icon
import { Icon } from "@iconify/react";

/*====================
Editor Canvas Component
====================*/


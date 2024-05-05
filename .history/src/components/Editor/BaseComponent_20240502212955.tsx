/*
This is the base component used for creating the editor components.
- It is the render component for all the editor components
- it uses the useNode hook from craftjs to get the node of the component
- it has a toolbar for dnd, delete, and edit actions
- it has a context menu for the component
- it is resizable (re-resizable)

Props:


*/

import { useNode, useEditor } from '@craftjs/core';
import { ROOT_NODE } from '@craftjs/utils';
import { Icon } from '@iconify/react';
import React, { useEffect, useRef, useCallback } from 'react';
import ReactDOM from 'react-dom';
import { Box, IconButton, Sheet, Stack, Typography } from '@mui/joy';
//re-resizable
import { Resizable } from 're-resizable';

//TYPES
export type BaseComponentProps = {
  children: React.ReactNode;
  isRoot?: boolean;
};

const BaseComponent: React.FC<BaseComponentProps> = ({ children, isRoot }) => {

}

/*====================
Toolbar
====================*/

//--ToolbarButton
const ToolbarButton: React.FC<{ icon: string; action: () => void }> = ({
  icon,
  action,
}) => {
  return (
    <IconButton
      size="sm"
      onClick={action}
      sx={{ color: 'white', backgroundColor: 'rgba(0,0,0,0.3)' }}
    >
      <Icon icon={icon} />
    </IconButton>
  );
};



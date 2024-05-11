/*
This Defines The Toolbar Item of the Layout Editor
- This is a draggable item that can be added to the layout that contains a 
  a configuration for the component that it represents.
*/

import React from "react";
import { Box, Button, Card, Divider, Grid, IconButton, Typography } from "@mui/joy";
import { Icon } from "@iconify/react";
//Draggable
import {useDraggable} from '@dnd-kit/core';
import {CSS} from '@dnd-kit/utilities';
import { atom } from 'jotai';

//INTERFACES


//TYPES
type Component = {
  
};

const DraggableToolbarItem = ({ component }) => {

  //PROPS
  const { 
    name,
    icon,
    
  } = component;

  //Draggable
  const {attributes, listeners, setNodeRef, transform} = useDraggable({
    id: 'unique-id',
  });
  const style = {
    transform: CSS.Translate.toString(transform),
  };
  
  return (
    <Card
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      sx={{
        p: 1,
        m: 1,
        width: "100%",
        textAlign: "center",
        cursor: "pointer",
        '&:hover': {
          backgroundColor: "primary.light",
        }
      }}
    >
      <Grid container direction="column" alignItems="center">
        <Grid
          sx={{
            p: 1,
            m: 1,
            width: "100%",
            textAlign: "center",
          }}
        >
          <Icon icon={component.icon} width={35} height={35} />
        </Grid>
        <Grid>
          <Divider />
          <Typography level="body-sm">{name}</Typography>
        </Grid>
      </Grid>
    </Card>
  );
};
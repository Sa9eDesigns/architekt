import React from "react";
import { Box, Card, Divider, Typography } from "@mui/joy";
import { Icon } from "@iconify/react";
// Draggable
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { CardContent } from "@mui/material";

// INTERFACES

interface ComponentProps {
  name: string;
  icon: string;
}

interface DraggableToolbarItemProps {
  component: ComponentProps;
}

const DraggableToolbarItem: React.FC<DraggableToolbarItemProps> = ({
  component,
}) => {
  // PROPS
  const { name, icon } = component;

  // Draggable
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: name, // Use a unique ID for each component
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
        "&:hover": {
          backgroundColor: "primary.light",
        },
      }}
    >
      <CardContent sx={{ p: 1 }}>
        <Icon icon={icon} width="30" height="30" />
        <Divider sx={{ my: 1 }} />
        <Typography level="title-md">{name}</Typography>
      </CardContent>
    </Card>
  );
};

export default DraggableToolbarItem;

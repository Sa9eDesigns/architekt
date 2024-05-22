import React from "react";
import { Box, Card, CardContent } from "@mui/material";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

interface DraggableContainerProps {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
  static?: boolean;
  onClick?: (event: any) => void;
  children: React.ReactNode;
}

const DraggableContainer: React.FC<DraggableContainerProps> = ({
  id,
  x,
  y,
  w,
  h,
  static: isStatic = false,
  onClick,
  children,
}) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id,
    });

  const style = {
    transform: CSS.Translate.toString(transform),
    width: `${w * 100}px`,
    height: `${h * 30}px`,
    opacity: isDragging ? 0.5 : 1,
    cursor: isStatic ? "default" : "pointer",
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
        "&:hover": {
          backgroundColor: isStatic ? "inherit" : "primary.light",
        },
      }}
      onClick={onClick}
    >
      <CardContent sx={{ p: 1 }}>{children}</CardContent>
    </Card>
  );
};

export default DraggableContainer;

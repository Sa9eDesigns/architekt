import React from "react";
import { Icon } from "@iconify/react";
import { Card, CardContent, Divider, Typography } from "@mui/joy";
import { v4 } from "uuid";

interface DraggableComponentItemProps {
  name: string;
  icon: string;
  ref: React.RefObject<HTMLDivElement>;
  elementToRender: React.ReactNode;
}

const DraggableComponentItem: React.FC<DraggableComponentItemProps> = ({
  name,
  icon,
  ref,
  elementToRender,
}) => {
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    // Set the data transfer to the element to render's ID or other identifier
    e.dataTransfer.setData("text/plain", JSON.stringify(elementToRender));
  };

  return (
    <div
      draggable={true}
      unselectable="on"
      // this is a hack for firefox
      // Firefox requires some kind of initialization
      // which we can do by adding this attribute
      // @see https://bugzilla.mozilla.org/show_bug.cgi?id=568313
      onDragStart={handleDragStart}
      // set the grid data for react-grid-layout
      data-grid = {{
        id: v4(),
        x: 0,
        y: 0,
        w: 2,
        h: 2,
        static: false,
        //Component Element configuration
        componentElement: elementToRender
      }}
      //set the data for the element to render
      data-element-component = {{
        name: name,
        icon: icon,
        component: JSON.stringify(elementToRender),
      }}
    >
      <Card
        ref={ref}
        sx={{
          width: "98%",
          height: "100px",
          padding: 0.5,
          textAlign: "center",
          cursor: "pointer",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          transition: "background-color 0.2s",
          "&:hover": {
            backgroundColor: "primary.light",
          },
        }}
      >
        <CardContent
          sx={{
            p: 0.3,
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Icon icon={icon} width={24} height={24} />
          <Divider sx={{ my: 1 }} />
          <Typography level="body-xs">{name}</Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default DraggableComponentItem;

//export default ToolbarItem;

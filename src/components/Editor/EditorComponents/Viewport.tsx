/*
  This file contains the Viewport component which is the main component of the Editor.
  It is responsible for rendering the selected component and its children in the canvas.
  --uses the useNode and useEditor hooks from the @craftjs/core package
  --it is the main canvas component
*/

import React from "react";
import { useNode, useEditor, Frame, Element } from "@craftjs/core";
import { Box } from "@mui/joy";
import FrameContainer from "./FrameContainer";

// Viewport Component
const Viewport: React.FC = () => {
  const { query } = useEditor();
  const { id, related } = useNode((node) => ({
    id: node.id,
    related: node.related,
  }));

  return (
    <Box sx={{ position: "relative", width: "100%", height: "100%" }}>
      <Frame>
        <Element
          canvas
          is={FrameContainer}
          custom={{ displayName: "App" }}
          children={[]}
        />
      </Frame>
    </Box>
  );
};

export default Viewport;
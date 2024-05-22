/* Renders the tool options for the PDF Genius tool */
import React from "react";
import { Box, Typography, IconButton, Button } from "@mui/joy";
import { Icon } from "@iconify/react";
//craft-js
import { useEditor } from "@craftjs/core";

const ToolOptions = () => {
  //CONSTANTS

  //STATES

  //HANDLERS

  //CRAFTJS
  const { actions, selected } = useEditor((state, query) => {

    const [currentNodeId] = state.events.selected;
    let selected;

    if (currentNodeId) {
      selected = {
        id: currentNodeId,
        name: state.nodes[currentNodeId].data.name,
        settings:
          state.nodes[currentNodeId].related &&
          state.nodes[currentNodeId].related.settings,
        isDeletable: query.node(currentNodeId).isDeletable(),

      };
    }

    return {
      selected,
    };
  });

  //EFFECTS

  //RENDER
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
        width: "100%",
        height: "100%",
        overflow: "hidden",
        padding: "0px",
      }}
    >

    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        flex: 0.5,
        width: "100%",
        height: "100%",
        overflow: "auto",
        padding: "10px",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: "1px solid #ccc",
      }}
    >
      <Typography
        level="title-lg"
        sx={{
          fontWeight: "bold",
        }}
      >
        {
          selected && selected.name
          ?
          selected.name
          :
          "Select an element"
        }
      </Typography>

      <Box 
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
          alignItems: "center",
          flex: 1,
          width: "100%",
          height: "100%",
          overflow: "hidden",
        }}
      >
        {
          selected && selected.isDeletable
          ?
          <Button
            onClick={() => actions.delete(selected.id)}
            size="small"
            sx={{ color: "error.main" }}
          >
            <Icon icon="bi:trash" width="21" height="21" />
          </Button>
          :
          null
        }
      </Box>

    </Box>
      
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        flex: 11,
        width: "100%",
        height: "100%",
        overflow: "auto",
        padding: "0px",
      }}
    >
      {
        selected && selected.settings && (
          React.createElement(selected.settings)
        )
      }
    </Box>
      
    </Box>
  );
}

//Export
export default ToolOptions;

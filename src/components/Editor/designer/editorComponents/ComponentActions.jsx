import React, { useContext } from "react";
import { Icon } from "@iconify/react";
import { useEditor } from "@craftjs/core";
import { Box, ButtonGroup, IconButton } from "@mui/joy";
import { EditorContext } from "../context/EditorContext";

/* COMPONENT ACTIONS */
export const ComponentActions = ({onSelectParent}) => {
  //CONSTANTS
  //CONTEXT
  const { sidebarOpen, currentTab, handleSidebarVisibility, handleCurrentTab } = useContext(EditorContext);

  //CRAFT-JS
  const { actions, selected } = useEditor((state, query) => {
    const [currentNodeId] = state.events.selected;
    let selected;

    if (currentNodeId) {
      selected = {
        id: currentNodeId,
        name: state.nodes[currentNodeId].data.name,
        settings: state.nodes[currentNodeId].related &&
          state.nodes[currentNodeId].related.settings,
        isDeletable: query.node(currentNodeId).isDeletable(),
      };
    }

    return {
      selected,
    };
  });

  //HANDLERS
  //--open settings
  const handleSettings = () => {
    handleCurrentTab("element_options");
    handleSidebarVisibility(true);
  };
  //--open info
  const handleInfo = () => {
    handleCurrentTab("element_info");
    handleSidebarVisibility(true);
  };
  //--delete component
  const handleDelete = () => {
    actions.delete(selected.id);
  };

  //EFFECTS
  //RENDER
  return (
    <ButtonGroup aria-label="outlined primary button group" variant="soft" size="sm">
        <IconButton aria-label="settings"
         onClick={(e) => {
          e.preventDefault();
          handleSettings()}
          }>
          <Icon icon="eva:settings-2-outline" height={20} width={20} />
        </IconButton>

        <IconButton aria-label="info" onClick={() => handleInfo()}>
          <Icon icon="eva:info-outline" height={20} width={20} />
        </IconButton>

        <IconButton
          aria-label="delete"
          onClick={(e) => {
            //Prevent mouse event from bubbling up to the parent
            e.preventDefault();
            handleDelete();
          }}
        >
          <Icon
            icon="material-symbols:cancel"
            width={20}
            height={20}
            color="danger" />
        </IconButton>
      </ButtonGroup>
  );
};

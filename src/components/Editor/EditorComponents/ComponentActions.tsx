"use client";

import React, { useContext, useCallback, useState } from "react";
import { Icon } from "@iconify/react";
import { useEditor, useNode } from "@craftjs/core";
import {
  Box,
  ButtonGroup,
  IconButton,
  Modal,
  Typography,
  Button,
} from "@mui/joy";
import { EditorContext } from "../Context/EditorContext";
import { useBaseComponent } from "../BaseComponent";

interface ComponentActionsProps {
  onSelectParent?: () => void;
  customActions?: React.ReactNode;
}

/* COMPONENT ACTIONS */
export const ComponentActions: React.FC<ComponentActionsProps> = ({
  onSelectParent,
  customActions,
}) => {
  const { currentTab, handleCurrentTab } = useContext(EditorContext);
  const { isSelected } = useBaseComponent();

  const { actions, query, selected, canUndo, canRedo } = useEditor(
    (state, query) => {
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
        canUndo: state.options.enabled && query.history.canUndo(),
        canRedo: state.options.enabled && query.history.canRedo(),
      };
    }
  );

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const handleSettings = useCallback(() => {
    handleCurrentTab("element_options");
  }, [handleCurrentTab]);

  const handleInfo = useCallback(() => {
    handleCurrentTab("element_info");
  }, [handleCurrentTab]);

  const handleDelete = useCallback(() => {
    if (selected?.id) {
      actions.delete(selected.id);
    }
    setDeleteModalOpen(false);
  }, [actions, selected]);

  const handleUndo = useCallback(() => {
    actions.history.undo();
  }, [actions]);

  const handleRedo = useCallback(() => {
    actions.history.redo();
  }, [actions]);

  const handleCopy = useCallback(() => {
    if (selected?.id) {
      // First we need to select the node
      actions.selectNode(selected.id);
      // Then we query the node to get the node data
      const node = query.node(selected.id);
      // Then we copy the node to the clipboard
      window.navigator.clipboard.writeText(
        JSON.stringify(node.toSerializedNode())
      );
    }
  }, [actions, selected]);

  const handlePaste = useCallback(() => {
    // First we need to get the data from the clipboard
    window.navigator.clipboard.readText().then((data) => {
      // Then we parse the data to a JSON object
      const parsedData = JSON.parse(data);
      // Then we add the node to the editor
      actions.add(parsedData);
    });
  }, [actions]);

  if (!isSelected) {
    return null;
  }

  return (
    <Box>
      <ButtonGroup aria-label="component actions" variant="soft" size="sm">
        <IconButton
          aria-label="settings"
          onClick={(e) => {
            e.preventDefault();
            handleSettings();
          }}
        >
          <Icon icon="eva:settings-2-outline" height={20} width={20} />
        </IconButton>

        <IconButton aria-label="info" onClick={handleInfo}>
          <Icon icon="eva:info-outline" height={20} width={20} />
        </IconButton>

        <IconButton aria-label="copy" onClick={handleCopy}>
          <Icon icon="mdi:content-copy" height={20} width={20} />
        </IconButton>

        <IconButton aria-label="paste" onClick={handlePaste}>
          <Icon icon="mdi:content-paste" height={20} width={20} />
        </IconButton>

        <IconButton aria-label="undo" onClick={handleUndo} disabled={!canUndo}>
          <Icon icon="mdi:undo" height={20} width={20} />
        </IconButton>

        <IconButton aria-label="redo" onClick={handleRedo} disabled={!canRedo}>
          <Icon icon="mdi:redo" height={20} width={20} />
        </IconButton>

        <IconButton
          aria-label="delete"
          onClick={(e) => {
            e.preventDefault();
            setDeleteModalOpen(true);
          }}
        >
          <Icon
            icon="material-symbols:cancel"
            width={20}
            height={20}
            color="danger"
          />
        </IconButton>

        {customActions}
      </ButtonGroup>

      <Modal open={deleteModalOpen} onClose={() => setDeleteModalOpen(false)}>
        <Box sx={{ padding: 2, backgroundColor: "white", borderRadius: 1 }}>
          <Typography level="title-md">Confirm Deletion</Typography>
          <Typography level="body-sm" sx={{ marginTop: 1 }}>
            Are you sure you want to delete this component?
          </Typography>
          <Box
            sx={{ display: "flex", justifyContent: "flex-end", marginTop: 2 }}
          >
            <Button
              variant="outlined"
              onClick={() => setDeleteModalOpen(false)}
              sx={{ marginRight: 1 }}
            >
              Cancel
            </Button>
            <Button variant="soft" color="danger" onClick={handleDelete}>
              Delete
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

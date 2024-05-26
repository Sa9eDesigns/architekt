"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  ReactNode,
} from "react";
import { useNode, useEditor } from "@craftjs/core";
import { Box, Menu, MenuItem, IconButton, Typography } from "@mui/joy";
import { Icon } from "@iconify/react";
import { Rnd } from "react-rnd";

interface BaseComponentProps {
  children: ReactNode;
  custom?: object;
}

interface BaseComponentContextProps {
  isSelected: boolean;
  isHovered: boolean;
  connectors: {
    connect: (el: HTMLElement) => void;
    drag: (el: HTMLElement) => void;
  };
}

const defaultContextValue: BaseComponentContextProps = {
  isSelected: false,
  isHovered: false,
  connectors: {
    connect: () => {},
    drag: () => {},
  },
};

const BaseComponentContext =
  createContext<BaseComponentContextProps>(defaultContextValue);

export const useBaseComponent = () => useContext(BaseComponentContext);

export const BaseComponent: React.FC<BaseComponentProps> = ({
  children,
  custom,
}) => {
  const { id } = useNode((node) => node.id);
  const { actions, query, isActive } = useEditor((_, query) => ({
    isActive: query.getEvent("selected").contains(id),
  }));

  const {
    isHover,
    dom,
    connectors: { connect, drag },
  } = useNode((node) => ({
    isHover: node.events.hovered,
    dom: node.dom,
    connectors: node.connectors,
  }));

  const contextValue = {
    isSelected: isActive,
    isHovered: isHover,
    connectors: { connect, drag },
  };

  const [contextMenu, setContextMenu] = useState<{
    mouseX: number;
    mouseY: number;
  } | null>(null);

  const handleContextMenu = (event: React.MouseEvent) => {
    event.preventDefault();
    setContextMenu(
      contextMenu === null
        ? {
            mouseX: event.clientX - 2,
            mouseY: event.clientY - 4,
          }
        : null
    );
  };

  const handleClose = () => {
    setContextMenu(null);
  };

  const handleCopy = () => {
    actions.history.copy(id);
    handleClose();
  };

  const handlePaste = () => {
    actions.history.paste();
    handleClose();
  };

  const handleDelete = () => {
    actions.delete(id);
    handleClose();
  };

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (isActive) {
        switch (event.key) {
          case "Delete":
            handleDelete();
            break;
          case "c":
            if (event.ctrlKey || event.metaKey) {
              handleCopy();
            }
            break;
          case "v":
            if (event.ctrlKey || event.metaKey) {
              handlePaste();
            }
            break;
          default:
            break;
        }
      }
    },
    [isActive, handleCopy, handleDelete, handlePaste]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <BaseComponentContext.Provider value={contextValue}>
      <Rnd
        default={{
          x: 0,
          y: 0,
          width: 320,
          height: 200,
        }}
        bounds="parent"
      >
        <Box
          ref={(ref) => ref && connect(drag(ref))}
          sx={{
            position: "relative",
            width: "100%",
            height: "100%",
            border: isActive
              ? "2px solid #3b82f6"
              : isHover
              ? "2px dashed #3b82f6"
              : "none",
            boxSizing: "border-box",
          }}
          onContextMenu={handleContextMenu}
        >
          {isActive && (
            <IconButton
              aria-label="delete"
              onClick={handleDelete}
              sx={{ position: "absolute", top: 0, right: 0 }}
            >
              <Icon icon="mdi:close" />
            </IconButton>
          )}
          {children}
          <Menu
            open={contextMenu !== null}
            onClose={handleClose}
            anchorReference="anchorPosition"
            anchorPosition={
              contextMenu !== null
                ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
                : undefined
            }
          >
            <MenuItem onClick={handleCopy}>
              <Icon icon="mdi:content-copy" />
              <Typography sx={{ ml: 1 }}>Copy</Typography>
            </MenuItem>
            <MenuItem onClick={handlePaste}>
              <Icon icon="mdi:content-paste" />
              <Typography sx={{ ml: 1 }}>Paste</Typography>
            </MenuItem>
            <MenuItem onClick={handleDelete}>
              <Icon icon="mdi:delete" />
              <Typography sx={{ ml: 1 }}>Delete</Typography>
            </MenuItem>
          </Menu>
        </Box>
      </Rnd>
    </BaseComponentContext.Provider>
  );
};

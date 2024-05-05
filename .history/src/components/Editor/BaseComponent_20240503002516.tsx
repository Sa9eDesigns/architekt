import React, { useRef, useCallback, useEffect } from "react";
import { useNode, useEditor } from "@craftjs/core";
import { ROOT_NODE } from "@craftjs/utils";
import { Icon } from "@iconify/react";
import ReactDOM from "react-dom";
import {
  Box,
  IconButton,
  Sheet,
  Stack,
  Typography,
  Menu,
  MenuItem,
  MenuButton,
  MenuList,
  Button,
  Divider,
  ButtonGroup,
} from "@mui/joy";
//a hooks
import { useUpdateEffect, useClickAway } from "ahooks";

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
      sx={{ color: "white", backgroundColor: "rgba(0,0,0,0.3)" }}
    >
      <Icon icon={icon} />
    </IconButton>
  );
};

//--Toolbar
/*This is the toolbar that is displayed on the component when it is selected
- It contains buttons for dnd, duplicate, delete, and edit actions
*/
const Toolbar: React.FC<{ actions: { [key: string]: () => void } }> = ({
  actions,
}) => {
  return (
    <Box
      sx={{
        position: "absolute",
        top: -10,
        right: -10,
        display: "flex",
        gap: 1,
        zIndex: 1,
      }}
    >
      {Object.entries(actions).map(([name, action]) => (
        <ToolbarButton key={name} icon={name} action={action} />
      ))}
    </Box>
  );
};

/*====================
ContextMenu
====================*/

//--ContextMenu
/*This is the context menu that is displayed on the component when it is right-clicked
- It contains buttons for dnd, duplicate, delete, and edit actions
*/
const ContextMenu: React.FC<{ actions: { [key: string]: () => void } }> = ({
  actions,
}) => {
  return (
    <Menu>
      <MenuButton>
        <IconButton size="sm" sx={{ color: "white" }}>
          <Icon icon="eva:more-vertical-fill" />
        </IconButton>
      </MenuButton>
      <MenuList>
        {Object.entries(actions).map(([name, action]) => (
          <MenuItem key={name} onClick={action}>
            {name}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

/*====================
BaseComponent
====================*/

//--BaseComponent
/*
This is the base component used for creating the editor components.
- It is the render component for all the editor components
- it uses the useNode hook from craftjs to get the node of the component
- it has a toolbar for dnd, delete, and edit actions
- it has a context menu for the component

Toolbar Actions:
- Drag: Used to drag the component
- Duplicate: Used to duplicate the component
- Delete: Used to delete the component
- Edit: Used to edit the component

ContextMenu Actions:
- Drag: Used to drag the component
- Duplicate: Used to duplicate the component
- Delete: Used to delete the component
- Edit: Used to edit the component
*/

type BaseComponentProps = {
  children: React.ReactNode;
};

export const RenderNode = ({ render }) => {
  const { id } = useNode();
  const { actions, query, isActive } = useEditor((_, query) => ({
    isActive: query.getEvent("selected").contains(id),
  }));

  const {
    isHover,
    dom,
    name,
    moveable,
    deletable,
    connectors: { drag },
    parent,
  } = useNode((node) => ({
    isHover: node.events.hovered,
    dom: node.dom,
    name: node.data.custom.displayName || node.data.displayName,
    moveable: query.node(node.id).isDraggable(),
    deletable: query.node(node.id).isDeletable(),
    parent: node.data.parent,
    props: node.data.props,
  }));

  const currentRef = useRef<HTMLDivElement>();

  useEffect(() => {
    if (dom) {
      if (isActive || isHover) dom.classList.add("component-selected");
      else dom.classList.remove("component-selected");
    }
  }, [dom, isActive, isHover]);

  const getPos = useCallback((dom: HTMLElement) => {
    const { top, left, bottom } = dom
      ? dom.getBoundingClientRect()
      : { top: 0, left: 0, bottom: 0 };
    return {
      top: `${top > 0 ? top : bottom}px`,
      left: `${left}px`,
    };
  }, []);

  const scroll = useCallback(() => {
    const { current: currentDOM } = currentRef;

    if (!currentDOM) return;
    const { top, left } = getPos(dom);
    currentDOM.style.top = top;
    currentDOM.style.left = left;
  }, [dom, getPos]);

  useEffect(() => {
    document
      .querySelector(".craftjs-renderer")
      .addEventListener("scroll", scroll);

    return () => {
      document
        .querySelector(".craftjs-renderer")
        .removeEventListener("scroll", scroll);
    };
  }, [scroll]);

  return (
    <>
      {isHover || isActive
        ? ReactDOM.createPortal(
            <Box
              ref={currentRef}
              sx={{
                position: "absolute",
                zIndex: 2,
                display: "flex",
                alignItems: "center",
                gap: 1,
                padding: 1,
                backgroundColor: "rgba(0,0,0,0.8)",
                borderRadius: 4,
                color: "white",
              }}
            >
              <Typography level="body-sm">{name}</Typography>
              <Divider orientation="vertical" />
              <ButtonGroup size="sm">
                {moveable && (
                  <IconButton size="sm" ref={drag}>
                    <Icon icon="eva:move-outline" />
                  </IconButton>
                )}
                {deletable && (
                  <IconButton
                    size="sm"
                    onClick={() => actions.delete(id)}
                    sx={{ color: "red" }}
                  >
                    <Icon icon="eva:trash-2-outline" />
                  </IconButton>
                )}
              </ButtonGroup>
            </Box>,
            document.body
          )
        : null}
      {render}
    </>
  );
};

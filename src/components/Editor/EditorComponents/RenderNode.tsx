'use client';

import { useNode, useEditor } from "@craftjs/core";
import React, { useEffect, useRef, useCallback, FC, useMemo } from "react";
import { ComponentActions } from "./ComponentActions";
import { Box, Stack, Typography } from "@mui/joy";
import { Icon } from "@iconify/react";

interface RenderNodeProps {
  render: React.ReactNode;
}

export const RenderNode: FC<RenderNodeProps> = ({ render }) => {
  const { id } = useNode((node) => node.id);
  const { isActive, actions, query } = useEditor((_, query) => ({
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

  const currentRef = useRef<HTMLDivElement>(null);

  // Add/Remove selected class to/from the node
  useEffect(() => {
    if (dom) {
      dom.classList.toggle("component-selected", isActive || isHover);
    }
  }, [dom, isActive, isHover]);

  // Get the position of the node
  const getPos = useCallback((dom: HTMLElement | null) => {
    const { top, left, bottom } = dom
      ? dom.getBoundingClientRect()
      : { top: 0, left: 0, bottom: 0 };
    return {
      top: `${top > 0 ? top : bottom}px`,
      left: `${left}px`,
    };
  }, []);

  // Scroll the node into view
  const scroll = useCallback(() => {
    const currentDOM = currentRef.current;
    if (!currentDOM) return;
    const { top, left } = getPos(dom);
    currentDOM.style.top = top;
    currentDOM.style.left = left;
  }, [dom, getPos]);

  useEffect(() => {
    const renderer = document.querySelector(".craftjs-renderer");
    renderer?.addEventListener("scroll", scroll);

    return () => {
      renderer?.removeEventListener("scroll", scroll);
    };
  }, [scroll]);

  // Selected Node Renderer
  const OnNodeSelected: FC = useMemo(
    () => () =>
      (
        <Stack
          direction={"row"}
          alignItems={"center"}
          spacing={1}
          sx={{
            position: "absolute",
            top: "-40px",
            right: "10px",
            zIndex: 9999,
            borderRadius: "5px",
            padding: "5px",
            display: "flex",
            alignItems: "center",
            backgroundColor: "rgba(255,255,255,0.9)",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          }}
        >
          <Typography
            level="title-sm"
            sx={{
              padding: "5px",
              borderRadius: "5px",
              backgroundColor: "rgba(255,255,255,0.8)",
              color: "#000",
              fontWeight: "bold",
              fontSize: "12px",
            }}
          >
            {name}
          </Typography>
          <ComponentActions />
        </Stack>
      ),
    [name]
  );

  // Hovered Node Renderer
  const OnNodeHovered: FC = useMemo(
    () => () =>
      (
        <Stack
          direction={"row"}
          alignItems={"center"}
          spacing={1}
          sx={{
            position: "absolute",
            top: "-40px",
            right: "10px",
            zIndex: 9999,
            borderRadius: "5px",
            padding: "5px",
            display: "flex",
            alignItems: "center",
            backgroundColor: "rgba(255,255,255,0.9)",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          }}
        >
          <Icon icon="fluent:arrow-move-20-regular" color="#000"  width={30} height={30} />
          <Typography
            level="title-sm"
            sx={{
              padding: "5px",
              borderRadius: "5px",
              backgroundColor: "rgba(255,255,255,0.8)",
              color: "#000",
              fontWeight: "bold",
              fontSize: "12px",
            }}
          >
            {name}
          </Typography>
        </Stack>
      ),
    [name]
  );

  return (
    <Box
      ref={currentRef}
      sx={{
        cursor: moveable ? "move" : "default",
        position: "relative",
        zIndex: isActive || isHover ? 100 : "auto",
        border: isActive
          ? "1px solid rgb(179,77,77)"
          : isHover
          ? "1px dashed rgba(179,77,77,0.3)"
          : "none",
      }}
    >
      {isActive && <OnNodeSelected />}
      {isHover && !isActive && <OnNodeHovered />}
      {render}
    </Box>
  );
};

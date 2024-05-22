/* 
  This is a CraftJS component for the that allows the user to add and edit 
  using a custom rich text editor.
*/

import React, { memo, useEffect, useMemo } from "react";
//import sanitizeHtml from "sanitize-html";
//craft-js
import { useNode } from "@craftjs/core";
import { motion } from "framer-motion";
/*SETTINGS PANEL*/
import { ComponentActions } from "./ComponentActions";
import { Textarea } from "@mui/joy";
import { ComponentSettings } from "./ComponentSettings";
import ContentEditable from "react-contenteditable";

/* EDITOR COMPONENT */
const Text = ({
  content,
  //elementProps
  id,
  classes,
  //Styling Props
  layout,
  size,
  spacing,
  position,
  borders,
  background,
  effects,
  typography,
  states,
  //Actions
  onAction,
  onEvent,
}) => {
  //CONSTANTS
  const {
    connectors: { connect, drag },
    actions: { setProp },
    hasSelectedNode,
    hasDraggedNode,
  } = useNode((state) => ({
    hasSelectedNode: state.events.selected,
    hasDraggedNode: state.events.dragged,

  }));

  return (
    //This is the layout container for the text component
    <div
      ref={(ref) => connect(drag(ref))}
      className={classes}
      style={{
        display: layout.display,
        flexDirection: layout.flexDirection,
        justifyContent: layout.justifyContent,
        alignItems: layout.alignItems,
        width: size.width,
        height: size.height,
        margin: spacing.margin,
        padding: spacing.padding,
        position: position.position,
        top: position.top,
        right: position.right,
        bottom: position.bottom,
        left: position.left,
        border: borders.border,
        borderRadius: borders.borderRadius,
        backgroundColor: background.bgcolor,
        color: background.color,
      }}
    >
      <ContentEditable
        html={content}
        onChange={(e) => setProp((prop) => (prop.content = e.target.value))}
        tagName="p"
        style={{
          fontSize: typography.fontSize,
          fontWeight: typography.fontWeight,
          lineHeight: typography.lineHeight,
          letterSpacing: typography.letterSpacing,
          textAlign: typography.textAlign,
        }}
      />
    </div>
    
  );
};

//CONTENT FIELD
export const ContentField = ({ content, onContentChange }) => {
  //EFFECTS
  useEffect(() => {
    onContentChange(content);
  }, [content]);

  return (
    <Textarea
      id="content"
      name="content"
      label="Content"
      value={content}
      onChange={(e) => onContentChange(e.target.value)}
      placeholder="Type something"
      size="md"
      minRows={5}
      sx={{
        "& input": {
          padding: "5px 7px",
          fontSize: "14px",
        },
      }}
    />
  );
};

//COMPONENT UNIQUE SETTINGS
const TextSettings = () => {
  const {
    actions: { setProp },
    content,
  } = useNode((node) => ({
    content: node.data.props.content,
  }));

  //HANDLERS
  const handleContentChange = (content) => {
    setProp((prop) => (prop.content = content));
  };

  return (
    <ContentField content={content} onContentChange={handleContentChange} />
  );
};

//EDITOR SETTINGS
Text.craft = {
  details: {
    name: "Text",
    description: "Text",
    image: "https://img.icons8.com/ios/452/text.png",
  },
  props: {
    content: "Type something",
    //elementProps
    classes: "text-component",
    //Styling Props
    layout: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
      alignItems: "flex-start",
    },
    size: {
      width: "auto",
      height: "auto",
    },
    spacing: {
      margin: "0px",
      padding: "0px",
    },
    position: {
      position: "relative",
      top: "auto",
      right: "auto",
      bottom: "auto",
      left: "auto",
    },
    borders: {
      border: "none",
      borderRadius: "0px",
    },
    background: {
      bgcolor: "transparent",
      color: "black",
    },
    effects: {
      boxShadow: "none",
    },
    typography: {
      fontSize: "16",
      fontWeight: "normal",
      lineHeight: "1.5",
      letterSpacing: "0",
      textAlign: "left",
    },
    states: {
      hover: {
        color: "black",
        bgcolor: "transparent",
        border: "none",
        boxShadow: "none",
      },
      focus: {
        color: "black",
        bgcolor: "transparent",
        border: "none",
        boxShadow: "none",
      },
      active: {
        color: "black",
        bgcolor: "transparent",
        border: "none",
        boxShadow: "none",
      },
    },
  },
  custom: {
    settings: TextSettings,
  },
  rules: {
    canDrag: (node) => node.data.props.text != "Drag",
    //can be moved in and out of the layout/flex container
    canMoveIn: (node) => true,
    canMoveOut: (node) => true,
  },
  related: {
    settings: ComponentSettings,
  },
};

export default Text;

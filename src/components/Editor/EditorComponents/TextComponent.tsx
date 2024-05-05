'use client'
/*
This Defines the Editor Text Module
The Editor Text Module is responsible for managing the text component. 
*/

import React from 'react';
import { useNode } from '@craftjs/core';

const TextComponentConfig = {
  id: "text",
  name: "Text",
  description: "This component allows you to add text to your page.",
  preview: <div>Text</div>,
  settings:[
    {
      id: "element-settings",
      name: "element-settings",
      icon: "material-symbols:subject",
      fields: [
        //tagType, content, id, className
        {
          name: "tagType",
          label: "Tag Type",
          type: "select",
          defaultValue: "h1",
          options: [
            { value: "h1", label: "H1" },
            { value: "h2", label: "H2" },
            { value: "h3", label: "H3" },
            { value: "h4", label: "H4" },
            { value: "h5", label: "H5" },
            { value: "h6", label: "H6" },
            { value: "p", label: "P" },
            { value: "span", label: "Span" },
            { value: "div", label: "Div" },
          ]
        },
        {
          name: "content",
          label: "Content",
          type: "textarea",
          defaultValue: "Hello World",
        },
        {
          name: "id",
          label: "ID",
          type: "text",
          defaultValue: "text",
        },
        {
          name: "className",
          label: "Class Name",
          type: "text",
          defaultValue: "text",
        } 
      ]
    },
    {
      id: "style-settings",
      name: "style-settings",
      icon: "carbon:paint-brush",
      fields: [
        //All Typography Related Fields
        {
          name: "color",
          label: "Color",
          type: "color",
          defaultValue: "#000000",
          format: "hex",
        },
        {
          name: "fontSize",
          label: "Font Size",
          type: "text",
          defaultValue: "16px",
        },
        {
          name: "fontFamily",
          label: "Font Family",
          type: "select",
          defaultValue: "Arial",
          options: [
            //Only Default Fonts
            { value: "Arial", label: "Arial" },
            { value: "Arial Black", label: "Arial Black" },
            { value: "Comic Sans MS", label: "Comic Sans MS" },
            { value: "Courier New", label: "Courier New" },
            { value: "Georgia", label: "Georgia" },
            { value: "Impact", label: "Impact" },
            { value: "Lucida Console", label: "Lucida Console" },
            { value: "Lucida Sans Unicode", label: "Lucida Sans Unicode" },
            { value: "Palatino Linotype", label: "Palatino Linotype" },
            { value: "Tahoma", label: "Tahoma" },
            { value: "Times New Roman", label: "Times New Roman" },
            { value: "Trebuchet MS", label: "Trebuchet MS" },
            { value: "Verdana", label: "Verdana" },
          ]
            
        },
        {
          name: "fontWeight",
          label: "Font Weight",
          type: "text",
          defaultValue: "normal",
        },
        {
          name: "fontStyle",
          label: "Font Style",
          type: "select",
          defaultValue: "normal",
          options: [
            { value: "normal", label: "Normal" },
            { value: "italic", label: "Italic" },
            { value: "oblique", label: "Oblique" },
          ]
        },
        {
          name: "textDecoration",
          label: "Text Decoration",
          type: "select",
          defaultValue: "none",
          options: [
            { value: "none", label: "None" },
            { value: "underline", label: "Underline" },
            { value: "overline", label: "Overline" },
            { value: "line-through", label: "Line Through" },
          ]
        },
        {
          name: "textAlign",
          label: "Text Align",
          type: "select",
          defaultValue: "left",
          options: [
            { value: "left", label: "Left" },
            { value: "center", label: "Center" },
            { value: "right", label: "Right" },
            { value: "justify", label: "Justify" },
          ]
        },
        {
          name: "lineHeight",
          label: "Line Height",
          type: "number",
          defaultValue: "1.5",
          inputProps: {
            step: 0.1,
            min: 0.1,
          },
        },
        {
          name: "letterSpacing",
          label: "Letter Spacing",
          type: "text",
          defaultValue: "0px",
        },
      ]
    },
    {
      id: "spacing-settings",
      name: "spacing-settings",
      icon: "bi:card-text",
      fields: [
        //All Spacing Related Fields
        {
          name: "padding",
          label: "Padding",
          type: "fourSided",
          defaultValue: {
            top: "0",
            right: "0",
            bottom: "0",
            left: "0",
          },
        },
        {
          name: "margin",
          label: "Margin",
          type: "fourSided",
          defaultValue: {
            top: "0",
            right: "0",
            bottom: "0",
            left: "0",
          },
        },
      ]
    },
    {
      id: "border-settings",
      name: "border-settings",
      icon: "bx:bxs-border",
      fields: [
        //All Border Related Fields
        {
          name: "border",
          label: "Border",
          type: "border",
          defaultValue: {
            style: "none",
            color: "#000000",
            width: "1px",
            radius: "0px",
          },
        },
      ]
    },
    {
      id: "extra-settings",
      name: "extra-settings",
      icon: "eva:options-2-outline",
      fields: [
        //All Extra Fields
        {
          name: "shadow",
          label: "Shadow",
          type: "shadow",
          defaultValue: {
            color: "rgba(0,0,0,0.12)",
            blur: "0px",
            horizontal: "0px",
            spread: "0px",
            vertical: "0px",
          },
        },
        {
          name: "position",
          label: "Position",
          type: "select",
          defaultValue: "static",
          options: [
            { value: "static", label: "Static" },
            { value: "relative", label: "Relative" },
            { value: "absolute", label: "Absolute" },
            { value: "fixed", label: "Fixed" },
            { value: "sticky", label: "Sticky" },
          ]
        },
        {
          name: "overflow",
          label: "Overflow",
          type: "select",
          defaultValue: "visible",
          options: [
            { value: "visible", label: "Visible" },
            { value: "hidden", label: "Hidden" },
            { value: "scroll", label: "Scroll" },
            { value: "auto", label: "Auto" },
          ]
        },
        {
          name: "display",
          label: "Display",
          type: "select",
          defaultValue: "block",
          options: [
            { value: "block", label: "Block" },
            { value: "inline", label: "Inline" },
            { value: "inline-block", label: "Inline Block" },
            { value: "flex", label: "Flex" },
            { value: "inline-flex", label: "Inline Flex" },
            { value: "grid", label: "Grid" },
            { value: "inline-grid", label: "Inline Grid" },
            { value: "table", label: "Table" },
            { value: "table-row", label: "Table Row" },
            { value: "table-cell", label: "Table Cell" },
          ]
        },
        {
          name: "zIndex",
          label: "Z-Index",
          type: "text",
          defaultValue: "0",
        },
      ]
    }
  ]
}

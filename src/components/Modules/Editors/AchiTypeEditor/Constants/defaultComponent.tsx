/* Defines the Component Composer List of Components */

import React from "react";
import { 
  
} from "@mui/material";
import { Icon } from "@iconify/react";

export interface ComponentCategory {
  id: string;
  name: string;
  icon: string;
  components: ComponentItem[];
};

export interface ComponentItem {
  id: string;
  name: string;
  icon: string;
  component: React.ReactNode;
  properties: any;
};

const AllCategories = [
  {
    id: "layoutComponents",
    name: "Layout Components",
    icon: "fluent:slide-layout-20-filled",
    components: [
      {
        id: "container",
        name: "Container",
        icon: "fluent:container-20-filled",
        properties:[
          {
            id: "props-styles",
            name: "Styles", 
            type: "array",
            value: [
              {
                id: "props-styles-layout",
                name: "Layout",
                fields: [
                  {
                    id: "props-styles-layout-display",
                    name: "Display",
                    type: "select",
                    value: "flex",
                    options: ["flex", "block", "grid"]
                  },
                  {
                    id: "props-styles-layout-flexDirection",
                    name: "Flex Direction",
                    type: "select",
                    value: "row",
                    options: ["row", "column", "row-reverse", "column-reverse"]
                  },
                  {
                    id: "props-styles-layout-flexWrap",
                    name: "Flex Wrap",
                    type: "select",
                    value: "wrap",
                    options: ["wrap", "nowrap", "wrap-reverse"]
                  },
                  {
                    id: "props-styles-layout-justifyContent",
                    name: "Justify Content",
                    type: "select",
                    value: "flex-start",
                    options: ["flex-start", "flex-end", "center", "space-between", "space-around", "space-evenly"]
                  },
                  {
                    id: "props-styles-layout-alignItems",
                    name: "Align Items",
                    type: "select",
                    value: "stretch",
                    options: ["stretch", "flex-start", "flex-end", "center", "baseline"]
                  },
                  {
                    id: "props-styles-layout-alignContent",
                    name: "Align Content",
                    type: "select",
                    value: "stretch",
                    options: ["stretch", "flex-start", "flex-end", "center", "space-between", "space-around"]
                  },
                  {
                    id: "props-styles-layout-gap",
                    name: "Gap",
                    type: "number",
                    value: 0
                  },
                ]
              },
              {
                id: "props-styles-spacing",
                name: "Spacing",
                fields: [
                  {
                    id: "props-styles-spacing-margin",
                    name: "Margin",
                    type: "array",
                    value: [
                      {
                        id: "props-styles-spacing-margin-top",
                        name: "Top",
                        type: "number",
                        value: 0
                      },
                      {
                        id: "props-styles-spacing-margin-right",
                        name: "Right",
                        type: "number",
                        value: 0
                      },
                      {
                        id: "props-styles-spacing-margin-bottom",
                        name: "Bottom",
                        type: "number",
                        value: 0
                      },
                      {
                        id: "props-styles-spacing-margin-left",
                        name: "Left",
                        type: "number",
                        value: 0
                      },
                    ]
                  },
                  {
                    id: "props-styles-spacing-padding",
                    name: "Padding",
                    type: "array",
                    value: [
                      {
                        id: "props-styles-spacing-padding-top",
                        name: "Top",
                        type: "number",
                        value: 0
                      },
                      {
                        id: "props-styles-spacing-padding-right",
                        name: "Right",
                        type: "number",
                        value: 0
                      },
                      {
                        id: "props-styles-spacing-padding-bottom",
                        name: "Bottom",
                        type: "number",
                        value: 0
                      },
                      {
                        id: "props-styles-spacing-padding-left",
                        name: "Left",
                        type: "number",
                        value: 0
                      },
                    ]
                  },
                ]
              },
              {
                id: "props-styles-typography",
                name: "Typography",
                fields: [
                  {
                    id: "props-styles-typography-fontFamily",
                    name: "Font Family",
                    type: "string",
                    value: "Arial"
                  },
                  {
                    id: "props-styles-typography-fontSize",
                    name: "Font Size",
                    type: "number",
                    value: 14
                  },
                  {
                    id: "props-styles-typography-fontWeight",
                    name: "Font Weight",
                    type: "select",
                    value: "normal",
                    options: ["normal", "bold", "bolder", "lighter"]
                  },
                  {
                    id: "props-styles-typography-fontStyle",
                    name: "Font Style",
                    type: "select",
                    value: "normal",
                    options: ["normal", "italic"]
                  },
                  {
                    id: "props-styles-typography-textAlign",
                    name: "Text Align",
                    type: "select",
                    value: "left",
                    options: ["left", "center", "right", "justify"]
                  },
                  {
                    id: "props-styles-typography-textTransform",
                    name: "Text Transform",
                    type: "select",
                    value: "none",
                    options: ["none", "uppercase", "lowercase", "capitalize"]
                  },
                  {
                    id: "props-styles-typography-textDecoration",
                    name: "Text Decoration",
                    type: "select",
                    value: "none",
                    options: ["none", "underline", "overline", "line-through", "blink"]
                  },
                  {
                    id: "props-styles-typography-lineHeight",
                    name: "Line Height",
                    type: "number",
                    value: 1.5
                  },
                ]
              },
              {
                id: "props-styles-border",
                name: "Border",
                fields: [
                  {
                    id: "props-styles-border-style",
                    name: "Style",
                    type: "select",
                    value: "none",
                    options: ["none", "solid", "dashed", "dotted", "double", "groove", "ridge", "inset", "outset"]
                  },
                  {
                    id: "props-styles-border-width",
                    name: "Width",
                    type: "array",
                    value: [
                      {
                        id: "props-styles-border-width-top",
                        name: "Top",
                        type: "number",
                        value: 0
                      },
                      {
                        id: "props-styles-border-width-right",
                        name: "Right",
                        type: "number",
                        value: 0
                      },
                      {
                        id: "props-styles-border-width-bottom",
                        name: "Bottom",
                        type: "number",
                        value: 0
                      },
                      {
                        id: "props-styles-border-width-left",
                        name: "Left",
                        type: "number",
                        value: 0
                      },
                    ]
                  },
                  {
                    id: "props-styles-border-color",
                    name: "Color",
                    type: "string",
                    value: "#000000"
                  },
                  {
                    id: "props-styles-border-radius",
                    name: "Radius",
                    type: "array",
                    value: [
                      {
                        id: "props-styles-border-radius-topLeft",
                        name: "Top Left",
                        type: "number",
                        value: 0
                      },
                      {
                        id: "props-styles-border-radius-topRight",
                        name: "Top Right",
                        type: "number",
                        value: 0
                      },
                      {
                        id: "props-styles-border-radius-bottomRight",
                        name: "Bottom Right",
                        type: "number",
                        value: 0
                      },
                      {
                        id: "props-styles-border-radius-bottomLeft",
                        name: "Bottom Left",
                        type: "number",
                        value: 0
                      },
                    ]
                  },

                ]
              },
              {
                id: "props-styles-background",
                name: "Background",
                fields: [
                  {
                    id: "props-styles-background-type",
                    name: "Type",
                    type: "select",
                    value: "color",
                    options: ["color", "gradient", "image"]
                  },
                  {
                    id: "props-styles-background-color",
                    name: "Color",
                    type: "string",
                    value: "#ffffff"
                  },
                  {
                    id: "props-styles-background-gradient",
                    name: "Gradient",
                    type: "array",
                    value: [
                      {
                        id: "props-styles-background-gradient-type",
                        name: "Type",
                        type: "select",
                        value: "linear",
                        options: ["linear", "radial"]
                      },
                      {
                        id: "props-styles-background-gradient-direction",
                        name: "Direction",
                        type: "select",
                        value: "to right",
                        options: ["to right", "to left", "to top", "to bottom"]
                      },
                      {
                        id: "props-styles-background-gradient-colors",
                        name: "Colors",
                        type: "array",
                        value: [
                          {
                            id: "props-styles-background-gradient-colors-0",
                            name: "Color 1",
                            type: "string",
                            value: "#ffffff"
                          },
                          {
                            id: "props-styles-background-gradient-colors-1",
                            name: "Color 2",
                            type: "string",
                            value: "#ffffff"
                          },
                        ]
                      },
                    ]
                  },
                  {
                    id: "props-styles-background-image",
                    name: "Image",
                    type: "string",
                    value: ""
                  },
                ]
              },
              {
                id: "props-styles-shadow",
                name: "Shadow",
                fields: [
                  {
                    id: "props-styles-shadow-type",
                    name: "Type",
                    type: "select",
                    value: "none",
                    options: ["none", "inner", "outline"]
                  },
                  {
                    id: "props-styles-shadow-color",
                    name: "Color",
                    type: "string",
                    value: "#000000"
                  },
                  {
                    id: "props-styles-shadow-offset",
                    name: "Offset",
                    type: "array",
                    value: [
                      {
                        id: "props-styles-shadow-offset-x",
                        name: "X",
                        type: "number",
                        value: 0
                      },
                      {
                        id: "props-styles-shadow-offset-y",
                        name: "Y",
                        type: "number",
                        value: 0
                      },
                    ]
                  },
                  {
                    id: "props-styles-shadow-blur",
                    name: "Blur",
                    type: "number",
                    value: 0
                  },
                  {
                    id: "props-styles-shadow-spread",
                    name: "Spread",
                    type: "number",
                    value: 0
                  },
                ]
              },
              {
                id: "props-styles-transform",
                name: "Transform",
                fields: [
                  {
                    id: "props-styles-transform-rotate",
                    name: "Rotate",
                    type: "number",
                    value: 0
                  },
                  {
                    id: "props-styles-transform-scale",
                    name: "Scale",
                    type: "array",
                    value: [
                      {
                        id: "props-styles-transform-scale-x",
                        name: "X",
                        type: "number",
                        value: 1
                      },
                      {
                        id: "props-styles-transform-scale-y",
                        name: "Y",
                        type: "number",
                        value: 1
                      },
                    ]
                  },
                  {
                    id: "props-styles-transform-translate",
                    name: "Translate",
                    type: "array",
                    value: [
                      {
                        id: "props-styles-transform-translate-x",
                        name: "X",
                        type: "number",
                        value: 0
                      },
                      {
                        id: "props-styles-transform-translate-y",
                        name: "Y",
                        type: "number",
                        value: 0
                      },
                    ]
                  },
                ]
              },
              {
                id: "props-styles-animation",
                name: "Animation",
                fields: [
                  {
                    id: "props-styles-animation-name",
                    name: "Name",
                    type: "string",
                    value: ""
                  },
                  {
                    id: "props-styles-animation-duration",
                    name: "Duration",
                    type: "number",
                    value: 0
                  },
                  {
                    id: "props-styles-animation-timingFunction",
                    name: "Timing Function",
                    type: "select",
                    value: "linear",
                    options: ["linear", "ease", "ease-in", "ease-out", "ease-in-out", "step-start", "step-end"]
                  },
                  {
                    id: "props-styles-animation-delay",
                    name: "Delay",
                    type: "number",
                    value: 0
                  },
                  {
                    id: "props-styles-animation-iterationCount",
                    name: "Iteration Count",
                    type: "number",
                    value: 1
                  },
                  {
                    id: "props-styles-animation-direction",
                    name: "Direction",
                    type: "select",
                    value: "normal",
                    options: ["normal", "reverse", "alternate", "alternate-reverse"]
                  },
                  {
                    id: "props-styles-animation-fillMode",
                    name: "Fill Mode",
                    type: "select",
                    value: "none",
                    options: ["none", "forwards", "backwards", "both"]
                  },
                  {
                    id: "props-styles-animation-playState",
                    name: "Play State",
                    type: "select",
                    value: "running",
                    options: ["running", "paused"]
                  },
                ]
              }
            ],
          },
        ]
      },
    ]
  }
];

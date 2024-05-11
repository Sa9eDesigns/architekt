import React, { createContext, useContext } from "react";
import { atom, useAtom } from "jotai";
import _ from "lodash";
import { LayoutProps } from "framer-motion";
import { MouseEvent } from "react";
import { Layout } from "react-grid-layout";


/*Editor Store*/
//--current React-Grid-Layout

//TYPES
//--CompactType: The CompactType is a type that defines the type of compacting that is done to the layout
export type CompactType = "vertical" | "horizontal";
//--ResizeHandleAxis: The ResizeHandleAxis is a type that defines the axis that the resize handle is on
export type ResizeHandleAxis =
  | "s"
  | "w"
  | "e"
  | "n"
  | "sw"
  | "nw"
  | "se"
  | "ne";
//--ItemCallback: The ItemCallback is a function that is called when a LayoutItem is interacted with
export type ItemCallback = (
  layout: Layout,
  oldItem: LayoutItemProps,
  newItem: LayoutItemProps,
  placeholder: LayoutItemProps,
  e: MouseEvent,
  element: HTMLElement
) => void;
//--DragOverEvent: The DragOverEvent is an event that is called when a drag event is happening
export type DragOverEvent = (
  e: Event
) => { w?: number; h?: number } | false | undefined;
//--Layout: The Layout is the main object that contains the LayoutItems


//--LayoutItem: When a Toolbar Item is dragged into the Layout, it is converted into a LayoutItem
export type LayoutItemProps = {
  /*react-grid-layout
   /--------------- */
  x: number;
  y: number;
  w: number;
  h: number;
  i: string;
  minW: number | undefined;
  maxW: number | undefined;
  minH: number | undefined;
  maxH: number | undefined;
  static: boolean;
  isDraggable: boolean | undefined;
  isResizable: boolean | undefined;
  /*Architype
   /--------------- */
  id: string; //id to identify the component without
  component: any; //component that is being rendered
  props: any; //Props for the component
  children: any; //Children for the component
  //--events for the component
  onClick: (event: any) => void; //run when the component is clicked
  onInfo: (event: any) => void; //returns the information of the component
  onEdit: (event: any) => void; //returns the editor of the component
  onDelete: (event: any) => void; //deletes the component
  onDuplicate: (event: any) => void; //duplicates the component
  onMove: (event: any) => void; //moves the component
  onResize: (event: any) => void; //resizes the component
};


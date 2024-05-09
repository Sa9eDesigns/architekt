import React from "react";

interface GridItemProps {
  // A string corresponding to the component key
  i: string;

  // These are all in grid units, not pixels
  x: number;
  y: number;
  w: number;
  h: number;
  minW: 0 | undefined;
  maxW: 0 | undefined;
  minH: 0 | undefined;
  maxH: 0 | undefined;

  // If true, equal to `isDraggable: false, isResizable: false`.
  static: boolean;
  // If false, will not be draggable. Overrides `static`.
  isDraggable: boolean;
  // If false, will not be resizable. Overrides `static`.
  isResizable: boolean;
  // By default, a handle is only shown on the bottom-right (southeast) corner.
  // As of RGL >= 1.4.0, resizing on any corner works just fine!
  resizeHandles?:
    | Array<"s" | "w" | "e" | "n" | "sw" | "nw" | "se" | "ne">
    | undefined;
  // If true and draggable, item will be moved only within grid.
  isBounded: boolean;

  //Child component to be rendered
  children: JSX.Element | JSX.Element[];

  //Functions
  onResizeStop?: (layout: any, oldItem: any, newItem: any) => void;
  onDragStart?: (layout: any, oldItem: any, newItem: any) => void;
  onDrag?: (layout: any, oldItem: any, newItem: any) => void;
  onDragStop?: (layout: any, oldItem: any, newItem: any) => void;
  onResizeStart?: (layout: any, oldItem: any, newItem: any) => void;
  onResize?: (layout: any, oldItem: any, newItem: any) => void;
}

const GridItem: React.FC<GridItemProps> = ({
  i,
  x,
  y,
  w,
  h,
  minW,
  maxW,
  minH,
  maxH,
  static: isStatic,
  isDraggable,
  isResizable,
  resizeHandles,
  isBounded,
  children,
}) => {
  return (
    <div
      key={i}
      className={isStatic ? "static" : ""}
      style={{
        position: "absolute",
        left: `${x}px`,
        top: `${y}px`,
        width: `${w}px`,
        height: `${h}px`,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: "flex",
          flexWrap: "wrap",
          alignContent: "flex-start",
          justifyContent: "space-around",
          alignItems: "center",
          padding: "0.5rem",
          boxSizing: "border-box",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default GridItem;

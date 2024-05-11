import React from "react";
import RGL, { WidthProvider } from "react-grid-layout";

const ReactGridLayout = WidthProvider(RGL);

interface DraggableContainerProps {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
  static?: boolean;
  children: JSX.Element[];
}

const NestedDraggableContainer: React.FC<DraggableContainerProps> = ({
  id,
  x,
  y,
  w,
  h,
  static: isStatic,
  children,
}) => {
  const layout = [
    {
      i: id,
      x,
      y,
      w,
      h,
      static: isStatic,
      minW: w,
      maxW: w,
      minH: h,
      maxH: h,
      staticGrid: true,
    },
  ];

  return (
    <ReactGridLayout
      layout={layout}
      cols={12}
      rowHeight={h} //TODO: Change to 30 as previously
      width={w}
      margin={[10, 10]}
      draggableCancel=".no-drag"
      isResizable={!isStatic}
      onResizeStop={(layout, oldItem, newItem) => {
        console.log("Resize Stop", layout, oldItem, newItem);
      }}
      onDragStop={(layout, oldItem, newItem) => {
        console.log("Drag Stop", layout, oldItem, newItem);
      }}
    >
      {children.map((child, index) => (
        <div
          key={index}
          style={{
            width: `${(w / children.length) * 0.9}px`,
            height: `${(h / children.length) * 0.9}px`,
            margin: "0.5rem",
          }}
        >
          {child}
        </div>
      ))}
    </ReactGridLayout>
  );
};

export default NestedDraggableContainer;
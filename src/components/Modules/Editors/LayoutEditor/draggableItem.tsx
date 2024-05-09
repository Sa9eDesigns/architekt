import React from "react";

interface DraggableContainerProps {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
  static?: boolean;
  children: JSX.Element[];
}

const DraggableContainer: React.FC<DraggableContainerProps> = ({
  id,
  x,
  y,
  w,
  h,
  static: isStatic,
  children,
}) => {
  return (
    <div
      key={id}
      className={isStatic? "static" : ""}
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
      </div>
    </div>
  );
};

export default DraggableContainer;
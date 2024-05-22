import React, { useRef, createRef } from "react";
import { useNode } from "@craftjs/core";

interface FrameContainerProps {
  children: React.ReactNode;
}

interface FrameContainerInterface extends React.FC<FrameContainerProps> {
  craft: object;
}

const FrameContainer: FrameContainerInterface = ({ children }) => {
  const { connectors } = useNode();
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={(containerRef) => {
        connectors.connect(containerRef as HTMLDivElement);
      }}
      style={{ width: "100%", minHeight: "100%" }}
      className="bg-white"
    >
      {children}
    </div>
  );
};

FrameContainer.craft = {
  displayName: "Frame",
  props: {},
  rules: {
    canDrag: () => true,
  },
  related: {},
};

export default FrameContainer;
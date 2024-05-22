import React, { useState, useEffect } from "react";
import { Responsive, WidthProvider, Layout } from "react-grid-layout";
import DraggableContainer from "./Components/DraggableContainer";
import { useComponentComposerStoreContext } from "./Context/ComponentComposerProvider";
import { Box } from "@mui/material";
import { LayoutItem } from "./Context/ComponentComposerStore";

const ResponsiveReactGridLayout = WidthProvider(Responsive);

interface CanvasProps {
  onLayoutChange: (
    layout: Layout[],
    layouts: { [key: string]: Layout[] }
  ) => void;
  cols: { [key: string]: number };
}

const LayoutCanvas: React.FC<CanvasProps> = ({
  onLayoutChange,
  cols,
  ...props
}) => {
  const layout = useComponentComposerStoreContext((state) => state.layout);
  const handleOnDrop = useComponentComposerStoreContext(
    (state) => state.handleOnDrop
  );
  const handleOnLayoutChange = useComponentComposerStoreContext(
    (state) => state.handleOnLayoutChange
  );
  const handleOnSelectComponent = useComponentComposerStoreContext(
    (state) => state.handleOnSelectComponent
  );
  const handleOnDeleteComponent = useComponentComposerStoreContext(
    (state) => state.handleOnDeleteComponent
  );
  const handleOnDuplicateComponent = useComponentComposerStoreContext(
    (state) => state.handleOnDuplicateComponent
  );
  const handleOnMoveComponent = useComponentComposerStoreContext(
    (state) => state.handleOnMoveComponent
  );
  const handleOnResizeComponent = useComponentComposerStoreContext(
    (state) => state.handleOnResizeComponent
  );
  const handleOnEditComponent = useComponentComposerStoreContext(
    (state) => state.handleOnEditComponent
  );
  const [currentBreakpoint, setCurrentBreakpoint] = useState("lg");
  const [compactType, setCompactType] = useState<"vertical" | "horizontal">(
    "vertical"
  );
  const [mounted, setMounted] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState<LayoutItem | null>(
    null
  );
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const onBreakpointChange = (breakpoint: string) => {
    setCurrentBreakpoint(breakpoint);
  };

  const onLayoutChangeCallback = (
    layout: Layout[],
    layouts: { [key: string]: Layout[] }
  ) => {
    handleOnLayoutChange(layout as LayoutItem[]);
    onLayoutChange(layout, layouts);
  };

  const onDrop = (layoutItem: LayoutItem, event: any) => {
    const droppedElementId = event.dataTransfer?.getData("text/plain");
    if (droppedElementId) {
      const newComponent: LayoutItem = {
        x: layoutItem.x,
        y: layoutItem.y,
        w: layoutItem.w,
        h: layoutItem.h,
        i: layoutItem.i,
        id: `component-${layoutItem.i}`,
        component: React.createElement("div", { key: `component-${layoutItem.i}` }),
        props: {},
        children: null,
        onClick: () => handleComponentClick(layoutItem.i),
        onInfo: () => alert(`Info of component ${layoutItem.i}`),
        onEdit: () => handleOnEditComponent(layoutItem),
        onDelete: () => handleOnDeleteComponent(layoutItem),
        onDuplicate: () => handleOnDuplicateComponent(layoutItem),
        onMove: () =>
          handleOnMoveComponent(layoutItem, layoutItem.x, layoutItem.y),
        onResize: () =>
          handleOnResizeComponent(layoutItem, layoutItem.w, layoutItem.h),
        static: false,
        isDraggable: true,
        isResizable: true,
      };
      handleOnDrop(newComponent);
    }
  };

  const handleComponentClick = (id: string) => {
    const component = layout.find((item) => item.i === id);
    if (component) {
      handleOnSelectComponent(component);
      setSelectedComponent(component);
      setModalOpen(true);
    }
  };

  const handleSave = (updatedComponent: LayoutItem) => {
    handleOnEditComponent(updatedComponent);
  };

  const generateDOM = () => {
    return layout.map((l) => (
      <DraggableContainer
        key={l.i}
        id={l.i}
        x={l.x}
        y={l.y}
        w={l.w}
        h={l.h}
        static={l.static}
        onClick={l.onClick}
      >
        {l.children || <div>{l.component}</div>}
      </DraggableContainer>
    ));
  };

  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        overflow: "auto",
        backgroundColor: "white",
        padding: "1rem",
      }}
    >
      <ResponsiveReactGridLayout
        className="component-composer-layout"
        autoSize={true}
        layouts={{ lg: layout }}
        cols={cols}
        onBreakpointChange={onBreakpointChange}
        onLayoutChange={onLayoutChangeCallback}
        onDrop={(layoutItem, event) => onDrop(layoutItem as unknown as LayoutItem, event)}
        measureBeforeMount={false}
        useCSSTransforms={mounted}
        compactType={compactType}
        preventCollision={!compactType}
        isDroppable={true}
      >
        {generateDOM()}
      </ResponsiveReactGridLayout>
    </Box>
  );
};

export default LayoutCanvas;

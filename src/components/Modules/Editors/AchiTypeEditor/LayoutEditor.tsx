import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Responsive, WidthProvider, Layout } from "react-grid-layout";
import DraggableContainer from "./Components/DraggableContainer";
import { useCCEditorContext } from "./Context/CCContext";
import { Box, Modal, Typography, Button } from "@mui/material";
import { AllElementsByCategory } from "./Constants/defaultComponent";
import _ from "lodash";

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
  const {
    layoutElements,
    onDrop,
    onLayoutChange: handleOnLayoutChange,
    onSelectComponentElement,
    onDeleteComponentElement,
    onDuplicateComponentElement,
    onMoveComponentElement,
    onResizeComponentElement,
    onEditComponentElement,
    selectedElement,
    updateComponentElementProperties,
  } = useCCEditorContext();

  // State variables
  const [currentBreakpoint, setCurrentBreakpoint] = useState("lg");
  const [compactType, setCompactType] = useState<
    "vertical" | "horizontal" | null
  >("vertical");
  const [mounted, setMounted] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  // Effect to set mounted state
  useEffect(() => {
    setMounted(true);
  }, []);

  // Search for component by id
  const findComponentById = useCallback(
    (id: string) => layoutElements.find((item) => item.id === id),
    [layoutElements]
  );

  // Generate layout elements


  // Memoize layout DOM generation for performance
  const generateDOM = useCallback(
    () =>
      layoutElements.map((l) => (
        <DraggableContainer
          key={l.id}
          id={l.id}
          x={l.layout.x}
          y={l.layout.y}
          w={l.layout.w}
          h={l.layout.h}
          static={l.layout.static}
          onClick={() => handleComponentClick(l.id)}
        >
          {React.createElement(_.get(AllElementsByCategory, l.component.name).component, {
            ...l.properties,
            id: l.id,
            onEdit: () => {
              onEditComponentElement(l);
              setModalOpen(true);
            },
            onDelete: () => onDeleteComponentElement(l),
            onDuplicate: () => onDuplicateComponentElement(l),
            onMove: (direction: "up" | "down" | "left" | "right") =>
              onMoveComponentElement(l),
            onResize: (w: number, h: number) => {
              onResizeComponentElement(l, w, h);
            }
          })}
        </DraggableContainer>
      )),
    [layoutElements]
  );

  // Callback for layout changes
  const onLayoutChangeCallback = useCallback(
    (layout: Layout[], layouts: { [key: string]: Layout[] }) => {
      handleOnLayoutChange(layout);
      onLayoutChange(layout, layouts);
    },
    [handleOnLayoutChange, onLayoutChange]
  );

  // Callback for breakpoint changes
  const onBreakpointChange = useCallback((breakpoint: string) => {
    setCurrentBreakpoint(breakpoint);
  }, []);

  // Handle component drop
  const onDropCallback = useCallback(
    (
      layout: Layout[],
      layoutItem: Layout,
      event: React.DragEvent<HTMLDivElement>
    ) => {
      try {
        const data = event.dataTransfer?.getData("text/plain");
        if (data) {
          const elementToRender = JSON.parse(data);
          const newComponent = {
            id: `component-${layoutItem.i}`,
            layout: layoutItem,
            component: {
              id: elementToRender.id,
              name: elementToRender.name,
            },
            properties: {
              component: elementToRender,
              styles: {},
              actions: [],
              data: {},
              value: {},
            },
          };
          onDrop(newComponent);
        }
      } catch (error) {
        console.error("Error handling drop:", error);
      }
    },
    [onDrop]
  );

  // Handle component click
  const handleComponentClick = useCallback(
    (id: string) => {
      const component = layoutElements.find((item) => item.id === id);
      if (component) {
        onSelectComponentElement(component);
        setModalOpen(true);
      }
    },
    [layoutElements, onSelectComponentElement]
  );

  // Handle save action in modal
  const handleSave = useCallback(
    (updatedComponent: any) => {
      updateComponentElementProperties(
        selectedElement,
        updatedComponent.properties
      );
      setModalOpen(false);
    },
    [selectedElement, updateComponentElementProperties]
  );

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
        layouts={{ lg: layoutElements.map((l) => l.layout) }}
        cols={cols}
        onBreakpointChange={onBreakpointChange}
        onLayoutChange={onLayoutChangeCallback}
        onDrop={(layout, layoutItem, event) =>
          onDropCallback(layout as unknown as Layout[], layoutItem, event.target as unknown as React.DragEvent<HTMLDivElement>)
        }
        measureBeforeMount={false}
        useCSSTransforms={mounted}
        compactType={compactType}
        preventCollision={!compactType}
        isDroppable={true}
      >
        {generateDOM()}
      </ResponsiveReactGridLayout>

      {/* Modal for editing components */}
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        aria-labelledby="edit-component-modal-title"
        aria-describedby="edit-component-modal-description"
      >
        <Box
          sx={
            {
              /* Modal styling here */
            }
          }
        >
          <Typography
            id="edit-component-modal-title"
            variant="h6"
            component="h2"
          >
            Edit Component
          </Typography>
          <Typography id="edit-component-modal-description" sx={{ mt: 2 }}>
            {/* Component edit form or details here */}
          </Typography>
          <Button onClick={() => handleSave(selectedElement)}>Save</Button>
          <Button onClick={() => setModalOpen(false)}>Cancel</Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default LayoutCanvas;

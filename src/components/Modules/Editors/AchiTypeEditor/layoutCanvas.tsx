import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import { Responsive, WidthProvider } from 'react-grid-layout';
const ResponsiveReactGridLayout = WidthProvider(Responsive);
import DraggableContainer from './draggableItem'; // Import DraggableContainer
//Context

//INTERFACES
interface CanvasProps {
  onLayoutChange: (layout: any, layouts: any) => void;
  cols: { [key: string]: number };
}

//--a layout item is a configuration for a component that is being rendered in the layout
//--it contains the properties of the component
interface LayoutItem{
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
}

//TYPES
type CompactType = 'vertical' | 'horizontal';

//COMPONENTS
const generateLayout = () => {
  return _.map(_.range(0, 25), (item, i) => {
    const y = Math.ceil(Math.random() * 4) + 1;
    return {
      x: Math.round(Math.random() * 5) * 2,
      y: Math.floor(i / 6) * y,
      w: 2,
      h: y,
      i: i.toString(),
      static: Math.random() < 0.05,
    };
  });
};

//DEFAULT COMPONENT
const LayoutCanvas: React.FC<CanvasProps> = ({ onLayoutChange, cols, ...props }) => {
  const [currentBreakpoint, setCurrentBreakpoint] = useState('lg');
  const [compactType, setCompactType] = useState('vertical' as CompactType);
  const [layouts, setLayouts] = useState({ lg: generateLayout() });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const onBreakpointChange = (breakpoint: string) => {
    setCurrentBreakpoint(breakpoint);
  };

  const onCompactTypeChange = () => {
    setCompactType((prevCompactType) =>
      prevCompactType === 'horizontal'? 'vertical' : 'horizontal'
    );
  };

  const onLayoutChangeCallback = (layout: any, layouts: any) => {
    onLayoutChange(layout, layouts);
  };

  const onDrop = (layout: any, layoutItem: any, event: any) => {
    const droppedElement = event.relatedTarget; // Get the dropped element
    if (droppedElement && droppedElement.nodeName === 'DIV') { // Check if the dropped element is a div
      const id = droppedElement.getAttribute('data-grid-id'); // Get the id of the dropped element
      const droppedItem = layouts.lg.find((item: any) => item.i === id); // Find the corresponding layout item
      if (droppedItem) {
        // Replace the layout item with the dropped DraggableContainer
        layouts.lg[layoutItem.i] = { ...droppedItem, x: layoutItem.x, y: layoutItem.y, w: layoutItem.w, h: layoutItem.h };
        setLayouts({ ...layouts });
      }
    }
  };

  const generateDOM = () => {
    return _.map(layouts.lg, (l, i) => (
      <DraggableContainer
        key={i}
        id={l.i}
        x={l.x}
        y={l.y}
        w={l.w}
        h={l.h}
        static={l.static}
      >
        {/* Render the children of the DraggableContainer */}
        {_.times(_.random(1, 6), (j) => (
          <div key={j}>Item {i}-{j}</div>
        ))}
      </DraggableContainer>
    ));
  };

  return (
    <div style={{
      height: "100%",
      width: "100%",
      overflow: "auto",
      backgroundColor: "white",
      padding: "1rem",
    }}>
      <ResponsiveReactGridLayout
        //ID
        className="architype-layout"
        autoSize={true}
        layouts={layouts}
        onBreakpointChange={onBreakpointChange}
        onLayoutChange={onLayoutChangeCallback}
        onDrop={onDrop}
        measureBeforeMount={false}
        useCSSTransforms={mounted}
        compactType={compactType}
        preventCollision={!compactType}
        isDroppable={true}
      >
        {generateDOM()}
      </ResponsiveReactGridLayout>
    </div>
  );
};

export default LayoutCanvas;
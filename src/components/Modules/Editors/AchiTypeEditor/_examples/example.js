import React, { useState, useEffect } from "react";
import _ from "lodash";
import { Responsive, WidthProvider } from "react-grid-layout";
const ResponsiveReactGridLayout = WidthProvider(Responsive);

const DragFromOutsideLayout = ({
  className = "layout",
  rowHeight = 30,
  onLayoutChange = () => {},
  cols = { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
}) => {
  const [currentBreakpoint, setCurrentBreakpoint] = useState("lg");
  const [compactType, setCompactType] = useState("vertical");
  const [mounted, setMounted] = useState(false);
  const [layouts, setLayouts] = useState({ lg: generateLayout() });

  useEffect(() => {
    setMounted(true);
  }, []);

  const generateDOM = () => {
    return _.map(layouts.lg, (l, i) => {
      return (
        <div key={i} className={l.static? "static" : ""}>
          {l.static? (
            <span
              className="text"
              title="This item is static and cannot be removed or resized."
            >
              Static - {i}
            </span>
          ) : (
            <span className="text">{i}</span>
          )}
        </div>
      );
    });
  };

  const handleBreakpointChange = (breakpoint) => {
    setCurrentBreakpoint(breakpoint);
  };

  const handleCompactTypeChange = () => {
    setCompactType((prevCompactType) =>
      prevCompactType === "horizontal"
       ? "vertical"
        : prevCompactType === "vertical"
       ? null
        : "horizontal"
    );
  };

  const handleLayoutChange = (layout, layouts) => {
    onLayoutChange(layout, layouts);
  };

  const handleNewLayout = () => {
    setLayouts({ lg: generateLayout() });
  };

  const handleDrop = (layout, layoutItem, _event) => {
    alert(`Dropped element props:\n${JSON.stringify(layoutItem, ["x", "y", "w", "h"], 2)}`);
  };

  return (
    <div>
      <div>
        Current Breakpoint: {currentBreakpoint} ({cols[currentBreakpoint]} columns)
      </div>
      <div>
        Compaction type: {_.capitalize(compactType) || "No Compaction"}
      </div>
      <button onClick={handleNewLayout}>Generate New Layout</button>
      <button onClick={handleCompactTypeChange}>
        Change Compaction Type
      </button>
      <div
        className="droppable-element"
        draggable={true}
        unselectable="on"
        onDragStart={(e) => e.dataTransfer.setData("text/plain", "")}
      >
        Droppable Element (Drag me!)
      </div>
      <ResponsiveReactGridLayout
        {...{ className, rowHeight, cols }}
        layouts={layouts}
        onBreakpointChange={handleBreakpointChange}
        onLayoutChange={handleLayoutChange}
        onDrop={handleDrop}
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

const generateLayout = () => {
  return _.map(_.range(0, 25), (item, i) => {
    var y = Math.ceil(Math.random() * 4) + 1;
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

if (process.env.STATIC_EXAMPLES === true) {
  import("../test-hook.jsx").then((fn) => fn.default(DragFromOutsideLayout));
}

export default DragFromOutsideLayout;
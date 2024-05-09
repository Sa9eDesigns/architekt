import React, { useState } from 'react';
import ResponsiveFrame from './responsiveFrame';
import LayoutCanvas from './layoutCanvas';

const LayoutEditor: React.FC = () => {
  const [width, setWidth] = useState(800);
  const [height, setHeight] = useState(600);

  return (
    <ResponsiveFrame
      width={width}
      height={height}
      onResize={(width, height) => {
        setWidth(width);
        setHeight(height);
      }}
    >
      <LayoutCanvas 
        onLayoutChange={(layout, layouts) => {
          console.log(layout, layouts);
        }}
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
      />
    </ResponsiveFrame>
  );
};

export default LayoutEditor;

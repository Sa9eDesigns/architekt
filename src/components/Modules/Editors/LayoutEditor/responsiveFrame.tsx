
import React from 'react';
import Frame from 'react-frame-component';

interface ResponsiveFrameProps {
  width?: number;
  height?: number;
  onResize?: (width: number, height: number) => void;
  children?: React.ReactNode;
}

const ResponsiveFrame: React.FC<ResponsiveFrameProps> = ({
  width = 800,
  height = 600,
  onResize,
  children,
}) => {

  //CONSTANTS

  //STATES

  //REFS
  const frameRef = React.useRef<HTMLIFrameElement>(null);

  //METHODS
  const handleResize = (width: number, height: number) => {
    if (onResize) {
      onResize(width, height);
    }
  };

  //EFFECTS
  //-- Resize Event Listener
  React.useEffect(() => {
    const frame = frameRef.current;
    if (frame) {
      const observer = new ResizeObserver((entries) => {
        const entry = entries[0];
        if (entry) {
          const { width, height } = entry.contentRect;
          handleResize(width, height);
        }
      });
      observer.observe(frame);
      return () => observer.disconnect();
    }
  }, [handleResize]);

  //RENDER
  return (
    <Frame
      style={{ border: '1px solid black' }}
      width={width}
      height={height}
    >
      {children}
    </Frame>
  );
};

export default ResponsiveFrame;
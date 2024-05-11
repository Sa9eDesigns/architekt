/*This Defines the Hook that contains the functions used for the Editor
Use Cases: 
 - Since the Main Editor uses the React-grid-layout Library, we need to be able to Listen to the changes in the Layout and thus Apply the proper changes to the Layout, as well as the Components that are being edited are present in the Layout.
 - This means We can also keep a record of the Actions that are being performed on the Layout and Thus be able to Undo/Redo the actions.
]*/
import { useEffect, useState } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';

//INTERFACE DEFINITIONS

interface LayoutItem {
  i: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

const GridLayout = WidthProvider(Responsive);

const useEditor = () => {
  const [layout, setLayout] = useState([]);

  useEffect(() => {
    // Subscribe to layout changes
    const handleLayoutChange = (newLayout) => {
      setLayout(newLayout);
      // Perform actions based on the new layout
      // ...
    };

    // Initialize the layout
    const initialLayout = [
      { i: 'item1', x: 0, y: 0, w: 2, h: 2 },
      { i: 'item2', x: 2, y: 0, w: 2, h: 4 },
      // Add more initial items as needed
    ];
    setLayout(initialLayout);

    // Subscribe to layout changes
    const gridLayout = GridLayout;
    gridLayout.onLayoutChange(handleLayoutChange);

    // Clean up the subscription
    return () => {
      gridLayout.offLayoutChange(handleLayoutChange);
    };
  }, []);

  return layout;
};

export default useEditor;
"use client";

/*Defines The Context for The Component Composer Editor.
* Stores and manages the state of:
- current Layout Configuration
- current Layout Items and The nested Components
- the properties of all the components in the layout 
- the current selected component

* Listens to the following events:
- onDrop: when a component is dropped on the layout
- onLayoutChange: when the layout is updated
- onSelectComponent: when a component is selected
- onDeleteComponent: when a component is deleted
- onDuplicateComponent: when a component is duplicated
- onMoveComponent: when a component is moved
- onResizeComponent: when a component is resized
- onEditComponent: when a component is edited
The Context can also update, reset, and save the layout configuration*
*/
import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";
import { Layout, Layouts } from "react-grid-layout";
import _ from "lodash";
import { v4 } from "uuid";
import {AllElementsByCategory} from "../Constants/defaultComponent";

// Define The//Define the nested Editor Components
interface I_ComponentElement{
  layoutItemId: string | number;
  component:{
    id: string;
    name: string;
    icon: string;
    element: React.ReactNode;
  },
  properties?: any;
  styles?: any;
  actions?: any;
  data?: any;
  value?: any;
}

// Define the context properties
interface I_CCEditorContextProps {
  currentLayout: Layout;
  currentLayoutItems: Layouts[];

  updateComponent: (layout: Layout) => void;
  onDrop: (newLayout: Layout, newLayoutItems: Layouts, newComponentElement: I_ComponentElement) => void;
}

// Define the Component Composer Editor State
/*--This is a JSON object that contains all the information about the Component that is being edited
--This Includes:
  --Layout Configuration: []
    -- The Layout Item elementProperties: {
      i: string;
      x: number;
      y: number;
      w: number;
      h: number;
      static: boolean;
    }

  -- Element Configuration: []
    -- The Element elementProperties: {
      LayoutItemId: string; //Defines where the component is placed in the layout
      ComponentId: string; //Defines which Component to render
      elementProperties: {}; //Custom property values to be passed to the component
      elementStyles: {}; //Custom styles to be applied to the component
      elementActions: {}; //An array of actions that the component can perform
      elementData: {}; //Configuration defining the query and data source for the component
      elementValue: {}; Based on the elementData Configuration, this Defines the selected value that the component will display
    }

N.B: This JSON Configuration is the main object that will be used to save, load, and update the layout configuration
- This will be used to save the layout configuration to the database
- This will be used for Code Generation and Export
*/

interface I_CCEditorState {
  currentLayout: Layout;
  layoutItems: Layouts;
  componentElements: I_ComponentElement[];
}

// Create the Context
const CCEditorContext = createContext({} as I_CCEditorContextProps)

// Define the Provider
interface I_CCEditorProviderProps {
  children: ReactNode;
}

//create the Provider
export const CCEditorProvider = ({ children }: I_CCEditorProviderProps) => {

  //STATES
  //-- The current Component Composer Editor State
  const [state, setState] = useState<I_CCEditorState>({
    currentLayout: {
      i: "0",
      x: 0,
      y: 0,
      w: 12,
      h: 12,
      static: false,
    },
    layoutItems: {
      lg: [
        { i: "a", x: 0, y: 0, w: 6, h: 4 },
        { i: "b", x: 6, y: 0, w: 6, h: 4 },
        { i: "c", x: 0, y: 4, w: 12, h: 4 },
      ],
    },
    componentElements: [],
  });

  //--The current layout configuration
  const [currentLayout, setCurrentLayout] = useState<Layout>({
    i: "0",
    x: 0,
    y: 0,
    w: 12,
    h: 12,
    static: false,
  });

  //--The current layout items
  const [layoutItems, setLayoutItems] = useState<Layouts>({
  });

  //-- the current layout elements and Its LayoutItem properties
  //--this is used to identify which and where the components are placed in the layout
  const [componentElements, setComponentElements] = useState<I_ComponentElement[]>([]);

  //--The currently selected component
  const [selectedElement, setSelectedElement] = useState<I_ComponentElement | null>(null);

  
  //FUNCTIONS
  //-- called by the layout editor whenever the is a change in the layout
  const updateComponent = (layout: Layout) => {

    //1. Update the current layout
    setCurrentLayout(layout);

    //2. Update the layout items
    const newLayoutItems = _.cloneDeep(layoutItems);
    newLayoutItems.lg = newLayoutItems.lg.map((item) => {
      if (item.i === layout.i) {
        return layout;
      } else {
        return item;
      }
    });
    setLayoutItems(newLayoutItems);

    //3. Update the component elements
    const newComponentElements = _.cloneDeep(componentElements);

    //--find the component element with the same layoutItemId as the layout
    const index = newComponentElements.findIndex((item) => item.layoutItemId === layout.i);
    if (index > -1) {
      newComponentElements[index].layoutItemId = layout.i;
      setComponentElements(newComponentElements);
    }
  };

  //-- called by the layout editor whenever a component is dropped on the layout
  const onDrop = (newLayout: Layout, newLayoutItems: Layouts, newComponentElement: I_ComponentElement) => {
    //1. Update the layout
    setCurrentLayout(newLayout);
    setLayoutItems(newLayoutItems);

    //2. Update the component elements
    //--using the new LayoutItem properties especially the id, we need to add the component to the component elements
    const newElementToAdd = {
      layoutItemId: newLayout.i,
      component: newComponentElement?.component,
      elementProperties: newComponentElement?.properties,
      elementStyles: newComponentElement?.styles,
      elementActions: newComponentElement?.actions,
      elementData: newComponentElement?.data,
      elementValue: newComponentElement?.value,
    }

    //--add the new element to the component elements
    const newComponentElements = _.cloneDeep(componentElements);
    newComponentElements.push(newElementToAdd);
    setComponentElements(newComponentElements);
  };

  //CONTEXT
  return (
    <CCEditorContext.Provider
      value={{
        currentLayout,
        currentLayoutItems: layoutItems,

        updateComponent,
        onDrop,
      }}
    >
      {children}
    </CCEditorContext.Provider>
  );
};

//use the context
export const useCCEditorContext = () => useContext(CCEditorContext);

//export the context
export default CCEditorContext;
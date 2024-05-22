import { ResizeHandleAxis } from "@/components/Modules/Editors/AchiTypeEditor/Context/EditorStore";
import { ReactElement } from "react";
import { DragOverEvent, ItemCallback } from "react-grid-layout";

/*===========================
Project Types And Interfaces
===========================*/
export interface Project {
  id: number;
  name: string;
  description: string;
  organization: string;
  start_date: string;
  end_date: string;
  status: string;
  template: ITemplate;
  application: Application;
}

export interface ProjectForm {
  name: string;
  description: string;
  template: ITemplate;
  created_at: string;
}

export interface ITemplate {
  id: number | string;
  name: string;
  description: string;
  ui: "MUI" | "BaseUI";
  templateUrl: string | null;
  directory: string | null;
}

export interface ProjectItem {
  id: string | number;
  name: string;
  description: string;
  organization: string;
  created_at: string;
  updated_at: string;
  status: string;
  template: ITemplate;
  image: string;
}

/*======================================================
Application Types And Interfaces
-- refers to the Application currently being developed
======================================================*/
export interface Application {
  id: number;
  name: string;
  components: Component[];
  pages: Page[];
  //Database:  define the database schema for the application
  database: ApplicationDatabase;
  //DataModels: define the data Types to be used in the application
  dataModels: ApplicationDataModel[];
  //DataSources: 3rd party data sources that are connected to the application
  //dataSources: ApplicationDataSource[];
  //Themes: Setup default values to be used by the Primitive elements
  theme: ApplicationTheme;
  //Files: Storage bucket for the application files such as images, videos, etc.
  files: ApplicationFiles;
  //Settings: Application settings such as name, description, etc.
  settings: ApplicationSettings;

}

//--COMPONENTS
export interface Component {
  id: number;
  name: string;
  type: string;
  //React Grid Layout
  layout: componentLayout_edit_mode | componentLayout_preview_mode;
  //react-flow
  actions: componentActions[];
  parameters: componentParameters;
}


//Layout is a react-grid-layout that contains the PrimitiveElements of the component
//Components can be dragged from the Components Panel and dropped into the Layout
//inside the Layout, the PrimitiveElements can be dragged and dropped to change their position
//in edit mode, the PrimitiveElements can be resized and moved around
//--component -> layout(edit_mode)
export interface componentLayout_edit_mode {
  width: number;
  autoSize: true;
  cols: 12;
  draggableCancel: string;
  draggableHandle: string;
  compactType: "vertical" | "horizontal" | null;
  layout: PrimitiveElement[];
  margin: [number, number];
  containerPadding: [number, number];
  rowHeight: number;
  droppingItem?: { i: string; w: number; h: number };
  isDraggable: boolean;
  isResizable: boolean;
  isBounded: boolean;
  useCSSTransforms: boolean;
  transformScale: number;
  allowOverlap: boolean;
  preventCollision: boolean;
  isDroppable: boolean;
  resizeHandles: Array<"s" | "w" | "e" | "n" | "sw" | "nw" | "se" | "ne">;
  resizeHandle?:
    | ReactElement<any>
    | ((
        resizeHandleAxis: ResizeHandleAxis,
        ref: React.RefObject<any>
      ) => ReactElement<any>);
  onLayoutChange: (layout: PrimitiveElement[]) => void;
  onDragStart: ItemCallback;
  onDrag: ItemCallback;
  onDragStop: ItemCallback;
  onResizeStart: ItemCallback;
  onResize: ItemCallback;
  onResizeStop: ItemCallback;
  onDrop: (
    layout: PrimitiveElement[],
    item: PrimitiveElement,
    e: MouseEvent
  ) => void;
  onDropDragOver: (e: DragOverEvent) => boolean;
  innerRef: { current: null | HTMLDivElement };
}

//Preview mode is when the component is being used to render the UI.
//In preview mode, the component is rendered as a layout with the PrimitiveElements
//But the PrimitiveElements cannot be moved or resized nor can new PrimitiveElements be added
//The component is rendered as a static layout
//--component -> layout(preview_mode)
export interface componentLayout_preview_mode {
  width: number;
  autoSize: true;
  cols: 12;
  layout: PrimitiveElement[];
  margin: [number, number];
  containerPadding: [number, number];
  rowHeight: number;
  isDraggable: false;
  isResizable: false;
  isBounded: true;
  useCSSTransforms: false;
  transformScale: number;
  allowOverlap: false;
  preventCollision: false;
  isDroppable: false;
  resizeHandles: null
  innerRef: { current: null | HTMLDivElement };
}

//--component -> layout -> PrimitiveElement
export interface PrimitiveElement {

  //React Grid Layout -> GridItem
  i: string;
  x: number;
  y: number;
  w: number;
  h: number;
  minW: number;
  maxW: number;
  minH: number;
  maxH: number;
  static: boolean;
  isBounded: boolean;
  //element to be rendered
  element: P_element;
  containerProps:{
    margin: [number, number];
    padding: [number, number];
    align: "left" | "center" | "right";
    justify: "flex-start" | "center" | "flex-end";
  },
}

//--component -> layout -> PrimitiveElement -> element
//these are all the components that can be added to the layout, taken from the UI library of the project
//example: MUI, BaseUI, JoyUI, etc.
export interface P_element {
  render: ReactElement | null;
  props: any | null;
  children: P_element[] | null;
  value: any | null;
  type: string;
  id: string;
  name: string;
  description: string;
  jsx: string;
}

//--component -> actions
//actions are all the functions that a component can perform when an event is triggered
//example include: function=>Navigate() event=>onClick 
//These are added to the component using the Actions Editor (React Flow) 
export interface componentActions {
  id: number;
  name: string;
  description: string;
  event: string;
  function: string;
}

//--component -> parameters
//parameters are the variables that can be passed to the component
//example include: props, state, context, etc.
//These are added to the component using the Properties Panel
export interface componentParameters {
  id: number;
  name: string;
  description: string;
  value: {
    type: string;
    default: any;
    required: boolean;
    options: any[];
  }[]
}


//--PAGES
export interface Page {
  id: number;
  name: string;
  layout: PageLayout;
}

//--page -> layout
//Page layout is a react-grid-layout that contains the components of the page
//There is a list of Layouts that users can choose from
//such as: layout1[header, sidebar, content, footer], layout2[header, content, footer], etc.
//A PageLayoutItems cannot be added to the layout, it is only for the user to select the layout
//PageLayoutItems are droppable areas where the user can drag and drop components components and PrimitiveElements
export interface PageLayout {
  id: number;
  name: string;
  description: string;
  layouts: PageDroppableLayout[];
}

//--page -> layout -> PageLayoutItem
//PageLayoutItem is a droppable area where the user can drag and drop components and PrimitiveElements
//Its essentially a container for the components and PrimitiveElements
//it uses the droppable from DndKit to allow the user to drag and drop components and PrimitiveElements
//and rearrange them within the layout
export interface PageDroppableLayout {
  id: number;
  layoutItemConfig:{
    i: string;
    x: number;
    y: number;
    w: number;
    h: number;
    minW: number;
    maxW: number;
    minH: number;
    maxH: number;
    static: boolean;
    isBounded: boolean;
  },
  dndKitConfig:{
    id: string;
    type: string;
    droppableId: string;
    children: P_element[];
  },
}


//--DATABASE
//The database schema for the application
export interface ApplicationDatabase {
  id: number;
  name: string;
  description: string;
  schema: DatabaseSchema;
}

//--database -> schema
//The database schema defines the structure of the database
//it contains tables, columns, relationships, etc.
export interface DatabaseSchema {
  id: number;
  name: string;
  description: string;
  tables: DatabaseTable[];
}

//--database -> schema -> tables
//tables are the different collections of data in the database
//tables contain columns, relationships, etc.
export interface DatabaseTable {
  id: number;
  name: string;
  description: string;
  columns: DatabaseColumn[];
  relationships: DatabaseRelationship[];
}

//--database -> schema -> tables -> columns
//columns are the different fields in the table
//columns contain the data type, default value, constraints, etc.
export interface DatabaseColumn {
  id: number;
  name: string;
  description: string;
  data_type: string;
  default_value: any;
  constraints: DatabaseColumnConstraint[];
}

//--database -> schema -> tables -> columns -> constraints
//constraints are the rules that the column must follow
export interface DatabaseColumnConstraint {
  id: number;
  name: string;
  description: string;
  type: string;
}

//--database -> schema -> tables -> relationships
//relationships are the connections between tables
export interface DatabaseRelationship {
  id: number;
  name: string;
  description: string;
  type: string;
  table: DatabaseTable;
  columns: DatabaseColumn[];
}

//--DATA MODELS
//Data models are the types of data that the application uses
//Data models can be used to define the structure of the data
//Data models can be used to define the types of the data
export interface ApplicationDataModel {
  id: number;
  name: string;
  description: string;
  type: string;
  properties: DataModelProperty[];
}

//--data models -> properties
//properties are the fields in the data model
//properties contain the data type, default value, constraints, etc.
export interface DataModelProperty {
  id: number;
  name: string;
  description: string;
  type: string;
  default_value: any;
  constraints: DataModelPropertyConstraint[];
}

//--data models -> properties -> constraints
//constraints are the rules that the property must follow
export interface DataModelPropertyConstraint {
  id: number;
  name: string;
  description: string;
  type: string;
}


//--THEMING
//Themes are the default values that are used by the PrimitiveElements
//Through the theme, the user can set the default values for the PrimitiveElements
//such as color, typography, spacing, etc.
export interface ApplicationTheme {
  id: number;
  name: string;
  description: string;
  //spacing
  themeSpacing: ThemeSpacing;
  //typography
  themeTypography: ThemeTypography;
  //color
  themeColor: ThemeColor;
  //miscellaneous
  themeMisc: ThemeMisc;
}

//--theme -> spacing
//spacing is the default spacing values for the PrimitiveElements
export interface ThemeSpacing {
  id: number;
  name: string;
  description: string;
  padding:{
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    custom: {
      top: number;
      right: number;
      bottom: number;
      left: number;
    } | null;
  },
  margin:{
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    custom: {
      top: number;
      right: number;
      bottom: number;
      left: number;
    } | null;
  },
}

//--theme -> typography
//typography is the default typography values for the PrimitiveElements
export interface ThemeTypography {
  id: number;
  name: string;
  description: string;
  font:{
    family: string;
    size: {
      xs: number;
      sm: number;
      md: number;
      lg: number;
      xl: number;
      custom: number | null;
    },
    weight: {
      light: number;
      regular: number;
      medium: number;
      bold: number;
      custom: number | null;
    },
  },
  color:{
    primary: string;
    secondary: string;
    text: string;
    link: string;
    custom: string | null;
  },
}

//--theme -> color
//color is the default color values for the PrimitiveElements
export interface ThemeColor {
  id: number;
  name: string;
  description: string;
  palette:{
    primary: string;
    secondary: string;
    text: string;
    link: string;
    custom: string | null;
  },
}

//--theme -> miscellaneous
//miscellaneous is the default values for the PrimitiveElements
export interface ThemeMisc {
  id: number;
  name: string;
  description: string;
  borderRadius:{
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    custom: number | null;
  },
  boxShadow:{
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    custom: string | null;
  },
  opacity:{
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    custom: number | null;
  },
  zIndex:{
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    custom: number | null;
  },
}

//--FILES
//Files are the storage bucket for the application files such as images, videos, etc.
export interface ApplicationFiles {
  id: number;
  name: string;
  description: string;
  files: ApplicationFile[];
}

//--files -> file
//file is the individual file in the storage bucket
export interface ApplicationFile {
  id: number;
  name: string;
  description: string;
  type: string;
  size: number;
  url: string;
}

//--SETTINGS
//Settings are the application settings such as name, description, etc.
export interface ApplicationSettings {
  id: number;
  name: string;
  description: string;
  settings: ApplicationSetting[];
}

//--settings -> setting
//setting is the individual setting of the application
export interface ApplicationSetting {
  id: number;
  name: string;
  description: string;
  value: any;
  type: string;
  options: any[];
}
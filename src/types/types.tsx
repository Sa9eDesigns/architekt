import { ReactElement } from "react";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { DragOverEvent, ItemCallback, Layout, Responsive, WidthProvider } from "react-grid-layout";
import { ResizeHandleAxis } from "@/components/Modules/Editors/AchiTypeEditor/Context/EditorStore";
import { UUID } from "crypto";

/*===========================
Project Types And Interfaces
===========================*/
export interface Project {
  Id: UUID
  Name: string;
  Description: string;
  Organization: string;
  StartDate: string;
  EndDate: string;
  Status: string;
  Template: ITemplate;
  Application: Application;
}

export interface ProjectForm {
  Name: string;
  Description: string;
  Template: ITemplate;
  CreatedAt: string;
}

export interface ITemplate {
  Id: UUID;
  Name: string;
  Description: string;
  UI: "MUI" | "BaseUI";
}

export interface ProjectItem {
  Id: UUID;
  Name: string;
  Description: string;
  Template?: ITemplate;
}

/*======================================================
Application Types And Interfaces
-- refers to the Application currently being developed
======================================================*/

export interface Application {
  id: string;
  name: string;
  components: Component[];
  pages: DroppableArea[]; // Use DroppableArea type for pages
  database: ApplicationDatabase;
  dataModels: ApplicationDataModel[];
  theme: ApplicationTheme;
  files: ApplicationFiles;
  settings: ApplicationSettings;
}



//--COMPONENTS
export interface Component {
  Id: UUID
  Name: string;
  Type: string;
  Layout: ComponentLayoutEditMode | ComponentLayoutPreviewMode;
  Actions: ComponentAction[];
  Parameters: ComponentParameter;
}

//--component -> layout(edit_mode)
export interface ComponentLayoutEditMode {
  Width: number;
  AutoSize: boolean; // Adjusted to boolean type
  Cols: number;
  DraggableCancel?: string; // Make the property optional
  DraggableHandle?: string; // Make the property optional
  CompactType: "vertical" | "horizontal" | null;
  Layout: PrimitiveElement[];
  Margin: [number, number];
  ContainerPadding: [number, number];
  RowHeight: number;
  DroppingItem?: { i: string; w: number; h: number };
  IsDraggable: boolean;
  IsResizable: boolean;
  IsBounded: boolean;
  UseCSSTransforms: boolean;
  TransformScale: number;
  AllowOverlap: boolean;
  PreventCollision: boolean;
  IsDroppable: boolean;
  ResizeHandles: Array<"s" | "w" | "e" | "n" | "sw" | "nw" | "se" | "ne">;
  ResizeHandle?:
    | ReactElement<any>
    | ((
        resizeHandleAxis: ResizeHandleAxis,
        ref: React.RefObject<any>
      ) => ReactElement<any>);
  OnLayoutChange: (layout: PrimitiveElement[]) => void;
  OnDragStart: ItemCallback;
  OnDrag: ItemCallback;
  OnDragStop: ItemCallback;
  OnResizeStart: ItemCallback;
  OnResize: ItemCallback;
  OnResizeStop: ItemCallback;
  OnDrop: (
    layout: PrimitiveElement[],
    item: PrimitiveElement,
    e: MouseEvent
  ) => void;
  OnDropDragOver: (e: DragOverEvent) => boolean;
  InnerRef: { current: null | HTMLDivElement };
}

//--component -> layout(preview_mode)
export interface ComponentLayoutPreviewMode {
  Width: number;
  AutoSize: boolean; // Adjusted to boolean type
  Cols: number;
  Layout: PrimitiveElement[];
  Margin: [number, number];
  ContainerPadding: [number, number];
  RowHeight: number;
  IsDraggable: false;
  IsResizable: false;
  IsBounded: true;
  UseCSSTransforms: false;
  TransformScale: number;
  AllowOverlap: false;
  PreventCollision: false;
  IsDroppable: false;
  ResizeHandles: null;
  InnerRef: { current: null | HTMLDivElement };
}

export interface PrimitiveElement {
  id: string; // Unique identifier for the element
  name?: string; // Name of the element (optional)
  description?: string; // Description of the element (optional)
  x: number; // X-coordinate position within the layout grid
  y: number; // Y-coordinate position within the layout grid
  w: number; // Width of the element within the grid
  h: number; // Height of the element within the grid
  minW?: number; // Minimum width the element can have (optional)
  maxW?: number; // Maximum width the element can have (optional)
  minH?: number; // Minimum height the element can have (optional)
  maxH?: number; // Maximum height the element can have (optional)
  static: boolean; // Indicates if the element is static (cannot be moved or resized)
  isBounded?: boolean; // Indicates if the element is bounded within its container (optional)
  isDraggable?: boolean; // Indicates if the element can be dragged
  isResizable?: boolean; // Indicates if the element can be resized
  allowOverlap?: boolean; // Indicates if the element can overlap with other elements
  element: JSX.Element; // The actual element to be rendered
  containerProps?: {
    // Properties for styling the container of the element (optional)
    margin: [number, number]; // Margin values for the container
    padding: [number, number]; // Padding values for the container
    align: "left" | "center" | "right"; // Alignment of the content within the container
    justify: "flex-start" | "center" | "flex-end"; // Justification of the content within the container
    backgroundColor?: string; // Background color of the container (optional)
    border?: string; // Border style of the container (optional)
    className?: string; // Custom CSS class for the container (optional)
  };
  // Event callbacks
  onDragStart?: () => void;
  onDrag?: () => void;
  onDragStop?: () => void;
  onResizeStart?: () => void;
  onResize?: () => void;
  onResizeStop?: () => void;
  onDrop?: (item: PrimitiveElement, e: MouseEvent) => void;
}

export interface P_element {
  render: JSX.Element | null; // React element to be rendered
  props: Record<string, any> | null; // Properties or attributes associated with the element
  children?: P_element[] | null; // Children elements of the current element (optional)
  value?: any | null; // Value associated with the element (optional)
  type: string; // Type of the element
  id?: string; // Identifier for the element (optional)
  name?: string; // Name of the element (optional)
  description?: string; // Description of the element (optional)
  jsx?: string; // JSX code representing the element (optional)
}

//COMPONENT PARAMETERS
export interface ComponentParameter {
  id: string; // Unique identifier for the parameter
  name: string; // Name of the parameter
  type: string; // Type of the parameter (e.g., string, number, boolean, etc.)
  value: any; // Value of the parameter
  options?: any[]; // List of options for the parameter (optional)
  required: boolean; // Indicates if the parameter is required
}

//ACTIONS
export interface ComponentAction {
  id: string; // Unique identifier for the action
  name: string; // Name of the action
  description?: string; // Description of the action (optional)
  event: ComponentEvent; // Event associated with the action
  actionType: ActionType; // Type of action (e.g., navigate, setState)
  parameters?: ActionParameter[]; // Parameters associated with the action (optional)
}

// Enum for component events
export enum ComponentEvent {
  Click = "click",
  Hover = "hover",
  OnInit = "onInit",
  OnBeforeDestroy = "onBeforeDestroy",
}

// Enum for action types
export enum ActionType {
  Navigate = "navigate",
  SetState = "setState",
  // Add more action types as needed
}

// Interface for action parameters
export interface ActionParameter {
  name: string; // Name of the parameter
  type: ParameterType; // Type of the parameter
  defaultValue?: any; // Default value for the parameter (optional)
  required: boolean; // Indicates if the parameter is required
  options?: any[]; // List of options for the parameter (optional)
}

// Enum for parameter types
export enum ParameterType {
  String = "string",
  Number = "number",
  Boolean = "boolean",
  // Add more parameter types as needed
}

//PAGES
// Define interface for a droppable area on the page
export interface DroppableArea {
  id: string; // Unique identifier for the droppable area
  name: string; // Name or label for the droppable area
  layout: Layout[]; // Initial layout configuration for the droppable area
  onDrop: (event: DragEndEvent) => void; // Callback function for when a component is dropped onto the area
}

// Define interface for a component to be dropped onto the page
export interface PageComponent {
  id: string; // Unique identifier for the component
  name: string; // Name or label for the component
  element: ReactElement; // React element representing the component
}

// Define interface for the page editor
export interface PageEditorProps {
  droppableAreas: DroppableArea[]; // List of droppable areas on the page
  components: PageComponent[]; // List of components available for dragging and dropping
}

// Define type for the layout configuration of the page editor
export type PageLayout = Responsive;

// Define type for the layout state of the page editor
export type PageLayoutState = { [key: string]: Layout[] };

// Define interface for the page editor component
export interface PageEditorComponentProps {
  layout: PageLayout; // Layout configuration for the page editor
  layoutState: PageLayoutState; // Layout state for the page editor
  onLayoutChange: (layout: Layout[], layouts: Layout[]) => void; // Callback function for layout changes
}

// Define interface for the page editor container component
export interface PageEditorContainerProps {
  droppableAreas: DroppableArea[]; // List of droppable areas on the page
  components: PageComponent[]; // List of components available for dragging and dropping
}

// Define interface for the page editor context
export interface PageEditorContextValue {
  dndContext: typeof DndContext; // DndContext component from the DndKit library
}

// Define interface for the page editor context provider
export interface PageEditorContextProviderProps {
  children: React.ReactNode; // Child components wrapped by the context provider
}


//DATABASE
// Define interface for a database column constraint
export interface DatabaseColumnConstraint {
  name: string; // Name of the constraint
  type: string; // Type of the constraint
  // Additional properties specific to the constraint type can be added here
}

// Define interface for a database relationship
export interface DatabaseRelationship {
  name: string; // Name of the relationship
  type: string; // Type of the relationship (e.g., one-to-one, one-to-many, many-to-many)
  relatedTable: string; // Name of the related table
  columns: {
    localColumn: string; // Name of the local column
    foreignColumn: string; // Name of the foreign column in the related table
  }[]; // Columns involved in the relationship
}

// Define interface for a database table column
export interface DatabaseColumn {
  name: string; // Name of the column
  dataType: string; // Data type of the column
  defaultValue?: any; // Default value for the column (optional)
  constraints?: DatabaseColumnConstraint[]; // Constraints for the column (optional)
}

// Define interface for a database foreign key constraint
export interface DatabaseForeignKey {
  name: string; // Name of the foreign key constraint
  column: string; // Name of the column containing the foreign key
  referencedTable: string; // Name of the referenced table
  referencedColumn: string; // Name of the referenced column in the referenced table
  // Additional properties such as on delete, on update actions can be added here
}

// Define interface for a database table
export interface DatabaseTable {
  name: string; // Name of the table
  columns: DatabaseColumn[]; // Columns of the table
  primaryKey?: string[]; // Primary key column(s) of the table (optional)
  foreignKeys?: DatabaseForeignKey[]; // Foreign key constraints for the table (optional)
  relationships?: DatabaseRelationship[]; // Relationships with other tables (optional)
}

// Define interface for the database schema
export interface DatabaseSchema {
  tables: DatabaseTable[]; // Tables within the schema
}

// Define interface for the application database
export interface ApplicationDatabase {
  schema: DatabaseSchema; // Database schema
  data?: Record<string, any>; // Data stored in the database (optional)
}


//DATA MODELS
// Define interface for a data model property
// Define interface for a data model property constraint
export interface DataModelPropertyConstraint {
  name: string; // Name of the constraint
  type: string; // Type of the constraint
  // Additional properties specific to the constraint type can be added here
}

// Define interface for a data model property
export interface DataModelProperty {
  name: string; // Name of the property
  type: string; // Data type of the property
  defaultValue?: any; // Default value for the property (optional)
  constraints?: DataModelPropertyConstraint[]; // Constraints for the property (optional)
}

// Define interface for a data model
export interface ApplicationDataModel {
  id: string; // Unique identifier for the data model
  name: string; // Name of the data model
  properties: DataModelProperty[]; // Properties of the data model
  foreignKeys?: DataModelForeignKey[]; // Foreign keys for the data model (optional)
}

// Define interface for a data model foreign key
export interface DataModelForeignKey {
  property: string; // Name of the property in the data model
  referencedTable: string; // Name of the referenced database table
  referencedColumn: string; // Name of the referenced column in the referenced table
}

// Define advanced type for a data model with relationships to database tables
export type AdvancedDataModel = ApplicationDataModel & {
  // Additional properties for relationships
  relationships?: {
    table: string; // Name of the related database table
    columns: {
      dataModelProperty: string; // Name of the property in the data model
      databaseColumn: string; // Name of the column in the related database table
    }[];
  }[];
};



//EVENT HANDLING
// Define interface for an event trigger
export interface EventTrigger {
  id: string; // Unique identifier for the trigger
  name: string; // Name of the trigger
  description?: string; // Description of the trigger (optional)
  type: string; // Type of trigger (e.g., onClick, onChange, onHover, etc.)
  // Additional properties specific to the trigger type can be added here
}

// Define interface for an event action
export interface EventAction {
  id: string; // Unique identifier for the action
  name: string; // Name of the action
  description?: string; // Description of the action (optional)
  type: string; // Type of action (e.g., Navigate, SetState, CallAPI, etc.)
  // Additional properties specific to the action type can be added here
}

// Define interface for an event condition
export interface EventCondition {
  id: string; // Unique identifier for the condition
  name: string; // Name of the condition
  description?: string; // Description of the condition (optional)
  type: string; // Type of condition (e.g., IfElse, CompareValues, etc.)
  // Additional properties specific to the condition type can be added here
}

// Define interface for an event handler
export interface EventHandler {
  id: string; // Unique identifier for the handler
  name: string; // Name of the handler
  description?: string; // Description of the handler (optional)
  trigger: EventTrigger; // Trigger that activates the handler
  actions: EventAction[]; // Actions performed by the handler
  conditions?: EventCondition[]; // Conditions for executing the actions (optional)
}


//External Services
// Define interface for an external service or API
export interface ExternalService {
  id: string; // Unique identifier for the service
  name: string; // Name of the service
  description?: string; // Description of the service (optional)
  endpoint: string; // Endpoint URL for the service
  // Additional properties specific to the service can be added here
}

// Define interface for a data source
export interface DataSource {
  id: string; // Unique identifier for the data source
  name: string; // Name of the data source
  description?: string; // Description of the data source (optional)
  type: string; // Type of data source (e.g., Database, REST API, GraphQL API, etc.)
  // Additional properties specific to the data source type can be added here
}

// Define interface for an action to be performed with an external service or data source
export interface ExternalAction {
  id: string; // Unique identifier for the action
  name: string; // Name of the action
  description?: string; // Description of the action (optional)
  type: string; // Type of action (e.g., GET, POST, PUT, DELETE, etc.)
  endpoint: string; // Endpoint URL for the action
  // Additional properties specific to the action type can be added here
}

// Define interface for integrating external services or data sources
export interface Integration {
  id: string; // Unique identifier for the integration
  name: string; // Name of the integration
  description?: string; // Description of the integration (optional)
  service?: ExternalService; // External service or API being integrated (optional)
  dataSource?: DataSource; // Data source being integrated (optional)
  actions: ExternalAction[]; // Actions to be performed with the service or data source
}


//DEPLOYMENT
// Define interface for an external service or API
export interface ExternalService {
  id: string; // Unique identifier for the service
  name: string; // Name of the service
  description?: string; // Description of the service (optional)
  endpoint: string; // Endpoint URL for the service
  // Additional properties specific to the service can be added here
}

// Define interface for a data source
export interface DataSource {
  id: string; // Unique identifier for the data source
  name: string; // Name of the data source
  description?: string; // Description of the data source (optional)
  type: string; // Type of data source (e.g., Database, REST API, GraphQL API, etc.)
  // Additional properties specific to the data source type can be added here
}

// Define interface for an action to be performed with an external service or data source
export interface ExternalAction {
  id: string; // Unique identifier for the action
  name: string; // Name of the action
  description?: string; // Description of the action (optional)
  type: string; // Type of action (e.g., GET, POST, PUT, DELETE, etc.)
  endpoint: string; // Endpoint URL for the action
  // Additional properties specific to the action type can be added here
}

// Define interface for integrating external services or data sources
export interface Integration {
  id: string; // Unique identifier for the integration
  name: string; // Name of the integration
  description?: string; // Description of the integration (optional)
  service?: ExternalService; // External service or API being integrated (optional)
  dataSource?: DataSource; // Data source being integrated (optional)
  actions: ExternalAction[]; // Actions to be performed with the service or data source
}


// Define interface for typography settings
export interface TypographySettings {
  fontFamily?: string; // Font family for the application
  fontSize: {
    [size: string]: number; // Font size for different elements
  };
  fontWeight: {
    [weight: string]: number; // Font weight for different elements
  };
}

// Define interface for color palette
export interface ColorPalette {
  [key: string]: string; // Customizable color properties
}

// Define interface for spacing settings
export interface SpacingSettings {
  padding: {
    [size: string]: number | { [direction: string]: number }; // Padding for different elements or directions
  };
  margin: {
    [size: string]: number | { [direction: string]: number }; // Margin for different elements or directions
  };
}

// Define interface for miscellaneous theme settings
export interface MiscellaneousSettings {
  borderRadius: {
    [size: string]: number; // Border radius for different elements
  };
  boxShadow: {
    [size: string]: string; // Box shadow for different elements
  };
  opacity: {
    [size: string]: number; // Opacity for different elements
  };
  zIndex: {
    [size: string]: number; // Z-index for different elements
  };
}

// Define interface for application theme
export interface ApplicationTheme {
  typography?: TypographySettings; // Typography settings for the application
  colorPalette?: ColorPalette; // Color palette for the application
  spacing?: SpacingSettings; // Spacing settings for the application
  miscellaneous?: MiscellaneousSettings; // Miscellaneous theme settings for the application
}


//APPLICATION FILES
// Define interface for an application file
export interface ApplicationFile {
  id: string; // Unique identifier for the file
  name: string; // Name of the file
  description?: string; // Description of the file (optional)
  type: string; // Type or format of the file (e.g., image, video, document, etc.)
  size: number; // Size of the file in bytes
  url: string; // URL or path to access the file
  metadata?: Record<string, any>; // Additional metadata associated with the file
  createdAt?: Date; // Date and time when the file was created
  createdBy?: string; // Identifier of the user who created the file
  updatedAt?: Date; // Date and time when the file was last updated
  updatedBy?: string; // Identifier of the user who last updated the file
}

// Define interface for a collection of application files
export interface ApplicationFiles {
  id: string; // Unique identifier for the collection of files
  name: string; // Name of the collection
  description?: string; // Description of the collection (optional)
  files: ApplicationFile[]; // Array of application files
  createdAt?: Date; // Date and time when the collection was created
  createdBy?: string; // Identifier of the user who created the collection
  updatedAt?: Date; // Date and time when the collection was last updated
  updatedBy?: string; // Identifier of the user who last updated the collection
}


//SETTINGS
// Define interface for application settings
// Define interface for an application setting
export interface ApplicationSetting {
  id: string; // Unique identifier for the setting
  name: string; // Name of the setting
  description?: string; // Description of the setting (optional)
  value: any; // Value of the setting
  type: string; // Type of the setting (e.g., string, number, boolean, etc.)
  options?: any[]; // Options for the setting (if applicable)
  createdAt?: Date; // Date and time when the setting was created
  createdBy?: string; // Identifier of the user who created the setting
  updatedAt?: Date; // Date and time when the setting was last updated
  updatedBy?: string; // Identifier of the user who last updated the setting
}

// Define interface for a collection of application settings
export interface ApplicationSettings {
  id: string; // Unique identifier for the collection of settings
  name: string; // Name of the collection
  description?: string; // Description of the collection (optional)
  settings: ApplicationSetting[]; // Array of application settings
  createdAt?: Date; // Date and time when the collection was created
  createdBy?: string; // Identifier of the user who created the collection
  updatedAt?: Date; // Date and time when the collection was last updated
  updatedBy?: string; // Identifier of the user who last updated the collection
}

/* **Report on Application Development System Types**

**Introduction:**
In this conversation, we discussed and defined a comprehensive set of types and interfaces for an application development system. The goal was to create a robust system that allows for easy development of applications with various features such as components, pages, databases, data models, theming, files, and settings.

**Summary of Types and Interfaces:**

1. **Project Types and Interfaces:**
   - Interfaces for defining projects, project forms, and templates.
   - Defined project and template structures, including ID, name, description, organization, and UI type.

2. **Application Types and Interfaces:**
   - Defined the structure of applications, including components, pages, database schema, data models, themes, files, and settings.
   - Included interfaces for components, pages, database schema, tables, columns, relationships, data models, and application settings.

3. **Component Types and Interfaces:**
   - Interfaces for components, layout in edit mode and preview mode, primitive elements, and actions.
   - Defined properties such as ID, name, type, layout configurations, actions, and parameters.

4. **Page Types and Interfaces:**
   - Interfaces for defining pages, droppable areas, and layout configurations.
   - Included types for layout configurations and state management of the page editor.

5. **Database Types and Interfaces:**
   - Defined interfaces for database schema, tables, columns, constraints, relationships, and foreign keys.
   - Included properties such as name, data type, default value, and constraints for columns.

6. **Data Model Types and Interfaces:**
   - Interfaces for data models, properties, constraints, and foreign keys.
   - Defined structures for data model properties, constraints, and foreign keys.

7. **Styling and Theming Types:**
   - Interfaces for application theming, including spacing, typography, color, and miscellaneous properties.
   - Defined properties such as padding, margin, font, color palette, border radius, box shadow, opacity, and z-index.

8. **File Types and Interfaces:**
   - Interfaces for application files, including ID, name, description, type, size, and URL.

9. **Settings Types and Interfaces:**
   - Interfaces for application settings, including ID, name, description, value, type, and options.

10. **Event Handling Types and Interfaces:**
    - Advanced interfaces for event handling, including events, actions, and lifecycle methods.
    - Defined structures for event handling using a node editor like react-flow.

**Conclusion:**
Overall, the conversation resulted in the creation of comprehensive types and interfaces for an application development system. These types provide a solid foundation for building complex applications with ease, allowing developers to focus on functionality rather than worrying about data structures and interfaces. By utilizing these types, developers can streamline the development process and create robust, scalable applications. */
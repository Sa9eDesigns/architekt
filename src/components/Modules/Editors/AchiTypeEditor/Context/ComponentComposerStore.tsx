import create from "zustand/vanilla";
import _ from "lodash";

export interface LayoutItem {
  x: number;
  y: number;
  w: number;
  h: number;
  i: string;
  id: string;
  component: React.ReactNode;
  props: ComponentProperties;
  children: React.ReactNode;
  static?: boolean;
  isDraggable?: boolean;
  isResizable?: boolean;
  onClick?: (event: any) => void;
  onInfo?: (event: any) => void;
  onEdit?: (event: any) => void;
  onDelete?: (event: any) => void;
  onDuplicate?: (event: any) => void;
  onMove?: (event: any) => void;
  onResize?: (event: any) => void;
}

export interface ComponentProperties {
  [key: string]: any;
}

export interface ComponentTree {
  id: string;
  children: ComponentTree[];
}

/*ComponentComposer States*/
export type T_ComponentComposerState = {
  layout: LayoutItem[];
  selectedComponent: LayoutItem | null;
  componentProperties: ComponentProperties | null;
  componentTree: ComponentTree | null;
};

/*ComponentComposer Actions*/
export type T_ComponentComposerActions = {
  handleOnDrop: (component: LayoutItem) => void;
  handleOnLayoutChange: (layout: LayoutItem[]) => void;
  handleOnSelectComponent: (component: LayoutItem) => void;
  handleOnDeleteComponent: (component: LayoutItem) => void;
  handleOnDuplicateComponent: (component: LayoutItem) => void;
  handleOnMoveComponent: (component: LayoutItem, x: number, y: number) => void;
  handleOnResizeComponent: (
    component: LayoutItem,
    w: number,
    h: number
  ) => void;
  handleOnEditComponent: (component: LayoutItem) => void;
  handleOnInfoComponent: (component: LayoutItem) => void;
};

/*ComponentComposer Store*/
export type T_ComponentComposerStore = T_ComponentComposerState &
  T_ComponentComposerActions;

/*Default Initial State for the ComponentComposer Store*/
const initialState: T_ComponentComposerState = {
  layout: JSON.parse(localStorage.getItem("layout") || "[]"),
  selectedComponent: null,
  componentProperties: null,
  componentTree: null,
};

/*ComponentComposer Store*/
export const useComponentComposerStore = create<T_ComponentComposerStore>(
  (set) => ({
    ...initialState,
    handleOnDrop: (component) =>
      set((state) => {
        const newLayout = [...state.layout, component];
        localStorage.setItem("layout", JSON.stringify(newLayout));
        return { layout: newLayout };
      }),
    handleOnLayoutChange: (layout) =>
      set(() => {
        localStorage.setItem("layout", JSON.stringify(layout));
        return { layout };
      }),
    handleOnSelectComponent: (component) =>
      set(() => ({
        selectedComponent: component,
        componentProperties: component.props,
      })),
    handleOnDeleteComponent: (component) =>
      set((state) => {
        const newLayout = state.layout.filter((item) => item.i !== component.i);
        localStorage.setItem("layout", JSON.stringify(newLayout));
        return {
          layout: newLayout,
          selectedComponent:
            state.selectedComponent?.i === component.i
              ? null
              : state.selectedComponent,
          componentProperties:
            state.selectedComponent?.i === component.i
              ? null
              : state.componentProperties,
        };
      }),
    handleOnDuplicateComponent: (component) =>
      set((state) => {
        const newComponent = { ...component, i: _.uniqueId("component-") };
        const newLayout = [...state.layout, newComponent];
        localStorage.setItem("layout", JSON.stringify(newLayout));
        return { layout: newLayout };
      }),
    handleOnMoveComponent: (component, x, y) =>
      set((state) => {
        const newLayout = state.layout.map((item) =>
          item.i === component.i ? { ...item, x, y } : item
        );
        localStorage.setItem("layout", JSON.stringify(newLayout));
        return { layout: newLayout };
      }),
    handleOnResizeComponent: (component, w, h) =>
      set((state) => {
        const newLayout = state.layout.map((item) =>
          item.i === component.i ? { ...item, w, h } : item
        );
        localStorage.setItem("layout", JSON.stringify(newLayout));
        return { layout: newLayout };
      }),
    handleOnEditComponent: (component) =>
      set((state) => {
        const newLayout = state.layout.map((item) =>
          item.i === component.i ? component : item
        );
        localStorage.setItem("layout", JSON.stringify(newLayout));
        return {
          layout: newLayout,
          selectedComponent: component,
          componentProperties: component.props,
        };
      }),
    handleOnInfoComponent: (component) => {
      console.log(`Component Info:`, component);
    },
  })
);

"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";
import { useEditor } from "@craftjs/core";

// Define the context properties
interface EditorContextProps {
  sidebarOpen: boolean;
  currentTab: string;
  isSaved: boolean;
  canUndo: boolean;
  canRedo: boolean;
  setSidebarOpen: (val: boolean) => void;
  handleCurrentTab: (val: string) => void;
  handleSave: () => void;
  handleUndo: () => void;
  handleRedo: () => void;
}

// Default values for the context
const defaultValue: EditorContextProps = {
  sidebarOpen: false,
  currentTab: "element_options",
  isSaved: false,
  canUndo: false,
  canRedo: false,
  setSidebarOpen: () => {},
  handleCurrentTab: () => {},
  handleSave: () => {},
  handleUndo: () => {},
  handleRedo: () => {},
};

/* CONTEXT */
export const EditorContext = createContext<EditorContextProps>(defaultValue);

interface EditorProviderProps {
  children: ReactNode;
}

/* PROVIDER */
export const EditorProvider: React.FC<EditorProviderProps> = ({ children }) => {
  // STATES
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentTab, setCurrentTab] = useState("element_options");
  const [isSaved, setIsSaved] = useState(false);

  const { actions, query } = useEditor((state, query) => ({
    canUndo: state.options.enabled && query.history.canUndo(),
    canRedo: state.options.enabled && query.history.canRedo(),
  }));

  // FUNCTIONS
  const handleCurrentTab = useCallback((val: string) => {
    setCurrentTab(val);
  }, []);

  const handleSave = useCallback(() => {
    console.log("Save Editor Content");
    setIsSaved(true);
  }, []);

  const handleUndo = useCallback(() => {
    actions.history.undo();
  }, [actions]);

  const handleRedo = useCallback(() => {
    actions.history.redo();
  }, [actions]);

  // RENDER
  return (
    <EditorContext.Provider
      value={{
        sidebarOpen,
        currentTab,
        isSaved,
        canUndo: query.history.canUndo(),
        canRedo: query.history.canRedo(),
        setSidebarOpen,
        handleCurrentTab,
        handleSave,
        handleUndo,
        handleRedo,
      }}
    >
      {children}
    </EditorContext.Provider>
  );
};

// Custom hook to use the EditorContext
export const useEditorContext = () => useContext(EditorContext);

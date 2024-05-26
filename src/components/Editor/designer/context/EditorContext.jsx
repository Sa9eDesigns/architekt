"use client";

import React, { createContext, useContext, useState } from "react";

/*CONTEXT*/
export const EditorContext = createContext();

/*PROVIDER*/
export const EditorProvider = ({ children }) => {
  //CRAFTJS

  //CONSTANTS

  //STATES
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentTab, setCurrentTab] = useState("element_options");
  const [isSaved, setIsSaved] = useState(false);

  //STYLES

  //FUNCTIONS
  function handleSidebarVisibility(val) {
    setSidebarOpen(val);
  }
  //--handle current tab
  function handleCurrentTab(val) {
    setCurrentTab(val);
  }

  function handleSave() {
    console.log("Save Editor Content");
    setIsSaved(true);
  }

  //RENDER
  return (
    <EditorContext.Provider
      value={{
        //CONSTANTS
        //STATES
        sidebarOpen,
        currentTab,
        //FUNCTIONS
        handleSidebarVisibility,
        handleCurrentTab,
      }}
    >
      {children}
    </EditorContext.Provider>
  );
};

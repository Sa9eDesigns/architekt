/* This Context Handles all the Global States the App will need, This includes:
  Language,
  User
*/
'use client'
import React, { useState, createContext } from 'react';

const AppGlobalsContext = createContext();

const AppGlobalsProvider = ({ children }) => {

  //CONSTANTS
  const LightTheme = {
    //Main
    color1: "#F80000",
    //Secondary
    color2: "#11041E",
    //Accent
    color3: "#FFC947",
    //Background
    bgColor: "#F4F4F4",
    //Surfaces
    surfaceColor: "#FFFFFF",
    //Text
    textColor: "#000000",
    //Disabled
    textDisabled: "#BDBDBD",
  }

  const DarkTheme = {
    //Main
    color1: "#F80000",
    //Secondary
    color2: "#cccccc",
    //Accent
    color3: "#FFC947",
    //Background
    bgColor: "#11041E",
    //Surfaces
    surfaceColor: "#1F1F1F",
    //Text
    textColor: "#FFFFFF",
    //White
    textDisabled: "#BDBDBD"
  }

  //STATES
  const [theme, setTheme] = useState('light');
  const [language, setLanguage] = useState('en');
  const [user, setUser] = useState(null);
  //--dashboard
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [sidebarExpanded, setSidebarExpanded] = useState(false);

  const toggleSidebar = (val) => {
    setSidebarVisible(val);
  }
  
  //RETURN
  return (
    <AppGlobalsContext.Provider
      value={{
        //Theme Config
        LightTheme,
        DarkTheme,

        //Config
        theme,
        setTheme,
        language,
        setLanguage,
        user,
        setUser,

        //Dashboard
        sidebarVisible,
        sidebarExpanded,
        toggleSidebar,
      }}
    >
      {children}
    </AppGlobalsContext.Provider>
  );
}


export { AppGlobalsContext, AppGlobalsProvider };
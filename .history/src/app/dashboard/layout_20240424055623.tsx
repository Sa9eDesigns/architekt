"use client";

import * as React from "react";
import Box from "@mui/joy/Box";

import Sidebar from "./_ui/Sidebar";

import { AppGlobalsContext } from "@/contexts/AppGlobalsContext";
import { Sheet } from "@mui/joy";

import { useGlobalStore } from "@/stores/globalStoreProvider";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  //LOCAL STORAGE
  const currentTheme = localStorage.getItem("darkMode");

  //STATES
  const { toggleTheme, toggleSidebar, theme, sidebarOpen } = useGlobalStore(
    (state) => state
  );

  //CONTEXT
  const {
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
  } = React.useContext(AppGlobalsContext);

  //EFFECTS
  React.useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [darkMode]);
  //--toggle the Sidebar "visibility to false" if the url matches these routes
  React.useEffect(() => {
    const hideSidebarRoutes = [
      "/dashboard/pages/edit",
      "/dashboard/pages/edit/:pageId",
    ];

    //use regex to check if the current url matches the hideSidebarRoutes
    const hideSidebar = hideSidebarRoutes.some((route) =>
      new RegExp(route).test(window.location.pathname)
    );

    //set sidebar visibility
    toggleSidebar(!hideSidebar);
  }, [window.location.pathname]);

  return (
    <Sheet>
      <Box sx={{ display: "flex", height: "100vh", overflow: "hidden" }}>
        {
          //Sidebar Visibility
          sidebarVisible && (
            <>
              <Sidebar />
            </>
          )
        }

        <Box
          component="main"
          className="MainContent"
          sx={{
            //No Padding When Sidebar is Hidden
            px: !sidebarVisible ? 0 : { xs: 2, md: 6 },
            pt: !sidebarVisible
              ? 0
              : {
                  xs: "calc(12px + var(--Header-height))",
                  sm: "calc(12px + var(--Header-height))",
                  md: 3,
                },
            pb: !sidebarVisible ? 0 : { xs: 2, sm: 2, md: 3 },
            flex: 1,
            display: "flex",
            flexDirection: "column",
            minWidth: 0,
            height: "100vh",
            gap: 1,
          }}
        >
          {children}
        </Box>
      </Box>
    </Sheet>
  );
}

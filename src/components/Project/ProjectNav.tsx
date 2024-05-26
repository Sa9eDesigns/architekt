"use client";
/*ProjectNav
- This component is a sidebar that displays the navigation items for the current Project.
- It is used in the ProjectLayout component.
- It uses the useRouter hook from next/navigation to navigate to different routes.
*/

import * as React from "react";
import GlobalStyles from "@mui/joy/GlobalStyles";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Divider from "@mui/joy/Divider";
import IconButton from "@mui/joy/IconButton";
import Input from "@mui/joy/Input";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemButton, { listItemButtonClasses } from "@mui/joy/ListItemButton";
import ListItemContent from "@mui/joy/ListItemContent";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import { motion } from "framer-motion";
import { Icon, IconifyIcon } from "@iconify/react";
import {
  DialogTitle,
  DialogActions,
  DialogContent,
  ModalDialog,
  Modal,
  Stack,
} from "@mui/joy";
import { useRouter } from "next/navigation";
import { useHover } from "ahooks";
import Link from "next/link";
import { Url } from "next/dist/shared/lib/router/router";

//COMPONENTS
//--Nested List Toggler
interface TogglerProps {
  defaultExpanded?: boolean;
  renderToggle: ({
    open,
    setOpen,
  }: {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  }) => React.ReactNode;
  children: React.ReactNode;
}

function Toggler({
  defaultExpanded = false,
  renderToggle,
  children,
}: TogglerProps) {
  const [open, setOpen] = React.useState(defaultExpanded);
  return (
    <React.Fragment>
      {renderToggle({ open, setOpen })}
      <Box
        sx={{
          display: "grid",
          gridTemplateRows: open ? "1fr" : "0fr",
          transition: "0.2s ease",
          "& > *": {
            overflow: "hidden",
          },
        }}
      >
        {children}
      </Box>
    </React.Fragment>
  );
}

//--Menu Item
interface MenuItemProps {
  item: {
    title: string | React.ReactNode | null;
    icon?: string | IconifyIcon;
    link?: string;
  };
  expanded?: boolean;
}

function MenuItem({ item, expanded}: MenuItemProps) {

  const router = useRouter();

  const handleNav = (link: string) => {
    router.push(link);
  };

  return (
    <>
      {expanded ? (
        <ListItem>
          <ListItemButton
            onClick={() => {
              handleNav(item.link);
            }}
          >
            <Icon
              icon={item.icon ? item.icon : "eva:file-text-outline"}
              width={27}
              height={27}
            />
            <ListItemContent>
              <Typography level="title-sm">{item.title}</Typography>
            </ListItemContent>
          </ListItemButton>
        </ListItem>
      ) : (
        <IconButton
         sx={{
            color: "var(--joy-palette-text-primary)",
            "&:hover": {
              backgroundColor: "var(--joy-palette-background-secondary)",
              color: "var(--joy-palette-text-primary)",
            },
         }}
          onClick={() => {
            handleNav(item.link);
          }}
        >
          <Icon
            icon={item.icon ? item.icon : "eva:file-text-outline"}
            width={25}
            height={25}
          />
        </IconButton>
      )}
    </>
  );
}

//--Nested Menu Item
interface NestedMenuItemProps {
  item: {
    title: string | React.ReactNode | null;
    icon?: string | IconifyIcon;
    link?: string | Url;
    nested?: { title: string; link: string }[];
  };
  expanded?: boolean;
}

function NestedMenuItem({ item, expanded }: NestedMenuItemProps) {

  //CONSTANTS
  const router = useRouter();

  const handleNav = (link: string) => {
    router.push(link)
  }

  
  return (
    <>
      {expanded ? (
        <ListItem nested>
          <Toggler
            renderToggle={({ open, setOpen }) => (
              <ListItemButton onClick={() => setOpen(!open)}>
                <Icon
                  icon={item.icon ? item.icon : "eva:file-text-outline"}
                  width={27}
                  height={27}
                />
                <ListItemContent>
                  <Typography level="title-sm">{item.title}</Typography>
                </ListItemContent>
                <Icon
                  icon="eva:arrow-ios-downward-outline"
                  width="24"
                  height="24"
                />
              </ListItemButton>
            )}
          >
            
            <List sx={{ gap: 0.5 }}>
              {item.nested?.map((nestedItem) => (
                <ListItem
                  sx={{ mt: 0.5 }}
                  key={nestedItem.title}
                  onClick={() => {
                    /* navigate(nestedItem.link) */
                    handleNav(nestedItem.link)
                  }}
                >
                  <ListItemButton>{nestedItem.title}</ListItemButton>
                </ListItem>
              ))}
            </List>
            
          </Toggler>
        </ListItem>
      ) : (
        <IconButton
          onClick={() => {
            /* navigate(item.link) */
          }}
        >
          <Icon
            icon={item.icon ? item.icon : "eva:file-text-outline"}
            width={25}
            height={25}
          />
        </IconButton>
      )}
    </>
  );
}

export default function ProjectNav() {
  //CONSTANTS
  const router = useRouter();
  const expandedNavWidth = 220;
  const collapsedNavWidth = 56;
  const menuRef = React.useRef(null);
  const isHovering = useHover(menuRef);

  //STATES
  //--app states
  const [open, setOpen] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [isExpanded, setIsExpanded] = React.useState(false);
  //--dialog states
  const [openLogoutDialog, setOpenLogoutDialog] = React.useState(false);
  const [projectID, setProjectID] = React.useState("");

  //FUNCTIONS
  //--get the Current User from local storage
  function getCurrentUser() {
    //get the current user from local storage as a string
    const user_str = localStorage.getItem("currentUser");
    //parse the user string to an object
    const user = JSON.parse(user_str ? user_str : "{}");
    //set the current user to the parsed object
    setCurrentUser(user);
  }
  

  const NavigationItems = [
    {
      title: "Components",
      icon: "fluent:border-none-20-regular",
      link: `/dashboard/project/${projectID}/custom-components`,
    },
    {
      title: "Pages",
      icon: "eva:file-text-outline",
      link: `/dashboard/project/${projectID}/pages`,
    },
    {
      title: "Database",
      icon: "fluent:database-20-regular",
      link: `/dashboard/project/${projectID}/database`,
    },
    {
      title: "App Variables",
      icon: "fluent:braces-variable-48-filled",
      link: `/dashboard/project/${projectID}/variables`,
    },
    {
      title: "External APIs",
      icon: "fluent:plug-connected-settings-20-regular",
      link: `/dashboard/project/${projectID}/apis`,
    },
    {
      title: "Media",
      icon: "fluent:image-20-regular",
      link: `/dashboard/project/${projectID}/media`,
    },
    {
      title: "Custom Code",
      icon: "fluent:code-20-regular",
      link: `/dashboard/project/${projectID}/code`,
    },
    {
      title: "Theming",
      icon: "fluent:color-24-regular",
      link: `/dashboard/project/${projectID}/theme`,
      nested: [
        {
          title: "Colors",
          link: `/dashboard/project/${projectID}/theme/colors`,
        },
        {
          title: "Typography",
          link: `/dashboard/project/${projectID}/theme/typography`,
        },
        {
          title: "Spacing",
          link: `/dashboard/project/${projectID}/theme/spacing`,
        },
        {
          title: "Breakpoints",
          link: `/dashboard/project/${projectID}/theme/breakpoints`,
        },
        {
          title: "Primitive Elements",
          link: `/dashboard/project/${projectID}/theme/primitives`,
        },
      ],
    },
    {
      title: "Settings",
      icon: "fluent:settings-20-regular",
      link: `/dashboard/project/${projectID}/settings`,
      nested: [
        {
          title: "General",
          link: `/dashboard/project/${projectID}/settings/general`,
        },
        {
          title: "Members",
          link: `/dashboard/project/${projectID}/settings/members`,
        },
        {
          title: "Billing",
          link: `/dashboard/project/${projectID}/settings/billing`,
        },
        {
          title: "Integrations",
          link: `/dashboard/project/${projectID}/settings/integrations`,
        },
      ],
    },
  ];

  //--Log out the current user
  function logOutCurrentUser() {
    //remove the current user from local storage
    localStorage.removeItem("currentUser");

    //replace the current nav stack with the Home page
    router.replace("/");
  }

  function getProjectIDFromURL() {
    //get the project id from the url
    const url = window.location.pathname;
    const id = url.split("/")[3];
    //set the project id to the extracted id
    setProjectID(id);
  }

  //EFFECTS
  //--When Hovering over the Sidebar, expand it
  React.useEffect(() => {
    setIsExpanded(isHovering);
  }, [isHovering]);

  React.useEffect(() => {
    //getCurrentUser();
    getProjectIDFromURL();
  }, []);

  //RENDER
  return (
    <Sheet
      ref={menuRef}
      className="Sidebar"
      sx={{
        position: { xs: "fixed", md: "sticky" },
        transform: {
          xs: "translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1)))",
          md: "none",
        },
        transition: "transform 0.4s, width 0.4s",
        //zIndex: 10000,
        height: "100vh",
        width: {
          xs: "var(--Sidebar-width)",
          md: isExpanded ? `${expandedNavWidth}px` : `${collapsedNavWidth}px`,
        },
        top: 0,
        p: 0.5,
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        borderRight: "1px solid",
        borderColor: "divider",
      }}
    >
      <GlobalStyles
        styles={(theme) => ({
          ":root": {
            "--Sidebar-width": "220px",
            [theme.breakpoints.up("lg")]: {
              "--Sidebar-width": "240px",
            },
          },
        })}
      />
      <Box
        className="Sidebar-overlay"
        sx={{
          position: "fixed",
          zIndex: 9998,
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          opacity: "var(--SideNavigation-slideIn)",
          backgroundColor: "var(--joy-palette-background-backdrop)",
          transition: "opacity 0.4s",
          transform: {
            xs: "translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1) + var(--SideNavigation-slideIn, 0) * var(--Sidebar-width, 0px)))",
            lg: "translateX(-100%)",
          },
        }}
        //onClick={}
      />
      <Box sx={{ display: "flex", gap: 1, alignItems: isExpanded ? "center" : "flex-start" }}>
        {isExpanded ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Stack direction="row" gap={1}>
              <Box
                sx={{
                  width: "45px",
                  height: "45px",
                  borderRadius: "50%",
                  overflow: "hidden",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "var(--joy-palette-background-secondary)",
                }}
              >
                <img
                  src="/images/logo-md.png"
                  alt="Architekt"
                  style={{ width: "40px", height: "40px" }}
                />
              </Box>

              <Typography
                level="title-lg"
                sx={{
                  fontFamily: "var(--font-inno)",
                  color: "var(--joy-palette-text-primary)",
                  fontSize: "x-large",
                  padding: "0.5rem",
                }}
              >
                ARCHITEKT
              </Typography>
            </Stack>

            {/* <Input
              size="sm"
              startDecorator={
                <Icon
                  icon="eva:search-outline"
                  width="24"
                  height="24"
                  style={{ color: "var(--joy-palette-text-secondary)" }}
                />
              }
              placeholder="Search"
            /> */}
          </Box>
        ) : (
          <Box
            sx={{
              width: "45px",
              height: "45px",
              borderRadius: "50%",
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "var(--joy-palette-background-secondary)",
            }}
          >
            <img
              src="/images/logo-md.png"
              alt="Architekt"
              style={{ width: "40px", height: "40px" }}
            />
          </Box>
        )}
      </Box>

      <Box
        sx={{
          minHeight: 0,
          overflow: "hidden auto",
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          [`& .${listItemButtonClasses.root}`]: {
            gap: 1.5,
          },
          justifyContent: "flex-start",
          alignItems: "flex-start",
        }}
      >
        <List
          size="sm"
          sx={{
            gap: 1,
            "--List-nestedInsetStart": "40px",
            "--ListItem-radius": (theme) => theme.vars.radius.sm,
          }}
        >
          {NavigationItems.map((item) => {
            if (item.nested) {
              return (
                <NestedMenuItem key={item.title} item={item} expanded={isExpanded} />
              );
            }
            return <MenuItem key={item.title} item={item} expanded={isExpanded} />;
          })}
        </List>
      </Box>

      <Modal open={openLogoutDialog} onClose={() => setOpenLogoutDialog(false)}>
        <ModalDialog>
          <DialogTitle
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography level="title-md">Logout</Typography>
            <IconButton onClick={() => setOpenLogoutDialog(false)}>
              <Icon icon="eva:close-outline" width="24" height="24" />
            </IconButton>
          </DialogTitle>
          <Divider />

          <DialogContent
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              p: 2,
            }}
          >
            <Typography level="body-md">
              Are you sure you want to logout?
            </Typography>
          </DialogContent>
          <Divider />

          <DialogActions
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              gap: 2,
              p: 2,
            }}
          >
            <Button
              variant="outlined"
              color="neutral"
              onClick={() => setOpenLogoutDialog(false)}
            >
              Cancel
            </Button>
            <Button
              variant="solid"
              color="danger"
              onClick={() => logOutCurrentUser()}
            >
              Logout
            </Button>
          </DialogActions>
        </ModalDialog>
      </Modal>
    </Sheet>
  );
}

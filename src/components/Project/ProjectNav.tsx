'use client'
/*ProjectNav
- This component is a sidebar that displays the navigation items for the current Project.
- It is used in the ProjectLayout component.
- It uses the useRouter hook from next/navigation to navigate to different routes.
*/

import * as React from 'react';
import GlobalStyles from '@mui/joy/GlobalStyles';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import IconButton from '@mui/joy/IconButton';
import Input from '@mui/joy/Input';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemButton, { listItemButtonClasses } from '@mui/joy/ListItemButton';
import ListItemContent from '@mui/joy/ListItemContent';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import { DialogTitle, DialogActions, DialogContent, ModalDialog, Modal } from '@mui/joy';
import { useRouter } from 'next/navigation'


function Toggler({
  defaultExpanded = false,
  renderToggle,
  children,
}: {
  defaultExpanded?: boolean;
  renderToggle: ({ open, setOpen }: { open: boolean; setOpen: React.Dispatch<React.SetStateAction<boolean>> }) => React.ReactNode;
  children: React.ReactNode;
}) {
  const [open, setOpen] = React.useState(defaultExpanded);
  return (
    <React.Fragment>
      {renderToggle({ open, setOpen })}
      <Box
        sx={{
          display: 'grid',
          gridTemplateRows: open ? '1fr' : '0fr',
          transition: '0.2s ease',
          '& > *': {
            overflow: 'hidden',
          },
        }}
      >
        {children}
      </Box>
    </React.Fragment>
  );
}

const NavigationItems = [
  {
    title: 'Overview',
    icon: 'eva:home-outline',
    link: '/dashboard/',
  },
  {
    title: 'Pages',
    icon: 'eva:file-text-outline',
    link: '/dashboard/pages',
  },
  {
    title: 'Blog',
    icon: 'eva:book-open-outline',
    link: '/dashboard/blog',
  },
  {
    title: 'Content',
    icon: 'eva:folder-outline',
    link: '/dashboard/content',
  },
  {
    title: 'Appearance',
    icon: 'eva:grid-outline',
    link: '/dashboard/appearance',
    nested: [
      {
        title: 'Menus',
        link: '/dashboard/menu',
      },
      {
        title: 'Footer',
        link: '/dashboard/footer',
      },
      {
        title: 'Customizer',
        link: '/dashboard/customizer',
      },
    ],
  },
  {
    title: 'Files',
    icon: 'eva:file-text-outline',
    link: '/dashboard/files',
  },
  {
    title: 'Team',
    icon: 'eva:people-outline',
    link: '/dashboard/team',
  },
];

export default function ProjectNav() {
  //CONSTANTS
  const router = useRouter();

  //CONTEXT
  //STATES
  //--app states
  const [open, setOpen] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  //--dialog states
  const [openLogoutDialog, setOpenLogoutDialog] = React.useState(false);

  //FUNCTIONS
  //--get the Current User from local storage
  function getCurrentUser() {
    //get the current user from local storage as a string
    const user_str = localStorage.getItem('currentUser');
    //parse the user string to an object
    const user = JSON.parse(user_str ? user_str : '{}');
    //set the current user to the parsed object
    setCurrentUser(user);
  }

  //--Log out the current user
  function logOutCurrentUser() {
    //remove the current user from local storage
    localStorage.removeItem('currentUser');

    //replace the current nav stack with the Home page
    router.replace('/');
  }

  //EFFECTS
  //--get the Current User from local storage
  React.useEffect(() => {
    getCurrentUser();
  }, []);

  //--get and set Settings from the user data

  //RENDER
  return (
    <Sheet
      className="Sidebar"
      sx={{
        position: { xs: 'fixed', md: 'sticky' },
        transform: {
          xs: 'translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1)))',
          md: 'none',
        },
        transition: 'transform 0.4s, width 0.4s',
        //zIndex: 10000,
        height: '100vh',
        width: 'var(--Sidebar-width)',
        top: 0,
        p: 2,
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        borderRight: '1px solid',
        borderColor: 'divider',
      }}
    >
      <GlobalStyles
        styles={(theme) => ({
          ':root': {
            '--Sidebar-width': '220px',
            [theme.breakpoints.up('lg')]: {
              '--Sidebar-width': '240px',
            },
          },
        })}
      />
      <Box
        className="Sidebar-overlay"
        sx={{
          position: 'fixed',
          zIndex: 9998,
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          opacity: 'var(--SideNavigation-slideIn)',
          backgroundColor: 'var(--joy-palette-background-backdrop)',
          transition: 'opacity 0.4s',
          transform: {
            xs: 'translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1) + var(--SideNavigation-slideIn, 0) * var(--Sidebar-width, 0px)))',
            lg: 'translateX(-100%)',
          },
        }}
        //onClick={}
      />
      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
        <Box
          sx={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'var(--joy-palette-background-secondary)',
          }}
          
        >
        <img
          src="/images/logo-md.png"
          alt="Architekt"
          style={{ width: '32px', height: '32px' }}
        />
        </Box>
        <Typography
          level="title-lg"
          sx={{
            fontFamily: 'var(--font-inno)',
            color: 'var(--joy-palette-text-primary)',
            fontSize: 'x-large',
          }}
        >
          ARCHITEKT
        </Typography>
      </Box>
      <Input
        size="sm"
        startDecorator={
          <Icon
            icon="eva:search-outline"
            width="24"
            height="24"
            style={{ color: 'var(--joy-palette-text-secondary)' }}
          />
        }
        placeholder="Search"
      />
      <Box
        sx={{
          minHeight: 0,
          overflow: 'hidden auto',
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          [`& .${listItemButtonClasses.root}`]: {
            gap: 1.5,
          },
        }}
      >
        <List
          size="sm"
          sx={{
            gap: 1,
            '--List-nestedInsetStart': '30px',
            '--ListItem-radius': (theme) => theme.vars.radius.sm,
          }}
        >
          {NavigationItems.map((item) => {
            if (!item.nested) {
              return(
              <ListItem>
                <ListItemButton onClick={() => router.push(item.link)}>
                  <Icon icon={item.icon} width="24" height="24" />
                  <ListItemContent>
                    <Typography level="title-sm">{item.title}</Typography>
                  </ListItemContent>
                </ListItemButton>                
              </ListItem>
              )
            }
            return (
              <ListItem nested>
                <Toggler
                  renderToggle={({ open, setOpen }) => (
                    <ListItemButton onClick={() => setOpen(!open)}>
                      <Icon icon={item.icon} width="24" height="24" />
                      <ListItemContent>
                        <Typography level="title-sm">{item.title}</Typography>
                      </ListItemContent>
                      <Icon icon="eva:arrow-ios-downward-outline" width="24" height="24" />
                    </ListItemButton>
                  )}
                >
                  <List sx={{ gap: 0.5 }}>
                    {item.nested?.map((nestedItem) => (
                      <ListItem sx={{ mt: 0.5 }} key={nestedItem.title} onClick={() => {
                        /* navigate(nestedItem.link) */
                        }}
                      >
                        <ListItemButton>{nestedItem.title}</ListItemButton>
                      </ListItem>
                    ))}
                  </List>
                </Toggler>
              </ListItem>
            );
          })}
        </List>
      </Box>

      <Modal open={openLogoutDialog} onClose={() => setOpenLogoutDialog(false)}>
      <ModalDialog>
        <DialogTitle
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
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
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            p: 2,
          }}
        >
          <Typography level="body-md">Are you sure you want to logout?</Typography>
        </DialogContent>
        <Divider />

        <DialogActions
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            gap: 2,
            p: 2,
          }}
        >
          <Button variant="outlined" color="neutral" onClick={() => setOpenLogoutDialog(false)}>
            Cancel
          </Button>
          <Button variant="solid" color="danger" onClick={() => logOutCurrentUser()}>
            Logout
          </Button>
        </DialogActions>
      </ModalDialog>
      </Modal>
    </Sheet>
  );
}

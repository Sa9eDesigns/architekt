'use client'

import * as React from 'react';
import { useColorScheme } from '@mui/joy/styles';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import IconButton from '@mui/joy/IconButton';
import Stack from '@mui/joy/Stack';
import Avatar from '@mui/joy/Avatar';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import Tooltip from '@mui/joy/Tooltip';
import Dropdown from '@mui/joy/Dropdown';
import Menu from '@mui/joy/Menu';
import MenuButton from '@mui/joy/MenuButton';
import MenuItem from '@mui/joy/MenuItem';
import ListDivider from '@mui/joy/ListDivider';
import Drawer from '@mui/joy/Drawer';
import ModalClose from '@mui/joy/ModalClose';
import DialogTitle from '@mui/joy/DialogTitle';
import { Icon, InlineIcon } from '@iconify/react';
import { useRouter } from 'next/router';
import Navigation from './Navigation';
import { useAIStore } from '@/stores/useAIStoreProvider';

function ColorSchemeToggle() {
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return <IconButton size="sm" variant="outlined" color="primary" />;
  }
  return (
    <Tooltip title="Change theme" variant="outlined">
      <IconButton
        id="toggle-mode"
        size="sm"
        variant="plain"
        color="neutral"
        sx={{ alignSelf: 'center' }}
        onClick={() => {
          if (mode === 'light') {
            setMode('dark');
          } else {
            setMode('light');
          }
        }}
      >
        {mode === 'light' ? <Icon icon="radix-icons:moon" /> : <Icon icon="radix-icons:sun" />}
      </IconButton>
    </Tooltip>
  );
}

export default function Header() {

  //CONSTANTS
  const router = useRouter();

  //CONTEXT
  const isAssistantVisible = useAIStore((state) => state.isAssistantVisible);
  const assignAssistantVisibility = useAIStore(
    (state) => state.assignAssistantVisibility
  );

  //STATES
  const [open, setOpen] = React.useState(false);

  //FUNCTIONS
  const toggleAssistant = () => {
    assignAssistantVisibility(!isAssistantVisible);
  };

  const handleDashboardNavigation = (route: string) => {
    //If we are already on the route, we don't want to navigate to the same route
    if (router.pathname === route) return;
    router.push(route);
  }
  
  return (
    <Box
      sx={{
        display: 'flex',
        flexGrow: 1,
        justifyContent: 'space-between',
        px: 2,
        py: 1,
        gap: 1.5,
        bgcolor: 'background.level0',
        boxShadow: 'sm',
        zIndex: '9999',
      }}
    >
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={1}
        sx={{ display: { xs: 'none', sm: 'flex' } }}
      >
        <IconButton
          size="md"
          variant="outlined"
          color="neutral"
          sx={{
            display: { xs: 'none', sm: 'inline-flex' },
            borderRadius: '50%',
          }}
        >
          <img src="/images/logo-md.png" alt="Joy UI" />
        </IconButton>
        <Button
          variant="plain"
          color="neutral"
          size="sm"
          sx={{ alignSelf: 'center' }}
          component="a"
          onClick={() => handleDashboardNavigation('/dashboard/all-projects/')}
        >
          Projects
        </Button>
        <Button
          variant="plain"
          color="neutral"
          component="a"
          size="sm"
          sx={{ alignSelf: 'center' }}
          onClick={() => handleDashboardNavigation('/dashboard/organization/')}
        >
          Organization
        </Button>
        <Button
          variant="plain"
          color="neutral"
          aria-pressed="true"
          component="a"
          size="sm"
          sx={{ alignSelf: 'center' }}
          onClick={() => handleDashboardNavigation('/dashboard/settings/')}
        >
          Settings
        </Button>
      </Stack>
      <Box sx={{ display: { xs: 'inline-flex', sm: 'none' } }}>
        <IconButton variant="plain" color="neutral" onClick={() => setOpen(true)}>
        <Icon icon="radix-icons:hamburger-menu" />
        </IconButton>
        <Drawer
          sx={{ display: { xs: 'inline-flex', sm: 'none' } }}
          open={open}
          onClose={() => setOpen(false)}
        >
          <ModalClose />
          <DialogTitle>Architekt</DialogTitle>
          <Box sx={{ px: 1 }}>
            <Navigation />
          </Box>
        </Drawer>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: 1.5,
          alignItems: 'center',
        }}
      >
        <Input
          size="sm"
          variant="outlined"
          placeholder="Search anything…"
          startDecorator={<Icon icon="radix-icons:magnifying-glass" />}
          endDecorator={
            <IconButton
              variant="outlined"
              color="neutral"
              sx={{ bgcolor: 'background.level1' }}
            >
              <Typography level="title-sm" textColor="text.icon">
                ⌘ K
              </Typography>
            </IconButton>
          }
          sx={{
            alignSelf: 'center',
            display: {
              xs: 'none',
              sm: 'flex',
            },
          }}
        />
        <IconButton
          size="sm"
          variant="outlined"
          color="neutral"
          sx={{ display: { xs: 'inline-flex', sm: 'none' }, alignSelf: 'center' }}
        >
          <Icon icon="radix-icons:magnifying-glass" />
        </IconButton>
        <Tooltip title="Toggle Assistant" variant="outlined">
          <IconButton
            size="sm"
            variant={isAssistantVisible ? 'solid' : 'outlined'}
            color={isAssistantVisible ? 'primary' : 'neutral'}
            component="a"
            onClick={toggleAssistant}
            sx={{ alignSelf: 'center' }}
          >
            <InlineIcon icon={isAssistantVisible ? 'fluent:bot-sparkle-24-filled' : 'fluent:bot-sparkle-20-regular'} />
          </IconButton>
        </Tooltip>
        <ColorSchemeToggle />
        <Dropdown>
          <MenuButton
            variant="plain"
            size="sm"
            sx={{ maxWidth: '32px', maxHeight: '32px', borderRadius: '9999999px' }}
          >
            <Avatar
              src="https://i.pravatar.cc/40?img=2"
              srcSet="https://i.pravatar.cc/80?img=2"
              sx={{ maxWidth: '32px', maxHeight: '32px' }}
            />
          </MenuButton>
          <Menu
            placement="bottom-end"
            size="sm"
            sx={{
              zIndex: '99999',
              p: 1,
              gap: 1,
              '--ListItem-radius': 'var(--joy-radius-sm)',
            }}
          >
            <MenuItem>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <Avatar
                  src="https://i.pravatar.cc/40?img=2"
                  srcSet="https://i.pravatar.cc/80?img=2"
                  sx={{ borderRadius: '50%' }}
                />
                <Box sx={{ ml: 1.5 }}>
                  <Typography level="title-sm" textColor="text.primary">
                    Thando Zondo
                  </Typography>
                  <Typography level="body-xs" textColor="text.tertiary">
                    sa9e@Architekt.app
                  </Typography>
                </Box>
              </Box>
            </MenuItem>
            <ListDivider />
            <MenuItem
              onClick={() => {
                handleDashboardNavigation('/docs/');
              }}
            >
            <Icon icon="radix-icons:info-circled" />
              Help
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleDashboardNavigation('/dashboard/settings/');
              }}
            >
            <Icon icon="radix-icons:gear" />
              Settings
            </MenuItem>
            <ListDivider />
            <MenuItem component="a" 
            onClick={() => {
              handleDashboardNavigation('/dashboard/Profile/');
            }}
            >
              Profile 
              <Icon icon="fluent:person-28-filled" />
            </MenuItem>
            <MenuItem
              component="a"
              onClick={() => {
                handleDashboardNavigation('/dashboard/Billing/');
              }}
            >
              Billing
              <Icon icon="fluent:payment-28-filled " />
            </MenuItem>
            <ListDivider />
            <MenuItem>
            <Icon icon="radix-icons:exit" />
              Log out
            </MenuItem>
          </Menu>
        </Dropdown>
      </Box>
    </Box>
  );
}
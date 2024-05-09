import {
  Box,
  Button,
  Container,
  IconButton,
  Typography,
  useColorScheme,
} from '@mui/joy';
import { Icon } from '@iconify/react';

const config = {
  id: "header_1",
  title: "Header 1",
  description: "A simple header with a logo, navigation links, and a call to action button.",
}

interface NavLinkProps {
  href: string;
  isActive?: boolean;
  hasDropdown?: boolean;
  isExternal?: boolean;
  children: React.ReactNode;
}

function NavLink({
  href,
  isActive,
  hasDropdown,
  isExternal,
  children,
}: NavLinkProps) {
  return (
    <Button
      variant="text"
      component="a"
      href={href}
      color={isActive ? 'primary' : 'inherit'}
      sx={{
        color: 'inherit',
        textDecoration: 'none',
        '&:hover': {
          color: 'primary',
        },
      }}
    >
      {children}
      {hasDropdown && (
        <Icon icon="bi:chevron-down" style={{ marginLeft: '0.5rem' }} />
      )}
      {isExternal && (
        <Icon icon="bi:box-arrow-up-right" style={{ marginLeft: '0.5rem' }} />
      )}
    </Button>
  );
}


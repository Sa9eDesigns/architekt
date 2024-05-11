import React from 'react';
import {
  Box,
  Button,
  Container,
  IconButton,
  Typography,
  useColorScheme,
} from '@mui/joy';
import { Icon } from '@iconify/react';
import {css} from '@emotion/react';
import GridItem from '@/components/Modules/Editors/LayoutEditor/gridItemContainer';
//import { useEditor } from '@/hooks/useEditor';
//import { EditableComponent } from '@/types';
const config = {
  id: "header_1",
  title: "Header 1",
  description: "A simple header with a logo, navigation links, and a call to action button.",
}

/* 
A Header Component Usually consists of The following:
- Logo
- Navigation Links
- Call to Action Button

We Need to create each of the components separately and then combine them into a single component.
Also, Since the component is "EditableComponent" we need to 
*/

//INTERFACE DEFINITIONS
interface NavLinkProps {
  href: string;
  isActive?: boolean;
  hasDropdown?: boolean;
  isExternal?: boolean;
  children: React.ReactNode;
  style?: React.CSSProperties;
}

interface LogoProps {
  src: string;
  alt: string;
  style?: React.CSSProperties;
}

interface CallToActionProps {
  href: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
  //since this an MUI button - Its aa good idea to an Object of ButtonProps
  buttonProps?: React.ComponentProps<typeof Button>;
}

interface Header1Props {
  logo: LogoProps;
  navLinks: NavLinkProps[];
  callToAction: CallToActionProps;
  style?: React.CSSProperties;
  editable?: EditableComponent;
}

//COMPONENTS
function Logo({ src, alt, style }: LogoProps) {
  return <img src={src} alt={alt} style={style} />;
}

function CallToAction({ href, children, style, buttonProps }: CallToActionProps) {
  //Quick Note on How Interactivity is Handled
  /*Since Architekt is No-Code Platform - We will be using a specialized Node-editor to handle interactivity 
  onClick, onHover.
  - Editor will return a set of Actions that will be listened to by the component and thus the component will be able to perform the actions.
  *E.G: the CallToAction Button should trigger a Share to Social Media Action - The Editor will return the Action and the Component will listen to the action and thus perform the action when the button is clicked.
  to do this we create a custom hook that listens to interactivity actions and then performs the actions.
  */
 
  return (
    <Button
      variant="solid"
      color="primary"
      sx={{ borderRadius: '9999px', ...style }}
      //Event Handlers 
      
    >
      {children}
    </Button>
  );
}

function Header1({ logo, navLinks, callToAction, style, editable }: Header1Props) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', ...style }}>
      <Logo {...logo} />
      <Box sx={{ display: 'flex', gap: 2 }}>
        {navLinks.map((link) => (
          <NavLink {...link} key={link.href} />
        ))}
        <CallToAction {...callToAction} />
      </Box>
    </Box>
  );
}

export default Header1;



function NavLink({
  href,
  isActive,
  hasDropdown,
  isExternal,
  children,
}: NavLinkProps) {
  return (
    <Button
      variant="plain"
      component="a"
      href={href}
      color={isActive ? 'primary' : 'neutral'}
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

/* Lets Define the Jotai Atoms for the Header 
- we need to make sure that every component is individually editable and thus we need to create a Jotai Atom for each of the components.
*/



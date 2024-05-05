import React, { useRef, useCallback } from 'react';
import { useNode, useEditor } from '@craftjs/core';
import { ROOT_NODE } from '@craftjs/utils';
import { Icon } from '@iconify/react';
import ReactDOM from 'react-dom';
import { 
  Box, 
  IconButton, 
  Sheet, 
  Stack, 
  Typography,
  Menu,
  MenuItem,
  MenuButton,
  MenuList,
  Button,
  Divider,
} from '@mui/joy';
//a hooks
import {
  useUpdateEffect,
  useClickAway,
} from 'ahooks'


/*====================
Toolbar
====================*/

//--ToolbarButton
const ToolbarButton: React.FC<{ icon: string; action: () => void }> = ({
  icon,
  action,
}) => {
  return (
    <IconButton
      size="sm"
      onClick={action}
      sx={{ color: 'white', backgroundColor: 'rgba(0,0,0,0.3)' }}
    >
      <Icon icon={icon} />
    </IconButton>
  );
};

//--Toolbar
/*This is the toolbar that is displayed on the component when it is selected
- It contains buttons for dnd, duplicate, delete, and edit actions
*/
const Toolbar: React.FC<{ actions: { [key: string]: () => void } }> = ({
  actions,
}) => {
  return (
    <Box
      sx={{
        position: 'absolute',
        top: -10,
        right: -10,
        display: 'flex',
        gap: 1,
        zIndex: 1,
      }}
    >
      {Object.entries(actions).map(([name, action]) => (
        <ToolbarButton key={name} icon={name} action={action} />
      ))}
    </Box>
  );
};

/*====================
ContextMenu
====================*/

//--ContextMenu
/*This is the context menu that is displayed on the component when it is right-clicked
- It contains buttons for dnd, duplicate, delete, and edit actions
*/
const ContextMenu: React.FC<{ actions: { [key: string]: () => void } }> = ({
  actions,
}) => {
  return (
    <Menu>
      <MenuButton>
        <IconButton size="sm" sx={{ color: 'white' }}>
          <Icon icon="eva:more-vertical-fill" />
        </IconButton>
      </MenuButton>
      <MenuList>
        {Object.entries(actions).map(([name, action]) => (
          <MenuItem key={name} onClick={action}>
            {name}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

/*====================
BaseComponent
====================*/

//--BaseComponent
/*
This is the base component used for creating the editor components.
- It is the render component for all the editor components
- it uses the useNode hook from craftjs to get the node of the component
- it has a toolbar for dnd, delete, and edit actions
- it has a context menu for the component

Toolbar Actions:
- Drag: Used to drag the component
- Duplicate: Used to duplicate the component
- Delete: Used to delete the component
- Edit: Used to edit the component

ContextMenu Actions:
- Drag: Used to drag the component
- Duplicate: Used to duplicate the component
- Delete: Used to delete the component
- Edit: Used to edit the component
*/

type BaseComponentProps = {
  children: React.ReactNode;
};

const BaseComponent: React.FC<BaseComponentProps> = ({ children }) => {

  //CRAFTJS
  //--editor
  const { actions, query } = useEditor();
  //--node
  const { id, connectors: { connect, drag } } = useNode((node) => ({
    id: node.id,
  }));

  //STATE
  //--isContextMenuOpen
  const [isContextMenuOpen, setIsContextMenuOpen] = React.useState(false);
  //--contextMenuPosition
  const [contextMenuPosition, setContextMenuPosition] = React.useState({ x: 0, y: 0 });

  //REF
  //--contextMenuRef
  const contextMenuRef = useRef(null);

  //HANDLERS
  //--handleContextMenu
  const handleContextMenu = useCallback((e) => {
    e.preventDefault();
    setIsContextMenuOpen(true);
    setContextMenuPosition({ x: e.clientX, y: e.clientY });
  }, []);

  //--handleCloseContextMenu
  const handleCloseContextMenu = useCallback(() => {
    setIsContextMenuOpen(false);
  }, []);

  //EFFECTS
  //--useUpdateEffect
  useUpdateEffect(() => {
    if (isContextMenuOpen) {
      useClickAway(() => {
        setIsContextMenuOpen(false);
      }, contextMenuRef);
    }
  }, [isContextMenuOpen]);

  //ACTIONS
  //--dnd
  const dnd = () => {
    drag();
  };

  //--duplicate
  const duplicate = () => {
    //get the node
    const newNode = query.node(id).get();

    //clone the node
    actions.add(newNode, ROOT_NODE);
  };

  //--delete
  const deleteComponent = () => {
    const newNode = query.node(id).get();
    actions.delete(newNode.id);
  };

  //--edit
  const edit = () => {
    console.log('Edit');
  };

  return (
    <Box
      ref={(ref) => connect(drag(ref))}
      sx={{ position: 'relative' }}
      onContextMenu={handleContextMenu}
    >
      {children}
      <Toolbar
        actions={{
          'eva:move': dnd,
          'eva:copy': duplicate,
          'eva:trash-2': deleteComponent,
          'eva:edit': edit,
        }}
      />
      {isContextMenuOpen && (
        <ContextMenu
          actions={{
            'Drag': dnd,
            'Duplicate': duplicate,
            'Delete': deleteComponent,
            'Edit': edit,
          }}
        />
      )}
    </Box>
  );
};

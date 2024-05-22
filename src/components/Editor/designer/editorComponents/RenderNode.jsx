/*This Is The Editor Component Which Will Be Used To Render The Node
All Editor Components Will Be Wrapped Inside This Component*/

import { useNode, useEditor } from '@craftjs/core';
import { ROOT_NODE } from '@craftjs/utils';
import { Icon } from '@iconify/react';
import React, { useEffect, useRef, useCallback } from 'react';
import ReactDOM from 'react-dom';
import { ComponentActions } from './ComponentActions';
import { Box, Sheet, Stack, Typography } from '@mui/joy';

export const RenderNode = ({ render }) => {
  const { id } = useNode();
  const { actions, query, isActive } = useEditor((_, query) => ({
    isActive: query.getEvent('selected').contains(id),
  }));

  const {
    isHover,
    dom,
    name,
    moveable,
    deletable,
    connectors: { drag },
    parent,
  } = useNode((node) => ({
    isHover: node.events.hovered,
    dom: node.dom,
    name: node.data.custom.displayName || node.data.displayName,
    moveable: query.node(node.id).isDraggable(),
    deletable: query.node(node.id).isDeletable(),
    parent: node.data.parent,
    props: node.data.props,
  }));

  const currentRef = useRef();

  //Add Selected Class To The Node
  useEffect(() => {
    if (dom) {
      if (isActive || isHover) dom.classList.add('component-selected');
      else dom.classList.remove('component-selected');
    }
  }, [dom, isActive, isHover]);

  //Get The Position Of The Node
  const getPos = useCallback((dom) => {
    const { top, left, bottom } = dom
      ? dom.getBoundingClientRect()
      : { top: 0, left: 0, bottom: 0 };
    return {
      top: `${top > 0 ? top : bottom}px`,
      left: `${left}px`,
    };
  }, []);

  //Scroll The Node Into View
  const scroll = useCallback(() => {
    const { current: currentDOM } = currentRef;

    if (!currentDOM) return;
    const { top, left } = getPos(dom);
    currentDOM.style.top = top;
    currentDOM.style.left = left;
  }, [dom, getPos]);


  useEffect(() => {
    document
      .querySelector('.craftjs-renderer')
      .addEventListener('scroll', scroll);

    return () => {
      document
        .querySelector('.craftjs-renderer')
        .removeEventListener('scroll', scroll);
    };
  }, [scroll]);

  /*On Currently Selected Node Renderer
  - If the node is in focus/selected then this component Will be rendered
  - It Show the Node Name and Actions above the selected node
  - A solid border will be shown around the selected node
  */
  function OnNodeSelected() {
    return (
      <Stack 
      direction={'row'}
      alignItems={'center'}
      spacing={1}
      sx={{
        position: 'absolute',
        top: '-40px',
        right: '10px',
        zIndex: 9999,
        borderRadius: '5px',
        padding: '5px',
        display: 'flex',
        alignItems: 'center',
      }}
      >
        <Typography
          level='title-sm'
          sx={{
            padding: '5px',
            borderRadius: '5px',
            backgroundColor: 'rgba(255,255,255,0.8)',
            color: '#000',
            fontWeight: 'bold',
            fontSize: '12px',
          }}
          >
            {name}
          </Typography>

        <ComponentActions />
      </Stack>
    );
  }

  /*On Hovered Node Renderer
  - If the node is hovered then this component Will be rendered
  - It Show the Node Name above the hovered node
  - A dashed border will be shown around the hovered node
  */
  function OnNodeHovered() {
    return (
      <Stack 
      direction={'row'}
      alignItems={'center'}
      spacing={1}
      sx={{
        position: 'absolute',
        top: '-40px',
        right: '10px',
        zIndex: 9999,
        borderRadius: '5px',
        padding: '5px',
        display: 'flex',
        alignItems: 'center',
      }}
      >
        <Typography
          level='title-sm'
          sx={{
            padding: '5px',
            borderRadius: '5px',
            backgroundColor: 'rgba(255,255,255,0.8)',
            color: '#000',
            fontWeight: 'bold',
            fontSize: '12px',
          }}
          >
            {name}
          </Typography>
      </Stack>
    );
  }

  return (
    <Box
      style={{
        cursor: moveable ? 'move' : 'default',
        position: 'relative',
        zIndex: isActive || isHover ? 100 : 'auto',
        border: isActive ? '1px solid rgb(179,77,77)' : isHover ? '1px dashed rgba(179,77,77,0.3)' : 'none',
      }}
    >
      {isActive && <OnNodeSelected />}
      {isHover && !isActive && <OnNodeHovered />}
      {render}
    </Box>
  );
};
import React from 'react';
import { Container } from './Container';
import { Resizer } from './Resizer';

export const ContainerSettings = () => {
  return (
    <Container
      background={{ r: 255, g: 255, b: 255, a: 1 }}
      color={{ r: 0, g: 0, b: 0, a: 1 }}
      flexDirection="column"
      alignItems="flex-start"
      justifyContent="flex-start"
      fillSpace="no"
      padding={['0', '0', '0', '0']}
      margin={['0', '0', '0', '0']}
      shadow={0}
      radius={0}
      width="100%"
      height="auto"
    >
      <Resizer
        propKey={{ width: 'width', height: 'height' }}
        style={{
          justifyContent: 'flex-start',
          flexDirection: 'column',
          alignItems: 'flex-start',
          background: 'rgba(255, 255, 255, 1)',
          color: 'rgba(0, 0, 0, 1)',
          padding: '0px 0px 0px 0px',
          margin: '0px 0px 0px 0px',
          boxShadow: 'none',
          borderRadius: '0px',
          flex: 'unset',
        }}
      >
        <div>Container Settings</div>
      </Resizer>
    </Container>
  );
};

Container.craft = {
  displayName: 'Container',
  rules: {
    canDrag: () => true,
  },
  related: {
    
  },
};
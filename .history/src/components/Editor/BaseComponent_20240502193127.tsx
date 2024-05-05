/*
Defines the base component that all other components will extend from.
- id: string, the unique identifier of the component
- name: string, the name of the component
- componentType: string, the type of the component
- props: object, the properties of the component
- ssx: object, the style properties of the component
- children: array, the children of the component
- ref: any, the reference to the component

The base component is responsible for rendering the component and its children.
*/

'use client'

import React from 'react'
import { useStore } from 'zustand'
import {useDraggable} from '@dnd-kit/core';
import { EditorStore } from '../../stores/editorStore'

//Component Types
export type BaseComponentProps = {
  id: string,
  name: string,
  componentType: string,
  props: object,
  ssx: object,
  children: Array<any>,
  ref: any,
}

//Component
const BaseComponent = (props: BaseComponentProps) => {
  
  //Get the component ref
  const ref = React.useRef(null)

  //Get the drag props
  const {attributes, listeners, setNodeRef} = useDraggable({
    id: props.id,
  });

  //Set the ref
  React.useEffect(() => {
    setNodeRef(ref.current)
  }, [ref.current])

  //Render the component
  return (
    <div
      ref={ref}
      {...attributes}
      {...listeners}
      style={props.ssx}
    >
      {props.children.map((child) => (
        <BaseComponent key={child.id} {...child} />
      ))}
    </div>
  )
}

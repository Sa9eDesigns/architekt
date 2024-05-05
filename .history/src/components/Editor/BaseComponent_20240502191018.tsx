/*
Defines the base component that all other components will extend from.
- id: string, the unique identifier of the component
- name: string, the name of the component
- type: string, the type of the component
- props: object, the properties of the component
- children: array, the children of the component (if any)
- parent: string, the parent of the component (if any)
- isRoot: boolean, whether the component is the root component

The base component is responsible for rendering the component and its children.
*/

'use client'

import React from 'react'
import { useStore } from 'zustand/vanilla'
import {useDraggable} from '@dnd-kit/core';

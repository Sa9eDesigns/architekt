'use client'
/*
This Defines the Editor Text Module
The Editor Text Module is responsible for managing the text component. 
*/

import React from 'react';
import { useNode } from '@craftjs/core';

const TextComponentConfig = {
  id: "text",
  name: "Text",
  description: "This component allows you to add text to your page.",
  preview: <div>Text</div>,
  settings:[
    {
      id: "text",
      name: "Text",
      icon: "Text",
    }
  ]
}
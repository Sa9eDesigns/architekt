/*This Defines the Primitive UI Element Store. It is a Zustand store that contains the state and actions for Primitive UI Elements related data.
--Primitive UI Elements are the basic building blocks of the application. They are the elements that are used to create the UI of the application. They can be buttons, text inputs, images, videos, or other types of elements.
*/

import { createStore } from "zustand/vanilla";

export interface I_PrimitiveElement {
  id?: string;
  name?: string;
  type?: string;
  properties?: {
    [key: string]: any;
  };
  actions?: any[];
  events?: any[];
  style?: {
    [key: string]: any;
  };
  layout?: {
    [key: string]: any;
  };
  data?: {
    [key: string]: any;
  };
  meta?: {
    [key: string]: any;
  };
  version?: number;
  isPrimary?: boolean;
  isContainer?: boolean;
  //Component that will be rendered
  component: {
    element: JSX.Element; //the element to be rendered
    props: {
      [key: string]: any;
    };
  }
}






/*
This Defines the List of Components that can be added to the Layout Editor
- They are Categories of Components
- Each Category Contains a List of Components
- Each Component Contains the reference to the Component and the Configuration
- This Only Contains the JSON Data for the Components

N.B. These are the Basic Components that are available in the Layout Editor
*/

//import the Editable Components
/* Basics 
Text | Image | Button | Divider
*/
import Text from "../../Components/Editable/Text";
import Image from "../../Components/Editable/Image";
import Button from "../../Components/Editable/Button";
import Divider from "../../Components/Editable/Divider";


//TYPES
type Component = {
  name: string,
  icon: string,
  component: any,
  configuration: any,
};

//COMPONENTS
export const components: Component[] = [
  {
    name: "Text",
    icon: "mdi:format-text",
    component: Text,
    configuration: {
      text: "text",
    },
  },
  {
    name: "Image",
    icon: "mdi:image",
    component: Image,
    configuration: {
      image: "image",
    },
  },
  {
    name: "Button",
    icon: "mdi:gesture-tap",
    component: Button,
    configuration: {
      button: "button",
    },
  },
  {
    name: "Divider",
    icon: "mdi:divider",
    component: Divider,
    configuration: {
      divider: "divider",
    },
  },
];
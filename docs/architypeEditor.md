## ArchiType Editor
This editor allows you to create and edit the Components that will be used to Build a Page or Layout.
It Provides Primitive Components that can be used to create more complex components. These are Pre-built HTML elements with some added functionality and styling.
These Components can be used to create a Component such as Blog Post Card, Navigation Bar, etc.

### React-Grid-Layout
The Main Component of the ArchiType Editor is the React-Grid-Layout. This Component is used to create the Layout of a component by arranging the Primitive Components within a resizable grid. This allows for a more flexible and responsive layout.

### Primitive Components
The Primitive Components are the basic building blocks of the ArchiType Editor. These Components are HTML elements styled with tailwind CSS. They can be further customized using the Properties Panel. 
Here a list of all the Primitive Components:
**Typography**
- Heading: Creates a Heading 
- Paragraph: Creates a Paragraph 
- Link: Creates a Link element 
  
**Layout**
Since we are using React-Grid-Layout, the Layout Components are not needed.

**Media**
- Image: Creates an Image element
- Video: Creates a Video element
- Audio: Creates an Audio element
- Iframe: Creates an Iframe element
- Embed: Creates an Embed element

**Form**
- Form Container: Creates a Form Container
- Input: Creates an Input element
- Textarea: Creates a Textarea element
- Button: Creates a Button element
- Checkbox: Creates a Checkbox element
- Radio: Creates a Radio element
- Select: Creates a Select element
   - Option: Creates an Option element | Configurable of the Select Properties Panel

With these Primitive Components, you can create more complex Components by combining them and customizing them using the Properties Panel.
E.g. You can create a Blog Post Card by combining an Image, Heading, Paragraph, and Link Components.

### Properties Panel
The Properties Panel is used to customize the Primitive Components. It allows you to change the properties of the Components such as Text, Color, Size, etc. This allows you to create a more personalized Component.
The Properties Include:
*Typography*
*Layout*
*Size*
*Borders*
*Background*
*Effects*
*Spacing*

### Saving and Exporting
Once you have created a Component, you can save it to the Library. This allows you to reuse the Component in other Projects. You can also export the Component as a JSON file. This JSON file can be imported into other Projects.
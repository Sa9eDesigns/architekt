**developer notes**
# Blocks
A Block is a reusable component that can be used to build a Page or Layout. It is a collection of Primitive Elements that are arranged in a grid system. Each of these Elements can be customized using the Properties Panel. 
When creating a new Block, the user will be prompted to name the Block and select a **Block Type**. The Block Type determines the behavior of the Block and the Elements that can be added to it. There are three types of Blocks:
- **Static**: These blocks are used to create static content that will not change. They are used to create elements such as Headers, Footers, and Sidebars. For example, a Header Block may contain a Logo, Navigation Menu, and Search Bar. These components will remain the same on every page.
- **Dynamic**: These blocks are used to create dynamic content that will change. They are used to create components such as Blog Posts, Product Listings, and News Feeds. For example, a Blog Post Block may contain a Title, Author, Date, and Content. These components will change depending on the Blog Post being displayed.
- **Form**: These blocks are used to create forms that can be used to collect user input. They are used to create components such as Contact Forms, Sign Up Forms, and Surveys. For example, a Contact Form Block may contain fields for Name, Email, and Message. These fields can be customized using the Properties Panel.

## Block Types
### Static Blocks
Static Blocks are used to create static content that will not change. They are used to create Components such as Headers, Footers, and Sidebars. For example, a Header Block may contain a Logo, Navigation Menu, and Search Bar. These elements will remain the same on every page. Static Blocks are useful for creating consistent layouts and branding across a website. They are easy to create and customize using the ArchiType Editor.

### Dynamic Blocks
Dynamic Blocks are used to create dynamic content that will change. They are used to create Cpomponents such as Blog Posts, Product Listings, and News Feeds. These blocks can only be used by "Query Blocks" which are type of block provided by the Layout Editor. For example, a Blog Post Block may contain a Title, Author, Date, and Content. When used in a Query Block, the user can map the fields to the data being fetched from the server. This allows the Block to display different content depending on the data being fetched. Here is a example:
*During the creation of the Block, the user will add the following elements: 
- Title: heading element
- Author: text element
- Date: text element
- image: image element
- button: button element (read more)
*When the Block is used in a Query Block, the user will map the fields to the data being fetched from the server. For example, the Title field may be mapped to the "title" field in the data, the Author field may be mapped to the "author" field, and so on. This allows the Block to display different content depending on the data being fetched.

### Form Blocks
Form Blocks are used to create forms that can be used to collect user input. They are used to create Components such as Contact Forms, Sign Up Forms, and Surveys. For example, a Contact Form Block may contain fields for Name, Email, and Message. These fields can be customized using the Properties Panel. Form Blocks are useful for collecting user input and feedback.
The creation of a form blog will always a create a database table with the same name as the block. The fields of the form will be the columns of the table. The form block will have a submit button that will send the data to the server and store it in the database. The form block will also have a success message that will be displayed when the form is submitted successfully.

### ArchiType Editor
This editor allows you to create and edit the Components that will be used to Build a Page or Layout.
It Provides Primitive Components that can be used to create more complex components. These are Pre-built HTML elements with some added functionality and styling.
These Components can be used to create a Component such as Blog Post Card, Navigation Bar, etc.

### React-Grid-Layout
The Main Component of the ArchiType Editor is the React-Grid-Layout. This Component is used to create the Layout of a component by using a grid system. This allows you to create a responsive layout that can be easily customized. The React-Grid-Layout is used to create the Layout of the ArchiType Editor. It allows you to drag and drop the **Primitive Components** onto the grid and customize them using the Properties Panel.
By Default, the React-Grid-Layout has a 12 column layout. This can be changed by changing the `cols` property of the `ReactGridLayout` Component.
Heres a list of all the properties of the `ReactGridLayout` Component:
- `cols`: Number of columns in the grid
- `rowHeight`: Height of each row in the grid
- `width`: Width of the grid
- `margin`: Margin between the grid items
- `autoSize`: Automatically adjust the size of the grid items
- `isDraggable`: Allow the grid items to be draggable
- `isResizable`: Allow the grid items to be resizable
- `useCSSTransforms`: Use CSS Transforms for positioning
- `compactType`: Type of compacting
- `preventCollision`: Prevent grid items from overlapping
It also has a list appearence properties that can be customize the appearence of the "Component" such as:
- `background`: Background
- `border`: Border
- `spacing`: padding and margin
- `effects`: Effects such as shadow, etc.
When the "Component is being used on "Layout Editor", it cannot be Edited, but it can be moved around and resized in context of the entire layout being created.

### Primitive Components
The Primitive Components are the basic building blocks of the ArchiType Editor. Essentially, they are the React-grid-layout items with HTML elements inside them. here is a example of a Primitive Component:
```jsx
<div key={i} data-grid={layout} style={{background: 'white', border: '1px solid black', padding: '10px'}}>
  <h1>Heading</h1>
  <p>Paragraph</p>
</div>
```
The Primitive Components are used to create more complex Components. They can be customized using the Properties Panel. The Primitive Components can be dragged and dropped onto the React-Grid-Layout. They can be resized and moved around the grid.
The Primitive Components Include:
**Typography**
- Heading: Creates a Heading 
- Paragraph: Creates a Paragraph 
- Link: Creates a Link element 
  
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
  
Furthermore, the Primitive Components can be customized using the Properties Panel. This allows you to change the properties of the Components such as Typography, Size, Borders, Background, Effects, and Spacing.


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

### What Gets Created And How is it Used

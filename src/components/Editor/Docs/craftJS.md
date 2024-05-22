#OVERVIEW
# Overview

## Motivation[​](https://craft.js.org/docs/overview#motivation "Direct link to Motivation")

Page editors are a great way to provide an excellent user experience. However, to build one is often a pretty dreadful task.

There're existing libraries that come with a fully working page editor out of the box with a user interface and editable components. However, if you wish to make customisations such as tweaking the user interface, it will most definitely involve modifying the library itself.

Craft.js solves this problem by modularising the building blocks of a page editor. It provides a drag-n-drop system and handles the way user components should be rendered, updated and moved - among other things. With this, you'll be able to focus on building the page editor according to your own specifications and needs.

## Features[​](https://craft.js.org/docs/overview#features "Direct link to Features")

### It's just React[​](https://craft.js.org/docs/overview#its-just-react "Direct link to It's just React")

No need for complicated plugin systems. Design your editor from top to bottom the same way as you would design any other frontend application in React.

A simple user component can easily be defined as such:

```
import {useNode} from "@craftjs/core";const TextComponent = ({text}) => {  const { connectors: {drag} } = useNode();  return (    <div ref={drag}>      <h2>{text}</h2>    </div>  )}
```

Heck, the entire UI of your page editor is built using just React.

```
import React from "react";import {Editor, Frame, Canvas, Selector} from "@craftjs/core";const App = () => {  return (    <div>      <header>Some fancy header or whatever</header>      <Editor>        // Editable area starts here        <Frame resolver={TextComponent, Container}>           <Canvas>            <TextComponent text="I'm already rendered here" />          </Canvas>        </Frame>      </Editor>    </div>  )}
```

### Control how your components are edited[​](https://craft.js.org/docs/overview#control-how-your-components-are-edited "Direct link to Control how your components are edited")

An obvious requirement for page editors is that they need to allow users to edit components. With Craft.js, you control the process of which these components should be edited.

In the following example, when the user clicks on a component, we'll display a modal that requires the user to input a value for the `text` prop. As the input value changes, the component will be re-rendered with updated prop.

```
import {useNode} from "@craftjs/core";const TextComponent = ({text}) => {  const { connectors: { connect, drag }, isClicked, actions: {setProp} } = useNode(    (state) => ({      isClicked: state.event.selected,    })  );  return (    <div ref={dom => connect(drag(dom))}>      <h2>{text}</h2>      {        isClicked ? (          <Modal>            <input              type="text"              value={text}              onChange={e => setProp(e.target.value)}            />          </Modal>        )      }    </div>  )}
```

With this, you could easily implement content editable text or drag-to-resize components, just as any modern page editor would have.

### User components with droppable regions[​](https://craft.js.org/docs/overview#user-components-with-droppable-regions "Direct link to User components with droppable regions")

Let's say we need a "Container" component which users can drop into the editor. Additionally, we would also like them to be able to drag and drop other components into the Container.

In Craft.js, it's as simple as calling the `<Canvas />`

```
import {useNode} from "@craftjs/core";const Container = () => {  const { connectors: {drag} } = useNode();  return (    <div ref={drag}>      <Canvas id="drop_section">         // Now users will be able to drag/drop components into this section        <TextComponent />      </Canvas>    </div>  )}
```

### Extensible[​](https://craft.js.org/docs/overview#extensible "Direct link to Extensible")

Craft.js provides an expressive API which allows you to easily read and manipulate the editor state. Let's say you would like to implement a copy function for a component:

```
import {useEditor, useNode} from "@craftjs/core";const Container = () => {  const { actions: {add}, query: { createNode, node } } = useEditor();  const { id, connectors: {drag, connect} } = useNode();  return (    <div ref={dom => connect(drag(dom))}>      ...      <a onClick={() => {        const { data: {type, props}} = node(id).get();        add(          createNode(React.createElement(type, props));        );      }}>        Make a copy of me      </a>    </div>  )}
```

### Serializable state[​](https://craft.js.org/docs/overview#serializable-state "Direct link to Serializable state")

The editor's state can be serialized into JSON which you can then apply a compression technique of your choice for storage.

```
const SaveButton = () => {  const { query } = useEditor();  return <a onClick={() => console.log(query.serialize()) }>Get JSON</a>}
```

Of course, Craft.js will also able to recreate the entire state from the JSON string.

```
const App = () => {  const jsonString = /* retrieve JSON from server */  return (    <Editor>      <Frame json={jsonString}>        ...      </Frame>    </Editor>  )}
```


# CORE CONCEPTS
# Nodes

## User Elements[​](https://craft.js.org/docs/concepts/nodes#user-elements "Direct link to User Elements")

User Elements are React Elements which the end user will have the ability to manipulate. In other words, these are the elements which you will want your users to edit, drag and/or drop in your editor.

Just like React Elements, these can be either simple HTML tags or React Components. We'll refer to User Elements which are React Components simply as _User Components_.

## Node[​](https://craft.js.org/docs/concepts/nodes#node "Direct link to Node")

Craft.js maintains an internal state comprised of objects called Nodes which represent and manage User Elements that are rendered in the editor. These Nodes contain information such as the element type, current props, DOM element, parent Node and so on. Hence, every User Element is rendered and managed by their corresponding Node.

## Canvas Node[​](https://craft.js.org/docs/concepts/nodes#canvas-node "Direct link to Canvas Node")

A Canvas is a special type of Node which enables it's corresponding user element to be a droppable region, where its child Node's user element will be made draggable.

In a nutshell:

- A Canvas node defines a droppable region
- A Node that is a child of a Canvas is draggable
- A Canvas node itself is not draggable unless it is a child Node of another Canvas.

## Representing User Elements as Nodes[​](https://craft.js.org/docs/concepts/nodes#representing-user-elements-as-nodes "Direct link to Representing User Elements as Nodes")

Let's take a look at how User Elements are actually represented as Nodes:

```
<div style={{ background: "#333" }}> // A Node with the type div;  <h1>Hi</h1> // Node of the type h1; not draggable  <MyComp>Hey</MyComp> //  Node of the type MyComp; not draggable  <MyContainerComponent> // A Node with the type MyContainerComponent; not draggable    <h2>Second level</h2> // A Node with the type h2; not draggable!   </MyContainerComponent></div>
```

In the above example, a Node is created for each React element. The top-level `div` has 3 child nodes and the `MyContainerComponent` Node has a `h2` child Node.

By default, a non-Canvas Node is created. So, how do we actually create a Canvas node? For example, how do we make the top-level `div` into a Canvas Node so we could drag/drop it's children around? This is where the `<Element />` component becomes handy in manually defining Nodes.

```
<Element is="div" style={{ background: "#333" }} canvas> // A Canvas Node with the type div;  <h1>Hi</h1> // Node of the type h1; draggable  <MyComp>Hey</MyComp> //  Node of the type MyComp; draggable  <MyContainerComponent> // A Node with the type MyContainerComponent; draggable    <h2>Second level</h2> // A Node with the type h2; not draggable!   </MyContainerComponent></Element>
```

> The `is` prop specifies the type of User Element to create; it can be either a HTML tag or a User Component

In the above example, using the `<Element />` component with the `canvas` prop, we've created a Canvas node of the type `div`. Since our `div` element is now handled by a Canvas node, therefore it is now a droppable region. On the other hand, since `h1`, `MyComp` and `MyContainerComp` are child Nodes of a Canvas, they are now draggable.

The `<Element />` component can also be used to configure other values of a Node, which is further detailed [here](https://craft.js.org/docs/api/element)



# User Components

User Components are intended to be written just like any other React Component.

Let's start with a simple Text component:

```
const Text = ({text, fontSize}) => {  return (    <span contenteditable="true" style={{fontSize}}>{text}</span>  )}
```

Now, let's actually get the component to work with the editor. The `useNode` hook provides us with several information and methods related to the corresponding `Node` that manages the component.

```
const { connectors: {connect, drag}, setProp, ...collected } = useNode((node) => {});
```

Additionally we can pass configuration values via the static `craft` property:

```
const Text = () => {...}Text.craft = {  props: {},  rules: {    canDrop: () => true,    canDrag: () => true,    canMoveIn: () => true,    canMoveOut: () => true  },  related: {}}
```

We'll explore each of these values in the following sections.

## Connectors[​](https://craft.js.org/docs/concepts/user-components#connectors "Direct link to Connectors")

The first thing we would want to do is to actually let Craft.js to manage the DOM for our component.

- `connect`: specifies the DOM that represents the User Component. If the component's corresponding Node is a Canvas, then this also defines the area that is droppable.
- `drag`: specifies the DOM element that should be made draggable. When the user drags this element, it'll be considered as dragging the entire component, therefore moving the entire component to the drop location. This connector only takes effect if the component's corresponding node is a Canvas Node.

```
const Container = ({children}) => {  const { connectors: {connect, drag} } = useNode();  return (    <div ref={dom => connect(drag(dom))}>      {children}    </div>  )}const App = () => {  return (    <Editor resolvers={{Container}}>      <Frame>        <Element is={Container} canvas> // (i)          <Container> // (ii)            <h2>Hi</h2>          </Container>          <Element is={Container} canvas> // (iii)            <h2>Hi</h2>          </Element>        </Element>      </Frame>    </Editor>  )}
```

- i. `Element` is being rendered with a Canvas Node, thus it defines a droppable region. However, since it is not a child of a Canvas Node, it is not draggable (the `drag` handler will not do anything).
- ii. `Container` is an immediate child of a Canvas Node; it is draggable.
- iii. `Element` is an immediate child of a Canvas Node and is rendered with a Canvas Node - it is both draggable and droppable.

## Props manipulation[​](https://craft.js.org/docs/concepts/user-components#props-manipulation "Direct link to Props manipulation")

You've probably seen page editors where you could directly interact with the components and manipulate them. For instance, drag to resize an image or visually edit a text. This is easily achievable with Craft.js as well.

Since components are managed by their corresponding `Node` which contains information including the component's props, thus we can call the `setProp` method to update the prop values stored in the `Node`. In turn, this will re-render the component with its updated values.

```
const Text = ({text, fontSize}) => {  const { connectors: {connect, drag}, actions: {setProp} } = useNode();  return (    <span ref={dom => connect(drag(dom))} style={{fontSize}} onKeyUp={(e) => {        setProp(props => {          props.text = e.target.innerText;        })      }}>{text}    </span>  )}
```

In the above example, we have updated our `span` element to be content editable and added an event handler to update the `text` prop as the user visually enters in a new value.

## Collecting Node's state[​](https://craft.js.org/docs/concepts/user-components#collecting-nodes-state "Direct link to Collecting Node's state")

The information stored in a corresponding `Node` could be useful in helping you build more usable components. We can retrieve information from a `Node` by passing a collector function to the `useNode` hook. Every time the values we retrieved via the collector function changes, our component will re-render. This is very much similar to Redux's `connect` pattern.

For instance, let's say we would like to enable the content editable text from the previous section only when the user has actually clicked on our component:

```
const Text = ({text, fontSize}) => {  const { connectors: {connect, drag}, setProp, isClicked } = useNode((node) => ({    isClicked: node.events.selected  }));  return (    <span ref={dom => connect(drag(dom))} style={{fontSize}} contentEditable={isClicked} onKeyUp={(e) => {        setProp(props => {          props.text = e.target.innerText;        })      }}>{text}    </span>  )}
```

## Default Props[​](https://craft.js.org/docs/concepts/user-components#default-props "Direct link to Default Props")

While it's not necessary as we could simply define default parameters (e.g.: ES6 defaults) directly within our components, these default values will not actually be recorded into the component's corresponding `Node`, which could leave us with a lot of empty prop values when we wish to retrieve the `Node` for a component when building other parts of our editor (eg: a Toolbar for editing a component's values).

To prevent that, we can explicitly specify default prop values via the `craft.props` like the following:

```
const Text = ({text, fontSize}) => { /** same as previous example **/ }Text.craft = {  props: {    text: "Hi there!",    fontSize: 12  }}
```

## Specify drag/drop rules[​](https://craft.js.org/docs/concepts/user-components#specify-dragdrop-rules "Direct link to Specify drag/drop rules")

You may want to restrict how your components are dragged or what goes in and out of your component. These rules can be specified in the static `craft.rules`.

Let us write a (pretty strange) rule for our Text component which users can only drag if they change the `text` prop to "Drag":

```
const Text = ({text, fontSize}) => { /** same as the previous example **/ }Text.craft = {  props: { /** same as the previous example **/ },  rules: {    canDrag: (node) => !!node.data.props.text == "Drag"  }}
```

## Related Components[​](https://craft.js.org/docs/concepts/user-components#related-components "Direct link to Related Components")

What happens if you need to design some component to complement our user component? For instance, if we were planning on building a Toolbar somewhere in our page editor, we would like the Toolbar to display a bunch of text inputs to allow the user the edit the currently selected component. It would be great if we could retrieve a specific component that has all the relevant inputs for the user to edit the currently selected component.

This is where related components become useful. These components share the same corresponding `Node` as the actual user component, hence the `useNode` hook that we have been using all this while will be made available to these components as well.

```
const Text = ({text, fontSize}) => { /** same as the previous example **/ }Text.craft = {  related: {    toolbar: TextToolbarSettings  }}const TextToolbarSettings = () => {  const { setProp, fontSize } = useNode((node) => ({    fontSize: node.data.props.fontSize  }));  return (    <div>      <h2>Text settings</h2>      <input         type = "number"         value={fontSize}         placeholder="Font size"        onChange={e =>           setProp(prop => prop.fontSize = e.target.value)         }       />    </div>  )}
```

Now, let's say we have a Toolbar component somewhere in our editor. We can easily retrieve the related component as such:

```
const Toolbar = () => {  const { selectededNodeId, toolbarSettings } = useEditor((state) => ({    selectededNodeId : state.event.selected,    toolbarSettings:  state.nodes[state.events.selected].related.toolbar  }));  return (    <div>      <h2>My Awesome Toolbar</h2>      {        selectededNodeId && toolbarSettings ?           React.createElement(toolbarSettings)        : null      }    </div>  )}
```

## Defining editable elements[​](https://craft.js.org/docs/concepts/user-components#defining-editable-elements "Direct link to Defining editable elements")

Now, let's say we are creating a new User Component like so:

```
const Hero = ({background}) => {  return (    <div style={{ background }}>      <span>Hero Title</span>    </div>  )}
```

Then, we decide that we want to have the `span` element to be editable independent of the Text user component we made earlier.

Your first instinct might be to just use the Text component directly:

```
const Hero = ({background}) => {  return (    <div style={{ background }}>      <Text text="Hero Title" />    </div>  )}
```

But this won't really work the way we want it to - the Text Component will not have its own Node. Instead, it will still be a part of Hero's Node. So, inside the Text Component, when we call `setProps(props => props.text = "...")`, it will actually be editing the props of `Hero`. In this case, it will be adding a new prop `text` to Hero, which is not consumed by Hero and therefore makes no sense.

So how do we even define new Nodes inside a User Component? Previously, we discussed how `<Element />` is used to define Nodes; that concept is applied universally in Craft.js. Hence, we just have to wrap our `<Text />` element in the example above with `<Element />`.

```
const Hero = ({background}) => {  return (    <div style={{ background }}>      <Element is={Text} text="Hero Title" id="title_text" />    </div>  )}
```

> You must specify the `id` prop of `<Element />` when used inside a User Component

In the above example, we used `<Element />` to create and configure a new Node inside our User Component. We call these Linked Nodes since they are linked to a parent Node via an arbitary `id`. In this case, the `Text` node is linked to the `Hero` node via its "title\_text" id.

Similarly, we could also create a droppable region inside a User Component via a Canvas Node:

```
const Hero = ({background}) => {  return (    <div style={{ background }}>      <Element is={Text} text="Hero Title" id="title_text" />      <Element canvas is="section" id="droppable_container">        <h2>I'm dropped here for now</h2>      </Elemnet>    </div>  )}
```

# Interacting with the Editor

Previously, we have looked at User Components and how to write them, but what about all the other components that are integral to our page editor like a Toolbar for users to edit components, or maybe a layers panel?

The `useEditor` hook allows us to read and manipulate the entire editor's internal state. Essentially, this is similar to the `useNode` hook we have seen previously, except this deals with the entire editor rather than with a particular `Node`.

```
const { actions, connectors, ...collected } = useEditor((state) => {});
```

> Note: Unlike `useNode` which can be only used inside User Components, `useEditor` can be used anywhere within the Craft context, including User Components.

## Getting state information[​](https://craft.js.org/docs/concepts/editor#getting-state-information "Direct link to Getting state information")

Similar with the `useNode`, we can specify a collector function to the `useEditor` hook to retrieve information from the internal state.

```
const App = () => {  const { hoveredNodeName } = useEditor((state: Node) => {    const currentlyHoveredId = state.events.hovered;    return {      hoveredNodeName: state.nodes[currentlyHoveredId].displayName    }  })  return (    <h2>The component being hovered is: {hoveredNodeName}</h2>  )}
```

## Connectors[​](https://craft.js.org/docs/concepts/editor#connectors "Direct link to Connectors")

With`useEditor`, you can add connectors to DOM elements anywhere in the editor to make use of the editor's internal events.

Let's say, maybe you are creating a layers panel to display all nodes as Photoshop-like layers (wink wink, `craftjs-layers`) and would like to change the particular Node's event state when the user clicks/hovers/drags your layers.

```
const LayerItem = (nodeId) => {  const { connectors: { select }} = useEditor();  return (   <div>      <a ref={ref => select(ref, nodeId)}>Click me to select node {nodeId}</a>   </div>  );}
```

Or, maybe drag a button to create a new instance of a User Component

```
const DragToCreate = (nodeId) => {  const { connectors: { drag }} = useEditor();  return (   <div>      <a ref={ref => create(ref, <Text />)}>Drag me to create a new Text</a>   </div>  );}
```

## Manipulating state[​](https://craft.js.org/docs/concepts/editor#manipulating-state "Direct link to Manipulating state")

We can use the `actions` provided to manipulate the editor's internal state

```
const DeleteButtonThingy = () => {  const { actions, selectedNodeId } = useEditor((state) => ({    selectedNodeId: state.events.selected  }));  return (    <div>      <button onClick={() => actions.delete(selectedNodeId) }>        Click me to delete the selected node      </button>    </div>  )}
```

## Querying[​](https://craft.js.org/docs/concepts/editor#querying "Direct link to Querying")

What if you need to know if two nodes are compatible, how to get all parents of a Node or simply deserialize all Nodes? Queries are methods that provide helpful information based on the editor's state.

```
const Sidebar = () => {  const {query} = useEditor();  return (    <div>      <a onClick={() => {        console.log(query.deserialize());      }}>Click me</a>    </div>  )}
```

Queries are also accessible via the `useEditor` collector function. Let's look at an example where we build a component that returns all the descendants of the current selected Node:

```
const ShowMeMyDescendants = () => {  const { allDescendants } = useEditor((state, query) => {    const selectedNodeId = state.events.selected;    let allDescendants = false;    if (selectedNodeId)  allDescendants = query.node(selectedNodeId).decendants();      return { allDescendants }  });   return allDescendants ? (    <div>      {        allDescendants.map(node =>           <li>{node.id}</li>        )      }    </div>  ) : null}
```

# Basic Tutorial

[Live Demo](https://prevwong.github.io/craft.js/examples/basic)[View Code](https://github.com/prevwong/craft.js/tree/master/packages/examples/basic)

## Overview[​](https://craft.js.org/docs/guides/basic-tutorial#overview "Direct link to Overview")

In this tutorial, we'll be designing a simple page editor. It's recommended that you have a basic to intermediate workings of React and it'd be even better if you first have a quick glance at the [Core Concepts](https://craft.js.org/docs/concepts/nodes) and come back here. If you are feeling adventurous, that's fine too.

## Installation[​](https://craft.js.org/docs/guides/basic-tutorial#installation "Direct link to Installation")

```
yarn add @craftjs/core
```

or with npm:

```
npm install --save @craftjs/core
```

## Designing a user interface[​](https://craft.js.org/docs/guides/basic-tutorial#designing-a-user-interface "Direct link to Designing a user interface")

With Craft.js you decide how your editor should look and function. So, let's build a user interface for our page editor. We'll add the page editor functionalities later.

To make our lives easier, we'll use some external packages for designing our user interfaces.

```
yarn add @material-ui/core react-contenteditable material-ui-color-picker
```

### User Components[​](https://craft.js.org/docs/guides/basic-tutorial#user-components "Direct link to User Components")

Let's first create the User Components - the components that our end users will be able create/edit/move around.

#### Text[​](https://craft.js.org/docs/guides/basic-tutorial#text "Direct link to Text")

```
// components/user/Text.jsimport React from "react";export const Text = ({text, fontSize}) => {  return (      <div>         <p style={{fontSize}}>{text}</p>      </div>  )}
```

#### Button[​](https://craft.js.org/docs/guides/basic-tutorial#button "Direct link to Button")

```
// components/user/Button.jsimport React  from "react";import {Button as MaterialButton} from "@material-ui/core";export const Button = ({size, variant, color, children}) => {  return (    <MaterialButton size={size} variant={variant} color={color}>      {children}    </MaterialButton>  )}
```

#### Container[​](https://craft.js.org/docs/guides/basic-tutorial#container "Direct link to Container")

We will also create a Container component to allow our users to change its background colour and padding.

```
// components/user/Container.jsimport React from "react";import { Paper } from "@material-ui/core";export const Container = ({background, padding = 0, children}) => {  return (    <Paper style={{margin: "5px 0", background, padding: `${padding}px`}}>      {children}    </Paper>  )}
```

#### Card[​](https://craft.js.org/docs/guides/basic-tutorial#card "Direct link to Card")

Now, let's create another user component that will be more advanced. It will be composed of the Container component we made earlier, and it will contain two droppable regions; one for text and another for buttons.

```
// components/user/Card.jsimport React  from "react";import { Text } from "./Text";import { Button } from "./Button";import { Container } from "./Container";export const Card = ({background, padding = 20}) => {  return (    <Container background={background} padding={padding}>      <div className="text-only">        <Text text="Title" fontSize={20} />        <Text text="Subtitle" fontSize={15} />      </div>      <div className="buttons-only">        <Button size="small" text="Learn more" variant="contained" color="primary" />      </div>    </Container>  )}
```

### The Editor[​](https://craft.js.org/docs/guides/basic-tutorial#the-editor "Direct link to The Editor")

#### Toolbox[​](https://craft.js.org/docs/guides/basic-tutorial#toolbox "Direct link to Toolbox")

Let's build a "toolbox" which our users will be able to drag and drop to create new instances of those User Components we just defined.

```
// components/Toolbox.jsimport React from "react";import { Box, Typography, Grid, Button as MaterialButton } from "@material-ui/core";export const Toolbox = () => {  return (    <Box px={2} py={2}>      <Grid container direction="column"  alignItems="center" justify="center" spacing={1}>        <Box pb={2}>          <Typography>Drag to add</Typography>        </Box>        <Grid container direction="column" item>          <MaterialButton variant="contained">Button</MaterialButton>        </Grid>        <Grid container direction="column" item>          <MaterialButton variant="contained">Text</MaterialButton>        </Grid>        <Grid container direction="column" item>          <MaterialButton variant="contained">Container</MaterialButton>        </Grid>        <Grid container direction="column" item>          <MaterialButton variant="contained">Card</MaterialButton>        </Grid>      </Grid>    </Box>  )};
```

#### Settings Panel[​](https://craft.js.org/docs/guides/basic-tutorial#settings-panel "Direct link to Settings Panel")

We also want to create a section here where we can display a bunch of settings which our users can use to edit the props of the user components.

For now, let's just put in some dummy text fields. We'll revisit this in the later sections.

```
// components/SettingsPanel.jsimport React from 'react';import { Box, Chip, Grid, Typography, Button as MaterialButton, FormControl, FormLabel, Slider } from "@material-ui/core";export const SettingsPanel = () => {    return  (        <Box bgcolor="rgba(0, 0, 0, 0.06)" mt={2} px={2} py={2}>      <Grid container direction="column" spacing={0}>        <Grid item>          <Box pb={2}>            <Grid container alignItems="center">              <Grid item xs><Typography variant="subtitle1">Selected</Typography></Grid>              <Grid item><Chip size="small" color="primary" label="Selected" /></Grid>            </Grid>          </Box>        </Grid>        <FormControl size="small" component="fieldset">          <FormLabel component="legend">Prop</FormLabel>          <Slider            defaultValue={0}            step={1}            min={7}            max={50}            valueLabelDisplay="auto"          />        </FormControl>        <MaterialButton          variant="contained"          color="default"        >          Delete        </MaterialButton>      </Grid>    </Box>  ) }
```

#### Top bar[​](https://craft.js.org/docs/guides/basic-tutorial#top-bar "Direct link to Top bar")

Let's design a section that is going to contain a switch for users to disable the editor's functionality and also a button that is simply going to display the serialized output in the browser's console.

```
// components/Topbar.jsimport React from "react";import { Box, FormControlLabel, Switch, Grid, Button as MaterialButton } from "@material-ui/core";export const Topbar = () => {  return (    <Box px={1} py={1} mt={3} mb={1} bgcolor="#cbe8e7">      <Grid container alignItems="center">        <Grid item xs>          <FormControlLabel            control={<Switch checked={true} />}            label="Enable"          />        </Grid>        <Grid item>          <MaterialButton size="small" variant="outlined" color="secondary">Serialize JSON to console</MaterialButton>        </Grid>      </Grid>    </Box>  )};
```

#### Putting it all together[​](https://craft.js.org/docs/guides/basic-tutorial#putting-it-all-together "Direct link to Putting it all together")

Now, let's put together our entire React application.

```
// pages/index.jsimport React from 'react';import {Typography, Paper, Grid} from '@material-ui/core';import { Toolbox } from '../components/Toolbox';import { SettingsPanel } from '../components/SettingsPanel';import { Topbar } from '../components/Topbar';import { Container } from '../components/user/Container';import { Button } from '../components/user/Button';import { Card } from '../components/user/Card';import { Text } from '../components/user/Text';export default function App() {  return (    <div style={{margin: "0 auto", width: "800px"}}>      <Typography variant="h5" align="center">A super simple page editor</Typography>      <Grid container spacing={3} style={{paddingTop: "10px"}}>        <Topbar />        <Grid item xs>          <Container padding={5} background="#eee">            <Card />          </Container>        </Grid>        <Grid item xs={3}>          <Paper>              <Toolbox />              <SettingsPanel />          </Paper>                  </Grid>      </Grid>    </div>  );}
```

![](/img/tutorial/interface.png)

## Implementing Craft.js[​](https://craft.js.org/docs/guides/basic-tutorial#implementing-craftjs "Direct link to Implementing Craft.js")

Up to this point, we have made a user interface for our page editor. Now, let's get it to work!

### Setup[​](https://craft.js.org/docs/guides/basic-tutorial#setup "Direct link to Setup")

- First wrap our application with `<Editor />` which sets up the Editor's context. We'll also need to specify the list of user components in the `resolver` prop for Craft.js to be able to (de)serialize our User Components.
- Then wrap the editable area with `<Frame />` which passes the rendering process to Craft.js.

```
// pages/index.jsimport React from 'react';import {Typography, Paper, Grid} from '@material-ui/core';import { Toolbox } from '../components/Toolbox';import { SettingsPanel } from '../components/SettingsPanel';import { Container } from '../components/user/Container';import { Button } from '../components/user/Button';import { Card } from '../components/user/Card';import { Text } from '../components/user/Text';import {Editor, Frame, Element} from "@craftjs/core";export default function App() {  return (    <div>      <Typography variant="h5" align="center">A super simple page editor</Typography>        <Editor resolver={{Card, Button, Text, Container}}>           <Grid container spacing={3}>            <Grid item xs>              <Frame>                <Container padding={5} background="#eee">                  <Card />                  <Button size="small" variant="outlined">Click</Button>                  <Text size="small" text="Hi world!" />                  <Container padding={6} background="#999">                    <Text size="small" text="It's me again!" />                  </Container>                </Container>              </Frame>            </Grid>            <Grid item xs={3}>              <Paper className={classes.root}>                  <Toolbox />                  <SettingsPanel />              </Paper>                      </Grid>          </Grid>        </Editor>    </div>  );}
```

Every element that is rendered in `<Frame />` is managed by an object in the editor's internal state called a `Node` which describes the element, its events, and props among other things.

Whether an element is draggable or droppable (or neither) depends on the type of `Node` that manages it.

- If the `Node` is a Canvas, then it's droppable
- If the `Node` is an immediate child of a Canvas, then it's draggable.

By default, every element inside the `<Frame />` will have a non-Canvas Node automatically defined for it:

```
// Explanation<Frame>  <Container padding={5} background="#eee"> // Node of type Container    <Card /> // Node of type Card    <Button size="small" variant="outlined">Click</Button> // Node of type Button    <Text size="small" text="Hi world!" /> // Node of type Text    <Container padding={2} background="#999"> // Node of type Container       <Text size="small" text="It's me again!" /> // Node of type Text    </Container>  </Container></Frame>
```

Hence, by default, all the Nodes above are neither draggable nor droppable. So how can we define some of the Nodes above as a Canvas Node?

We can use the provided `<Element />` component to manually define Nodes:

```
<Frame>  <Element is={Container} padding={5} background="#eee" canvas> // Canvas Node of type Container, droppable    <Card /> // Node of type Card    <Button size="small" variant="outlined">Click</Button> // Node of type Button, draggable    <Text size="small" text="Hi world!" /> // Node of type Text, draggable    <Element is={Container} padding={2} background="#999" canvas> // Canvas Node of type Container, droppable and draggable       <Text size="small" text="It's me again!" /> // Node of type Text, draggable    </Element>  </Element></Frame>
```

In the above code, we've wrapped our `Container` components with `<Element />` with the `canvas` prop, thus making the component droppable and its immediate children, draggable.

Once you've applied these changes and refresh the page, you will notice that absolutely nothing has changed - and that's a good thing!

### Enabling Drag and Drop[​](https://craft.js.org/docs/guides/basic-tutorial#enabling-drag-and-drop "Direct link to Enabling Drag and Drop")

Inside a User Component, we have access to the `useNode` hook which provides several information and methods related to the corresponding `Node`.

The first thing we will need to do is to let Craft.js to manage the DOM of our component. The hook provides `connectors` which act as a bridge between the DOM and the events in Craft.js:

```
// components/user/Text.jsimport React from "react";import { Typography } from "@material-ui/core";import { useNode } from "@craftjs/core";export const Text = ({text}) => {  const { connectors: {connect, drag} } = useNode();  return (     <div       ref={ref => connect(drag(ref))}    >      <p>{text}</p>    </div>  )}
```

Let's break this down a little:

- We passed the `connect` connector to the root element of our component; this tells Craft.js that this element represents the Text component. If the component's corresponding Node is a Canvas, then this also defines the area that is droppable.
- Then, we also passed `drag` connector to the same root element; this adds the drag handlers to the DOM. If the component's Node is a child of a Canvas, then the user will be able to drag this element and it will move the entire Text component.

We can also specify additional configuration to our component via the `craft` prop. Let's define drag-n-drop rules for our Text Component:

```
export const Text = () => {...}Text.craft = {  ...  rules: {    canDrag: (node) => node.data.props.text != "Drag"  }}
```

Our Text component can now only be dragged if the `text` prop is not set to "Drag" 🤪

Nice, now let's enable drag-n-drop for the other User Components:

```
// components/user/Button.jsexport const Button = ({size, variant, color, children}) => {  const { connectors: {connect, drag} } = useNode();  return (    <MaterialButton ref={ ref => connect(drag(ref))} size={size} variant={variant} color={color} >      ...    </MaterialButton>  )}
```

```
// components/user/Container.jsexport const Container = ({background, padding = 0, children}) => {  const { connectors: {connect, drag} } = useNode();  return (    <Paper ref={ref=> connect(drag(ref))} style={{ background, padding: `${padding}px`}}>      ...    </Paper>  )}
```

```
// components/user/Card.js (No changes)// It's not necessary to add connectors for our Card component since it's a composition of our Container component - which already has connectors applied.export const Card = ({background, padding = 0}) => {  return (    <Container background={background} padding={padding}>      ...    </Container>  )}
```

At this point, you could refresh the page and you would be able to drag stuff around.

![](/img/tutorial/dnd.gif)

#### Defining Droppable regions[​](https://craft.js.org/docs/guides/basic-tutorial#defining-droppable-regions "Direct link to Defining Droppable regions")

Of course, our Card component is supposed to have 2 droppable regions, which means we'll need 2 Canvas nodes.

But hold up, how do we even create a Node inside a User Component? Remember the `<Element />` component that was used to define Nodes earlier in our application? Well it can be used here as well.

```
// components/user/Card.jsimport {useNode, Element} from "@craftjs/core";export const Card = (({bg, padding})) => {  return (    <Container background={background} padding={padding}>      <Element id="text" canvas> // Canvas Node of type div        <Text text="Title" fontSize={20} />        <Text text="Subtitle" fontSize={15} />      </Element>      <Element id="buttons" canvas> // Canvas Node of type div        <Button size="small" text="Learn more" />      </Element>    </Container>  )}
```

> `<Element />` used inside User Component must specify an `id` prop

You might be wondering how do we set drag/drop rules for the new droppable regions we made. Currently, we have set the `is` prop in our `<Element />` to a div, but we can actually point it to a User Component.

Hence, we can specify and create a new User Component and define rules via the `craft` prop just like what we have done previously.

```
// components/user/Card.jsimport React  from "react";import Text from "./Text";import Button from "./Button";import { Element, useNode } from "@craftjs/core";import { Container }  from "./Container";// Notice how CardTop and CardBottom do not specify the drag connector. This is because we won't be using these components as draggables; adding the drag handler would be pointless.export const CardTop = ({children}) => {  const { connectors: {connect} } = useNode();  return (    <div ref={connect} className="text-only">      {children}    </div>  )}CardTop.craft = {  rules: {    // Only accept Text    canMoveIn: (incomingNodes) => incomingNodes.every(incomingNode => incomingNode.data.type === Text)  }}export const CardBottom = ({children}) => {  const { connectors: {connect} } = useNode();  return (    <div ref={connect}>      {children}    </div>  )}CardBottom.craft = {  rules: {    // Only accept Buttons    canMoveIn : (incomingNodes) => incomingNodes.every(incomingNode => incomingNode.data.type === Button)  }}export const Card = ({background, padding = 20}) => {  return (    <Container background={background} padding={padding}>      <Element id="text" is={CardTop} canvas> // Canvas Node of type CardTop        <Text text="Title" fontSize={20} />        <Text text="Subtitle" fontSize={15} />      </Element>      <Element id="buttons" is={CardBottom} canvas> // Canvas Node of type CardBottom        <Button size="small" text="Learn more" />      </Element>    </Container>  )}
```

Remember that every User Component must be added to our resolver, so let's add CardTop and CardBottom:

```
...export default function App() {  return (    ...        <Editor          resolver={{Card, Button, Text, CardTop, CardBottom}}        >          ...        </Editor>     ...  );}
```

![](/img/tutorial/droppable-regions.gif)

### Implementing the Toolbox[​](https://craft.js.org/docs/guides/basic-tutorial#implementing-the-toolbox "Direct link to Implementing the Toolbox")

Let's go back to our Toolbox component and modify it so that dragging those buttons into the editor will create new instances of the user components they represent. Just as `useNode` provides methods and information related to a specific `Node`, `useEditor` specifies methods and information related to the entire editor's state.

The `useEditor` also provides `connectors`; the one we are interested in right now is `create` which attaches a drag handler to the DOM specified in its first argument and creates the element specified in its second arguement.

```
// components/Toolbox.jsimport React from "react";import { Box, Typography, Grid, Button as MaterialButton } from "@material-ui/core";import { Element, useEditor } from "@craftjs/core";import { Container } from "./user/Container";import { Card } from "./user/Card";import { Button } from "./user/Button";import { Text } from "./user/Text";export const Toolbox = () => {  const { connectors, query } = useEditor();  return (    <Box px={2} py={2}>      <Grid container direction="column"  alignItems="center" justify="center" spacing={1}>        <Box pb={2}>          <Typography>Drag to add</Typography>        </Box>        <Grid container direction="column" item>          <MaterialButton ref={ref=> connectors.create(ref, <Button text="Click me" size="small" />)} variant="contained">Button</MaterialButton>        </Grid>        <Grid container direction="column" item>          <MaterialButton ref={ref=> connectors.create(ref, <Text text="Hi world" />)} variant="contained">Text</MaterialButton>        </Grid>        <Grid container direction="column" item>          <MaterialButton ref={ref=> connectors.create(ref, <Element is={Container} padding={20} canvas />)} variant="contained">Container</MaterialButton>        </Grid>        <Grid container direction="column" item>          <MaterialButton ref={ref=> connectors.create(ref, <Card />)} variant="contained">Card</MaterialButton>        </Grid>      </Grid>    </Box>  )};
```

Notice for our Container component, we wrapped it with the `<Element canvas />` - this will allow our users to drag and drop a new Container component that is droppable.

Now, you can drag and drop the Buttons, and they will actually create new instances of our User Components.

### Making the components editable[​](https://craft.js.org/docs/guides/basic-tutorial#making-the-components-editable "Direct link to Making the components editable")

Up until this point, we have a page editor where our users can move elements around. But, we are missing one important thing - enabling our users to edit the components' props.

The `useNode` hook provides us with the method `setProp` which can be used to manipulate a component's props. Let's implement a content editable for our Text Component:

For simplicity's sake, we will be using `react-contenteditable`

```
import React, {useCallback} from "react";import ContentEditable from 'react-contenteditable'export const Text = ({text, fontSize}) => {  const { connectors: {connect, drag}, actions: {setProp} } = useNode();  return (     <div       ref={ref => connect(drag(ref))}    >      <ContentEditable        html={text}         onChange={e =>           setProp(props =>             props.text = e.target.value.replace(/<\/?[^>]+(>|$)/g, "")            )        }         tagName="p"        style={{fontSize: `${fontSize}px`, textAlign}}      />    </div>  )}
```

But let's only enable content editable only when the component is clicked when it's already selected; a double click is essential.

The `useNode` hook accepts a collector function which can be used to retrieve state information related to the corresponding `Node`:

```
// components/user/Text.jsexport const Text = ({text, fontSize}) => {  const { connectors: {connect, drag}, hasSelectedNode, hasDraggedNode, actions: {setProp} } = useNode((state) => ({    hasSelectedNode: state.events.selected,    hasDraggedNode: state.events.dragged  }));  const [editable, setEditable] = useState(false);  useEffect(() => {!hasSelectedNode && setEditable(false)}, [hasSelectedNode]);  return (     <div       ref={ref => connect(drag(ref))}      onClick={e => setEditable(true)}    >      <ContentEditable        disabled={!editable}       ...      />    </div>  )}
```

![](/img/tutorial/text-edit.gif)

This should give you an idea of the possibilities of implementing powerful visual editing features like what you'd see in most modern page editors.

While we are at it, let's also add a slider for users to edit the `fontSize`

```
// components/user/Text.jsimport {Slider, FormControl, FormLabel} from "@material-ui/core";export const Text= ({text, fontSize, textAlign}) => {  const { connectors: {connect, drag}, hasSelectedNode, hasDraggedNode, actions: {setProp} } = useNode((state) => ({    hasSelectedNode: state.events.selected,    hasDraggedNode: state.events.dragged  }));  ...  return (    <div {...}>      <ContentEditable {...} />      {        hasSelectedNode && (          <FormControl className="text-additional-settings" size="small">            <FormLabel component="legend">Font size</FormLabel>            <Slider              defaultValue={fontSize}              step={1}              min={7}              max={50}              valueLabelDisplay="auto"              onChange={(_, value) => {                setProp(props => props.fontSize = value);              }}            />          </FormControl>        )      }    </div>  )}
```

![](/img/tutorial/text-edit-others.gif)

We can agree that it does not look all that good since it obstructs the user experience. Wouldn't it be better if the entire `.text-additional-settings` Grid is relocated to the Settings Panel that we created earlier?

The question is, how will the Settings Panel be able render the `.text-additional-settings` when our Text component is selected?

This is where Related Components become useful. Essentially, a Related Component shares the same `Node` context as our actual User component; it can make use of the `useNode` hook. Additionally, a Related Component is registered to a component's `Node`, which means we can access and render this component anywhere within the editor.

```
// components/user/Text.jsexport const Text = ({text, fontSize}) => {  const { connectors: {connect, drag}, isActive, actions: {setProp} } = useNode((node) => ({    isActive: node.events.selected  }));  ...  return (    <div {...}>      <ContentEditable {...} />    </div>  )}const TextSettings = () => {  const { actions: {setProp}, fontSize } = useNode((node) => ({    fontSize: node.data.props.fontSize  }));  return (    <>      <FormControl size="small" component="fieldset">        <FormLabel component="legend">Font size</FormLabel>        <Slider          value={fontSize || 7}          step={7}          min={1}          max={50}          onChange={(_, value) => {            setProp(props => props.fontSize = value);          }}        />      </FormControl>    </>  )}Text.craft = {  ...  related: {    settings: TextSettings  }  }
```

Before we move on to the Settings Panel, let's quickly do the same for the other User Components:

```
// components/user/Button.jsimport {Button as MaterialButton, Grid, FormControl, FormLabel, RadioGroup,Radio, FormControlLabel} from "@material-ui/core";export const Button = () => {}const ButtonSettings = () => {  const { actions: {setProp}, props } = useNode((node) => ({    props: node.data.props  }));  return (    <div>      <FormControl size="small" component="fieldset">        <FormLabel component="legend">Size</FormLabel>        <RadioGroup defaultValue={props.size} onChange={(e) => setProp(props => props.size = e.target.value )}>          <FormControlLabel label="Small" value="small" control={<Radio size="small" color="primary" />} />          <FormControlLabel label="Medium" value="medium" control={<Radio size="small" color="primary" />} />          <FormControlLabel label="Large" value="large" control={<Radio size="small" color="primary" />} />        </RadioGroup>      </FormControl>      <FormControl component="fieldset">        <FormLabel component="legend">Variant</FormLabel>        <RadioGroup defaultValue={props.variant} onChange={(e) => setProp(props => props.variant = e.target.value )}>          <FormControlLabel label="Text" value="text" control={<Radio size="small" color="primary" />} />          <FormControlLabel label="Outlined" value="outlined" control={<Radio size="small" color="primary" />} />          <FormControlLabel label="Contained" value="contained" control={<Radio size="small" color="primary" />} />        </RadioGroup>      </FormControl>      <FormControl component="fieldset">        <FormLabel component="legend">Color</FormLabel>        <RadioGroup defaultValue={props.color} onChange={(e) => setProp(props => props.color = e.target.value )}>          <FormControlLabel label="Default" value="default" control={<Radio size="small" color="default" />} />          <FormControlLabel label="Primary" value="primary" control={<Radio size="small" color="primary" />} />          <FormControlLabel label="Seconday" value="secondary" control={<Radio size="small" color="primary" />} />        </RadioGroup>      </FormControl>    </div>  )};Button.craft = {  related: {     settings: ButtonSettings  }}
```

```
// components/user/Container.jsimport {FormControl, FormLabel, Slider} from "@material-ui/core";import ColorPicker from 'material-ui-color-picker'export const Container = () => {...}export const ContainerSettings = () => {  const { background, padding, actions: {setProp} } = useNode(node => ({    background: node.data.props.background,    padding: node.data.props.padding  }));  return (    <div>      <FormControl fullWidth={true} margin="normal" component="fieldset">        <FormLabel component="legend">Background</FormLabel>        <ColorPicker defaultValue={background || '#000'} onChange={color => {          setProp(props => props.background = color)        }} />      </FormControl>      <FormControl fullWidth={true} margin="normal" component="fieldset">        <FormLabel component="legend">Padding</FormLabel>        <Slider defaultValue={padding} onChange={(_, value) => setProp(props => props.padding = value)} />      </FormControl>    </div>  )}Container.craft = {  related: {    settings: ContainerSettings  }}
```

```
// components/user/Card.jsimport {ContainerSettings} from "./Container";export const Card({background, padding = 20}) { ... }Card.craft = {  related: {    // Since Card has the same settings as Container, we'll just reuse ContainerSettings     settings: ContainerSettings  }}
```

#### Setting default props[​](https://craft.js.org/docs/guides/basic-tutorial#setting-default-props "Direct link to Setting default props")

Setting default props is not strictly necessary. However, it is helpful if we wish to access the component's props via its corresponding `Node`, like what we did in the `settings` related component above.

For instance, if a Text component is rendered as `<Text text="Hi" />`, we would get a null value when we try to retrieve the `fontSize` prop via its `Node`. An easy way to solve this is to explicity define each User Component's `props`:

```
// components/user/Text.jsexport const Text = ({text, fontSize}) => {}Text.craft = {  props: {    text: "Hi",    fontSize: 20  },  rules: {...},  related: {...}}
```

```
// components/user/Button.jsexport const Button = ({size, variant, color, text}) => {}Button.craft = {  props: {     size: "small",     variant: "contained",    color: "primary",    text: "Click me"  },  related: {...}}
```

```
// components/user/Container.jsexport const Container = ({background, padding}) => {}// We export this because we'll be using this in the Card component as wellexport const ContainerDefaultProps = {  background : "#ffffff",  padding: 3};Container.craft = {  props: ContainerDefaultProps,  related: {...}}
```

```
// components/user/Card.jsimport {ContainerDefaultProps} from "./Container";export const Card = ({background, padding}) => {}Card.craft = {  props: ContainerDefaultProps,  related: {...}}
```

### Settings Panel[​](https://craft.js.org/docs/guides/basic-tutorial#settings-panel-1 "Direct link to Settings Panel")

We need to get the currently selected component which can be obtained from the editor's internal state. Similar to `useNode`, a collector function can be specified to `useEditor`. The difference is here, we'll be dealing with the editor's internal state rather than with a specific `Node`:

```
const { currentlySelectedId } = useEditor((state) => {  const [currentlySelectedId] = state.events.selected;  return {    currentlySelectedId  }})
```

> Note: state.events.selected is of type `Set<string>`. This is because in the case of multi-select, it's possible for the user to select multiple Nodes by holding down the `<meta>` key.

Now, let's replace the placeholder text fields in our Settings Panel with the `settings` Related Component:

```
// components/SettingsPanel.jsimport { Box, Chip, Grid, Typography, Button as MaterialButton } from "@material-ui/core";import { useEditor } from "@craftjs/core";export const SettingsPanel = () => {  const { selected } = useEditor((state) => {    const [currentNodeId] = state.events.selected;    let selected;    if ( currentNodeId ) {      selected = {        id: currentNodeId,        name: state.nodes[currentNodeId].data.name,        settings: state.nodes[currentNodeId].related && state.nodes[currentNodeId].related.settings      };    }    return {      selected    }  });  return selected ? (        <Box bgcolor="rgba(0, 0, 0, 0.06)" mt={2} px={2} py={2}>      <Grid container direction="column" spacing={0}>        <Grid item>          <Box pb={2}>            <Grid container alignItems="center">              <Grid item xs><Typography variant="subtitle1">Selected</Typography></Grid>              <Grid item><Chip size="small" color="primary" label={selected.name} /></Grid>            </Grid>          </Box>        </Grid>        {           selected.settings && React.createElement(selected.settings)        }        <MaterialButton          variant="contained"          color="default"        >          Delete        </MaterialButton>      </Grid>    </Box>  ) : null}
```

Now, we have to make our Delete button work. We can achieve this by using the `delete` action available from the `useEditor` hook.

Also, it's important to note that not all nodes are deletable - if we try to delete an undeletable Node, it'll result in an error. Hence, it's good to make use of the [helper](https://craft.js.org/docs/api/helpers) methods which helps describe a Node. In our case, we would like to know if the currently selected Node is deletable before actually displaying the "Delete" button. We can access the helper methods via the `node` query in the `useEditor` hook.

```
// components/SettingsPanel.jsexport const SettingsPanel = () => {  const { actions, selected } } = useEditor((state, query) => {    const [currentNodeId] = state.events.selected;    let selected;    if ( currentNodeId ) {      selected = {        id: currentNodeId,        name: state.nodes[currentNodeId].data.name,        settings: state.nodes[currentNodeId].related && state.nodes[currentNodeId].related.settings,        isDeletable: query.node(currentNodeId).isDeletable()      };    }    return {      selected    }  });  return selected ? (    <Box bgcolor="rgba(0, 0, 0, 0.058823529411764705)" mt={2} px={2} py={2}>      <Grid container direction="column" spacing={0}>        ...        {          selected.isDeletable ? (            <MaterialButton              variant="contained"              color="default"              onClick={() => {                actions.delete(selected.id);              }}            >              Delete            </MaterialButton>          ) : null        }      </Grid>    </Box>  ) : null}
```

![](/img/tutorial/settings-panel.gif)

### Topbar[​](https://craft.js.org/docs/guides/basic-tutorial#topbar "Direct link to Topbar")

This is the last part of the editor that we have to take care of and then we're done!

First, we can get the editor's `enabled` state by passing in a collector function just like what we did before. Then, we can use the `setOptions` action to toggle the `enabled` state.

Lastly, the `useEditor` hook also provides `query` methods which provide information based the editor'state. In our case, we would like to get the current state of all the `Nodes` in a serialized form; we can do this by calling the `serialize` query method.

```
// components/Topbar.jsimport React from "react";import { Box, FormControlLabel, Switch, Grid, Button as MaterialButton } from "@material-ui/core";import { useEditor } from "@craftjs/core";export const Topbar = () => {  const { actions, query, enabled } = useEditor((state) => ({    enabled: state.options.enabled  }));  return (    <Box px={1} py={1} mt={3} mb={1} bgcolor="#cbe8e7">      <Grid container alignItems="center">        <Grid item xs>          <FormControlLabel            control={<Switch checked={enabled} onChange={(_, value) => actions.setOptions(options => options.enabled = value)} />}            label="Enable"          />        </Grid>        <Grid item>          <MaterialButton             size="small"             variant="outlined"             color="secondary"            onClick={() => {              console.log(query.serialize())            }}          >              Serialize JSON to console          </MaterialButton>        </Grid>      </Grid>    </Box>  )};
```

![](/img/tutorial/topbar.gif)

> We'll explore how to compress the JSON output and have the editor load from the serialised JSON in the [Save and Load](https://craft.js.org/docs/guides/save-load-state) guide.

## You made it 🎉[​](https://craft.js.org/docs/guides/basic-tutorial#you-made-it- "Direct link to You made it 🎉")

We've made it to the end! Not too bad right? Hopefully, you're able to see the simplicity of building a fully working page editor with Craft.js.

We do not need to worry about implementing the drag-n-drop system but rather simply focus on writing rules and attaching connectors to the desired elements.

When it comes to writing the components themselves, it is the same as writing any other React component - you control how the components react to different editor events and how they are edited.
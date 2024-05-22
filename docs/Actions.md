## Actions 
Actions define the behavior of the app in response to user interactions with the Primitive Elements or Components. Actions can be triggered by user interactions, such as clicking a button, hovering over an element, etc. Actions can also be triggered by external events, such as receiving data from an API, a timer, etc. Actions are the key to creating interactive user interfaces that respond to user input and external events.

## Action Editor
The Action Editor is a node-based visual interface that allows you to create and manage actions for Primitive Elements or Components.
It uses the 'react-flow' library to create a flowchart-like interface where you can add nodes representing events, conditions, and actions, and connect them to define the logic of the action.

## Types of Nodes
There are 3 types of nodes that can be added to the Action Editor:
1. **Event Nodes**: These nodes represent events that can trigger an action. For example, you can add a 'Click' event node to trigger an action when a button is clicked.
2. **Condition Nodes**: These nodes represent conditions that can be checked before triggering an action. For example, you can add a 'Greater Than' condition node to check if a value is greater than a certain number before triggering an action.
3. **Action Nodes**: These nodes represent actions that can be triggered in response to an event. For example, you can add a 'Show Message' action node to display a message when a button is clicked.

### Conditional Nodes
Conditional nodes can be used to define conditions that must be met before an action is triggered. You can add multiple conditions to an action by connecting them to the 'And' or 'Or' nodes. The 'And' node requires all conditions to be true, while the 'Or' node requires at least one condition to be true.


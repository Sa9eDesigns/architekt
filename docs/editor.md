*developer notes*
## Editor - Part 1
As mentioned in the [Editable Fields](./editableFields.md) section, We will be using RekaJs to build the editor. RekaJs is a state management system for building no-code editors. It provides an AST-powered state system that enables end-users to create UI components that are nearly as complex as ones that developers could write in code. 

### ARCHITEKT Utilization of RekaJs
One of the drawbacks of using RekaJs is that a lot of boilerplate code is required to set a simple editor. 
this includes setting up the state, the components, the template, and the interpreter.

What we need is a way to dynamically generate the state, components, template, and interpreter based on some configuration. This is where a **Project** comes in. Part of a project's definition is a configuration that describes the editor's structure. This configuration is then used to generate the necessary boilerplate code to set up the editor.



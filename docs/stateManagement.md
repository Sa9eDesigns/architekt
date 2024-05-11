*developer notes*
## State Management 
This Document describes the state management systems used in the Architekt project.

### Overview
There are many reasons why state management is an important Design consideration. The most important of which is the ability to maintain a consistent state across the application. This is especially important in Architekt, as the state of the editor is what is used to generate the final output. 
The Editor state itself is also a complex object, with many different parts that need to be managed independently. Using the Wrong approach could lead to Performance issue and a lot of boilerplate code.
Hence we need state management that is both efficient and easy to use.

### Jotai - chosen state management system
Jotai is a simple and efficient state management library that is used in Architekt. It is based on the concept of atoms and derived atoms. Atoms are the basic unit of state in Jotai, and they can be composed to create more complex states. Furthermore Jotai is also very efficient, as it only re-renders the components that are affected by the state change. This makes it ideal for use in Architekt, as the editor is a complex system with many different parts that need to be managed independently. Which means that all We would to Globally Persist when saving All States is the Root Atom.

### Implementation
It is recommended that we create an atom for each part of the editor that needs to be managed. In other words, each component of the editor should have its own atom. also if the component has children, then it should have its own atom as well. 
This way, we can manage the state of each part of the editor independently, and only re-render the components that are affected by the state change.
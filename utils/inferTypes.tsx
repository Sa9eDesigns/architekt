/*This Util Function is responsible for inferring the types of the provided data
- It Uses lodash to process Nested Objects and Arrays and infer the types
- it accepts a Nested Object or Array and:
* and an onject notated string of the data to infer
- Then returns interfaces aand types for the data
- This is used to generate types for the data in the supabase database
- This is used in the project server actions to infer the types of the data
*/

import _ from 'lodash';

const inferTypesUtil = (data: any, name: string = 'T') => {
  // Check if the data is an array
  if (Array.isArray(data)) {
    // If the data is an array, get the first element
    data = data[0];
  }

  // Check if the data is an object
  if (typeof data === 'object') {
    // Get the keys of the object
    const keys = Object.keys(data);

    // Create an interface for the data
    let interfaceString = `export interface ${name} {\n`;

    // Loop through the keys
    keys.forEach((key) => {
      // Get the value of the key
      const value = data[key];

      // Check if the value is an object
      if (typeof value === 'object') {
        // If the value is an object, get the keys
        const valueKeys = Object.keys(value);

        // Create an interface for the value
        let valueInterfaceString = `export interface ${_.upperFirst(key)} {\n`;

        // Loop through the value keys
        valueKeys.forEach((valueKey) => {
          // Get the value of the value key
          const valueValue = value[valueKey];

          // Add the value key to the interface
          valueInterfaceString += `  ${valueKey}: ${typeof valueValue};\n`;
        });

        // Close the interface
        valueInterfaceString += `}\n`;

        // Add the value interface to the interface
        interfaceString += `  ${key}: ${_.upperFirst(key)};\n`;

        // Add the value interface to the interface
        interfaceString += valueInterfaceString;
      } else {
        // Add the key to the interface
        interfaceString += `  ${key}: ${typeof value};\n`;
      }
    });

    // Close the interface
    interfaceString += `}\n`;

    // Return the interface
    return interfaceString;
  }

  // Return the type
  return `export type ${name} = ${typeof data};`;
}

export default inferTypesUtil;

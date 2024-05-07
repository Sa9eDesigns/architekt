// src/components/Editor.tsx
import * as t from '@rekajs/types';
import { useReka } from '@rekajs/react';
import * as React from 'react';
import { Parser } from '@rekajs/parser';


export const Editor = () => {

  const { reka } = useReka();

  // State for the new text value
  const [newTextValue, setNewTextValue] = React.useState('');

  return (
            <div>
            <input
                type="text"
                placeholder="New value"
                value={newTextValue}
                onChange={(e) => setNewTextValue(e.target.value)}
            />
            <button
                className="text-sm px-3 py-2 rounded bg-neutral-200 text-neutral-600"
                onClick={() => {
                    if (!newTextValue) {
                        return;
                    }
                    try {
                        const parsedTextValue = Parser.parseExpression(newTextValue);
                        const appComponent = reka.state.program.components.find(
                            (component) => component.name === 'App'
                        );
                        if (!appComponent) {
                            return;
                        }
                        reka.change(() => {
                            appComponent.template.children.push(
                                t.tagTemplate({
                                tag: 'text',
                                props: {
                                    value: parsedTextValue,
                                },
                                children: [],
                                })
                            );
                        });
                    } catch (err) {
                        console.warn(err);
                    }
                }}
            >
                Add a new text template
            </button>
        </div>
  );
};
// src/components/Base/Base.tsx
import React, { useEffect, useState } from "react";
import { Provider, useAtom } from "jotai";
import {
  componentsAtom,
  addComponentAtom,
  removeComponentAtom,
  initializeComponentsAtom,
} from "./StateManagement/atoms";
import { CraftEditor } from "../Editor/Editor";

interface I_BaseProps{
  children: React.ReactNode;
}

interface BaseComponentProps {
  children: React.ReactNode;
}

const BaseComponent: React.FC<BaseComponentProps> = ({ children }) => {
  const [components, setComponents] = useAtom(componentsAtom);
  const [, addComponent] = useAtom(addComponentAtom);
  const [, removeComponent] = useAtom(removeComponentAtom);
  const [, initializeComponents] = useAtom(initializeComponentsAtom);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    initializeComponents().catch((err) => setError(err.message));
  }, [initializeComponents]);

  const handleAddComponent = (component: any) => {
    addComponent(component).catch((err) => setError(err.message));
  };

  const handleRemoveComponent = (id: string) => {
    removeComponent(id).catch((err) => setError(err.message));
  };

  const handleCloseNotification = () => {
    setError(null);
  };

  return (
    <div>
      <CraftEditor
        onAddComponent={handleAddComponent}
        onRemoveComponent={handleRemoveComponent}
      />
      {error && (
        <div>
          <p>{error}</p>
          <button onClick={handleCloseNotification}>Close</button>
        </div>
      )}
    </div>
  );
};

export const Base: React.FC<BaseComponentProps> = ({ children }) => (
  <Provider>
    <BaseComponent>{children}</BaseComponent>
  </Provider>
);

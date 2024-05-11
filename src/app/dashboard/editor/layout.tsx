"use client";

import * as React from "react";
import {DndContext} from '@dnd-kit/core';

export default function Editor({
  children,
}: {
  children: React.ReactNode;
}) {
  return(
    <DndContext>
      {children}
    </DndContext>
  )
}

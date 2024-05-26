"use client";

// src/state/atoms.ts
import { atom } from "jotai";
import { createClient } from "@/supabase/client";

export interface Component {
  id: string;
  type: string;
  props: any;
}

export const componentsAtom = atom<Component[]>([]);
const supabase = createClient();

export const initializeComponentsAtom = atom(null, async (get, set) => {
  const { data, error } = await supabase.from("components").select("*");

  if (error) {
    console.error("Error loading components:", error);
  } else {
    set(componentsAtom, data);

    // Set up real-time subscription
    const subscription = supabase
      .from("components")
      .on("*", (payload) => {
        switch (payload.eventType) {
          case "INSERT":
            set(componentsAtom, [...get(componentsAtom), payload.new]);
            break;
          case "UPDATE":
            set(
              componentsAtom,
              get(componentsAtom).map((c) =>
                c.id === payload.new.id ? payload.new : c
              )
            );
            break;
          case "DELETE":
            set(
              componentsAtom,
              get(componentsAtom).filter((c) => c.id !== payload.old.id)
            );
            break;
          default:
            break;
        }
      })
      .subscribe();

    return () => {
      supabase.removeSubscription(subscription);
    };
  }
});

export const addComponentAtom = atom(
  null,
  async (get, set, newComponent: Component) => {
    const currentComponents = get(componentsAtom);
    set(componentsAtom, [...currentComponents, newComponent]);

    // Optimistic UI update
    const optimisticComponents = [...currentComponents, newComponent];
    set(componentsAtom, optimisticComponents);

    // Persist to Supabase
    const { data, error } = await supabase
      .from("components")
      .insert([newComponent]);

    if (error) {
      console.error("Error adding component:", error);
      // Revert UI update if error occurs
      set(componentsAtom, currentComponents);
    }
  }
);

export const removeComponentAtom = atom(
  null,
  async (get, set, componentId: string) => {
    const currentComponents = get(componentsAtom);
    const updatedComponents = currentComponents.filter(
      (c) => c.id !== componentId
    );
    set(componentsAtom, updatedComponents);

    // Optimistic UI update
    const optimisticComponents = currentComponents.filter(
      (c) => c.id !== componentId
    );
    set(componentsAtom, optimisticComponents);

    // Remove from Supabase
    const { error } = await supabase
      .from("components")
      .delete()
      .eq("id", componentId);

    if (error) {
      console.error("Error removing component:", error);
      // Revert UI update if error occurs
      set(componentsAtom, currentComponents);
    }
  }
);

"use client";

import { useEffect } from "react";

import {
  readSectionsFromStorage,
  writeSectionsToStorage,
} from "@/lib/json-utils";
import { useBuilderStore } from "@/store/builder-store";

export function BuilderPersistence() {
  const replaceSections = useBuilderStore((state) => state.replaceSections);

  useEffect(() => {
    const savedSections = readSectionsFromStorage();

    if (savedSections) {
      replaceSections(savedSections);
    }

    return useBuilderStore.subscribe((state, previousState) => {
      if (state.sections !== previousState.sections) {
        writeSectionsToStorage(state.sections);
      }
    });
  }, [replaceSections]);

  return null;
}

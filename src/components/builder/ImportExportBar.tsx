"use client";

import { useRef, useState } from "react";
import type { ChangeEvent } from "react";
import { Download, RotateCcw, Upload } from "lucide-react";

import { Button } from "@/components/ui/Button";
import {
  clearSavedSections,
  exportSectionsAsJson,
  parseImportedSections,
} from "@/lib/json-utils";
import { useBuilderStore } from "@/store/builder-store";

export function ImportExportBar() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [statusMessage, setStatusMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const sections = useBuilderStore((state) => state.sections);
  const replaceSections = useBuilderStore((state) => state.replaceSections);
  const resetBuilder = useBuilderStore((state) => state.resetBuilder);

  const showStatus = (message: string) => {
    setErrorMessage("");
    setStatusMessage(message);
  };

  const showError = (message: string) => {
    setStatusMessage("");
    setErrorMessage(message);
  };

  const handleExport = () => {
    exportSectionsAsJson(sections);
    showStatus("Design exported.");
  };

  const handleImport = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";

    if (!file) {
      return;
    }

    const result = parseImportedSections(await file.text());

    if (!result.ok) {
      showError(result.error);
      return;
    }

    replaceSections(result.sections);
    showStatus("Design imported.");
  };

  const handleReset = () => {
    const shouldReset =
      sections.length === 0 ||
      window.confirm("Reset the builder and clear the saved design?");

    if (!shouldReset) {
      return;
    }

    clearSavedSections();
    resetBuilder();
    showStatus("Builder reset.");
  };

  return (
    <header className="sticky top-0 z-20 border-b border-zinc-200 bg-white/95 px-4 py-3 backdrop-blur">
      <div className="mx-auto flex max-w-[1600px] flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-lg font-semibold text-zinc-950">
            Mini Website Builder
          </h1>
          <p className="text-sm text-zinc-500">
            Build, preview, import, and export simple landing pages.
          </p>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          {(statusMessage || errorMessage) && (
            <p
              className={`text-sm ${
                errorMessage ? "text-red-600" : "text-zinc-500"
              }`}>
              {errorMessage || statusMessage}
            </p>
          )}

          <div className="flex flex-wrap gap-2">
            <input
              ref={fileInputRef}
              type="file"
              accept="application/json,.json"
              className="hidden"
              onChange={handleImport}
            />
            <Button onClick={() => fileInputRef.current?.click()}>
              <Upload size={16} />
              Import
            </Button>
            <Button onClick={handleExport} variant="primary">
              <Download size={16} />
              Export
            </Button>
            <Button
              onClick={handleReset}
              className="hover:border-red-200 hover:bg-red-50 hover:text-red-700">
              <RotateCcw size={16} />
              Reset
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}

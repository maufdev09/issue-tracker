"use client";

import React from "react";
import dynamic from "next/dynamic";
import { Button, TextField } from "@radix-ui/themes";
import "easymde/dist/easymde.min.css";

// ✅ IMPORTANT FIX
const SimpleMdeReact = dynamic(
  () => import("react-simplemde-editor"),
  { ssr: false }
);

const NewIssuepage = () => {
  return (
    <div className="max-w-xl space-y-4 mx-auto p-4">
      <TextField.Root placeholder="New Issue Title" />

      <SimpleMdeReact
        placeholder="Describe the issue in detail"
        className="mt-4"
      />

      <Button>Submit Issue</Button>
    </div>
  );
};

export default NewIssuepage;

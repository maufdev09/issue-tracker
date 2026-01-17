"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { Button, Callout, Text, TextField } from "@radix-ui/themes";
import "easymde/dist/easymde.min.css";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { createIssueSchema } from "@/app/validationSchemeas";
import z from "zod";

// ✅ IMPORTANT FIX
const SimpleMdeReact = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

// interface Issueform {
//   title: string;
//   description: string;
// }
type IssueForm = z.infer<typeof createIssueSchema>;

const NewIssuepage = () => {
  const router = useRouter();
   
  const [error, setError] = useState("");

  const { register, handleSubmit, control, formState:{errors}} = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema),
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      await axios.post("/api/issues", data);
      router.push("/issue");
    } catch (error) {
      console.log(error);
      setError("Failed to create issue. Please try again.");
    }
  });

  return (
    <div className="max-w-xl mx-auto p-4 space-y-4">
      {error && (
        <Callout.Root color="red">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}

      <form onSubmit={onSubmit} className=" space-y-4 ">
        <TextField.Root placeholder="New Issue Title" {...register("title")} />
{ errors.title && (
        <Text color="red" as="div">{errors.title.message}</Text>
 )}
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMdeReact
              placeholder="Describe the issue in detail"
              {...field}
            />
          )}
        />
        {
          errors.description && (
            <Text as="div" color="red">{errors.description.message}</Text>
          )
        }

        <Button>Submit Issue</Button>
      </form>
    </div>
  );
};

export default NewIssuepage;

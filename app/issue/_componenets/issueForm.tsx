"use client";

import { ErrorMessage, Spinner } from "@/app/components";
import { Issue } from "@/app/generated/prisma/client";
import { IssueSchema } from "@/app/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Callout, TextField } from "@radix-ui/themes";
import axios from "axios";
import dynamic from "next/dynamic";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import SimpleMdeReact from'react-simplemde-editor'
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import z from "zod";


// ✅ IMPORTANT Type
type IssueFormData = z.infer<typeof IssueSchema>;

// const SimpleMdeReact = dynamic(() => import('react-simplemde-editor'), { ssr: false });

 

const IssueForm = ({ issue }: { issue?: Issue }) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IssueFormData>({
    resolver: zodResolver(IssueSchema),
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      setIsSubmitting(true);
      if (issue) {
        await axios.patch(`/api/issues/${issue.id}`, data);
      }
      else {
        await axios.post("/api/issues", data);
      }
      router.push("/issue");
      router.refresh();
    } catch (error) {
      setIsSubmitting(false);
      setError("Failed to create issue. Please try again.");
    }
  });

  return (
    <div className=" p-4 space-y-4">
      {error && (
        <Callout.Root color="red">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}

      <form onSubmit={onSubmit} className=" space-y-4 ">
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <TextField.Root defaultValue={issue?.title} placeholder="New Issue Title" {...register("title")} />

        <ErrorMessage>{errors.description?.message}</ErrorMessage>

        <Controller
          name="description"
          control={control}
          defaultValue={issue?.description || ""}
          render={({ field }) => ( 
            <SimpleMdeReact
              placeholder="Describe the issue in detail"
              {...field}
            />
          )}
        />

        <Button disabled={isSubmitting} type="submit" >
          {issue ? 'Update Issue' : 'Submit Issue'}{' '}
          {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  ); 
};

export default IssueForm;

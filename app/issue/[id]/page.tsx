import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import React from "react";
import { is } from "zod/locales";

interface IssueDetailPageProps {
  params: { id: string };
}

const IssueDetailPage = async ({ params }: IssueDetailPageProps) => {
  const { id } = await params; 

  const issueNumber = parseInt(id);

  const issue = await prisma.issue.findUnique({
    where: { id: issueNumber },
  });

  if (!issue) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{issue.title}</h1>
      <p>{issue.description}</p>
      <p className="mb-2">
        <strong>Status:</strong> {issue.status}
      </p>
      <p>
        <strong>Created At:</strong> {issue.createdAt.toLocaleDateString()}
      </p>
    </div>
  );
};

export default IssueDetailPage;

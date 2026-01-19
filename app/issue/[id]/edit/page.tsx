import prisma from "@/prisma/client";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import IssueFormSkeleton from "./loading";

interface EditIssuePageProps {
  params: { id: string };
}

const IssueForm = dynamic(() => import("../../_componenets/issueForm"), {
  loading: () => <IssueFormSkeleton />,
});

const EditIssuePage = async ({ params }: EditIssuePageProps) => {
  const { id } = await params;
  const issueNumber = parseInt(id);

  const issue = await prisma.issue.findUnique({
    where: { id: issueNumber },
  });

  if (!issue) notFound();

  return (
    <div>
      <IssueForm issue={issue} />
    </div>
  );
};

export default EditIssuePage;

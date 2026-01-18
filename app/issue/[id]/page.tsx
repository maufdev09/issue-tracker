import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import prisma from "@/prisma/client";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
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
      <Heading > {issue.title}</Heading>
      <Flex gap="2" align="center" my={"4"}>
        <IssueStatusBadge status={issue.status} />
        <Text size={"2"} >{issue.createdAt.toLocaleDateString()} </Text>
      </Flex>
      <Card  mt="2">

      <p>{issue.description}</p>
      </Card>
     
    </div>
  );
};

export default IssueDetailPage;

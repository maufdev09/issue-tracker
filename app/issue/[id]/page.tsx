import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import prisma from "@/prisma/client";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import ReactMarkdown from 'react-markdown'


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
    <div className="max-w-2xl">
      <Heading > {issue.title}</Heading>
      <Flex gap="2" align="center" my={"4"}>
        <IssueStatusBadge status={issue.status} />
        <Text size={"2"} >{issue.createdAt.toLocaleDateString()} </Text>
      </Flex>
      <Card   className="prose dark:prose-invert max-w-none" mt="4  ">

      <ReactMarkdown>{issue.description}</ReactMarkdown>
      </Card>
     
    </div>
  );
};

export default IssueDetailPage;

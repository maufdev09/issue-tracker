import prisma from "@/prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import EditIssueButton from "./EditIssueButton";
import IssueDetail from "./IssueDetail";
import DeleteIssueButton from "./DeleteIssueButton";

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
    <Grid columns={{ initial: "1", sm: "5" }} gap="8">
      <Box className="md:col-span-4">
        <IssueDetail  issue={issue} />
      </Box>

      <Box>
        <Flex direction={"column"} gap="4" justify="start" mb="4">

        <EditIssueButton issueId={issue.id} />
        <DeleteIssueButton issueId={issue.id} />
        </Flex>
      </Box>
    </Grid>
  );
};

export default IssueDetailPage;

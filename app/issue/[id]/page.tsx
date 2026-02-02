import prisma from "@/prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import EditIssueButton from "./EditIssueButton";
import IssueDetail from "./IssueDetail";
import DeleteIssueButton from "./DeleteIssueButton";
import { auth } from "@/auth";
import AssignSelect from "./AssignSelect";
import { title } from "process";
import { cache } from "react";

interface IssueDetailPageProps {
  params: { id: string };
}
const fetchUser=cache((issueId:number)=>prisma.issue.findUnique({
    where: { id: issueId }
  }))


const IssueDetailPage = async ({ params }: IssueDetailPageProps) => {
  const session = await auth();

  const { id } = await params;
  const issueNumber = parseInt(id);

  const issue = await fetchUser(issueNumber);

  if (!issue) notFound();

  return (
    <Grid columns={{ initial: "1", sm: "5" }} gap="8">
      <Box className="md:col-span-4">
        <IssueDetail issue={issue} />
      </Box>

      <Box>
        {session && (
          <Flex direction={"column"} gap="4" justify="start" mb="4">
            <AssignSelect issue={issue} />
            <EditIssueButton issueId={issue.id} />
            <DeleteIssueButton issueId={issue.id} />
          </Flex>
        )}
      </Box>
    </Grid>
  );
};
export async function generateMetadata({ params }:IssueDetailPageProps) {
    const { id } = await params;
    const issue= await fetchUser(parseInt(id))

  return{
    title:issue?.title,
    description:  `Detail of issue ${issue?.id}`
  }
}



export default IssueDetailPage;

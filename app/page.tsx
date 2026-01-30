import prisma from "@/prisma/client";
import Pagination from "./components/Pagination";
import LatestIssue from "./LatestIssue";
import IssueSummary from "./IssueSummary";
import { Flex, Grid } from "@radix-ui/themes";
import IssueChart from "./issueChart";

export  default  async function Home() {
  const open = await prisma.issue.findMany({
   where: { status: "OPEN" },
  
  }); 
  const inProgress = await prisma.issue.findMany({
    where: { status: "IN_PROGRESS" },
  
  });
  const closed = await prisma.issue.findMany({
    where: { status: "CLOSED" },
  
  });


  return (
  <Grid  columns={{initial:'1', md:"2"}} gap="4">
<Flex direction={'column'} gap={"4"}>
<IssueSummary open={open.length} inProgress={inProgress.length} closed={closed.length}  />
<IssueChart open={open.length} inProgress={inProgress.length} closed={closed.length}></IssueChart>

</Flex> 
<LatestIssue />
  </Grid>
  );
}

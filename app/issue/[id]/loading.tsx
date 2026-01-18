import { Box, Card, Flex } from "@radix-ui/themes";
import {Skeleton} from '@/app/components';


const IssueDetailLoading = () => {
  return (
    <Box  className="max-w-xl">
      <Skeleton />
      <Flex gap="2" align="center" my={"4"}>
        <Skeleton width="5rem" />
        <Skeleton width="8rem" />
      </Flex>
      <Card className="prose dark:prose-invert max-w-none" mt="4  ">
        <Skeleton count={3} />
      </Card>
    </Box>
  );
};

export default IssueDetailLoading;

import { Card, Flex, Text } from "@radix-ui/themes";

import { Status } from "./generated/prisma/enums";
import { Link } from "./components";
interface IssueSummaryProps {
  open: number;
  inProgress: number;
  closed: number;
}
const IssueSummary = ({ open, inProgress, closed }: IssueSummaryProps) => {
  const statuses: {
    label: string;
    value: number;
    status: Status;
  }[] = [
    { label: "Open Issues", value: open, status: Status.OPEN },
    { label: "In Progress", value: inProgress, status: Status.IN_PROGRESS },
    { label: "Closed", value: closed, status: Status.CLOSED },
  ];

  return (
    <Flex gap="4">
      {statuses.map((item) => (
        <Card key={item.label}>
          <Flex direction="column" gap="2" align="center" justify="center">
            <Link href={`/issue/list?status=${item.status}`}>{item.label}</Link>
            <Text size="5" weight="bold">
              {item.value > 0 && item.value}
            </Text>
          </Flex>
        </Card>
      ))}
    </Flex>
  );
};

export default IssueSummary;

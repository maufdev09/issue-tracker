import prisma from "@/prisma/client";
import { Table } from "@radix-ui/themes";
import IssueAction from "./IssueAction";
import {IssueStatusBadge,Link} from '@/app/components';

const Issuepage = async () => {
  const issues = await prisma.issue.findMany();

  return (
    <div>
      <IssueAction />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Title</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Status
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Created
            </Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Link href={`/issue/${issue.id}`}>{issue.title}</Link>
                <div className=" block md:hidden">
                  Status: <IssueStatusBadge status={issue.status} /> | Created:{" "}
                  {issue.createdAt.toLocaleDateString()}
                </div>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <IssueStatusBadge status={issue.status} />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {issue.createdAt.toLocaleDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export default Issuepage;

import prisma from "@/prisma/client";
import { Table } from "@radix-ui/themes";
import IssueAction from "./IssueAction";
import { IssueStatusBadge, Link } from "@/app/components";
import { Status } from "@/app/generated/prisma/enums";
import NextLink from "next/link";

/* -------------------------------------------------------------------------- */
/*                                CONFIG                                      */
/* -------------------------------------------------------------------------- */

const VALID_ORDER_BY = ["title", "status", "createdAt"] as const;
type OrderBy = (typeof VALID_ORDER_BY)[number];

const VALID_STATUS = Object.values(Status);

/* -------------------------------------------------------------------------- */
/*                                PAGE                                        */
/* -------------------------------------------------------------------------- */

interface IssuePageProps {
  params?: {
    status?: string;
    orderBy?: string;
  };
}

const Issuepage = async ({ searchParams }: IssuePageProps) => {
  /* -------------------------- VALIDATION LOGIC --------------------------- */


  const params = await searchParams;
  const status =
    params?.status && VALID_STATUS.includes(params.status as Status)
      ? (params.status as Status)
      : undefined;

  const orderBy: OrderBy = VALID_ORDER_BY.includes(
    params?.orderBy as OrderBy
  )
    ? (params?.orderBy as OrderBy)
    : "createdAt";

  /* ----------------------------- DB QUERY -------------------------------- */

  const issues = await prisma.issue.findMany({
    where: { status },
    orderBy: { [orderBy]: "desc" },
  });

  /* ------------------------------ UI ------------------------------------- */

  const columns: { label: string; value: OrderBy; className?: string }[] = [
    { label: "Issue", value: "title" },
    {
      label: "Status",
      value: "status",
      className: "hidden md:table-cell",
    },
    {
      label: "Created",
      value: "createdAt",
      className: "hidden md:table-cell",
    },
  ];

  return (
    <div>
      <IssueAction />

      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            {columns.map((col) => (
              <Table.ColumnHeaderCell
                key={col.value}
                className={col.className}
              >
                <NextLink
                  href={{
                    query: {
                      ...params,
                      orderBy: col.value,
                    },
                  }}
                  className="hover:underline"
                >
                  {col.label}
                </NextLink>
                {orderBy === col.value ? " 🔽" : " 🔼"}
              </Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Link href={`/issue/${issue.id}`}>{issue.title}</Link>
                <div className="block md:hidden text-sm text-gray-500">
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

export const dynamic = "force-dynamic";
export default Issuepage;

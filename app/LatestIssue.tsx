import prisma from '@/prisma/client'
import { Avatar, Card, Flex, Heading, Table } from '@radix-ui/themes'
import React from 'react'
import { IssueStatusBadge, Link } from './components'
import { start } from 'repl'

const LatestIssue = async () => {
    const issues = await prisma.issue.findMany({
        orderBy: { createdAt: 'desc' },
        take: 5,
        include: { assignedToUser: true },
    })
  return (
    <Card>
  
<Heading size="4" mb="4">Latest Issues</Heading>
     
      <Table.Root>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Flex justify={'between'}  gap="1">

                <Flex direction="column" align={'start'} gap="1">

                  <Link href={`/issue/${issue.id}`}>{issue.title}</Link>
                  <IssueStatusBadge status={issue.status} />
                </Flex>
                {
                  issue.assignedToUser && issue.assignedToUser.name &&
                  <Avatar
                    src={issue.assignedToUser.image!}
                    fallback={issue.assignedToUser.name[0]}
                    size="1"
                    radius='full'
                  />
                }
                </Flex>
               </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </ Card>
  )
}

export default LatestIssue

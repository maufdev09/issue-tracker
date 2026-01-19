import { IssueStatusBadge } from '@/app/components'
import { Issue } from '@/app/generated/prisma/client'
import { Box, Heading, Flex, Card, Text } from '@radix-ui/themes'
import React from 'react'
import ReactMarkdown from 'react-markdown'


const IssueDetail = ({issue}:{issue: Issue}) => {
  return (
      <>

      <Heading > {issue.title}</Heading>
      <Flex gap="2" align="center" my={"4"}>
        <IssueStatusBadge status={issue.status} />
        <Text size={"2"} >{issue.createdAt.toLocaleDateString()} </Text>
      </Flex> 
      <Card   className="prose max-w-full dark:prose-invert " mt="4  ">

      <ReactMarkdown>{issue.description}</ReactMarkdown>
      </Card>
     
      </>
  )
}

export default IssueDetail

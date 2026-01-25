import { Button, Flex } from '@radix-ui/themes'
import Link from 'next/link'
import React from 'react'
import IssueStatusFilter from './IssueStatusFilter'

const IssueAction = () => {
  return (
    <Flex mb="5" justify="between" align="center" gap="2">
      <IssueStatusFilter />

        <Button>
          <Link href="/issue/new">New Issue</Link>
        </Button>

      </Flex>
  )
}

export default IssueAction

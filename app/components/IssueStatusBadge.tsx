import React from 'react'
import { Status } from '../generated/prisma/enums'
import { Badge } from '@radix-ui/themes'

interface IssueStatusBadgeProps {
 status:  Status
}


const  statusMap: Record<Status, { label: string; color: "red"| "yellow"| "green"}> = {
  OPEN: { label: 'Open', color: 'red' },
  IN_PROGRESS: { label: 'In Progress', color: 'yellow' },
  CLOSED: { label: 'Closed', color: 'green' },
};

const IssueStatusBadge = ({ status }: IssueStatusBadgeProps) => { 



  return <Badge color={statusMap[status].color}>{statusMap[status].label}</Badge>;
}

export default IssueStatusBadge

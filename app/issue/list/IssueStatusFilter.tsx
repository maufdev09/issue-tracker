"use client"
import { Status } from '@/app/generated/prisma/enums'
import { Select } from '@radix-ui/themes'
import React from 'react'


const IssueStatusFilter = () => {

  const statuses:{label:string,value?:Status}[]=[
    { label: 'All' },
    { value: 'OPEN', label: 'Open' },
    { value: 'IN_PROGRESS', label: 'In Progress' },
    { value: 'CLOSED', label: 'Closed' },
  ]
  return (
    <div>
      <Select.Root>
        <Select.Trigger placeholder="Filter by status..." />
        <Select.Content>
          <Select.Group>
            <Select.Label>Issue Status</Select.Label>
            {statuses.map((status) => (
              <Select.Item key={status.label} value={status.value|| 'null'}>
                {status.label}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
    </div>
  )
}

export default IssueStatusFilter

"use client"
import { Status } from '@/app/generated/prisma/enums'
import { Select } from '@radix-ui/themes'
import { useRouter, useSearchParams } from 'next/navigation'


const IssueStatusFilter = () => {
  const router = useRouter();

  const searchParams=useSearchParams();

  const statuses:{label:string,value?:Status}[]=[
    { label: 'All' },
    { value: 'OPEN', label: 'Open' },
    { value: 'IN_PROGRESS', label: 'In Progress' },
    { value: 'CLOSED', label: 'Closed' },
  ]  
  return (
    <div>
      <Select.Root 
        onValueChange={(status) => {
          const params=new URLSearchParams();
          if (status) params.append('status', status);
          if (searchParams.get('orderBy')) {
            params.append('orderBy', searchParams.get('orderBy')!);
          }
          const query= params.toString() ? `?${params.toString()}` : '';
          router.push(`/issue/list`+query);
        }}
      >
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

import React from 'react'
import IssueForm from '../../_componenets/issueForm'
import prisma from '@/prisma/client';
import { notFound } from 'next/navigation';


interface EditIssuePageProps{
params:{id:string}
}

const EditIssuePage = async({params}:EditIssuePageProps) => {
     const { id } = await params;
  const issueNumber = parseInt(id);

  const issue = await prisma.issue.findUnique({
    where: { id: issueNumber },
  });

  if (!issue) notFound();

  return (
    <div>
      <IssueForm issue={issue} />
    </div>
  )
}

export default EditIssuePage

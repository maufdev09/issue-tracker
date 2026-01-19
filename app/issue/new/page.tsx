"use client";

import dynamic from 'next/dynamic';
import IssueFormSkeleton from './loading';

const IssueForm = dynamic(() => import('../_componenets/issueForm'), { ssr: false,
  loading: () => <IssueFormSkeleton/>,
 });
 
const NewIssuePage = () => {
  return (
    <div>
      <IssueForm />
    </div>
  )
}

export default NewIssuePage

"use client"

import { ChevronLeftIcon, ChevronRightIcon, DoubleArrowLeftIcon, DoubleArrowRightIcon } from '@radix-ui/react-icons';
import { Button, Flex, Text } from '@radix-ui/themes';
import { useRouter, useSearchParams } from 'next/navigation';


interface PaginationProps {
    itemCount: number;
    pageSize: number;
    currentPage: number;
}

const Pagination = ({ itemCount, pageSize,  currentPage }: PaginationProps) => {
const router = useRouter();
const searchParams = useSearchParams();



  const pageCount = Math.ceil(itemCount / pageSize);

  if (pageCount <= 1) return null;

  const ChangePages = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', page.toString());
    router.push(`?`+params.toString());
  }
  return (
<Flex align={'center'}>
    <Text>Page {currentPage} of {pageCount}</Text>
    <Button  onClick={()=>(1)} color='gray' variant='soft' disabled={currentPage===1}  style={{marginLeft:'8px'}}>
        <DoubleArrowLeftIcon/>
    </Button>
    <Button onClick={()=>ChangePages(currentPage-1)} color='gray' variant='soft' disabled={currentPage===1} style={{marginLeft:'8px'}}>
        <ChevronLeftIcon/>
    </Button>
    <Button onClick={()=>ChangePages(currentPage+1)} color='gray' variant='soft' disabled={currentPage===pageCount}  style={{marginLeft:'8px'}}>
        <ChevronRightIcon/>
    </Button>
    <Button onClick={()=>ChangePages(pageCount)} color='gray' variant='soft' disabled={currentPage===pageCount}  style={{marginLeft:'8px'}}>
        <DoubleArrowRightIcon/>
    </Button>
</Flex>
  )
}

export default Pagination

import { Button } from '@radix-ui/themes'
import Link from 'next/link'
import React from 'react'

const Issuepage = () => {
  return (
    <div>
      <Button><Link href="/issue/new">New Issue</Link></Button>
      Issuepage
    </div>
  ) 
}

export default Issuepage

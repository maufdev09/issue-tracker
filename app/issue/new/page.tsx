"use client "

import { Button, TextArea, TextField } from '@radix-ui/themes'
import React from 'react'

const NewIssuepage = () => {
  return (
    <div className='max-w-xl space-y-4  '>
      <TextField.Root placeholder="New Issue Title">
        
      </TextField.Root>
      <TextArea placeholder="Describe the issue in detail" className='mt-4'/>
      <Button>Submit Issue</Button>
    </div> 
  )
}



export default NewIssuepage

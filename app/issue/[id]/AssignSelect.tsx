"use client";
import { User } from "@/app/generated/prisma/client";
import { Select } from "@radix-ui/themes";
import axios from "axios";
import React, { useEffect, useState } from "react";

const AssignSelect = () => {
 
const [users,setUsers]=useState<User[]>([]);

useEffect(()=>{
  const fetchUsers=async()=>{
    const res=await axios.get('/api/users');
    const data=await res.data;
    setUsers(data);
  }
  fetchUsers(); 
},[]);

  return (
    <Select.Root>
      <Select.Trigger placeholder="Assign to">Select User</Select.Trigger>
      <Select.Content>
        <Select.Group>
          <Select.Label>Assign User</Select.Label>
          {users.map((user) => (
            <Select.Item key={user.id} value={user.id}>
              {user.name}
            </Select.Item>
          ))}
        </Select.Group> 
      </Select.Content>
    </Select.Root>
  );
};

export default AssignSelect;

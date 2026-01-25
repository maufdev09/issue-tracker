"use client";
import { User } from "@/app/generated/prisma/client";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Skelton from "@/app/components/Skeleton";

const AssignSelect = () => {
 const { data: users,error,isLoading  } = useQuery<User[]>({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await axios.get('/api/users');
      return res.data;
      
   
    },
    staleTime: 1000 * 60, // 1 minute,
   retry: 3,
  });


  if (isLoading) {
    return <Skelton></Skelton>
  }

  if (error) {
    return null;
  }



  return (
    <Select.Root>
      <Select.Trigger placeholder="Assign to">Select User</Select.Trigger>
      <Select.Content>
        <Select.Group>
          <Select.Label>Assign User</Select.Label>
          {users?.map((user) => (
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

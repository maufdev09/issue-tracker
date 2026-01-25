"use client";

import { Issue, User } from "@/app/generated/prisma/client";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Skelton from "@/app/components/Skeleton";
import toast, {Toaster} from 'react-hot-toast';
const AssignSelect = ({ issue }: { issue: Issue }) => {
  const {
    data: users,
    error,
    isLoading,
  } = useUsers()

  if (isLoading) {
    return <Skelton></Skelton>;
  }

  if (error) {
    return null;
  }

  const assignIssue = (userId: string) => {
      try {
         axios.patch("/api/issues/" + issue.id, { assignedToUserId: userId === "null" ? null : userId })
      } catch (error) {
        toast.error("Failed to assign user");
      }
       
      }

  return (
    <>
    <Select.Root
    defaultValue={issue.assignedToUserId || "null"}
    onValueChange={ assignIssue}
    >
      <Select.Trigger placeholder="Assign..."/>
      <Select.Content>
        <Select.Group>
          <Select.Label>Assign User</Select.Label>
          <Select.Item value={"null"}> Unassigned</Select.Item>
          {users?.map((user) => (
            <Select.Item key={user.id} value={user.id}>
              {user.name}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
    <Toaster />
          </>
  );
};

export default AssignSelect;


const useUsers = () => useQuery<User[]>({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axios.get("/api/users");
      return res.data;
    },
    staleTime: 1000 * 60, // 1 minute,
    retry: 3,
  });
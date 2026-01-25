"use client";

import { Issue, User } from "@/app/generated/prisma/client";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Skelton from "@/app/components/Skeleton";

const AssignSelect = ({ issue }: { issue: Issue }) => {
  const {
    data: users,
    error,
    isLoading,
  } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axios.get("/api/users");
      return res.data;
    },
    staleTime: 1000 * 60, // 1 minute,
    retry: 3,
  });

  if (isLoading) {
    return <Skelton></Skelton>;
  }

  if (error) {
    return null;
  }

  return (
    <Select.Root
    defaultValue={issue.assignedToUserId || "null"}
      onValueChange={(userId) => {
        axios.patch("/api/issues/" + issue.id, { assignedToUserId: userId === "null" ? null : userId });
      }}
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
  );
};

export default AssignSelect;

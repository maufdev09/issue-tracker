"use client";
import Spinner from "@/app/components/Spinner";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
  const router = useRouter();
  const [error, setError] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
                  try {
                  setDeleting(true);

                    await axios.delete(`/api/issues/${issueId}`);

                    router.push("/issue");
                    router.refresh();
                  } catch (error) {
                    setDeleting(false);
                    setError(true); 
                    console.error("Failed to delete issue:", error);
                  }
                }

  return (
    <>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button color="red" disabled={deleting}>Delete Issue
            {deleting && <Spinner size="2" className="ml-2" />}
          </Button>
        </AlertDialog.Trigger>
        <AlertDialog.Content>
          <AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
          <AlertDialog.Description>
            Are you sure you want to delete this issue? This action cannot be
            undone.
          </AlertDialog.Description>
          <Flex mt={"4"} gap={"3"}>
            <AlertDialog.Cancel>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button
                onClick={handleDelete}
                color="red"
              >
                Confirm Delete
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>

      <AlertDialog.Root open={error} onOpenChange={setError}>
        <AlertDialog.Content>
          <AlertDialog.Title color="red">Error</AlertDialog.Title>
          <AlertDialog.Description>
            {error && "Failed to delete the issue. Please try again."}
          </AlertDialog.Description>
            <Button variant="soft" color="gray" my={"4"} onClick={() => setError(false)}>Close</Button>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  );
};

export default DeleteIssueButton;

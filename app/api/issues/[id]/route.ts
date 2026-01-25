import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { IssueSchema, patchIssueSchema } from "@/app/validationSchemas";
import { auth } from "@/auth";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } },
) {

  const session= await auth();
if (!session) {
  return NextResponse.json({}, { status: 401 });
}
  
  const { id } = await params;
  const body = await request.json();
  
  const validation = patchIssueSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.issues, { status: 400 });

const { assignedToUserId,title,description,status } = body;
if (assignedToUserId) {
    const user = await prisma.user.findUnique({
      where: { id:assignedToUserId },
    });

    if (!user) {
      return NextResponse.json({ error: "Assignee user not found" }, { status: 404 });
    }
  
}


  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(id) },
  });

  if (!issue)
    return NextResponse.json({ error: "Issue not found" }, { status: 404 });

  const updatedIssue = await prisma.issue.update({
    where: { id: parseInt(id) },
    data: {
      title,
      description,
      assignedToUserId,
      status,
    },
  });

  return NextResponse.json(updatedIssue);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
) {

   const session= await auth();
if (!session) {
  return NextResponse.json({}, { status: 401 });
}
  const { id } = await params;

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(id) },
  });
  if (!issue)
    return NextResponse.json({ error: "Issue not found" }, { status: 404 });
  await prisma.issue.delete({
    where: { id: parseInt(id) },
  });

  return NextResponse.json({ message: "Issue deleted successfully" });
}

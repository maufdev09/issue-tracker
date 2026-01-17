import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const createIssueSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters long').max(100),
  description: z.string().min(10, 'Description must be at least 10 characters long').max(1000),
});
export async function POST(request: NextRequest) {
  const body = await request.json();

  const validation = createIssueSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(
      validation.error.format(),
      { status: 400 }
    );
  
  const newIssue = await prisma.issue.create({
    data: {
      title: body.title,
      description: body.description,
    },
  });

  return NextResponse.json(newIssue, { status: 201 });
}

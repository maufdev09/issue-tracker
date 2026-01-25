-- AlterTable
ALTER TABLE "Issue" ADD COLUMN     "assigneeId" VARCHAR(255);

-- AddForeignKey
ALTER TABLE "Issue" ADD CONSTRAINT "Issue_assigneeId_fkey" FOREIGN KEY ("assigneeId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AlterTable
ALTER TABLE "Article" ADD COLUMN     "userId" UUID;

-- AddForeignKey
ALTER TABLE "Article" ADD CONSTRAINT "Article_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

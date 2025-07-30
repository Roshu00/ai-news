-- CreateEnum
CREATE TYPE "ArticleStatus" AS ENUM ('DRAFT', 'PRIVATE', 'PUBLIC', 'DELETED');

-- AlterTable
ALTER TABLE "Article" ADD COLUMN     "status" "ArticleStatus" NOT NULL DEFAULT 'DRAFT';

-- CreateEnum
CREATE TYPE "public"."ArticleCreationStep" AS ENUM ('CARD', 'CONTENT', 'SEO', 'FINISHED');

-- AlterTable
ALTER TABLE "public"."Article" ADD COLUMN     "step" "public"."ArticleCreationStep" NOT NULL DEFAULT 'CARD';

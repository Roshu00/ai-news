/*
  Warnings:

  - You are about to drop the column `source` on the `Article` table. All the data in the column will be lost.
  - You are about to drop the column `sourceUrl` on the `Article` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Article" DROP COLUMN "source",
DROP COLUMN "sourceUrl",
ADD COLUMN     "thumbnailUrl" TEXT;

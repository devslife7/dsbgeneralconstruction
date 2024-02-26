/*
  Warnings:

  - You are about to drop the column `media` on the `Work` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Work" DROP COLUMN "media",
ADD COLUMN     "files" TEXT[];

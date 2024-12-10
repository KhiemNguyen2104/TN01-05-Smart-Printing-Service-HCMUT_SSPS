/*
  Warnings:

  - You are about to drop the column `remaining_pages` on the `STUDENT` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "STUDENT" DROP COLUMN "remaining_pages",
ADD COLUMN     "remaining_A2_pages" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "remaining_A3_pages" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "remaining_A4_pages" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "remaining_A5_pages" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "remaining_Letter_pages" INTEGER NOT NULL DEFAULT 0;

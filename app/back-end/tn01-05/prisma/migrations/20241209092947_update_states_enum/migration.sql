/*
  Warnings:

  - The primary key for the `TRANSACTION` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `state` column on the `TRANSACTION` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `state` on the `PRINTS` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Printing_states" AS ENUM ('Succesful', 'Fail_Not_Enough_pages', 'Fail_Cancel');

-- CreateEnum
CREATE TYPE "Transaction_states" AS ENUM ('Succesful', 'Fail_Pending', 'Fail_Cancel');

-- AlterTable
ALTER TABLE "PRINTS" DROP COLUMN "state",
ADD COLUMN     "state" "Printing_states" NOT NULL;

-- AlterTable
ALTER TABLE "TRANSACTION" DROP CONSTRAINT "TRANSACTION_pkey",
DROP COLUMN "state",
ADD COLUMN     "state" "Transaction_states" NOT NULL DEFAULT 'Fail_Pending',
ADD CONSTRAINT "TRANSACTION_pkey" PRIMARY KEY ("student_id", "time", "page_type", "price", "no_of_pages", "state");

/*
  Warnings:

  - You are about to drop the column `Description` on the `PRINTER` table. All the data in the column will be lost.
  - You are about to drop the column `Location` on the `PRINTER` table. All the data in the column will be lost.
  - You are about to drop the column `Manufacturer` on the `PRINTER` table. All the data in the column will be lost.
  - Added the required column `location` to the `PRINTER` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PRINTER" DROP COLUMN "Description",
DROP COLUMN "Location",
DROP COLUMN "Manufacturer",
ADD COLUMN     "description" TEXT,
ADD COLUMN     "location" "Locations" NOT NULL,
ADD COLUMN     "manufacturer" TEXT;

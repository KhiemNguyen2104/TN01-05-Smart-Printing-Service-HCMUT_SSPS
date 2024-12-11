/*
  Warnings:

  - You are about to drop the `DISABLES` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DISABLES_TIMESTAMP` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ENABLES` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ENABLES_TIMESTAMP` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "DISABLES" DROP CONSTRAINT "DISABLES_SPSO_id_fkey";

-- DropForeignKey
ALTER TABLE "DISABLES" DROP CONSTRAINT "DISABLES_printer_id_fkey";

-- DropForeignKey
ALTER TABLE "DISABLES_TIMESTAMP" DROP CONSTRAINT "DISABLES_TIMESTAMP_SPSO_id_printer_id_fkey";

-- DropForeignKey
ALTER TABLE "ENABLES" DROP CONSTRAINT "ENABLES_SPSO_id_fkey";

-- DropForeignKey
ALTER TABLE "ENABLES" DROP CONSTRAINT "ENABLES_printer_id_fkey";

-- DropForeignKey
ALTER TABLE "ENABLES_TIMESTAMP" DROP CONSTRAINT "ENABLES_TIMESTAMP_SPSO_id_printer_id_fkey";

-- AlterTable
ALTER TABLE "PRINTER" ADD COLUMN     "is_enable" BOOLEAN NOT NULL DEFAULT true;

-- DropTable
DROP TABLE "DISABLES";

-- DropTable
DROP TABLE "DISABLES_TIMESTAMP";

-- DropTable
DROP TABLE "ENABLES";

-- DropTable
DROP TABLE "ENABLES_TIMESTAMP";

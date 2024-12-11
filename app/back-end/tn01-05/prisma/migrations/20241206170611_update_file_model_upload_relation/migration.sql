/*
  Warnings:

  - The primary key for the `PRINTS` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `file_name` on the `PRINTS` table. All the data in the column will be lost.
  - Added the required column `file_id` to the `PRINTS` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PRINTS" DROP CONSTRAINT "PRINTS_pkey",
DROP COLUMN "file_name",
ADD COLUMN     "file_id" TEXT NOT NULL,
ADD CONSTRAINT "PRINTS_pkey" PRIMARY KEY ("student_id", "printer_id", "printing_job_id", "file_id");

-- CreateTable
CREATE TABLE "FILE" (
    "file_id" TEXT NOT NULL,
    "file_name" TEXT NOT NULL,
    "file_size" INTEGER NOT NULL,

    CONSTRAINT "FILE_pkey" PRIMARY KEY ("file_id")
);

-- CreateTable
CREATE TABLE "UPLOADS" (
    "student_id" TEXT NOT NULL,
    "file_id" TEXT NOT NULL,
    "time" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UPLOADS_pkey" PRIMARY KEY ("student_id","file_id","time")
);

-- AddForeignKey
ALTER TABLE "UPLOADS" ADD CONSTRAINT "UPLOADS_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "STUDENT"("student_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UPLOADS" ADD CONSTRAINT "UPLOADS_file_id_fkey" FOREIGN KEY ("file_id") REFERENCES "FILE"("file_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PRINTS" ADD CONSTRAINT "PRINTS_file_id_fkey" FOREIGN KEY ("file_id") REFERENCES "FILE"("file_id") ON DELETE RESTRICT ON UPDATE CASCADE;

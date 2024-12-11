/*
  Warnings:

  - A unique constraint covering the columns `[file_name,file_type]` on the table `FILE` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `file_type` to the `FILE` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FILE" ADD COLUMN     "file_type" "File_types" NOT NULL;

-- AlterTable
ALTER TABLE "UPLOADS" ALTER COLUMN "time" SET DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex
CREATE UNIQUE INDEX "FILE_file_name_file_type_key" ON "FILE"("file_name", "file_type");

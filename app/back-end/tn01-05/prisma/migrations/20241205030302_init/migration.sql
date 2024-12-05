-- CreateEnum
CREATE TYPE "File_types" AS ENUM ('PDF', 'DOC', 'DOCX', 'XLSX', 'JPEG', 'PNG', 'PPT', 'PPTX');

-- CreateEnum
CREATE TYPE "Page_types" AS ENUM ('A2', 'A3', 'A4', 'A5', 'Letter');

-- CreateEnum
CREATE TYPE "Page_directions" AS ENUM ('Portrait', 'Landscape');

-- CreateEnum
CREATE TYPE "Locations" AS ENUM ('H1_F1', 'H1_F4', 'H1_F8', 'H2_F1', 'H2_F3', 'H2_F6', 'H3_F1', 'H3_F3', 'H3_F6', 'H6_F1', 'H6_F4', 'H6_F8', 'A1_F1', 'A1_F3', 'A2_F1', 'A2_F3', 'A3_F1', 'A3_F3', 'A3_F5', 'A4_F1', 'A4_F3', 'A4_F5', 'A5_F1', 'A5_F3', 'B1_F1', 'B2_F1', 'B3_F1', 'B4_F1', 'B4_F3', 'B4_F6', 'C1_F1', 'C1_F3', 'C2_F1', 'C2_F3', 'C3_F1', 'C3_F3', 'C4_F1', 'C4_F3', 'C4_F6', 'C5_F1', 'C5_F3', 'C5_F6', 'C6_F1', 'C6_F3', 'C6_F6');

-- CreateTable
CREATE TABLE "USER" (
    "user_id" TEXT NOT NULL,
    "user_name" TEXT NOT NULL,
    "user_email" TEXT NOT NULL,
    "hash_key" TEXT NOT NULL,

    CONSTRAINT "USER_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "STUDENT" (
    "student_id" TEXT NOT NULL,
    "remaining_pages" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "STUDENT_pkey" PRIMARY KEY ("student_id")
);

-- CreateTable
CREATE TABLE "SPSO" (
    "SPSO_id" TEXT NOT NULL,

    CONSTRAINT "SPSO_pkey" PRIMARY KEY ("SPSO_id")
);

-- CreateTable
CREATE TABLE "TRANSACTION" (
    "student_id" TEXT NOT NULL,
    "time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "page_type" "Page_types" NOT NULL,
    "price" INTEGER NOT NULL,
    "no_of_pages" INTEGER NOT NULL,
    "state" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "TRANSACTION_pkey" PRIMARY KEY ("student_id","time","page_type","price","no_of_pages","state")
);

-- CreateTable
CREATE TABLE "PRINTER" (
    "printer_id" TEXT NOT NULL,
    "printer_name" TEXT NOT NULL,
    "Manufacturer" TEXT,
    "Description" TEXT,
    "Location" "Locations" NOT NULL,

    CONSTRAINT "PRINTER_pkey" PRIMARY KEY ("printer_id")
);

-- CreateTable
CREATE TABLE "PRINTS" (
    "printing_job_id" TEXT NOT NULL,
    "student_id" TEXT NOT NULL,
    "printer_id" TEXT NOT NULL,
    "start_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "end_time" TIMESTAMP(3) NOT NULL,
    "file_name" TEXT NOT NULL,
    "no_of_copies" INTEGER NOT NULL DEFAULT 1,
    "double_sided" BOOLEAN NOT NULL DEFAULT false,
    "direction" "Page_directions" NOT NULL DEFAULT 'Portrait',
    "page_type" "Page_types" NOT NULL,
    "state" BOOLEAN NOT NULL DEFAULT false,
    "pages" TEXT NOT NULL,

    CONSTRAINT "PRINTS_pkey" PRIMARY KEY ("student_id","printer_id","printing_job_id")
);

-- CreateTable
CREATE TABLE "SYSTEM_POLICY" (
    "SP_id" TEXT NOT NULL DEFAULT 'SP1',
    "max_file_size" INTEGER NOT NULL DEFAULT 300,
    "allocated_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SYSTEM_POLICY_pkey" PRIMARY KEY ("SP_id")
);

-- CreateTable
CREATE TABLE "DEFAULT_PAGE" (
    "SP_id" TEXT NOT NULL,
    "page_type" "Page_types" NOT NULL,
    "number" INTEGER NOT NULL,

    CONSTRAINT "DEFAULT_PAGE_pkey" PRIMARY KEY ("SP_id","page_type","number")
);

-- CreateTable
CREATE TABLE "PERMITTED_TYPE" (
    "SP_id" TEXT NOT NULL,
    "file_type" "File_types" NOT NULL,

    CONSTRAINT "PERMITTED_TYPE_pkey" PRIMARY KEY ("SP_id","file_type")
);

-- CreateTable
CREATE TABLE "ENABLES" (
    "SPSO_id" TEXT NOT NULL,
    "printer_id" TEXT NOT NULL,

    CONSTRAINT "ENABLES_pkey" PRIMARY KEY ("SPSO_id","printer_id")
);

-- CreateTable
CREATE TABLE "ENABLES_TIMESTAMP" (
    "SPSO_id" TEXT NOT NULL,
    "printer_id" TEXT NOT NULL,
    "time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ENABLES_TIMESTAMP_pkey" PRIMARY KEY ("SPSO_id","printer_id","time")
);

-- CreateTable
CREATE TABLE "DISABLES" (
    "SPSO_id" TEXT NOT NULL,
    "printer_id" TEXT NOT NULL,

    CONSTRAINT "DISABLES_pkey" PRIMARY KEY ("SPSO_id","printer_id")
);

-- CreateTable
CREATE TABLE "DISABLES_TIMESTAMP" (
    "SPSO_id" TEXT NOT NULL,
    "printer_id" TEXT NOT NULL,
    "time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DISABLES_TIMESTAMP_pkey" PRIMARY KEY ("SPSO_id","printer_id","time")
);

-- CreateTable
CREATE TABLE "CHANGES" (
    "change_id" TEXT NOT NULL,
    "SPSO_id" TEXT NOT NULL,
    "SP_id" TEXT NOT NULL,
    "time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "allocated_date" TIMESTAMP(3),
    "max_file_size" INTEGER,

    CONSTRAINT "CHANGES_pkey" PRIMARY KEY ("change_id","SPSO_id","SP_id")
);

-- CreateTable
CREATE TABLE "CHANGES_PERMITTED_TYPES" (
    "change_id" TEXT NOT NULL,
    "Type" "File_types" NOT NULL,

    CONSTRAINT "CHANGES_PERMITTED_TYPES_pkey" PRIMARY KEY ("change_id")
);

-- CreateTable
CREATE TABLE "CHANGES_DEFAULT_PAGES" (
    "change_id" TEXT NOT NULL,
    "page_type" "Page_types" NOT NULL,
    "number" INTEGER NOT NULL,

    CONSTRAINT "CHANGES_DEFAULT_PAGES_pkey" PRIMARY KEY ("change_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PRINTS_printing_job_id_key" ON "PRINTS"("printing_job_id");

-- CreateIndex
CREATE UNIQUE INDEX "CHANGES_change_id_key" ON "CHANGES"("change_id");

-- AddForeignKey
ALTER TABLE "STUDENT" ADD CONSTRAINT "STUDENT_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "USER"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SPSO" ADD CONSTRAINT "SPSO_SPSO_id_fkey" FOREIGN KEY ("SPSO_id") REFERENCES "USER"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TRANSACTION" ADD CONSTRAINT "TRANSACTION_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "STUDENT"("student_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PRINTS" ADD CONSTRAINT "PRINTS_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "STUDENT"("student_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PRINTS" ADD CONSTRAINT "PRINTS_printer_id_fkey" FOREIGN KEY ("printer_id") REFERENCES "PRINTER"("printer_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DEFAULT_PAGE" ADD CONSTRAINT "DEFAULT_PAGE_SP_id_fkey" FOREIGN KEY ("SP_id") REFERENCES "SYSTEM_POLICY"("SP_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PERMITTED_TYPE" ADD CONSTRAINT "PERMITTED_TYPE_SP_id_fkey" FOREIGN KEY ("SP_id") REFERENCES "SYSTEM_POLICY"("SP_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ENABLES" ADD CONSTRAINT "ENABLES_SPSO_id_fkey" FOREIGN KEY ("SPSO_id") REFERENCES "SPSO"("SPSO_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ENABLES" ADD CONSTRAINT "ENABLES_printer_id_fkey" FOREIGN KEY ("printer_id") REFERENCES "PRINTER"("printer_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ENABLES_TIMESTAMP" ADD CONSTRAINT "ENABLES_TIMESTAMP_SPSO_id_printer_id_fkey" FOREIGN KEY ("SPSO_id", "printer_id") REFERENCES "ENABLES"("SPSO_id", "printer_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DISABLES" ADD CONSTRAINT "DISABLES_SPSO_id_fkey" FOREIGN KEY ("SPSO_id") REFERENCES "SPSO"("SPSO_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DISABLES" ADD CONSTRAINT "DISABLES_printer_id_fkey" FOREIGN KEY ("printer_id") REFERENCES "PRINTER"("printer_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DISABLES_TIMESTAMP" ADD CONSTRAINT "DISABLES_TIMESTAMP_SPSO_id_printer_id_fkey" FOREIGN KEY ("SPSO_id", "printer_id") REFERENCES "DISABLES"("SPSO_id", "printer_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CHANGES_PERMITTED_TYPES" ADD CONSTRAINT "CHANGES_PERMITTED_TYPES_change_id_fkey" FOREIGN KEY ("change_id") REFERENCES "CHANGES"("change_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CHANGES_DEFAULT_PAGES" ADD CONSTRAINT "CHANGES_DEFAULT_PAGES_change_id_fkey" FOREIGN KEY ("change_id") REFERENCES "CHANGES"("change_id") ON DELETE RESTRICT ON UPDATE CASCADE;

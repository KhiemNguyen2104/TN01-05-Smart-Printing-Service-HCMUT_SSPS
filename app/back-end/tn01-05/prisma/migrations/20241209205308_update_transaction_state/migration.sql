/*
  Warnings:

  - The values [Succesful] on the enum `Transaction_states` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Transaction_states_new" AS ENUM ('Successful', 'Fail_Pending', 'Fail_Cancel');
ALTER TABLE "TRANSACTION" ALTER COLUMN "state" DROP DEFAULT;
ALTER TABLE "TRANSACTION" ALTER COLUMN "state" TYPE "Transaction_states_new" USING ("state"::text::"Transaction_states_new");
ALTER TYPE "Transaction_states" RENAME TO "Transaction_states_old";
ALTER TYPE "Transaction_states_new" RENAME TO "Transaction_states";
DROP TYPE "Transaction_states_old";
ALTER TABLE "TRANSACTION" ALTER COLUMN "state" SET DEFAULT 'Fail_Pending';
COMMIT;

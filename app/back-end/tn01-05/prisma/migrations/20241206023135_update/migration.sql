/*
  Warnings:

  - A unique constraint covering the columns `[user_email]` on the table `USER` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "USER_user_email_key" ON "USER"("user_email");

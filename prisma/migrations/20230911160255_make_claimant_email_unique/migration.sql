/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `claimant` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "claimant_email_key" ON "claimant"("email");

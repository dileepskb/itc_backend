/*
  Warnings:

  - A unique constraint covering the columns `[roll]` on the table `Marksheet` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Marksheet_roll_key" ON "Marksheet"("roll");

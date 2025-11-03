/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Subraddit` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `description` to the `Subraddit` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Subraddit` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Subraddit" ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Subraddit_name_key" ON "Subraddit"("name");

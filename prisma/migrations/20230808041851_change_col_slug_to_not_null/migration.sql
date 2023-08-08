/*
  Warnings:

  - Made the column `slug` on table `convocatoria` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `convocatoria` MODIFY `slug` VARCHAR(255) NOT NULL;

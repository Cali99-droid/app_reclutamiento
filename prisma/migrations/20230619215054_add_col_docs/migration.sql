/*
  Warnings:

  - You are about to alter the column `referencia` on the `cargo` table. The data in that column could be lost. The data in that column will be cast from `Char(9)` to `Char(1)`.

*/
-- AlterTable
ALTER TABLE `capacitacion` ADD COLUMN `doc` VARCHAR(225) NULL;

-- AlterTable
ALTER TABLE `cargo` ADD COLUMN `doc` VARCHAR(225) NULL,
    MODIFY `referencia` CHAR(1) NULL;

-- AlterTable
ALTER TABLE `estudios` ADD COLUMN `doc` VARCHAR(225) NULL;

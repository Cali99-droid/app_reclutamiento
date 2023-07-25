/*
  Warnings:

  - Made the column `create_time` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `postulante_x_convocatoria` ADD COLUMN `monto` INTEGER NULL;

-- AlterTable
ALTER TABLE `puntajes` ADD COLUMN `maximo` INTEGER NULL;

-- AlterTable
ALTER TABLE `user` MODIFY `create_time` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0);

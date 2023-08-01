/*
  Warnings:

  - You are about to drop the `criterio` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `evaluacion` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `evaluacion_criterios` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `evaluacion_x_postulante` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `evaluacion_criterios` DROP FOREIGN KEY `fk_evaluacion_criterios_criterio1`;

-- DropForeignKey
ALTER TABLE `evaluacion_criterios` DROP FOREIGN KEY `fk_evaluacion_criterios_evaluacion1`;

-- DropForeignKey
ALTER TABLE `evaluacion_x_postulante` DROP FOREIGN KEY `fk_evaluacion_x_postulante_convocatoria1`;

-- DropForeignKey
ALTER TABLE `evaluacion_x_postulante` DROP FOREIGN KEY `fk_evaluacion_x_postulante_evaluacion1`;

-- DropForeignKey
ALTER TABLE `evaluacion_x_postulante` DROP FOREIGN KEY `fk_evaluacion_x_postulante_postulante1`;

-- DropForeignKey
ALTER TABLE `evaluacion_x_postulante` DROP FOREIGN KEY `fk_evaluacion_x_postulante_user1`;

-- AlterTable
ALTER TABLE `postulante_x_convocatoria` ADD COLUMN `create_time` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    ADD COLUMN `update_time` TIMESTAMP(0) NULL;

-- AlterTable
ALTER TABLE `puntajes` ADD COLUMN `postulante_x_convocatoria_id` INTEGER NULL,
    ADD COLUMN `rol` INTEGER NULL;

-- DropTable
DROP TABLE `criterio`;

-- DropTable
DROP TABLE `evaluacion`;

-- DropTable
DROP TABLE `evaluacion_criterios`;

-- DropTable
DROP TABLE `evaluacion_x_postulante`;

-- CreateIndex
CREATE INDEX `fk_puntajes_postulante_x_convocatoria1_idx` ON `puntajes`(`postulante_x_convocatoria_id`);

-- AddForeignKey
ALTER TABLE `puntajes` ADD CONSTRAINT `fk_puntajes_postulante_x_convocatoria1` FOREIGN KEY (`postulante_x_convocatoria_id`) REFERENCES `postulante_x_convocatoria`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AlterTable
ALTER TABLE `cargo` MODIFY `referencia` CHAR(10) NULL;

-- AlterTable
ALTER TABLE `postulante_x_convocatoria` ADD COLUMN `session` VARCHAR(255) NULL;

-- AlterTable
ALTER TABLE `postulante` ADD COLUMN `descartado` TINYINT NULL;

-- AlterTable
ALTER TABLE `postulante_x_convocatoria` ADD COLUMN `fecha_cambio` DATETIME(0) NULL;

-- AlterTable
ALTER TABLE `puntajes` ADD COLUMN `comentario` VARCHAR(200) NULL;

-- CreateTable
CREATE TABLE `dni_image` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `image` VARCHAR(100) NOT NULL,
    `postulante_id` INTEGER NOT NULL,

    INDEX `fk_dni_image_postulante1_idx`(`postulante_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `dni_image` ADD CONSTRAINT `fk_dni_image_postulante1` FOREIGN KEY (`postulante_id`) REFERENCES `postulante`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- CreateTable
CREATE TABLE `blacklist` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fecha` DATE NOT NULL,
    `dni` CHAR(1) NOT NULL,
    `postulante_id` INTEGER NOT NULL,
    `create_time` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `update_time` TIMESTAMP(0) NULL,

    INDEX `fk_blacklist_postulante1_idx`(`postulante_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `blacklist` ADD CONSTRAINT `fk_blacklist_postulante1` FOREIGN KEY (`postulante_id`) REFERENCES `postulante`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

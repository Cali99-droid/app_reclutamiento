-- CreateTable
CREATE TABLE `mensajes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `contenido` LONGTEXT NULL,
    `fecha` TIMESTAMP(0) NULL,
    `status` TINYINT NULL DEFAULT 0,
    `postulante_id` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,

    INDEX `fk_mensajes_postulante1_idx`(`postulante_id`),
    INDEX `fk_mensajes_user1_idx`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `mensajes` ADD CONSTRAINT `fk_mensajes_postulante1` FOREIGN KEY (`postulante_id`) REFERENCES `postulante`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `mensajes` ADD CONSTRAINT `fk_mensajes_user1` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

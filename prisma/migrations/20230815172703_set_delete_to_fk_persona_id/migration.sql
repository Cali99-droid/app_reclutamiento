-- DropForeignKey
ALTER TABLE `postulante` DROP FOREIGN KEY `fk_postulante_persona1`;

-- DropForeignKey
ALTER TABLE `user` DROP FOREIGN KEY `fk_user_persona1`;

-- AddForeignKey
ALTER TABLE `postulante` ADD CONSTRAINT `fk_postulante_persona1` FOREIGN KEY (`persona_id`) REFERENCES `persona`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `user` ADD CONSTRAINT `fk_user_persona1` FOREIGN KEY (`persona_id`) REFERENCES `persona`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

/*
  Warnings:

  - Added the required column `user_id` to the `puntajes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `puntajes` ADD COLUMN `user_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `test` ADD COLUMN `rol_id` INTEGER NULL;

-- CreateIndex
CREATE INDEX `fk_puntajes_user1_idx` ON `puntajes`(`user_id`);

-- CreateIndex
CREATE INDEX `fk_test_rol1_idx` ON `test`(`rol_id`);

-- AddForeignKey
ALTER TABLE `puntajes` ADD CONSTRAINT `fk_puntajes_user1` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `test` ADD CONSTRAINT `fk_test_rol1` FOREIGN KEY (`rol_id`) REFERENCES `rol`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

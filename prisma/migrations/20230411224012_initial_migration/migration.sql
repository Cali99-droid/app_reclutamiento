/*
  Warnings:

  - Added the required column `persona_id` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user` ADD COLUMN `persona_id` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `persona` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombres` VARCHAR(150) NOT NULL,
    `apellido_pat` VARCHAR(100) NOT NULL,
    `apellido_mat` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `fk_user_persona1_idx` ON `user`(`persona_id`);

-- AddForeignKey
ALTER TABLE `user` ADD CONSTRAINT `fk_user_persona1` FOREIGN KEY (`persona_id`) REFERENCES `persona`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

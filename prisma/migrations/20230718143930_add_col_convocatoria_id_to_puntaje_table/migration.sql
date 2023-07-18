/*
  Warnings:

  - Added the required column `convocatoria_id` to the `puntajes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `puntajes` ADD COLUMN `convocatoria_id` INTEGER NOT NULL;

-- CreateIndex
CREATE INDEX `fk_puntajes_convocatoria1_idx` ON `puntajes`(`convocatoria_id`);

-- AddForeignKey
ALTER TABLE `puntajes` ADD CONSTRAINT `fk_puntajes_convocatoria1` FOREIGN KEY (`convocatoria_id`) REFERENCES `convocatoria`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

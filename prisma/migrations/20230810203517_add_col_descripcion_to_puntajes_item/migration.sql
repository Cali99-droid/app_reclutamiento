-- DropForeignKey
ALTER TABLE `puntaje_items` DROP FOREIGN KEY `fk_puntaje_items_item1`;

-- AlterTable
ALTER TABLE `convocatoria` MODIFY `slug` VARCHAR(255) NULL;

-- AlterTable
ALTER TABLE `puntaje_items` ADD COLUMN `descripcion_item` VARCHAR(255) NULL,
    MODIFY `item_id` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `puntaje_items` ADD CONSTRAINT `fk_puntaje_items_item1` FOREIGN KEY (`item_id`) REFERENCES `item`(`id`) ON DELETE SET NULL ON UPDATE NO ACTION;

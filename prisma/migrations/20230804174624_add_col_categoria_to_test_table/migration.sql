-- AlterTable
ALTER TABLE `test` ADD COLUMN `categoria_id` INTEGER NULL;

-- CreateIndex
CREATE INDEX `fk_test_categoria1_idx` ON `test`(`categoria_id`);

-- AddForeignKey
ALTER TABLE `test` ADD CONSTRAINT `fk_test_categoria1` FOREIGN KEY (`categoria_id`) REFERENCES `categoria`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

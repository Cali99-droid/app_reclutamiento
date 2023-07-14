-- CreateTable
CREATE TABLE `item` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `descripcion` LONGTEXT NOT NULL,
    `test_id` INTEGER NOT NULL,

    INDEX `fk_item_test1_idx`(`test_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `puntaje_items` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `puntajes_id` INTEGER NOT NULL,
    `item_id` INTEGER NOT NULL,
    `puntaje_item` INTEGER NULL,

    INDEX `fk_puntaje_items_item1_idx`(`item_id`),
    INDEX `fk_puntaje_items_puntajes1_idx`(`puntajes_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `puntajes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `total` INTEGER NOT NULL,
    `test_id` INTEGER NOT NULL,
    `postulante_id` INTEGER NOT NULL,

    INDEX `fk_puntajes_postulante1_idx`(`postulante_id`),
    INDEX `fk_puntajes_test1_idx`(`test_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `test` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(200) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `item` ADD CONSTRAINT `fk_item_test1` FOREIGN KEY (`test_id`) REFERENCES `test`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `puntaje_items` ADD CONSTRAINT `fk_puntaje_items_item1` FOREIGN KEY (`item_id`) REFERENCES `item`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `puntaje_items` ADD CONSTRAINT `fk_puntaje_items_puntajes1` FOREIGN KEY (`puntajes_id`) REFERENCES `puntajes`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `puntajes` ADD CONSTRAINT `fk_puntajes_postulante1` FOREIGN KEY (`postulante_id`) REFERENCES `postulante`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `puntajes` ADD CONSTRAINT `fk_puntajes_test1` FOREIGN KEY (`test_id`) REFERENCES `test`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

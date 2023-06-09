-- CreateTable
CREATE TABLE `aficion` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `actividad` VARCHAR(150) NOT NULL,
    `nivel` VARCHAR(100) NOT NULL,
    `logro` VARCHAR(200) NOT NULL,
    `year` INTEGER NOT NULL,
    `postulante_id` INTEGER NOT NULL,

    INDEX `fk_aficion_postulante1_idx1`(`postulante_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `capacitacion` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `titulo` VARCHAR(200) NOT NULL,
    `horas` INTEGER NOT NULL,
    `year` INTEGER NOT NULL,
    `descripcion` LONGTEXT NOT NULL,
    `institucion` VARCHAR(200) NOT NULL,
    `postulante_id` INTEGER NOT NULL,

    INDEX `fk_capacitacion_postulante1_idx1`(`postulante_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cargo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `institucion` VARCHAR(150) NOT NULL,
    `referencia` CHAR(9) NULL,
    `remuneracion` DOUBLE NOT NULL,
    `nivel` VARCHAR(45) NOT NULL,
    `cantidad_cargo` INTEGER NULL DEFAULT 0,
    `year` INTEGER NOT NULL,
    `descripcion` VARCHAR(100) NULL,
    `contacto` VARCHAR(200) NULL,
    `desde` DATE NULL,
    `hasta` DATE NULL,
    `postulante_id` INTEGER NOT NULL,

    INDEX `fk_cargo_postulante1_idx1`(`postulante_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `categoria` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(80) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `convocatoria` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `titulo` VARCHAR(45) NOT NULL,
    `descripcion` LONGTEXT NOT NULL,
    `experiencia` INTEGER NOT NULL,
    `grado_id` INTEGER NOT NULL,
    `estado_id` INTEGER NOT NULL,
    `sueldo_ofertado` DOUBLE NOT NULL,
    `vacantes` INTEGER NOT NULL,
    `vigencia` DATE NULL,
    `categoria_id` INTEGER NULL,

    INDEX `fk_convocatoria_categoria1_idx`(`categoria_id`),
    INDEX `fk_convocatoria_estado1_idx`(`estado_id`),
    INDEX `fk_convocatoria_grado1_idx`(`grado_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `convocatoria_x_jurado` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fecha` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `convocatoria_id` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,

    INDEX `fk_convocatoria_x_jurado_convocatoria1_idx`(`convocatoria_id`),
    INDEX `fk_convocatoria_x_jurado_user1_idx`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `convocatoria_x_user` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `convocatoria_id` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,

    INDEX `fk_convocatoria_x_user_convocatoria1_idx`(`convocatoria_id`),
    INDEX `fk_convocatoria_x_user_user1_idx`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `criterio` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(45) NOT NULL,
    `puntaje_max` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `estado` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(80) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `estado_postulante` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(45) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `estudios` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `profesion` VARCHAR(150) NOT NULL,
    `institucion` VARCHAR(200) NOT NULL,
    `grado` VARCHAR(200) NOT NULL,
    `year` INTEGER NOT NULL,
    `postulante_id` INTEGER NOT NULL,

    INDEX `fk_estudios_postulante1_idx1`(`postulante_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `evaluacion` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(45) NOT NULL,
    `fecha_creacion` DATE NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `evaluacion_criterios` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `orden` INTEGER NULL,
    `peso` INTEGER NOT NULL,
    `evaluacion_id` INTEGER NOT NULL,
    `criterio_id` INTEGER NOT NULL,

    INDEX `fk_evaluacion_criterios_criterio1_idx`(`criterio_id`),
    INDEX `fk_evaluacion_criterios_evaluacion1_idx`(`evaluacion_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `evaluacion_x_postulante` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `puntaje` INTEGER NOT NULL,
    `puntaje_max` INTEGER NOT NULL,
    `convocatoria_id` INTEGER NOT NULL,
    `evaluacion_id` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,
    `postulante_id` INTEGER NOT NULL,

    INDEX `fk_evaluacion_x_postulante_convocatoria1_idx`(`convocatoria_id`),
    INDEX `fk_evaluacion_x_postulante_evaluacion1_idx`(`evaluacion_id`),
    INDEX `fk_evaluacion_x_postulante_postulante1_idx1`(`postulante_id`),
    INDEX `fk_evaluacion_x_postulante_user1_idx`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `grado` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `investigacion` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `titulo` VARCHAR(200) NOT NULL,
    `institucion` VARCHAR(150) NOT NULL,
    `year` INTEGER NOT NULL,
    `postulante_id` INTEGER NOT NULL,

    INDEX `fk_investigacion_postulante1_idx1`(`postulante_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `persona` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombres` VARCHAR(150) NOT NULL,
    `apellido_pat` VARCHAR(100) NOT NULL,
    `apellido_mat` VARCHAR(100) NOT NULL,
    `nacimiento` DATE NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `postulante` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `telefono` VARCHAR(45) NULL,
    `direccion` VARCHAR(45) NOT NULL,
    `experiencia` INTEGER NULL,
    `fecha_nacimiento` DATE NOT NULL,
    `numero_documento` VARCHAR(45) NOT NULL,
    `sueldo` DOUBLE NOT NULL,
    `estado_civil` VARCHAR(45) NULL,
    `exalumno` TINYINT NULL,
    `egreso` INTEGER NULL,
    `hijos` INTEGER NULL,
    `discapacidad` TINYINT NULL,
    `image` LONGTEXT NULL,
    `nivel` VARCHAR(60) NULL,
    `doc` LONGTEXT NULL,
    `persona_id` INTEGER NOT NULL,
    `grado_id` INTEGER NOT NULL,
    `tipo_documento_id` INTEGER NOT NULL,

    UNIQUE INDEX `numero_documento_UNIQUE`(`numero_documento`),
    INDEX `fk_postulante_grado1_idx`(`grado_id`),
    INDEX `fk_postulante_persona1_idx1`(`persona_id`),
    INDEX `fk_postulante_tipo_documento1_idx`(`tipo_documento_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `postulante_x_convocatoria` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `comentario` LONGTEXT NULL,
    `fecha_comentario` VARCHAR(60) NULL,
    `convocatoria_id` INTEGER NOT NULL,
    `estado_postulante_id` INTEGER NOT NULL,
    `postulante_id` INTEGER NOT NULL,

    INDEX `fk_postulante_x_convocatoria_convocatoria1_idx`(`convocatoria_id`),
    INDEX `fk_postulante_x_convocatoria_estado_postulante1_idx`(`estado_postulante_id`),
    INDEX `fk_postulante_x_convocatoria_postulante1_idx`(`postulante_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `reconocimiento` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `reconocimento` LONGTEXT NOT NULL,
    `institucion` VARCHAR(45) NOT NULL,
    `descripcion` VARCHAR(200) NOT NULL,
    `year` INTEGER NOT NULL,
    `postulante_id` INTEGER NOT NULL,

    INDEX `fk_reconocimiento_postulante1_idx1`(`postulante_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `rol` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tics` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tecnologia` VARCHAR(45) NOT NULL,
    `nivel` VARCHAR(45) NOT NULL,
    `postulante_id` INTEGER NOT NULL,

    INDEX `fk_tics_postulante1_idx1`(`postulante_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tipo_documento` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(45) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(255) NULL,
    `password` VARCHAR(255) NOT NULL,
    `create_time` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `token` VARCHAR(100) NULL,
    `confirmado` TINYINT NULL DEFAULT 0,
    `img` LONGTEXT NULL,
    `rol_id` INTEGER NOT NULL,
    `persona_id` INTEGER NOT NULL,

    UNIQUE INDEX `user_email_key`(`email`),
    INDEX `fk_user_persona1_idx`(`persona_id`),
    INDEX `fk_user_rol_idx`(`rol_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `aficion` ADD CONSTRAINT `fk_aficion_postulante1` FOREIGN KEY (`postulante_id`) REFERENCES `postulante`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `capacitacion` ADD CONSTRAINT `fk_capacitacion_postulante1` FOREIGN KEY (`postulante_id`) REFERENCES `postulante`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `cargo` ADD CONSTRAINT `fk_cargo_postulante1` FOREIGN KEY (`postulante_id`) REFERENCES `postulante`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `convocatoria` ADD CONSTRAINT `fk_convocatoria_categoria1` FOREIGN KEY (`categoria_id`) REFERENCES `categoria`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `convocatoria` ADD CONSTRAINT `fk_convocatoria_estado1` FOREIGN KEY (`estado_id`) REFERENCES `estado`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `convocatoria` ADD CONSTRAINT `fk_convocatoria_grado1` FOREIGN KEY (`grado_id`) REFERENCES `grado`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `convocatoria_x_jurado` ADD CONSTRAINT `fk_convocatoria_x_jurado_convocatoria1` FOREIGN KEY (`convocatoria_id`) REFERENCES `convocatoria`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `convocatoria_x_jurado` ADD CONSTRAINT `fk_convocatoria_x_jurado_user1` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `convocatoria_x_user` ADD CONSTRAINT `fk_convocatoria_x_user_convocatoria1` FOREIGN KEY (`convocatoria_id`) REFERENCES `convocatoria`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `convocatoria_x_user` ADD CONSTRAINT `fk_convocatoria_x_user_user1` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `estudios` ADD CONSTRAINT `fk_estudios_postulante1` FOREIGN KEY (`postulante_id`) REFERENCES `postulante`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `evaluacion_criterios` ADD CONSTRAINT `fk_evaluacion_criterios_criterio1` FOREIGN KEY (`criterio_id`) REFERENCES `criterio`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `evaluacion_criterios` ADD CONSTRAINT `fk_evaluacion_criterios_evaluacion1` FOREIGN KEY (`evaluacion_id`) REFERENCES `evaluacion`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `evaluacion_x_postulante` ADD CONSTRAINT `fk_evaluacion_x_postulante_convocatoria1` FOREIGN KEY (`convocatoria_id`) REFERENCES `convocatoria`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `evaluacion_x_postulante` ADD CONSTRAINT `fk_evaluacion_x_postulante_evaluacion1` FOREIGN KEY (`evaluacion_id`) REFERENCES `evaluacion`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `evaluacion_x_postulante` ADD CONSTRAINT `fk_evaluacion_x_postulante_postulante1` FOREIGN KEY (`postulante_id`) REFERENCES `postulante`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `evaluacion_x_postulante` ADD CONSTRAINT `fk_evaluacion_x_postulante_user1` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `investigacion` ADD CONSTRAINT `fk_investigacion_postulante1` FOREIGN KEY (`postulante_id`) REFERENCES `postulante`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `postulante` ADD CONSTRAINT `fk_postulante_grado1` FOREIGN KEY (`grado_id`) REFERENCES `grado`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `postulante` ADD CONSTRAINT `fk_postulante_persona1` FOREIGN KEY (`persona_id`) REFERENCES `persona`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `postulante` ADD CONSTRAINT `fk_postulante_tipo_documento1` FOREIGN KEY (`tipo_documento_id`) REFERENCES `tipo_documento`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `postulante_x_convocatoria` ADD CONSTRAINT `fk_postulante_x_convocatoria_convocatoria1` FOREIGN KEY (`convocatoria_id`) REFERENCES `convocatoria`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `postulante_x_convocatoria` ADD CONSTRAINT `fk_postulante_x_convocatoria_estado_postulante1` FOREIGN KEY (`estado_postulante_id`) REFERENCES `estado_postulante`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `postulante_x_convocatoria` ADD CONSTRAINT `fk_postulante_x_convocatoria_postulante1` FOREIGN KEY (`postulante_id`) REFERENCES `postulante`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `reconocimiento` ADD CONSTRAINT `fk_reconocimiento_postulante1` FOREIGN KEY (`postulante_id`) REFERENCES `postulante`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `tics` ADD CONSTRAINT `fk_tics_postulante1` FOREIGN KEY (`postulante_id`) REFERENCES `postulante`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `user` ADD CONSTRAINT `fk_user_persona1` FOREIGN KEY (`persona_id`) REFERENCES `persona`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `user` ADD CONSTRAINT `fk_user_rol` FOREIGN KEY (`rol_id`) REFERENCES `rol`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema disney_world
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema disney_world
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `disney_world` DEFAULT CHARACTER SET utf8 ;
USE `disney_world` ;

-- -----------------------------------------------------
-- Table `disney_world`.`characters`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `disney_world`.`characters` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL DEFAULT NULL,
  `image` VARCHAR(255) NULL DEFAULT NULL,
  `age` INT(11) NULL DEFAULT NULL,
  `weight` INT(11) NULL DEFAULT NULL,
  `history` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `disney_world`.`genres`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `disney_world`.`genres` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `disney_world`.`movies`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `disney_world`.`movies` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(45) NULL DEFAULT NULL,
  `image` VARCHAR(255) NULL DEFAULT NULL,
  `release_date` DATE NULL DEFAULT NULL,
  `rating` INT(11) NULL DEFAULT NULL,
  `id_genre` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `id_genre_idx` (`id_genre` ASC),
  CONSTRAINT `id_genre`
    FOREIGN KEY (`id_genre`)
    REFERENCES `disney_world`.`genres` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `disney_world`.`character_movie`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `disney_world`.`character_movie` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `id_character` INT(11) NOT NULL,
  `id_movie` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `id_character_idx` (`id_character` ASC),
  INDEX `id_movie_idx` (`id_movie` ASC),
  CONSTRAINT `id_character`
    FOREIGN KEY (`id_character`)
    REFERENCES `disney_world`.`characters` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `id_movie`
    FOREIGN KEY (`id_movie`)
    REFERENCES `disney_world`.`movies` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

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
  `history` VARCHAR(145) NULL DEFAULT NULL,
  `weight` INT(11) NULL DEFAULT NULL,
  `age` INT(11) NULL DEFAULT NULL,
  `image` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `disney_world`.`genres`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `disney_world`.`genres` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL DEFAULT NULL,
  `image` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `disney_world`.`movies`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `disney_world`.`movies` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(45) NULL DEFAULT NULL,
  `rating` INT(11) NULL DEFAULT NULL,
  `release_date` DATE NULL DEFAULT NULL,
  `image` VARCHAR(255) NULL DEFAULT NULL,
  `genre_id` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `genre_id_idx` (`genre_id` ASC),
  CONSTRAINT `genre_id`
    FOREIGN KEY (`genre_id`)
    REFERENCES `disney_world`.`genres` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 6
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `disney_world`.`character_movie`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `disney_world`.`character_movie` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `character_id` INT(11) NOT NULL,
  `movie_id` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `character_id_idx` (`character_id` ASC),
  INDEX `movie_id_idx` (`movie_id` ASC),
  CONSTRAINT `character_id`
    FOREIGN KEY (`character_id`)
    REFERENCES `disney_world`.`characters` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `movie_id`
    FOREIGN KEY (`movie_id`)
    REFERENCES `disney_world`.`movies` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `disney_world`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `disney_world`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL DEFAULT NULL,
  `email` VARCHAR(45) NULL DEFAULT NULL,
  `password` VARCHAR(255) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

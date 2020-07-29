-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema movies_db
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema movies_db
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `movies_db` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `movies_db` ;

-- -----------------------------------------------------
-- Table `movies_db`.`genres`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `movies_db`.`genres` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `createdAt` TIMESTAMP NULL DEFAULT NULL,
  `updatedAt` TIMESTAMP NULL DEFAULT NULL,
  `name` VARCHAR(100) CHARACTER SET 'utf8' COLLATE 'utf8_unicode_ci' NOT NULL,
  `ranking` INT UNSIGNED NOT NULL,
  `active` TINYINT(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE INDEX `genres_ranking_unique` (`ranking` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 13
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_unicode_ci;


-- -----------------------------------------------------
-- Table `movies_db`.`movies`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `movies_db`.`movies` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `createdAt` TIMESTAMP NULL DEFAULT NULL,
  `updatedAt` TIMESTAMP NULL DEFAULT NULL,
  `title` VARCHAR(500) CHARACTER SET 'utf8' COLLATE 'utf8_unicode_ci' NOT NULL,
  `rating` DECIMAL(3,1) UNSIGNED NOT NULL,
  `awards` INT UNSIGNED NOT NULL DEFAULT '0',
  `release_date` DATETIME NOT NULL,
  `length` INT UNSIGNED NULL DEFAULT NULL,
  `genre_id` INT UNSIGNED NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `movies_genre_id_foreign` (`genre_id` ASC) VISIBLE,
  CONSTRAINT `movies_genre_id_foreign`
    FOREIGN KEY (`genre_id`)
    REFERENCES `movies_db`.`genres` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 25
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_unicode_ci;


-- -----------------------------------------------------
-- Table `movies_db`.`actors`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `movies_db`.`actors` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `createdAt` TIMESTAMP NULL DEFAULT NULL,
  `updatedAt` TIMESTAMP NULL DEFAULT NULL,
  `first_name` VARCHAR(100) CHARACTER SET 'utf8' COLLATE 'utf8_unicode_ci' NOT NULL,
  `last_name` VARCHAR(100) CHARACTER SET 'utf8' COLLATE 'utf8_unicode_ci' NOT NULL,
  `rating` DECIMAL(3,1) NULL DEFAULT NULL,
  `favorite_movie_id` INT UNSIGNED NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `actors_favorite_movie_id_foreign` (`favorite_movie_id` ASC) VISIBLE,
  CONSTRAINT `actors_favorite_movie_id_foreign`
    FOREIGN KEY (`favorite_movie_id`)
    REFERENCES `movies_db`.`movies` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 50
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_unicode_ci;


-- -----------------------------------------------------
-- Table `movies_db`.`series`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `movies_db`.`series` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `created_at` TIMESTAMP NULL DEFAULT NULL,
  `updated_at` TIMESTAMP NULL DEFAULT NULL,
  `title` VARCHAR(500) CHARACTER SET 'utf8' COLLATE 'utf8_unicode_ci' NOT NULL,
  `release_date` DATETIME NOT NULL,
  `end_date` DATETIME NOT NULL,
  `genre_id` INT UNSIGNED NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `series_genre_id_foreign` (`genre_id` ASC) VISIBLE,
  CONSTRAINT `series_genre_id_foreign`
    FOREIGN KEY (`genre_id`)
    REFERENCES `movies_db`.`genres` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 7
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_unicode_ci;


-- -----------------------------------------------------
-- Table `movies_db`.`seasons`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `movies_db`.`seasons` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `created_at` TIMESTAMP NULL DEFAULT NULL,
  `updated_at` TIMESTAMP NULL DEFAULT NULL,
  `title` VARCHAR(500) CHARACTER SET 'utf8' COLLATE 'utf8_unicode_ci' NULL DEFAULT NULL,
  `number` INT UNSIGNED NULL DEFAULT NULL,
  `release_date` DATETIME NOT NULL,
  `end_date` DATETIME NOT NULL,
  `serie_id` INT UNSIGNED NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `seasons_serie_id_foreign` (`serie_id` ASC) VISIBLE,
  CONSTRAINT `seasons_serie_id_foreign`
    FOREIGN KEY (`serie_id`)
    REFERENCES `movies_db`.`series` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 47
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_unicode_ci;


-- -----------------------------------------------------
-- Table `movies_db`.`episodes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `movies_db`.`episodes` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `created_at` TIMESTAMP NULL DEFAULT NULL,
  `updated_at` TIMESTAMP NULL DEFAULT NULL,
  `title` VARCHAR(500) CHARACTER SET 'utf8' COLLATE 'utf8_unicode_ci' NULL DEFAULT NULL,
  `number` INT UNSIGNED NULL DEFAULT NULL,
  `release_date` DATETIME NOT NULL,
  `rating` DECIMAL(3,1) NOT NULL,
  `season_id` INT UNSIGNED NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `episodes_season_id_foreign` (`season_id` ASC) VISIBLE,
  CONSTRAINT `episodes_season_id_foreign`
    FOREIGN KEY (`season_id`)
    REFERENCES `movies_db`.`seasons` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 58
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_unicode_ci;


-- -----------------------------------------------------
-- Table `movies_db`.`actor_episode`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `movies_db`.`actor_episode` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `created_at` TIMESTAMP NULL DEFAULT NULL,
  `updated_at` TIMESTAMP NULL DEFAULT NULL,
  `actor_id` INT UNSIGNED NOT NULL,
  `episode_id` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `actor_episode_actor_id_foreign` (`actor_id` ASC) VISIBLE,
  INDEX `actor_episode_episode_id_foreign` (`episode_id` ASC) VISIBLE,
  CONSTRAINT `actor_episode_actor_id_foreign`
    FOREIGN KEY (`actor_id`)
    REFERENCES `movies_db`.`actors` (`id`),
  CONSTRAINT `actor_episode_episode_id_foreign`
    FOREIGN KEY (`episode_id`)
    REFERENCES `movies_db`.`episodes` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 149
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_unicode_ci;


-- -----------------------------------------------------
-- Table `movies_db`.`actor_movie`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `movies_db`.`actor_movie` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `createdAt` TIMESTAMP NULL DEFAULT NULL,
  `updatedAt` TIMESTAMP NULL DEFAULT NULL,
  `actor_id` INT UNSIGNED NOT NULL,
  `movie_id` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `actor_movie_actor_id_foreign` (`actor_id` ASC) VISIBLE,
  INDEX `actor_movie_movie_id_foreign` (`movie_id` ASC) VISIBLE,
  CONSTRAINT `actor_movie_actor_id_foreign`
    FOREIGN KEY (`actor_id`)
    REFERENCES `movies_db`.`actors` (`id`),
  CONSTRAINT `actor_movie_movie_id_foreign`
    FOREIGN KEY (`movie_id`)
    REFERENCES `movies_db`.`movies` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 44
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_unicode_ci;


-- -----------------------------------------------------
-- Table `movies_db`.`migrations`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `movies_db`.`migrations` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `migration` VARCHAR(255) CHARACTER SET 'utf8' COLLATE 'utf8_unicode_ci' NOT NULL,
  `batch` INT NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 11
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_unicode_ci;


-- -----------------------------------------------------
-- Table `movies_db`.`password_resets`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `movies_db`.`password_resets` (
  `email` VARCHAR(255) CHARACTER SET 'utf8' COLLATE 'utf8_unicode_ci' NOT NULL,
  `token` VARCHAR(255) CHARACTER SET 'utf8' COLLATE 'utf8_unicode_ci' NOT NULL,
  `created_at` TIMESTAMP NULL DEFAULT NULL,
  INDEX `password_resets_email_index` (`email` ASC) VISIBLE,
  INDEX `password_resets_token_index` (`token` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_unicode_ci;


-- -----------------------------------------------------
-- Table `movies_db`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `movies_db`.`users` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) CHARACTER SET 'utf8' COLLATE 'utf8_unicode_ci' NOT NULL,
  `email` VARCHAR(255) CHARACTER SET 'utf8' COLLATE 'utf8_unicode_ci' NOT NULL,
  `password` VARCHAR(255) CHARACTER SET 'utf8' COLLATE 'utf8_unicode_ci' NOT NULL,
  `remember_token` VARCHAR(100) CHARACTER SET 'utf8' COLLATE 'utf8_unicode_ci' NULL DEFAULT NULL,
  `created_at` TIMESTAMP NULL DEFAULT NULL,
  `updated_at` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `users_email_unique` (`email` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_unicode_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

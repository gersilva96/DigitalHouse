/* !CUIDADO!: Este script borra, si existe, una base con el nombre "movies_db" */

DROP SCHEMA IF EXISTS `movies_db` ;
CREATE SCHEMA `movies_db` DEFAULT CHARACTER SET utf8mb4 ;
USE `movies_db` ;

CREATE TABLE `movies_db`.`genres` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `createdAt` TIMESTAMP,
  `updatedAt` TIMESTAMP,
  `name` VARCHAR(100) NOT NULL,
  `ranking` INT UNSIGNED NOT NULL,
  `active` TINYINT(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE INDEX `genres_ranking_unique` (`ranking` ASC) VISIBLE)
ENGINE = InnoDB;

CREATE TABLE `movies_db`.`movies` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `createdAt` TIMESTAMP,
  `updatedAt` TIMESTAMP,
  `title` VARCHAR(500) NOT NULL,
  `rating` DECIMAL(3,1) UNSIGNED NOT NULL,
  `awards` INT UNSIGNED NOT NULL DEFAULT '0',
  `release_date` DATETIME NOT NULL,
  `length` INT UNSIGNED,
  `genre_id` INT UNSIGNED,
  PRIMARY KEY (`id`),
  INDEX `movies_genre_id_foreign` (`genre_id` ASC) VISIBLE,
  CONSTRAINT `movies_genre_id_foreign`
    FOREIGN KEY (`genre_id`)
    REFERENCES `movies_db`.`genres` (`id`))
ENGINE = InnoDB;

CREATE TABLE `movies_db`.`actors` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `createdAt` TIMESTAMP,
  `updatedAt` TIMESTAMP,
  `first_name` VARCHAR(100) NOT NULL,
  `last_name` VARCHAR(100) NOT NULL,
  `rating` DECIMAL(3,1),
  `favorite_movie_id` INT UNSIGNED,
  PRIMARY KEY (`id`),
  INDEX `actors_favorite_movie_id_foreign` (`favorite_movie_id` ASC) VISIBLE,
  CONSTRAINT `actors_favorite_movie_id_foreign`
    FOREIGN KEY (`favorite_movie_id`)
    REFERENCES `movies_db`.`movies` (`id`))
ENGINE = InnoDB;

CREATE TABLE `movies_db`.`actor_movie` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `createdAt` TIMESTAMP,
  `updatedAt` TIMESTAMP,
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
ENGINE = InnoDB;

INSERT INTO `genres` VALUES (1,'2016-07-04 03:00:00',NULL,'Comedia',1,1),(2,'2014-07-04 03:00:00',NULL,'Terror',2,1),(3,'2013-07-04 03:00:00',NULL,'Drama',3,1),(4,'2011-07-04 03:00:00',NULL,'Accion',4,1),(5,'2010-07-04 03:00:00',NULL,'Ciencia Ficcion',5,1),(6,'2013-07-04 03:00:00',NULL,'Suspenso',6,1),(7,'2005-07-04 03:00:00',NULL,'Animacion',7,1),(8,'2003-07-04 03:00:00',NULL,'Aventuras',8,1),(9,'2008-07-04 03:00:00',NULL,'Documental',9,1),(10,'2013-07-04 03:00:00',NULL,'Infantiles',10,1),(11,'2011-07-04 03:00:00',NULL,'Fantasia',11,1),(12,'2013-07-04 03:00:00',NULL,'Musical',12,1);

INSERT INTO `movies` VALUES (1,NULL,NULL,'Avatar',7.9,3,'2010-10-04 00:00:00',120,5),(2,NULL,NULL,'Titanic',7.7,11,'1997-09-04 00:00:00',320,3),(3,NULL,NULL,'La Guerra de las galaxias: Episodio VI',9.1,7,'2004-07-04 00:00:00',NULL,5),(4,NULL,NULL,'La Guerra de las galaxias: Episodio VII',9.0,6,'2003-11-04 00:00:00',180,5),(5,NULL,NULL,'Parque Jurasico',8.3,5,'1999-01-04 00:00:00',270,5),(6,NULL,NULL,'Harry Potter y las Reliquias de la Muerte - Parte 2',9.0,2,'2008-07-04 00:00:00',190,6),(7,NULL,NULL,'Transformers: el lado oscuro de la luna',0.9,1,'2005-07-04 00:00:00',NULL,5),(8,NULL,NULL,'Harry Potter y la piedra filosofal',10.0,1,'2008-04-04 00:00:00',120,8),(9,NULL,NULL,'Harry Potter y la cámara de los secretos',3.5,2,'2009-08-04 00:00:00',200,8),(10,NULL,NULL,'El rey león',9.1,3,'2000-02-04 00:00:00',NULL,10),(11,NULL,NULL,'Alicia en el país de las maravillas',5.7,2,'2008-07-04 00:00:00',120,NULL),(12,NULL,NULL,'Buscando a Nemo',8.3,2,'2000-07-04 00:00:00',110,7),(13,NULL,NULL,'Toy Story',6.1,0,'2008-03-04 00:00:00',150,7),(14,NULL,NULL,'Toy Story 2',3.2,2,'2003-04-04 00:00:00',120,7),(15,NULL,NULL,'La vida es bella',8.3,5,'1994-10-04 00:00:00',NULL,3),(16,NULL,NULL,'Mi pobre angelito',3.2,1,'1989-01-04 00:00:00',120,1),(17,NULL,NULL,'Intensamente',9.0,2,'2008-07-04 00:00:00',120,7),(18,NULL,NULL,'Carrozas de fuego',9.9,7,'1980-07-04 00:00:00',180,NULL),(19,NULL,NULL,'Big',7.3,2,'1988-02-04 00:00:00',130,8),(20,NULL,NULL,'I am Sam',9.0,4,'1999-03-04 00:00:00',130,3),(21,NULL,NULL,'Hotel Transylvania',7.1,1,'2012-05-04 00:00:00',90,10);

INSERT INTO `actors` VALUES (1,NULL,NULL,'Sam','Worthington',7.5,1),(2,NULL,NULL,'Zoe','Saldana',5.5,2),(3,NULL,NULL,'Sigourney','Weaver',9.7,NULL),(4,NULL,NULL,'Leonardo','Di Caprio',3.5,4),(5,NULL,NULL,'Kate','Winslet',1.5,5),(6,NULL,NULL,'Billy','Zane',7.5,6),(7,NULL,NULL,'Mark','Hamill',6.5,7),(8,NULL,NULL,'Harrison','Ford',7.5,8),(9,NULL,NULL,'Carrie','Fisher',7.5,9),(10,NULL,NULL,'Sam','Neill',2.5,10),(11,NULL,NULL,'Laura','Dern',7.5,11),(12,NULL,NULL,'Jeff','Goldblum',4.5,NULL),(13,NULL,NULL,'Daniel','Radcliffe',7.5,13),(14,NULL,NULL,'Emma','Watson',2.5,14),(15,NULL,NULL,'Rupert','Grint',6.2,15),(16,NULL,NULL,'Shia','LaBeouf',9.5,16),(17,NULL,NULL,'Rosie','Huntington-Whiteley',1.5,17),(18,NULL,NULL,'Matthew','Broderick',6.1,18),(19,NULL,NULL,'James','Earl Jones',7.5,19),(20,NULL,NULL,'Jeremy','Irons',7.2,20),(21,NULL,NULL,'Johnny','Depp',1.5,21),(22,NULL,NULL,'Helena','Bonham Carter',7.5,1),(23,NULL,NULL,'Mia','Wasikowska',7.5,2),(24,NULL,NULL,'Albert','Brooks',2.5,3),(25,NULL,NULL,'Ellen','DeGeneres',2.6,4),(26,NULL,NULL,'Alexander','Gould',7.5,5),(27,NULL,NULL,'Tom','Hanks',4.4,6),(28,NULL,NULL,'Tim','Allen',7.5,7),(29,NULL,NULL,'Sean','Penn',9.2,8),(30,NULL,NULL,'Adam','Sandler',3.1,9),(31,NULL,NULL,'Renee','Zellweger',9.5,10),(32,NULL,NULL,'Emilia','Clarke',8.2,11),(33,NULL,NULL,'Peter','Dinklage',2.3,12),(34,NULL,NULL,'Kit','Harington',2.4,NULL),(35,NULL,NULL,'Jared','Padalecki',2.8,14),(36,NULL,NULL,'Jensen','Ackles',5.5,15),(37,NULL,NULL,'Jim','Beaver',2.6,16),(38,NULL,NULL,'Andrew','Lincoln',3.3,17),(39,NULL,NULL,'Jon','Bernthal',2.9,NULL),(40,NULL,NULL,'Sarah','Callies',2.4,19),(41,NULL,NULL,'Jim','Caviezel',1.9,20),(42,NULL,NULL,'Taraji','Henson',5.9,21),(43,NULL,NULL,'Kevin','Chapman',2.9,1),(44,NULL,NULL,'Johnny','Galecki',2.3,2),(45,NULL,NULL,'Jim','Parsons',6.9,3),(46,NULL,NULL,'Kaley','Cuoco',2.3,4),(47,NULL,NULL,'Bryan','Cranston',7.9,NULL),(48,NULL,NULL,'Aaron','Paul',5.9,6),(49,NULL,NULL,'Anna','Gunn',3.1,7);

INSERT INTO `actor_movie` VALUES (1,NULL,NULL,1,1),(2,NULL,NULL,2,1),(3,NULL,NULL,3,1),(4,NULL,NULL,4,2),(5,NULL,NULL,5,2),(6,NULL,NULL,6,2),(7,NULL,NULL,7,3),(8,NULL,NULL,7,4),(9,NULL,NULL,8,3),(10,NULL,NULL,8,4),(11,NULL,NULL,9,3),(12,NULL,NULL,9,4),(13,NULL,NULL,10,5),(14,NULL,NULL,11,5),(15,NULL,NULL,12,5),(16,NULL,NULL,13,6),(17,NULL,NULL,13,8),(18,NULL,NULL,13,9),(19,NULL,NULL,14,6),(20,NULL,NULL,14,8),(21,NULL,NULL,14,9),(22,NULL,NULL,15,6),(23,NULL,NULL,15,8),(24,NULL,NULL,15,9),(25,NULL,NULL,16,7),(26,NULL,NULL,17,7),(27,NULL,NULL,18,7),(28,NULL,NULL,19,10),(29,NULL,NULL,20,10),(30,NULL,NULL,21,11),(31,NULL,NULL,22,11),(32,NULL,NULL,22,9),(33,NULL,NULL,23,11),(34,NULL,NULL,24,12),(35,NULL,NULL,25,12),(36,NULL,NULL,26,12),(37,NULL,NULL,27,13),(38,NULL,NULL,27,14),(39,NULL,NULL,27,19),(40,NULL,NULL,28,13),(41,NULL,NULL,28,14),(42,NULL,NULL,29,20),(43,NULL,NULL,30,21);

/* !CUIDADO!: Este script borra, si existe, una base con el nombre "movies_db" */
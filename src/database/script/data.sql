/* Genres */
INSERT INTO `disney_world`.`genres` (`id`, `name`) VALUES ('1', 'Fantasia ');
INSERT INTO `disney_world`.`genres` (`id`, `name`) VALUES ('2', 'Aventuras');
INSERT INTO `disney_world`.`genres` (`id`, `name`) VALUES ('3', 'Aventuras');


/* Character */
INSERT INTO `disney_world`.`characters` (`id`, `name`, `history`, `weight`, `age`) VALUES ('1', 'Mickey Mouse', 'Mickey Mouse es un personaje ficticio estadounidense de la serie del mismo nombre, emblema de la compañía Disney', '70', '93');


/* Movies */
INSERT INTO `disney_world`.`movies` (`id`, `title`, `rating`, `release_date`, `genre_id`) VALUES ('1', 'La hora de la sinfonía', '5', '1942-03-20', '1');


/* Tabla intermedia character-movie*/
INSERT INTO `disney_world`.`character_movie` (`id`, `character_id`, `movie_id`) VALUES ('1', '1', '1');

/* Genres */
INSERT INTO `disney_world`.`genres` (`id`, `name`) VALUES ('1', 'fantasia ');
INSERT INTO `disney_world`.`genres` (`id`, `name`) VALUES ('2', 'aventura');
INSERT INTO `disney_world`.`genres` (`id`, `name`) VALUES ('3', 'comedia');


/* Character */
INSERT INTO `disney_world`.`characters` (`id`, `name`, `history`, `weight`, `age`) VALUES ('1', 'mickey mouse', 'mickey mouse es un personaje ficticio estadounidense de la serie del mismo nombre, emblema de la compañía Disney', '70', '93');
INSERT INTO `disney_world`.`characters` (`id`, `name`, `history`, `weight`, `age`) VALUES ('2', 'pato donal', 'pato donal es un personaje ficticio estadounidense de la serie del mismo nombre, emblema de la compañía Disney', '70', '93');


/* Movies */
INSERT INTO `disney_world`.`movies` (`id`, `title`, `rating`, `release_date`, `genre_id`) VALUES ('1', 'la hora de la sinfonía', '5', '1942-03-20', '1');
INSERT INTO `disney_world`.`movies` (`id`, `title`, `rating`, `release_date`, `genre_id`) VALUES ('2', 'mickey y las habichuelas mágicas', '3', '1942-03-20', '2');


/* Tabla intermedia character-movie*/
INSERT INTO `disney_world`.`character_movie` (`id`, `character_id`, `movie_id`) VALUES ('1', '1', '1');
INSERT INTO `disney_world`.`character_movie` (`id`, `character_id`, `movie_id`) VALUES ('2', '2', '1');
INSERT INTO `disney_world`.`character_movie` (`id`, `character_id`, `movie_id`) VALUES ('3', '1', '2');
INSERT INTO `disney_world`.`character_movie` (`id`, `character_id`, `movie_id`) VALUES ('4', '2', '2');

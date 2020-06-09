--Desafío 1:  GP344
    SELECT * FROM actors;   -- Gunn
    SELECT title,awards FROM movies;      -- Parque
    SELECT length FROM movies WHERE title LIKE "%Titanic%";   -- 320
    SELECT genre_id FROM series WHERE title LIKE "%Person%";    -- 4
    SELECT season_id FROM movies_db.episodes WHERE number = 2;   -- 46

--Desafío 2:  RH31D
    SELECT title FROM movies WHERE release_date BETWEEN "1999-10-01" AND "2004-12-31";      -- rey
    SELECT title FROM movies WHERE title LIKE "%a";     -- Hotel
    SELECT COUNT(*) FROM actors WHERE first_name LIKE "%Jim%";      -- 3
    SELECT SUM(awards) FROM movies WHERE title LIKE "%La guerra de las galaxias%";      -- 13
    SELECT CONCAT(actors.first_name," ",actors.last_name) AS actor, movies.title FROM actors INNER JOIN movies ON actors.favorite_movie_id = movies.id WHERE CONCAT(actors.first_name," ",actors.last_name) LIKE "%Leonardo Di Caprio%";        -- de

--Desafío 3:  TFIDM
    SELECT CONCAT(actors.first_name," ",actors.last_name) AS actor, movies.title FROM actors INNER JOIN movies ON actors.favorite_movie_id = movies.id WHERE actors.rating = 2.3 ORDER BY actors.id;        -- Titanic
    SELECT series.title, genres.name FROM series INNER JOIN genres ON series.genre_id = genres.id WHERE LENGTH(genres.name) > 2;        -- Fantasia
    SELECT movies.title FROM movies INNER JOIN genres ON movies.genre_id = genres.id WHERE genres.name LIKE "%Animacion%";      -- Intensamente
    SELECT actors.last_name FROM actors INNER JOIN actor_movie ON actor_movie.actor_id = actors.id INNER JOIN movies ON movies.id = actor_movie.movie_id WHERE movies.title LIKE "%Parque Jurásico%" LIMIT 1 OFFSET 1;      -- Dern
    SELECT movies.title, genres.name FROM movies INNER JOIN genres ON genres.id = movies.genre_id WHERE ranking BETWEEN 1 AND 4 ORDER BY rating;        -- Mi

--Desafío 4:  IE547
    SELECT genres.name, AVG(movies.length) FROM movies INNER JOIN genres ON movies.genre_id = genres.id GROUP BY genres.name ORDER BY AVG(movies.length) ASC LIMIT 1;       -- Infantiles
    SELECT actors.first_name, COUNT(actor_movie.id) AS cant FROM actors INNER JOIN actor_movie ON actor_movie.actor_id = actors.id INNER JOIN movies ON movies.id = actor_movie.movie_id GROUP BY actors.first_name ORDER BY cant DESC;     -- Emma
    SELECT genres.name, COUNT(movies.title) AS cant FROM movies INNER JOIN genres ON genres.id = movies.genre_id GROUP BY genres.name ORDER BY cant DESC;       -- 5
    SELECT genres.name,COUNT(movies.title) AS cant FROM movies INNER JOIN genres ON genres.id = movies.genre_id GROUP BY genres.name HAVING cant > 3;       -- 4
    SELECT genres.name,AVG(movies.rating) AS rating FROM movies INNER JOIN genres ON genres.id = movies.genre_id GROUP BY genres.name HAVING rating > 3;        -- 7

--Ejercitación SQL:
    --SELECT
    SELECT * FROM movies;
    SELECT first_name,last_name,rating FROM actors;

    --WHERE, ORDER BY
    SELECT first_name,last_name FROM actors WHERE rating > 7.5;
    SELECT title,rating,awards FROM movies WHERE rating > 7.5 AND awards > 2;
    SELECT title,rating FROM movies ORDER BY rating;

    --LIMIT, OFFSET
    SELECT title FROM movies LIMIT 3;
    SELECT title FROM movies ORDER BY rating DESC LIMIT 5;
    SELECT title FROM movies ORDER BY rating DESC LIMIT 5 OFFSET 5;

    --BETWEEN, LIKE
    SELECT title,rating FROM movies WHERE title LIKE "%Toy%Story%";
    SELECT title FROM movies WHERE release_date BETWEEN "2004-01-01" AND "2008-12-31";

    --COMPLEJAS E INTEGRADORAS
    SELECT title,rating FROM movies WHERE awards > 3 AND release_date BETWEEN "2000-01-01" AND "2009-12-31" ORDER BY rating;
    SELECT title,rating FROM movies WHERE awards > 3 AND release_date BETWEEN "2000-01-01" AND "2009-12-31" ORDER BY rating LIMIT 5 OFFSET 10;
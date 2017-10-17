\c movie_app_db

COPY movies (id, title, year, director) FROM '/Users/johnware/Desktop/learners-guild/movie-app/seeds/movies.csv' DELIMITER ',' CSV HEADER;

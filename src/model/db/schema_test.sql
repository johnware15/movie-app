DROP DATABASE IF EXISTS movie_app_test;
CREATE DATABASE movie_app_test;

\c movie_app_test;

DROP TABLE IF EXISTS movies
CREATE TABLE movies (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255),
  year INTEGER,
  director VARCHAR(255)
);

DROP TABLE IF EXISTS users
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  date_joined TIMESTAMP NOT NULL DEFAULT NOW()
);

DROP TABLE IF EXISTS reviews
CREATE TABLE reviews (
  id SERIAL PRIMARY KEY,
  movie_id INTEGER REFERENCES movies(id),
  user_id INTEGER REFERENCES users(id),
  content VARCHAR(1000)
);

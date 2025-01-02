CREATE DATABASE typer;

\c typer;

CREATE TABLE IF NOT EXISTS "user" (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY ,
    login VARCHAR(30),
    password VARCHAR(30),
    name VARCHAR(30)
);

CREATE TABLE IF NOT EXISTS user_stats (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES "user"(id),
    max_words_typed INT DEFAULT 0,
    mistakes_made INT DEFAULT 0
);
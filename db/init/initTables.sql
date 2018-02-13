CREATE TABLE IF NOT EXISTS users (
     id serial,
     user_id integer primary key,
     first_name varchar(255),
     last_name varchar(255)
);
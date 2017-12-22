CREATE TABLE IF NOT EXISTS users (
     id serial primary key,
     devmountain_id integer unique,
     first_name varchar(255),
     last_name varchar(255)
);
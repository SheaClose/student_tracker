CREATE TABLE IF NOT EXISTS public.user(
     id serial primary key,
     google_id varchar(255) unique,
     first_name varchar(255),
     last_name varchar(255),
     token varchar(255),
     pic_url varchar(255)
);

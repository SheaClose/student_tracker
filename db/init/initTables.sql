CREATE TABLE IF NOT EXISTS users (
     id serial primary key,
     devmountain_id integer unique,
     first_name varchar(255),
     last_name varchar(255)
);

CREATE TABLE IF NOT EXISTS repos (
     id serial primary key,
     name varchar(255),
      html_url varchar(255),
      url varchar(255),
      created_at varchar(255),
      updated_at varchar(255),
      pushed_at varchar(255),
      language character varying(255)
);

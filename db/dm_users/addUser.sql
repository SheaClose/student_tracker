INSERT INTO users
    (user_id, first_name,last_name)
SELECT ${id}, ${first_name}, ${last_name}
WHERE
    NOT EXISTS (
        SELECT user_id, first_name,last_name 
        FROM users 
        WHERE user_id = ${id}
        and first_name = ${first_name}
        and last_name = ${last_name}
    );
    
SELECT *
FROM users 
WHERE user_id = ${id}

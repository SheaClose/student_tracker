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
    
SELECT * FROM users 
JOIN user_cohort ON users.user_id = user_cohort.user_id
JOIN cohorts ON user_cohort.cohort_id = cohorts.cohort_id
WHERE users.user_id = ${id}
ORDER BY name ASC
--Since it's a string, the ordering is still a little off


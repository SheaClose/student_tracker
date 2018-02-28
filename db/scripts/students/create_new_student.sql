INSERT INTO students
    (dm_id, first_name,last_name,email,cohort_id)
SELECT $1, $2, $3, $4, $5
WHERE
    NOT EXISTS (
        SELECT dm_id, first_name,last_name,email,cohort_id 
        FROM students 
        WHERE dm_id = $1 
        and first_name = $2
        and last_name = $3
    ) returning *;

    -- first_name,last_name,email,dmId,cohort.name
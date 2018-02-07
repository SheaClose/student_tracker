SELECT *, incompletes.total FROM projects
    RIGHT JOIN students 
        ON projects.dm_id = students.dm_id
    LEFT JOIN 
        (SELECT COUNT(*) as total, MIN(due_date), dm_id FROM projects 
            WHERE status != 'complete' 
            GROUP BY dm_id ) as incompletes 
        ON incompletes.dm_id = students.dm_id
WHERE cohort_id = ${cohort_id}
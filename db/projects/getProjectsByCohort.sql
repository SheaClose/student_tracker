SELECT *, 
    COUNT(SELECT * FROM projects 
        WHERE status != "complete" 
        AND cohort_id = ${cohort_id} ) 
    as incompletes 
FROM projects
JOIN students ON 
projects.dm_id = students.dm_id
WHERE cohort_id = ${cohort_id}
SELECT oneonones.*, students.first_name, students.last_name, students.dm_id
FROM students
	LEFT JOIN 
		(SELECT max(id) as maxid, dm_id 
		FROM oneonones 
		GROUP BY dm_id) 
		AS x
	ON students.dm_id=x.dm_id
	LEFT JOIN oneonones
	ON x.maxid=oneonones.id
WHERE cohort_id IN (${cohort_id})
ORDER BY first_name, last_name

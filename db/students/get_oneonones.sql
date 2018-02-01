SELECT oneonones.*, students.first_name, students.last_name
FROM students
	LEFT JOIN 
		(SELECT max(id) as maxid, student_id 
		FROM oneonones 
		GROUP BY student_id) 
		AS x
	ON student_id=dm_id
	LEFT JOIN oneonones
	ON x.maxid=oneonones.id
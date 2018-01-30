SELECT * FROM oneonones t1 
	JOIN students ON student_id = dm_id
	WHERE t1.date = (
		SELECT MAX(t2.date) FROM oneonones t2 
		WHERE t2.student_id = t1.student_id
		)
	AND cohort_id = $1
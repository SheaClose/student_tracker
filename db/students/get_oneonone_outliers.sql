SELECT * FROM oneonones t1 
	JOIN students ON students.dm_id = t1.dm_id
	WHERE t1.date = (
		SELECT MAX(t2.date) FROM oneonones t2 
		WHERE t2.dm_id = t1.dm_id
		)
	AND (skill < 2 OR confidence_skill < 2 OR confidence_personal < 2 OR attitude < 2 OR defer_drop_concern IS TRUE)
	AND cohort_id IN ($1:csv);
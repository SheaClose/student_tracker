WITH 
	absences AS (
		SELECT date, student_id, absent
		FROM attendance  
		WHERE absent IS TRUE AND date > CURRENT_DATE - interval '2 weeks'
		GROUP BY date, student_id, absent
		)
		, 
	totals AS (
		SELECT count(absent), student_id 
		FROM absences 
		GROUP BY student_id
		)
		, 
	outliers AS (
		SELECT * 
		FROM totals 
		WHERE count > 2)


SELECT * FROM absences 
	JOIN students ON student_id = dm_id 
	WHERE student_id IN (
		SELECT student_id FROM outliers
		) 
	AND cohort_id IN ($1:csv);
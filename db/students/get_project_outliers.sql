WITH 
	incompletes AS (
		SELECT * FROM projects 
		WHERE due_date < CURRENT_DATE 
		AND status IN ('incomplete', 'redo')
		)
		,
	totals AS (
		SELECT count(id), student_id
		FROM incompletes
		GROUP BY student_id
		)
		,

	outliers AS (
		SELECT * from totals WHERE count > 2
		)
		
SELECT * FROM incompletes
	JOIN students ON student_id = dm_id
	WHERE student_id IN (
		SELECT student_id FROM outliers
		)
	AND cohort_id IN ($1:csv);
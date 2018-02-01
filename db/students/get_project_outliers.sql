WITH 
	incompletes AS (
		SELECT * FROM projects 
		WHERE due_date < CURRENT_DATE 
		AND status IN ('incomplete', 'redo')
		)
		,
	totals AS (
		SELECT count(id), dm_id
		FROM incompletes
		GROUP BY dm_id
		)
		,

	outliers AS (
		SELECT * from totals WHERE count > 2
		)
		
SELECT * FROM incompletes
	JOIN students ON students.dm_id = incompletes.dm_id
	WHERE students.dm_id IN (
		SELECT dm_id FROM outliers
		)
	AND cohort_id IN ($1:csv);
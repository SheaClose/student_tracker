WITH 
	absences AS (
		SELECT date, dm_id, absent
		FROM attendance  
		WHERE absent IS TRUE AND date > CURRENT_DATE - interval '2 weeks'
		GROUP BY date, dm_id, absent
		)
		, 
	totals AS (
		SELECT count(absent), dm_id 
		FROM absences 
		GROUP BY dm_id
		)
		, 
	outliers AS (
		SELECT * 
		FROM totals 
		WHERE count > 2)


SELECT * FROM absences 
	JOIN students ON students.dm_id = absences.dm_id 
	WHERE students.dm_id IN (
		SELECT dm_id FROM outliers
		) 
	AND cohort_id IN (${cohorts:csv});
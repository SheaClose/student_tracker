WITH 
	tardies AS (
		SELECT date, student_id, minutes, timeframe
		FROM attendance  
		WHERE minutes > 0 AND date > CURRENT_DATE - interval '2 weeks'
		), 
	totals AS (
		SELECT count(minutes), sum(minutes), student_id 
		FROM tardies 
		GROUP BY student_id
		), 
	outliers AS (
		SELECT * 
		FROM totals 
		WHERE count > 2)


SELECT * FROM tardies 
	JOIN students ON student_id = dm_id 
	WHERE student_id IN (
		SELECT student_id FROM outliers
		) 
	AND cohort_id = ANY($1)
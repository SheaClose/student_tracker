WITH 
	tardies AS (
		SELECT date, dm_id, minutes, timeframe
		FROM attendance  
		WHERE minutes > 0 AND date > CURRENT_DATE - interval '2 weeks'
		), 
	totals AS (
		SELECT count(minutes), sum(minutes), dm_id 
		FROM tardies 
		GROUP BY dm_id
		), 
	outliers AS (
		SELECT * 
		FROM totals 
		WHERE count > 2)


SELECT students.first_name, students.last_name, students.dm_id, tardies.date, tardies.minutes, tardies.timeframe FROM tardies 
	JOIN students ON students.dm_id = tardies.dm_id 
	WHERE students.dm_id IN (
		SELECT dm_id FROM outliers
		) 
	AND cohort_id IN (${cohorts:csv});
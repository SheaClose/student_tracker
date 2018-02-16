SELECT * FROM 
	(SELECT s.first_name, s.last_name, s.dm_id, p.name, p.due_date, pc.completion,
		(SELECT COUNT(project_id) FROM project_completion pc 
			WHERE pc.dm_id=s.dm_id 
			AND completion != 'complete'
		) AS total_incomplete 
	FROM students s
		JOIN project_completion pc ON pc.dm_id = s.dm_id
		JOIN projects p ON p.id = pc.project_id
	WHERE s.cohort_id IN (${cohorts:csv}) and completion != 'complete') 
AS incompletes 
WHERE total_incomplete > 2
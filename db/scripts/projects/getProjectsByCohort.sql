SELECT s.first_name, s.last_name, s.cohort_id, s.dm_id, p.name, p.due_date, pc.project_id, p.github_link, pc.completion, pc.id,
	(SELECT COUNT(project_id) FROM project_completion pc WHERE pc.dm_id=s.dm_id AND completion != 'complete') as total_incomplete FROM students s
LEFT JOIN project_completion pc ON pc.dm_id = s.dm_id
LEFT JOIN projects p ON p.id = pc.project_id
WHERE s.cohort_id = ${cohort_id}
ORDER BY p.due_date, p.name
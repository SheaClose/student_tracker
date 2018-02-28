SELECT p.name, p.due_date, p.github_link, pc.completion, pc.dm_id  FROM project_completion pc 
JOIN projects p ON pc.project_id = p.id
WHERE pc.dm_id = ${dm_id}
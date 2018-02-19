SELECT 
	students.first_name, students.last_name, students.dm_id,
	t1.id, t1.notes, t1.attitude, t1.skill, t1.confidence_skill, t1.confidence_personal,
	t1.defer_drop_concern, t1.worried, t1.personal_project_ability, t1.group_project_ability,
	t1.date, t1.user_id
FROM oneonones t1 
		JOIN students ON students.dm_id = t1.dm_id
		WHERE t1.date = (
			SELECT MAX(t2.date) FROM oneonones t2 
			WHERE t2.dm_id = t1.dm_id
			)
		AND (skill < 2 OR confidence_skill < 2 OR confidence_personal < 2 OR attitude < 2 OR defer_drop_concern IS TRUE)
		AND cohort_id IN (${cohorts:csv});
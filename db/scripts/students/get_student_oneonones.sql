SELECT notes, attitude, skill, confidence_skill, confidence_personal, defer_drop_concern, worried, personal_project_ability, group_project_ability, date, dm_id, user_id
FROM oneonones 
WHERE dm_id = ${dm_id}
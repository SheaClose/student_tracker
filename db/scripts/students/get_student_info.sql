SELECT dm_id, github_link, linkedin_link, first_name, last_name, email, mentor_id, in_housing, cohort_id, dropped, personal_project_complete, personal_project_link, group_project_complete, group_project_link, assessments_passed, completed_job_prep, eligible_to_badge
FROM students
WHERE dm_id = ${dm_id}
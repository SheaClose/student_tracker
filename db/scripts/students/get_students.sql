SELECT * FROM students
WHERE cohort_id = $1
-- Originally we were getting all students in the allowed cohorts, but the rest of the routes just get one cohort at a time. If we want to get all cohorts for that user, we can use this code:
-- IN 
-- (SELECT name FROM cohorts 
-- JOIN user_cohort ON cohorts.cohort_id=user_cohort.cohort_id
-- WHERE user_cohort.user_id = $1)
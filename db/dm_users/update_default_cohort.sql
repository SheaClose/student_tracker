UPDATE users
SET default_cohort_id = $1
WHERE devmountain_id = $2;

select default_cohort_id from users where devmountain_id = $2;
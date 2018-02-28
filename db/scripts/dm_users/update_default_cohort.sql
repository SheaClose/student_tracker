UPDATE users
SET default_cohort_id = $1
WHERE user_id = $2;

select default_cohort_id from users where user_id = $2;
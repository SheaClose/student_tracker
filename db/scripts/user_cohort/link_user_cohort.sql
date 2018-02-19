INSERT INTO user_cohort
    (user_id, cohort_id)
SELECT $1, $2
WHERE
    NOT EXISTS (
        SELECT user_id, cohort_id FROM user_cohort WHERE user_id = $1 and cohort_id = $2
    );
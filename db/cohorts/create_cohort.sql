INSERT INTO cohorts
    (cohort_id, name, date_start, date_end)
SELECT $1, $2, $3, $4
WHERE
    NOT EXISTS (
        SELECT cohort_id, name FROM cohorts WHERE cohort_id = $1 and name = $2
    );
INSERT INTO cohorts (cohort_id, name, status, start_date, end_date)
VALUES ($1, $2, $3, $4, $5);

select * from cohorts where cohort_id = $1;
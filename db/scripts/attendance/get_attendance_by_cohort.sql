SELECT s.first_name, s.last_name, s.dm_id, a.id, a.morning, a.break, a.lunch, a.afternoon, a.excused, a.date, s.cohort_id FROM students s
    LEFT JOIN attendance a ON a.dm_id=s.dm_id AND a.date=${date}
WHERE s.cohort_id=${cohort_id}
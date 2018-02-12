SELECT s.first_name, s.last_name, s.dm_id, a.id, a.timeframe, a.minutes, s.cohort_id FROM attendance a
    JOIN students s ON a.dm_id=s.dm_id
WHERE s.cohort_id=${cohort_id}
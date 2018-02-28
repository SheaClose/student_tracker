SELECT dm_id, date, excused, notes, absent, morning, break, lunch, afternoon
FROM attendance
WHERE dm_id = ${dm_id}
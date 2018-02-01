INSERT INTO attendance (dm_id, date, excused, notes, timeframe, minutes, absent)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    WHERE dm_id = $1;
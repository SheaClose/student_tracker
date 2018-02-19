INSERT INTO attendance (id, dm_id, date, excused, notes, morning, break, lunch, afternoon, absent)
    VALUES (${id}, ${dm_id}, ${date}, ${excused}, ${notes}, ${morning}, ${break}, ${lunch}, ${afternoon}, ${absent})
ON CONFLICT (id) DO UPDATE SET (id, dm_id, date, excused, notes, morning, break, lunch, afternoon, absent) = (${dm_id}, ${date}, ${excused}, ${notes}, ${morning}, ${break}, ${lunch}, ${afternoon}, ${absent})
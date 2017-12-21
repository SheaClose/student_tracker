INSERT INTO users (devmountain_id, first_name, last_name)
    VALUES ($1, $2, $3)
    RETURNING devmountain_id;
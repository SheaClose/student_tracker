INSERT INTO users (devmountain_id, first_name, last_name)
    VALUES (${id}, ${first_name}, ${last_name})
    RETURNING devmountain_id;
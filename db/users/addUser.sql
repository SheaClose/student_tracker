INSERT INTO public.user (google_id, first_name, last_name, token, pic_url)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING google_id;

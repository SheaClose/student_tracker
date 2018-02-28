UPDATE project_completion SET completion = ${completion} WHERE id=${id}
RETURNING *;
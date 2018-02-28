update students
set dropped = true
where dm_id = $1;

select * from students where dm_id = $1;
--This trigger already exists on the projects table and is here for reference
-- CREATE OR REPLACE FUNCTION add_project_completion() RETURNS TRIGGER as $add_project_completion$
-- 	BEGIN
-- 	INSERT INTO project_completion (dm_id, project_id) (SELECT dm_id, (SELECT NEW.id) as project_id FROM students WHERE cohort_id=NEW.cohort_id);
-- 	RETURN NULL;
-- 	END;
-- $add_project_completion$ LANGUAGE plpgsql;

-- CREATE TRIGGER add_project_completion AFTER INSERT ON projects
-- 	FOR EACH ROW EXECUTE PROCEDURE add_project_completion()
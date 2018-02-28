INSERT INTO repos (cohortid, name, html_url) VALUES (${cohortid}, ${name}, ${html_url})
SELECT * FROM repos WHERE cohortid = ${cohortid}
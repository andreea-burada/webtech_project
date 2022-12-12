-- change root temp. password to specific password
ALTER USER 'root'@'localhost' IDENTIFIED BY '[password]';
-- create DB used for project
CREATE DATABASE webtech_project;
-- create user for project
CREATE USER 'webtech_project'@'localhost' IDENTIFIED BY '10laWebTech';
-- grant user all privileges on project DB
GRANT ALL PRIVILEGES ON webtech_project.* TO 'webtech_project'@'localhost' WITH GRANT OPTION;
exit;
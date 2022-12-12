@echo off
"C:\Program Files\MySQL\MySQL Server 8.0\bin\mysqld.exe" --initialize --console > "%cd%\db_setup\temp.txt" 2>&1
set /p password=<temp.txt
set password=%password:~-12,12%
"C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe" -u webtech_project -p10laWebTech webtech_project < "%cd%\db_setup\db_setup.sql"
set password=
@echo off
set PATH=%PATH%;C:\Users\[user]\scoop\shims
sudo "C:\Program Files\MySQL\MySQL Server 8.0\bin\mysqld.exe" --initialize --console
set password=[root_password]
"C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe" -uroot -p%password% < "%cd%\db_setup\db_setup.sql"
set password=
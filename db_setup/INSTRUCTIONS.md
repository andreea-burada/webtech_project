### Set-up Project Database
#### Install MySQL
Tutorial: https://phoenixnap.com/kb/install-mysql-on-windows \
! Do not execute the commands at the end of the tutorial \
! Please replace `[root_password]` in `db_setup/mysql_setup.bat` with the root password you chose during the MySQL installation. \
After the installation please **reboot** your computer.

#### Check if MySQL is running
Press `Win + R` and in the window that pops up type `cmd` and hit ENTER \
Type `services.msc` and run it. In the opened window, check to see if `MySQL80` is **running**.
If not, please restart your computer and check again.

#### Set-up Database
Open a terminal in VS Code and make sure you are located in `webtech_project`. \
Run the following commands:
```
.\db_setup\mysql_setup.bat
npm install mysql2
node .\db_setup\tables_setup.js
.\db_setup\mysql_db.bat
```
After running the last command, you should now be inside the MySQL CLI. Run `show tables;` to make sure the database was setup correctly.
##### For more CLI commands for MySQL check: https://dev.mysql.com/doc/refman/8.0/en/mysql.html
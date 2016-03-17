::Start the server, change to the MySQL bin directory, and dump all databases
net start MySQL
set serverdir="C:\Program Files"
cd       /d "%serverdir%\MySQL\MySQL Server 5.6\bin"
mysqldump  -uroot -p --all-tablespaces --all-databases --add-drop-database --add-drop-table --add-locks --comments --complete-insert --compress --create-options --events --routines --quick --quote-names --set-charset --triggers > %temp%\all.sql

::Stop the server and rename the data directory (as backup)
net stop mysql
ren         "%datadir%\MySQL"        MySQL_

::Delete data folder in MySQL directory, optionally copy old mysql tables
rd    /s /q "%serverdir%\MySQL\MySQL Server 5.6\data"
md          "%serverdir%\MySQL\MySQL Server 5.6\data"
xcopy /s /e "%datadir%\MySQL_\mysql" "%serverdir%\MySQL\MySQL Server 5.6\data"

::Bootstrap the server (creates grant tables if they don’t exist)
mysqld --bootstrap

::Run server, optionally upgrade tables and move upgrade log to data directory
start mysqld --skip-grant-tables
mysql_upgrade --force
move "%serverdir%\MySQL\bin\mysql_upgrade_info" "%serverdir%\MySQL\data"

::Import all databases, shutdown, delete logs, then move to old data dir
mysql      -uroot -p < %temp%\all.sql
mysqladmin -uroot -p shutdown
md  "%datadir%\MySQL"
del "%serverdir%\MySQL\data\ib_logfile?"
xcopy /s /e "%serverdir%\MySQL\data\*" "%datadir%\MySQL"
rd    /s /q "%serverdir%\MySQL\data"

::Start the server, if it works, then all should be well, so del
net start mysql
rd    /s /q "%datadir%\MySQL_"
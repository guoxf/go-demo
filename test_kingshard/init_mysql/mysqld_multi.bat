cd C:\Program Files\MySQL\MySQL Server 5.6\bin
start /b "C:\Program Files\MySQL\MySQL Server 5.6\bin\mysqld" --defaults-file="D:\MyProject\src\GoDemo\test_kingshard\node1.ini" --bootstrap --console < ..\share\mysql_system_tables.sql
start /b "C:\Program Files\MySQL\MySQL Server 5.6\bin\mysqld" --defaults-file="D:\MyProject\src\GoDemo\test_kingshard\node2.ini"

mysqld.exe --defaults-file="D:\MyProject\src\GoDemo\test_kingshard\node1.ini" --log_syslog=0 --console --standalone --initialize
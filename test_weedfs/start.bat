taskkill /IM weed.exe /f
set mdir1=d:\tmp\m1
set vdir1=d:\tmp\v1
set mlog=d:\tmp\log\m.log
set vlog=d:\tmp\log\v.log
mkdir %mdir1%
mkdir %vdir1%
mkdir d:\tmp\log
start /b weed -v=3 master -port=9333 -mdir=%mdir1% >%mlog% 2>&1
start /b weed -v=3 volume -port=8081 -dir=%vdir1% -mserver=localhost:9333 >%vlog% 2>&1
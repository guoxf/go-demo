echo "close weed"
taskkill /IM weed.exe /f

set rootPath=d:\
echo %rootPath%
cd /D %rootPath%
set tmpPath=tmp
set dataPath=%rootPath%%tmpPath%
mkdir %tmpPath%
cd %tmpPath%
mkdir m1
mkdir m2
mkdir m3
mkdir v1
mkdir v2
mkdir v3
set logPath=%dataPath%\log
mkdir %logPath%
mkdir d:\tmp\f1

set peers=localhost:9333,localhost:9334,localhost:9335
::-defaultReplication=100
start /b weed -v=3 master -port=9333 -mdir=%dataPath%\m1 -peers=%peers% >%logPath%\m1.log 2>&1
start /b weed -v=3 master -port=9334 -mdir=%dataPath%\m2 -peers=%peers% >%logPath%\m2.log 2>&1
start /b weed -v=3 master -port=9335 -mdir=%dataPath%\m3 -peers=%peers% >%logPath%\m3.log 2>&1

start /b weed -v=3 volume -port=8081 -dir=%dataPath%\v1 -mserver=localhost:9333 -dataCenter=dc1 >%logPath%\v1.log 2>&1
start /b weed -v=3 volume -port=8082 -dir=%dataPath%\v2 -mserver=localhost:9334 -dataCenter=dc1 >%logPath%\v2.log 2>&1
start /b weed -v=3 volume -port=8083 -dir=%dataPath%\v3 -mserver=localhost:9335 -dataCenter=dc2 >%logPath%\v3.log 2>&1

start /b weed filer -port=8888 -dir=d:\tmp\f1 -master=localhost:9333 >d:\tmp\log\f.log 2>&1

taskkill /IM kingshard.exe /f
set configPath=%~dp0conf\unshard.yaml
start /b kingshard.exe -config=%configPath%
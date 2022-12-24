@echo off
powershell -Command "Set-ExecutionPolicy RemoteSigned -Scope CurrentUser"
powershell -Command "irm get.scoop.sh | iex"
set PATH=%PATH%;C:\Users\[user]\scoop\shims
scoop install gsudo
#!/bin/sh
clear

echo "Launching Scala-Play service..."
cd backends/scala-play
start activator "run -Dhttp.port=9002"
cd ../..

echo "Launching ASP.NET service..."
start backends/AspNet/AspNet/bin/Debug/AspNet.exe

echo "Launching Todo MVC website..."
cd web_app
node server.js
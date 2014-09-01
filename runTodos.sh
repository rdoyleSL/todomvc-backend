#!/bin/sh
clear

echo "Launching Scala-Play service..."
cd backends/scala-play
start activator "run -Dhttp.port=9002"
cd ../..

echo "Launching ASP.NET service..."

echo "Launching Todo MVC website..."
node web_app/server.js
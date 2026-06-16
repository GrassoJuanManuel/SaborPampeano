@echo off
title Servidor Local - Dashboard Sabor Pampeano
echo ==========================================================
echo    Servidor Local de Sabor Pampeano Iniciado
echo ==========================================================
echo.
echo Por favor, NO cierre esta ventana mientras este usando el Dashboard.
echo Si la cierra, el guardado automatico dejara de funcionar.
echo.
echo Iniciando servidor en el puerto 8080...

:: Start the python server in the background within this terminal
start /B python sabor_server.py

:: Wait 2 seconds for the server to spin up
timeout /t 2 /nobreak > NUL

:: Open the browser
start http://localhost:8080/00_Dashboard_Proyectos/Planificaci%%C3%%B3n%%20y%%20Proyectos.html

echo.
echo Dashboard abierto en su navegador.
:: Keep the window open so they can see the logs and close it when done
cmd /k

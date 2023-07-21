
del %cd%\src\dist\*.* /q /s

pushd %cd%\src && tsc && popd && npm start
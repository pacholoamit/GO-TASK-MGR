#!/bin/bash

# Check dependencies
echo -n "Checking dependencies... "
for name in yarn nodejs go
do
  [[ $(which $name 2>/dev/null) ]] || { echo -en "\n$name needs to be installed. Use 'sudo apt-get install $name'";deps=1; }
done
[[ $deps -ne 1 ]] && echo "OK" || { echo -en "\nInstall the above and rerun this script\n";exit 1; }

# 

if command -v air >/dev/null 2>&1 ; then
    # Check if golang air is installed
    cd web && yarn dev & air && fg
else
	echo "Go air is required for hot-reload. You'll have to run this command again to see changes"
	echo "Run curl -sSfL https://raw.githubusercontent.com/cosmtrek/air/master/install.sh | sh -s to install air"
    cd web && yarn dev & go run main.go && fg
fi




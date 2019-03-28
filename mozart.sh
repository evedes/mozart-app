#!/bin/bash

# --------------------------------------------------------------------------
# constants
# --------------------------------------------------------------------------
RETURN_SUCCESS=0;
RETURN_ERROR=1;

# --------------------------------------------------------------------------
# check if not arguments are set, prints help
# --------------------------------------------------------------------------
if [[ $# -eq 0 || "$1" =  "help" || "$1" =  "--help" ]]
then
  echo "Usage: $0 prod|dev [Options]";
  echo "[Options]";
  echo "build";
  echo "up";
  echo "down";
  echo "react";
  echo "logs";
  echo "mozart_backend";
  echo "mozart_mongodb";
  exit $RETURN_ERROR;
fi

# --------------------------------------------------------------------------
# check mandatory ARGS
# --------------------------------------------------------------------------
# Get ARGS into LINES, lowercase all strings
ARGS_LINES=$(echo $@ | tr " " "\n" | tr A-Z a-z);

# Special development entry, does not require $ARG1
if [[ $(echo $ARGS_LINES | grep "add-backend-to-hosts") ]]
then
    if ! cat /etc/hosts | grep 'mozart_backend' > /dev/null; then
        echo 'Adding `127.0.0.1 mozart_backend` entry to /etc/hosts';
        sudo sh -c "echo '127.0.0.1       mozart_backend\n' >> /etc/hosts";
    else
      echo 'No change required, found `127.0.0.1 mozart_backend` entry in /etc/hosts';
    fi
  exit $RETURN_SUCCESS;
fi

if [[ $(echo $ARGS_LINES | grep "add-mongodb-to-hosts") ]]
then
    if ! cat /etc/hosts | grep 'mozart_mongodb' > /dev/null; then
        echo 'Adding `127.0.0.1 mozart_mongodb` entry to /etc/hosts';
        sudo sh -c "echo '127.0.0.1       mozart_mongodb\n' >> /etc/hosts";
    else
      echo 'No change required, found `127.0.0.1 mozart_mongodb` entry in /etc/hosts';
    fi
  exit $RETURN_SUCCESS;
fi

#  ARG1 => ENVIRONMENT: ['prod', 'dev']
if [[ "$1" !=  "prod" && "$1" !=  "dev" ]]
then
  echo "ENVIRONMENT: Wrong value of ARG[\$1]! Recieved '$1', expected values of ['prod','dev']";
  exit $RETURN_ERROR;
fi
ENVIRONMENT=$1;

#  check for build option
BUILD=0;
if [[ $(echo $ARGS_LINES | grep "build") ]]
then
  echo "Option: build [ACTIVE]";
  BUILD=1;
fi

SERVICE_UP=0;
if [[ $(echo $ARGS_LINES | grep "up") ]]
then
  echo "Option: up [ACTIVE]";
  SERVICE_UP=1;
fi

SERVICE_DOWN=0;
if [[ $(echo $ARGS_LINES | grep "down") ]]
then
  echo "Option: down [ACTIVE]";
  SERVICE_DOWN=1;
fi

REACT=0;
if [[ $(echo $ARGS_LINES | grep "react") ]]
then
  echo "Option: react [ACTIVE]";
  REACT=1;
fi

LOGS=0;
if [[ $(echo $ARGS_LINES | grep "logs") ]]
then
  echo "Option: logs [ACTIVE]";
  LOGS=1;
fi

# --------------------------------------------------------------------------


# --------------------------------------------------------------------------
# main
# --------------------------------------------------------------------------
export HOST_NAME=$(hostname);

# build
if [[ "$BUILD" = "1" ]]
then
  echo "------------------------------------------------------------";
  echo "Build for environment: $ENVIRONMENT";
  echo "------------------------------------------------------------";
  if [[ "$ENVIRONMENT" = "prod" ]]
  then
    # build for production
    docker-compose build;
  else
    # build for development
    docker-compose -f docker-compose.yml -f docker-compose.develop.yml build;
  fi
fi

# docker-compose up
if [[ "$SERVICE_UP" = "1" ]]
then
  echo "------------------------------------------------------------";
  echo "[UP] Running services for environment: $ENVIRONMENT";
  echo "------------------------------------------------------------";
  if [[ "$ENVIRONMENT" = "prod" ]]
  then
    # build for production
    docker-compose up -d;
  else
    # build for development
    docker-compose -f docker-compose.yml -f docker-compose.develop.yml up -d;
  fi
fi

# open react
if [[ "$REACT" = "1" ]]
then
    echo "------------------------------------------------------------";
    echo "[REACT] Open REACT app in browser"
    echo "------------------------------------------------------------";

    printf "Waiting for REACT PORT to be available ";
    while [ $(nc -zvn 127.0.0.1 80 &>/dev/null && echo "1" || echo "0") -eq 0 ]
    do
        printf ".";
        sleep 1;
    done
    echo "";

    printf "Waiting for REACT HTTP response ";
    while [ $(curl --silent http://localhost:80 &>/dev/null && echo "1" || echo "0") -eq 0 ]
    do
        printf ".";
        sleep 1;
    done
    echo "";

    open http://localhost:80;
fi

# docker-compose logs
if [[ "$LOGS" = "1" ]]
then
  echo "------------------------------------------------------------";
  echo "[LOGS] Attach to services logs for environment: $ENVIRONMENT";
  echo "------------------------------------------------------------";
  if [[ "$ENVIRONMENT" = "prod" ]]
  then
    # build for production
    docker-compose logs -f;
  else
    # build for development
    docker-compose -f docker-compose.yml -f docker-compose.develop.yml logs -f;
  fi
fi

# docker-compose down
if [[ "$SERVICE_DOWN" = "1" ]]
then
  echo "------------------------------------------------------------";
  echo "[DOWN] Shuting down services for environment: $ENVIRONMENT";
  echo "------------------------------------------------------------";
  if [[ "$ENVIRONMENT" = "prod" ]]
  then
    # build for production
    docker-compose down;
  else
    # build for development
    docker-compose -f docker-compose.yml -f docker-compose.develop.yml down;
  fi
fi

# --------------------------------------------------------------------------

exit $RETURN_SUCCESS;
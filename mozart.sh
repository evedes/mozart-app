#!/bin/bash

# --------------------------------------------------------------------------
# constants
# --------------------------------------------------------------------------
RETURN_SUCCESS=0;
RETURN_ERROR=1;

# --------------------------------------------------------------------------
# CTRL+C handler
# --------------------------------------------------------------------------
function control_c() {
  echo "Unexpected exit!";
  exit $RETURN_ERROR;
}
trap control_c SIGINT;

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
  echo "logs";
  exit $RETURN_ERROR;
fi

# --------------------------------------------------------------------------
# check mandatory ARGS
# --------------------------------------------------------------------------
# Get ARGS into LINES, lowercase all strings
ARGS_LINES=$(echo $@ | tr " " "\n" | tr A-Z a-z);

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

# --------------------------------------------------------------------------

exit $RETURN_SUCCESS;
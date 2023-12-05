#!/bin/bash
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
WHITE='\033[0;37m'
RESET='\033[0m'

echo -e $GREEN "이 스크립트는 jungko-client 루트 디렉토리에서 실행되어야 합니다!!" $RESET

pnpm install

if [ "$#" -eq 0 ] || [ "$1" != "demo" ]; then
  git submodule foreach git pull origin main
  pnpm dev
fi

if [ "$#" -eq 1 ] && [ "$1" == "demo" ]; then
  cp .env.example .env
  pnpm demo
fi

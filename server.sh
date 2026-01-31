#!/bin/bash

# SSM Dashboard Local Server
# This script starts a simple HTTP server to run the dashboard locally

GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}╔════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║   SSM Dashboard Local Server          ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════╝${NC}"
echo ""

PORT=8000

# Check if port is already in use
if lsof -Pi :$PORT -sTCP:LISTEN -t >/dev/null 2>&1 ; then
    echo -e "${YELLOW}⚠️  Port $PORT is already in use${NC}"
    echo -e "${YELLOW}   Trying port 8001...${NC}"
    PORT=8001
fi

echo -e "${GREEN}🚀 Starting server on port $PORT...${NC}"
echo ""

# Try different server options
if command -v python3 &> /dev/null; then
    echo -e "${GREEN}✓ Using Python 3${NC}"
    echo -e "${BLUE}📡 Dashboard available at: ${YELLOW}http://localhost:$PORT${NC}"
    echo -e "${BLUE}📡 Network access at: ${YELLOW}http://$(ipconfig getifaddr en0 2>/dev/null || hostname):$PORT${NC}"
    echo ""
    echo -e "${GREEN}Press Ctrl+C to stop the server${NC}"
    echo ""
    python3 -m http.server $PORT
elif command -v python &> /dev/null; then
    echo -e "${GREEN}✓ Using Python 2${NC}"
    echo -e "${BLUE}📡 Dashboard available at: ${YELLOW}http://localhost:$PORT${NC}"
    echo ""
    echo -e "${GREEN}Press Ctrl+C to stop the server${NC}"
    echo ""
    python -m SimpleHTTPServer $PORT
elif command -v php &> /dev/null; then
    echo -e "${GREEN}✓ Using PHP${NC}"
    echo -e "${BLUE}📡 Dashboard available at: ${YELLOW}http://localhost:$PORT${NC}"
    echo ""
    echo -e "${GREEN}Press Ctrl+C to stop the server${NC}"
    echo ""
    php -S localhost:$PORT
else
    echo -e "${YELLOW}⚠️  No suitable server found${NC}"
    echo ""
    echo -e "Please install one of the following:"
    echo -e "  • Python 3: ${BLUE}brew install python3${NC}"
    echo -e "  • Node.js: ${BLUE}brew install node${NC} then run ${BLUE}npx http-server -p $PORT${NC}"
    echo -e "  • PHP: ${BLUE}brew install php${NC}"
    echo ""
    exit 1
fi

# Made with Bob

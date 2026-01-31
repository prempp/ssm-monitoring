#!/bin/bash

# SSM Dashboard - IBM GitHub Setup Script
# This script helps you create the repository on IBM GitHub and push the code

set -e

GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;91m'
NC='\033[0m' # No Color

echo -e "${BLUE}╔════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║   SSM Dashboard - IBM GitHub Setup                    ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════════╝${NC}"
echo ""

# Check if git is initialized
if [ ! -d .git ]; then
    echo -e "${RED}✗ Git repository not initialized${NC}"
    echo -e "${YELLOW}Run: git init${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Git repository initialized${NC}"

# Check if files are committed
if ! git rev-parse HEAD >/dev/null 2>&1; then
    echo -e "${RED}✗ No commits found${NC}"
    echo -e "${YELLOW}Run: git add . && git commit -m 'Initial commit'${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Files committed${NC}"
echo ""

# Repository details
REPO_OWNER="prem-prakash"
REPO_NAME="ssm-monitoring"
IBM_GITHUB_URL="https://github.ibm.com"
REPO_URL="${IBM_GITHUB_URL}/${REPO_OWNER}/${REPO_NAME}.git"

echo -e "${BLUE}Repository Details:${NC}"
echo -e "  Owner:  ${YELLOW}${REPO_OWNER}${NC}"
echo -e "  Name:   ${YELLOW}${REPO_NAME}${NC}"
echo -e "  URL:    ${YELLOW}${REPO_URL}${NC}"
echo ""

# Check if remote exists
if git remote get-url origin >/dev/null 2>&1; then
    CURRENT_REMOTE=$(git remote get-url origin)
    echo -e "${YELLOW}⚠ Remote 'origin' already exists: ${CURRENT_REMOTE}${NC}"
    echo -e "${YELLOW}Updating remote URL...${NC}"
    git remote set-url origin "${REPO_URL}"
    echo -e "${GREEN}✓ Remote updated${NC}"
else
    echo -e "${BLUE}Adding remote 'origin'...${NC}"
    git remote add origin "${REPO_URL}"
    echo -e "${GREEN}✓ Remote added${NC}"
fi

echo ""
echo -e "${YELLOW}════════════════════════════════════════════════════════${NC}"
echo -e "${YELLOW}IMPORTANT: Manual Steps Required${NC}"
echo -e "${YELLOW}════════════════════════════════════════════════════════${NC}"
echo ""
echo -e "${BLUE}Step 1: Create Repository on IBM GitHub${NC}"
echo ""
echo -e "  1. Open: ${YELLOW}${IBM_GITHUB_URL}${NC}"
echo -e "  2. Click: ${YELLOW}+ → New repository${NC}"
echo -e "  3. Fill in:"
echo -e "     - Owner: ${YELLOW}${REPO_OWNER}${NC}"
echo -e "     - Repository name: ${YELLOW}${REPO_NAME}${NC}"
echo -e "     - Description: ${YELLOW}SSM Health Monitoring Dashboard${NC}"
echo -e "     - Visibility: ${YELLOW}Private ✓${NC}"
echo -e "     - ${RED}DO NOT${NC} initialize with README"
echo -e "  4. Click: ${YELLOW}Create repository${NC}"
echo ""
echo -e "${BLUE}Step 2: Push the Code${NC}"
echo ""
echo -e "  After creating the repository, run:"
echo -e "  ${GREEN}git push -u origin main${NC}"
echo ""
echo -e "${YELLOW}════════════════════════════════════════════════════════${NC}"
echo ""

# Ask if user wants to try pushing now
read -p "$(echo -e ${YELLOW}Have you created the repository? Try pushing now? [y/N]: ${NC})" -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo ""
    echo -e "${BLUE}Attempting to push to IBM GitHub...${NC}"
    echo ""
    
    if git push -u origin main; then
        echo ""
        echo -e "${GREEN}╔════════════════════════════════════════════════════════╗${NC}"
        echo -e "${GREEN}║   ✓ SUCCESS! Code pushed to IBM GitHub                ║${NC}"
        echo -e "${GREEN}╚════════════════════════════════════════════════════════╝${NC}"
        echo ""
        echo -e "${BLUE}Repository URL:${NC}"
        echo -e "  ${YELLOW}${IBM_GITHUB_URL}/${REPO_OWNER}/${REPO_NAME}${NC}"
        echo ""
        echo -e "${BLUE}Clone command:${NC}"
        echo -e "  ${GREEN}git clone ${REPO_URL}${NC}"
        echo ""
        echo -e "${BLUE}To run the dashboard:${NC}"
        echo -e "  ${GREEN}cd ${REPO_NAME}${NC}"
        echo -e "  ${GREEN}node proxy-server.js${NC}"
        echo -e "  ${GREEN}# Open http://localhost:8000${NC}"
        echo ""
    else
        echo ""
        echo -e "${RED}✗ Push failed${NC}"
        echo ""
        echo -e "${YELLOW}Common issues:${NC}"
        echo -e "  1. Repository not created yet on IBM GitHub"
        echo -e "  2. Authentication required - you may need to enter credentials"
        echo -e "  3. No permission to push to this repository"
        echo ""
        echo -e "${BLUE}To retry:${NC}"
        echo -e "  ${GREEN}git push -u origin main${NC}"
        echo ""
    fi
else
    echo ""
    echo -e "${BLUE}No problem! When ready, run:${NC}"
    echo -e "  ${GREEN}git push -u origin main${NC}"
    echo ""
fi

echo -e "${BLUE}════════════════════════════════════════════════════════${NC}"
echo -e "${GREEN}Setup script completed!${NC}"
echo -e "${BLUE}════════════════════════════════════════════════════════${NC}"

# Made with Bob

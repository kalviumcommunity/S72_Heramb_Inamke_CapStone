#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${YELLOW}🚀 Starting WedWise Docker Setup...${NC}\n"

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo -e "${RED}❌ Docker is not running. Please start Docker and try again.${NC}"
    exit 1
fi

# Build images
echo -e "${YELLOW}📦 Building Docker images...${NC}"
docker-compose build

# Check if build was successful
if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Build failed. Please check the error messages above.${NC}"
    exit 1
fi

# Start containers
echo -e "${YELLOW}🚀 Starting containers...${NC}"
docker-compose up -d

# Check if containers are running
if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Failed to start containers. Please check the error messages above.${NC}"
    exit 1
fi

# Wait for services to be ready
echo -e "${YELLOW}⏳ Waiting for services to be ready...${NC}"
sleep 10

# Check if services are healthy
echo -e "${YELLOW}🔍 Checking service health...${NC}"
if curl -s http://localhost:5000/health > /dev/null; then
    echo -e "${GREEN}✅ Backend is healthy${NC}"
else
    echo -e "${RED}❌ Backend health check failed${NC}"
fi

if curl -s http://localhost:5173 > /dev/null; then
    echo -e "${GREEN}✅ Frontend is healthy${NC}"
else
    echo -e "${RED}❌ Frontend health check failed${NC}"
fi

echo -e "\n${GREEN}🎉 WedWise is now running!${NC}"
echo -e "${GREEN}🌐 Frontend: http://localhost:5173${NC}"
echo -e "${GREEN}🔌 Backend: http://localhost:5000${NC}"
echo -e "\n${YELLOW}📝 Available commands:${NC}"
echo -e "  ${GREEN}docker-compose logs -f${NC}    - View logs"
echo -e "  ${GREEN}docker-compose down${NC}      - Stop containers"
echo -e "  ${GREEN}docker-compose restart${NC}   - Restart containers" 
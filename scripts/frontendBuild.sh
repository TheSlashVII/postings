#!/bin/bash
# frontend build script

# building frontend for production

echo "building frontend..."
if [ -d "../dockerfiles/frontend/postings_frontend" ]; then
  rm -rf ../dockerfiles/frontend/postings_frontend
fi
cp -r ../postings_frontend/ ../dockerfiles/frontend/
sudo docker build -t postings_frontend:latest ../dockerfiles/frontend/
echo "finished frontend build attempt"

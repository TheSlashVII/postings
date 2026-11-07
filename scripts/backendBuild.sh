#!/bin/bash
# backend build script
if [ -d "../dockerfiles/backend/postings_backend" ]; then
  rm -rf ../dockerfiles/backend/postings_backend
fi
echo "copying files to the build location"
cp -r ../postings_backend/ ../dockerfiles/backend/
sudo docker build -t postings_backend:latest ../dockerfiles/backend/
echo "finished docker build attempt"

#!/bin/bash
# backend build script
if [ -d "../dockerfiles/backend/postings_backend" ]; then
  rm -rf ../dockerfiles/backend/postings_backend
fi
cp -rv ../postings_backend/ ../dockerfiles/backend/
sudo docker build -t postings_backend:latest ../dockerfiles/backend/

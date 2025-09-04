#!/bin/bash

echo "Pulling latest changes from Git..."
git pull origin main

echo "Installing dependencies..."
npm install --legacy-peer-deps

echo "Building Vue app for production..."
npm run build

echo "Restarting PM2 process..."
if pm2 list | grep -q "vue-admin-panel"; then
  pm2 restart vue-admin-panel
else
  echo "PM2 process not found, starting new process..."
  pm2 start "npm run preview" --name vue-admin-panel
fi

echo "Saving PM2 process list..."
pm2 save

echo "Deployment complete!"

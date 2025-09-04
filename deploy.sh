#!/bin/bash

echo "Pulling latest changes from Git..."
git pull origin main

echo "Installing dependencies..."
npm install --legacy-peer-deps

echo "Building Vue app for production..."
npm run build

echo "Restarting PM2 process..."
pm2 restart vue-admin-panel

echo "Saving PM2 process list..."
pm2 save

echo "Deployment complete!"

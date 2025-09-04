#!/bin/bash

# Set production port
export PORT=3001

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
  pm2 start "npm run preview -- --port $PORT --host 0.0.0.0" --name vue-admin-panel
fi

echo "Saving PM2 process list..."
pm2 save

echo "Deployment complete!"
echo "Admin panel is running on port $PORT"
echo "Access URL: http://your-server-ip:$PORT"

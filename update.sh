#!/bin/bash
# ============================================
# Update Script - Run after code changes
# ============================================

set -e

APP_DIR="/var/www/wifimurahbandung.web.id"

echo "🔄 Updating Wifi Murah Bandung..."
echo "=================================="

cd $APP_DIR

# 1. Pull latest code (if using git)
# git pull origin main

# 2. Install dependencies
echo "📥 Installing dependencies..."
npm install --production=false

# 3. Generate Prisma client
echo "🗄️ Generating Prisma client..."
npx prisma generate

# 4. Push schema changes (if any)
echo "🗄️ Updating database schema..."
npx prisma db push

# 5. Build
echo "🔨 Building..."
npm run build

# 6. Copy static files
echo "📋 Copying static files..."
cp -r .next/static .next/standalone/.next/
cp -r public .next/standalone/

# 7. Restart PM2
echo "🔄 Restarting application..."
pm2 restart wifimurahbandung

echo ""
echo "✅ Update complete!"
echo "📊 PM2 status: pm2 status"

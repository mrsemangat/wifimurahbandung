#!/bin/bash
# ============================================
# Deploy Script for FastPanel VPS
# Run this on your VPS after initial setup
# ============================================

set -e

APP_DIR="/var/www/wifimurahbandung.web.id"
APP_USER="www-data"
PORT=3000

echo "🚀 Deploying Wifi Murah Bandung..."
echo "=================================="

# 1. Create directories
echo "📁 Creating directories..."
mkdir -p $APP_DIR/db
mkdir -p $APP_DIR/logs
mkdir -p $APP_DIR/public

# 2. Copy project files (exclude dev files)
echo "📦 Copying project files..."
# Upload files from your local machine first, then:
# rsync -avz --exclude 'node_modules' --exclude '.next' --exclude 'dev.log' ./ user@your-vps-ip:$APP_DIR/

# 3. Install dependencies
echo "📥 Installing dependencies..."
cd $APP_DIR
npm install --production=false

# 4. Generate Prisma client
echo "🗄️ Generating Prisma client..."
npx prisma generate

# 5. Push database schema (creates tables)
echo "🗄️ Setting up database..."
npx prisma db push

# 6. Seed database with initial data
echo "🌱 Seeding database..."
npx tsx prisma/seed.ts

# 7. Build Next.js
echo "🔨 Building Next.js..."
npm run build

# 8. Copy static files to standalone output
echo "📋 Copying static files..."
cp -r .next/static .next/standalone/.next/
cp -r public .next/standalone/

# 9. Set permissions
echo "🔒 Setting permissions..."
chown -R $APP_USER:$APP_USER $APP_DIR
chmod -R 755 $APP_DIR
chmod 644 $APP_DIR/db/production.db 2>/dev/null || true

# 10. Start with PM2
echo "🚀 Starting application with PM2..."
pm2 start ecosystem.config.js
pm2 save

echo ""
echo "✅ Deployment complete!"
echo "=================================="
echo "🌐 App running on port $PORT"
echo "📊 PM2 status: pm2 status"
echo "📝 Logs: pm2 logs wifimurahbandung"
echo ""
echo "⚠️  Next step: Configure Nginx reverse proxy in FastPanel"
echo "   Domain: wifimurahbandung.web.id"
echo "   Proxy target: http://127.0.0.1:$PORT"

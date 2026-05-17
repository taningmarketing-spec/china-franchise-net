#!/bin/bash
set -e
export DEBIAN_FRONTEND=noninteractive

echo "=== Step 4: Install Nginx + Certbot ==="
apt-get install -y nginx certbot python3-certbot-nginx 2>&1 | tail -5

echo "=== Step 5: Clone project ==="
cd /home/ubuntu
if [ -d china-franchise-net ]; then
    cd china-franchise-net && git pull origin main
else
    git clone https://github.com/weimanduo/china-franchise-net.git
fi

echo "=== Step 6: Install deps & build ==="
cd /home/ubuntu/china-franchise-net
npm ci 2>&1 | tail -5

echo "=== Create .env ==="
if [ ! -f .env ]; then
    cat > .env << 'ENVEOF'
NODE_ENV=production
JWT_SECRET=CnfJwtSecret2026SecureKeyForProduction!
ADMIN_PASSWORD=CnfAdmin@2026!
DATABASE_URL="file:./dev.db"
PORT=3000
ENVEOF
    echo ".env created"
else
    echo ".env already exists, skipping"
fi

echo "=== Build Next.js ==="
npm run build 2>&1 | tail -15
echo "===BUILD_DONE==="

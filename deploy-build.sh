#!/bin/bash
set -e
export DEBIAN_FRONTEND=noninteractive

echo "=== Install deps ==="
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
    echo ".env already exists"
fi

echo "=== Build Next.js ==="
npm run build 2>&1 | tail -20
echo "===BUILD_DONE==="

#!/bin/bash
set -e

echo "=== Step 1: Write basic Nginx config (HTTP only) ==="
sudo mkdir -p /var/www/certbot

sudo tee /etc/nginx/sites-available/cnfranchise > /dev/null << 'EOF'
server {
    listen 80;
    server_name cnfranchise.com www.cnfranchise.com;

    location /.well-known/acme-challenge/ {
        root /var/www/certbot;
    }

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        proxy_read_timeout 120s;
        proxy_connect_timeout 10s;
    }
}
EOF

echo "=== Step 2: Test Nginx config ==="
sudo nginx -t

echo "=== Step 3: Reload Nginx ==="
sudo systemctl reload nginx

echo "=== Step 4: Install certbot ==="
sudo apt-get update -qq
sudo apt-get install -y certbot python3-certbot-nginx

echo "=== Step 5: Get SSL certificate ==="
sudo certbot --nginx \
    -d cnfranchise.com \
    -d www.cnfranchise.com \
    --non-interactive \
    --agree-tos \
    --email leo@weimanduo.cn \
    --redirect

echo "=== Step 6: Test Nginx config (with SSL) ==="
sudo nginx -t

echo "=== Step 7: Reload Nginx (with SSL) ==="
sudo systemctl reload nginx

echo "=== Step 8: Setup auto-renewal ==="
sudo systemctl enable certbot.timer
sudo systemctl start certbot.timer

echo ""
echo "=== ALL DONE ==="
echo "Website should be accessible at:"
echo "  http://cnfranchise.com"
echo "  http://www.cnfranchise.com"
echo "  https://cnfranchise.com"
echo "  https://www.cnfranchise.com"

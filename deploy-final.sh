#!/bin/bash
set -e

echo "=== Configure Nginx ==="
cat > /tmp/cnfranchise.conf << 'EOF'
server {
    listen 80;
    server_name _;

    client_max_body_size 50M;

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

sudo cp /tmp/cnfranchise.conf /etc/nginx/sites-available/cnfranchise
sudo ln -sf /etc/nginx/sites-available/cnfranchise /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t && echo "Nginx config OK"

echo "=== Reload Nginx ==="
sudo systemctl reload nginx || sudo nginx -s reload

echo "=== Setup PM2 ==="
cd /home/ubuntu/china-franchise-net
pm2 delete cnfranchise 2>/dev/null || true
pm2 start npm --name cnfranchise -- start 2>&1 | tail -3

echo "=== Wait for app to start ==="
sleep 5

echo "=== PM2 Status ==="
pm2 status

echo "=== Test local ==="
curl -s -o /dev/null -w "%{http_code}" http://127.0.0.1:3000 || echo "NOT_READY"

echo ""
echo "=== ALL DONE ==="

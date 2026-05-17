import paramiko, sys
sys.stdout.reconfigure(encoding='utf-8', errors='replace')

c = paramiko.SSHClient()
c.set_missing_host_key_policy(paramiko.AutoAddPolicy())
c.connect('124.156.140.166', username='ubuntu', password='Taning@2026!', timeout=15)

# Write a clean, correct Nginx config
nginx_conf = """server {
    listen 80;
    server_name cnfranchise.com www.cnfranchise.com;

    location /.well-known/acme-challenge/ {
        root /var/www/certbot;
    }

    location / {
        return 301 https://$host$request_uri;
    }
}

server {
    listen 443 ssl http2;
    server_name cnfranchise.com www.cnfranchise.com;

    ssl_certificate /etc/letsencrypt/live/cnfranchise.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/cnfranchise.com/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

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
"""

# Upload the fixed config
stdin, out, err = c.exec_command('sudo tee /etc/nginx/sites-available/cnfranchise > /dev/null', get_pty=True)
stdin.write(nginx_conf + '\x04')
stdin.close()
print('Config written:', out.read().decode().strip())

# Test and reload
for cmd in ['sudo nginx -t 2>&1', 'sudo systemctl reload nginx 2>&1']:
    stdin, out, err = c.exec_command(cmd)
    print(f'{cmd}: {out.read().decode().strip()}')

# Quick test
import time
time.sleep(2)
stdin, out, err = c.exec_command('curl -sI http://127.0.0.1 2>&1 | head -5')
print('\nHTTP test (local):')
print(out.read().decode())

c.close()
print('\nDone! Fixed nginx config and reloaded.')

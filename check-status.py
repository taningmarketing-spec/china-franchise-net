import paramiko, sys
sys.stdout.reconfigure(encoding='utf-8', errors='replace')

client = paramiko.SSHClient()
client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
client.connect('124.156.140.166', username='ubuntu', password='Taning@2026!', timeout=15)

cmds = [
    ('Setup Script Log', 'tail -40 /tmp/setup-domain.log 2>/dev/null || echo NO_LOG'),
    ('Running Processes', 'ps aux | grep -E "certbot|setup-domain|apt" | grep -v grep || echo NONE'),
    ('Nginx Status', 'sudo nginx -t 2>&1 && sudo systemctl status nginx --no-pager 2>&1 | head -10'),
    ('PM2 Status', 'pm2 list 2>&1'),
    ('SSL Cert', 'ls -la /etc/letsencrypt/live/cnfranchise.com/ 2>&1 || echo NO_SSL_CERT'),
    ('Local curl', 'curl -sI http://127.0.0.1:3000 2>&1 | head -5'),
    ('Nginx config', 'cat /etc/nginx/sites-available/cnfranchise 2>/dev/null || echo NO_CONFIG'),
]

for label, cmd in cmds:
    print(f'\n=== {label} ===')
    stdin, stdout, stderr = client.exec_command(cmd)
    out = stdout.read().decode('utf-8', errors='replace')
    err = stderr.read().decode('utf-8', errors='replace')
    if out: print(out)
    if err: print('ERR:', err)

client.close()

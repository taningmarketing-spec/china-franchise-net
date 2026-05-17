import paramiko, sys
sys.stdout.reconfigure(encoding='utf-8', errors='replace')

client = paramiko.SSHClient()
client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
client.connect('124.156.140.166', username='ubuntu', password='Taning@2026!', timeout=15)

# 1. Restart PM2/Next.js
print('=== Restarting Next.js ===')
cmds = [
    'cd /home/ubuntu/china-franchise-net && pm2 delete cnfranchise 2>/dev/null; pm2 start npm --name cnfranchise -- start 2>&1',
    'pm2 save 2>&1',
    'sleep 3 && pm2 list 2>&1',
]
for cmd in cmds:
    stdin, stdout, stderr = client.exec_command(cmd)
    print(stdout.read().decode('utf-8', errors='replace'))

# 2. Test local access
print('\n=== Test Local Access ===')
stdin, stdout, stderr = client.exec_command('curl -sI http://127.0.0.1:3000 2>&1 | head -10')
print(stdout.read().decode('utf-8', errors='replace'))

# 3. Test via Nginx (HTTP)
print('\n=== Test Nginx HTTP ===')
stdin, stdout, stderr = client.exec_command('curl -sI http://cnfranchise.com 2>&1 | head -10')
print(stdout.read().decode('utf-8', errors='replace'))

# 4. Test via Nginx (HTTPS)
print('\n=== Test Nginx HTTPS ===')
stdin, stdout, stderr = client.exec_command('curl -skI https://cnfranchise.com 2>&1 | head -10')
print(stdout.read().decode('utf-8', errors='replace'))

# 5. Check if port 443 is listening
print('\n=== Listening Ports ===')
stdin, stdout, stderr = client.exec_command('sudo ss -tlnp | grep -E ":80|:443|:3000"')
print(stdout.read().decode('utf-8', errors='replace') or 'NO_PORTS')

client.close()

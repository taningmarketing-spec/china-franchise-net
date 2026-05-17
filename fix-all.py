import paramiko, sys
sys.stdout.reconfigure(encoding='utf-8', errors='replace')

c = paramiko.SSHClient()
c.set_missing_host_key_policy(paramiko.AutoAddPolicy())
c.connect('124.156.140.166', username='ubuntu', password='Taning@2026!', timeout=15)

cmds = [
    'pkill -f "next start" 2>&1; pkill -9 -f "node.*next" 2>&1; sleep 1; fuser -k 3000/tcp 2>&1; echo DONE_KILL',
    'ss -tlnp | grep 3000 || echo PORT_FREE',
    'pm2 delete cnfranchise 2>/dev/null; pm2 flush 2>/dev/null',
    'cd /home/ubuntu/china-franchise-net && pm2 start npm --name cnfranchise -- start 2>&1 | tail -5',
    'sleep 6 && pm2 list 2>&1',
    'curl -sI http://127.0.0.1:3000 2>&1 | head -5',
    'sudo ufw status 2>/dev/null || echo NO_UFW',
    'sudo ss -tlnp | grep -E "80|443|3000"',
]

for cmd in cmds:
    print(f'\n>>> {cmd[:60]}')
    stdin, out, err = c.exec_command(cmd)
    o = out.read().decode('utf-8', errors='replace')
    e = err.read().decode('utf-8', errors='replace')
    if o: print(o.strip())
    if e: print('ERR:', e.strip())

c.close()

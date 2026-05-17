import paramiko, sys, time
sys.stdout.reconfigure(encoding='utf-8', errors='replace')

client = paramiko.SSHClient()
client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
client.connect('124.156.140.166', username='ubuntu', password='Taning@2026!', timeout=15)

cmds = [
    'cd /home/ubuntu/china-franchise-net && npx prisma generate 2>&1 | tail -5',
    'cd /home/ubuntu/china-franchise-net && npx prisma db push --accept-data-loss 2>&1 | tail -10',
    'echo ===DB_DONE===',
]

for cmd in cmds:
    print(f'\n>>> {cmd}')
    stdin, stdout, stderr = client.exec_command(cmd)
    out = stdout.read().decode('utf-8', errors='replace')
    err = stderr.read().decode('utf-8', errors='replace')
    if out: print(out)
    if err: print('STDERR:', err)

# Now rebuild
print('\n>>> Starting build...')
cmd = 'cd /home/ubuntu/china-franchise-net && rm -rf .next && nohup npm run build > /tmp/build.log 2>&1 & echo PID=$!'
stdin, stdout, stderr = client.exec_command(cmd)
print(stdout.read().decode('utf-8', errors='replace').strip())

client.close()

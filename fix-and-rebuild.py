import paramiko, sys
sys.stdout.reconfigure(encoding='utf-8', errors='replace')
client = paramiko.SSHClient()
client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
client.connect('124.156.140.166', username='ubuntu', password='Taning@2026!', timeout=15)

# Remove the bad file
stdin, stdout, stderr = client.exec_command('rm /home/ubuntu/china-franchise-net/app/admin/articles/[id]/page.tsx && echo DELETED_OK')
print('Delete:', stdout.read().decode('utf-8', errors='replace').strip())

# Rebuild
cmd = 'cd /home/ubuntu/china-franchise-net && rm -rf .next && nohup npm run build > /tmp/build.log 2>&1 & echo PID=$!'
stdin, stdout, stderr = client.exec_command(cmd)
print('Rebuild:', stdout.read().decode('utf-8', errors='replace').strip())
client.close()

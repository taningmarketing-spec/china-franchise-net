import paramiko

ssh = paramiko.SSHClient()
ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
ssh.connect('124.156.140.166', username='ubuntu', password='Taning@2026!', timeout=15)

# 查看schema中所有model
stdin, stdout, stderr = ssh.exec_command('cd /home/ubuntu/china-franchise-net && grep "^model " prisma/schema.prisma', timeout=10)
print('=== ALL MODELS ===')
print(stdout.read().decode('utf-8', errors='replace'))

# 查看article相关model
stdin, stdout, stderr = ssh.exec_command('cd /home/ubuntu/china-franchise-net && grep -B1 -A 50 "model Article" prisma/schema.prisma', timeout=10)
print('=== ARTICLE MODEL ===')
print(stdout.read().decode('utf-8', errors='replace'))

ssh.close()

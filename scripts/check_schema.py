import paramiko
import json

ssh = paramiko.SSHClient()
ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
ssh.connect('124.156.140.166', username='ubuntu', password='Taning@2026!', timeout=15)

# 1. 查看AcademyArticle模型结构
cmds = [
    'cd /home/ubuntu/china-franchise-net && grep -A 50 "model Academy" prisma/schema.prisma',
]

for cmd in cmds:
    stdin, stdout, stderr = ssh.exec_command(cmd, timeout=15)
    out = stdout.read().decode('utf-8', errors='replace')
    err = stderr.read().decode('utf-8', errors='replace')
    print(f'=== CMD: {cmd[:60]} ===')
    print(out)
    if err:
        print(f'STDERR: {err}')

# 2. 用node脚本查看现有文章样例
node_script = '''
const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();
async function main() {
  const article = await p.academyArticle.findFirst({ orderBy: { createdAt: 'desc' } });
  console.log(JSON.stringify(article, null, 2));
}
main().finally(() => p.$disconnect());
'''

sftp = ssh.open_sftp()
with sftp.file('/tmp/check_article.js', 'w') as f:
    f.write(node_script)
sftp.close()

stdin, stdout, stderr = ssh.exec_command('cd /home/ubuntu/china-franchise-net && NODE_PATH=./node_modules node /tmp/check_article.js', timeout=20)
print('=== SAMPLE ARTICLE ===')
print(stdout.read().decode('utf-8', errors='replace'))
print(stderr.read().decode('utf-8', errors='replace'))

ssh.close()

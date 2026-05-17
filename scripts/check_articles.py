import paramiko
import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

ssh = paramiko.SSHClient()
ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
ssh.connect('124.156.140.166', username='ubuntu', password='Taning@2026!', timeout=15)

node_script = '''
const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();
async function main() {
  const articles = await p.article.findMany({
    where: { category: 'overseas-dynamic', locale: 'zh' },
    orderBy: { createdAt: 'desc' },
    take: 2
  });
  console.log('=== SAMPLE ===');
  articles.forEach(a => {
    const obj = { 
      id: a.id, title: a.title, slug: a.slug, category: a.category,
      locale: a.locale, status: a.status, featuredImg: a.featuredImg,
      excerpt: a.excerpt, contentLen: a.content ? a.content.length : 0,
      publishedAt: a.publishedAt, sortOrder: a.sortOrder
    };
    console.log(JSON.stringify(obj));
  });
}
main().finally(() => p.$disconnect());
'''

sftp = ssh.open_sftp()
with sftp.file('/tmp/check_article.js', 'w') as f:
    f.write(node_script)
sftp.close()

stdin, stdout, stderr = ssh.exec_command('cd /home/ubuntu/china-franchise-net && NODE_PATH=./node_modules node /tmp/check_article.js', timeout=20)
out = stdout.read().decode('utf-8', errors='replace')
err = stderr.read().decode('utf-8', errors='replace')
print(out)
if err.strip():
    print('STDERR:', err)

ssh.close()

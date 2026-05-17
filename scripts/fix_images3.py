import paramiko
import sys

sys.stdout.reconfigure(encoding='utf-8')

ssh = paramiko.SSHClient()
ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
ssh.connect('124.156.140.166', username='ubuntu', password='Taning@2026!', timeout=15)

# 使用已验证可用的Unsplash ID + 备用图床
cmds = r'''
cd /home/ubuntu/china-franchise-net/public/uploads/news/
rm -f tea-overseas-1.jpg tea-overseas-2.jpg

# 图片1: 茶饮店 (使用已确认可用的Unsplash ID)
curl -sL -o tea-overseas-1.jpg "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=800&h=450&fit=crop&q=80" && echo "IMG1: $(wc -c < tea-overseas-1.jpg) bytes"

# 图片2: 东南亚/商业街景
curl -sL -o tea-overseas-2.jpg "https://images.unsplash.com/photo-1507699622108-4be3abd695ad?w=800&h=450&fit=crop&q=80" && echo "IMG2: $(wc -c < tea-overseas-2.jpg) bytes"

echo "---"
ls -la *.jpg
file tea-overseas-*.jpg
'''

stdin, stdout, stderr = ssh.exec_command(cmds, timeout=30)
print(stdout.read().decode('utf-8', errors='replace'))
print(stderr.read().decode('utf-8', errors='replace'))

ssh.close()

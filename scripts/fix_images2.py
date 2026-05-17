import paramiko
import sys

sys.stdout.reconfigure(encoding='utf-8')

ssh = paramiko.SSHClient()
ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
ssh.connect('124.156.140.166', username='ubuntu', password='Taning@2026!', timeout=15)

# 使用Unsplash直接下载链接（不同格式）
cmds = r'''
cd /home/ubuntu/china-franchise-net/public/uploads/news/

# 删除失败的HTML文件
rm -f tea-overseas-1.jpg tea-overseas-2.jpg

# 图片1: 奶茶店 (直接source.unsplash.com)
curl -sL -A "Mozilla/5.0" -o tea-overseas-1.jpg "https://images.unsplash.com/photo-1558857569-b0d4e7cc7a84?w=800&h=450&fit=crop&q=80" 2>&1 | tail -1

# 检查大小和类型
echo "---"
ls -la tea-overseas-1.jpg
file tea-overseas-1.jpg

# 如果还是HTML，换另一个方式
head -c 100 tea-overseas-1.jpg | cat -v
'''

stdin, stdout, stderr = ssh.exec_command(cmds, timeout=20)
print(stdout.read().decode('utf-8', errors='replace'))
print(stderr.read().decode('utf-8', errors='replace'))

ssh.close()

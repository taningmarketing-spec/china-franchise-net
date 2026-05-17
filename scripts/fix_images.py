import paramiko
import sys

sys.stdout.reconfigure(encoding='utf-8')

ssh = paramiko.SSHClient()
ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
ssh.connect('124.156.140.166', username='ubuntu', password='Taning@2026!', timeout=15)

# 重新下载图片1和2，使用-L跟随重定向
cmds = '''
cd /home/ubuntu/china-franchise-net/public/uploads/news/

# 删除失败的文件
rm -f tea-overseas-1.jpg tea-overseas-2.jpg

# 用 -L 跟随重定向下载
curl -sL -o tea-overseas-1.jpg "https://images.unsplash.com/photo-1558857569-b0d4e7cc7a84?w=800&h=450&fit=crop&q=80" && echo "IMG1: $(wc -c < tea-overseas-1.jpg) bytes"
curl -sL -o tea-overseas-2.jpg "https://images.unsplash.com/photo-1559564366-8a6fa5d7b2e3?w=800&h=450&fit=crop&q=80" && echo "IMG2: $(wc -c < tea-overseas-2.jpg) bytes"

# 检查所有3张图
ls -la *.jpg

# 验证是否为有效JPEG (检查magic bytes)
file tea-overseas-*.jpg
'''

stdin, stdout, stderr = ssh.exec_command(cmds, timeout=30)
print(stdout.read().decode('utf-8', errors='replace'))
print(stderr.read().decode('utf-8', errors='replace'))

ssh.close()

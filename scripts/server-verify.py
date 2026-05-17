import paramiko

host = '124.156.140.166'
port = 22
username = 'ubuntu'
password = 'Taning@2026!'

verify_script = r"""
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const brand = await prisma.brand.findUnique({ where: { slug: 'taning-lemon-tea' } });
  if (!brand) { console.log('NOT FOUND'); return; }
  console.log('NAME:', brand.name);
  console.log('STORY_LEN:', brand.brandStory ? brand.brandStory.length : 0);
  console.log('FEATURES_LEN:', brand.brandFeatures ? brand.brandFeatures.length : 0);
  console.log('PROCESS:', brand.process);
  console.log('SUPPORT_LEN:', brand.support ? JSON.parse(brand.support).length : 0);
  console.log('STORES_CN:', brand.storesChina);
  console.log('STORES_OV:', brand.storesOverseas);
  console.log('INDUSTRY:', brand.industry);
  console.log('DESC_LEN:', brand.description ? brand.description.length : 0);
  console.log('HIGHLIGHTS:', brand.highlights);
}

main().catch(e => { console.error('ERROR:', e.message); process.exit(1); }).finally(() => prisma.$disconnect());
"""

ssh = paramiko.SSHClient()
ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
ssh.connect(host, port=port, username=username, password=password)
print('Connected')

sftp = ssh.open_sftp()
with sftp.open('/home/ubuntu/china-franchise-net/scripts/verify-taning.js', 'w', bufsize=-1) as f:
    f.write(verify_script.strip())
sftp.close()
print('Verify script uploaded')

stdin, stdout, stderr = ssh.exec_command(
    'cd /home/ubuntu/china-franchise-net && NODE_PATH=./node_modules node scripts/verify-taning.js 2>&1'
)
stdout_bytes = stdout.read()
stderr_bytes = stderr.read()

# Write output to a file
with open('C:/Users/LEO/.qclaw/workspace/china-franchise-net/scripts/server-output.txt', 'wb') as f:
    f.write(stdout_bytes)
    if stderr_bytes:
        f.write(b'\n=== STDERR ===\n')
        f.write(stderr_bytes)

print('Output written to server-output.txt')
print('Size:', len(stdout_bytes), 'bytes')

ssh.close()

import paramiko
import os

host = '124.156.140.166'
port = 22
username = 'ubuntu'
password = 'Taning@2026!'

# Build the script content as a Python string to avoid escaping issues
script_content = r"""
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const slug = 'taning-lemon-tea';
  const brand = await prisma.brand.findUnique({ where: { slug } });
  if (!brand) { console.log('Brand not found:', slug); return; }
  console.log('Found brand:', brand.name, '| ID:', brand.id);

  const updates = {
    brandStory: `2017年，挞柠（TANING）在广州江南新地开设了第一家手打柠檬茶专营店，将柠檬茶从传统茶饮店中独立出来，开创了柠檬茶专门店的先河。

"挞"（ta），是广东方言中"手打"的意思——每一杯挞柠柠檬茶，都经过人工捶打，将柠檬的香气与茶汤完美融合。

挞柠的创始团队深知，一杯好柠檬茶的关键在于茶叶。在潮州凤凰山，挞柠拥有自有的40亩茶园，采用原生态种植和传统制茶工艺，从采摘到烘焙全程严格把控。2018年，挞柠率先将凤凰单枞茶引入茶饮行业，创造出第一杯"鸭屎香柠檬茶"，从此引领行业风潮。

从广州出发，挞柠逐步走向全国乃至全球。2019年越南河内店开业，挞柠成为第一个走出国门的中国柠檬茶品牌；2020年进驻澳门；2021年在广州开设全球首间柠檬茶博物馆，同年进入泰国市场；此后相继进入英国、马来西亚、新加坡、美国、加拿大、澳大利亚、阿尔及利亚等市场。

2025年，挞柠继续以"手打柠檬蔬果茶"为品牌特色，不断从小众水果中汲取灵感，创新研发油柑、橄榄、黄皮等爆款饮品，引领茶饮行业的多元发展。`,

    brandFeatures: `【产品核心】
- 1+1+N 产品理念：柠檬 + 茶 + 果蔬，N系灵感，无限可能
- 选用4种不同品种柠檬，搭配6种精选茶叶
- 率先将凤凰单枞应用于茶饮行业，鸭屎香柠檬茶成为标志性爆款

【供应链优势】
- 潮州凤凰山自有40亩茶园，国内少数拥有自有茶园的茶饮品牌
- 自有果园与原物料工厂，全产业链布局
- 15年茶饮品牌运营经验，150人专业运营管理团队

【行业地位】
- 中国手打柠檬茶发明者 / 品类开创者
- 《中国手打柠檬茶团体标准》制定者（2021年）
- 《广东省重点保护商标》（2022年）

【全球化布局】
- 覆盖中国大陆、香港、澳门及美国、新加坡、泰国、英国、马来西亚、澳大利亚、加拿大、阿尔及利亚等国家和地区
- 全球9国68城1000+门店（截至2025年）`,

    highlights: '中国手打柠檬茶发明者 · 全产业链布局 · 9国68城1000+门店 · 凤凰单枞首创者 · 茶饮团体标准制定者',

    process: JSON.stringify([
      { step: 1, title: '提交申请', desc: '填写加盟表单或致电咨询，初步了解品牌与加盟政策' },
      { step: 2, title: '资质审核', desc: '总部评估申请人资质，确认合作意向与选址意向' },
      { step: 3, title: '实地考察', desc: '参观总部、样板店，实地了解产品、运营与支持体系' },
      { step: 4, title: '签约付款', desc: '签订特许经营合同，支付相关费用，确认合作区域' },
      { step: 5, title: '门店筹建', desc: '选址评估、装修设计、设备采购、人员招聘与培训' },
      { step: 6, title: '开业运营', desc: '总部驻店指导，正式开业，持续运营支持与产品更新' },
    ]),

    support: JSON.stringify([
      '选址评估与商圈分析支持',
      '统一SI形象与装修设计支持',
      '设备采购与原物料供应链',
      '技术培训（产品制作/运营管理）',
      '开业驻店指导',
      '营销推广与活动策划支持',
      '新品研发与菜单更新',
      '运营督导定期巡店',
      '信息化管理系统支持',
      '全年客服热线服务',
    ]),

    storesChina: 800,
    storesOverseas: 9,
    description: '挞柠（TANING）是中国手打柠檬茶品类的开创者，2017年创立于广州，选用4种柠檬搭配6种茶叶，自有茶园与全产业链布局。目前全球9国68城开设1000+门店，是第一个走出国门的中国柠檬茶品牌。',
    industry: '茶饮',
  };

  const updated = await prisma.brand.update({ where: { slug }, data: updates });
  console.log('✅ Update successful!');
  console.log('Brand:', updated.name);
  console.log('Story length:', updated.brandStory ? updated.brandStory.length : 0);
  console.log('Features length:', updated.brandFeatures ? updated.brandFeatures.length : 0);
  const proc = JSON.parse(updated.process || '[]');
  const supp = JSON.parse(updated.support || '[]');
  console.log('Process steps:', proc.length);
  console.log('Support items:', supp.length);
}

main().catch(console.error).finally(() => prisma.$disconnect());
"""

ssh = paramiko.SSHClient()
ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
ssh.connect(host, port=port, username=username, password=password)
print('Connected to server')

# Write script to server
sftp = ssh.open_sftp()
with sftp.open('/home/ubuntu/china-franchise-net/scripts/update-taning.js', 'w', bufsize=-1) as f:
    f.write(script_content.strip())
sftp.close()
print('Script uploaded to server')

# Run it
stdin, stdout, stderr = ssh.exec_command(
    'cd /home/ubuntu/china-franchise-net && NODE_PATH=./node_modules node scripts/update-taning.js'
)
stdout_text = stdout.read().decode('utf-8', errors='replace')
stderr_text = stderr.read().decode('utf-8', errors='replace')
safe_stdout = stdout_text.encode('utf-8', errors='replace').decode('utf-8', errors='replace')
safe_stderr = stderr_text.encode('utf-8', errors='replace').decode('utf-8', errors='replace')
try:
    print('STDOUT:', safe_stdout)
except UnicodeEncodeError:
    print('STDOUT: [contains non-GBK chars - see server]')
try:
    if safe_stderr:
        print('STDERR:', safe_stderr[:200])
except UnicodeEncodeError:
    print('STDERR: [contains non-GBK chars]')

ssh.close()
print('Done')

#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
检查海外加盟动态栏目文章状态 - 修复版
"""
import paramiko
import sys

# 解决Windows控制台编码问题
sys.stdout.reconfigure(encoding='utf-8')
sys.stderr.reconfigure(encoding='utf-8')

# 服务器信息
HOST = '124.156.140.166'
USER = 'ubuntu'
PASSWORD = 'Taning@2026!'
PROJECT_PATH = '/home/ubuntu/china-franchise-net'

def check_articles():
    ssh = paramiko.SSHClient()
    ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    
    try:
        print("🔗 正在连接服务器...")
        ssh.connect(HOST, username=USER, password=PASSWORD, timeout=15, allow_agent=False, look_for_keys=False)
        print("✅ SSH 连接成功\n")
        
        # 创建 Node.js 脚本来查询数据库
        node_script = r"""
const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();

async function main() {
  const articles = await p.article.findMany({
    where: {
      category: 'overseas-dynamic'
    },
    orderBy: [
      { sortOrder: 'desc' },
      { publishedAt: 'desc' },
      { createdAt: 'desc' }
    ]
  });
  
  console.log('=== 海外加盟动态文章列表 ===');
  console.log('共 ' + articles.length + ' 篇文章');
  console.log('');
  
  articles.forEach((article, index) => {
    const title = article.title.length > 40 ? article.title.substring(0, 40) + '...' : article.title;
    console.log((index + 1) + '. [' + article.locale + '] ' + title);
    console.log('   sortOrder: ' + article.sortOrder);
    console.log('   publishedAt: ' + (article.publishedAt ? article.publishedAt.toISOString() : 'null'));
    console.log('   createdAt: ' + article.createdAt.toISOString());
    console.log('   status: ' + article.status);
    console.log('');
  });
  
  // 特别检查新文章
  const newArticle = articles.find(a => a.slug && a.slug.includes('china-tea-brands-go-global'));
  if (newArticle) {
    console.log('=== 新文章状态 ===');
    console.log('找到新文章: ' + newArticle.title);
    console.log('sortOrder: ' + newArticle.sortOrder);
    console.log('publishedAt: ' + (newArticle.publishedAt ? newArticle.publishedAt.toISOString() : 'null'));
    console.log('');
    console.log('建议: 设置 sortOrder > 0 让文章排到前面');
  } else {
    console.log('未找到新文章 (slug 包含 "china-tea-brands-go-global")');
  }
}

main().catch(e => {
  console.error('错误:', e.message);
  process.exit(1);
}).finally(() => p.$disconnect());
"""
        
        # 将脚本写入服务器临时文件
        print("📝 正在创建查询脚本...")
        sftp = ssh.open_sftp()
        remote_script = '/tmp/check_articles.js'
        with sftp.file(remote_script, 'w') as f:
            f.write(node_script.encode('utf-8'))
        sftp.close()
        print("✅ 脚本已上传到服务器\n")
        
        # 执行脚本
        print("🔍 正在查询数据库...")
        stdin, stdout, stderr = ssh.exec_command(
            'cd ' + PROJECT_PATH + ' && NODE_PATH=./node_modules node ' + remote_script,
            timeout=30
        )
        
        output = stdout.read().decode('utf-8', errors='replace')
        error = stderr.read().decode('utf-8', errors='replace')
        
        if output.strip():
            print(output)
        
        if error.strip():
            print("⚠️ 错误输出:")
            print(error)
        
        ssh.close()
        print("\n✅ 检查完成")
        
    except Exception as e:
        print(f"❌ 错误: {e}")
        return 1
    
    return 0

if __name__ == '__main__':
    import sys
    sys.exit(check_articles())

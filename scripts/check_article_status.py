#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
检查海外加盟动态栏目文章的状态
"""
import paramiko
import json

# 服务器信息
HOST = '124.156.140.166'
USER = 'ubuntu'
PASSWORD = 'Taning@2026!'
PROJECT_PATH = '/home/ubuntu/china-franchise-net'

def check_articles():
    ssh = paramiko.SSHClient()
    ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    
    try:
        ssh.connect(HOST, username=USER, password=PASSWORD, timeout=10)
        print("✅ SSH 连接成功")
        
        # 创建 Node.js 脚本来查询数据库
        node_script = """
const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();

async function main() {
  // 查询所有海外加盟动态文章，按 sortOrder 和 publishedAt 排序
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
  console.log('共', articles.length, '篇文章');
  console.log();
  
  articles.forEach((article, index) => {
    console.log(`${index + 1}. [${article.locale}] ${article.title}`);
    console.log(`   slug: ${article.slug}`);
    console.log(`   sortOrder: ${article.sortOrder}`);
    console.log(`   publishedAt: ${article.publishedAt}`);
    console.log(`   createdAt: ${article.createdAt}`);
    console.log(`   status: ${article.status}`);
    console.log();
  });
  
  // 特别检查新文章
  const newArticle = articles.find(a => a.slug.includes('china-tea-brands-go-global'));
  if (newArticle) {
    console.log('=== 新文章状态 ===');
    console.log('标题:', newArticle.title);
    console.log('sortOrder:', newArticle.sortOrder);
    console.log('publishedAt:', newArticle.publishedAt);
    console.log('建议在排序时设置 sortOrder > 0');
  }
}

main().finally(() => p.$disconnect());
"""
        
        # 将脚本写入服务器临时文件
        sftp = ssh.open_sftp()
        remote_script = '/tmp/check_articles.js'
        with sftp.file(remote_script, 'w') as f:
            f.write(node_script.encode('utf-8'))
        sftp.close()
        
        # 执行脚本
        print("📋 查询数据库文章状态...")
        stdin, stdout, stderr = ssh.exec_command(
            f'cd {PROJECT_PATH} && NODE_PATH=./node_modules node {remote_script}',
            timeout=30
        )
        
        output = stdout.read().decode('utf-8', errors='replace')
        error = stderr.read().decode('utf-8', errors='replace')
        
        if output:
            print(output)
        
        if error:
            print("错误:", error)
        
        ssh.close()
        
    except Exception as e:
        print(f"❌ 错误: {e}")

if __name__ == '__main__':
    check_articles()

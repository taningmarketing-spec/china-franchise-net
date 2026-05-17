# 中国国际加盟网 - 一键启动脚本
# 用法：在 PowerShell 或 cmd 中运行本脚本

$ErrorActionPreference = "Stop"
$PROJECT = "C:\Users\LEO\.qclaw\workspace\china-franchise-net"

Write-Host "🗑️  清理旧依赖..." -ForegroundColor Yellow
Remove-Item "$PROJECT\node_modules" -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item "$PROJECT\package-lock.json" -Force -ErrorAction SilentlyContinue

Write-Host "📦 重新安装依赖..." -ForegroundColor Yellow
Set-Location $PROJECT
npm install --prefer-offline

Write-Host "🔧 生成 Prisma 客户端..." -ForegroundColor Yellow
npx prisma generate

Write-Host "🗄️  推送数据库 Schema..." -ForegroundColor Yellow
npx prisma db push

Write-Host "🌱 初始化种子数据..." -ForegroundColor Yellow
npx ts-node --compiler-options '{"module":"CommonJS"}' prisma/seed.ts

Write-Host ""
Write-Host "✅ 初始化完成！" -ForegroundColor Green
Write-Host ""
Write-Host "🚀 启动开发服务器：" -ForegroundColor Cyan
Write-Host "   npm run dev" -ForegroundColor White
Write-Host ""
Write-Host "🌐 访问地址：" -ForegroundColor Cyan
Write-Host "   前台:  http://localhost:3000" -ForegroundColor White
Write-Host "   后台:  http://localhost:3000/admin" -ForegroundColor White
Write-Host "   账号:  admin  /  密码: admin123" -ForegroundColor White
#!/bin/bash
# ============================================================
#  cnfranchise.com 一键部署脚本
#  腾讯云轻量服务器 | Ubuntu 24.04 | 2核4GB
#  用法: bash deploy.sh
# ============================================================

set -e
export DEBIAN_FRONTEND=noninteractive

# ---- 颜色输出 ----
RED='\033[0;31m'; GREEN='\033[0;32m'; YELLOW='\033[1;33m'; BLUE='\033[0;34m'; NC='\033[0m'
log() { echo -e "${GREEN}[✓]${NC} $1"; }
warn() { echo -e "${YELLOW}[!]${NC} $1"; }
err() { echo -e "${RED}[✗]${NC} $1"; }

echo -e "\n${BLUE}=========================================${NC}"
echo -e "${BLUE}   cnfranchise.com 一键部署脚本${NC}"
echo -e "${BLUE}=========================================${NC}\n"

# ---- 第 0 步：检查 root 权限 ----
if [ "$EUID" -ne 0 ]; then
    err "请用 sudo 或 root 用户运行此脚本"
    exit 1
fi

# ---- 第 1 步：系统更新 + 基础工具 ----
echo -e "\n${BLUE}[1/8] 系统更新 & 安装基础工具...${NC}"
apt-get update -y && apt-get upgrade -y
apt-get install -y curl wget git unzip software-properties-common build-essential ufw

# ---- 第 2 步：安装 Node.js 22 LTS ----
echo -e "\n${BLUE}[2/8] 安装 Node.js 22 LTS...${NC}"
if command -v node &>/dev/null; then
    warn "Node.js 已安装: $(node --version)"
else
    curl -fsSL https://deb.nodesource.com/setup_22.x | bash -
    apt-get install -y nodejs
    log "Node.js $(node --version) 安装完成"
fi
if ! command -v npm &>/dev/null; then
    apt-get install -y npm
fi
log "NPM $(npm --version)"

# ---- 第 3 步：安装 PM2 ----
echo -e "\n${BLUE}[3/8] 安装 PM2 进程管理器...${NC}"
npm install -g pm2
# 设置 PM2 开机自启
pm2 startup systemd -u ubuntu --hp /home/ubuntu 2>/dev/null || true
env PATH=$PATH:/usr/bin pm2 save || true
log "PM2 $(pm2 --version) 安装完成"

# ---- 第 4 步：安装 Nginx + Let's Encrypt ----
echo -e "\n${BLUE}[4/8] 安装 Nginx...${NC}"
apt-get install -y nginx certbot python3-certbot-nginx
log "Nginx 安装完成"

# 配置防火墙
ufw allow OpenSSH
ufw allow 'Nginx Full'
ufw --force enable
log "防火墙已配置 (SSH + HTTP/HTTPS)"

# ---- 第 5 步：克隆项目代码 ----
echo -e "\n${BLUE}[5/8] 克隆项目代码...${NC}"
cd /home/ubuntu
if [ -d "china-franchise-net" ]; then
    warn "项目目录已存在，更新中..."
    cd china-franchise-net
    git pull origin main
else
    git clone https://github.com/weimanduo/china-franchise-net.git
    cd china-franchise-net
fi
log "项目代码就绪"

# ---- 第 6 步：安装依赖 & 构建 ----
echo -e "\n${BLUE}[6/8] 安装 NPM 依赖 & 构建...${NC}"
npm ci --production=false  # 包含 devDependencies（需要构建）
log "NPM 依赖安装完成"

# 创建 .env 文件（如果不存在）
if [ ! -f ".env" ]; then
    cat > .env << 'ENVEOF'
NODE_ENV=production
JWT_SECRET=$(openssl rand -base64 32)
ADMIN_PASSWORD=CnfAdmin@2026!
DATABASE_URL="file:./dev.db"
PORT=3000
ENVEOF
    log ".env 文件已创建（随机 JWT_SECRET）"
else
    warn ".env 文件已存在，跳过创建"
fi

# Next.js 构建
log "开始 Next.js 构建..."
npm run build
log "Next.js 构建成功！"

# ---- 第 7 步：配置 Nginx 反向代理 ----
echo -e "\n${BLUE}[7/8] 配置 Nginx 反向代理...${NC}"
cat > /etc/nginx/sites-available/cnfranchise << 'NGINXEOF'
server {
    listen 80;
    server_name cnfranchise.com www.cnfranchise.com;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        # 静态资源缓存
        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
            proxy_pass http://127.0.0.1:3000;
            expires 30d;
            add_header Cache-Control "public, immutable";
        }
    }
}
NGINXEOF

ln -sf /etc/nginx/sites-available/cnfranchise /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default
nginx -t && systemctl reload nginx
log "Nginx 配置完成"

# ---- 第 8 步：启动应用 ----
echo -e "\n${BLUE}[8/8] 启动 Next.js 应用...${NC}"
pm2 delete cnfranchise 2>/dev/null || true
pm2 start npm --name "cnfranchise" -- start
pm2 save
log "PM2 应用已启动 (cnfranchise)"

# ---- 完成！----
echo ""
echo -e "${GREEN}=========================================${NC}"
echo -e "${GREEN}   🎉 部署完成！${NC}"
echo -e "${GREEN}=========================================${NC}"
echo ""
echo -e "  🌐 访问地址: http://$(curl -s ifconfig.me)"
echo -e "  📊 PM2 状态: pm2 status"
echo -e "  📋 查看日志: pm2 logs cnfranchise"
echo -e "  🔧 重启应用: pm2 restart cnfranchise"
echo ""
echo -e "  ${YELLOW}⚠️  下一步操作:${NC}"
echo -e "  1. 将域名 cnfranchise.com 的 DNS A 记录指向本机 IP"
echo -e "  2. DNS 生效后运行以下命令申请 HTTPS 证书:"
echo -e "     ${BLUE}certbot --nginx -d cnfranchise.com -d www.cnfranchise.com${NC}"
echo ""

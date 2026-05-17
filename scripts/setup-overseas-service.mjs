import initSqlJs from 'sql.js';
import fs from 'fs';

const SQL = await initSqlJs();

// Load existing database
let db;
if (fs.existsSync('./prisma/dev.db')) {
  const fileBuffer = fs.readFileSync('./prisma/dev.db');
  db = new SQL.Database(fileBuffer);
  console.log('Loaded existing database');
} else {
  db = new SQL.Database();
  console.log('Created new database');
}

// Create table manually (no DEFAULT for id - we'll provide it)
try {
  db.run(`CREATE TABLE IF NOT EXISTS OverseasService (
    id TEXT PRIMARY KEY,
    serviceId TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    icon TEXT,
    description TEXT,
    content TEXT,
    sortOrder INTEGER DEFAULT 0,
    status TEXT DEFAULT 'active',
    createdAt TEXT DEFAULT (datetime('now')),
    updatedAt TEXT DEFAULT (datetime('now'))
  )`);
  console.log('OverseasService table ready');
} catch (e) {
  console.log('Table may already exist:', e.message);
}

function generateId() {
  const chars = 'abcdef0123456789';
  let id = '';
  for (let i = 0; i < 24; i++) id += chars[Math.floor(Math.random() * chars.length)];
  return id;
}

// Seed initial data
const services = [
  { serviceId: 'legal', name: '海外市场法务咨询', icon: '/images/services/legal.png', description: '专业律师团队，覆盖东南亚主要市场，提供合同审查、劳动法咨询、知识产权保护等全方位法务支持', sortOrder: 1 },
  { serviceId: 'ip', name: '海外商标与专利注册', icon: '/images/services/ip.png', description: '一站式国际商标、专利申请服务，覆盖泰国、越南、印尼、马来西亚等主要市场，守护品牌海外资产', sortOrder: 2 },
  { serviceId: 'logistics', name: '跨境物流与供应链', icon: '/images/services/logistics.png', description: '整合优质跨境物流资源，提供仓储、配送、清关一体化解决方案，降低供应链成本', sortOrder: 3 },
  { serviceId: 'hr', name: '海外人才招聘与派遣', icon: '/images/services/hr.png', description: '覆盖东南亚的本地人才网络，提供招聘、签证、劳务派遣等一站式人力资源服务', sortOrder: 4 },
  { serviceId: 'finance', name: '跨境支付与结算', icon: '/images/services/finance.png', description: '安全高效的跨境资金管理，支持多币种结算，降低汇率风险，保障资金安全', sortOrder: 5 },
  { serviceId: 'payment', name: '海外支付系统接入', icon: '/images/services/payment.png', description: '对接当地主流支付方式（PromptPay、VNPay、Momo等），提升本地用户支付体验', sortOrder: 6 },
  { serviceId: 'property', name: '海外选址与开店支持', icon: '/images/services/property.png', description: '专业团队协助海外选址、店铺装修、设备采购，确保门店符合当地标准快速落地', sortOrder: 7 },
  { serviceId: 'pr', name: '品牌本地化与公关', icon: '/images/services/pr.png', description: '品牌语言文化本地化，社媒运营，本地媒体关系维护，打造有温度的海外品牌形象', sortOrder: 8 },
  { serviceId: 'exhibition', name: '展会与商务对接', icon: '/images/services/exhibition.png', description: '组织参加国际餐饮展会，一对一商务对接会，精准匹配优质加盟商与合作伙伴', sortOrder: 9 },
  { serviceId: 'aftersales', name: '海外售后与维保', icon: '/images/services/aftersales.png', description: '建立完善的海外售后网络，提供设备维护、备件供应、技术支持，保障门店持续运营', sortOrder: 10 },
];

for (const s of services) {
  try {
    const id = generateId();
    const now = new Date().toISOString();
    db.run(`INSERT OR REPLACE INTO OverseasService (id, serviceId, name, icon, description, sortOrder, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [id, s.serviceId, s.name, s.icon, s.description, s.sortOrder, now, now]);
    console.log(`Seeded: ${s.serviceId}`);
  } catch (e) {
    console.log(`Error seeding ${s.serviceId}:`, e.message);
  }
}

// Verify count
const result = db.exec("SELECT COUNT(*) as cnt FROM OverseasService");
console.log('Final services count:', result[0].values[0][0]);

// Export db
const data = db.export();
fs.writeFileSync('./prisma/dev.db', Buffer.from(data));
console.log('Database saved to prisma/dev.db');

db.close();
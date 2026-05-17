process.chdir('C:/Users/LEO/.qclaw/workspace/china-franchise-net');
const bcrypt = require('bcryptjs');
console.log('bcryptjs version:', require('./node_modules/bcryptjs/package.json').version);
console.log('main file:', require('./node_modules/bcryptjs/package.json').main);

const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();

// Test the exact flow from the API route
async function test() {
  try {
    const dbAdmin = await p.admin.findUnique({ where: { username: 'admin' } });
    console.log('DB admin found:', !!dbAdmin, dbAdmin ? dbAdmin.username : null);
    
    if (dbAdmin) {
      const valid = await bcrypt.compare('admin123', dbAdmin.password);
      console.log('bcrypt compare result:', valid);
    }
    
    // Test env fallback
    const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';
    console.log('env check:', 'admin' === ADMIN_USERNAME && 'admin123' === ADMIN_PASSWORD);
    
    await p.$disconnect();
    console.log('ALL OK');
  } catch(e) {
    console.error('ERROR:', e.message);
    console.error(e.stack);
  }
}

test();
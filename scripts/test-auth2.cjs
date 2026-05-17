const path = require('path');
process.chdir(path.join(__dirname, '..'));
const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();

async function test() {
  try {
    // Test 1: bcrypt compare
    const dbAdmin = await p.admin.findUnique({ where: { username: 'admin' } });
    console.log('DB admin:', dbAdmin ? dbAdmin.username : 'not found');
    if (dbAdmin) {
      const valid = await bcrypt.compare('admin123', dbAdmin.password);
      console.log('bcrypt compare:', valid);
    }
    
    // Test 2: leo password (sha256)
    const leoAdmin = await p.admin.findUnique({ where: { username: 'leo' } });
    if (leoAdmin) {
      const validLeo = await bcrypt.compare('admin123', leoAdmin.password);
      console.log('leo bcrypt compare:', validLeo);
      // try sha256
      const crypto = require('crypto');
      const sha256 = crypto.createHash('sha256').update('admin123').digest('hex');
      console.log('leo sha256 match:', leoAdmin.password === sha256);
    }
    
    await p.$disconnect();
    console.log('DONE');
  } catch(e) {
    console.error('ERROR:', e.message);
  }
}
test();
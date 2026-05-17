const fs = require('fs');
const path = 'C:/Users/LEO/.qclaw/workspace/china-franchise-net/prisma/schema.prisma';
let schema = fs.readFileSync(path, 'utf8');

if (!schema.includes('isHot')) {
  schema = schema.replace(
    '  status          String    @default("pending")',
    '  status          String    @default("pending")\n  isHot          Boolean  @default(false)'
  );
  fs.writeFileSync(path, schema);
  console.log('Schema updated: isHot field added');
} else {
  console.log('Already has isHot field');
}

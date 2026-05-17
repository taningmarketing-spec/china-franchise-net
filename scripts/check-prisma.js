var Prisma = require('@prisma/client');
var p = new Prisma.PrismaClient();
var schema = p.$dmmf;
var os = schema.modelList.find(function(m) { return m.name === 'OverseasService'; });
if (os) {
  console.log('Fields:', os.fields.map(function(f) { return f.name; }).join(', '));
} else {
  console.log('OverseasService not found');
}
p.$disconnect();
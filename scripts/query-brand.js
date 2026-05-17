const db = require('better-sqlite3')('./prisma/dev.db');
const r = db.prepare("SELECT slug, name, brandStory, brandFeatures, cooperationMode, contractYears, investmentAmount, brandAdvantage FROM Brand WHERE slug = 'taning-lemon-tea'").get();
console.log(JSON.stringify(r, null, 2));
db.close();

const fs = require('fs');
const path = 'C:/Users/LEO/.qclaw/workspace/china-franchise-net/app/admin/brands/page.tsx';
let content = fs.readFileSync(path, 'utf8');

// Add isHot fire badge in the table row
const oldBrandRow = `                        <div className="font-medium text-slate-800">{b.name}</div>
                        <div className="text-xs text-slate-400 mt-0.5">{b.slug}</div>`;

const newBrandRow = `                        <div className="font-medium text-slate-800 flex items-center gap-1.5">
                          {b.isHot && <span className="text-red-500 font-bold" title="火爆加盟项目">🔥</span>}
                          {b.name}
                        </div>
                        <div className="text-xs text-slate-400 mt-0.5">{b.slug}</div>`;

if (!content.includes('b.isHot && <span')) {
  content = content.replace(oldBrandRow, newBrandRow);
  fs.writeFileSync(path, content);
  console.log('OK - isHot badge added');
} else {
  console.log('Already has isHot badge');
}

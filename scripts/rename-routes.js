const fs = require('fs');
const path = require('path');

const dirs = [
  'app/admin/articles',
  'app/admin/faqs'
];

dirs.forEach(dir => {
  const idDir = path.join(dir, '[id]');
  const slugDir = path.join(dir, '[slug]');
  
  if (fs.existsSync(idDir) && !fs.existsSync(slugDir)) {
    try {
      fs.renameSync(idDir, slugDir);
      console.log('Renamed:', idDir, '->', slugDir);
    } catch (e) {
      console.log('Rename failed:', e.message);
    }
  } else if (fs.existsSync(slugDir)) {
    console.log('Already exists:', slugDir);
  } else {
    console.log('Not found:', idDir);
  }
});

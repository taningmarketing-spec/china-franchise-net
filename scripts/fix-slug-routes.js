const fs = require('fs');

function safeRenameDir(from, to, fileName) {
  if (fs.existsSync(from)) {
    if (!fs.existsSync(to)) {
      const srcFile = from + '/' + fileName;
      if (fs.existsSync(srcFile)) {
        const content = fs.readFileSync(srcFile);
        fs.mkdirSync(to, { recursive: true });
        fs.writeFileSync(to + '/' + fileName, content);
      } else {
        fs.mkdirSync(to, { recursive: true });
      }
      fs.rmSync(from, { recursive: true });
      console.log('OK: ' + from + ' -> ' + to);
    } else {
      console.log('SKIP: ' + to + ' already exists');
    }
  } else {
    console.log('MISSING: ' + from);
  }
}

function safeRenameFile(from, to) {
  if (fs.existsSync(from) && !fs.existsSync(to)) {
    fs.mkdirSync(to.replace(/[/\\][^/\\]+$/, ''), { recursive: true });
    fs.renameSync(from, to);
    console.log('OK file: ' + from + ' -> ' + to);
  } else if (fs.existsSync(from) && fs.existsSync(to)) {
    console.log('SKIP dest exists: ' + to);
  } else {
    console.log('MISSING: ' + from);
  }
}

// Fix articles admin: [slug]/page.tsx -> [id]/page.tsx
safeRenameDir('app/admin/articles/[slug]', 'app/admin/articles/[id]', 'page.tsx');

// Fix faqs admin: [slug]/page.tsx -> [id]/page.tsx
safeRenameDir('app/admin/faqs/[slug]', 'app/admin/faqs/[id]', 'page.tsx');

console.log('--- articles:', fs.readdirSync('app/api/articles'));
console.log('--- admin/articles:', fs.readdirSync('app/admin/articles'));
console.log('--- admin/faqs:', fs.readdirSync('app/admin/faqs'));
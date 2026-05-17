const http = require('http');
function fetch(path) {
  return new Promise((resolve, reject) => {
    http.get('http://127.0.0.1:3000' + path, r => {
      let d = '';
      r.on('data', c => d += c);
      r.on('end', () => resolve({ status: r.statusCode, len: d.length }));
    }).on('error', reject);
  });
}
async function main() {
  const routes = [
    // Front pages
    ['首页 zh', '/zh'],
    ['首页 en', '/en'],
    ['首页 th', '/th'],
    ['首页 vi', '/vi'],
    ['品牌列表', '/zh/brands'],
    ['品牌详情', '/zh/brand/taning-lemon-tea'],
    ['学院', '/zh/academy'],
    ['出海服务', '/zh/overseas-services'],
    ['招商页', '/zh/franchise'],
    ['加盟者页', '/zh/franchisee'],
    ['关于', '/zh/about'],
    // Admin pages
    ['后台登录', '/admin/login'],
    ['后台首页', '/admin/dashboard'],
    ['品牌管理', '/admin/brands'],
    ['出海服务', '/admin/overseas-services'],
    ['图文单页', '/admin/pages'],
    ['文章管理', '/admin/articles'],
    ['问答管理', '/admin/faqs'],
    ['用户管理', '/admin/users'],
    ['咨询管理', '/admin/inquiries'],
    ['设置', '/admin/settings'],
  ];
  for (const [name, path] of routes) {
    const r = await fetch(path);
    const ok = r.status === 200 || (path.startsWith('/admin/') && !path.includes('login') && r.status === 307);
    console.log(`${ok ? '✅' : '❌'} ${name}: ${r.status} (${r.len} bytes)`);
  }
}
main();

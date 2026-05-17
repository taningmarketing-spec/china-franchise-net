async function check() {
  const pages = ['/zh/brand/tanning-ningcc'];
  for (const p of pages) {
    try {
      const r = await fetch('http://localhost:3000' + p);
      const html = await r.text();
      console.log(`\n=== ${p} (status: ${r.status}, length: ${html.length}) ===`);
      
      if (html.includes('Application error') || html.includes('>500<') || html.includes('Internal Server Error')) {
        console.log('  ⚠️ Real error detected!');
      } else {
        console.log('  ✅ No server errors');
      }
      
      const checks = [
        ['Hero section', 'hero'],
        ['Brand cards', 'brand-card'],
        ['Categories', 'category'],
        ['Navigation', 'nav'],
        ['Footer', 'footer'],
        ['CMS content div', 'cms-content'],
        ['Floating contact', 'floating-contact'],
        ['Brand name', '挞柠'],
      ];
      
      for (const [name, marker] of checks) {
        const count = (html.match(new RegExp(marker, 'gi')) || []).length;
        if (count > 0) console.log(`  ${name}: ${count}`);
      }
      
      const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/);
      if (bodyMatch) {
        const text = bodyMatch[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
        console.log(`  Visible text sample (first 200): ${text.substring(0, 200)}`);
      }
    } catch (e) {
      console.log(`\n=== ${p} === ERROR: ${e.message}`);
    }
  }
}
check();

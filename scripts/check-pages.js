const pages = ['/zh', '/zh/franchise', '/zh/franchisee', '/zh/about'];

async function check() {
  for (const p of pages) {
    try {
      const r = await fetch('http://localhost:3000' + p);
      const html = await r.text();
      console.log(`\n=== ${p} (status: ${r.status}, length: ${html.length}) ===`);
      // Check for key CSS class markers
      const markers = ['franchise-hero', 'franchise-features', 'franchise-cta', 'tailwind', 'dangerouslySetInnerHTML'];
      for (const m of markers) {
        const count = (html.match(new RegExp(m, 'g')) || []).length;
        if (count > 0) console.log(`  ${m}: ${count} occurrences`);
      }
      // Check for any error indicators
      if (html.includes('Application error') || html.includes('500')) {
        console.log('  ⚠️ ERROR detected in page!');
      }
      // Get title
      const titleMatch = html.match(/<title>(.*?)<\/title>/);
      if (titleMatch) console.log(`  Title: ${titleMatch[1]}`);
    } catch (e) {
      console.log(`\n=== ${p} === ERROR: ${e.message}`);
    }
  }
}
check();

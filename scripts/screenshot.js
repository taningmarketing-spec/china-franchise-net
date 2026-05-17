const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

async function screenshot(url, filename) {
  const chromePaths = [
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    process.env.LOCALAPPDATA + '\\Google\\Chrome\\Application\\chrome.exe',
  ];
  
  let chromePath = null;
  for (const p of chromePaths) {
    if (fs.existsSync(p)) { chromePath = p; break; }
  }
  
  if (!chromePath) {
    console.log('Chrome not found');
    return;
  }
  
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(url, { waitUntil: 'networkidle0', timeout: 15000 });
  await page.screenshot({ path: filename, fullPage: false });
  console.log('Screenshot saved:', filename);
  
  await browser.close();
}

(async () => {
  const outDir = 'C:\\Users\\LEO\\.qclaw\\workspace\\china-franchise-net\\screenshots';
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
  
  await screenshot('http://localhost:3000/zh/brand/taning-lemon-tea', path.join(outDir, 'brand-detail.png'));
})();

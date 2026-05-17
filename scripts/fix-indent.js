var fs = require('fs');
var c = fs.readFileSync('lib/i18n.ts', 'utf8');
var lines = c.split('\n');

// Fix en.enterAcademy indent (should be 6 spaces, currently 4)
for (var i = 0; i < lines.length; i++) {
  var line = lines[i];
  // Line 228 (0-indexed 227) is the closing "}," of en nav
  // Line 227 (0-indexed 226) has "    enterAcademy:" (4 spaces)
  // Line 228 (0-indexed 227) has "    }," — we need to insert before "}," with 6 spaces
  if (line.trim() === '},' && i > 0 && lines[i-1].trim() === 'enterAcademy: "Enter Academy",') {
    var indent = line.match(/^(\s*)/)[0];
    // Replace the 4-space enterAcademy with 6-space version
    lines[i-1] = indent + '      enterAcademy: "Enter Academy",';
    console.log('Fixed en.enterAcademy indent at line ' + (i+1));
  }
  // Similarly for th and vi
  if (line.trim() === '},' && i > 0 && lines[i-1].includes('enterAcademy: "เข้าสู่หน้าสถาบัน"')) {
    lines[i-1] = '      enterAcademy: "เข้าสู่หน้าสถาบัน",';
    console.log('Fixed th.enterAcademy at line ' + (i+1));
  }
  if (line.trim() === '},' && i > 0 && lines[i-1].includes('enterAcademy: "Vào trang Học viện"')) {
    lines[i-1] = '      enterAcademy: "Vào trang Học viện",';
    console.log('Fixed vi.enterAcademy at line ' + (i+1));
  }
}

fs.writeFileSync('lib/i18n.ts', lines.join('\n'), 'utf8');
console.log('Done');

// Verify structure
c = fs.readFileSync('lib/i18n.ts', 'utf8');
try {
  var trans = new Function('return ' + c.substring(c.indexOf('export const translations')))();
  console.log('✓ i18n.ts parses OK');
  console.log('zh.home.brandCard:', JSON.stringify(trans.zh.home.brandCard));
  console.log('en.nav.enterAcademy:', trans.en.nav.enterAcademy);
  console.log('en.home.brandCard:', JSON.stringify(trans.en.home.brandCard));
  console.log('th.nav.enterAcademy:', trans.th.nav.enterAcademy);
  console.log('vi.nav.enterAcademy:', trans.vi.nav.enterAcademy);
  console.log('zh.nav.enterAcademy:', trans.zh.nav.enterAcademy);
} catch(e) {
  console.log('✗ Parse error:', e.message);
}
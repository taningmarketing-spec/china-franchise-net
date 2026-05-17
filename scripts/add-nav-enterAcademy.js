const fs = require('fs');
var c = fs.readFileSync('lib/i18n.ts', 'utf8');
var lines = c.split('\n');

// Debug: show zh nav closing area
console.log('zh nav area (lines 80-90):');
for (var i = 79; i < 90; i++) console.log((i+1) + ': ' + JSON.stringify(lines[i]));

// Find zh nav closing line ("}" after search line)
var zhNavClosing = -1;
for (var i = 79; i < 90; i++) {
  if (lines[i].trim() === '}') { zhNavClosing = i; break; }
}
console.log('zh nav closing found at line:', zhNavClosing + 1);
if (zhNavClosing >= 0) {
  var indent = lines[zhNavClosing].match(/^\s*/)[0];
  lines[zhNavClosing] = indent + 'enterAcademy: "进入学院主页",\n' + lines[zhNavClosing];
  console.log('Added enterAcademy to zh.nav');
}

// Find en nav closing line
var enNavClosing = -1;
for (var i = 220; i < 235; i++) {
  if (lines[i].trim() === '}') { enNavClosing = i; break; }
}
console.log('en nav closing found at line:', enNavClosing + 1);

// Find th nav closing line
var thNavClosing = -1;
for (var i = 358; i < 375; i++) {
  if (lines[i].trim() === '}') { thNavClosing = i; break; }
}
console.log('th nav closing found at line:', thNavClosing + 1);

// Find vi nav closing line
var viNavClosing = -1;
for (var i = 498; i < 515; i++) {
  if (lines[i].trim() === '}') { viNavClosing = i; break; }
}
console.log('vi nav closing found at line:', viNavClosing + 1);

// Add th/vi enterAcademy
if (thNavClosing >= 0) {
  var indent = lines[thNavClosing].match(/^\s*/)[0];
  lines[thNavClosing] = indent + 'enterAcademy: "เข้าสู่หน้าสถาบัน",\n' + lines[thNavClosing];
  console.log('Added enterAcademy to th.nav');
}
if (viNavClosing >= 0) {
  var indent = lines[viNavClosing].match(/^\s*/)[0];
  lines[viNavClosing] = indent + 'enterAcademy: "Vào trang Học viện",\n' + lines[viNavClosing];
  console.log('Added enterAcademy to vi.nav');
}

fs.writeFileSync('lib/i18n.ts', lines.join('\n'), 'utf8');
console.log('Done!');

// Verify all
c = fs.readFileSync('lib/i18n.ts', 'utf8');
for (const k of ['storesChina', 'storesOverseas', 'highlights', 'enterAcademy']) {
  var idx = c.indexOf(k);
  if (idx >= 0) {
    var lineNo = c.substring(0, idx).split('\n').length;
    console.log('✓ ' + k + ' at line ' + lineNo);
  } else {
    console.log('✗ ' + k + ' NOT found');
  }
}
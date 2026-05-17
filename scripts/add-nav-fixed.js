const fs = require('fs');
var c = fs.readFileSync('lib/i18n.ts', 'utf8');
var lines = c.split('\n');

// Add enterAcademy before the closing brace of each locale's nav block
// Need to find: "  }," within the nav block (closing brace with comma)

// zh nav closes at line 84 (after insert it shifted) — look for "}," at depth where nav is context
// Simpler: just find "}," at line 84 (or near it) and insert before

const insertions = [
  { line: 84, indent: '      ', key: 'enterAcademy: "进入学院主页",' },
  { line: 226, indent: '    ', key: 'enterAcademy: "Enter Academy",' },
];

// For th and vi, need to recalculate after insertions
// th nav was at line 359, after +3 insertion in th brandCard it shifts to line 362
// vi nav was at line 498, after +3 insertions in zh/en/th brandCard = +9, shifts to line 507
// But zh nav also got +3 so th nav is 359+3=362, vi nav is 498+9=507
// And zh enterAcademy was added at line 84 which shifted en nav from 220 to 223
// Actually let me recalculate properly:
// Starting line numbers from debug-brandcard.js:
// zh nav closing: line 81 (just "},")
// en nav closing: line 220 (just "},")
// th nav closing: line 359 (just "},")
// vi nav closing: line 498 (just "},")

// After add-keys-fixed.js:
// - zh brandCard at line 23 added 3 lines → zh section shifted +3
// - en brandCard at line 162 added 3 lines → en section (including nav) shifted +3
// - th brandCard at line 301 added 3 lines → th section shifted +3
// - vi brandCard at line 440 added 3 lines → vi section shifted +3

// zh nav closing was at 81, now at 84
// en nav closing was at 220, now at 223
// th nav closing was at 359, now at 362
// vi nav closing was at 498, now at 501

// The previous script already added en at line 226 (after zh enterAcademy was at 84)
// So en nav was at 223, inserted enterAcademy at 226, now en nav closing is at 227

// Current file line numbers:
const enterAcademyInserts = [
  { line: 84, key: '      enterAcademy: "进入学院主页",' },  // zh
  { line: 227, key: '    enterAcademy: "Enter Academy",' },   // en (was 223, after zh insert +1 = 224, then enterAcademy insert +3 = 227)
  // Need to find th and vi positions
];

// First, fix zh (line 84)
lines.splice(83, 0, '      enterAcademy: "进入学院主页",');

// Rebuild to find current positions
c = lines.join('\n');
lines = c.split('\n');

// Now find en nav closing (should be around line 223-230)
// Find "  en: {" then find nav closing "    },"
var inEn = false;
var enNavClose = -1;
for (var i = 0; i < lines.length; i++) {
  var t = lines[i].trim();
  if (t === 'en: {') inEn = true;
  if (inEn && t === 'nav: {') {
    // Find the closing } of nav
    var depth = 0;
    for (var j = i; j < lines.length; j++) {
      var l = lines[j];
      for (var k = 0; k < l.length; k++) {
        if (l[k] === '{') depth++;
        if (l[k] === '}') depth--;
      }
      if (depth === 0 && j > i) {
        enNavClose = j;
        break;
      }
    }
    break;
  }
}
console.log('en nav closing at line:', enNavClose + 1);

// Insert en enterAcademy before it
if (enNavClose >= 0) {
  var indent = lines[enNavClose].match(/^\s*/)[0];
  lines.splice(enNavClose, 0, indent + 'enterAcademy: "Enter Academy",');
}

// Rebuild and find th
c = lines.join('\n');
lines = c.split('\n');

var inTh = false;
var thNavClose = -1;
for (var i = 0; i < lines.length; i++) {
  var t = lines[i].trim();
  if (t === 'th: {') inTh = true;
  if (inTh && t === 'nav: {') {
    var depth = 0;
    for (var j = i; j < lines.length; j++) {
      var l = lines[j];
      for (var k = 0; k < l.length; k++) {
        if (l[k] === '{') depth++;
        if (l[k] === '}') depth--;
      }
      if (depth === 0 && j > i) {
        thNavClose = j;
        break;
      }
    }
    break;
  }
}
console.log('th nav closing at line:', thNavClose + 1);

if (thNavClose >= 0) {
  var indent = lines[thNavClose].match(/^\s*/)[0];
  lines.splice(thNavClose, 0, indent + 'enterAcademy: "เข้าสู่หน้าสถาบัน",');
}

// Rebuild and find vi
c = lines.join('\n');
lines = c.split('\n');

var inVi = false;
var viNavClose = -1;
for (var i = 0; i < lines.length; i++) {
  var t = lines[i].trim();
  if (t === 'vi: {') inVi = true;
  if (inVi && t === 'nav: {') {
    var depth = 0;
    for (var j = i; j < lines.length; j++) {
      var l = lines[j];
      for (var k = 0; k < l.length; k++) {
        if (l[k] === '{') depth++;
        if (l[k] === '}') depth--;
      }
      if (depth === 0 && j > i) {
        viNavClose = j;
        break;
      }
    }
    break;
  }
}
console.log('vi nav closing at line:', viNavClose + 1);

if (viNavClose >= 0) {
  var indent = lines[viNavClose].match(/^\s*/)[0];
  lines.splice(viNavClose, 0, indent + 'enterAcademy: "Vào trang Học viện",');
}

fs.writeFileSync('lib/i18n.ts', lines.join('\n'), 'utf8');
console.log('Done!');

// Verify
c = fs.readFileSync('lib/i18n.ts', 'utf8');
var count = 0;
for (var pos = 0; pos >= 0;) {
  pos = c.indexOf('enterAcademy', pos + 1);
  if (pos < 0) break;
  count++;
  var lineNo = c.substring(0, pos).split('\n').length;
  console.log('✓ enterAcademy #' + count + ' at line ' + lineNo);
}
console.log('Total enterAcademy keys:', count);
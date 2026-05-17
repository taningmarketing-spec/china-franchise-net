// Fix the specific corrupted lines in zh home section
// L70: orphaned comma  |  L71: double comma  |  L74: broken closing
var fs = require('fs');
var c = fs.readFileSync('lib/i18n.ts', 'utf8');
var lines = c.split('\n');

console.log('Before:', lines.length, 'lines');
console.log('L70:', JSON.stringify(lines[69]));
console.log('L71:', JSON.stringify(lines[70]));
console.log('L73:', JSON.stringify(lines[72]));
console.log('L74:', JSON.stringify(lines[73]));

// Fix L70: remove the orphaned comma line
if (lines[69].trim() === ',') {
  lines[69] = '';
  console.log('L70: removed orphaned comma');
}

// Fix L71: "brand: { inquiry: "立即咨询加盟" },," → "brand: { inquiry: "立即咨询加盟" },"
if (lines[70].trim() === 'brand: { inquiry: "立即咨询加盟" },,') {
  lines[70] = lines[70].replace(',,', ',');
  console.log('L71: fixed double comma');
}

// Fix L74: broken closing
// Current: "},$\n},\n"  (the first "}," has no newline after, then second "}," closes nav)
// We need: "},\n},\n"  (two proper closing lines)
if (lines[73].trim() === '}') {
  // Make sure it ends with newline
  if (!lines[73].endsWith('\n')) lines[73] = lines[73] + '\n';
  // L74 should be empty or just whitespace  
  lines[74] = '';
  console.log('L73/L74: fixed closing');
}

var newContent = lines.join('\n');
console.log('\nAfter:', newContent.split('\n').length, 'lines');

// Verify
var badCommas = newContent.split('\n').filter(function(l) { return l.trim() === ','; });
var unclosed = (newContent.match(/brand: \{[^}]*$/g) || []).length;
console.log('Orphaned commas:', badCommas.length);
console.log('Potential unclosed brand:', unclosed);

fs.writeFileSync('lib/i18n.ts', newContent, 'utf8');
console.log('Done!');
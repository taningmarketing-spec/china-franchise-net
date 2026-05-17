var fs = require('fs');
var c = fs.readFileSync('lib/i18n.ts', 'utf8');
var lines = c.split('\n');
var inNav = false;
var currentLocale = null;
var navLines = [];

for (var i = 0; i < lines.length; i++) {
  var line = lines[i];
  var trim = line.trim();
  
  // Detect locale
  var localeMatch = trim.match(/^([a-z]{2}): \{/);
  if (localeMatch && !line.startsWith(' ')) {
    currentLocale = localeMatch[1];
    inNav = false;
    navLines.push('L'+(i+1)+' LOCALE: ' + trim);
    continue;
  }
  
  // Detect entering nav
  if (trim === 'nav: {') {
    inNav = true;
    navLines.push('L'+(i+1)+' NAV START (locale=' + currentLocale + ') indent=' + line.match(/^(\s*)/)[0].length);
    continue;
  }
  
  // Detect closing nav: trim is "}," and it has 4 spaces
  if (inNav && trim === '},') {
    var indent = line.match(/^(\s*)/)[0].length;
    navLines.push('L'+(i+1)+' NAV END (locale=' + currentLocale + ') indent=' + indent + ' >' + JSON.stringify(line));
    inNav = false;
    continue;
  }
  
  // Exit nav if indent drops (closing parent object)
  if (inNav && line.match(/^\s*$/) === null && line.match(/^(\s*)/)[0].length < 2 && trim !== '') {
    navLines.push('L'+(i+1)+' EXIT NAV (locale=' + currentLocale + ') trim=' + trim);
    inNav = false;
  }
}

console.log(navLines.join('\n'));

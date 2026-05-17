// Check hardcoded Chinese strings in multiple components
var fs = require('fs');

var files = [
  'components/front/AcademyArticleList.tsx',
  'components/front/ContactModal.tsx',
  'components/front/BrandCTA.tsx',
  'components/front/BrandGallery.tsx',
  'app/[locale]/contact/ContactForm.tsx',
];

files.forEach(function(file) {
  var c = fs.readFileSync(file, 'utf8');
  var lines = c.split('\n');
  var hardcoded = [];
  lines.forEach(function(line, i) {
    // Skip comments and strings that are part of JSX tag attributes
    var stripped = line.replace(/\/\/.*$/, '').replace(/\/\*.*?\*\//g, '');
    // Look for Chinese characters in non-i18n context
    var chinese = stripped.match(/[\u4e00-\u9fff]/g);
    if (chinese && !stripped.includes('translations[') && !stripped.includes('t.') && !stripped.includes('useTranslation') && !stripped.includes('i18n')) {
      hardcoded.push('L' + (i+1) + ': ' + stripped.trim().slice(0, 100));
    }
  });
  if (hardcoded.length > 0) {
    console.log('\n=== ' + file + ' ===');
    hardcoded.forEach(function(h) { console.log(h); });
  } else {
    console.log(file + ': CLEAN');
  }
});
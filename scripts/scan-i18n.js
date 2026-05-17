var fs = require('fs');
var files = [
  'components/front/LocaleClientLayout.tsx',
  'components/front/ContactModal.tsx',
  'components/front/BrandShowcase.tsx',
  'components/front/BrandCTA.tsx',
  'components/front/BrandGallery.tsx',
  'components/front/CategoryBrands.tsx',
  'components/front/InquiryForm.tsx',
  'components/front/BrandCard.tsx'
];

var chineseRegex = /[\u4e00-\u9fff]/;
files.forEach(function(f) {
  try {
    var c = fs.readFileSync(f, 'utf8');
    var lines = c.split('\n');
    var found = false;
    for (var i = 0; i < lines.length; i++) {
      if (chineseRegex.test(lines[i])) {
        if (!found) { console.log('\n=== ' + f + ' ==='); found = true; }
        console.log((i+1) + ': ' + lines[i].trim().substring(0, 100));
      }
    }
    if (!found) console.log('\n=== ' + f + ' === (clean)');
  } catch(e) {
    console.log('ERROR reading ' + f + ': ' + e.message);
  }
});

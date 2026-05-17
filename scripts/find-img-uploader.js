var fs = require('fs');

// Check articles/[id]/page.tsx
var c1 = fs.readFileSync('app/admin/articles/[id]/page.tsx', 'utf8');
var lines1 = c1.split('\n');
var inImageUploader = false;
for (var i = 0; i < lines1.length; i++) {
  var l = lines1[i];
  if (l.includes('ImageUploader') && !l.includes('import')) {
    console.log('L' + (i+1) + ': ' + l.trim());
    if (l.includes('label=')) inImageUploader = true;
  }
}

// Check pages/[id]/page.tsx
var c2 = fs.readFileSync('app/admin/pages/[id]/page.tsx', 'utf8');
var lines2 = c2.split('\n');
for (var i = 0; i < lines2.length; i++) {
  var l = lines2[i];
  if (l.includes('ImageUploader') && !l.includes('import')) {
    console.log('L' + (i+1) + ': ' + l.trim());
  }
}

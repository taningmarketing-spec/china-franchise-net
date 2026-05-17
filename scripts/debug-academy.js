var fs = require('fs');
var c = fs.readFileSync('components/front/AcademyArticleList.tsx', 'utf8');
var idx = c.indexOf("import { useTransition }");
console.log('Bytes 0-50:', JSON.stringify(c.substring(0, 50)));
console.log('Bytes 0-60:', JSON.stringify(c.substring(0, 60)));
// Count newlines before interface
var before = c.substring(0, idx);
console.log('Before interface (len=' + before.length + '):', JSON.stringify(before));

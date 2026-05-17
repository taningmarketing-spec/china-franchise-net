var fs=require('fs');
var c=fs.readFileSync('lib/i18n.ts','utf8');
var th=c.indexOf('  th: {');
var vi=c.indexOf('  vi: {');
var sub=c.substring(th,vi);
var idx=sub.lastIndexOf('viewDetails');
fs.writeFileSync('scripts/th-end.txt',JSON.stringify(sub.substring(idx,idx+80)));
console.log('OK');

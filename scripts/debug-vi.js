var fs=require('fs');
var c=fs.readFileSync('lib/i18n.ts','utf8');

// Check vi common section
var idx=c.indexOf("'Đang tải...'");
if(idx===-1){console.log('NOT FOUND: Đang tải');process.exit(1);}
console.log('Position:',idx);
// Get context after viewDetails
var after=c.substring(idx);
console.log('After viewDetails:',JSON.stringify(after.substring(0,200)));

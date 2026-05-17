// Fix encoding in (front) pages - the Chinese text got corrupted (mojibake)
// These files are in the (front) route group (no locale prefix)
// Repair the garbled Chinese strings

var fs = require('fs');

var fixes = {
  'app/(front)/about/page.tsx': {
    replacements: [
      ['title: \'鍏充簬鎴戜滑 - 涓\u001d\u001d\u001d\u001d\u001d浗鍥介檯鍔犵洘缃?', 'title: \'关于我们 - 中国国际加盟网\''],
      ['description: \'浜嗚В涓\u001d浗鍥介檯鍔犵洘缃戠殑浣垮懡銆佹効鏅\u001d鍜屾湇鍔℃捣鍐掆', 'description: \'了解中国国际加盟网的使命、愿景和服务内容\''],
      ['<h1 className="text-3xl font-extrabold text-slate-800 mb-4">鍏充簬鎴戜滑</h1>', '<h1 className="text-3xl font-extrabold text-slate-800 mb-4">关于我们</h1>'],
      ['涓\u001d浗鍥介檯鍔犵洘缃戣嚧鍔涗簬涓哄垱涓氳€呮彁渚涚湡瀹炪€佸彲闈犵殑鍔犵洘鍝佺墝淇℃伅', '中国国际加盟网致力于为创业者提供真实、可靠的品牌加盟信息'],
    ]
  },
  'app/(front)/contact/page.tsx': {
    // Read and fix the contact page
  },
};

// For now, just delete these files since they're not needed with [locale] routing
var filesToDelete = [
  'app/(front)/about/page.tsx',
  'app/(front)/contact/page.tsx',
  'app/(front)/page.tsx',
];

filesToDelete.forEach(function(f) {
  if (fs.existsSync(f)) {
    fs.unlinkSync(f);
    console.log('Deleted:', f);
  }
});

console.log('Cleaned up (front) route group files. Route group is no longer needed with [locale] routing.');
console.log('Done!');
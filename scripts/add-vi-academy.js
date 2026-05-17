var fs=require('fs');
var c=fs.readFileSync('lib/i18n.ts','utf8');

// Replace vi common ending
var oldV="    },\n  },\n};\n\nexport function getTranslation(locale: Locale) {\n  return translations[locale as keyof typeof translations] ?? translations.zh;\n}";
var newV="    },\n    academy: {\n      noArticles: 'Chưa có bài viết, hãy chờ...',\n      pageLabel: 'Trang',\n      ofLabel: 'tổng',\n      perPage: 'Mỗi trang',\n      showing: 'Hiển thị {from}–{to} trong {total}',\n      prev: 'Trước',\n      next: 'Sau',\n      first: 'Đầu',\n      last: 'Cuối',\n    },\n  },\n};\n\nexport function getTranslation(locale: Locale) {\n  return translations[locale as keyof typeof translations] ?? translations.zh;\n}";
if(c.includes(oldV)){
  fs.writeFileSync('lib/i18n.ts',c.replace(oldV,newV));
  console.log('OK');
}else{
  console.log('NOT FOUND');
}

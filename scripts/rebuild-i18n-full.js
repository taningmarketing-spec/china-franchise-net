// Rebuild i18n.ts from scratch with correct structure
// This will rewrite the entire file using a Node script
var fs = require('fs');

var i18nData = {
  zh: {
    nav: {
      home: "首页",
      aboutUs: "关于我们",
      admin: "管理后台",
      becomeFranchisee: "我要加盟",
      becomeFranchisor: "我要招商",
      overseasAcademy: "海外加盟学院",
      overseasCase: "品牌出海案例",
      overseasServices: "出海服务",
      brandList: "品牌大全",
      academy: "学院",
      contact: "联系我们",
      franchise: "招商",
      franchisee: "加盟",
      privacy: "隐私政策",
      terms: "使用条款",
      enterAcademy: "进入学院",
    },
    home: {
      title: "找到最适合你的",
      subtitle: "收录餐饮、茶饮、咖啡、小吃、甜品、糖水等热门行业加盟品牌，提供加盟费、条件、流程等详细信息，助您找到最适合的创业项目。",
      viewAll: "查看全部 →",
      whyChooseUs: "为什么选择中国国际加盟网",
      newBrands: "火爆加盟项目",
      highlight: "加盟品牌",
      latest: "最新",
      searchButton: "搜索品牌",
      searchPlaceholder: "输入品牌名、行业或关键词搜索...",
      stats: { brands: "收录品牌", daily: "持续更新", industries: "热门行业" },
      feeHighToLow: "费用高→低",
      feeLowToHigh: "费用低→高",
      quickFilter: "快速筛选：",
      categories: "热门行业分类",
      categoryBrands: "出海品牌推荐",
      features: {
        dailyUpdate: { title: "每日更新", desc: "每天自动采集10个新品牌，品牌库持续扩充，永远有新选择" },
        mobile: { title: "移动端适配", desc: "完美适配手机、平板，随时随地浏览，管理后台也能移动办公" },
        reliable: { title: "真实可靠", desc: "所有品牌信息经人工审核，确保真实有效，拒绝虚假宣传" },
        transparent: { title: "费用透明", desc: "公开各品牌加盟费、总成本、回本周期，助您理性决策" },
      },
      brandCard: {
        franchiseFee: "加盟费", stores: "门店", totalCost: "总投资",
        storesChina: "中国门店", storesOverseas: "海外门店",
        fee: "加盟费", cost: "总投资", highlights: "项目亮点",
      },
      brand: { inquiry: "立即咨询加盟" },
      contactModal: {
        title: "选择联系方式", subtitle: "Choose Contact Method", consulting: "咨询",
        weChat: "微信咨询", whatsApp: "WhatsApp 咨询", phone: "电话咨询", email: "邮件咨询",
        copied: "✓ 已复制", copy: "复制", open: "打开", call: "拨打",
        workHours: "工作时间：周一至周六 9:00-18:00 (GMT+8)",
      },
      brandGallery: { brandImage: "品牌图片" },
      highlights: "项目亮点",
      overseasCaseDesc: "成功案例深度解析",
      overseasDynamicDesc: "追踪全球最新动态",
      overseasPolicyDesc: "各国法规解读",
      overseasTipsDesc: "实用避坑指南",
    },
    footer: {
      quickLinks: "快速链接",
      contactUs: "联系我们",
      onlineInquiry: "在线咨询",
      admin: "管理后台",
      tagline: "中国餐饮加盟一站式平台",
      copyright: "© 2024 ChinaFranchise.net 版权所有",
      icp: "粤ICP备2024000000号",
    },
    brand: {
      storesChina: "中国门店", storesOverseas: "海外门店",
      franchiseFee: "加盟费", totalCost: "总投资",
      brandStory: "品牌故事",
      cooperationMode: "合作模式",
      contractYears: "合同年限",
      deliveryArea: "配送区域",
      brandFeatures: "品牌特色",
      contactUs: "联系我们",
      applyNow: "立即申请加盟",
      inquiryModal: { title: "立即咨询加盟", subtitle: "Fill in your info and we will contact you shortly" },
      name: "您的姓名", phone: "手机号码", message: "留言（选填）",
      submit: "提交申请", submitting: "提交中...",
      success: "提交成功！我们会尽快联系您。",
      error: "提交失败，请稍后重试。",
      required: "请填写姓名和手机号",
    },
    academy: {
      first: "首页", last: "尾页", next: "下一页", noArticles: "暂无文章",
      ofLabel: "共", pageLabel: "页", perPage: "每页", prev: "上一页",
      showing: "显示 {from}–{to}，共 {total} 条",
    },
    common: { loading: "加载中...", noData: "暂无数据", viewDetails: "查看详情" },
  },
  en: {
    nav: {
      home: "Home", aboutUs: "About Us", admin: "Admin", becomeFranchisee: "Franchise",
      becomeFranchisor: "Franchisor", overseasAcademy: "Overseas Academy", overseasCase: "Overseas Cases",
      overseasServices: "Services", brandList: "Brands", academy: "Academy", contact: "Contact",
      franchise: "Franchise", franchisee: "Franchisee", privacy: "Privacy", terms: "Terms", enterAcademy: "Enter Academy",
    },
    home: {
      title: "Find Your Perfect Franchise",
      subtitle: "Discover franchise opportunities in catering, tea, coffee, snacks, desserts, and more. Real franchise fees, detailed conditions, and complete process guides.",
      viewAll: "View All →", whyChooseUs: "Why Choose China Franchise Net",
      newBrands: "Hot Franchise Projects", highlight: "Featured Brands", latest: "Latest",
      searchButton: "Search", searchPlaceholder: "Enter brand name, industry or keywords...",
      stats: { brands: "Brands", daily: "Daily Updates", industries: "Industries" },
      feeHighToLow: "Fee: High→Low", feeLowToHigh: "Fee: Low→High",
      quickFilter: "Quick Filter:", categories: "Popular Categories", categoryBrands: "Overseas Brands",
      features: {
        dailyUpdate: { title: "Daily Updates", desc: "10 new brands automatically collected daily, library continuously expanded." },
        mobile: { title: "Mobile Friendly", desc: "Perfectly adapted for mobile and tablet, browse anywhere, manage on the go." },
        reliable: { title: "Verified Info", desc: "All brand info manually verified, real and effective, no false claims." },
        transparent: { title: "Transparent Pricing", desc: "Public franchise fees, total costs, payback periods for informed decisions." },
      },
      brandCard: {
        franchiseFee: "Franchise Fee", stores: "Stores", totalCost: "Total Cost",
        storesChina: "Stores in China", storesOverseas: "Overseas Stores",
        fee: "Franchise Fee", cost: "Total Cost", highlights: "Highlights",
      },
      brand: { inquiry: "Inquire Now" },
      contactModal: {
        title: "Choose Contact Method", subtitle: "Choose Contact Method", consulting: "Consulting",
        weChat: "WeChat", whatsApp: "WhatsApp", phone: "Phone", email: "Email",
        copied: "✓ Copied", copy: "Copy", open: "Open", call: "Call",
        workHours: "Hours: Mon-Sat 9:00-18:00 (GMT+8)",
      },
      brandGallery: { brandImage: "Brand Image" },
      highlights: "Highlights",
      overseasCaseDesc: "In-depth case analysis", overseasDynamicDesc: "Track latest global trends",
      overseasPolicyDesc: "International policy insights", overseasTipsDesc: "Practical guides and tips",
    },
    footer: {
      quickLinks: "Quick Links", contactUs: "Contact Us", onlineInquiry: "Online Inquiry", admin: "Admin",
      tagline: "China's #1 Franchise Platform for F&B Entrepreneurs", copyright: "© 2024 ChinaFranchise.net All Rights Reserved", icp: "ICP: 2024000000",
    },
    brand: {
      storesChina: "Stores in China", storesOverseas: "Overseas Stores",
      franchiseFee: "Franchise Fee", totalCost: "Total Cost",
      brandStory: "Brand Story", cooperationMode: "Cooperation Mode", contractYears: "Contract Years",
      deliveryArea: "Delivery Area", brandFeatures: "Brand Features",
      contactUs: "Contact Us", applyNow: "Apply Now",
      inquiryModal: { title: "Inquire Now", subtitle: "Fill in your info and we will contact you shortly" },
      name: "Your Name", phone: "Phone Number", message: "Message (Optional)",
      submit: "Submit", submitting: "Submitting...",
      success: "Submitted successfully! We will contact you soon.", error: "Submission failed, please try again.",
      required: "Please fill in your name and phone number",
    },
    academy: {
      first: "First", last: "Last", next: "Next", noArticles: "No articles yet",
      ofLabel: "of", pageLabel: "Page", perPage: "per page", prev: "Previous",
      showing: "Showing {from}–{to} of {total}",
    },
    common: { loading: "Loading...", noData: "No Data", viewDetails: "View Details" },
  },
  th: {
    nav: {
      home: "หน้าแรก", aboutUs: "เกี่ยวกับเรา", admin: "ผู้ดูแล", becomeFranchisee: "รับสัมปทาน",
      becomeFranchisor: "ผู้ประกอบการ", overseasAcademy: "สถาบันต่างประเทศ", overseasCase: "กรณีศึกษา",
      overseasServices: "บริการ", brandList: "แบรนด์", academy: "สถาบัน", contact: "ติดต่อ",
      franchise: "แฟรนไชส์", franchisee: "ผู้รับสัมปทาน", privacy: "ความเป็นส่วนตัว", terms: "ข้อกำหนด", enterAcademy: "เข้าสถาบัน",
    },
    home: {
      title: "ค้นหาแฟรนไชส์ที่เหมาะกับคุณ",
      subtitle: "ค้นพบโอกาสแฟรนไชส์ในธุรกิจอาหาร ชา กาแฟ ขนม ของหวาน และอื่นๆ ค่าธรรมเนียมจริง เงื่อนไขละเอียด คำแนะนำครบถ้วน",
      viewAll: "ดูทั้งหมด →", whyChooseUs: "ทำไมเลือก China Franchise Net",
      newBrands: "โปรเจกต์ฮอต", highlight: "แบรนด์แนะนำ", latest: "ล่าสุด",
      searchButton: "ค้นหา", searchPlaceholder: "ใส่ชื่อแบรนด์ อุตสาหกรรม หรือคำค้นหา...",
      stats: { brands: "แบรนด์", daily: "อัปเดตรายวัน", industries: "อุตสาหกรรม" },
      feeHighToLow: "ราคาสูง→ต่ำ", feeLowToHigh: "ราคาต่ำ→สูง",
      quickFilter: "กรองเร็ว:", categories: "หมวดหมู่ยอดนิยม", categoryBrands: "แบรนด์ต่างประเทศ",
      features: {
        dailyUpdate: { title: "อัปเดตรายวัน", desc: "รวบรวมแบรนด์ใหม่ 10 แบรนด์ทุกวัน ขยายไลบรารีแบรนด์อย่างต่อเนื่อง" },
        mobile: { title: "รองรับมือถือ", desc: "ปรับให้เหมาะสมกับโทรศัพท์มือถือและแท็บเล็ต เข้าถึงได้ทุกที่" },
        reliable: { title: "ข้อมูลตรวจสอบแล้ว", desc: "ทุกแบรนด์ผ่านการตรวจสอบด้วยมือ จริงและเชื่อถือได้" },
        transparent: { title: "ราคาโปร่งใส", desc: "เปิดเผยค่าธรรมเนียม ต้นทุน ระยะเวลาคืนทุนเพื่อการตัดสินใจที่ดี" },
      },
      brandCard: {
        franchiseFee: "ค่าแฟรนไชส์", stores: "ร้านค้า", totalCost: "ต้นทุนรวม",
        storesChina: "ร้านในจีน", storesOverseas: "ร้านต่างประเทศ",
        fee: "ค่าแฟรนไชส์", cost: "ต้นทุนรวม", highlights: "จุดเด่น",
      },
      brand: { inquiry: "สอบถามเลย" },
      contactModal: {
        title: "เลือกวิธีติดต่อ", subtitle: "เลือกวิธีติดต่อ", consulting: "สอบถาม",
        weChat: "สอบถามผ่าน WeChat", whatsApp: "สอบถาม WhatsApp", phone: "โทรศัพท์", email: "อีเมล",
        copied: "✓ คัดลอกแล้ว", copy: "คัดลอก", open: "เปิด", call: "โทร",
        workHours: "เวลาทำการ: จันทร์-เสาร์ 09:00-18:00 (GMT+8)",
      },
      brandGallery: { brandImage: "รูปภาพแบรนด์" },
      highlights: "จุดเด่น",
      overseasCaseDesc: "วิเคราะห์กรณีศึกษาอย่างลึกซึ้ง", overseasDynamicDesc: "ติดตามแนวโน้มโลก",
      overseasPolicyDesc: "ข้อมูลนโยบายต่างประเทศ", overseasTipsDesc: "คู่มือปฏิบัติจริง",
    },
    footer: {
      quickLinks: "ลิงก์ด่วน", contactUs: "ติดต่อเรา", onlineInquiry: "สอบถามออนไลน์", admin: "ผู้ดูแล",
      tagline: "แพลตฟอร์มแฟรนไชส์อาหารจีนสำหรับผู้ประกอบการ", copyright: "© 2024 ChinaFranchise.net สงวนลิขสิทธิ์", icp: "ICP: 2024000000",
    },
    brand: {
      storesChina: "ร้านในจีน", storesOverseas: "ร้านต่างประเทศ",
      franchiseFee: "ค่าแฟรนไชส์", totalCost: "ต้นทุนรวม",
      brandStory: "เรื่องราวแบรนด์", cooperationMode: "โหมดความร่วมมือ", contractYears: "ระยะเวลาสัญญา",
      deliveryArea: "พื้นที่จัดส่ง", brandFeatures: "จุดเด่นของแบรนด์",
      contactUs: "ติดต่อเรา", applyNow: "สมัครเลย",
      inquiryModal: { title: "สอบถามเลย", subtitle: "กรอกข้อมูลแล้วเราจะติดต่อกลับ" },
      name: "ชื่อของคุณ", phone: "หมายเลขโทรศัพท์", message: "ข้อความ (ไม่บังคับ)",
      submit: "ส่ง", submitting: "กำลังส่ง...",
      success: "ส่งสำเร็จ! เราจะติดต่อคุณเร็วๆ นี้", error: "ส่งไม่สำเร็จ ลองอีกครั้ง", required: "กรุณากรอกชื่อและเบอร์โทร",
    },
    academy: {
      first: "หน้าแรก", last: "หน้าสุดท้าย", next: "ถัดไป", noArticles: "ยังไม่มีบทความ",
      ofLabel: "ของ", pageLabel: "หน้า", perPage: "ต่อหน้า", prev: "ก่อนหน้า",
      showing: "แสดง {from}–{to} จาก {total}",
    },
    common: { loading: "กำลังโหลด...", noData: "ไม่มีข้อมูล", viewDetails: "ดูรายละเอียด" },
  },
  vi: {
    nav: {
      home: "Trang chủ", aboutUs: "Về chúng tôi", admin: "Quản trị", becomeFranchisee: "Nhận nhượng quyền",
      becomeFranchisor: "Tôi muốn tuyển đại lý", overseasAcademy: "Học viện", overseasCase: "Case study",
      overseasServices: "Dịch vụ", brandList: "Thương hiệu", academy: "Học viện", contact: "Liên hệ",
      franchise: "Nhượng quyền", franchisee: "Đối tác", privacy: "Quyền riêng tư", terms: "Điều khoản", enterAcademy: "Vào học viện",
    },
    home: {
      title: "Tìm kiếm cơ hội nhượng quyền hoàn hảo",
      subtitle: "Khám phá cơ hội nhượng quyền trong ngành F&B, trà, cà phê, đồ ăn vặt, tráng miệng. Phí nhượng quyền thật, điều kiện chi tiết và hướng dẫn đầy đủ.",
      viewAll: "Xem tất cả →", whyChooseUs: "Tại sao chọn China Franchise Net",
      newBrands: "Dự án nổi bật", highlight: "Thương hiệu nổi bật", latest: "Mới nhất",
      searchButton: "Tìm kiếm", searchPlaceholder: "Nhập tên thương hiệu, ngành hoặc từ khóa...",
      stats: { brands: "Thương hiệu", daily: "Cập nhật hàng ngày", industries: "Ngành" },
      feeHighToLow: "Giá cao→thấp", feeLowToHigh: "Giá thấp→cao",
      quickFilter: "Lọc nhanh:", categories: "Danh mục phổ biến", categoryBrands: "Thương hiệu quốc tế",
      features: {
        dailyUpdate: { title: "Cập nhật hàng ngày", desc: "Thu thập 10 thương hiệu mới mỗi ngày, mở rộng thư viện thương hiệu liên tục." },
        mobile: { title: "Hỗ trợ di động", desc: "Tối ưu hóa cho điện thoại và máy tính bảng, truy cập mọi lúc mọi nơi." },
        reliable: { title: "Thông tin đã xác minh", desc: "Mọi thương hiệu được xác minh thủ công, thật và đáng tin cậy." },
        transparent: { title: "Giá cả minh bạch", desc: "Công khai phí nhượng quyền, chi phí, thời gian hoàn vốn để ra quyết định sáng suốt." },
      },
      brandCard: {
        franchiseFee: "Phí nhượng quyền", stores: "Cửa hàng", totalCost: "Tổng chi phí",
        storesChina: "Cửa hàng Trung Quốc", storesOverseas: "Cửa hàng nước ngoài",
        fee: "Phí nhượng quyền", cost: "Tổng chi phí", highlights: "Điểm nổi bật",
      },
      brand: { inquiry: "Hỏi ngay" },
      contactModal: {
        title: "Chọn phương thức liên hệ", subtitle: "Chọn phương thức liên hệ", consulting: "Tư vấn",
        weChat: "WeChat", whatsApp: "WhatsApp", phone: "Điện thoại", email: "Email",
        copied: "✓ Đã sao chép", copy: "Sao chép", open: "Mở", call: "Gọi",
        workHours: "Giờ làm việc: Thứ 2-Thứ 7 09:00-18:00 (GMT+8)",
      },
      brandGallery: { brandImage: "Hình ảnh thương hiệu" },
      highlights: "Điểm nổi bật",
      overseasCaseDesc: "Phân tích chuyên sâu case study", overseasDynamicDesc: "Theo dõi xu hướng toàn cầu",
      overseasPolicyDesc: "Hiểu biết về chính sách quốc tế", overseasTipsDesc: "Hướng dẫn thực tế",
    },
    footer: {
      quickLinks: "Liên kết nhanh", contactUs: "Liên hệ", onlineInquiry: "Hỏi trực tuyến", admin: "Quản trị",
      tagline: "Nền tảng nhượng quyền F&B Trung Quốc cho doanh nhân", copyright: "© 2024 ChinaFranchise.net Mọi quyền được bảo lưu", icp: "ICP: 2024000000",
    },
    brand: {
      storesChina: "Cửa hàng Trung Quốc", storesOverseas: "Cửa hàng nước ngoài",
      franchiseFee: "Phí nhượng quyền", totalCost: "Tổng chi phí",
      brandStory: "Câu chuyện thương hiệu", cooperationMode: "Chế độ hợp tác", contractYears: "Thời hạn hợp đồng",
      deliveryArea: "Khu vực giao hàng", brandFeatures: "Đặc điểm thương hiệu",
      contactUs: "Liên hệ", applyNow: "Đăng ký ngay",
      inquiryModal: { title: "Hỏi ngay", subtitle: "Điền thông tin và chúng tôi sẽ liên hệ lại" },
      name: "Tên của bạn", phone: "Số điện thoại", message: "Tin nhắn (Tùy chọn)",
      submit: "Gửi", submitting: "Đang gửi...",
      success: "Gửi thành công! Chúng tôi sẽ liên hệ bạn sớm.", error: "Gửi thất bại, vui lòng thử lại", required: "Vui lòng điền tên và số điện thoại",
    },
    academy: {
      first: "Đầu", last: "Cuối", next: "Sau", noArticles: "Chưa có bài viết",
      ofLabel: "tổng", pageLabel: "Trang", perPage: "Mỗi trang", prev: "Trước",
      showing: "Hiển thị {from}–{to} trong {total}",
    },
    common: { loading: "Đang tải...", noData: "Không có dữ liệu", viewDetails: "Xem chi tiết" },
  },
};

function objectToTs(obj, indent) {
  var spaces = Array(indent + 1).join(' ');
  var lines = [];
  for (var key in obj) {
    if (!obj.hasOwnProperty(key)) continue;
    var val = obj[key];
    if (typeof val === 'string') {
      lines.push(spaces + key + ': "' + val.replace(/\\/g, '\\\\').replace(/"/g, '\\"') + '",');
    } else if (typeof val === 'object' && val !== null) {
      if (Array.isArray(val)) {
        lines.push(spaces + key + ': [');
        val.forEach(function(v) {
          lines.push(spaces + '  "' + v.replace(/\\/g, '\\\\').replace(/"/g, '\\"') + '",');
        });
        lines.push(spaces + '],');
      } else {
        lines.push(spaces + key + ': {');
        lines.push(objectToTs(val, indent + 2).join('\n'));
        lines.push(spaces + '},');
      }
    }
  }
  return lines;
}

function buildFile() {
  var lines = [
    '// 多语言配置',
    'export type Locale = \'zh\' | \'en\' | \'th\' | \'vi\';',
    '',
    'export const defaultLocale: Locale = \'zh\';',
    '',
    'export const locales: Locale[] = [\'zh\', \'en\', \'th\', \'vi\'];',
    '',
    'export const localeNames: Record<Locale, string> = {',
    '  zh: \'中文\',',
    '  en: \'English\',',
    '  th: \'ไทย\',',
    '  vi: \'Tiếng Việt\',',
    '};',
    '',
    '// 翻译内容',
    'export const translations = {',
  ];

  var localeOrder = ['zh', 'en', 'th', 'vi'];
  localeOrder.forEach(function(loc) {
    lines.push('  ' + loc + ': {');
    var content = objectToTs(i18nData[loc], 4);
    lines = lines.concat(content);
    lines.push('  },');
    lines.push('');
  });

  lines.push('};');
  return lines.join('\n');
}

var result = buildFile();
fs.writeFileSync('lib/i18n.ts', result, 'utf8');
var lines = result.split('\n');
console.log('Written:', lines.length, 'lines,', result.length, 'chars');
console.log('Last line:', lines[lines.length-1]);
console.log('Done!');
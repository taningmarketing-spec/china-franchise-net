// Script to rebuild i18n.ts with correct nested structure
// The current file has closing } braces in wrong places, orphaning keys
const fs = require('fs');

const zh = {
  nav: {
    home: '首页',
    becomeFranchisor: '我要招商',
    becomeFranchisee: '我要加盟',
    overseasAcademy: '海外加盟学院',
    overseasNews: '海外加盟资讯',
    overseasCase: '品牌出海案例',
    overseasTips: '海外加盟常识',
    overseasPolicy: '海外特许政策',
    overseasDynamic: '海外加盟动态',
    overseasQA: '海外加盟Q&A',
    overseasServices: '出海服务',
    aboutUs: '关于我们',
    search: '搜索品牌、行业...',
    admin: '管理后台',
  },
  home: {
    title: '找到最适合你的',
    highlight: '加盟品牌',
    subtitle: '收录餐饮、茶饮、咖啡、小吃、甜品、糖水等热门行业加盟品牌，提供加盟费、条件、流程等详细信息，助您找到最适合的创业项目。',
    searchPlaceholder: '输入品牌名、行业或关键词搜索...',
    searchButton: '搜索品牌',
    quickFilter: '快速筛选：',
    stats: {
      brands: '收录品牌',
      industries: '热门行业',
      daily: '持续更新',
    },
    categories: '热门行业分类',
    viewAll: '查看全部 →',
    newBrands: '火爆加盟项目',
    categoryBrands: '出海品牌推荐',
    latest: '最新',
    feeLowToHigh: '费用低→高',
    feeHighToLow: '费用高→低',
    whyChooseUs: '为什么选择中国国际加盟网',
    features: {
      reliable: { title: '真实可靠', desc: '所有品牌信息经人工审核，确保真实有效，拒绝虚假宣传' },
      dailyUpdate: { title: '每日更新', desc: '每天自动采集10个新品牌，品牌库持续扩充，永远有新选择' },
      transparent: { title: '费用透明', desc: '公开各品牌加盟费、总成本、回本周期，助您理性决策' },
      mobile: { title: '移动端适配', desc: '完美适配手机、平板，随时随地浏览，管理后台也能移动办公' },
    },
    overseasDynamicDesc: '追踪全球最新动态',
    overseasCaseDesc: '成功案例深度解析',
    overseasTipsDesc: '实用避坑指南',
    overseasPolicyDesc: '各国法规解读',
    brandCard: {
      franchiseFee: '加盟费',
      totalCost: '总投资',
      stores: '门店',
    },
  },
  brand: {
    franchiseFee: '加盟费',
    totalCost: '总投资',
    stores: '门店数',
    contractYears: '加盟年限',
    inquiry: '立即咨询加盟',
    backToList: '返回列表',
    process: '加盟流程',
    support: '加盟支持',
    gallery: '品牌图片',
    basicInfo: '基本信息',
    industry: '行业',
    source: '品牌来源',
    storeCount: '门店数量',
    viewCount: '浏览次数',
    relatedBrands: '相关品牌推荐',
  },
  inquiry: {
    title: '立即咨询',
    subtitle: '顾问将在24小时内联系您',
    name: '您的姓名 *',
    phone: '联系电话 *',
    email: '电子邮箱（选填）',
    message: '留言（选填）',
    submit: '提交咨询',
    submitting: '提交中...',
    success: '提交成功！',
    successDesc: '顾问将在24小时内联系您，请保持电话畅通',
    privacy: '您的信息仅用于联系用途，不会泄露给第三方',
  },
  contactModal: {
    title: '选择联系方式',
    wechat: '微信咨询',
    whatsapp: 'WhatsApp',
    phone: '电话咨询',
    email: '邮件咨询',
    wechatId: '微信号',
    copy: '复制',
    copied: '已复制',
    workHours: '工作时间：周一至周六 9:00-18:00 (GMT+8)',
    inquiry: '咨询：',
    open: '打开',
    dial: '拨打',
  },
  footer: {
    slogan: '收录餐饮、茶饮、咖啡、小吃、甜品、糖水等行业优质加盟品牌，为创业者提供真实、可靠的加盟信息。',
    quickLinks: '快速导航',
    contactUs: '联系我们',
    onlineInquiry: '在线咨询',
    admin: '管理后台',
    hotIndustries: '热门行业',
    categoryBrands: '出海品牌',
    budget: '投资预算',
    aboutUs: '关于我们',
    copyright: '© 2026 中国国际加盟网 cnfranchise.com 版权所有',
    tagline: '收录优质加盟品牌，助力创业者成功',
  },
  common: {
    loading: '加载中...',
    noData: '暂无数据',
    viewDetails: '查看详情',
  },
  academy: {
    noArticles: '暂无文章，敬请期待...',
    pageLabel: '页',
    ofLabel: '共',
    perPage: '每页',
    showing: '显示 {from}–{to} 条，共 {total} 条',
    prev: '上一页',
    next: '下一页',
    first: '首页',
    last: '末页',
  },
};

const en = {
  nav: {
    home: 'Home',
    becomeFranchisor: 'I Want to Franchise',
    becomeFranchisee: 'I Want to Join',
    overseasAcademy: 'Franchise Academy',
    overseasNews: 'Franchise News',
    overseasCase: 'Case Studies',
    overseasTips: 'Knowledge Base',
    overseasPolicy: 'Policy Guide',
    overseasDynamic: 'Latest Trends',
    overseasQA: 'Q&A',
    overseasServices: 'Overseas Services',
    aboutUs: 'About',
    search: 'Search brands, industries...',
    admin: 'Admin',
  },
  home: {
    title: 'Find Your Perfect',
    highlight: 'Franchise',
    subtitle: 'Discover franchise opportunities in catering, tea, coffee, snacks, desserts, and more. Real franchise fees, detailed conditions, and complete process guides to help you start your business.',
    searchPlaceholder: 'Enter brand name, industry or keywords...',
    searchButton: 'Search',
    quickFilter: 'Quick Filter:',
    stats: {
      brands: 'Brands',
      industries: 'Industries',
      daily: 'Daily Updates',
    },
    categories: 'Popular Categories',
    viewAll: 'View All →',
    newBrands: 'Hot Franchise Projects',
    categoryBrands: 'Overseas Brands',
    latest: 'Latest',
    feeLowToHigh: 'Fee: Low→High',
    feeHighToLow: 'Fee: High→Low',
    whyChooseUs: 'Why Choose China Franchise Net',
    features: {
      reliable: { title: 'Authentic', desc: 'All brand information is manually reviewed to ensure authenticity and effectiveness.' },
      dailyUpdate: { title: 'Daily Updates', desc: '10 new brands are automatically collected daily, continuously expanding the brand library.' },
      transparent: { title: 'Transparent Fees', desc: 'Public franchise fees, total costs, and payback periods to help you make rational decisions.' },
      mobile: { title: 'Mobile Friendly', desc: 'Perfectly adapted for mobile phones and tablets, browse anytime, anywhere.' },
    },
    overseasDynamicDesc: 'Track the latest global trends',
    overseasCaseDesc: 'In-depth case analysis',
    overseasTipsDesc: 'Practical guides and tips',
    overseasPolicyDesc: 'International policy insights',
    brandCard: {
      franchiseFee: 'Franchise Fee',
      totalCost: 'Total Cost',
      stores: 'Stores',
    },
  },
  brand: {
    franchiseFee: 'Franchise Fee',
    totalCost: 'Total Cost',
    stores: 'Stores',
    contractYears: 'Contract',
    inquiry: 'Inquire Now',
    backToList: 'Back to List',
    process: 'Franchise Process',
    support: 'Franchise Support',
    gallery: 'Gallery',
    basicInfo: 'Basic Info',
    industry: 'Industry',
    source: 'Source',
    storeCount: 'Store Count',
    viewCount: 'Views',
    relatedBrands: 'Related Brands',
  },
  inquiry: {
    title: 'Inquire Now',
    subtitle: 'Our consultant will contact you within 24 hours',
    name: 'Your Name *',
    phone: 'Phone Number *',
    email: 'Email (Optional)',
    message: 'Message (Optional)',
    submit: 'Submit Inquiry',
    submitting: 'Submitting...',
    success: 'Submitted Successfully!',
    successDesc: 'Our consultant will contact you within 24 hours. Please keep your phone available.',
    privacy: 'Your information will only be used for contact purposes and will not be shared with third parties.',
  },
  contactModal: {
    title: 'Choose Contact Method',
    wechat: 'WeChat',
    whatsapp: 'WhatsApp',
    phone: 'Phone',
    email: 'Email',
    wechatId: 'WeChat ID',
    copy: 'Copy',
    copied: 'Copied',
    workHours: 'Hours: Mon-Sat 9:00-18:00 (GMT+8)',
    inquiry: 'Inquiry:',
    open: 'Open',
    dial: 'Call',
  },
  footer: {
    slogan: 'Discover quality franchise brands in catering, tea, coffee, snacks, desserts, and more.',
    quickLinks: 'Quick Links',
    contactUs: 'Contact Us',
    onlineInquiry: 'Online Inquiry',
    admin: 'Admin',
    hotIndustries: 'Hot Industries',
    categoryBrands: 'Overseas Brands',
    budget: 'Investment Budget',
    aboutUs: 'About Us',
    copyright: '© 2026 China Franchise Net. All rights reserved.',
    tagline: 'Quality franchise brands for successful entrepreneurs',
  },
  common: {
    loading: 'Loading...',
    noData: 'No data',
    viewDetails: 'View Details',
  },
  academy: {
    noArticles: 'No articles yet, stay tuned...',
    pageLabel: 'Page',
    ofLabel: 'of',
    perPage: 'Per page',
    showing: 'Showing {from}–{to} of {total}',
    prev: 'Previous',
    next: 'Next',
    first: 'First',
    last: 'Last',
  },
};

const th = {
  nav: {
    home: 'หน้าแรก',
    becomeFranchisor: 'ฉันต้องการเป็นผู้ให้สิทธิ์แฟรนไชส์',
    becomeFranchisee: 'ฉันต้องการเป็นผู้รับสิทธิ์แฟรนไชส์',
    overseasAcademy: 'สถาบันแฟรนไชส์',
    overseasNews: 'ข่าวสารแฟรนไชส์',
    overseasCase: 'กรณีศึกษา',
    overseasTips: 'ฐานความรู้',
    overseasPolicy: 'คู่มือนโยบาย',
    overseasDynamic: 'เทรนด์ล่าสุด',
    overseasQA: 'ถาม-ตอบ',
    overseasServices: 'บริการต่างประเทศ',
    aboutUs: 'เกี่ยวกับเรา',
    search: 'ค้นหาแบรนด์...',
    admin: 'แอดมิน',
  },
  home: {
    title: 'ค้นหา',
    highlight: 'แฟรนไชส์ที่เหมาะสม',
    subtitle: 'ค้นหาโอกาสแฟรนไชส์ในอุตสาหกรรมต่างๆ ค่าแฟรนไชส์จริง เงื่อนไขโดยละเอียด และคู่มือกระบวนการที่สมบูรณ์',
    searchPlaceholder: 'ป้อนชื่อแบรนด์ อุตสาหกรรม หรือคำสำคัญ...',
    searchButton: 'ค้นหา',
    quickFilter: 'ตัวกรองด่วน:',
    stats: {
      brands: 'แบรนด์',
      industries: 'อุตสาหกรรม',
      daily: 'อัปเดตรายวัน',
    },
    categories: 'หมวดหมู่ยอดนิยม',
    viewAll: 'ดูทั้งหมด →',
    newBrands: 'โปรเจกต์แฟรนไชส์มาแรง',
    categoryBrands: 'แบรนด์ต่างประเทศ',
    latest: 'ล่าสุด',
    feeLowToHigh: 'ค่าธรรมเนียม: ต่ำ→สูง',
    feeHighToLow: 'ค่าธรรมเนียม: สูง→ต่ำ',
    whyChooseUs: 'ทำไมเลือก China Franchise Net',
    features: {
      reliable: { title: 'น่าเชื่อถือ', desc: 'ข้อมูลแบรนด์ทั้งหมดได้รับการตรวจสอบด้วยตนเองเพื่อให้แน่ใจว่ามีความถูกต้อง' },
      dailyUpdate: { title: 'อัปเดตรายวัน', desc: 'รวบรวมแบรนด์ใหม่ 10 แบรนด์ทุกวัน ขยายไลบรารีแบรนด์อย่างต่อเนื่อง' },
      transparent: { title: 'โปร่งใส', desc: 'ค่าแฟรนไชส์ ต้นทุนรวม และระยะเวลาคืนทุนสาธารณะ' },
      mobile: { title: 'รองรับมือถือ', desc: 'ปรับให้เหมาะสมกับโทรศัพท์มือถือและแท็บเล็ต' },
    },
    overseasDynamicDesc: 'ติดตามเทรนด์ล่าสุดทั่วโลก',
    overseasCaseDesc: 'วิเคราะห์กรณีศึกษาเชิงลึก',
    overseasTipsDesc: 'คำแนะนำปฏิบัติจริง',
    overseasPolicyDesc: 'ข้อมูลเชิงลึกนโยบายต่างประเทศ',
    brandCard: {
      franchiseFee: 'ค่าแฟรนไชส์',
      totalCost: 'ต้นทุนรวม',
      stores: 'ร้านค้า',
    },
  },
  brand: {
    franchiseFee: 'ค่าแฟรนไชส์',
    totalCost: 'ต้นทุนรวม',
    stores: 'จำนวนร้านค้า',
    contractYears: 'สัญญา',
    inquiry: 'สอบถามทันที',
    backToList: 'กลับไปที่รายการ',
    process: 'กระบวนการแฟรนไชส์',
    support: 'การสนับสนุน',
    gallery: 'แกลเลอรี่',
    basicInfo: 'ข้อมูลพื้นฐาน',
    industry: 'อุตสาหกรรม',
    source: 'แหล่งที่มา',
    storeCount: 'จำนวนร้านค้า',
    viewCount: 'การดู',
    relatedBrands: 'แบรนด์ที่เกี่ยวข้อง',
  },
  inquiry: {
    title: 'สอบถามทันที',
    subtitle: 'ที่ปรึกษาจะติดต่อคุณภายใน 24 ชั่วโมง',
    name: 'ชื่อของคุณ *',
    phone: 'เบอร์โทรศัพท์ *',
    email: 'อีเมล (ไม่บังคับ)',
    message: 'ข้อความ (ไม่บังคับ)',
    submit: 'ส่งคำถาม',
    submitting: 'กำลังส่ง...',
    success: 'ส่งสำเร็จ!',
    successDesc: 'ที่ปรึกษาจะติดต่อคุณภายใน 24 ชั่วโมง',
    privacy: 'ข้อมูลของคุณจะใช้เพื่อการติดต่อเท่านั้น',
  },
  contactModal: {
    title: 'เลือกวิธีการติดต่อ',
    wechat: 'WeChat',
    whatsapp: 'WhatsApp',
    phone: 'โทรศัพท์',
    email: 'อีเมล',
    wechatId: 'WeChat ID',
    copy: 'คัดลอก',
    copied: 'คัดลอกแล้ว',
    workHours: 'เวลาทำการ: จัน-เสาร์ 9:00-18:00 (GMT+8)',
    inquiry: 'สอบถาม:',
    open: 'เปิด',
    dial: 'โทร',
  },
  footer: {
    slogan: 'ค้นพบแบรนด์แฟรนไชส์คุณภาพในอุตสาหกรรมต่างๆ',
    quickLinks: 'ลิงก์ด่วน',
    contactUs: 'ติดต่อเรา',
    onlineInquiry: 'สอบถามออนไลน์',
    admin: 'แอดมิน',
    hotIndustries: 'อุตสาหกรรมยอดนิยม',
    categoryBrands: 'แบรนด์ต่างประเทศ',
    budget: 'งบประมาณ',
    aboutUs: 'เกี่ยวกับเรา',
    copyright: '© 2026 China Franchise Net สงวนลิขสิทธิ์',
    tagline: 'แบรนด์แฟรนไชส์คุณภาพสำหรับผู้ประกอบการที่ประสบความสำเร็จ',
  },
  common: {
    loading: 'กำลังโหลด...',
    noData: 'ไม่มีข้อมูล',
    viewDetails: 'ดูรายละเอียด',
  },
  academy: {
    noArticles: 'ยังไม่มีบทความ โปรดรอ...',
    pageLabel: 'หน้า',
    ofLabel: 'จาก',
    perPage: 'ต่อหน้า',
    showing: 'แสดง {from}–{to} จาก {total}',
    prev: 'ก่อนหน้า',
    next: 'ถัดไป',
    first: 'หน้าแรก',
    last: 'หน้าสุดท้าย',
  },
};

const vi = {
  nav: {
    home: 'Trang chủ',
    becomeFranchisor: 'Tôi muốn tuyển đại lý',
    becomeFranchisee: 'Tôi muốn nhận nhượng quyền',
    overseasAcademy: 'Học viện',
    overseasNews: 'Tin tức',
    overseasCase: 'Case study',
    overseasTips: 'Kiến thức',
    overseasPolicy: 'Chính sách',
    overseasDynamic: 'Xu hướng',
    overseasQA: 'Hỏi đáp',
    overseasServices: 'Dịch vụ xuất khẩu',
    aboutUs: 'Về chúng tôi',
    search: 'Tìm kiếm thương hiệu...',
    admin: 'Quản trị',
  },
  home: {
    title: 'Tìm',
    highlight: 'Nhượng quyền phù hợp',
    subtitle: 'Khám phá cơ hội nhượng quyền trong ngành F&B, trà, cà phê, đồ ăn vặt, tráng miệng. Phí nhượng quyền thật, điều kiện chi tiết và hướng dẫn đầy đủ',
    searchPlaceholder: 'Nhập tên thương hiệu, ngành hoặc từ khóa...',
    searchButton: 'Tìm kiếm',
    quickFilter: 'Lọc nhanh:',
    stats: {
      brands: 'Thương hiệu',
      industries: 'Ngành',
      daily: 'Cập nhật hàng ngày',
    },
    categories: 'Danh mục phổ biến',
    viewAll: 'Xem tất cả →',
    newBrands: 'Dự án Nhượng quyền Hot',
    categoryBrands: 'Thương hiệu quốc tế',
    latest: 'Mới nhất',
    feeLowToHigh: 'Phí: Thấp→Cao',
    feeHighToLow: 'Phí: Cao→Thấp',
    whyChooseUs: 'Tại sao chọn China Franchise Net',
    features: {
      reliable: { title: 'Đáng tin cậy', desc: 'Tất cả thông tin thương hiệu được kiểm duyệt thủ công để đảm bảo chính xác' },
      dailyUpdate: { title: 'Cập nhật hàng ngày', desc: 'Thu thập 10 thương hiệu mới mỗi ngày, mở rộng thư viện thương hiệu liên tục' },
      transparent: { title: 'Minh bạch', desc: 'Công khai phí nhượng quyền, tổng chi phí và thời gian hoàn vốn' },
      mobile: { title: 'Tương thích di động', desc: 'Tối ưu hóa cho điện thoại và máy tính bảng' },
    },
    overseasDynamicDesc: 'Theo dõi xu hướng toàn cầu',
    overseasCaseDesc: 'Phân tích chuyên sâu case study',
    overseasTipsDesc: 'Hướng dẫn thực tế',
    overseasPolicyDesc: 'Phân tích chính sách quốc tế',
    brandCard: {
      franchiseFee: 'Phí nhượng quyền',
      totalCost: 'Tổng chi phí',
      stores: 'Cửa hàng',
    },
  },
  brand: {
    franchiseFee: 'Phí nhượng quyền',
    totalCost: 'Tổng chi phí',
    stores: 'Số cửa hàng',
    contractYears: 'Hợp đồng',
    inquiry: 'Tư vấn ngay',
    backToList: 'Quay lại danh sách',
    process: 'Quy trình nhượng quyền',
    support: 'Hỗ trợ',
    gallery: 'Thư viện ảnh',
    basicInfo: 'Thông tin cơ bản',
    industry: 'Ngành',
    source: 'Nguồn',
    storeCount: 'Số cửa hàng',
    viewCount: 'Lượt xem',
    relatedBrands: 'Thương hiệu liên quan',
  },
  inquiry: {
    title: 'Tư vấn ngay',
    subtitle: 'Tư vấn viên sẽ liên hệ bạn trong vòng 24 giờ',
    name: 'Họ tên *',
    phone: 'Số điện thoại *',
    email: 'Email (Tùy chọn)',
    message: 'Tin nhắn (Tùy chọn)',
    submit: 'Gửi yêu cầu',
    submitting: 'Đang gửi...',
    success: 'Gửi thành công!',
    successDesc: 'Tư vấn viên sẽ liên hệ bạn trong vòng 24 giờ. Vui lòng giữ máy.',
    privacy: 'Thông tin của bạn chỉ dùng để liên hệ, không chia sẻ cho bên thứ ba.',
  },
  contactModal: {
    title: 'Chọn phương thức liên hệ',
    wechat: 'WeChat',
    whatsapp: 'WhatsApp',
    phone: 'Điện thoại',
    email: 'Email',
    wechatId: 'WeChat ID',
    copy: 'Sao chép',
    copied: 'Đã sao chép',
    workHours: 'Giờ làm việc: T2-T7 9:00-18:00 (GMT+8)',
    inquiry: 'Tư vấn:',
    open: 'Mở',
    dial: 'Gọi',
  },
  footer: {
    slogan: 'Khám phá các thương hiệu nhượng quyền chất lượng trong ngành F&B, trà, cà phê, đồ ăn vặt, tráng miệng.',
    quickLinks: 'Liên kết nhanh',
    contactUs: 'Liên hệ',
    onlineInquiry: 'Hỏi đáp',
    admin: 'Quản trị',
    hotIndustries: 'Ngành phổ biến',
    categoryBrands: 'Thương hiệu quốc tế',
    budget: 'Ngân sách',
    aboutUs: 'Về chúng tôi',
    copyright: '© 2026 China Franchise Net. Bảo lưu mọi quyền.',
    tagline: 'Thương hiệu nhượng quyền chất lượng cho doanh nhân thành công',
  },
  common: {
    loading: 'Đang tải...',
    noData: 'Không có dữ liệu',
    viewDetails: 'Xem chi tiết',
  },
  academy: {
    noArticles: 'Chưa có bài viết, hãy chờ...',
    pageLabel: 'Trang',
    ofLabel: 'tổng',
    perPage: 'Mỗi trang',
    showing: 'Hiển thị {from}–{to} trong {total}',
    prev: 'Trước',
    next: 'Sau',
    first: 'Đầu',
    last: 'Cuối',
  },
};

function toLines(obj, indent = 0) {
  const spaces = '  '.repeat(indent);
  const inner = '  '.repeat(indent + 1);
  const lines = [];
  const keys = Object.keys(obj).sort((a, b) => {
    const order = ['home', 'nav', 'brand', 'brandCard', 'inquiry', 'contactModal', 'footer', 'common', 'academy'];
    const ai = order.indexOf(a);
    const bi = order.indexOf(b);
    if (ai >= 0 && bi >= 0) return ai - bi;
    if (ai >= 0) return -1;
    if (bi >= 0) return 1;
    return a.localeCompare(b);
  });
  for (const key of keys) {
    const val = obj[key];
    if (typeof val === 'string') {
      lines.push(`${inner}${key}: ${JSON.stringify(val)},`);
    } else if (typeof val === 'object' && val !== null && !Array.isArray(val)) {
      const subLines = toLines(val, indent + 1);
      lines.push(`${inner}${key}: {`);
      lines.push(...subLines);
      lines.push(`${inner}},`);
    }
  }
  return lines;
}

function buildLocale(name, obj) {
  const lines = toLines(obj, 1);
  return `  ${name}: {\n${lines.join('\n')}\n  }`;
}

const header = `// 多语言配置
export type Locale = 'zh' | 'en' | 'th' | 'vi';

export const defaultLocale: Locale = 'zh';

export const locales: Locale[] = ['zh', 'en', 'th', 'vi'];

export const localeNames: Record<Locale, string> = {
  zh: '中文',
  en: 'English',
  th: 'ไทย',
  vi: 'Tiếng Việt',
};

// 翻译内容
export const translations = {
`;

const footer = `};
`;

const body = [
  buildLocale('zh', zh),
  buildLocale('en', en),
  buildLocale('th', th),
  buildLocale('vi', vi),
].join(',\n');

const newContent = header + body + footer;

// Add BOM for Windows compatibility
const bom = '\uFEFF';
fs.writeFileSync('lib/i18n.ts', bom + newContent, 'utf8');
console.log('Done! File written with', newContent.length, 'chars');

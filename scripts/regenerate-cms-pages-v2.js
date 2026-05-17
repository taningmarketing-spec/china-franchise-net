/**
 * CMS 页面重新生成 v2 - 按照 franchisesearch.com.hk 风格
 * 
 * 风格特点：
 * - 深色渐变 Hero（藏青/深蓝）
 * - 白色卡片网格（2列布局）
 * - 左侧图标+标题+描述，右侧箭头
 * - 极简设计，浅灰背景
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// ============ 工具函数 ============

function heroSection(title, subtitle) {
  return `
    <section class="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 py-20 px-4">
      <div class="absolute inset-0 opacity-10">
        <div class="absolute top-10 left-10 w-72 h-72 bg-blue-400 rounded-full blur-3xl"></div>
        <div class="absolute bottom-10 right-10 w-96 h-96 bg-indigo-400 rounded-full blur-3xl"></div>
      </div>
      <div class="relative max-w-4xl mx-auto text-center">
        <h1 class="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">${title}</h1>
        <p class="text-lg text-blue-200/80 leading-relaxed">${subtitle}</p>
      </div>
    </section>`;
}

function sectionTitle(title, subtitle) {
  return `
    <div class="text-center mb-12">
      <h2 class="text-3xl font-bold text-slate-800 mb-3">${title}</h2>
      <p class="text-slate-500">${subtitle}</p>
    </div>`;
}

function cardGrid(cards, cols = 2) {
  const gridClass = cols === 4 
    ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6' 
    : 'grid grid-cols-1 md:grid-cols-2 gap-6';
  
  const cardHtml = cards.map(c => `
    <a href="${c.link || '#'}" class="group block bg-white rounded-xl p-8 shadow-sm border border-slate-100 hover:shadow-md hover:border-blue-200 transition-all duration-300">
      <div class="flex items-start justify-between">
        <div class="flex items-start gap-4 flex-1">
          <div class="w-12 h-12 rounded-lg bg-gradient-to-br ${c.iconBg} flex items-center justify-center text-2xl shrink-0">
            ${c.icon}
          </div>
          <div class="flex-1 min-w-0">
            <h3 class="text-lg font-semibold text-slate-800 mb-2 group-hover:text-blue-600 transition-colors">${c.title}</h3>
            <p class="text-sm text-slate-500 leading-relaxed">${c.desc}</p>
            ${c.tag ? `<span class="inline-block mt-3 text-xs font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">${c.tag}</span>` : ''}
          </div>
        </div>
        <svg class="w-5 h-5 text-slate-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all mt-1 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
      </div>
    </a>`).join('');
  
  return `<div class="${gridClass}">${cardHtml}</div>`;
}

function featureCard(icon, iconBg, title, desc, tag) {
  return cardGrid([{icon, iconBg, title, desc, tag, link: '#'}], 1);
}

function processStep(num, title, desc) {
  return `
    <div class="flex items-start gap-5 group">
      <div class="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-lg shadow-blue-600/25">
        ${num}
      </div>
      <div class="flex-1 pb-8 border-b border-slate-100 last:border-0">
        <h3 class="font-semibold text-slate-800 mb-1">${title}</h3>
        <p class="text-sm text-slate-500 leading-relaxed">${desc}</p>
      </div>
    </div>`;
}

function valueItem(icon, title, desc) {
  return `
    <div class="bg-white rounded-xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
      <div class="w-11 h-11 rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center text-xl mb-4">
        ${icon}
      </div>
      <h3 class="font-semibold text-slate-800 mb-2">${title}</h3>
      <p class="text-sm text-slate-500 leading-relaxed">${desc}</p>
    </div>`;
}

function ctaSection(title, desc, btnText) {
  return `
    <section class="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-12 text-center my-16">
      <h2 class="text-3xl font-bold text-white mb-4">${title}</h2>
      <p class="text-blue-100 mb-8 max-w-2xl mx-auto">${desc}</p>
      <a href="/zh/contact" class="inline-flex items-center gap-2 bg-white text-blue-600 font-semibold px-8 py-3 rounded-full hover:bg-blue-50 transition-colors shadow-lg">
        ${btnText}
        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
      </a>
    </section>`;
}

// ============ 页面内容定义 ============

const pages = {

  // ==================== 成为加盟商 (franchise) ====================
  franchise: {
    zh: {
      title: '成为加盟商',
      seoTitle: '成为加盟商 - 挞柠柠檬茶 | 海外加盟合作',
      seoDesc: '了解挞柠柠檬茶海外加盟流程、加盟优势与全方位支持。低门槛启动，总部全程扶持，助您轻松开启海外茶饮创业之路。',
      html: `
${heroSection(
  '成为加盟商',
  '携手挞柠，开启您的海外茶饮创业之旅。我们提供从选址到运营的全流程支持，让加盟变得简单高效。'
)}

<div class="max-w-6xl mx-auto px-4 py-16">

  <!-- 核心优势 -->
  ${sectionTitle('为什么选择加盟挞柠', '四大核心优势，为您的创业保驾护航')}

  <div class="mb-16">
    ${cardGrid([
      {icon: '🍋', iconBg: 'from-yellow-100 to-orange-100', title: '成熟品牌', desc: '国内600+门店成功运营经验，品牌知名度高，客源稳定', tag: '品牌实力'},
      {icon: '🌿', iconBg: 'from-green-100 to-emerald-100', title: '全产业链', desc: '自有茶园果园→原料工厂→门店运营，品质可控成本优', tag: '供应链'},
      {icon: '📊', iconBg: 'from-blue-100 to-cyan-100', title: '数据驱动', desc: '数字化运营系统，实时数据分析，科学决策提升效率', tag: '数字化'},
      {icon: '🤝', iconBg: 'from-purple-100 to-pink-100', title: '全程扶持', desc: '培训、选址、装修、开业、运营一站式服务，无忧创业', tag: '加盟支持'},
    ], 2)}
  </div>

  <!-- 加盟流程 -->
  ${sectionTitle('加盟流程', '六步轻松开启您的加盟之旅')}
  
  <div class="max-w-3xl mx-auto mb-16">
    ${processStep('1', '在线咨询', '提交加盟申请表，我们的团队将在24小时内与您联系，初步了解您的需求和预算。')}
    ${processStep('2', '资质审核', '评估加盟资格，包括资金能力、商圈位置、经营理念等多维度综合评估。')}
    ${processStep('3', '签约授权', '签订加盟合同，缴纳相关费用，正式成为挞柠加盟商，获得区域经营权。')}
    ${processStep('4', '门店筹备', '总部协助完成选址评估、店面设计、设备采购、人员招聘等筹备工作。')}
    ${processStep('5', '培训考核', '参加总部统一培训，包括产品制作、门店管理、营销推广等全科目学习。')}
    ${processStep('6', '盛大开业', '总部派驻督导协助开业，提供开业营销方案，正式开始营业。')}
  </div>

  <!-- 加盟支持 -->
  ${sectionTitle('全方位加盟支持', '从开店到盈利，每一步都有专业团队陪伴')}

  <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
    ${valueItem('🏫', '系统化培训', '15天封闭式培训，涵盖产品技术、门店管理、财务核算、营销策划等全套课程')}
    ${valueItem('📍', '专业选址', '大数据分析工具辅助选址，专业团队实地考察评估，确保店铺位置优质')}
    ${valueItem('🎨', '设计支持', '免费提供SI空间设计方案，统一品牌视觉形象，打造高颜值门店')}
    ${valueItem('📦', '供应链保障', '中央厨房统一配送核心原料，确保产品品质一致，降低采购成本')}
    ${valueItem('📱', '数字化运营', '智能POS系统+小程序点单+会员管理系统，实现精细化运营管理')}
    ${valueItem('📣', '营销推广', '总部统一策划营销活动，社交媒体运营指导，新店开业流量扶持')}
  </div>

  ${ctaSection('准备好开始了吗？', '填写加盟申请表，我们的专业顾问将在24小时内与您联系，为您提供详细的加盟方案和投资回报分析。', '立即申请加盟 →')}

</div>`
    },

    en: {
      title: 'Become a Franchisee',
      seoTitle: 'Become a Franchisee - Tanding Lemon Tea | Overseas Franchise',
      seoDesc: 'Learn about Tanding Lemon Tea overseas franchise process, advantages and full support. Low barrier to entry with headquarters support throughout.',
      html: `
${heroSection(
  'Become a Franchisee',
  'Partner with Tanding to start your overseas tea beverage business journey. We provide end-to-end support from site selection to operations.'
)}

<div class="max-w-6xl mx-auto px-4 py-16">

  ${sectionTitle('Why Choose Tanding', 'Four core advantages to protect your investment')}

  <div class="mb-16">
    ${cardGrid([
      {icon: '🍋', iconBg: 'from-yellow-100 to-orange-100', title: 'Established Brand', desc: '600+ successful stores in China, high brand awareness and stable customer base', tag: 'Brand Strength'},
      {icon: '🌿', iconBg: 'from-green-100 to-emerald-100', title: 'Full Supply Chain', desc: 'Own tea gardens & orchards → Factory → Store operations, quality control & cost optimization', tag: 'Supply Chain'},
      {icon: '📊', iconBg: 'from-blue-100 to-cyan-100', title: 'Data-Driven', desc: 'Digital operation system with real-time analytics for scientific decision-making', tag: 'Digital'},
      {icon: '🤝', iconBg: 'from-purple-100 to-pink-100', title: 'Full Support', desc: 'One-stop service: training, site selection, decoration, opening, operations', tag: 'Support'},
    ], 2)}
  </div>

  ${sectionTitle('Franchise Process', 'Six easy steps to start your journey')}
  
  <div class="max-w-3xl mx-auto mb-16">
    ${processStep('1', 'Online Inquiry', 'Submit your application. Our team will contact you within 24 hours to understand your needs.')}
    ${processStep('2', 'Qualification Review', 'Comprehensive assessment including financial capacity, location, and business philosophy.')}
    ${processStep('3', 'Sign Agreement', 'Sign the franchise contract, pay fees, and officially become a Tanding franchise partner.')}
    ${processStep('4', 'Store Preparation', 'Headquarters assists with site evaluation, design, equipment procurement, and hiring.')}
    ${processStep('5', 'Training', 'Attend HQ training covering product techniques, store management, marketing, and finance.')}
    ${processStep('6', 'Grand Opening', 'HQ supervisor assists with opening ceremony and launch marketing campaigns.')}
  </div>

  ${sectionTitle('Comprehensive Support', 'From opening to profitability, we are with you every step')}

  <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
    ${valueItem('🏫', 'Systematic Training', '15-day intensive program covering products, management, finance, and marketing')}
    ${valueItem('📍', 'Professional Site Selection', 'Big data tools + expert field evaluation for optimal store locations')}
    ${valueItem('🎨', 'Design Support', 'Free SI space design with unified brand visual identity')}
    ${valueItem('📦', 'Supply Chain', 'Central kitchen delivery ensuring consistent quality and lower costs')}
    ${valueItem('📱', 'Digital Operations', 'Smart POS + mini-program ordering + membership management system')}
    ${valueItem('📣', 'Marketing', 'HQ-planned campaigns, social media guidance, and new store traffic support')}
  </div>

  ${ctaSection('Ready to Start?', 'Submit your franchise application and our consultant will contact you within 24 hours.', 'Apply Now →')}

</div>`
    },

    th: {
      title: 'เป็นผู้รับสิทธิ์',
      seoTitle: 'เป็นผู้รับสิทธิ์ - Tanding Lemon Tea | แฟรนไชส์ต่างประเทศ',
      seoDesc: 'เรียนรู้กระบวนการแฟรนไชส์ Tanding Lemon Tea ข้อดีและการสนับสนุนทั้งหมด เริ่มต้นง่ายๆ พร้อมการสนับสนุนจากสำนักงานใหญ่',
      html: `
${heroSection(
  'เป็นผู้รับสิทธิ์',
  'ร่วมมือกับ Tanding เพื่อเริ่มต้นธุรกิจเครื่องดื่มชาต่างประเทศของคุณ เราให้การสนับสนุนตลอดจากการเลือกที่ตั้งไปจนถึงการดำเนินงาน'
)}

<div class="max-w-6xl mx-auto px-4 py-16">

  ${sectionTitle('ทำไมต้องเลือก Tanding', 'ข้อดีหลักสี่ประการเพื่อปกป้องการลงทุนของคุณ')}

  <div class="mb-16">
    ${cardGrid([
      {icon: '🍋', iconBg: 'from-yellow-100 to-orange-100', title: 'แบรนด์ที่โตแล้ว', desc: '600+ สาขาที่ประสบความสำเร็จในจีน มีการรู้จักแบรนด์สูง ลูกค้ามั่นคง', tag: 'แรงแบรนด์'},
      {icon: '🌿', iconBg: 'from-green-100 to-emerald-100', title: 'ห่วงโซ่อุปทานครบวงจร', desc: 'สวนชาเป็นของเอง → โรงงาน → ดำเนินงานร้าน ควบคุมคุณภาพและต้นทุน', tag: 'Supply Chain'},
      {icon: '📊', iconBg: 'from-blue-100 to-cyan-100', title: 'ขับเคลื่อนด้วยข้อมูล', desc: 'ระบบดิจิทัล วิเคราะห์ข้อมูลแบบเรียลไทม์ ตัดสินใจอย่างมีวิทยาศาสตร์', tag: 'ดิจิทัล'},
      {icon: '🤝', iconBg: 'from-purple-100 to-pink-100', title: 'สนับสนุนทั้งหมด', desc: 'บริการครบวงจร: ฝึกอบรม เลือกที่ตั้ง ตกแต่ง เปิดร้าน ดำเนินงาน', tag: 'สนับสนุน'},
    ], 2)}
  </div>

  ${sectionTitle('ขั้นตอนแฟรนไชส์', 'หกขั้นตอนง่ายๆ เพื่อเริ่มต้นการเดินทาง')}
  
  <div class="max-w-3xl mx-auto mb-16">
    ${processStep('1', 'สอบถามออนไลน์', 'ส่งใบสมัคร ทีมของเราจะติดต่อคุณภายใน 24 ชั่วโมง')}
    ${processStep('2', 'ตรวจสอบคุณสมบัติ', 'ประเมินความสามารถทางการเงิน ที่ตั้ง และปรัชญาธุรกิจ')}
    ${processStep('3', 'ลงนามสัญญา', 'ลงนามสัญญาแฟรนไชส์ ชำระค่าธรรมเนียม และเป็นพันธมิตรอย่างเป็นทางการ')}
    ${processStep('4', 'เตรียมการเปิดร้าน', 'สำนักงานใหญ่ช่วยเลือกที่ตั้ง ออกแบบ จัดซื้ออุปกรณ์ และรับสมัครพนักงาน')}
    ${processStep('5', 'ฝึกอบรม', 'เข้าร่วมการฝึกอบรมจากสำนักงานใหญ่ ครอบคลุมทุกด้าน')}
    ${processStep('6', 'เปิดร้านอย่างยิ่งใหญ่', 'ผู้ช่วยจากสำนักงานใหญ่ช่วยเปิดร้าน พร้อมแผนการตลาด')}
  </div>

  ${sectionTitle('การสนับสนุนทั้งหมด', 'จากการเปิดร้านไปจนถึงกำไร เราอยู่เคียงข้างคุณทุกขั้นตอน')}

  <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
    ${valueItem('🏫', 'การฝึกอบรมเป็นระบบ', 'โปรแกรม 15 วัน ครอบคลุมผลิตภัณฑ์ การจัดการ การเงิน และการตลาด')}
    ${valueItem('📍', 'เลือกที่ตั้งมืออาชีพ', 'เครื่องมือวิเคราะห์ข้อมูลขนาดใหญ่ + ทีมผู้เชี่ยวชาญประเมินในพื้นที่')}
    ${valueItem('🎨', 'การสนับสนุนการออกแบบ', 'การออกแบบพื้นที่ SI ฟรี พร้อมภาพลักษณ์แบรนด์ที่เป็นเอกภาพ')}
    ${valueItem('📦', 'ห่วงโซ่อุปทาน', 'จัดส่งวัตถุดิบหลักจากครัวกลาง รับประกันคุณภาพและต้นทุนต่ำ')}
    ${valueItem('📱', 'การดำเนินงานดิจิทัล', 'ระบบ POS อัจฉริยะ + สั่งซื้อมินิแอป + ระบบสมาชิก')}
    ${valueItem('📣', 'การตลาด', 'แผนการตลาดจากสำนักงานใหญ่ คำแนะนำโซเชียลมีเดีย และการส่งเสริมร้านใหม่')}
  </div>

  ${ctaSection('พร้อมเริ่มต้นแล้วหรือยัง?', 'ส่งใบสมัครแฟรนไชส์และที่ปรึกษาของเราจะติดต่อคุณภายใน 24 ชั่วโมง', 'สมัครตอนนี้ →')}

</div>`
    },

    vi: {
      title: 'Trở thành đối tác nhượng quyền',
      seoTitle: 'Trở thành đối tác nhượng quyền - Tanding Lemon Tea | Nhượng quyền nước ngoài',
      seoDesc: 'Tìm hiểu quy trình nhượng quyền Tanding Lemon Tea, lợi thế và hỗ trợ toàn diện. Khởi đầu dễ dàng với sự hỗ trợ từ trụ sở chính.',
      html: `
${heroSection(
  'Trở thành Đối tác Nhượng Quyền',
  'Hợp tác cùng Tanding để bắt đầu hành trình kinh doanh trà nước ngoài của bạn. Chúng tôi hỗ trợ từ A-Z, từ chọn địa điểm đến vận hành.'
)}

<div class="max-w-6xl mx-auto px-4 py-16">

  ${sectionTitle('Tại sao chọn Tanding', 'Bốn lợi thế cốt lõi bảo vệ đầu tư của bạn')}

  <div class="mb-16">
    ${cardGrid([
      {icon: '🍋', iconBg: 'from-yellow-100 to-orange-100', title: 'Thương hiệu trưởng thành', desc: '600+ cửa hàng thành công tại Trung Quốc, độ nhận biết thương hiệu cao, khách hàng ổn định', tag: 'Sức mạnh TT'},
      {icon: '🌿', iconBg: 'from-green-100 to-emerald-100', title: 'Chuỗi cung ứng đầy đủ', desc: 'Trà viên riêng → Nhà máy → Vận hành cửa hàng, kiểm soát chất lượng và chi phí', tag: 'Cung ứng'},
      {icon: '📊', iconBg: 'from-blue-100 to-cyan-100', title: 'Dữ liệu làm chủ', desc: 'Hệ thống số hóa, phân tích real-time, ra quyết định khoa học', tag: 'Số hóa'},
      {icon: '🤝', iconBg: 'from-purple-100 to-pink-100', title: 'Hỗ trợ toàn diện', desc: 'Dịch vụ trọn gói: đào tạo, chọn chỗ, trang trí, khai trương, vận hành', tag: 'Hỗ trợ'},
    ], 2)}
  </div>

  ${sectionTitle('Quy trình Nhượng Quyền', 'Sáu bước đơn giản để bắt đầu')}
  
  <div class="max-w-3xl mx-auto mb-16">
    ${processStep('1', 'Tư vấn trực tuyến', 'Nộp đơn đăng ký. Đội ngũ chúng tôi sẽ liên hệ trong 24 giờ')}
    ${processStep('2', 'Xem xét điều kiện', 'Đánh giá năng lực tài chính, vị trí, và triết lý kinh doanh')}
    ${processStep('3', 'Ký hợp đồng', 'Ký hợp đồng nhượng quyền, thanh toán phí, trở thành đối tác chính thức')}
    ${processStep('4', 'Chuẩn bị cửa hàng', 'Trụ sở chính hỗ trợ đánh giá vị trí, thiết kế, mua thiết bị, tuyển dụng')}
    ${processStep('5', 'Đào tạo', 'Tham gia đào tạo tại trụ sở: công nghệ sản phẩm, quản lý, marketing, tài chính')}
    ${processStep('6', 'Khai trương trọng đại', 'Giám sát từ trụ sở hỗ trợ khai trương, chiến dịch marketing ra mắt')}
  </div>

  ${sectionTitle('Hỗ trợ Toàn diện', 'Từ mở cửa đến có lãi, chúng tôi đồng hành cùng bạn')}

  <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
    ${valueItem('🏫', 'Đào tạo hệ thống', 'Chương trình 15 ngày: sản phẩm, quản lý, tài chính, marketing')}
    ${valueItem('📍', 'Chọn vị trí chuyên nghiệp', 'Công cụ dữ liệu lớn + chuyên gia thẩm định thực tế')}
    ${valueItem('🎨', 'Hỗ trợ thiết kế', 'Thiết kế không gian SI miễn phí, hình ảnh thương hiệu thống nhất')}
    ${valueItem('📦', 'Chuỗi cung ứng', 'Giao nguyên liệu từ bếp trung tâm, đảm bảo chất lượng và chi phí thấp')}
    ${valueItem('📱', 'Vận hành số hóa', 'POS thông minh + đặt hàng mini app + quản lý thành viên')}
    ${valueItem('📣', 'Marketing', 'Kế hoạch marketing từ trụ sở, hướng dẫn mạng xã hội, hỗ trợ traffic cửa hàng mới')}
  </div>

  ${ctaSection('Sẵn sàng bắt đầu?', 'Nộp đơn đăng ký nhượng quyền, chuyên gia của chúng tôi sẽ liên hệ trong 24 giờ.', 'Đăng ký ngay →')}

</div>`
    }
  },

  // ==================== 成为加盟主 (franchisee) ====================
  franchisee: {
    zh: {
      title: '成为加盟主',
      seoTitle: '成为加盟主 - 挞柠柠檬茶 | 区域代理与合作',
      seoDesc: '成为挞柠柠檬茶区域加盟主或联合经营伙伴，共享品牌红利。灵活的合作模式，丰厚的利润空间，总部的全力支持。',
      html: `
${heroSection(
  '成为加盟主',
  '以加盟主的身份与挞柠合作，开拓区域市场，共享品牌成长红利。两种灵活模式供您选择。'
)}

<div class="max-w-6xl mx-auto px-4 py-16">

  <!-- 合作模式 -->
  ${sectionTitle('合作模式', '根据您的资源和目标，选择最适合的合作方式')}

  <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
    <!-- 区域代理 -->
    <div class="bg-white rounded-2xl p-10 shadow-sm border border-slate-100 hover:shadow-lg transition-shadow relative overflow-hidden">
      <div class="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-50 to-transparent rounded-bl-full"></div>
      <div class="relative">
        <div class="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-2xl mb-6 shadow-lg shadow-blue-500/25">🏢</div>
        <h3 class="text-2xl font-bold text-slate-800 mb-3">区域代理</h3>
        <p class="text-slate-500 mb-6 leading-relaxed">获得指定区域的独家代理权，负责区域内市场开拓、加盟商管理与运营支持。</p>
        
        <div class="space-y-4 mb-8">
          <div class="flex items-center gap-3">
            <div class="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center"><svg class="w-3.5 h-3.5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg></div>
            <span class="text-sm text-slate-600">指定城市/国家独家代理权</span>
          </div>
          <div class="flex items-center gap-3">
            <div class="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center"><svg class="w-3.5 h-3.5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg></div>
            <span class="text-sm text-slate-600">区域内加盟费分成收益</span>
          </div>
          <div class="flex items-center gap-3">
            <div class="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center"><svg class="w-3.5 h-3.5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg></div>
            <span class="text-sm text-slate-600">供应链差价利润空间</span>
          </div>
          <div class="flex items-center gap-3">
            <div class="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center"><svg class="w-3.5 h-3.5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg></div>
            <span class="text-sm text-slate-600">总部全方位培训与支持</span>
          </div>
        </div>

        <div class="inline-flex items-center gap-2 text-blue-600 font-medium cursor-pointer hover:text-blue-700">
          了解详情
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
        </div>
      </div>
    </div>

    <!-- 联合经营 -->
    <div class="bg-white rounded-2xl p-10 shadow-sm border border-slate-100 hover:shadow-lg transition-shadow relative overflow-hidden">
      <div class="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-indigo-50 to-transparent rounded-bl-full"></div>
      <div class="relative">
        <div class="w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center text-white text-2xl mb-6 shadow-lg shadow-indigo-500/25">🤝</div>
        <h3 class="text-2xl font-bold text-slate-800 mb-3">联合经营</h3>
        <p class="text-slate-500 mb-6 leading-relaxed">与挞柠共同投资设立区域公司，共担风险、共享收益，深度参与本地化运营决策。</p>
        
        <div class="space-y-4 mb-8">
          <div class="flex items-center gap-3">
            <div class="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center"><svg class="w-3.5 h-3.5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg></div>
            <span class="text-sm text-slate-600">与总部共同出资成立合资公司</span>
          </div>
          <div class="flex items-center gap-3">
            <div class="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center"><svg class="w-3.5 h-3.5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg></div>
            <span class="text-sm text-slate-600">按股权比例分享运营利润</span>
          </div>
          <div class="flex items-center gap-3">
            <div class="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center"><svg class="w-3.5 h-3.5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg></div>
            <span class="text-sm text-slate-600">深度参与本地化战略决策</span>
          </div>
          <div class="flex items-center gap-3">
            <div class="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center"><svg class="w-3.5 h-3.5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg></div>
            <span class="text-sm text-slate-600">风险共担，降低单方投入压力</span>
          </div>
        </div>

        <div class="inline-flex items-center gap-2 text-indigo-600 font-medium cursor-pointer hover:text-indigo-700">
          了解详情
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
        </div>
      </div>
    </div>
  </div>

  <!-- 我们期待的你 -->
  ${sectionTitle('我们期待的合作伙伴', '如果您符合以下条件，欢迎与我们联系')}

  <div class="bg-gradient-to-r from-slate-50 to-blue-50 rounded-2xl p-10 mb-16">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      <div class="text-center">
        <div class="text-3xl font-bold text-blue-600 mb-2">5年+</div>
        <div class="text-sm text-slate-600">行业从业经验</div>
      </div>
      <div class="text-center">
        <div class="text-3xl font-bold text-blue-600 mb-2">本地资源</div>
        <div class="text-sm text-slate-600">商圈/人脉/政府关系</div>
      </div>
      <div class="text-center">
        <div class="text-3xl font-bold text-blue-600 mb-2">认同品牌</div>
        <div class="text-sm text-slate-600">认可挞柠经营理念</div>
      </div>
      <div class="text-center">
        <div class="text-3xl font-bold text-blue-600 mb-2">长期承诺</div>
        <div class="text-sm text-slate-600">愿意深耕区域市场</div>
      </div>
    </div>
  </div>

  <!-- 总部支持 -->
  ${sectionTitle('总部提供的支持', '强大的后盾让您无后顾之忧')}

  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
    ${valueItem('💰', '资金支持', '灵活的付款方案、设备融资租赁、首批物料信用额度')}
    ${valueItem('👥', '团队派遣', '初期派遣核心管理团队驻场支持，快速搭建运营体系')}
    ${valueItem('📋', '标准化体系', '完整的SOP手册、培训教材、管理制度全部开放')}
    ${valueItem('🌐', '品牌授权', '官方品牌授权书、VI系统使用权、商标保护支持')}
  </div>

  ${ctaSection('让我们聊聊合作可能', '告诉我们您的资源优势和市场规划，我们将为您定制最合适的合作方案。', '联系我们 →')}

</div>`
    },

    en: {
      title: 'Become a Master Franchisee',
      seoTitle: 'Become a Master Franchisee - Tanding Lemon Tea | Area Partnership',
      seoDesc: 'Become a Tanding area master franchisee or joint venture partner. Flexible models, strong margins, full headquarters support.',
      html: `
${heroSection(
  'Become a Master Franchisee',
  'Partner with Tanding as a master franchisee to develop regional markets and share in brand growth. Two flexible models available.'
)}

<div class="max-w-6xl mx-auto px-4 py-16">

  ${sectionTitle('Partnership Models', 'Choose the model that fits your resources and goals')}

  <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
    <div class="bg-white rounded-2xl p-10 shadow-sm border border-slate-100 hover:shadow-lg transition-shadow relative overflow-hidden">
      <div class="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-50 to-transparent rounded-bl-full"></div>
      <div class="relative">
        <div class="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-2xl mb-6 shadow-lg shadow-blue-500/25">🏢</div>
        <h3 class="text-2xl font-bold text-slate-800 mb-3">Area Agent</h3>
        <p class="text-slate-500 mb-6 leading-relaxed">Obtain exclusive agency rights for a designated region, responsible for market development and franchisee management.</p>
        
        <div class="space-y-4 mb-8">
          <div class="flex items-center gap-3"><div class="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center"><svg class="w-3.5 h-3.5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg></div><span class="text-sm text-slate-600">Exclusive rights for city/country</span></div>
          <div class="flex items-center gap-3"><div class="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center"><svg class="w-3.5 h-3.5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg></div><span class="text-sm text-slate-600">Revenue share from franchise fees</span></div>
          <div class="flex items-center gap-3"><div class="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center"><svg class="w-3.5 h-3.5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg></div><span class="text-sm text-slate-600">Supply chain margin profits</span></div>
          <div class="flex items-center gap-3"><div class="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center"><svg class="w-3.5 h-3.5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg></div><span class="text-sm text-slate-600">Full HQ training and support</span></div>
        </div>
        <div class="inline-flex items-center gap-2 text-blue-600 font-medium cursor-pointer hover:text-blue-700">Learn More <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg></div>
      </div>
    </div>

    <div class="bg-white rounded-2xl p-10 shadow-sm border border-slate-100 hover:shadow-lg transition-shadow relative overflow-hidden">
      <div class="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-indigo-50 to-transparent rounded-bl-full"></div>
      <div class="relative">
        <div class="w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center text-white text-2xl mb-6 shadow-lg shadow-indigo-500/25">🤝</div>
        <h3 class="text-2xl font-bold text-slate-800 mb-3">Joint Venture</h3>
        <p class="text-slate-500 mb-6 leading-relaxed">Co-invest with Tanding to establish a regional company, sharing risks and rewards while deeply participating in local strategy.</p>
        
        <div class="space-y-4 mb-8">
          <div class="flex items-center gap-3"><div class="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center"><svg class="w-3.5 h-3.5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg></div><span class="text-sm text-slate-600">Joint venture company with HQ</span></div>
          <div class="flex items-center gap-3"><div class="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center"><svg class="w-3.5 h-3.5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg></div><span class="text-sm text-slate-600">Profit sharing by equity ratio</span></div>
          <div class="flex items-center gap-3"><div class="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center"><svg class="w-3.5 h-3.5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg></div><span class="text-sm text-slate-600">Deep involvement in local strategy</span></div>
          <div class="flex items-center gap-3"><div class="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center"><svg class="w-3.5 h-3.5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg></div><span class="text-sm text-slate-600">Shared risk reduces individual pressure</span></div>
        </div>
        <div class="inline-flex items-center gap-2 text-indigo-600 font-medium cursor-pointer hover:text-indigo-700">Learn More <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg></div>
      </div>
    </div>
  </div>

  ${sectionTitle('What We Look For', 'If you meet these criteria, we would love to hear from you')}

  <div class="bg-gradient-to-r from-slate-50 to-blue-50 rounded-2xl p-10 mb-16">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      <div class="text-center"><div class="text-3xl font-bold text-blue-600 mb-2">5+ Years</div><div class="text-sm text-slate-600">Industry experience</div></div>
      <div class="text-center"><div class="text-3xl font-bold text-blue-600 mb-2">Local Resources</div><div class="text-sm text-slate-600">Network & connections</div></div>
      <div class="text-center"><div class="text-3xl font-bold text-blue-600 mb-2">Brand Alignment</div><div class="text-sm text-slate-600">Share our vision</div></div>
      <div class="text-center"><div class="text-3xl font-bold text-blue-600 mb-2">Long-term View</div><div class="text-sm text-slate-600">Commitment to region</div></div>
    </div>
  </div>

  ${sectionTitle('Headquarters Support', 'Strong backing so you can focus on growth')}

  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
    ${valueItem('💰', 'Financial Support', 'Flexible payment plans, equipment leasing, credit for initial inventory')}
    ${valueItem('👥', 'Team Deployment', 'Core management team dispatched during startup phase')}
    ${valueItem('📋', 'Standardization', 'Complete SOP manuals, training materials, and management systems')}
    ${valueItem('🌐', 'Brand License', 'Official authorization, VI system access, trademark protection')}
  </div>

  ${ctasection("Let's Discuss Partnership", "Tell us about your resources and market plan, and we'll customize the best proposal.", "Contact Us →")}

</div>`
    },

    th: {
      title: 'เป็นผู้ให้สิทธิ์หลัก',
      seoTitle: 'เป็นผู้ให้สิทธิ์หลัก - Tanding Lemon Tea | พันธมิตรภูมิภาค',
      seoDesc: 'เป็นผู้ให้สิทธิ์หลักหรือพันธมิตรร่วมทุนของ Tanding แบบจำลองที่ยืดหยุ่น กำไรดี การสนับสนุนจากสำนักงานใหญ่ทั้งหมด',
      html: `
${heroSection(
  'เป็นผู้ให้สิทธิ์หลัก',
  'ร่วมมือกับ Tanding เป็นผู้ให้สิทธิ์หลักเพื่อพัฒนาตลาดภูมิภาค แบบจำลองสองแบบให้เลือก'
)}

<div class="max-w-6xl mx-auto px-4 py-16">

  ${sectionTitle('แบบจำลองการร่วมมือ', 'เลือกแบบที่เหมาะกับทรัพยากรและเป้าหมายของคุณ')}

  <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
    <div class="bg-white rounded-2xl p-10 shadow-sm border border-slate-100 hover:shadow-lg transition-shadow relative overflow-hidden">
      <div class="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-50 to-transparent rounded-bl-full"></div>
      <div class="relative">
        <div class="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-2xl mb-6 shadow-lg shadow-blue-500/25">🏢</div>
        <h3 class="text-2xl font-bold text-slate-800 mb-3">ตัวแทนภูมิภาค</h3>
        <p class="text-slate-500 mb-6 leading-relaxed">ได้รับสิทธิ์ตัวแทนผู้ขายส่วน exclusve สำหรับภูมิภาคที่กำหนด</p>
        <div class="space-y-4 mb-8">
          <div class="flex items-center gap-3"><div class="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center"><svg class="w-3.5 h-3.5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg></div><span class="text-sm text-slate-600">สิทธิ์ exclusve สำหรับเมือง/ประเทศ</span></div>
          <div class="flex items-center gap-3"><div class="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center"><svg class="w-3.5 h-3.5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg></div><span class="text-sm text-slate-600">แบ่งปันรายได้จากค่าธรรมเนียมแฟรนไชส์</span></div>
          <div class="flex items-center gap-3"><div class="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center"><svg class="w-3.5 h-3.5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg></div><span class="text-sm text-slate-600">กำไรจากห่วงโซ่อุปทาน</span></div>
          <div class="flex items-center gap-3"><div class="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center"><svg class="w-3.5 h-3.5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg></div><span class="text-sm text-slate-600">การฝึกอบรมและสนับสนุนจากสำนักงานใหญ่</span></div>
        </div>
        <div class="inline-flex items-center gap-2 text-blue-600 font-medium cursor-pointer hover:text-blue-700">เรียนรู้เพิ่มเติม <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg></div>
      </div>
    </div>

    <div class="bg-white rounded-2xl p-10 shadow-sm border border-slate-100 hover:shadow-lg transition-shadow relative overflow-hidden">
      <div class="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-indigo-50 to-transparent rounded-bl-full"></div>
      <div class="relative">
        <div class="w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center text-white text-2xl mb-6 shadow-lg shadow-indigo-500/25">🤝</div>
        <h3 class="text-2xl font-bold text-slate-800 mb-3">ร่วมทุน</h3>
        <p class="text-slate-500 mb-6 leading-relaxed">ร่วมลงทุนกับ Tanding เพื่อจัดตั้งบริษัทภูมิภาค แบ่งปันความเสี่ยงและผลประโยชน์</p>
        <div class="space-y-4 mb-8">
          <div class="flex items-center gap-3"><div class="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center"><svg class="w-3.5 h-3.5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg></div><span class="text-sm text-slate-600">บริษัทร่วมทุนกับสำนักงานใหญ่</span></div>
          <div class="flex items-center gap-3"><div class="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center"><svg class="w-3.5 h-3.5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg></div><span class="text-sm text-slate-600">แบ่งปันกำไรตามสัดส่วนหุ้น</span></div>
          <div class="flex items-center gap-3"><div class="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center"><svg class="w-3.5 h-3.5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg></div><span class="text-sm text-slate-600">มีส่วนร่วมลึกในกลยุงภาคในประเทศ</span></div>
          <div class="flex items-center gap-3"><div class="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center"><svg class="w-3.5 h-3.5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg></div><span class="text-sm text-slate-600">แบ่งปันความเสี่ยง ลดแรงกดดัน</span></div>
        </div>
        <div class="inline-flex items-center gap-2 text-indigo-600 font-medium cursor-pointer hover:text-indigo-700">เรียนรู้เพิ่มเติม <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg></div>
      </div>
    </div>
  </div>

  ${sectionTitle('ที่เรากำลังมองหา', 'หากคุณมีคุณสมบัติเหล่านี้ เราอยากได้ยินจากคุณ')}

  <div class="bg-gradient-to-r from-slate-50 to-blue-50 rounded-2xl p-10 mb-16">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      <div class="text-center"><div class="text-3xl font-bold text-blue-600 mb-2">5+ ปี</div><div class="text-sm text-slate-600">ประสบการณ์อุตสาหกรรม</div></div>
      <div class="text-center"><div class="text-3xl font-bold text-blue-600 mb-2">ทรัพยากรท้องถิ่น</div><div class="text-sm text-slate-600">เครือข่ายและความสัมพันธ์</div></div>
      <div class="text-center"><div class="text-3xl font-bold text-blue-600 mb-2">เห็นด้วยกับแบรนด์</div><div class="text-sm text-slate-600">แบ่งปันวิสัยทัศน์</div></div>
      <div class="text-center"><div class="text-3xl font-bold text-blue-600 mb-2">มุมมองระยะยาว</div><div class="text-sm text-slate-600">มุ่งมั่นกับภูมิภาค</div></div>
    </div>
  </div>

  ${sectionTitle('การสนับสนุนจากสำนักงานใหญ่', 'สนับสนุนที่แข็งแกร่งเพื่อให้คุมเน้นที่การเติบโต')}

  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
    ${valueItem('💰', 'การสนับสนุนทางการเงิน', 'แผนชำระเงินที่ยืดหยุ่น เช่าอุปกรณ์ เครดิตสินค้าคงคลัง')}
    ${valueItem('👥', 'การส่งทีม', 'ส่งทีมบริหารหลักระหว่างเริ่มต้น')}
    ${valueItem('📋', 'ระบบมาตรฐาน', 'คู่มือ SOP ครบถ้วน วัสดุการฝึกอบรม')}
    ${valueItem('🌐', 'ใบอนุญาตแบรนด์', 'การอนุญาตอย่างเป็นทางการ ระบบ VI')}
  </div>

  ${ctaSection('พูดคุยเรื่องการเป็นพันธมิตร', 'บอกเราเกี่ยวกับทรัพยากรและแผนการตลาดของคุณ', 'ติดต่อเรา →')}

</div>`
    },

    vi: {
      title: 'Trở thành Đối tác Chính',
      seoTitle: 'Trở thành Đối tác Chính - Tanding Lemon Tea | Hợp tác Khu vực',
      seoDesc: 'Trở thành đối tác chính hoặc liên doanh của Tanding. Mô hình linh hoạt, biên lợi nhuận cao, hỗ trợ đầy đủ từ trụ sở.',
      html: `
${heroSection(
  'Trở thành Đối tác Chính',
  'Hợp tác cùng Tanding với tư cách đối tác chính để phát triển thị trường khu vực. Hai mô hình linh hoạt.'
)}

<div class="max-w-6xl mx-auto px-4 py-16">

  ${sectionTitle('Mô hình Hợp tác', 'Chọn mô hình phù hợp với nguồn lực và mục tiêu của bạn')}

  <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
    <div class="bg-white rounded-2xl p-10 shadow-sm border border-slate-100 hover:shadow-lg transition-shadow relative overflow-hidden">
      <div class="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-50 to-transparent rounded-bl-full"></div>
      <div class="relative">
        <div class="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-2xl mb-6 shadow-lg shadow-blue-500/25">🏢</div>
        <h3 class="text-2xl font-bold text-slate-800 mb-3">Đại Diện Khu vực</h3>
        <p class="text-slate-500 mb-6 leading-relaxed">Nhận quyền đại diện độc quyền cho khu vực được chỉ định, phụ trách phát triển thị trường.</p>
        <div class="space-y-4 mb-8">
          <div class="flex items-center gap-3"><div class="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center"><svg class="w-3.5 h-3.5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg></div><span class="text-sm text-slate-600">Quyền độc quyền cho thành phố/quốc gia</span></div>
          <div class="flex items-center gap-3"><div class="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center"><svg class="w-3.5 h-3.5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg></div><span class="text-sm text-slate-600">Chia sẻ doanh thu từ phí nhượng quyền</span></div>
          <div class="flex items-center gap-3"><div class="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center"><svg class="w-3.5 h-3.5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg></div><span class="text-sm text-slate-600">Lợi nhuận biên chuỗi cung ứng</span></div>
          <div class="flex items-center gap-3"><div class="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center"><svg class="w-3.5 h-3.5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg></div><span class="text-sm text-slate-600">Đào tạo và hỗ trợ đầy đủ từ trụ sở</span></div>
        </div>
        <div class="inline-flex items-center gap-2 text-blue-600 font-medium cursor-pointer hover:text-blue-700">Tìm hiểu thêm <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg></div>
      </div>
    </div>

    <div class="bg-white rounded-2xl p-10 shadow-sm border border-slate-100 hover:shadow-lg transition-shadow relative overflow-hidden">
      <div class="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-indigo-50 to-transparent rounded-bl-full"></div>
      <div class="relative">
        <div class="w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center text-white text-2xl mb-6 shadow-lg shadow-indigo-500/25">🤝</div>
        <h3 class="text-2xl font-bold text-slate-800 mb-3">Liên doanh</h3>
        <p class="s late-500 mb-6 leading-relaxed">Đầu tư chung với TANDING thành lập công ty khu vực, chia sẻ rủi ro và lợi nhuận.</p>
        <div class="space-y-4 mb-8">
          <div class="flex items-center gap-3"><div class="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center"><svg class="w-3.5 h-3.5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg></div><span class="text-sm text-slate-600">Công ty liên doanh với trụ sở chính</span></div>
          <div class="flex items-center gap-3"><div class="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center"><svg class="w-3.5 h-3.5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg></div><span class="text-sm text-slate-600">Chia sẻ lợi nhuận theo tỷ lệ cổ phần</span></div>
          <div class="flex items-center gap-3"><div class="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center"><svg class="w-3.5 h-3.5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg></div><span class="text-sm text-slate-600">Tham gia sâu vào chiến lược địa phương</span></div>
          <div class="flex items-center gap-3"><div class="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center"><svg class="w-3.5 h-3.5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg></div><span class="text-sm text-slate-600">Chia sẻ rủi ro, giảm áp lực cá nhân</span></div>
        </div>
        <div class="inline-flex items-center gap-2 text-indigo-600 font-medium cursor-pointer hover:text-indigo-700">Tìm hiểu thêm <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg></div>
      </div>
    </div>
  </div>

  ${sectionTitle('Điều Chúng Tôi Tìm Kiếm', 'Nếu bạn đáp ứng các tiêu chí này, chúng tôi muốn nghe từ bạn')}

  <div class="bg-gradient-to-r from-slate-50 to-blue-50 rounded-2xl p-10 mb-16">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      <div class="text-center"><div class="text-3xl font-bold text-blue-600 mb-2">5+ Năm</div><div class="text-sm text-slate-600">Kinh nghiệm ngành</div></div>
      <div class="text-center"><div class="text-3xl font-bold text-blue-600 mb-2">Nguồn lực Địa phương</div><div class="text-sm text-slate-600">Mạng lưới & quan hệ</div></div>
      <div class="text-center"><div class="text-3xl font-bold text-blue-600 mb-2"> Đồng thuận Thương hiệu</div><div class="text-sm text-slate-600">Chia sẻ tầm nhìn</div></div>
      <div class="text-center"><div class="text-3xl font-bold text-blue-600 mb-2">Dài hạn</div><div class="text-sm text-slate-600">Cam kết với khu vực</div></div>
    </div>
  </div>

  ${sectionTitle('Hỗ trợ từ Trụ sở', 'Sự hỗ trợ mạnh mẽ để bạn tập trung tăng trưởng')}

  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
    ${valueItem('💰', 'Hỗ trợ Tài chính', 'Thanh toán linh hoạt, thuê thiết bị, tín dụng hàng tồn kho')}
    ${valueItem('👥', 'Đội nhóm Điều phối', 'Gửi đội ngũ quản lý cốt lõi trong giai đoạn khởi động')}
    ${valueItem('📋', 'Tiêu chuẩn Hóa', 'SOP đầy đủ, tài liệu đào tạo, hệ thống quản lý')}
    ${valueItem('🌐', 'Bản quyền Thương hiệu', 'Ủy quyền chính thức, hệ thống VI, bảo vệ thương hiệu')}
  </div>

  ${ctaSection('Hãy Thảo luận về Hợp tác', 'Cho chúng tôi biết về nguồn lực và kế hoạch thị trường của bạn.', 'Liên hệ ngay →')}

</div>`
    }
  },

  // ==================== 关于我们 (about) ====================
  about: {
    zh: {
      title: '关于我们',
      seoTitle: '关于我们 - 中国国际加盟网 | 海外加盟服务平台',
      seoDesc: '中国国际加盟网是专业的海外加盟服务平台，连接中国优秀品牌与全球创业者。提供加盟咨询、品牌展示、行业资讯等一站式服务。',
      html: `
${heroSection(
  '关于我们',
  '中国国际加盟网 — 连接中国优秀品牌与全球创业者的专业桥梁'
)}

<div class="max-w-6xl mx-auto px-4 py-16">

  <!-- 品牌故事 -->
  ${sectionTitle('我们的故事', '从一杯好茶出发，走向世界')}

  <div class="bg-white rounded-2xl p-10 shadow-sm border border-slate-100 mb-16">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
      <div>
        <p class="text-slate-600 leading-loose mb-4">
          中国国际加盟网诞生于一个简单的愿景：<strong>让中国优秀的餐饮品牌走向世界</strong>。
        </p>
        <p class="text-slate-600 leading-loose mb-4">
          我们深知，每一个成功的品牌背后，都有一套可复制的经营体系；每一位创业者，都值得拥有一个可靠的合作伙伴。
        </p>
        <p class="text-slate-600 leading-loose">
          因此，我们搭建了这个平台——汇聚经过市场验证的优质品牌，为全球创业者提供从<strong>咨询→匹配→培训→开业→运营</strong>的全链路服务。
        </p>
      </div>
      <div class="grid grid-cols-2 gap-4">
        <div class="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 text-center">
          <div class="text-3xl font-bold text-blue-600 mb-1">600+</div>
          <div class="text-sm text-slate-500">覆盖品牌门店</div>
        </div>
        <div class="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 text-center">
          <div class="text-3xl font-bold text-green-600 mb-1">20+</div>
          <div class="text-sm text-slate-500">覆盖国家和地区</div>
        </div>
        <div class="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-6 text-center">
          <div class="text-3xl font-bold text-orange-600 mb-1">5000+</div>
          <div class="text-sm text-slate-500">服务创业者</div>
        </div>
        <div class="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 text-center">
          <div class="text-3xl font-bold text-purple-600 mb-1">98%</div>
          <div class="text-sm text-slate-500">客户满意度</div>
        </div>
      </div>
    </div>
  </div>

  <!-- 核心价值 -->
  ${sectionTitle('核心价值观', '指引我们前行的信念')}

  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
    ${valueItem('🎯', '真实可靠', '每一个品牌都经过严格筛选和实地考察，确保信息真实可信')}
    ${valueItem('🌍', '全球视野', '立足中国，面向世界，助力中国品牌国际化发展')}
    ${valueItem('⚡', '高效匹配', 'AI驱动的品牌-创业者智能匹配系统，快速找到最适合的项目')}
    ${valueItem('💡', '持续创新', '不断优化平台功能和服务体验，引领行业发展方向')}
  </div>

  <!-- 业务版图 -->
  ${sectionTitle('业务版图', '六大板块构建完整生态')}

  <div class="mb-16">
    ${cardGrid([
      {icon: '🍵', iconBg: 'from-yellow-100 to-orange-100', title: '挞柠国际（香港）', desc: '负责挞柠品牌的海外运营与国际市场拓展', tag: '品牌运营'},
      {icon: '🏪', iconBg: 'from-green-100 to-emerald-100', title: '广州挞柠餐饮', desc: '挞柠中国区运营管理，全国600+门店的连锁体系', tag: '连锁管理'},
      {icon: '🌾', iconBg: 'from-lime-100 to-green-100', title: '潮州味满多农场', desc: '自有茶园与果园基地，从源头把控原料品质', tag: '原料种植'},
      {icon: '🏭', iconBg: 'from-slate-100 to-gray-100', title: '潮州顶益食品', desc: '茶饮料原料生产基地，为核心产品提供稳定供应', tag: '生产制造'},
      {icon: '✈️', iconBg: 'from-blue-100 to-cyan-100', title: '荔云山文旅', desc: '文旅投资板块，探索茶文化+旅游融合发展新模式', tag: '文旅投资'},
      {icon: '🌐', iconBg: 'from-indigo-100 to-purple-100', title: '问展国际网', desc: '全球会展综合服务平台，连接展会资源与商业机会', tag: '会展服务'},
    ], 2)}
  </div>

  <!-- 联系我们 CTA -->
  ${ctaSection('想了解更多？', '无论您是想加盟创业，还是希望品牌出海，我们都期待与您交流。', '联系我们 →')}

</div>`
    },

    en: {
      title: 'About Us',
      seoTitle: 'About Us - China Franchise Net | Overseas Franchise Platform',
      seoDesc: 'China Franchise Net is a professional overseas franchise platform connecting Chinese brands with global entrepreneurs. One-stop franchise services.',
      html: `
${heroSection(
  'About Us',
  'China Franchise Net — The professional bridge connecting excellent Chinese brands with global entrepreneurs'
)}

<div class="max-w-6xl mx-auto px-4 py-16">

  ${sectionTitle('Our Story', 'Starting from a great cup of tea, reaching the world')}

  <div class="bg-white rounded-2xl p-10 shadow-sm border border-slate-100 mb-16">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
      <div>
        <p class="text-slate-600 leading-loose mb-4">
          China Franchise Net was born from a simple vision: <strong>To help outstanding Chinese F&B brands go global</strong>.
        </p>
        <p class="text-slate-600 leading-loose mb-4">
          We know that behind every successful brand lies a replicable business system; and every entrepreneur deserves a reliable partner.
        </p>
        <p class="text-slate-600 leading-loose">
          That's why we built this platform — gathering market-proven quality brands to provide entrepreneurs worldwide with a full-chain service from <strong>consulting → matching → training → opening → operations</strong>.
        </p>
      </div>
      <div class="grid grid-cols-2 gap-4">
        <div class="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 text-center">
          <div class="text-3xl font-bold text-blue-600 mb-1">600+</div>
          <div class="text-sm text-slate-500">Brand Stores</div>
        </div>
        <div class="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 text-center">
          <div class="text-3xl font-bold text-green-600 mb-1">20+</div>
          <div class="text-sm text-slate-500">Countries & Regions</div>
        </div>
        <div class="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-6 text-center">
          <div class="text-3xl font-bold text-orange-600 mb-1">5000+</div>
          <div class="text-sm text-slate-500">Entrepreneurs Served</div>
        </div>
        <div class="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 text-center">
          <div class="text-3xl font-bold text-purple-600 mb-1">98%</div>
          <div class="text-sm text-slate-500">Satisfaction Rate</div>
        </div>
      </div>
    </div>
  </div>

  ${sectionTitle('Core Values', 'The beliefs that guide us forward')}

  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
    ${valueItem('🎯', 'Authenticity', 'Every brand is strictly screened and verified for trustworthy information')}
    ${valueItem('🌍', 'Global Vision', 'Based in China, serving the world, helping brands go international')}
    ${valueItem('⚡', 'Efficient Matching', 'AI-powered brand-entrepreneur matching system')}
    ${valueItem('💡', 'Continuous Innovation', 'Constantly improving platform experience and industry leadership')}
  </div>

  ${sectionTitle('Business Ecosystem', 'Six pillars building a complete ecosystem')}

  <div class="mb-16">
    ${cardGrid([
      {icon: '🍵', iconBg: 'from-yellow-100 to-orange-100', title: 'Tanding Int\'l (HK)', desc: 'Overseas operations and international market expansion', tag: 'Brand Ops'},
      {icon: '🏪', iconBg: 'from-green-100 to-emerald-100', title: 'Guangzhou Tanding', desc: 'China operations managing 600+ stores nationwide', tag: 'Chain Mgmt'},
      {icon: '🌾', iconBg: 'from-lime-100 to-green-100', title: 'Weimanduo Farm', desc: 'Own tea gardens and orchards for source-quality control', tag: 'Farming'},
      {icon: '🏭', iconBg: 'from-slate-100 to-gray-100', title: 'Chaoding Food', desc: 'Tea beverage ingredient production base', tag: 'Manufacturing'},
      {icon: '✈️', iconBg: 'from-blue-100 to-cyan-100', title: 'Liyunshan Culture', desc: 'Cultural tourism investment exploring tea+culture fusion', tag: 'Tourism'},
      {icon: '🌐', iconBg: 'from-indigo-100 to-purple-100', title: 'Wenzhan Expo', desc: 'Global exhibition platform connecting events and opportunities', tag: 'Expo Services'},
    ], 2)}
  </div>

  ${ctaSection('Want to Know More?', 'Whether you want to franchise or expand your brand globally, we look forward to connecting.', 'Contact Us →')}

</div>`
    },

    th: {
      title: 'เกี่ยวกับเรา',
      seoTitle: 'เกี่ยวกับเรา - China Franchise Net | แพลตฟอร์มแฟรนไชส์ต่างประเทศ',
      seoDesc: 'China Franchise Net เป็นแพลตฟอร์มแฟรนไชส์ต่างประเทศมืออาชีพ เชื่อมต่อแบรนด์จีนกับผู้ประกอบการทั่วโลก',
      html: `
${heroSection(
  'เกี่ยวกับเรา',
  'China Franchise Net — สะพานมืออาชีพเชื่อมต่อแบรนด์จีนที่ดีที่สุดกับผู้ประกอบการทั่วโลก'
)}

<div class="max-w-6xl mx-auto px-4 py-16">

  ${sectionTitle('เรื่องราวของเรา', 'เริ่มจากแก้วชาที่ดี ไปสู่ทั่วโลก')}

  <div class="bg-white rounded-2xl p-10 shadow-sm border border-slate-100 mb-16">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
      <div>
        <p class="text-slate-600 leading-loose mb-4">
          China Franchise Net เกิดจากวิสัยทัศน์ที่เรียบง่าย: <strong>ช่วยแบรนด์ F&B จีนที่ยอดเยี่ยมไปสู่สากล</strong>
        </p>
        <p class="text-slate-600 leading-loose mb-4">
          เรารู้ดีว่า หลังแบรนด์ที่ประสบความสำเร็จทุกแบรนด์ มีระบบธุรกิจที่ทำซ้ำได้ และผู้ประกอบการทุกคนสมควรได้รับพันธมิตรที่เชื่อถือได้
        </p>
        <p class="text-slate-600 leading-loose">
          ด้วยเหตุนี้ เราจึงสร้างแพลตฟอร์มนี้ — รวบรวมแบรนด์คุณภาพที่ผ่านการทดสอบทางตลาด เพื่อให้บริการแบบครบวงจรตั้งแต่ <strong>ปรึกษา → จับคู่ → ฝึกอบรม → เปิดร้าน → ดำเนินงาน</strong>
        </p>
      </div>
      <div class="grid grid-cols-2 gap-4">
        <div class="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 text-center">
          <div class="text-3xl font-bold text-blue-600 mb-1">600+</div>
          <div class="text-sm text-slate-500">สาขาแบรนด์</div>
        </div>
        <div class="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 text-center">
          <div class="text-3xl font-bold text-green-600 mb-1">20+</div>
          <div class="text-sm text-slate-500">ประเทศและภูมิภาค</div>
        </div>
        <div class="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-6 text-center">
          <div class="text-3xl font-bold text-orange-600 mb-1">5000+</div>
          <div class="text-sm text-slate-500">ผู้ประกอบการ</div>
        </div>
        <div class="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 text-center">
          <div class="text-3xl font-bold text-purple-600 mb-1">98%</div>
          <div class="text-sm text-slate-500">อัตราพึงพอใจ</div>
        </div>
      </div>
    </div>
  </div>

  ${sectionTitle('ค่านิยมหลัก', 'ความเชื่อที่นำทางเรา')}

  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
    ${valueItem('🎯', 'ความน่าเชื่อถือ', 'ทุกแบรนด์ผ่านการคัดเลือกและตรวจสอบอย่างเข้มงวด')}
    ${valueItem('🌍', 'วิสัยทัศน์โลก', 'มีฐานที่จีน ให้บริการทั่วโลก ช่วยแบรนด์ไปสากล')}
    ${valueItem('⚡', 'การจับคู่ที่มีประสิทธิภาพ', 'ระบบ AI จับคู่แบรนด์-ผู้ประกอบการอัจฉริยะ')}
    ${valueItem('💡', 'นวัตกรรมต่อเนื่อง', 'ปรับปรุงแพลตฟอร์มและบริการอย่างต่อเนื่อง')}
  </div>

  ${sectionTitle('ระบบนิเวศธุรกิจ', 'หกเสาหลักสร้างระบบนิเวศที่สมบูรณ์')}

  <div class="mb-16">
    ${cardGrid([
      {icon: '🍵', iconBg: 'from-yellow-100 to-orange-100', title: 'Tanding Int\'l (HK)', desc: 'ดำเนินงานต่างประเทศและขยายตลาดนานาชาติ', tag: 'ดำเนินงานแบรนด์'},
      {icon: '🏪', iconBg: 'from-green-100 to-emerald-100', title: 'Guangzhou Tanding', desc: 'ดำเนินงานในจีน จัดการ 600+ สาขาทั่วประเทศ', tag: 'จัดการสาขา'},
      {icon: '🌾', iconBg: 'from-lime-100 to-green-100', title: 'Weimanduo Farm', desc: 'สวนชาและสวนผลไม้เป็นของเอง ควบคุมคุณภาพตั้งแต่ต้นน้ำ', tag: 'การเกษตร'},
      {icon: '🏭', iconBg: 'from-slate-100 to-gray-100', title: 'Chaoding Food', desc: 'ฐานการผลิตวัตถุดิบเครื่องดื่มชา', tag: 'การผลิต'},
      {icon: '✈️', iconBg: 'from-blue-100 to-cyan-100', title: 'Liyunshan Culture', desc: 'การลงทุนท่องเที่ยววัฒนธรรม สำรวจชา+วัฒนธรรม', tag: 'ท่องเที่ยว'},
      {icon: '🌐', iconBg: 'from-indigo-100 to-purple-100', title: 'Wenzhan Expo', desc: 'แพลตฟอร์มนิทรรศนะโลก เชื่อมต่องานแสดงและโอกาส', tag: 'บริการนิทรรศนะ'},
    ], 2)}
  </div>

  ${ctaSection('อยากรู้เพิ่มเติม?', 'ไม่ว่าคุณต้องการแฟรนไชส์หรือขยายแบรนด์สู่สากล เราอยากพูดคุยกับคุณ', 'ติดต่อเรา →')}

</div>`
    },

    vi: {
      title: 'Về Chúng tôi',
      seoTitle: 'Về Chúng tôi - China Franchise Net | Nền tảng Nhượng quyền Quốc tế',
      seoDesc: 'China Franchise Net là nền tảng nhượng quyền quốc tế chuyên nghiệp kết nối thương hiệu Trung Quốc với nhà khởi nghiệp toàn cầu.',
      html: `
${heroSection(
  'Về Chúng tôi',
  'China Franchise Net — Cầu nối chuyên nghiệp kết nối thương hiệu Trung Quốc xuất sắc với nhà khởi nghiệp toàn cầu'
)}

<div class="max-w-6xl mx-auto px-4 py-16">

  ${sectionTitle('Câu chuyện của Chúng tôi', 'Bắt đầu từ một ly trà ngon, vươn ra thế giới')}

  <div class="bg-white rounded-2xl p-10 shadow-sm border border-slate-100 mb-16">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
      <div>
        <p class="text-slate-600 leading-loose mb-4">
          China Franchise Net sinh ra từ một tầm nhìn đơn giản: <strong>Giúp các thương hiệu F&B Trung Quốc xuất sắc đi toàn cầu</strong>.
        </p>
        <p class="text-slate-600 leading-loose mb-4">
          Chúng tôi hiểu rằng, đằng sau mỗi thương hiệu thành công là một hệ thống kinh doanh có thể sao chép; và mỗi nhà khởi xứng đáng có một đối tác đáng tin cậy.
        </p>
        <p class="text-slate-600 leading-loose">

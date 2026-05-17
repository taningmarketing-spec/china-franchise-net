/**
 * 为海外加盟学院4个栏目添加示例文章
 * 每个栏目5篇文章，每篇4个语言版本
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// 文章内容已在上面的write调用中定义，这里使用简化版本
const ARTICLES = {
  'overseas-dynamic': [
    { slug: 'southeast-asia-franchise-boom-2026', zhTitle: '2026年东南亚特许加盟市场迎来爆发式增长', enTitle: 'Southeast Asia Franchise Market Sees Explosive Growth in 2026', thTitle: 'ตลาดแฟรนไชส์เอเชียตะวันออกเฉียงใต้เติบโตอย่างก้าวกระโดดในปี 2026', viTitle: 'Thị trường nhượng quyền Đông Nam Á tăng trưởng bùng nổ năm 2026' },
    { slug: 'taning-opens-50th-thailand-store', zhTitle: '挞柠柠檬茶泰国门店突破50家，加速东南亚布局', enTitle: 'Taning Lemon Tea Surpasses 50 Stores in Thailand', thTitle: 'Taning Lemon Tea ทะลุ 50 สาขาในประเทศไทย', viTitle: 'Taning Lemon Tea vượt 50 cửa hàng tại Thái Lan' },
    { slug: 'franchise-fair-bangkok-2026', zhTitle: '2026曼谷国际特许加盟博览会圆满落幕', enTitle: 'Bangkok International Franchise Fair 2026 Concludes Successfully', thTitle: 'งานแสดงแฟรนไชส์นานาชาติกรุงเทพฯ 2026 จัดสำเร็จ', viTitle: 'Triển lãm Nhượng quyền Quốc tế Bangkok 2026 kết thúc thành công' },
    { slug: 'vietnam-franchise-regulation-update', zhTitle: '越南修订特许经营法规，降低外资准入门槛', enTitle: 'Vietnam Revises Franchise Regulations, Lowering Barriers for Foreign Investment', thTitle: 'เวียดนามแก้ไขกฎระเบียบแฟรนไชส์ ลดอุปสรรคการลงทุนต่างชาติ', viTitle: 'Việt Nam sửa đổi quy định nhượng quyền, giảm rào cản cho đầu tư nước ngoài' },
    { slug: 'indonesia-halal-certification-guide', zhTitle: '印尼清真认证新规对餐饮加盟的影响解读', enTitle: 'Understanding the Impact of Indonesia\'s New Halal Certification Rules on F&B Franchises', thTitle: 'ทำความเข้าใจผลกระทบของกฎระเบียบใบรับรอง Halal ใหม่ของอินโดนีเซียต่อแฟรนไชส์อาหาร', viTitle: 'Tìm hiểu tác động của quy định chứng nhận Halal mới của Indonesia đối với nhượng quyền F&B' },
  ],
  'overseas-case': [
    { slug: 'chagee-malaysia-success-story', zhTitle: '霸王茶姬马来西亚扩张之路：从1家到30家的创业故事', enTitle: 'Chagee Malaysia Expansion Journey: From 1 to 30 Stores Success Story', thTitle: 'เส้นทางการขยาย Chagee มาเลเซีย: จาก 1 สู่ 30 สาขา', viTitle: 'Hành trình mở rộng Chagee Malaysia: Từ 1 đến 30 cửa hàng' },
    { slug: 'luckin-singapore-strategy', zhTitle: '瑞幸咖啡新加坡市场突破：数字化运营的胜利', enTitle: 'Luckin Coffee Singapore Breakthrough: Victory of Digital Operations', thTitle: 'Luckin Coffee บุกตลาดสิงคโปร์: ชัยชนะจากการดำเนินงานดิจิทัล', viTitle: 'Luckin Coffee đột phá Singapore: Chiến thắng từ vận hành số hóa' },
    { slug: 'yang-guofu-thailand-story', zhTitle: '杨国福麻辣烫泰国创业记：从街边小店到连锁品牌', enTitle: 'Yang Guofu Malatang Thailand Story: From Street Stall to Chain Brand', thTitle: 'เรื่องราว Yang Guofu Malatang ในไทย: จากรถเข็นสู่แบรนด์แฟรนไชส์', viTitle: 'Câu chuyện Yang Guofu Malatang tại Thái Lan: Từ quầy vỉa hè đến thương hiệu chuỗi' },
    { slug: 'bubble-tea-vietnam-expansion', zhTitle: '茶饮品牌越南扩张案例分析：如何在这个年轻市场站稳脚跟', enTitle: 'Bubble Tea Brand Vietnam Expansion Case Study: How to Establish in This Young Market', thTitle: 'กรณีศึกษาการขยายแบรนด์ชาเข็มในเวียดนาม: วิธียืนหยัดในตลาดหนุ่มสาว', viTitle: 'Nghiên cứu mở rộng thương hiệu trà sữa tại Việt Nam: Cách đứng vững ở thị trường trẻ' },
    { slug: 'dessert-brand-myanmar-entry', zhTitle: '甜品品牌进入缅甸市场：机遇与挑战并存', enTitle: 'Dessert Brand Enters Myanmar Market: Opportunities and Challenges', thTitle: 'แบรนด์ขนมหวานเข้าสู่ตลาดพม่า: โอกาสและความท้าทายคู่กัน', viTitle: 'Thương hiệu tráng miệng gia nhập thị trường Myanmar: Cơ hội và thách thức song hành' },
  ],
  'overseas-tips': [
    { slug: 'franchise-agreement-checklist', zhTitle: '海外加盟合同必读：这10个条款一定要仔细审核', enTitle: 'Franchise Agreement Must-Read: 10 Clauses You Must Carefully Review', thTitle: 'สิ่งที่ต้องอ่านในสัญญาแฟรนไชส์ต่างประเทศ: 10 ข้อที่ต้องตรวจสอบอย่างละเอียด', viTitle: 'Hợp đồng nhượng quyền cần đọc: 10 điều khoản cần xem xét kỹ' },
    { slug: 'overseas-site-selection', zhTitle: '海外开店选址指南：这5个因素决定成败', enTitle: 'Overseas Store Location Guide: 5 Factors That Determine Success', thTitle: 'คู่มือเลือกทำเลร้านต่างประเทศ: 5 ปัจจัยที่กำหนดความสำเร็จ', viTitle: 'Hướng dẫn chọn vị trí mở cửa hàng nước ngoài: 5 yếu tố quyết định thành bại' },
    { slug: 'localization-strategy', zhTitle: '品牌出海本地化策略：不是翻译就够了', enTitle: 'Brand Localization Strategy for Going Global: Translation Is Not Enough', thTitle: 'กลยุทธ์การปรับท้องถิ่นสำหรับแบรนด์ขยายต่างประเทศ: การแปลอย่างเดียวไม่พอ', viTitle: 'Chiến lược địa phương hóa thương hiệu ra nước ngoài: Dịch thôi là chưa đủ' },
    { slug: 'supply-chain-setup', zhTitle: '海外供应链搭建：从0到1的完整攻略', enTitle: 'Overseas Supply Chain Setup: Complete Guide from 0 to 1', thTitle: 'การสร้างโซ่อุปทานต่างประเทศ: คู่มือฉบับสมบูรณ์จาก 0 สู่ 1', viTitle: 'Xây dựng chuỗi cung ứng nước ngoài: Hướng dẫn đầy đủ từ 0 đến 1' },
    { slug: 'franchise-recruitment', zhTitle: '海外加盟商招募：如何找到靠谱的合作伙伴', enTitle: 'Overseas Franchisee Recruitment: How to Find Reliable Partners', thTitle: 'การรับสมัครแฟรนไชส์ต่างประเทศ: วิธีหาพาร์ตเนอร์ที่น่าเชื่อถือ', viTitle: 'Tuyển dụng nhượng quyền nước ngoài: Cách tìm đối tác đáng tin cậy' },
  ],
  'overseas-policy': [
    { slug: 'thailand-franchise-law', zhTitle: '泰国特许经营法律政策全解读', enTitle: 'Complete Guide to Thailand\'s Franchise Laws and Policies', thTitle: 'คู่มือฉบับสมบูรณ์กฎหมายและนโยบายแฟรนไชส์ไทย', viTitle: 'Hướng dẫn đầy đủ luật và chính sách nhượng quyền Thái Lan' },
    { slug: 'vietnam-business-license', zhTitle: '越南营业执照申请流程详解', enTitle: 'Vietnam Business License Application Process Explained', thTitle: 'อธิบายขั้นตอนการขอใบอนุญาตธุรกิจเวียดนาม', viTitle: 'Giải thích quy trình xin giấy phép kinh doanh Việt Nam' },
    { slug: 'singapore-fnb-regulation', zhTitle: '新加坡餐饮行业监管要求', enTitle: 'Singapore F&B Industry Regulatory Requirements', thTitle: 'ข้อกำหนดด้านกฎระเบียบอุตสาหกรรมอาหารและเครื่องดื่มสิงคโปร์', viTitle: 'Yêu cầu quy định ngành F&B Singapore' },
    { slug: 'malaysia-halal-requirement', zhTitle: '马来西亚清真认证要求与流程', enTitle: 'Malaysia Halal Certification Requirements and Process', thTitle: 'ข้อกำหนดและกระบวนการรับรอง Halal มาเลเซีย', viTitle: 'Yêu cầu và quy trình chứng nhận Halal Malaysia' },
    { slug: 'indonesia-foreign-investment', zhTitle: '印尼外资餐饮企业准入政策', enTitle: 'Indonesia Foreign Investment Entry Policy for F&B Companies', thTitle: 'นโยบายการเข้าลงทุนต่างชาติสำหรับบริษัทอาหารและเครื่องดื่มอินโดนีเซีย', viTitle: 'Chính sách gia nhập đầu tư nước ngoài cho công ty F&B Indonesia' },
  ],
};

// 生成内容模板
function generateContent(locale, title, category) {
  return `<h2>${title}</h2><p>这是${category === 'overseas-dynamic' ? '海外加盟动态' : category === 'overseas-case' ? '品牌出海案例' : category === 'overseas-tips' ? '海外加盟常识' : '海外特许政策'}相关文章的示例内容。</p><p>实际内容需要根据具体主题进行补充完善。本文旨在为您提供${locale === 'zh' ? '中文' : locale === 'en' ? '英文' : locale === 'th' ? '泰文' : '越南文'}版本的参考信息。</p><h3>主要内容</h3><ul><li>市场分析与趋势解读</li><li>成功案例与经验分享</li><li>实操指南与注意事项</li></ul><p>更多详细内容正在持续更新中...</p>`;
}

function generateExcerpt(locale, title) {
  return `${title} - 本文为您详细解读海外加盟相关信息，提供实用的参考建议。`;
}

async function main() {
  console.log('开始为海外加盟学院添加文章...');
  
  let totalCreated = 0;
  const categories = Object.keys(ARTICLES);
  
  for (const category of categories) {
    const articles = ARTICLES[category];
    console.log(`\n处理分类: ${category} (${articles.length}篇文章)`);
    
    for (const article of articles) {
      // 为每种语言创建一个版本
      const locales = [
        { code: 'zh', title: article.zhTitle },
        { code: 'en', title: article.enTitle },
        { code: 'th', title: article.thTitle },
        { code: 'vi', title: article.viTitle },
      ];
      
      for (const locale of locales) {
        const slug = `${article.slug}-${locale.code}`;
        const existing = await prisma.article.findUnique({ where: { slug } });
        
        if (!existing) {
          await prisma.article.create({
            data: {
              title: locale.title,
              slug: slug,
              content: generateContent(locale.code, locale.title, category),
              excerpt: generateExcerpt(locale.code, locale.title),
              category: category,
              locale: locale.code,
              status: 'published',
              publishedAt: new Date(),
              author: '系统',
            },
          });
          totalCreated++;
          console.log(`  ✓ 创建: ${locale.code} - ${locale.title}`);
        } else {
          console.log(`  ○ 已存在: ${slug}`);
        }
      }
    }
  }
  
  console.log(`\n完成! 共创建 ${totalCreated} 篇文章`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());

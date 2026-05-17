/**
 * 修复 CMS 单页内容
 * 1. 删除 contact/terms/privacy 相关 CMS 记录
 * 2. 创建 franchise/franchisee/about 的 4 语言 CMS 记录
 */
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const LOCALE = { zh: 'zh', en: 'en', th: 'th', vi: 'vi' };

// ====== 页面内容数据 ======
const pages = [
  {
    slug: 'franchise',
    locales: {
      zh: {
        title: '成为加盟商',
        content: `<div class="franchise-hero">
  <h1>成为加盟商</h1>
  <p class="subtitle">携手挞柠，共创茶饮新未来</p>
</div>

<div class="franchise-intro">
  <h2>为什么选择挞柠？</h2>
  <p>挞柠柠檬茶源自潮汕，精选优质柠檬与进口茶叶，为消费者带来清新、健康、独特的茶饮体验。我们拥有完善的供应链、标准化的运营体系和强大的品牌影响力，是您创业的最佳选择。</p>
</div>

<div class="franchise-features">
  <div class="feature-item">
    <h3>🌿 优质原料</h3>
    <p>自有茶园与果园，从源头把控品质，新鲜柠檬直供，进口茶叶精选。</p>
  </div>
  <div class="feature-item">
    <h3>📊 成熟体系</h3>
    <p>10年+餐饮连锁经验，标准化SOP操作流程，完善培训体系，360度全方位扶持。</p>
  </div>
  <div class="feature-item">
    <h3>🚀 品牌赋能</h3>
    <p>国内外600+门店，品牌影响力持续增长，线上线下全渠道曝光支持。</p>
  </div>
  <div class="feature-item">
    <h3>💰 低门槛创业</h3>
    <p>灵活投资方案，回报周期短，全程运营指导，让创业更简单。</p>
  </div>
</div>

<div class="franchise-process">
  <h2>加盟流程</h2>
  <ol class="process-steps">
    <li><strong>第一步：咨询了解</strong> - 填写加盟申请表，获取项目资料</li>
    <li><strong>第二步：实地考察</strong> - 参观总部与样板店，深入了解品牌</li>
    <li><strong>第三步：签订合同</strong> - 确认合作意向，签订加盟合同</li>
    <li><strong>第四步：门店选址</strong> - 专业团队协助选址，评估商圈潜力</li>
    <li><strong>第五步：装修培训</strong> - 统一VI装修，系统化培训课程</li>
    <li><strong>第六步：开业运营</strong> - 督导驻店支持，持续运营指导</li>
  </ol>
</div>

<div class="franchise-support">
  <h2>全方位支持</h2>
  <ul>
    <li>✅ 选址评估与商业计划书</li>
    <li>✅ 装修设计一体化服务</li>
    <li>✅ 产品技术培训（理论+实操）</li>
    <li>✅ 开业策划与营销推广</li>
    <li>✅ 供应链配送支持</li>
    <li>✅ 线上运营系统支持</li>
    <li>✅ 新品持续研发更新</li>
    <li>✅ 24小时专属客服支持</li>
  </ul>
</div>

<div class="franchise-cta">
  <h2>开启您的茶饮事业</h2>
  <p>填写下方加盟申请表，我们将在24小时内与您联系！</p>
  <a href="/contact" class="cta-button">立即申请加盟</a>
</div>`,
        seoTitle: '成为加盟商 - 挞柠柠檬茶',
        seoDesc: '加入挞柠柠檬茶，成为品牌加盟商，享受优质原料、成熟体系、品牌赋能与全程扶持。咨询加盟费用与条件。',
      },
      en: {
        title: 'Become a Franchisee',
        content: `<div class="franchise-hero">
  <h1>Become a Franchisee</h1>
  <p class="subtitle">Join Tanding for a Fresh Tea Future</p>
</div>

<div class="franchise-intro">
  <h2>Why Choose Tanding?</h2>
  <p>Tanding Lemon Tea originates from Chaoshan, selecting premium lemons and imported tea leaves to bring consumers a fresh, healthy, and unique tea drink experience. With a complete supply chain, standardized operations, and strong brand influence, Tanding is your best choice for entrepreneurship.</p>
</div>

<div class="franchise-features">
  <div class="feature-item">
    <h3>🌿 Premium Ingredients</h3>
    <p>Own tea gardens and orchards, quality control from the source, fresh lemon direct supply, imported tea selection.</p>
  </div>
  <div class="feature-item">
    <h3>📊 Mature System</h3>
    <p>10+ years of F&B chain experience, standardized SOP operations, comprehensive training system, 360-degree support.</p>
  </div>
  <div class="feature-item">
    <h3>🚀 Brand Empowerment</h3>
    <p>600+ stores worldwide, growing brand influence, online and offline omni-channel exposure support.</p>
  </div>
  <div class="feature-item">
    <h3>💰 Low Barrier to Start</h3>
    <p>Flexible investment plans, short payback cycle, full operation guidance, making entrepreneurship simpler.</p>
  </div>
</div>

<div class="franchise-process">
  <h2>Franchise Process</h2>
  <ol class="process-steps">
    <li><strong>Step 1: Inquiry</strong> - Submit franchise application, get project information</li>
    <li><strong>Step 2: Site Visit</strong> - Visit HQ and model stores, understand the brand deeply</li>
    <li><strong>Step 3: Sign Contract</strong> - Confirm cooperation, sign franchise agreement</li>
    <li><strong>Step 4: Store Location</strong> - Professional team assists with site selection</li>
    <li><strong>Step 5: Renovation & Training</strong> - Unified VI decoration, systematic training</li>
    <li><strong>Step 6: Grand Opening</strong> - On-site supervision support, continuous guidance</li>
  </ol>
</div>

<div class="franchise-support">
  <h2>Full Support</h2>
  <ul>
    <li>✅ Site selection evaluation & business plan</li>
    <li>✅ Integrated decoration design service</li>
    <li>✅ Product & technical training (theory + practice)</li>
    <li>✅ Opening planning & marketing</li>
    <li>✅ Supply chain logistics support</li>
    <li>✅ Online operations system support</li>
    <li>✅ Continuous new product R&D</li>
    <li>✅ 24-hour dedicated customer service</li>
  </ul>
</div>

<div class="franchise-cta">
  <h2>Start Your Tea Business</h2>
  <p>Fill out the franchise application below and we will contact you within 24 hours!</p>
  <a href="/contact" class="cta-button">Apply Now</a>
</div>`,
        seoTitle: 'Become a Franchisee - Tanding Lemon Tea',
        seoDesc: 'Join Tanding Lemon Tea as a brand franchisee. Enjoy premium ingredients, mature systems, brand empowerment and full support. Inquire about franchise costs and conditions.',
      },
      th: {
        title: 'สมัครเป็นผู้แฟรนไชส์',
        content: `<div class="franchise-hero">
  <h1>สมัครเป็นผู้แฟรนไชส์</h1>
  <p class="subtitle">ร่วมเป็นพันธมิตรกับ Tanding สร้างอนาคตชาใหม่</p>
</div>

<div class="franchise-intro">
  <h2>ทำไมต้องเลือก Tanding?</h2>
  <p>Tanding Lemon Tea มาจาก Chaozhou เลือกมะนาวคุณภาพและใบชาพิเศษนำเข้า เพื่อมอบประสบการณ์การดื่มชาที่สดใหม่ สุขภาพดี และเป็นเอกลักษณ์ พร้อมห่วงโซ่อุปทานที่สมบูรณ์ ระบบปฏิบัติการมาตรฐาน และอิทธิพลแบรนด์ที่แข็งแกร่ง เหมาะสำหรับการเริ่มธุรกิจของคุณ</p>
</div>

<div class="franchise-features">
  <div class="feature-item">
    <h3>🌿 วัตถุดิบชั้นยอด</h3>
    <p>สวนชาและสวนผลไม้ของตัวเอง ควบคุมคุณภาพจากต้นทาง มะนาวสดจัดส่งตรง ใบชานำเข้าคัดสรร</p>
  </div>
  <div class="feature-item">
    <h3>📊 ระบบที่สมบูรณ์</h3>
    <p>ประสบการณ์ร้านอาหาร 10+ ปี ระบบ SOP มาตรฐาน หลักสูตรการฝึกอบรมครบวงจร สนับสนุน 360 องศา</p>
  </div>
  <div class="feature-item">
    <h3>🚀 พลังแบรนด์</h3>
    <p>ร้านค้า 600+ แห่งทั่วโลก แบรนด์เติบโตต่อเนื่อง สนับสนุนการประชาสัมพันธ์ทุกช่องทาง</p>
  </div>
  <div class="feature-item">
    <h3>💰 เริ่มต้นธุรกิจง่าย</h3>
    <p>แผนลงทุนยืดหยุ่น ระยะเวลาคืนทุนสั้น คำแนะนำการดำเนินงานครบวงจร ธุรกิจง่ายขึ้น</p>
  </div>
</div>

<div class="franchise-process">
  <h2>ขั้นตอนการสมัครแฟรนไชส์</h2>
  <ol class="process-steps">
    <li><strong>ขั้นตอนที่ 1: สอบถามข้อมูล</strong> - กรอกใบสมัคร และรับข้อมูลโครงการ</li>
    <li><strong>ขั้นตอนที่ 2: เยี่ยมชม</strong> - เยี่ยมชมสำนักงานใหญ่และร้านตัวอย่าง</li>
    <li><strong>ขั้นตอนที่ 3: ลงนามสัญญา</strong> - ยืนยันความร่วมมือ ลงนามสัญญาแฟรนไชส์</li>
    <li><strong>ขั้นตอนที่ 4: เลือกทำเล</strong> - ทีมงานช่วยเลือกทำเล ประเมินศักยภาพพื้นที่</li>
    <li><strong>ขั้นตอนที่ 5: ตกแต่งและฝึกอบรม</strong> - ออกแบบตามมาตรฐาน VI ฝึกอบรมอย่างเป็นระบบ</li>
    <li><strong>ขั้นตอนที่ 6: เปิดให้บริการ</strong> - ทีมดูแลเปิดร้าน คำแนะนำการดำเนินงานต่อเนื่อง</li>
  </ol>
</div>

<div class="franchise-support">
  <h2>การสนับสนุนครบวงจร</h2>
  <ul>
    <li>✅ การประเมินทำเลและแผนธุรกิจ</li>
    <li>✅ บริการออกแบบตกแต่งครบวงจร</li>
    <li>✅ การฝึกอบรมผลิตภัณฑ์และเทคนิค (ทฤษฎี+ปฏิบัติ)</li>
    <li>✅ การวางแผนเปิดร้านและการตลาด</li>
    <li>✅ การสนับสนุนห่วงโซ่อุปทาน</li>
    <li>✅ การสนับสนุนระบบปฏิบัติการออนไลน์</li>
    <li>✅ การพัฒนาผลิตภัณฑ์ใหม่อย่างต่อเนื่อง</li>
    <li>✅ ฝ่ายบริการลูกค้าพิเศษ 24 ชั่วโมง</li>
  </ul>
</div>

<div class="franchise-cta">
  <h2>เริ่มธุรกิจชาของคุณ</h2>
  <p>กรอกใบสมัครด้านล่าง เราจะติดต่อกลับภายใน 24 ชั่วโมง!</p>
  <a href="/contact" class="cta-button">สมัครเลย</a>
</div>`,
        seoTitle: 'สมัครเป็นผู้แฟรนไชส์ - Tanding Lemon Tea',
        seoDesc: 'เข้าร่วม Tanding Lemon Tea เป็นผู้แฟรนไชส์แบรนด์ พร้อมวัตถุดิบชั้นยอด ระบบที่สมบูรณ์ และการสนับสนุนครบวงจร สอบถามค่าธรรมเนียมและเงื่อนไข',
      },
      vi: {
        title: 'Trở thành Đại lý',
        content: `<div class="franchise-hero">
  <h1>Trở thành Đại lý</h1>
  <p class="subtitle">Cùng Tanding kiến tạo tương lai trà mới</p>
</div>

<div class="franchise-intro">
  <h2>Tại Sao Chọn Tanding?</h2>
  <p>Trà Chanh Tanding có nguồn gốc từ Triều Sơn, tuyển chọn chanh chất lượng cao và trà nhập khẩu, mang đến cho người tiêu dùng trải nghiệm thức uống trà tươi mát, khỏe mạnh và độc đáo. Với chuỗi cung ứng hoàn chỉnh, hệ thống vận hành tiêu chuẩn và thương hiệu uy tín, Tanding là lựa chọn tốt nhất để khởi nghiệp của bạn.</p>
</div>

<div class="franchise-features">
  <div class="feature-item">
    <h3>🌿 Nguyên Liệu Cao Cấp</h3>
    <p>Vườn trà và vườn cây ăn quả của riêng, kiểm soát chất lượng từ nguồn gốc, chanh tươi giao thẳng, trà nhập khẩu tuyển chọn.</p>
  </div>
  <div class="feature-item">
    <h3>📊 Hệ Thống Hoàn Chỉnh</h3>
    <p>10+ năm kinh nghiệm chuỗi F&B, quy trình SOP tiêu chuẩn, hệ thống đào tạo toàn diện, hỗ trợ 360 độ.</p>
  </div>
  <div class="feature-item">
    <h3>🚀 Sức Mạnh Thương Hiệu</h3>
    <p>600+ cửa hàng trên toàn thế giới, thương hiệu phát triển bền vững, hỗ trợ tiếp thị đa kênh online và offline.</p>
  </div>
  <div class="feature-item">
    <h3>💰 Khởi Nghiệp Dễ Dàng</h3>
    <p>Phương án đầu tư linh hoạt, thời gian hoàn vốn ngắn, hướng dẫn vận hành toàn diện, khởi nghiệp đơn giản hơn.</p>
  </div>
</div>

<div class="franchise-process">
  <h2>Quy Trình Nhượng Quyền</h2>
  <ol class="process-steps">
    <li><strong>Bước 1: Tìm hiểu</strong> - Điền đơn đăng ký nhượng quyền, nhận thông tin dự án</li>
    <li><strong>Bước 2: Khảo sát thực tế</strong> - Thăm trụ sở và cửa hàng mẫu, hiểu sâu về thương hiệu</li>
    <li><strong>Bước 3: Ký hợp đồng</strong> - Xác nhận hợp tác, ký hợp đồng nhượng quyền</li>
    <li><strong>Bước 4: Chọn địa điểm</strong> - Đội ngũ chuyên nghiệp hỗ trợ chọn vị trí, đánh giá tiềm năng</li>
    <li><strong>Bước 5: Trang trí và Đào tạo</strong> - Thiết kế theo tiêu chuẩn VI, đào tạo bài bản</li>
    <li><strong>Bước 6: Khai trương</strong> - Hỗ trợ giám sát mở cửa, hướng dẫn vận hành liên tục</li>
  </ol>
</div>

<div class="franchise-support">
  <h2>Hỗ Trợ Toàn Diện</h2>
  <ul>
    <li>✅ Đánh giá địa điểm và kế hoạch kinh doanh</li>
    <li>✅ Dịch vụ thiết kế trang trí tích hợp</li>
    <li>✅ Đào tạo sản phẩm và kỹ thuật (lý thuyết + thực hành)</li>
    <li>✅ Lên kế hoạch khai trương và tiếp thị</li>
    <li>✅ Hỗ trợ chuỗi cung ứng logistics</li>
    <li>✅ Hỗ trợ hệ thống vận hành online</li>
    <li>✅ Phát triển sản phẩm mới liên tục</li>
    <li>✅ Dịch vụ khách hàng chuyên dụng 24 giờ</li>
  </ul>
</div>

<div class="franchise-cta">
  <h2>Bắt Đầu Sự Nghiệp Trà Của Bạn</h2>
  <p>Điền đơn đăng ký nhượng quyền bên dưới, chúng tôi sẽ liên hệ trong 24 giờ!</p>
  <a href="/contact" class="cta-button">Đăng Ký Ngay</a>
</div>`,
        seoTitle: 'Trở thành Đại lý - Tanding Lemon Tea',
        seoDesc: 'Tham gia Tanding Lemon Tea trở thành đại lý thương hiệu, tận hưởng nguyên liệu cao cấp, hệ thống hoàn chỉnh, sức mạnh thương hiệu và hỗ trợ toàn diện. Tìm hiểu phí và điều kiện nhượng quyền.',
      },
    },
  },
  {
    slug: 'franchisee',
    locales: {
      zh: {
        title: '成为加盟主',
        content: `<div class="franchisee-hero">
  <h1>成为加盟主</h1>
  <p class="subtitle">区域代理 | 联合 Operation | 共同发展</p>
</div>

<div class="franchisee-intro">
  <h2>成为品牌加盟主</h2>
  <p>如果您拥有丰富的商业资源、成熟的运营团队和强烈的创业意愿，欢迎成为挞柠的区域加盟主！我们提供更大力度的品牌授权、更高的利润空间和更完善的支持体系，与您共同开拓茶饮市场新蓝海。</p>
</div>

<div class="franchisee-models">
  <h2>合作模式</h2>
  <div class="model-cards">
    <div class="model-card">
      <h3>🏙️ 区域代理</h3>
      <p>获得指定区域（如地级市、省份）的独家代理权，负责区域内加盟商招募与管理。</p>
      <ul>
        <li>✅ 区域独家经营权</li>
        <li>✅ 加盟商招募与管理费</li>
        <li>✅ 区域市场统筹推广</li>
        <li>✅ 全方位品牌授权支持</li>
      </ul>
    </div>
    <div class="model-card">
      <h3>🤝 联合经营</h3>
      <p>与挞柠总部联合投资开店，共同承担风险与收益，实现资源互补与能力叠加。</p>
      <ul>
        <li>✅ 联合投资降低风险</li>
        <li>✅ 总部资源全力导入</li>
        <li>✅ 专业团队驻点支持</li>
        <li>✅ 收益共享成长共赢</li>
      </ul>
    </div>
  </div>
</div>

<div class="franchisee-requirements">
  <h2>加盟主条件</h2>
  <ul>
    <li>💼 <strong>商业资源</strong> — 拥有当地商场、商业街、写字楼等优质商业资源</li>
    <li>👥 <strong>团队实力</strong> — 具备完整的运营团队和市场拓展能力</li>
    <li>💰 <strong>资金实力</strong> — 可承担区域代理或联合经营的首期投资</li>
    <li>🎯 <strong>行业认知</strong> — 认同挞柠品牌理念，有茶饮或餐饮行业经验优先</li>
    <li>📈 <strong>发展意愿</strong> — 有明确的3-5年市场拓展计划</li>
  </ul>
</div>

<div class="franchisee-support">
  <h2>总部支持</h2>
  <ul>
    <li>✅ <strong>品牌授权</strong> — 区域独家品牌授权，授权期3-5年</li>
    <li>✅ <strong>选址支持</strong> — 专业团队协助区域市场调研与门店选址</li>
    <li>✅ <strong>供应链保障</strong> — 优先供应原料与设备，全程配送支持</li>
    <li>✅ <strong>培训体系</strong> — 管理层培训、店长培训、员工培训三级体系</li>
    <li>✅ <strong>营销支持</strong> — 开业策划、节日营销、会员运营全链路支持</li>
    <li>✅ <strong>IT系统</strong> — ERP管理系统、POS系统、会员系统技术支持</li>
    <li>✅ <strong>新品研发</strong> — 持续新品研发，保持市场竞争力</li>
    <li>✅ <strong>督导服务</strong> — 区域督导定期巡店，持续提升门店业绩</li>
  </ul>
</div>

<div class="franchisee-cta">
  <h2>开启区域事业新版图</h2>
  <p>成为挞柠加盟主，与我们一起引领茶饮新潮流！</p>
  <a href="/contact" class="cta-button">联系总部洽谈</a>
</div>`,
        seoTitle: '成为加盟主 - 挞柠柠檬茶',
        seoDesc: '成为挞柠柠檬茶区域加盟主或联合经营者，享受区域独家授权、更高利润空间与全方位支持。合作模式：区域代理、联合经营。',
      },
      en: {
        title: 'Become a Master Franchisee',
        content: `<div class="franchisee-hero">
  <h1>Become a Master Franchisee</h1>
  <p class="subtitle">Regional Master | Joint Venture | Co-development</p>
</div>

<div class="franchisee-intro">
  <h2>Become a Brand Master Franchisee</h2>
  <p>If you have abundant business resources, experienced operations team, and strong entrepreneurial drive, welcome to become Tanding's regional master franchisee! We offer greater brand authorization, higher profit margins, and more comprehensive support systems to help you jointly explore new blue ocean markets in the tea beverage industry.</p>
</div>

<div class="franchisee-models">
  <h2>Cooperation Models</h2>
  <div class="model-cards">
    <div class="model-card">
      <h3>🏙️ Regional Master</h3>
      <p>Obtain exclusive agent rights for designated regions (e.g., prefecture-level city, province), responsible for recruiting and managing franchisees within the region.</p>
      <ul>
        <li>✅ Exclusive regional operation rights</li>
        <li>✅ Franchisee recruitment and management fees</li>
        <li>✅ Regional market promotion coordination</li>
        <li>✅ Full brand authorization support</li>
      </ul>
    </div>
    <div class="model-card">
      <h3>🤝 Joint Venture</h3>
      <p>Co-invest with Tanding HQ to open stores, share risks and benefits, achieving resource complementarity and capability synergy.</p>
      <ul>
        <li>✅ Co-investment reduces risk</li>
        <li>✅ HQ resources fully integrated</li>
        <li>✅ Professional team on-site support</li>
        <li>✅ Shared benefits and win-win growth</li>
      </ul>
    </div>
  </div>
</div>

<div class="franchisee-requirements">
  <h2>Master Franchisee Requirements</h2>
  <ul>
    <li>💼 <strong>Business Resources</strong> — Quality commercial resources such as local malls, commercial streets, and office buildings</li>
    <li>👥 <strong>Team Strength</strong> — Complete operations team and market expansion capability</li>
    <li>💰 <strong>Financial Strength</strong> — Able to afford initial investment for regional agent or joint venture</li>
    <li>🎯 <strong>Industry Recognition</strong> — Identifies with Tanding brand philosophy; F&B industry experience preferred</li>
    <li>📈 <strong>Development Ambition</strong> — Clear 3-5 year market expansion plan</li>
  </ul>
</div>

<div class="franchisee-support">
  <h2>HQ Support</h2>
  <ul>
    <li>✅ <strong>Brand Authorization</strong> — Exclusive regional brand authorization, 3-5 year authorization period</li>
    <li>✅ <strong>Site Selection Support</strong> — Professional team assists with regional market research and store location</li>
    <li>✅ <strong>Supply Chain Guarantee</strong> — Priority supply of ingredients and equipment, full logistics support</li>
    <li>✅ <strong>Training System</strong> — Management, store manager, and staff training at three levels</li>
    <li>✅ <strong>Marketing Support</strong> — Full-chain support for opening events, holiday marketing, member operations</li>
    <li>✅ <strong>IT Systems</strong> — ERP, POS, and member system technical support</li>
    <li>✅ <strong>New Product R&D</strong> — Continuous new product development to maintain market competitiveness</li>
    <li>✅ <strong>Supervision Service</strong> — Regional supervisors conduct regular store visits to continuously improve store performance</li>
  </ul>
</div>

<div class="franchisee-cta">
  <h2>Start Your Regional Business New Chapter</h2>
  <p>Become a Tanding Master Franchisee and lead the new wave of tea beverages together!</p>
  <a href="/contact" class="cta-button">Contact HQ for Discussion</a>
</div>`,
        seoTitle: 'Become a Master Franchisee - Tanding Lemon Tea',
        seoDesc: 'Become Tanding Lemon Tea regional master franchisee or joint venture partner. Enjoy exclusive regional authorization, higher profit margins and comprehensive support. Models: Regional Master, Joint Venture.',
      },
      th: {
        title: 'เป็นผู้แฟรนไชส์หลัก',
        content: `<div class="franchisee-hero">
  <h1>เป็นผู้แฟรนไชส์หลัก</h1>
  <p class="subtitle">ตัวแทนภูมิภาค | ร่วมทุน | พัฒนาร่วมกัน</p>
</div>

<div class="franchisee-intro">
  <h2>เป็นผู้แฟรนไชส์หลักของแบรนด์</h2>
  <p>หากคุณมีทรัพยากรธุรกิจที่อุดมสมบูรณ์ ทีมงานปฏิบัติการที่มีประสบการณ์ และความตั้งใจในการประกอบการที่แรงกล้า ยินดีต้อนรับสู่การเป็นผู้แฟรนไชส์หลักระดับภูมิภาคของ Tanding! เรานำเสนอการอนุญาตให้ใช้เครื่องหมายการค้าที่มากขึ้น อัตรากำไรที่สูงขึ้น และระบบสนับสนุนที่ครบวงจรยิ่งขึ้น เพื่อช่วยให้คุณสำรวจตลาดชาที่ยังไม่ได้แข่งขันในภูมิภาคใหม่ๆ</p>
</div>

<div class="franchisee-models">
  <h2>รูปแบบความร่วมมือ</h2>
  <div class="model-cards">
    <div class="model-card">
      <h3>🏙️ ตัวแทนภูมิภาค</h3>
      <p>ได้รับสิทธิ์ตัวแทนจำหน่ายเฉพาะพื้นที่ที่กำหนด (เช่น เมืองระดับจังหวัด หรือภาค) รับผิดชอบในการรับสมัครและบริหารผู้แฟรนไชส์ภายในภูมิภาค</p>
      <ul>
        <li>✅ สิทธิ์ประกอบการจำหน่ายเฉพาะภูมิภาค</li>
        <li>✅ ค่าธรรมเนียมรับสมัครและบริหารผู้แฟรนไชส์</li>
        <li>✅ การประชาสัมพันธ์ตลาดภูมิภาคอย่างเป็นระบบ</li>
        <li>✅ การสนับสนุนการอนุญาตใช้เครื่องหมายการค้าครบวงจร</li>
      </ul>
    </div>
    <div class="model-card">
      <h3>🤝 ร่วมทุน</h3>
      <p>ร่วมลงทุนกับสำนักงานใหญ่ Tanding เปิดร้าน แบ่งปันความเสี่ยงและผลตอบแทน บรรลุการเสริมกำลังทรัพยากรและขีดความสามารถ</p>
      <ul>
        <li>✅ การร่วมลงทุนลดความเสี่ยง</li>
        <li>✅ ทรัพยากรของสำนักงานใหญ่เข้ามาอย่างเต็มที่</li>
        <li>✅ ทีมงานมืออาชีพประจำสถานที่</li>
        <li>✅ แบ่งปันผลตอบแทนและเติบโตไปด้วยกัน</li>
      </ul>
    </div>
  </div>
</div>

<div class="franchisee-requirements">
  <h2>คุณสมบัติผู้แฟรนไชส์หลัก</h2>
  <ul>
    <li>💼 <strong>ทรัพยากรธุรกิจ</strong> — มีทรัพยากรธุรกิจคุณภาพในพื้นที่ เช่น ห้างสรรพสินค้า ถนนธุรกิจ อาคารสำนักงาน</li>
    <li>👥 <strong>ความแข็งแกร่งของทีม</strong> — มีทีมปฏิบัติการและความสามารถในการขยายตลาดที่สมบูรณ์</li>
    <li>💰 <strong>ศักยภาพทางการเงิน</strong> — สามารถรองรับการลงทุนขั้นต้นสำหรับตัวแทนภูมิภาคหรือร่วมทุน</li>
    <li>🎯 <strong>ความรู้ในอุตสาหกรรม</strong> — เห็นด้วยกับปรัชญาแบรนด์ Tanding มีประสบการณ์ในอุตสาหกรรมอาหารและเครื่องดื่มเป็นที่ต้องการ</li>
    <li>📈 <strong>ความตั้งใจในการพัฒนา</strong> — มีแผนการขยายตลาด 3-5 ปีที่ชัดเจน</li>
  </ul>
</div>

<div class="franchisee-support">
  <h2>การสนับสนุนจากสำนักงานใหญ่</h2>
  <ul>
    <li>✅ <strong>การอนุญาตใช้เครื่องหมายการค้า</strong> — การอนุญาตใช้เครื่องหมายการค้าเฉพาะภูมิภาค ระยะเวลาอนุญาต 3-5 ปี</li>
    <li>✅ <strong>การสนับสนุนการเลือกทำเล</strong> — ทีมงานมืออาชีพช่วยสำรวจตลาดภูมิภาคและเลือกทำเลร้านค้า</li>
    <li>✅ <strong>การรับประกันห่วงโซ่อุปทาน</strong> — วัตถุดิบและอุปกรณ์จัดส่งตามลำดับความสำคัญ สนับสนุนโลจิสติกส์ครบวงจร</li>
    <li>✅ <strong>ระบบการฝึกอบรม</strong> — การฝึกอบรมผู้บริหาร ผู้จัดการร้าน และพนักงาน 3 ระดับ</li>
    <li>✅ <strong>การสนับสนุนการตลาด</strong> — สนับสนุนครบวงจรสำหรับกิจกรรมเปิดตัว การตลาดวันหยุด การดำเนินงานสมาชิก</li>
    <li>✅ <strong>ระบบ IT</strong> — การสนับสนุนเทคนิคระบบ ERP, POS และระบบสมาชิก</li>
    <li>✅ <strong>การพัฒนาผลิตภัณฑ์ใหม่</strong> — พัฒนาผลิตภัณฑ์ใหม่อย่างต่อเนื่องเพื่อรักษาความสามารถในการแข่งขัน</li>
    <li>✅ <strong>บริการดูแล</strong> — ผู้ดูแลภูมิภาคเยี่ยมร้านค้าเป็นประจำเพื่อปรับปรุงประสิทธิภาพร้านค้าอย่างต่อเนื่อง</li>
  </ul>
</div>

<div class="franchisee-cta">
  <h2>เริ่มบทใหม่ธุรกิจระดับภูมิภาคของคุณ</h2>
  <p>เป็นผู้แฟรนไชส์หลักของ Tanding และนำคลื่นใหม่ของเครื่องดื่มชาด้วยกัน!</p>
  <a href="/contact" class="cta-button">ติดต่อสำนักงานใหญ่เพื่อเจรจา</a>
</div>`,
        seoTitle: 'เป็นผู้แฟรนไชส์หลัก - Tanding Lemon Tea',
        seoDesc: 'เป็นผู้แฟรนไชส์หลักระดับภูมิภาคหรือผู้ร่วมทุนของ Tanding Lemon Tea พร้อมการอนุญาตใช้เครื่องหมายการค้าเฉพาะภูมิภาค อัตรากำไรที่สูงขึ้น และการสนับสนุนครบวงจร',
      },
      vi: {
        title: 'Trở thành Đại lý Chính',
        content: `<div class="franchisee-hero">
  <h1>Trở thành Đại lý Chính</h1>
  <p class="subtitle">Đại lý Khu vực | Liên doanh | Cùng phát triển</p>
</div>

<div class="franchisee-intro">
  <h2>Trở thành Đại lý Chính Thương Hiệu</h2>
  <p>Nếu bạn có nguồn lực kinh doanh phong phú, đội ngũ vận hành giàu kinh nghiệm và khát vọng khởi nghiệp mãnh liệt, hãy trở thành Đại lý Chính khu vực của Tanding! Chúng tôi cung cấp ủy quyền thương hiệu lớn hơn, biên lợi nhuận cao hơn và hệ thống hỗ trợ toàn diện hơn để cùng bạn khai phá thị trường trà mới.</p>
</div>

<div class="franchisee-models">
  <h2>Mô Hình Hợp Tác</h2>
  <div class="model-cards">
    <div class="model-card">
      <h3>🏙️ Đại lý Khu vực</h3>
      <p>Nhận quyền đại lý độc quyền cho khu vực được chỉ định (ví dụ: thành phố cấp địa phương, tỉnh), chịu trách nhiệm tuyển dụng và quản lý đại lý trong khu vực.</p>
      <ul>
        <li>✅ Quyền kinh doanh độc quyền khu vực</li>
        <li>✅ Phí tuyển dụng và quản lý đại lý</li>
        <li>✅ Quảng bá thị trường khu vực tổng thể</li>
        <li>✅ Hỗ trợ ủy quyền thương hiệu toàn diện</li>
      </ul>
    </div>
    <div class="model-card">
      <h3>🤝 Liên Doanh</h3>
      <p>Cùng Tanding trụ sở chính đầu tư mở cửa hàng, chia sẻ rủi ro và lợi nhuận, đạt được sự bổ sung nguồn lực và năng lực.</p>
      <ul>
        <li>✅ Đầu tư chung giảm rủi ro</li>
        <li>✅ Nguồn lực trụ sở chính nhập khẩu đầy đủ</li>
        <li>✅ Đội ngũ chuyên nghiệp hỗ trợ tại chỗ</li>
        <li>✅ Chia sẻ lợi nhuận cùng phát triển</li>
      </ul>
    </div>
  </div>
</div>

<div class="franchisee-requirements">
  <h2>Điều Kiện Đại lý Chính</h2>
  <ul>
    <li>💼 <strong>Nguồn Lực Kinh Doanh</strong> — Có nguồn lực thương mại chất lượng tại địa phương như trung tâm thương mại, phố kinh doanh, tòa nhà văn phòng</li>
    <li>👥 <strong>Thế Mạnh Đội Ngũ</strong> — Đội ngũ vận hành hoàn chỉnh và khả năng mở rộng thị trường</li>
    <li>💰 <strong>Tiềm Lực Tài Chính</strong> — Có thể đáp ứng khoản đầu tư ban đầu cho đại lý khu vực hoặc liên doanh</li>
    <li>🎯 <strong>Nhận Thức Ngành</strong> — Đồng ý với triết lý thương hiệu Tanding, ưu tiên có kinh nghiệm F&B</li>
    <li>📈 <strong>Khát Vọng Phát Triển</strong> — Có kế hoạch mở rộng thị trường 3-5 năm rõ ràng</li>
  </ul>
</div>

<div class="franchisee-support">
  <h2>Hỗ Trợ Từ Trụ Sở Chính</h2>
  <ul>
    <li>✅ <strong>Ủy Quyền Thương Hiệu</strong> — Ủy quyền thương hiệu độc quyền khu vực, thời hạn ủy quyền 3-5 năm</li>
    <li>✅ <strong>Hỗ Trợ Chọn Địa Điểm</strong> — Đội ngũ chuyên nghiệp hỗ trợ khảo sát thị trường khu vực và chọn vị trí cửa hàng</li>
    <li>✅ <strong>Đảm Bảo Chuỗi Cung Ứng</strong> — Ưu tiên cung cấp nguyên liệu và thiết bị, hỗ trợ logistics toàn diện</li>
    <li>✅ <strong>Hệ Thống Đào Tạo</strong> — Đào tạo ba cấp: quản lý, trưởng cửa hàng, nhân viên</li>
    <li>✅ <strong>Hỗ Trợ Marketing</strong> — Hỗ trợ toàn chuỗi cho sự kiện khai trương, tiếp thị ngày lễ, vận hành thành viên</li>
    <li>✅ <strong>Hệ Thống IT</strong> — Hỗ trợ kỹ thuật hệ thống ERP, POS, hệ thống thành viên</li>
    <li>✅ <strong>Phát Triển Sản Phẩm Mới</strong> — Phát triển sản phẩm mới liên tục duy trì sức cạnh tranh</li>
    <li>✅ <strong>Dịch Vụ Giám Sát</strong> — Giám sát viên khu vực thăm cửa hàng thường xuyên, nâng cao hiệu suất liên tục</li>
  </ul>
</div>

<div class="franchisee-cta">
  <h2>Mở Ra Chương Trình Kinh Doanh Khu Vực Mới</h2>
  <p>Trở thành Đại lý Chính Tanding, cùng nhau dẫn đầu xu hướng trà mới!</p>
  <a href="/contact" class="cta-button">Liên hệ trụ sở đàm phán</a>
</div>`,
        seoTitle: 'Trở thành Đại lý Chính - Tanding Lemon Tea',
        seoDesc: 'Trở thành đại lý chính khu vực hoặc liên doanh của Tanding Lemon Tea. Tận hưởng ủy quyền thương hiệu độc quyền khu vực, biên lợi nhuận cao hơn và hỗ trợ toàn diện.',
      },
    },
  },
  {
    slug: 'about',
    locales: {
      zh: {
        title: '关于我们',
        content: `<div class="about-hero">
  <h1>关于我们</h1>
  <p class="subtitle">挞柠柠檬茶 — 让世界爱上中国茶饮</p>
</div>

<div class="about-mission">
  <h2>品牌使命</h2>
  <p>挞柠源自潮汕，创立于2017年，致力于为全球消费者提供健康、美味、独特的柠檬茶饮体验。我们相信，一杯好茶可以连接世界，一份匠心可以打动人心。</p>
</div>

<div class="about-story">
  <h2>品牌故事</h2>
  <p>挞柠的故事始于潮汕的一片柠檬园。创始人带着对茶的热爱与执着，走遍全国各地寻找最优质的柠檬和茶叶。经过无数次调配与试验，终于研发出独家的柠檬茶配方——酸甜适中、清新回甘，一口难忘。</p>
  <p>从广州的第一家门店到遍布海内外的600+门店，挞柠始终坚持"品质第一"的理念，用心做好每一杯茶。</p>
</div>

<div class="about-values">
  <h2>核心价值观</h2>
  <div class="values-grid">
    <div class="value-item">
      <h3>🌿 品质至上</h3>
      <p>精选优质原料，从源头把控品质，确保每一杯都是精品。</p>
    </div>
    <div class="value-item">
      <h3>🤝 客户为本</h3>
      <p>始终把顾客体验放在首位，用心服务每一位消费者。</p>
    </div>
    <div class="value-item">
      <h3>💡 创新驱动</h3>
      <p>持续研发新产品、新口味，引领茶饮行业创新潮流。</p>
    </div>
    <div class="value-item">
      <h3>🌏 开放共赢</h3>
      <p>与全球合作伙伴携手，共同推动茶饮文化的传播与发展。</p>
    </div>
  </div>
</div>

<div class="about-scale">
  <h2>品牌规模</h2>
  <div class="scale-stats">
    <div class="stat-item">
      <span class="stat-number">600+</span>
      <span class="stat-label">全球门店</span>
    </div>
    <div class="stat-item">
      <span class="stat-number">20+</span>
      <span class="stat-label">国家地区</span>
    </div>
    <div class="stat-item">
      <span class="stat-number">2017</span>
      <span class="stat-label">创立年份</span>
    </div>
    <div class="stat-item">
      <span class="stat-number">1亿+</span>
      <span class="stat-label">年服务人次</span>
    </div>
  </div>
</div>

<div class="about-services">
  <h2>业务版图</h2>
  <ul>
    <li>🏠 <strong>中国运营</strong> — 广州挞柠餐饮管理有限公司，负责中国大陆市场运营</li>
    <li>🌏 <strong>海外运营</strong> — 挞柠国际（香港）有限公司，负责全球市场拓展</li>
    <li>🏭 <strong>原料生产</strong> — 潮州顶益食品有限公司，专注茶饮料原料研发与生产</li>
    <li>🌱 <strong>原料种植</strong> — 潮州味满多农场，自有茶园与果园，确保原料品质</li>
    <li>🎭 <strong>文旅发展</strong> — 荔云山（广州）文化发展有限公司，茶饮文化推广与文旅项目</li>
    <li>🎪 <strong>会展服务</strong> — 问展国际网，全球会展综合服务平台</li>
  </ul>
</div>

<div class="about-contact">
  <h2>联系我们</h2>
  <p>商务合作、品牌加盟、媒体采访，欢迎随时联系我们。</p>
  <a href="/contact" class="cta-button">联系我们</a>
</div>`,
        seoTitle: '关于我们 - 挞柠柠檬茶',
        seoDesc: '了解挞柠柠檬茶品牌故事、使命与价值观。600+全球门店，专注健康茶饮，从潮汕走向世界。',
      },
      en: {
        title: 'About Us',
        content: `<div class="about-hero">
  <h1>About Us</h1>
  <p class="subtitle">Tanding Lemon Tea — Let the World Fall in Love with Chinese Tea Drinks</p>
</div>

<div class="about-mission">
  <h2>Brand Mission</h2>
  <p>Tanding originates from Chaoshan, founded in 2017, dedicated to providing global consumers with healthy, delicious, and unique lemon tea drinking experiences. We believe that a good cup of tea can connect the world, and a touch of craftsmanship can touch people's hearts.</p>
</div>

<div class="about-story">
  <h2>Brand Story</h2>
  <p>The Tanding story began in a lemon garden in Chaoshan. The founder, carrying love and dedication for tea, traveled across the country to find the finest lemons and tea leaves. After countless adjustments and experiments, we finally developed our exclusive lemon tea formula — perfectly balanced sour and sweet, refreshing with lingering sweetness, unforgettable with one sip.</p>
  <p>From the first store in Guangzhou to 600+ stores worldwide, Tanding has always adhered to the philosophy of "Quality First," crafting every cup of tea with care.</p>
</div>

<div class="about-values">
  <h2>Core Values</h2>
  <div class="values-grid">
    <div class="value-item">
      <h3>🌿 Quality First</h3>
      <p>Select premium ingredients, control quality from the source, ensuring every cup is exceptional.</p>
    </div>
    <div class="value-item">
      <h3>🤝 Customer Focused</h3>
      <p>Always put customer experience first, serving every consumer with dedication.</p>
    </div>
    <div class="value-item">
      <h3>💡 Innovation Driven</h3>
      <p>Continuously develop new products and flavors, leading innovation trends in the tea beverage industry.</p>
    </div>
    <div class="value-item">
      <h3>🌏 Open & Win-Win</h3>
      <p>Join hands with global partners to jointly promote the spread and development of tea drinking culture.</p>
    </div>
  </div>
</div>

<div class="about-scale">
  <h2>Brand Scale</h2>
  <div class="scale-stats">
    <div class="stat-item">
      <span class="stat-number">600+</span>
      <span class="stat-label">Global Stores</span>
    </div>
    <div class="stat-item">
      <span class="stat-number">20+</span>
      <span class="stat-label">Countries & Regions</span>
    </div>
    <div class="stat-item">
      <span class="stat-number">2017</span>
      <span class="stat-label">Year Founded</span>
    </div>
    <div class="stat-item">
      <span class="stat-number">100M+</span>
      <span class="stat-label">Annual Customers Served</span>
    </div>
  </div>
</div>

<div class="about-services">
  <h2>Business Portfolio</h2>
  <ul>
    <li>🏠 <strong>China Operations</strong> — Guangzhou Tanding Food & Beverage Management Co., Ltd., responsible for China mainland market operations</li>
    <li>🌏 <strong>Overseas Operations</strong> — Tanding International (Hong Kong) Co., Ltd., responsible for global market expansion</li>
    <li>🏭 <strong>Ingredient Production</strong> — Chaozhou Dingyi Food Co., Ltd., focused on tea beverage ingredient R&D and production</li>
    <li>🌱 <strong>Plantation</strong> — Chaozhou Weimanduo Farm, own tea gardens and orchards, ensuring ingredient quality</li>
    <li>🎭 <strong>Cultural Tourism</strong> — Liyunshan (Guangzhou) Cultural Development Co., Ltd., tea culture promotion and cultural tourism projects</li>
    <li>🎪 <strong>Exhibition Services</strong> — Wenzhan International Network, global exhibition comprehensive service platform</li>
  </ul>
</div>

<div class="about-contact">
  <h2>Contact Us</h2>
  <p>For business cooperation, brand franchising, media interviews, feel free to contact us anytime.</p>
  <a href="/contact" class="cta-button">Contact Us</a>
</div>`,
        seoTitle: 'About Us - Tanding Lemon Tea',
        seoDesc: 'Learn about Tanding Lemon Tea brand story, mission and values. 600+ global stores, dedicated to healthy tea drinks, from Chaoshan to the world.',
      },
      th: {
        title: 'เกี่ยวกับเรา',
        content: `<div class="about-hero">
  <h1>เกี่ยวกับเรา</h1>
  <p class="subtitle">Tanding Lemon Tea — ให้โลกหลงรักเครื่องดื่มชาจีน</p>
</div>

<div class="about-mission">
  <h2>พันธกิจของแบรนด์</h2>
  <p>Tanding มาจาก Chaozhou ก่อตั้งในปี 2017 มุ่งมั่นมอบประสบการณ์การดื่มชามะนาวที่สุขภาพดี อร่อย และเป็นเอกลักษณ์ให้แก่ผู้บริโภคทั่วโลก เราเชื่อว่าถ้วยชาที่ดีสามารถเชื่อมโยงโลก และความทุ่มเทสามารถสัมผัสหัวใจผู้คนได้</p>
</div>

<div class="about-story">
  <h2>เรื่องราวแบรนด์</h2>
  <p>เรื่องราวของ Tanding เริ่มต้นจากสวนมะนาวใน Chaozhou ผู้ก่อตั้งด้วยความรักและความทุ่มเทในชา เดินทางไปทั่วประเทศเพื่อค้นหามะนาวและใบชาที่ดีที่สุด หลังจากการปรับแต่งและทดลองนับครั้งไม่ถ้วน ในที่สุดเราก็พัฒนาสูตรชามะนาวพิเศษของเรา — หวานเปรี้ยวสมดุล สดชื่น หอมนาน ลืมไม่ลงด้วยจิบครั้งเดียว</p>
  <p>จากร้านแรกในกว่างโจวสู่ร้านค้า 600+ แห่งทั่วโลก Tanding ยึดมั่นในปรัชญา "คุณภาพเป็นอันดับหนึ่ง" ทำชาทุกถ้วยด้วยใจ</p>
</div>

<div class="about-values">
  <h2>ค่านิยมหลัก</h2>
  <div class="values-grid">
    <div class="value-item">
      <h3>🌿 คุณภาพเป็นอันดับหนึ่ง</h3>
      <p>คัดเลือกวัตถุดิบชั้นยอด ควบคุมคุณภาพจากต้นทาง ทำให้ทุกถ้วยเป็นผลิตภัณฑ์ชั้นยอด</p>
    </div>
    <div class="value-item">
      <h3>🤝 ลูกค้าเป็นศูนย์กลาง</h3>
      <p>ให้ความสำคัญกับประสบการณ์ลูกค้าเป็นอันดับหนึ่ง รับใช้ทุกผู้บริโภคด้วยใจ</p>
    </div>
    <div class="value-item">
      <h3>💡 นวัตกรรมเป็นแรงขับเคลื่อน</h3>
      <p>พัฒนาผลิตภัณฑ์และรสชาติใหม่อย่างต่อเนื่อง นำเทรนด์นวัตกรรมในอุตสาหกรรมเครื่องดื่มชา</p>
    </div>
    <div class="value-item">
      <h3>🌏 เปิดกว้าง ผลงานร่วมกัน</h3>
      <p>จับมือกับพันธมิตรทั่วโลก ผลักดันการเผยแพร่และพัฒนาวัฒนธรรมการดื่มชาร่วมกัน</p>
    </div>
  </div>
</div>

<div class="about-scale">
  <h2>ขนาดแบรนด์</h2>
  <div class="scale-stats">
    <div class="stat-item">
      <span class="stat-number">600+</span>
      <span class="stat-label">ร้านค้าทั่วโลก</span>
    </div>
    <div class="stat-item">
      <span class="stat-number">20+</span>
      <span class="stat-label">ประเทศและภูมิภาค</span>
    </div>
    <div class="stat-item">
      <span class="stat-number">2017</span>
      <span class="stat-label">ปีที่ก่อตั้ง</span>
    </div>
    <div class="stat-item">
      <span class="stat-number">100M+</span>
      <span class="stat-label">ลูกค้าต่อปี</span>
    </div>
  </div>
</div>

<div class="about-services">
  <h2>พอร์ตโฟลิโอธุรกิจ</h2>
  <ul>
    <li>🏠 <strong>การดำเนินงานในจีน</strong> — Guangzhou Tanding Food & Beverage Management Co., Ltd. รับผิดชอบการดำเนินงานตลาดแผ่นดินใหญ่จีน</li>
    <li>🌏 <strong>การดำเนินงานต่างประเทศ</strong> — Tanding International (Hong Kong) Co., Ltd. รับผิดชอบการขยายตลาดทั่วโลก</li>
    <li>🏭 <strong>การผลิตวัตถุดิบ</strong> — Chaozhou Dingyi Food Co., Ltd. มุ่งเน้นการวิจัยและผลิตวัตถุดิบเครื่องดื่มชา</li>
    <li>🌱 <strong>การเพาะปลูกวัตถุดิบ</strong> — ไร่ชาและสวนผลไม้ของตัวเอง ทำให้มั่นใจในคุณภาพวัตถุดิบ</li>
    <li>🎭 <strong>การพัฒนาการท่องเที่ยวเชิงวัฒนธรรม</strong> — Liyunshan Cultural Development Co., Ltd. ส่งเสริมวัฒนธรรมชาและโครงการท่องเที่ยววัฒนธรรม</li>
    <li>🎪 <strong>บริการนิทรรศการ</strong> — แพลตฟอร์มบริการนิทรรศการชุมชนทั่วโลก</li>
  </ul>
</div>

<div class="about-contact">
  <h2>ติดต่อเรา</h2>
  <p>สำหรับความร่วมมือทางธุรกิจ การแฟรนไชส์แบรนด์ การสัมภาษณ์สื่อ ติดต่อเราได้ทุกเมื่อ</p>
  <a href="/contact" class="cta-button">ติดต่อเรา</a>
</div>`,
        seoTitle: 'เกี่ยวกับเรา - Tanding Lemon Tea',
        seoDesc: 'เรียนรู้เรื่องราวแบรนด์ พันธกิจ และค่านิยมของ Tanding Lemon Tea ร้านค้า 600+ แห่งทั่วโลก มุ่งเน้นเครื่องดื่มชาสุขภาพ จาก Chaozhouสู่โลก',
      },
      vi: {
        title: 'Về Chúng Tôi',
        content: `<div class="about-hero">
  <h1>Về Chúng Tôi</h1>
  <p class="subtitle">Tanding Lemon Tea — Để Thế Giới Yêu Thích Đồ Uống Trà Trung Quốc</p>
</div>

<div class="about-mission">
  <h2>Sứ Mệnh Thương Hiệu</h2>
  <p>Tanding có nguồn gốc từ Triều Sơn, được thành lập năm 2017, cam kết mang đến cho người tiêu dùng toàn cầu trải nghiệm thức uống trà chanh healthy, thơm ngon và độc đáo. Chúng tôi tin rằng một tách trà ngon có thể kết nối thế giới, và sự tận tâm có thể chạm đến trái tim con người.</p>
</div>

<div class="about-story">
  <h2>Câu Chuyện Thương Hiệu</h2>
  <p>Câu chuyện Tanding bắt đầu từ vườn chanh ở Triều Sơn. Người sáng lập với tình yêu và sự tận tâm dành cho trà, đã đi khắp đất nước để tìm kiếm những quả chanh và lá trà tốt nhất. Sau vô số lần điều chỉnh và thử nghiệm, cuối cùng chúng tôi đã phát triển công thức trà chanh độc quyền — chua ngọt cân bằng, tươi mát, hậu ngọt lưu lại, khó quên chỉ trong một hớp.</p>
  <p>Từ cửa hàng đầu tiên ở Quảng Châu đến 600+ cửa hàng trên toàn thế giới, Tanding luôn kiên định triết lý "Chất lượng là trên hết", pha chế mỗi tách trà bằng cả trái tim.</p>
</div>

<div class="about-values">
  <h2>Giá Trị Cốt Lõi</h2>
  <div class="values-grid">
    <div class="value-item">
      <h3>🌿 Chất Lượng Trên Hết</h3>
      <p>Tuyển chọn nguyên liệu cao cấp, kiểm soát chất lượng từ nguồn gốc, đảm bảo mỗi tách đều là tinh hoa.</p>
    </div>
    <div class="value-item">
      <h3>🤝 Khách Hàng Là Trọng Tâm</h3>
      <p>Luôn đặt trải nghiệm khách hàng lên hàng đầu, phục vụ mỗi người tiêu dùng tận tâm.</p>
    </div>
    <div class="value-item">
      <h3>💡 Đổi Mới Sáng Tạo</h3>
      <p>Không ngừng phát triển sản phẩm và hương vị mới, dẫn đầu xu hướng đổi mới trong ngành thức uống trà.</p>
    </div>
    <div class="value-item">
      <h3>🌏 Cởi Mở Cùng Thắng</h3>
      <p>Bắt tay với đối tác toàn cầu, cùng nhau thúc đẩy sự lan tỏa và phát triển của văn hóa thức uống trà.</p>
    </div>
  </div>
</div>

<div class="about-scale">
  <h2>Quy Mô Thương Hiệu</h2>
  <div class="scale-stats">
    <div class="stat-item">
      <span class="stat-number">600+</span>
      <span class="stat-label">Cửa Hàng Toàn Cầu</span>
    </div>
    <div class="stat-item">
      <span class="stat-number">20+</span>
      <span class="stat-label">Quốc Gia & Vùng Lãnh Thổ</span>
    </div>
    <div class="stat-item">
      <span class="stat-number">2017</span>
      <span class="stat-label">Năm Thành Lập</span>
    </div>
    <div class="stat-item">
      <span class="stat-number">100M+</span>
      <span class="stat-label">Lượt Khách Hàng Năm</span>
    </div>
  </div>
</div>

<div class="about-services">
  <h2>Danh Mục Kinh Doanh</h2>
  <ul>
    <li>🏠 <strong>Vận Hành Tại Trung Quốc</strong> — Guangzhou Tanding Food & Beverage Management Co., Ltd., chịu trách nhiệm vận hành thị trường Trung Quốc đại lục</li>
    <li>🌏 <strong>Vận Hành Quốc Tế</strong> — Tanding International (Hong Kong) Co., Ltd., chịu trách nhiệm mở rộng thị trường toàn cầu</li>
    <li>🏭 <strong>Sản Xuất Nguyên Liệu</strong> — Chaozhou Dingyi Food Co., Ltd., tập trung nghiên cứu và sản xuất nguyên liệu thức uống trà</li>
    <li>🌱 <strong>Trồng Trọt Nguyên Liệu</strong> — Trang trại Chaozhou Weimanduo, vườn trà và vườn cây ăn quả của riêng, đảm bảo chất lượng nguyên liệu</li>
    <li>🎭 <strong>Phát Triển Du Lịch Văn Hóa</strong> — Liyunshan (Guangzhou) Cultural Development Co., Ltd., quảng bá văn hóa trà và các dự án du lịch văn hóa</li>
    <li>🎪 <strong>Dịch Vụ Triển Lãm</strong> — Wenzhan International Network, nền tảng dịch vụ triển lãm toàn diện toàn cầu</li>
  </ul>
</div>

<div class="about-contact">
  <h2>Liên Hệ Với Chúng Tôi</h2>
  <p>Hợp tác kinh doanh, nhượng quyền thương hiệu, phỏng vấn truyền thông, liên hệ chúng tôi bất cứ lúc nào.</p>
  <a href="/contact" class="cta-button">Liên Hệ</a>
</div>`,
        seoTitle: 'Về Chúng Tôi - Tanding Lemon Tea',
        seoDesc: 'Tìm hiểu câu chuyện thương hiệu, sứ mệnh và giá trị của Tanding Lemon Tea. 600+ cửa hàng toàn cầu, tập trung vào thức uống trà healthy, từ Triều Sơn ra thế giới.',
      },
    },
  },
];

// Slugs to DELETE (contact, terms, privacy - all locales)
const slugsToDelete = [
  'contact', 'contact-en', 'contact-th', 'contact-vi',
  'terms', 'terms-en', 'terms-th', 'terms-vi',
  'privacy', 'privacy-en', 'privacy-th', 'privacy-vi',
];

async function main() {
  console.log('🔄 开始修复 CMS 单页内容...\n');

  // Step 1: 查看当前有哪些 CMS 页面
  const existing = await prisma.cmsPage.findMany({ orderBy: { slug: 'asc' } });
  console.log(`📋 当前 CMS 页面数量: ${existing.length}`);
  existing.forEach(p => {
    console.log(`  - [${p.locale}] ${p.slug} - "${p.title}" (${p.status})`);
  });
  console.log('');

  // Step 2: 删除 contact/terms/privacy 相关记录
  console.log('🗑️  删除 contact/terms/privacy 相关 CMS 记录...');
  for (const slug of slugsToDelete) {
    const deleted = await prisma.cmsPage.deleteMany({ where: { slug } });
    if (deleted.count > 0) {
      console.log(`  ✅ 已删除: ${slug}`);
    }
  }

  // Step 3: 创建 franchise/franchisee/about 的 4 语言记录
  console.log('\n✨ 创建/更新 franchise / franchisee / about 的 4 语言内容...\n');

  for (const page of pages) {
    for (const [locale, data] of Object.entries(page.locales)) {
      const fullSlug = locale === 'zh' ? page.slug : `${page.slug}-${locale}`;

      // 检查是否已存在
      const existingRecord = await prisma.cmsPage.findFirst({ where: { slug: fullSlug } });

      if (existingRecord) {
        // 更新
        await prisma.cmsPage.update({
          where: { id: existingRecord.id },
          data: {
            title: data.title,
            content: data.content,
            locale,
            status: 'published',
            seoTitle: data.seoTitle,
            seoDesc: data.seoDesc,
            showInNav: false,
          },
        });
        console.log(`  🔄 更新: [${locale}] ${fullSlug} - "${data.title}"`);
      } else {
        // 创建
        await prisma.cmsPage.create({
          data: {
            title: data.title,
            slug: fullSlug,
            content: data.content,
            locale,
            status: 'published',
            seoTitle: data.seoTitle,
            seoDesc: data.seoDesc,
            showInNav: false,
          },
        });
        console.log(`  ✅ 创建: [${locale}] ${fullSlug} - "${data.title}"`);
      }
    }
    console.log('');
  }

  // Step 4: 验证最终结果
  console.log('📋 最终 CMS 页面状态:');
  const final = await prisma.cmsPage.findMany({ orderBy: [{ slug: 'asc' }] });
  final.forEach(p => {
    console.log(`  - [${p.locale}] ${p.slug} - "${p.title}" (${p.status})`);
  });

  console.log(`\n✅ 完成！当前共 ${final.length} 条 CMS 页面记录`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());

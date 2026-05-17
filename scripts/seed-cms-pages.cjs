'use strict'
// Seed CMS content for privacy, terms, contact pages
// Run: node scripts/seed-cms-pages.cjs

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const cmsPages = [
  // ===== 隐私政策 Privacy =====
  {
    slug: 'privacy',
    title: '隐私政策',
    locale: 'zh',
    status: 'published',
    seoTitle: '隐私政策 - 中国国际加盟网',
    seoDesc: '中国国际加盟网隐私政策说明，保护用户个人信息安全',
    content: `<div class="prose max-w-none">
<h2>隐私政策</h2>
<p>中国国际加盟网（以下称"我们"）高度重视您的隐私保护。本隐私政策说明了我们如何收集、使用、存储和保护您的个人信息。</p>
<h3>一、信息收集</h3>
<p>我们收集的信息包括：您主动填写的姓名、联系方式、咨询内容；网站访问日志、IP地址、浏览器类型等自动收集的技术信息。</p>
<h3>二、信息使用</h3>
<p>我们使用您的信息用于：提供加盟咨询服务、回应您的留言反馈、改进网站内容、优化用户体验，以及法律法规要求的情形。</p>
<h3>三、信息保护</h3>
<p>我们采取行业标准的安全措施保护您的数据，包括数据加密、访问控制、安全审计等手段，防止数据被未经授权访问、泄露或损坏。</p>
<h3>四、信息共享</h3>
<p>未经您同意，我们不会向第三方出售或出租您的个人信息。在法律要求或保护我们的合法权益时，我们可能会披露相关信息。</p>
<h3>五、Cookie使用</h3>
<p>我们的网站使用Cookie技术来改善用户体验，包括记住您的语言偏好、分析网站流量等。您可以通过浏览器设置禁用Cookie。</p>
<h3>六、用户权利</h3>
<p>您有权查询、更正、删除您的个人信息。如需行使上述权利，请通过本页面联系方式与我们联系。</p>
<h3>七、政策更新</h3>
<p>我们可能会不时更新本隐私政策，更新内容将在本页发布。继续使用我们的服务即表示您同意修订后的政策。</p>
<h3>八、联系我们</h3>
<p>如对本隐私政策有任何疑问，请通过<a href="/contact">联系我们</a>页面获取联系方式。</p>
</div>`,
  },
  {
    slug: 'privacy-en',
    title: 'Privacy Policy',
    locale: 'en',
    status: 'published',
    seoTitle: 'Privacy Policy - China International Franchise Network',
    seoDesc: 'Privacy policy of China International Franchise Network, protecting your personal information.',
    content: `<div class="prose max-w-none">
<h2>Privacy Policy</h2>
<p>China International Franchise Network ("we", "us") values your privacy. This policy explains how we collect, use, store, and protect your personal information.</p>
<h3>1. Information Collection</h3>
<p>We collect information you actively provide (name, contact details, inquiry content) and automatically collected technical information (IP address, browser type, access logs).</p>
<h3>2. Use of Information</h3>
<p>We use your information to provide franchise consulting services, respond to inquiries, improve website content and user experience, and comply with legal requirements.</p>
<h3>3. Information Protection</h3>
<p>We implement industry-standard security measures including data encryption, access controls, and security audits to prevent unauthorized access, disclosure, or damage to your data.</p>
<h3>4. Information Sharing</h3>
<p>We do not sell or rent your personal information to third parties without your consent. We may disclose information when required by law or to protect our legitimate interests.</p>
<h3>5. Cookies</h3>
<p>Our website uses cookies to improve user experience, remember language preferences, and analyze traffic. You can disable cookies through your browser settings.</p>
<h3>6. Your Rights</h3>
<p>You have the right to access, correct, or delete your personal information. To exercise these rights, please contact us through our <a href="/en/contact">Contact</a> page.</p>
<h3>7. Policy Updates</h3>
<p>We may update this policy from time to time. Updated content will be posted on this page. Your continued use of our services indicates acceptance of the revised policy.</p>
<h3>8. Contact Us</h3>
<p>For questions about this privacy policy, please <a href="/en/contact">contact us</a>.</p>
</div>`,
  },
  {
    slug: 'privacy-th',
    title: 'นโยบายความเป็นส่วนตัว',
    locale: 'th',
    status: 'published',
    seoTitle: 'นโยบายความเป็นส่วนตัว - เครือข่ายแฟรนไชส์ระหว่างประเทศจีน',
    seoDesc: 'นโยบายความเป็นส่วนตัวของเครือข่ายแฟรนไชส์ระหว่างประเทศจีน',
    content: `<div class="prose max-w-none">
<h2>นโยบายความเป็นส่วนตัว</h2>
<p>เครือข่ายแฟรนไชส์ระหว่างประเทศจีน ("เรา") ให้ความสำคัญกับการคุ้มครองความเป็นส่วนตัวของคุณ นโยบายนี้อธิบายวิธีที่เราเก็บรวบรวม ใช้ จัดเก็บ และคุ้มครองข้อมูลส่วนบุคคลของคุณ</p>
<h3>1. การเก็บรวบรวมข้อมูล</h3>
<p>เราเก็บรวบรวมข้อมูลที่คุณให้โดยตรง (ชื่อ รายละเอียดการติดต่อ เนื้อหาคำถาม) และข้อมูลทางเทคนิคที่เก็บโดยอัตโนมัติ (ที่อยู่ IP ประเภทเบราว์เซอร์ บันทึกการเข้าชม)</p>
<h3>2. การใช้ข้อมูล</h3>
<p>เราใช้ข้อมูลของคุณเพื่อให้บริการให้คำปรึกษาแฟรนไชส์ ตอบคำถาม ปรับปรุงเนื้อหาเว็บไซต์ และปฏิบัติตามข้อกำหนดทางกฎหมาย</p>
<h3>3. การคุ้มครองข้อมูล</h3>
<p>เราใช้มาตรการรักษาความปลอดภัยตามมาตรฐานอุตสาหกรรม รวมถึงการเข้ารหัสข้อมูล การควบคุมการเข้าถึง และการตรวจสอบความปลอดภัย</p>
<h3>4. การแบ่งปันข้อมูล</h3>
<p>เราไม่ขายหรือให้เช่าข้อมูลส่วนบุคคลของคุณแก่บุคคลที่สามโดยไม่ได้รับความยินยอมจากคุณ</p>
<h3>5. คุกกี้</h3>
<p>เว็บไซต์ของเราใช้คุกกี้เพื่อปรับปรุงประสบการณ์ผู้ใช้ คุณสามารถปิดการใช้งานคุกกี้ผ่านการตั้งค่าเบราว์เซอร์ได้</p>
<h3>6. สิทธิ์ของคุณ</h3>
<p>คุณมีสิทธิ์เข้าถึง แก้ไข หรือลบข้อมูลส่วนบุคคลของคุณ หากต้องการใช้สิทธิ์เหล่านี้ โปรด<a href="/th/contact">ติดต่อเรา</a></p>
<h3>7. การอัปเดตนโยบาย</h3>
<p>เราอาจอัปเดตนโยบายนี้เป็นครั้งคราว เนื้อหาที่อัปเดตจะปรากฏบนหน้านี้</p>
<h3>8. ติดต่อเรา</h3>
<p>หากมีคำถามเกี่ยวกับนโยบายความเป็นส่วนตัวนี้ โปรด<a href="/th/contact">ติดต่อเรา</a></p>
</div>`,
  },
  {
    slug: 'privacy-vi',
    title: 'Chính Sách Bảo Mật',
    locale: 'vi',
    status: 'published',
    seoTitle: 'Chính Sách Bảo Mật - Mạng Lưới Nhượng Quyền Quốc Tế Trung Quốc',
    seoDesc: 'Chính sách bảo mật của Mạng Lưới Nhượng Quyền Quốc Tế Trung Quốc',
    content: `<div class="prose max-w-none">
<h2>Chính Sách Bảo Mật</h2>
<p>Mạng Lưới Nhượng Quyền Quốc Tế Trung Quốc ("chúng tôi") coi trọng quyền riêng tư của bạn. Chính sách này giải thích cách chúng tôi thu thập, sử dụng, lưu trữ và bảo vệ thông tin cá nhân của bạn.</p>
<h3>1. Thu Thập Thông Tin</h3>
<p>Chúng tôi thu thập thông tin bạn chủ động cung cấp (tên, thông tin liên hệ, nội dung câu hỏi) và thông tin kỹ thuật được thu thập tự động (địa chỉ IP, loại trình duyệt, nhật ký truy cập).</p>
<h3>2. Sử Dụng Thông Tin</h3>
<p>Chúng tôi sử dụng thông tin của bạn để cung cấp dịch vụ tư vấn nhượng quyền, trả lời câu hỏi, cải thiện nội dung trang web và tuân thủ yêu cầu pháp lý.</p>
<h3>3. Bảo Vệ Thông Tin</h3>
<p>Chúng tôi áp dụng các biện pháp bảo mật theo tiêu chuẩn ngành bao gồm mã hóa dữ liệu, kiểm soát truy cập và kiểm tra bảo mật.</p>
<h3>4. Chia Sẻ Thông Tin</h3>
<p>Chúng tôi không bán hoặc cho thuê thông tin cá nhân của bạn cho bên thứ ba khi chưa có sự đồng ý của bạn.</p>
<h3>5. Cookie</h3>
<p>Trang web của chúng tôi sử dụng cookie để cải thiện trải nghiệm người dùng. Bạn có thể tắt cookie thông qua cài đặt trình duyệt.</p>
<h3>6. Quyền Của Bạn</h3>
<p>Bạn có quyền truy cập, chỉnh sửa hoặc xóa thông tin cá nhân của mình. Để thực hiện quyền này, vui lòng<a href="/vi/contact">liên hệ với chúng tôi</a>.</p>
<h3>7. Cập Nhật Chính Sách</h3>
<p>Chúng tôi có thể cập nhật chính sách này theo thời gian. Nội dung cập nhật sẽ được đăng trên trang này.</p>
<h3>8. Liên Hệ</h3>
<p>Nếu có câu hỏi về chính sách bảo mật này, vui lòng<a href="/vi/contact">liên hệ với chúng tôi</a>.</p>
</div>`,
  },

  // ===== 使用条款 Terms =====
  {
    slug: 'terms',
    title: '使用条款',
    locale: 'zh',
    status: 'published',
    seoTitle: '使用条款 - 中国国际加盟网',
    seoDesc: '中国国际加盟网使用条款，规定用户使用平台服务的相关规则',
    content: `<div class="prose max-w-none">
<h2>使用条款</h2>
<p>欢迎使用中国国际加盟网。在使用本平台之前，请仔细阅读以下使用条款。通过访问或使用我们的网站，您表示同意遵守这些条款。</p>
<h3>一、服务说明</h3>
<p>中国国际加盟网为用户提供品牌加盟信息展示、加盟咨询、加盟商对接等服务。我们不对加盟项目的实际经营结果做任何承诺或保证。</p>
<h3>二、用户责任</h3>
<p>用户需保证所提供信息的真实性和合法性，不得利用本平台从事任何违法活动。用户应自行判断加盟项目的真实性和可行性，并承担相应风险。</p>
<h3>三、信息免责</h3>
<p>本平台展示的品牌信息由各品牌方提供或从公开渠道收集，我们尽力确保信息的准确性，但不对其真实性、完整性、及时性做任何保证。用户需自行核实相关信息。</p>
<h3>四、知识产权</h3>
<p>本平台的所有内容，包括但不限于文字、图片、标识、设计，均受知识产权法律保护。未经授权，任何人不得复制、修改、传播相关内容。</p>
<h3>五、服务变更</h3>
<p>我们保留随时修改或中断服务的权利，恕不另行通知。对于服务的任何修改或中断，我们不承担任何责任。</p>
<h3>六、争议解决</h3>
<p>本使用条款的解释和执行均适用中华人民共和国法律。因本条款引起的任何争议，双方应友好协商解决；协商不成的，提交有管辖权的人民法院诉讼解决。</p>
<h3>七、联系我们</h3>
<p>如对本使用条款有任何疑问，请通过<a href="/contact">联系我们</a>页面与我们联系。</p>
</div>`,
  },
  {
    slug: 'terms-en',
    title: 'Terms of Use',
    locale: 'en',
    status: 'published',
    seoTitle: 'Terms of Use - China International Franchise Network',
    seoDesc: 'Terms of Use for China International Franchise Network',
    content: `<div class="prose max-w-none">
<h2>Terms of Use</h2>
<p>Welcome to China International Franchise Network. Please read these Terms of Use carefully before using our platform. By accessing or using our website, you agree to be bound by these terms.</p>
<h3>1. Service Description</h3>
<p>We provide brand franchise information display, franchise consulting, and franchisee matching services. We make no promises or guarantees regarding actual business results of franchise projects.</p>
<h3>2. User Responsibilities</h3>
<p>Users must ensure the authenticity and legality of information provided and shall not use this platform for any illegal activities. Users should independently evaluate franchise projects and bear the associated risks.</p>
<h3>3. Information Disclaimer</h3>
<p>Brand information on our platform is provided by brand owners or collected from public sources. We strive to ensure accuracy but make no guarantees regarding authenticity, completeness, or timeliness. Users should verify information independently.</p>
<h3>4. Intellectual Property</h3>
<p>All content on this platform, including text, images, logos, and designs, is protected by intellectual property laws. No one may reproduce, modify, or distribute such content without authorization.</p>
<h3>5. Service Changes</h3>
<p>We reserve the right to modify or discontinue services at any time without prior notice. We are not liable for any modifications or interruptions to services.</p>
<h3>6. Dispute Resolution</h3>
<p>These Terms shall be governed by the laws of the People's Republic of China. Any disputes arising from these terms shall be resolved through friendly negotiation; if unsuccessful, litigation shall be pursued in the competent people's court.</p>
<h3>7. Contact Us</h3>
<p>For questions about these Terms of Use, please <a href="/en/contact">contact us</a>.</p>
</div>`,
  },
  {
    slug: 'terms-th',
    title: 'ข้อกำหนดการใช้งาน',
    locale: 'th',
    status: 'published',
    seoTitle: 'ข้อกำหนดการใช้งาน - เครือข่ายแฟรนไชส์ระหว่างประเทศจีน',
    seoDesc: 'ข้อกำหนดการใช้งานเครือข่ายแฟรนไชส์ระหว่างประเทศจีน',
    content: `<div class="prose max-w-none">
<h2>ข้อกำหนดการใช้งาน</h2>
<p>ยินดีต้อนรับสู่เครือข่ายแฟรนไชส์ระหว่างประเทศจีน โปรดอ่านข้อกำหนดการใช้งานเหล่านี้อย่างละเอียดก่อนใช้แพลตฟอร์มของเรา</p>
<h3>1. คำอธิบายบริการ</h3>
<p>เราให้บริการแสดงข้อมูลแฟรนไชส์ บริการให้คำปรึกษา และจับคู่ผู้รับแฟรนไชส์ เราไม่รับประกันผลลัพธ์ทางธุรกิจของโครงการแฟรนไชส์</p>
<h3>2. ความรับผิดชอบของผู้ใช้</h3>
<p>ผู้ใช้ต้องรับผิดชอบในความถูกต้องและความถูกกฎหมายของข้อมูลที่ให้ไว้ และต้องประเมินโครงการแฟรนไชส์ด้วยตนเอง</p>
<h3>3. ข้อจำกัดความรับผิดชอบข้อมูล</h3>
<p>เราพยายามให้ข้อมูลที่ถูกต้อง แต่ไม่รับประกันความถูกต้องสมบูรณ์ของข้อมูล ผู้ใช้ควรตรวจสอบข้อมูลด้วยตนเอง</p>
<h3>4. ทรัพย์สินทางปัญญา</h3>
<p>เนื้อหาทั้งหมดบนแพลตฟอร์มนี้ได้รับการคุ้มครองโดยกฎหมายทรัพย์สินทางปัญญา</p>
<h3>5. การเปลี่ยนแปลงบริการ</h3>
<p>เราขอสงวนสิทธิ์ในการแก้ไขหรือยกเลิกบริการได้ตลอดเวลาโดยไม่ต้องแจ้งล่วงหน้า</p>
<h3>6. การระงับข้อพิพาท</h3>
<p>ข้อกำหนดเหล่านี้อยู่ภายใต้กฎหมายของสาธารณรัฐประชาชนจีน</p>
<h3>7. ติดต่อเรา</h3>
<p>หากมีคำถามเกี่ยวกับข้อกำหนดการใช้งานนี้ โปรด<a href="/th/contact">ติดต่อเรา</a></p>
</div>`,
  },
  {
    slug: 'terms-vi',
    title: 'Điều Khoản Sử Dụng',
    locale: 'vi',
    status: 'published',
    seoTitle: 'Điều Khoản Sử Dụng - Mạng Lưới Nhượng Quyền Quốc Tế Trung Quốc',
    seoDesc: 'Điều khoản sử dụng Mạng lưới Nhượng quyền Quốc tế Trung Quốc',
    content: `<div class="prose max-w-none">
<h2>Điều Khoản Sử Dụng</h2>
<p>Chào mừng bạn đến với Mạng Lưới Nhượng Quyền Quốc Tế Trung Quốc. Vui lòng đọc kỹ các Điều Khoản Sử Dụng này trước khi sử dụng nền tảng của chúng tôi.</p>
<h3>1. Mô Tả Dịch Vụ</h3>
<p>Chúng tôi cung cấp dịch vụ hiển thị thông tin nhượng quyền, tư vấn nhượng quyền và kết nối đối tác nhượng quyền. Chúng tôi không đảm bảo kết quả kinh doanh thực tế của các dự án nhượng quyền.</p>
<h3>2. Trách Nhiệm Người Dùng</h3>
<p>Người dùng phải đảm bảo tính xác thực và hợp pháp của thông tin được cung cấp, và phải tự đánh giá các dự án nhượng quyền.</p>
<h3>3. Tuyên Bố Từ Chối Thông Tin</h3>
<p>Chúng tôi nỗ lực đảm bảo tính chính xác của thông tin nhưng không đảm bảo tính đầy đủ. Người dùng nên tự xác minh thông tin.</p>
<h3>4. Sở Hữu Trí Tuệ</h3>
<p>Tất cả nội dung trên nền tảng này được bảo vệ bởi luật sở hữu trí tuệ.</p>
<h3>5. Thay Đổi Dịch Vụ</h3>
<p>Chúng tôi bảo lưu quyền sửa đổi hoặc ngừng dịch vụ bất cứ lúc nào mà không cần thông báo trước.</p>
<h3>6. Giải Quyết Tranh Chấp</h3>
<p>Các Điều Khoản này được điều chỉnh bởi pháp luật Trung Quốc.</p>
<h3>7. Liên Hệ</h3>
<p>Nếu có câu hỏi về Điều Khoản Sử Dụng này, vui lòng<a href="/vi/contact">liên hệ với chúng tôi</a>.</p>
</div>`,
  },

  // ===== 联系我们 Contact =====
  {
    slug: 'contact',
    title: '联系我们',
    locale: 'zh',
    status: 'published',
    seoTitle: '联系我们 - 中国国际加盟网',
    seoDesc: '中国国际加盟网联系方式，招商合作咨询',
    content: `<div class="prose max-w-none">
<h2>联系我们</h2>
<p>中国国际加盟网诚邀品牌方、加盟商及合作伙伴加入我们的平台。如有任何疑问或合作意向，欢迎通过以下方式与我们取得联系。</p>
<h3>📧 电子邮件</h3>
<p>business@chinafranchise.cn</p>
<h3>📱 联系电话</h3>
<p>+86 138 0242 9520（微信同号）</p>
<h3>📍 公司地址</h3>
<p>广州市海珠区昌岗东路257号13楼</p>
<h3>🕐 工作时间</h3>
<p>周一至周五 9:00 - 18:00（节假日除外）</p>
<h3>🤝 合作方向</h3>
<ul>
<li><strong>品牌方合作</strong>：如果您是在华餐饮品牌，欢迎入驻我们的平台，展示品牌优势，对接优质加盟商资源。</li>
<li><strong>加盟商服务</strong>：为加盟商提供品牌推荐、选址评估、开业指导等全程支持服务。</li>
<li><strong>媒体合作</strong>：品牌推广、内容合作、活动策划等媒体商务合作。</li>
<li><strong>海外市场拓展</strong>：协助中国品牌出海，或引入海外优质品牌进入中国市场。</li>
</ul>
<h3>💬 在线咨询</h3>
<p>您也可以填写下方的在线咨询表单，我们将在1-2个工作日内尽快回复您的咨询。</p>
</div>`,
  },
  {
    slug: 'contact-en',
    title: 'Contact Us',
    locale: 'en',
    status: 'published',
    seoTitle: 'Contact Us - China International Franchise Network',
    seoDesc: 'Contact China International Franchise Network for franchise cooperation',
    content: `<div class="prose max-w-none">
<h2>Contact Us</h2>
<p>China International Franchise Network warmly invites brands, franchisees, and partners to join our platform. If you have any questions or cooperation intentions, please reach us through the following channels.</p>
<h3>📧 Email</h3>
<p>business@chinafranchise.cn</p>
<h3>📱 Phone</h3>
<p>+86 138 0242 9520 (WeChat: same number)</p>
<h3>📍 Office Address</h3>
<p>13F, No.257 Changgang East Road, Haizhu District, Guangzhou, China</p>
<h3>🕐 Business Hours</h3>
<p>Monday to Friday, 9:00 - 18:00 (excluding public holidays)</p>
<h3>🤝 Cooperation Areas</h3>
<ul>
<li><strong>Brand Cooperation</strong>: Chinese F&B brands are welcome to list on our platform, showcasing brand advantages and connecting with quality franchisees.</li>
<li><strong>Franchisee Services</strong>: Comprehensive support including brand recommendations, site selection evaluation, and opening guidance.</li>
<li><strong>Media Cooperation</strong>: Brand promotion, content cooperation, event planning, and other business partnerships.</li>
<li><strong>Overseas Expansion</strong>: Assisting Chinese brands going global or introducing quality overseas brands into the Chinese market.</li>
</ul>
<h3>💬 Online Inquiry</h3>
<p>You can also fill out the online inquiry form below. We will respond within 1-2 business days.</p>
</div>`,
  },
  {
    slug: 'contact-th',
    title: 'ติดต่อเรา',
    locale: 'th',
    status: 'published',
    seoTitle: 'ติดต่อเรา - เครือข่ายแฟรนไชส์ระหว่างประเทศจีน',
    seoDesc: 'ติดต่อเครือข่ายแฟรนไชส์ระหว่างประเทศจีนเพื่อความร่วมมือ',
    content: `<div class="prose max-w-none">
<h2>ติดต่อเรา</h2>
<p>เครือข่ายแฟรนไชส์ระหว่างประเทศจีนขอเชิญชวนแบรนด์ ผู้รับแฟรนไชส์ และพันธมิตรเข้าร่วมแพลตฟอร์มของเรา หากมีคำถามหรือต้องการร่วมมือ กรุณาติดต่อเรา</p>
<h3>📧 อีเมล</h3>
<p>business@chinafranchise.cn</p>
<h3>📱 โทรศัพท์</h3>
<p>+86 138 0242 9520 (WeChat: เบอร์เดียวกัน)</p>
<h3>📍 ที่อยู่สำนักงาน</h3>
<p>ชั้น 13, 257 ถนนฉางกางตะวันออก เขตไห่จู่ เมืองกว่างโจว ประเทศจีน</p>
<h3>🕐 ชั่วโมงทำการ</h3>
<p>วันจันทร์ - วันศุกร์ 09:00 - 18:00 (ยกเว้นวันหยุดราชการ)</p>
<h3>🤝 ด้านความร่วมมือ</h3>
<ul>
<li><strong>ความร่วมมือกับแบรนด์</strong>: แบรนด์อาหารและเครื่องดื่มจีนยินดีลงทะเบียนบนแพลตฟอร์มของเรา</li>
<li><strong>บริการผู้รับแฟรนไชส์</strong>: การสนับสนุนครบวงจร รวมถึงคำแนะนำแบรนด์ การประเมินสถานที่ และการแนะนำการเปิดตัว</li>
<li><strong>ความร่วมมือด้านสื่อ</strong>: การส่งเสริมแบรนด์ ความร่วมมือด้านเนื้อหา และการวางแผนกิจกรรม</li>
<li><strong>การขยายตลาดต่างประเทศ</strong>: ช่วยแบรนด์จีนออกสู่ตลาดโลก หรือนำเข้าแบรนด์ต่างชาติคุณภาพสู่ตลาดจีน</li>
</ul>
<h3>💬 สอบถามออนไลน์</h3>
<p>คุณสามารถกรอกแบบฟอร์มสอบถามออนไลน์ด้านล่าง เราจะตอบกลับภายใน 1-2 วันทำการ</p>
</div>`,
  },
  {
    slug: 'contact-vi',
    title: 'Liên Hệ',
    locale: 'vi',
    status: 'published',
    seoTitle: 'Liên Hệ - Mạng Lưới Nhượng Quyền Quốc Tế Trung Quốc',
    seoDesc: 'Liên hệ Mạng lưới Nhượng quyền Quốc tế Trung Quốc về hợp tác nhượng quyền',
    content: `<div class="prose max-w-none">
<h2>Liên Hệ</h2>
<p>Mạng Lưới Nhượng Quyền Quốc Tế Trung Quốc mời gọi các thương hiệu, nhượng quyền và đối tác tham gia nền tảng của chúng tôi. Nếu có câu hỏi hoặc ý định hợp tác, xin liên hệ với chúng tôi.</p>
<h3>📧 Email</h3>
<p>business@chinafranchise.cn</p>
<h3>📱 Điện Thoại</h3>
<p>+86 138 0242 9520 (WeChat: cùng số)</p>
<h3>📍 Địa Chỉ Văn Phòng</h3>
<p>Tầng 13, Số 257 Đường Changgang Đông, Quận Haizhu, Quảng Châu, Trung Quốc</p>
<h3>🕐 Giờ Làm Việc</h3>
<p>Thứ Hai - Thứ Sáu, 09:00 - 18:00 (Nghỉ lễ)</p>
<h3>🤝 Lĩnh Vực Hợp Tác</h3>
<ul>
<li><strong>Hợp Tác Thương Hiệu</strong>: Thương hiệu F&B Trung Quốc được chào đón đăng ký trên nền tảng của chúng tôi</li>
<li><strong>Dịch Vụ Nhượng Quyền</strong>: Hỗ trợ toàn diện bao gồm tư vấn thương hiệu, đánh giá địa điểm và hướng dẫn khai trương</li>
<li><strong>Hợp Tác Truyền Thông</strong>: Quảng bá thương hiệu, hợp tác nội dung và lập kế hoạch sự kiện</li>
<li><strong>Mở Rộng Thị Trường Nước Ngoài</strong>: Hỗ trợ thương hiệu Trung Quốc vươn ra toàn cầu hoặc đưa thương hiệu quốc tế chất lượng vào thị trường Trung Quốc</li>
</ul>
<h3>💬 Tư Vấn Trực Tuyến</h3>
<p>Bạn cũng có thể điền vào mẫu tư vấn trực tuyến bên dưới. Chúng tôi sẽ phản hồi trong vòng 1-2 ngày làm việc.</p>
</div>`,
  },
]

async function main() {
  let created = 0
  let skipped = 0

  for (const page of cmsPages) {
    const existing = await prisma.cmsPage.findFirst({ where: { slug: page.slug, locale: page.locale } })
    if (existing) {
      console.log('⏭️  Skip existing: ' + page.slug + ' (' + page.locale + ')')
      skipped++
      continue
    }

    await prisma.cmsPage.create({ data: page })
    console.log('✅ Created: ' + page.slug + ' (' + page.locale + ') — "' + page.title + '"')
    created++
  }

  console.log('\nDone: ' + created + ' created, ' + skipped + ' skipped')
}

main().catch(console.error).finally(() => prisma.$disconnect())

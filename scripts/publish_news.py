import paramiko
import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

ssh = paramiko.SSHClient()
ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
ssh.connect('124.156.140.166', username='ubuntu', password='Taning@2026!', timeout=15)

# ===== 1. 下载3张Unsplash图片到服务器 =====
print("=== Step 1: Downloading images from Unsplash ===")
download_cmds = '''
mkdir -p /home/ubuntu/china-franchise-net/public/uploads/news/
cd /home/ubuntu/china-franchise-net/public/uploads/news/

# 图片1: 茶饮店/奶茶店 (bubble tea shop)
curl -sL -o tea-overseas-1.jpg "https://images.unsplash.com/photo-1558857569-b0d4e7cc7a84?w=800&h=450&fit=crop&q=80" && echo "IMG1 OK: $(wc -c < tea-overseas-1.jpg) bytes"

# 图片2: 东南亚市场/城市街景 (Southeast Asia city)
curl -sL -o tea-overseas-2.jpg "https://images.unsplash.com/photo-1559564366-8a6fa5d7b2e3?w=800&h=450&fit=crop&q=80" && echo "IMG2 OK: $(wc -c < tea-overseas-2.jpg) bytes"

# 图片3: 茶饮制作/吧台 (tea bar)
curl -sL -o tea-overseas-3.jpg "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&h=450&fit=crop&q=80" && echo "IMG3 OK: $(wc -c < tea-overseas-3.jpg) bytes"

ls -la *.jpg
'''

stdin, stdout, stderr = ssh.exec_command(download_cmds, timeout=30)
print(stdout.read().decode('utf-8', errors='replace'))
print(stderr.read().decode('utf-8', errors='replace'))

# ===== 2. 创建并运行数据库插入脚本 =====
print("\n=== Step 2: Inserting articles into database ===")

node_script = r'''
const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();

const IMG_BASE = '/uploads/news/';

const articles = [
  // === 中文 ===
  {
    title: '中国茶饮品牌加速出海，东南亚市场成主战场',
    slug: 'china-tea-brands-go-global-2026-zh',
    content: `<h2>中国茶饮品牌加速出海，东南亚市场成主战场</h2>
<p>近年来，中国茶饮品牌加速布局海外市场，东南亚地区凭借地理位置相近、文化背景相似、消费习惯趋同等优势，成为中国茶饮品牌出海的首选目的地。</p>

<h3>头部品牌领跑出海</h3>
<p><strong>蜜雪冰城</strong>在全球拥有超过3.6万家门店，其中海外门店突破5000家，主要分布在越南、印尼、泰国、马来西亚等东南亚国家。其高性价比策略在海外市场同样奏效，单杯价格控制在3-5元人民币等值，迅速获得当地消费者青睐。</p>
<p><strong>喜茶</strong>则选择了高端路线，在新加坡、马来西亚、英国、美国等地开设门店，单杯价格定位在20-30元人民币等值，主打品质和新颖体验。<strong>奈雪的茶</strong>也在海外布局，重点拓展新加坡、日本、美国等成熟市场。</p>

<h3>出海挑战与机遇并存</h3>
<p>中国茶饮品牌在出海过程中面临诸多挑战：</p>
<ul>
<li><strong>本地化适应</strong>：需要根据当地口味调整配方，如降低甜度、增加当地特色配料</li>
<li><strong>供应链管理</strong>：海外原材料采购、物流配送、库存管理都需要重新建立</li>
<li><strong>文化差异</strong>：营销方式、品牌传播需要符合当地文化习惯</li>
<li><strong>合规经营</strong>：食品安全、劳动法规、税务政策等都需要严格遵守</li>
</ul>
<p>但同时，东南亚茶饮市场仍处于快速发展期，消费者对新鲜、健康、高性价比的茶饮需求旺盛，为中国品牌提供了广阔空间。</p>

<h3>未来趋势：数字化与本土化并重</h3>
<p>行业专家认为，中国茶饮品牌在出海过程中需要：</p>
<ul>
<li><strong>数字化运营</strong>：利用中国成熟的移动支付、会员体系、数据分析等数字化工具</li>
<li><strong>本土化创新</strong>：开发符合当地口味的产品，与当地文化深度融合</li>
<li><strong>供应链本地化</strong>：逐步建立本地供应链，降低成本，提高响应速度</li>
<li><strong>品牌文化建设</strong>：讲好中国茶故事，同时融入当地文化元素</li>
</ul>
<p>随着RCEP协议深入实施，中国与东盟国家的经贸合作将更加紧密，中国茶饮品牌在东南亚市场的发展前景广阔。</p>`,
    excerpt: '蜜雪冰城海外突破5000店，喜茶奈雪加速布局东南亚。中国茶饮品牌正以数字化+本土化双轮驱动抢占海外市场，RCEP红利下东南亚成为出海新主战场。',
    category: 'overseas-dynamic',
    locale: 'zh',
    status: 'published',
    featuredImg: IMG_BASE + 'tea-overseas-1.jpg',
    author: '中国特许经营网',
    sortOrder: 100,
  },
  // === 英文 ===
  {
    title: 'Chinese Tea Beverage Brands Accelerate Global Expansion, Southeast Asia Becomes Main Battlefield',
    slug: 'china-tea-brands-go-global-2026-en',
    content: `<h2>Chinese Tea Beverage Brands Accelerate Global Expansion, Southeast Asia Becomes Main Battlefield</h2>
<p>In recent years, Chinese tea beverage brands have accelerated their expansion into overseas markets. Southeast Asia has become the preferred destination for Chinese tea brands due to its geographical proximity, similar cultural backgrounds, and converging consumer habits.</p>

<h3>Leading Brands Pioneering Global Expansion</h3>
<p><strong>Mixue Ice Cream & Tea</strong> has over 36,000 stores globally, with more than 5,000 overseas stores mainly distributed in Vietnam, Indonesia, Thailand, Malaysia, and other Southeast Asian countries. Its high-cost-performance strategy has proven equally effective in overseas markets.</p>
<p><strong>HEYTEA</strong> has chosen a premium route, opening stores in Singapore, Malaysia, the UK, and the US. <strong>Nayuki</strong> is also expanding overseas, focusing on mature markets like Singapore, Japan, and the US.</p>

<h3>Challenges and Opportunities Coexist</h3>
<p>Chinese tea brands face many challenges in going global:</p>
<ul>
<li><strong>Localization adaptation</strong>: Adjusting formulations to local tastes</li>
<li><strong>Supply chain management</strong>: Rebuilding overseas procurement and logistics</li>
<li><strong>Cultural differences</strong>: Marketing must align with local culture</li>
<li><strong>Compliance</strong>: Food safety, labor laws, tax policies require strict adherence</li>
</ul>
<p>At the same time, the Southeast Asian tea market is in a rapid development period, providing broad space for Chinese brands.</p>

<h3>Future Trends: Digitalization and Localization</h3>
<p>Industry experts believe Chinese tea brands need to focus on digital operations, localized innovation, localized supply chains, and brand culture building as they expand globally.</p>
<p>With the deep implementation of RCEP, economic cooperation between China and ASEAN will become closer, offering bright prospects for Chinese tea brands in Southeast Asia.</p>`,
    excerpt: 'Mixue surpasses 5,000 overseas stores; HEYTEA and Nayuki accelerate Southeast Asia expansion. Chinese tea brands are driving global growth through digitalization and localization strategies.',
    category: 'overseas-dynamic',
    locale: 'en',
    status: 'published',
    featuredImg: IMG_BASE + 'tea-overseas-2.jpg',
    author: 'ChinaFranchise.net',
    sortOrder: 100,
  },
  // === 泰文 ===
  {
    title: 'แบรนด์เครื่องดื่มชาจีนเร่งขยายตลาดต่างประเทศ เอเชียตะวันออกเฉียงใต้กลายเป็นสมรภูมิหลัก',
    slug: 'china-tea-brands-go-global-2026-th',
    content: `<h2>แบรนด์เครื่องดื่มชาจีนเร่งขยายตลาดต่างประเทศ เอเชียตะวันออกเฉียงใต้กลายเป็นสมรภูมิหลัก</h2>
<p>ในปีล่าสุด แบรนด์เครื่องดื่มชาจีนได้เร่งขยายธุรกิจสู่ตลาดต่างประเทศ ภูมิภาคเอเชียตะวันออกเฉียงใต้กลายเป็นจุดหมายปลายทางหลักเนื่องจากความใกล้ชิดทางภูมิศาสตร์ วัฒนธรรมที่คล้ายคลึง และพฤติกรรมการบริโภคที่ใกล้เคียงกัน</p>

<h3>แบรนด์ชั้นนำนำการขยายตัวระดับโลก</h3>
<p><strong>มี่เสว่ยปิ้ง</strong> มีสาขามากกว่า 36,000 แห่งทั่วโลก โดยสาขาต่างประเทศเกิน 5,000 แห่ง กระจายอยู่ในเวียดนาม อินโดนีเซีย ไทย มาเลเซีย และประเทศอื่นๆ ในเอเชียตะวันออกเฉียงใต้</p>
<p><strong>เหอชา</strong> เลือกเส้นทางพรีเมียม เปิดสาขาในสิงคโปร์ มาเลเซีย สหราชอาณาจักร และสหรัฐอเมริกา</p>

<h3>ความท้าทายและโอกาส</h3>
<p>แบรนด์ชาจีนต้องเผชิญกับความท้าทายหลายประการ:</p>
<ul>
<li><strong>การปรับตัวให้เข้ากับท้องถิ่น</strong>: ปรับสูตรให้เข้ากับรสชาติท้องถิ่น</li>
<li><strong>การจัดการห่วงโซ่อุปทาน</strong>: สร้างระบบจัดซื้อและโลจิสติกส์ใหม่</li>
<li><strong>ความแตกต่างทางวัฒนธรรม</strong>: การตลาดต้องสอดคล้องกับวัฒนธรรมท้องถิ่น</li>
</ul>
<p>พร้อมกันนั้น ตลาดชาในเอเชียตะวันออกเฉียงใต้ยังอยู่ในช่วงพัฒนาอย่างรวดเร็ว มอบพื้นที่กว้างให้กับแบรนด์จีน</p>`,
    excerpt: 'มี่เสว่ยปิ้งทะลุ 5,000 สาขาต่างประเทศ เหอชาและ Nayuki เร่งขยายในเอเชียตะวันออกเฉียงใต้ แบรนด์ชาจีนกำลังขับเคลื่อนการเติบโตระดับโลกผ่านดิจิทัลและการทำให้เป็นท้องถิ่น',
    category: 'overseas-dynamic',
    locale: 'th',
    status: 'published',
    featuredImg: IMG_BASE + 'tea-overseas-3.jpg',
    author: 'ChinaFranchise.net',
    sortOrder: 100,
  },
  // === 越南文 ===
  {
    title: 'Cac thuong hieu tra Trung Quoc tang toc xuat khau, thi truong Dong Nam A thanh chien truong chinh',
    slug: 'china-tea-brands-go-global-2026-vi',
    content: `<h2>Cac thuong hieu tra Trung Quoc tang toc xuat khau, thi truong Dong Nam A thanh chien truong chinh</h2>
<p>Nam gan day, cac thuong hieu do uong tra Trung Quoc da tang toc mo rong ra thi truong nuoc ngoai. Khu vuc Dong Nam A da tro thanh diem den uu tien nhat cho cac thuong hieu tra Trung Quoc nhuoc ve vi tri dia ly gan giong, nen van hoa tuong tu, va thoi quen tieu dung giong nhau.</p>

<h3>Cac thuong hieu dau dan dan xuat phat quoc te</h3>
<p><strong>Mixue Bingcheng</strong> co hon 36,000 cua hang tren toan the gioi, trong do cua hang nuoc ngoai vuot qua 5,000, phan bo chinh o Viet Nam, Indonesia, Thai Lan, Malaysia va cac nuoc Dong Nam A khac.</p>
<p><strong>HEYTEA</strong> da chon duong cao cap, mo cua hang o Singapore, Malaysia, Anh va My.</p>

<h3>Thach thuc va co hoi dong song</h3>
<p>Cac thuong hieu tra Trung Quoc doi mat nhieu thach thuc khi xuat khau:</p>
<ul>
<li><strong>Thich nghi dia phuong</strong>: Can dieu chinh cong thuc theo vi vi dia phuong</li>
<li><strong>Quan ly chuoi cung ung</strong>: Xay dung lai he thong mua sam va logistic</li>
<li><strong>Khac biet van hoa</strong>: Marketing phai phu hop voi van hoa dia phuong</li>
</ul>
<p>Dong thoi, thi truong tra o Dong Nam A van dang trong giai doan phat trien nhanh, mang lai khong gian rong rao cho cac thuong hieu Trung Quoc.</p>`,
    excerpt: 'Mixue vuot qua 5,000 cua hang nuoc ngoai; HEYTEA va Nayuki tang toc mo rong o Dong Nam A. Cac thuong hieu tra Trung Quoc dang day tang truong toan cau bang chien luoc so hoa va dia phuong hoa.',
    category: 'overseas-dynamic',
    locale: 'vi',
    status: 'published',
    featuredImg: IMG_BASE + 'tea-overseas-1.jpg',
    author: 'ChinaFranchise.net',
    sortOrder: 100,
  },
];

async function main() {
  let count = 0;
  for (const article of articles) {
    try {
      const result = await p.article.create({ data: article });
      console.log('OK:', article.locale, article.title, '-> id:', result.id);
      count++;
    } catch (e) {
      if (e.code === 'P2002') {
        console.log('EXISTS (slug duplicate):', article.locale, article.slug);
        // 如果slug重复，更新已有记录
        const updated = await p.article.update({
          where: { slug: article.slug },
          data: article
        });
        console.log('UPDATED:', article.locale, article.title, '-> id:', updated.id);
        count++;
      } else {
        console.error('ERROR:', article.locale, e.message);
      }
    }
  }
  console.log('\\nTotal inserted/updated:', count, '/', articles.length);
}

main().finally(() => p.$disconnect());
'''

sftp = ssh.open_sftp()
with sftp.file('/tmp/create_news.js', 'w') as f:
    f.write(node_script)
sftp.close()

stdin, stdout, stderr = ssh.exec_command('cd /home/ubuntu/china-franchise-net && NODE_PATH=./node_modules node /tmp/create_news.js', timeout=30)
print(stdout.read().decode('utf-8', errors='replace'))
err = stderr.read().decode('utf-8', errors='replace')
if err.strip():
    print('STDERR:', err)

ssh.close()
print("\n=== DONE ===")

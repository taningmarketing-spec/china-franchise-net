// Seed CMS content for privacy, terms, contact pages
// Run: node scripts/seed-cms-pages.js

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const cmsPages = [
  // ===== 闅愮鏀跨瓥 Privacy =====
  {
    slug: 'privacy',
    title: '闅愮鏀跨瓥',
    locale: 'zh',
    status: 'published',
    seoTitle: '闅愮鏀跨瓥 - 涓浗鍥介檯鍔犵洘缃?,
    seoDesc: '涓浗鍥介檯鍔犵洘缃戦殣绉佹斂绛栬鏄庯紝淇濇姢鐢ㄦ埛涓汉淇℃伅瀹夊叏',
    content: `<div class="prose max-w-none">
<h2>闅愮鏀跨瓥</h2>
<p>涓浗鍥介檯鍔犵洘缃戯紙浠ヤ笅绉?鎴戜滑"锛夐珮搴﹂噸瑙嗘偍鐨勯殣绉佷繚鎶ゃ€傛湰闅愮鏀跨瓥璇存槑浜嗘垜浠浣曟敹闆嗐€佷娇鐢ㄣ€佸瓨鍌ㄥ拰淇濇姢鎮ㄧ殑涓汉淇℃伅銆?/p>
<h3>涓€銆佷俊鎭敹闆?/h3>
<p>鎴戜滑鏀堕泦鐨勪俊鎭寘鎷細鎮ㄤ富鍔ㄥ～鍐欑殑濮撳悕銆佽仈绯绘柟寮忋€佸挩璇㈠唴瀹癸紱缃戠珯璁块棶鏃ュ織銆両P鍦板潃銆佹祻瑙堝櫒绫诲瀷绛夎嚜鍔ㄦ敹闆嗙殑鎶€鏈俊鎭€?/p>
<h3>浜屻€佷俊鎭娇鐢?/h3>
<p>鎴戜滑浣跨敤鎮ㄧ殑淇℃伅鐢ㄤ簬锛氭彁渚涘姞鐩熷挩璇㈡湇鍔°€佸洖搴旀偍鐨勭暀瑷€鍙嶉銆佹敼杩涚綉绔欏唴瀹广€佷紭鍖栫敤鎴蜂綋楠岋紝浠ュ強娉曞緥娉曡瑕佹眰鐨勬儏褰€?/p>
<h3>涓夈€佷俊鎭繚鎶?/h3>
<p>鎴戜滑閲囧彇琛屼笟鏍囧噯鐨勫畨鍏ㄦ帾鏂戒繚鎶ゆ偍鐨勬暟鎹紝鍖呮嫭鏁版嵁鍔犲瘑銆佽闂帶鍒躲€佸畨鍏ㄥ璁＄瓑鎵嬫锛岄槻姝㈡暟鎹鏈粡鎺堟潈璁块棶銆佹硠闇叉垨鎹熷潖銆?/p>
<h3>鍥涖€佷俊鎭叡浜?/h3>
<p>鏈粡鎮ㄥ悓鎰忥紝鎴戜滑涓嶄細鍚戠涓夋柟鍑哄敭鎴栧嚭绉熸偍鐨勪釜浜轰俊鎭€傚湪娉曞緥瑕佹眰鎴栦繚鎶ゆ垜浠殑鍚堟硶鏉冪泭鏃讹紝鎴戜滑鍙兘浼氭姭闇茬浉鍏充俊鎭€?/p>
<h3>浜斻€丆ookie浣跨敤</h3>
<p>鎴戜滑鐨勭綉绔欎娇鐢–ookie鎶€鏈潵鏀瑰杽鐢ㄦ埛浣撻獙锛屽寘鎷浣忔偍鐨勮瑷€鍋忓ソ銆佸垎鏋愮綉绔欐祦閲忕瓑銆傛偍鍙互閫氳繃娴忚鍣ㄨ缃鐢–ookie銆?/p>
<h3>鍏€佺敤鎴锋潈鍒?/h3>
<p>鎮ㄦ湁鏉冩煡璇€佹洿姝ｃ€佸垹闄ゆ偍鐨勪釜浜轰俊鎭€傚闇€琛屼娇涓婅堪鏉冨埄锛岃閫氳繃鏈〉闈㈣仈绯绘柟寮忎笌鎴戜滑鑱旂郴銆?/p>
<h3>涓冦€佹斂绛栨洿鏂?/h3>
<p>鎴戜滑鍙兘浼氫笉鏃舵洿鏂版湰闅愮鏀跨瓥锛屾洿鏂板唴瀹瑰皢鍦ㄦ湰椤靛彂甯冦€傜户缁娇鐢ㄦ垜浠殑鏈嶅姟鍗宠〃绀烘偍鍚屾剰淇鍚庣殑鏀跨瓥銆?/p>
<h3>鍏€佽仈绯绘垜浠?/h3>
<p>濡傚鏈殣绉佹斂绛栨湁浠讳綍鐤戦棶锛岃閫氳繃<a href="/contact">鑱旂郴鎴戜滑</a>椤甸潰鑾峰彇鑱旂郴鏂瑰紡銆?/p>
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
    title: '喔權箓喔⑧笟喔侧涪喔勦抚喔侧浮喙€喔涏箛喔權釜喙堗抚喔權笗喔编抚',
    locale: 'th',
    status: 'published',
    seoTitle: '喔權箓喔⑧笟喔侧涪喔勦抚喔侧浮喙€喔涏箛喔權釜喙堗抚喔權笗喔编抚 - 喙€喔勦福喔粪腑喔傕箞喔侧涪喙佮笩喔｀笝喙勦笂喔箤喔｀赴喔抚喙堗覆喔囙笡喔｀赴喙€喔椸辅喔堗傅喔?,
    seoDesc: '喔權箓喔⑧笟喔侧涪喔勦抚喔侧浮喙€喔涏箛喔權釜喙堗抚喔權笗喔编抚喔傕腑喔囙箑喔勦福喔粪腑喔傕箞喔侧涪喙佮笩喔｀笝喙勦笂喔箤喔｀赴喔抚喙堗覆喔囙笡喔｀赴喙€喔椸辅喔堗傅喔?,
    content: `<div class="prose max-w-none">
<h2>喔權箓喔⑧笟喔侧涪喔勦抚喔侧浮喙€喔涏箛喔權釜喙堗抚喔權笗喔编抚</h2>
<p>喙€喔勦福喔粪腑喔傕箞喔侧涪喙佮笩喔｀笝喙勦笂喔箤喔｀赴喔抚喙堗覆喔囙笡喔｀赴喙€喔椸辅喔堗傅喔?("喙€喔｀覆") 喙冟斧喙夃竸喔о覆喔∴釜喔赤竸喔编笉喔佮副喔氞竵喔侧福喔勦父喙夃浮喔勦福喔竾喔勦抚喔侧浮喙€喔涏箛喔權釜喙堗抚喔權笗喔编抚喔傕腑喔囙竸喔膏笓 喔權箓喔⑧笟喔侧涪喔權傅喙夃腑喔樴复喔氞覆喔⑧抚喔脆笜喔掂笚喔掂箞喙€喔｀覆喙€喔佮箛喔氞福喔о笟喔｀抚喔?喙冟笂喙?喔堗副喔斷箑喔佮箛喔?喙佮弗喔班竸喔膏箟喔∴竸喔｀腑喔囙競喙夃腑喔∴腹喔ム釜喙堗抚喔權笟喔膏竸喔勦弗喔傕腑喔囙竸喔膏笓</p>
<h3>1. 喔佮覆喔｀箑喔佮箛喔氞福喔о笟喔｀抚喔∴競喙夃腑喔∴腹喔?/h3>
<p>喙€喔｀覆喙€喔佮箛喔氞福喔о笟喔｀抚喔∴競喙夃腑喔∴腹喔ム笚喔掂箞喔勦父喔撪箖喔箟喙傕笖喔⑧笗喔｀竾 (喔娻阜喙堗腑 喔｀覆喔⑧弗喔班箑喔傅喔⑧笖喔佮覆喔｀笗喔脆笖喔曕箞喔?喙€喔權阜喙夃腑喔覆喔勦赋喔栢覆喔? 喙佮弗喔班競喙夃腑喔∴腹喔ム笚喔侧竾喙€喔椸竸喔權复喔勦笚喔掂箞喙€喔佮箛喔氞箓喔斷涪喔副喔曕箓喔權浮喔编笗喔?(喔椸傅喙堗腑喔⑧腹喙?IP 喔涏福喔班箑喔犩笚喙€喔氞福喔侧抚喙屶箑喔嬥腑喔｀箤 喔氞副喔權笚喔多竵喔佮覆喔｀箑喔傕箟喔侧笂喔?</p>
<h3>2. 喔佮覆喔｀箖喔娻箟喔傕箟喔浮喔灌弗</h3>
<p>喙€喔｀覆喙冟笂喙夃競喙夃腑喔∴腹喔ム競喔竾喔勦父喔撪箑喔炧阜喙堗腑喙冟斧喙夃笟喔｀复喔佮覆喔｀箖喔箟喔勦赋喔涏福喔多竵喔┼覆喙佮笩喔｀笝喙勦笂喔箤 喔曕腑喔氞竸喔赤笘喔侧浮 喔涏福喔编笟喔涏福喔膏竾喙€喔權阜喙夃腑喔覆喙€喔о箛喔氞箘喔嬥笗喙?喙佮弗喔班笡喔忇复喔氞副喔曕复喔曕覆喔∴競喙夃腑喔佮赋喔笝喔斷笚喔侧竾喔佮笌喔浮喔侧涪</p>
<h3>3. 喔佮覆喔｀竸喔膏箟喔∴竸喔｀腑喔囙競喙夃腑喔∴腹喔?/h3>
<p>喙€喔｀覆喙冟笂喙夃浮喔侧笗喔｀竵喔侧福喔｀副喔佮俯喔侧竸喔о覆喔∴笡喔ム腑喔斷笭喔编涪喔曕覆喔∴浮喔侧笗喔｀笎喔侧笝喔父喔曕釜喔侧斧喔佮福喔｀浮 喔｀抚喔∴笘喔多竾喔佮覆喔｀箑喔傕箟喔侧福喔副喔競喙夃腑喔∴腹喔?喔佮覆喔｀竸喔о笟喔勦父喔∴竵喔侧福喙€喔傕箟喔侧笘喔多竾 喙佮弗喔班竵喔侧福喔曕福喔о笀喔腑喔氞竸喔о覆喔∴笡喔ム腑喔斷笭喔编涪</p>
<h3>4. 喔佮覆喔｀箒喔氞箞喔囙笡喔编笝喔傕箟喔浮喔灌弗</h3>
<p>喙€喔｀覆喙勦浮喙堗競喔侧涪喔福喔粪腑喙冟斧喙夃箑喔娻箞喔侧競喙夃腑喔∴腹喔ム釜喙堗抚喔權笟喔膏竸喔勦弗喔傕腑喔囙竸喔膏笓喙佮竵喙堗笟喔膏竸喔勦弗喔椸傅喙堗釜喔侧浮喙傕笖喔⑧箘喔∴箞喙勦笖喙夃福喔编笟喔勦抚喔侧浮喔⑧复喔權涪喔浮喔堗覆喔佮竸喔膏笓</p>
<h3>5. 喔勦父喔佮竵喔掂箟</h3>
<p>喙€喔о箛喔氞箘喔嬥笗喙屶競喔竾喙€喔｀覆喙冟笂喙夃竸喔膏竵喔佮傅喙夃箑喔炧阜喙堗腑喔涏福喔编笟喔涏福喔膏竾喔涏福喔班釜喔氞竵喔侧福喔撪箤喔溹腹喙夃箖喔娻箟 喔勦父喔撪釜喔侧浮喔侧福喔栢笡喔脆笖喔佮覆喔｀箖喔娻箟喔囙覆喔權竸喔膏竵喔佮傅喙夃笢喙堗覆喔權竵喔侧福喔曕副喙夃竾喔勦箞喔侧箑喔氞福喔侧抚喙屶箑喔嬥腑喔｀箤喙勦笖喙?/p>
<h3>6. 喔复喔椸笜喔脆箤喔傕腑喔囙竸喔膏笓</h3>
<p>喔勦父喔撪浮喔掂釜喔脆笚喔樴复喙屶箑喔傕箟喔侧笘喔多竾 喙佮竵喙夃箘喔?喔福喔粪腑喔ム笟喔傕箟喔浮喔灌弗喔箞喔о笝喔氞父喔勦竸喔ム競喔竾喔勦父喔?喔覆喔佮笗喙夃腑喔囙竵喔侧福喙冟笂喙夃釜喔脆笚喔樴复喙屶箑喔弗喙堗覆喔權傅喙?喙傕笡喔｀笖<a href="/th/contact">喔曕复喔斷笗喙堗腑喙€喔｀覆</a></p>
<h3>7. 喔佮覆喔｀腑喔编笡喙€喔斷笗喔權箓喔⑧笟喔侧涪</h3>
<p>喙€喔｀覆喔覆喔堗腑喔编笡喙€喔斷笗喔權箓喔⑧笟喔侧涪喔權傅喙夃箑喔涏箛喔權竸喔｀副喙夃竾喔勦福喔侧抚 喙€喔權阜喙夃腑喔覆喔椸傅喙堗腑喔编笡喙€喔斷笗喔堗赴喔涏福喔侧竵喔忇笟喔權斧喔權箟喔侧笝喔掂箟</p>
<h3>8. 喔曕复喔斷笗喙堗腑喙€喔｀覆</h3>
<p>喔覆喔佮浮喔掂竸喔赤笘喔侧浮喙€喔佮傅喙堗涪喔о竵喔编笟喔權箓喔⑧笟喔侧涪喔勦抚喔侧浮喙€喔涏箛喔權釜喙堗抚喔權笗喔编抚喔權傅喙?喙傕笡喔｀笖<a href="/th/contact">喔曕复喔斷笗喙堗腑喙€喔｀覆</a></p>
</div>`,
  },
  {
    slug: 'privacy-vi',
    title: 'Ch铆nh S谩ch B岷 M岷璽',
    locale: 'vi',
    status: 'published',
    seoTitle: 'Ch铆nh S谩ch B岷 M岷璽 - M岷g L瓢峄沬 Nh瓢峄g Quy峄乶 Qu峄慶 T岷?Trung Qu峄慶',
    seoDesc: 'Ch铆nh s谩ch b岷 m岷璽 c峄 M岷g L瓢峄沬 Nh瓢峄g Quy峄乶 Qu峄慶 T岷?Trung Qu峄慶',
    content: `<div class="prose max-w-none">
<h2>Ch铆nh S谩ch B岷 M岷璽</h2>
<p>M岷g L瓢峄沬 Nh瓢峄g Quy峄乶 Qu峄慶 T岷?Trung Qu峄慶 ("ch煤ng t么i") coi tr峄峮g quy峄乶 ri锚ng t瓢 c峄 b岷. Ch铆nh s谩ch n脿y gi岷 th铆ch c谩ch ch煤ng t么i thu th岷璸, s峄?d峄g, l瓢u tr峄?v脿 b岷 v峄?th么ng tin c谩 nh芒n c峄 b岷.</p>
<h3>1. Thu Th岷璸 Th么ng Tin</h3>
<p>Ch煤ng t么i thu th岷璸 th么ng tin b岷 ch峄?膽峄檔g cung c岷 (t锚n, th么ng tin li锚n h峄? n峄檌 dung c芒u h峄廼) v脿 th么ng tin k峄?thu岷璽 膽瓢峄 thu th岷璸 t峄?膽峄檔g (膽峄媋 ch峄?IP, lo岷 tr矛nh duy峄噒, nh岷璽 k媒 truy c岷璸).</p>
<h3>2. S峄?D峄g Th么ng Tin</h3>
<p>Ch煤ng t么i s峄?d峄g th么ng tin c峄 b岷 膽峄?cung c岷 d峄媍h v峄?t瓢 v岷 nh瓢峄g quy峄乶, tr岷?l峄漣 c芒u h峄廼, c岷 thi峄噉 n峄檌 dung trang web v脿 tu芒n th峄?y锚u c岷 ph谩p l媒.</p>
<h3>3. B岷 V峄?Th么ng Tin</h3>
<p>Ch煤ng t么i 谩p d峄g c谩c bi峄噉 ph谩p b岷 m岷璽 theo ti锚u chu岷﹏ ng脿nh bao g峄搈 m茫 h贸a d峄?li峄噓, ki峄僲 so谩t truy c岷璸 v脿 ki峄僲 tra b岷 m岷璽.</p>
<h3>4. Chia S岷?Th么ng Tin</h3>
<p>Ch煤ng t么i kh么ng b谩n ho岷穋 cho thu锚 th么ng tin c谩 nh芒n c峄 b岷 cho b锚n th峄?ba khi ch瓢a c贸 s峄?膽峄搉g 媒 c峄 b岷.</p>
<h3>5. Cookie</h3>
<p>Trang web c峄 ch煤ng t么i s峄?d峄g cookie 膽峄?c岷 thi峄噉 tr岷 nghi峄噈 ng瓢峄漣 d霉ng. B岷 c贸 th峄?t岷痶 cookie th么ng qua c脿i 膽岷穞 tr矛nh duy峄噒.</p>
<h3>6. Quy峄乶 C峄 B岷</h3>
<p>B岷 c贸 quy峄乶 truy c岷璸, ch峄塶h s峄璦 ho岷穋 x贸a th么ng tin c谩 nh芒n c峄 m矛nh. 膼峄?th峄眂 hi峄噉 quy峄乶 n脿y, vui l貌ng<a href="/vi/contact">li锚n h峄?v峄沬 ch煤ng t么i</a>.</p>
<h3>7. C岷璸 Nh岷璽 Ch铆nh S谩ch</h3>
<p>Ch煤ng t么i c贸 th峄?c岷璸 nh岷璽 ch铆nh s谩ch n脿y theo th峄漣 gian. N峄檌 dung c岷璸 nh岷璽 s岷?膽瓢峄 膽膬ng tr锚n trang n脿y.</p>
<h3>8. Li锚n H峄?/h3>
<p>N岷縰 c贸 c芒u h峄廼 v峄?ch铆nh s谩ch b岷 m岷璽 n脿y, vui l貌ng<a href="/vi/contact">li锚n h峄?v峄沬 ch煤ng t么i</a>.</p>
</div>`,
  },

  // ===== 浣跨敤鏉℃ Terms =====
  {
    slug: 'terms',
    title: '浣跨敤鏉℃',
    locale: 'zh',
    status: 'published',
    seoTitle: '浣跨敤鏉℃ - 涓浗鍥介檯鍔犵洘缃?,
    seoDesc: '涓浗鍥介檯鍔犵洘缃戜娇鐢ㄦ潯娆撅紝瑙勫畾鐢ㄦ埛浣跨敤骞冲彴鏈嶅姟鐨勭浉鍏宠鍒?,
    content: `<div class="prose max-w-none">
<h2>浣跨敤鏉℃</h2>
<p>娆㈣繋浣跨敤涓浗鍥介檯鍔犵洘缃戙€傚湪浣跨敤鏈钩鍙颁箣鍓嶏紝璇蜂粩缁嗛槄璇讳互涓嬩娇鐢ㄦ潯娆俱€傞€氳繃璁块棶鎴栦娇鐢ㄦ垜浠殑缃戠珯锛屾偍琛ㄧず鍚屾剰閬靛畧杩欎簺鏉℃銆?/p>
<h3>涓€銆佹湇鍔¤鏄?/h3>
<p>涓浗鍥介檯鍔犵洘缃戜负鐢ㄦ埛鎻愪緵鍝佺墝鍔犵洘淇℃伅灞曠ず銆佸姞鐩熷挩璇€佸姞鐩熷晢瀵规帴绛夋湇鍔°€傛垜浠笉瀵瑰姞鐩熼」鐩殑瀹為檯缁忚惀缁撴灉鍋氫换浣曟壙璇烘垨淇濊瘉銆?/p>
<h3>浜屻€佺敤鎴疯矗浠?/h3>
<p>鐢ㄦ埛闇€淇濊瘉鎵€鎻愪緵淇℃伅鐨勭湡瀹炴€у拰鍚堟硶鎬э紝涓嶅緱鍒╃敤鏈钩鍙颁粠浜嬩换浣曡繚娉曟椿鍔ㄣ€傜敤鎴峰簲鑷鍒ゆ柇鍔犵洘椤圭洰鐨勭湡瀹炴€у拰鍙鎬э紝骞舵壙鎷呯浉搴旈闄┿€?/p>
<h3>涓夈€佷俊鎭厤璐?/h3>
<p>鏈钩鍙板睍绀虹殑鍝佺墝淇℃伅鐢卞悇鍝佺墝鏂规彁渚涙垨浠庡叕寮€娓犻亾鏀堕泦锛屾垜浠敖鍔涚‘淇濅俊鎭殑鍑嗙‘鎬э紝浣嗕笉瀵瑰叾鐪熷疄鎬с€佸畬鏁存€с€佸強鏃舵€у仛浠讳綍淇濊瘉銆傜敤鎴烽渶鑷鏍稿疄鐩稿叧淇℃伅銆?/p>
<h3>鍥涖€佺煡璇嗕骇鏉?/h3>
<p>鏈钩鍙扮殑鎵€鏈夊唴瀹癸紝鍖呮嫭浣嗕笉闄愪簬鏂囧瓧銆佸浘鐗囥€佹爣璇嗐€佽璁★紝鍧囧彈鐭ヨ瘑浜ф潈娉曞緥淇濇姢銆傛湭缁忔巿鏉冿紝浠讳綍浜轰笉寰楀鍒躲€佷慨鏀广€佷紶鎾浉鍏冲唴瀹广€?/p>
<h3>浜斻€佹湇鍔″彉鏇?/h3>
<p>鎴戜滑淇濈暀闅忔椂淇敼鎴栦腑鏂湇鍔＄殑鏉冨埄锛屾仌涓嶅彟琛岄€氱煡銆傚浜庢湇鍔＄殑浠讳綍淇敼鎴栦腑鏂紝鎴戜滑涓嶆壙鎷呬换浣曡矗浠汇€?/p>
<h3>鍏€佷簤璁В鍐?/h3>
<p>鏈娇鐢ㄦ潯娆剧殑瑙ｉ噴鍜屾墽琛屽潎閫傜敤涓崕浜烘皯鍏卞拰鍥芥硶寰嬨€傚洜鏈潯娆惧紩璧风殑浠讳綍浜夎锛屽弻鏂瑰簲鍙嬪ソ鍗忓晢瑙ｅ喅锛涘崗鍟嗕笉鎴愮殑锛屾彁浜ゆ湁绠¤緰鏉冪殑浜烘皯娉曢櫌璇夎瑙ｅ喅銆?/p>
<h3>涓冦€佽仈绯绘垜浠?/h3>
<p>濡傚鏈娇鐢ㄦ潯娆炬湁浠讳綍鐤戦棶锛岃閫氳繃<a href="/contact">鑱旂郴鎴戜滑</a>椤甸潰涓庢垜浠仈绯汇€?/p>
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
    title: '喔傕箟喔竵喔赤斧喔權笖喔佮覆喔｀箖喔娻箟喔囙覆喔?,
    locale: 'th',
    status: 'published',
    seoTitle: '喔傕箟喔竵喔赤斧喔權笖喔佮覆喔｀箖喔娻箟喔囙覆喔?- 喙€喔勦福喔粪腑喔傕箞喔侧涪喙佮笩喔｀笝喙勦笂喔箤喔｀赴喔抚喙堗覆喔囙笡喔｀赴喙€喔椸辅喔堗傅喔?,
    seoDesc: '喔傕箟喔竵喔赤斧喔權笖喔佮覆喔｀箖喔娻箟喔囙覆喔權箑喔勦福喔粪腑喔傕箞喔侧涪喙佮笩喔｀笝喙勦笂喔箤喔｀赴喔抚喙堗覆喔囙笡喔｀赴喙€喔椸辅喔堗傅喔?,
    content: `<div class="prose max-w-none">
<h2>喔傕箟喔竵喔赤斧喔權笖喔佮覆喔｀箖喔娻箟喔囙覆喔?/h2>
<p>喔⑧复喔權笖喔掂笗喙夃腑喔權福喔编笟喔腹喙堗箑喔勦福喔粪腑喔傕箞喔侧涪喙佮笩喔｀笝喙勦笂喔箤喔｀赴喔抚喙堗覆喔囙笡喔｀赴喙€喔椸辅喔堗傅喔?喙傕笡喔｀笖喔箞喔侧笝喔傕箟喔竵喔赤斧喔權笖喔佮覆喔｀箖喔娻箟喔囙覆喔權箑喔弗喙堗覆喔權傅喙夃腑喔⑧箞喔侧竾喔ム赴喙€喔傅喔⑧笖喔佮箞喔笝喙冟笂喙夃箒喔炧弗喔曕笩喔福喙屶浮喔傕腑喔囙箑喔｀覆</p>
<h3>1. 喔勦赋喔笜喔脆笟喔侧涪喔氞福喔脆竵喔侧福</h3>
<p>喙€喔｀覆喙冟斧喙夃笟喔｀复喔佮覆喔｀箒喔笖喔囙競喙夃腑喔∴腹喔ム箒喔熰福喔權箘喔娻釜喙?喔氞福喔脆竵喔侧福喙冟斧喙夃竸喔赤笡喔｀付喔佮俯喔?喙佮弗喔班笀喔编笟喔勦腹喙堗笢喔灌箟喔｀副喔氞箒喔熰福喔權箘喔娻釜喙?喙€喔｀覆喙勦浮喙堗福喔编笟喔涏福喔班竵喔编笝喔溹弗喔ム副喔炧笜喙屶笚喔侧竾喔樴父喔｀竵喔脆笀喔傕腑喔囙箓喔勦福喔囙竵喔侧福喙佮笩喔｀笝喙勦笂喔箤</p>
<h3>2. 喔勦抚喔侧浮喔｀副喔氞笢喔脆笖喔娻腑喔氞競喔竾喔溹腹喙夃箖喔娻箟</h3>
<p>喔溹腹喙夃箖喔娻箟喔曕箟喔竾喔｀副喔氞笢喔脆笖喔娻腑喔氞箖喔權竸喔о覆喔∴笘喔灌竵喔曕箟喔竾喙佮弗喔班竸喔о覆喔∴笘喔灌竵喔佮笌喔浮喔侧涪喔傕腑喔囙競喙夃腑喔∴腹喔ム笚喔掂箞喙冟斧喙夃箘喔о箟 喙佮弗喔班笗喙夃腑喔囙笡喔｀赴喙€喔∴复喔權箓喔勦福喔囙竵喔侧福喙佮笩喔｀笝喙勦笂喔箤喔斷箟喔о涪喔曕笝喙€喔竾</p>
<h3>3. 喔傕箟喔笀喔赤竵喔编笖喔勦抚喔侧浮喔｀副喔氞笢喔脆笖喔娻腑喔氞競喙夃腑喔∴腹喔?/h3>
<p>喙€喔｀覆喔炧涪喔侧涪喔侧浮喙冟斧喙夃競喙夃腑喔∴腹喔ム笚喔掂箞喔栢腹喔佮笗喙夃腑喔?喙佮笗喙堗箘喔∴箞喔｀副喔氞笡喔｀赴喔佮副喔權竸喔о覆喔∴笘喔灌竵喔曕箟喔竾喔浮喔氞腹喔｀笓喙屶競喔竾喔傕箟喔浮喔灌弗 喔溹腹喙夃箖喔娻箟喔勦抚喔｀笗喔｀抚喔堗釜喔笟喔傕箟喔浮喔灌弗喔斷箟喔о涪喔曕笝喙€喔竾</p>
<h3>4. 喔椸福喔编笧喔⑧箤喔复喔權笚喔侧竾喔涏副喔嵿笉喔?/h3>
<p>喙€喔權阜喙夃腑喔覆喔椸副喙夃竾喔浮喔斷笟喔權箒喔炧弗喔曕笩喔福喙屶浮喔權傅喙夃箘喔斷箟喔｀副喔氞竵喔侧福喔勦父喙夃浮喔勦福喔竾喙傕笖喔⑧竵喔庎斧喔∴覆喔⑧笚喔｀副喔炧涪喙屶釜喔脆笝喔椸覆喔囙笡喔编笉喔嵿覆</p>
<h3>5. 喔佮覆喔｀箑喔涏弗喔掂箞喔⑧笝喙佮笡喔ム竾喔氞福喔脆竵喔侧福</h3>
<p>喙€喔｀覆喔傕腑喔竾喔о笝喔复喔椸笜喔脆箤喙冟笝喔佮覆喔｀箒喔佮箟喙勦競喔福喔粪腑喔⑧竵喙€喔ム复喔佮笟喔｀复喔佮覆喔｀箘喔斷箟喔曕弗喔笖喙€喔о弗喔侧箓喔斷涪喙勦浮喙堗笗喙夃腑喔囙箒喔堗箟喔囙弗喙堗抚喔囙斧喔權箟喔?/p>
<h3>6. 喔佮覆喔｀福喔班竾喔编笟喔傕箟喔笧喔脆笧喔侧笚</h3>
<p>喔傕箟喔竵喔赤斧喔權笖喙€喔弗喙堗覆喔權傅喙夃腑喔⑧腹喙堗笭喔侧涪喙冟笗喙夃竵喔庎斧喔∴覆喔⑧競喔竾喔覆喔樴覆喔｀笓喔｀副喔愢笡喔｀赴喔娻覆喔娻笝喔堗傅喔?/p>
<h3>7. 喔曕复喔斷笗喙堗腑喙€喔｀覆</h3>
<p>喔覆喔佮浮喔掂竸喔赤笘喔侧浮喙€喔佮傅喙堗涪喔о竵喔编笟喔傕箟喔竵喔赤斧喔權笖喔佮覆喔｀箖喔娻箟喔囙覆喔權笝喔掂箟 喙傕笡喔｀笖<a href="/th/contact">喔曕复喔斷笗喙堗腑喙€喔｀覆</a></p>
</div>`,
  },
  {
    slug: 'terms-vi',
    title: '膼i峄乽 Kho岷 S峄?D峄g',
    locale: 'vi',
    status: 'published',
    seoTitle: '膼i峄乽 Kho岷 S峄?D峄g - M岷g L瓢峄沬 Nh瓢峄g Quy峄乶 Qu峄慶 T岷?Trung Qu峄慶',
    seoDesc: '膼i峄乽 kho岷 s峄?d峄g M岷g l瓢峄沬 Nh瓢峄g quy峄乶 Qu峄慶 t岷?Trung Qu峄慶',
    content: `<div class="prose max-w-none">
<h2>膼i峄乽 Kho岷 S峄?D峄g</h2>
<p>Ch脿o m峄玭g b岷 膽岷縩 v峄沬 M岷g L瓢峄沬 Nh瓢峄g Quy峄乶 Qu峄慶 T岷?Trung Qu峄慶. Vui l貌ng 膽峄峜 k峄?c谩c 膼i峄乽 Kho岷 S峄?D峄g n脿y tr瓢峄沜 khi s峄?d峄g n峄乶 t岷g c峄 ch煤ng t么i.</p>
<h3>1. M么 T岷?D峄媍h V峄?/h3>
<p>Ch煤ng t么i cung c岷 d峄媍h v峄?hi峄僴 th峄?th么ng tin nh瓢峄g quy峄乶, t瓢 v岷 nh瓢峄g quy峄乶 v脿 k岷縯 n峄慽 膽峄慽 t谩c nh瓢峄g quy峄乶. Ch煤ng t么i kh么ng 膽岷 b岷 k岷縯 qu岷?kinh doanh th峄眂 t岷?c峄 c谩c d峄?谩n nh瓢峄g quy峄乶.</p>
<h3>2. Tr谩ch Nhi峄噈 Ng瓢峄漣 D霉ng</h3>
<p>Ng瓢峄漣 d霉ng ph岷 膽岷 b岷 t铆nh x谩c th峄眂 v脿 h峄 ph谩p c峄 th么ng tin 膽瓢峄 cung c岷, v脿 ph岷 t峄?膽谩nh gi谩 c谩c d峄?谩n nh瓢峄g quy峄乶.</p>
<h3>3. Tuy锚n B峄?T峄?Ch峄慽 Th么ng Tin</h3>
<p>Ch煤ng t么i n峄?l峄眂 膽岷 b岷 t铆nh ch铆nh x谩c c峄 th么ng tin nh瓢ng kh么ng 膽岷 b岷 t铆nh 膽岷 膽峄? Ng瓢峄漣 d霉ng n锚n t峄?x谩c minh th么ng tin.</p>
<h3>4. S峄?H峄痷 Tr铆 Tu峄?/h3>
<p>T岷 c岷?n峄檌 dung tr锚n n峄乶 t岷g n脿y 膽瓢峄 b岷 v峄?b峄焛 lu岷璽 s峄?h峄痷 tr铆 tu峄?</p>
<h3>5. Thay 膼峄昳 D峄媍h V峄?/h3>
<p>Ch煤ng t么i b岷 l瓢u quy峄乶 s峄璦 膽峄昳 ho岷穋 ng峄玭g d峄媍h v峄?b岷 c峄?l煤c n脿o m脿 kh么ng c岷 th么ng b谩o tr瓢峄沜.</p>
<h3>6. Gi岷 Quy岷縯 Tranh Ch岷</h3>
<p>C谩c 膼i峄乽 Kho岷 n脿y 膽瓢峄 膽i峄乽 ch峄塶h b峄焛 ph谩p lu岷璽 Trung Qu峄慶.</p>
<h3>7. Li锚n H峄?/h3>
<p>N岷縰 c贸 c芒u h峄廼 v峄?膼i峄乽 Kho岷 S峄?D峄g n脿y, vui l貌ng<a href="/vi/contact">li锚n h峄?v峄沬 ch煤ng t么i</a>.</p>
</div>`,
  },

  // ===== 鑱旂郴鎴戜滑 Contact =====
  {
    slug: 'contact',
    title: '鑱旂郴鎴戜滑',
    locale: 'zh',
    status: 'published',
    seoTitle: '鑱旂郴鎴戜滑 - 涓浗鍥介檯鍔犵洘缃?,
    seoDesc: '涓浗鍥介檯鍔犵洘缃戣仈绯绘柟寮忥紝鎷涘晢鍚堜綔鍜ㄨ',
    content: `<div class="prose max-w-none">
<h2>鑱旂郴鎴戜滑</h2>
<p>涓浗鍥介檯鍔犵洘缃戣瘹閭€鍝佺墝鏂广€佸姞鐩熷晢鍙婂悎浣滀紮浼村姞鍏ユ垜浠殑骞冲彴銆傚鏈変换浣曠枒闂垨鍚堜綔鎰忓悜锛屾杩庨€氳繃浠ヤ笅鏂瑰紡涓庢垜浠彇寰楄仈绯汇€?/p>
<h3>馃摟 鐢靛瓙閭欢</h3>
<p>business@cnfranchise.com</p>
<h3>馃摫 鑱旂郴鐢佃瘽</h3>
<p>+86 138 0242 9520锛堝井淇″悓鍙凤級</p>
<h3>馃搷 鍏徃鍦板潃</h3>
<p>骞垮窞甯傛捣鐝犲尯鏄屽矖涓滆矾257鍙?3妤?/p>
<h3>馃晲 宸ヤ綔鏃堕棿</h3>
<p>鍛ㄤ竴鑷冲懆浜?9:00 - 18:00锛堣妭鍋囨棩闄ゅ锛?/p>
<h3>馃 鍚堜綔鏂瑰悜</h3>
<ul>
<li><strong>鍝佺墝鏂瑰悎浣?/strong>锛氬鏋滄偍鏄湪鍗庨楗搧鐗岋紝娆㈣繋鍏ラ┗鎴戜滑鐨勫钩鍙帮紝灞曠ず鍝佺墝浼樺娍锛屽鎺ヤ紭璐ㄥ姞鐩熷晢璧勬簮銆?/li>
<li><strong>鍔犵洘鍟嗘湇鍔?/strong>锛氫负鍔犵洘鍟嗘彁渚涘搧鐗屾帹鑽愩€侀€夊潃璇勪及銆佸紑涓氭寚瀵肩瓑鍏ㄧ▼鏀寔鏈嶅姟銆?/li>
<li><strong>濯掍綋鍚堜綔</strong>锛氬搧鐗屾帹骞裤€佸唴瀹瑰悎浣溿€佹椿鍔ㄧ瓥鍒掔瓑濯掍綋鍟嗗姟鍚堜綔銆?/li>
<li><strong>娴峰甯傚満鎷撳睍</strong>锛氬崗鍔╀腑鍥藉搧鐗屽嚭娴凤紝鎴栧紩鍏ユ捣澶栦紭璐ㄥ搧鐗岃繘鍏ヤ腑鍥藉競鍦恒€?/li>
</ul>
<h3>馃挰 鍦ㄧ嚎鍜ㄨ</h3>
<p>鎮ㄤ篃鍙互濉啓涓嬫柟鐨勫湪绾垮挩璇㈣〃鍗曪紝鎴戜滑灏嗗湪1-2涓伐浣滄棩鍐呭敖蹇洖澶嶆偍鐨勫挩璇€?/p>
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
<h3>馃摟 Email</h3>
<p>business@cnfranchise.com</p>
<h3>馃摫 Phone</h3>
<p>+86 138 0242 9520 (WeChat: same number)</p>
<h3>馃搷 Office Address</h3>
<p>13F, No.257 Changgang East Road, Haizhu District, Guangzhou, China</p>
<h3>馃晲 Business Hours</h3>
<p>Monday to Friday, 9:00 - 18:00 (excluding public holidays)</p>
<h3>馃 Cooperation Areas</h3>
<ul>
<li><strong>Brand Cooperation</strong>: Chinese F&B brands are welcome to list on our platform, showcasing brand advantages and connecting with quality franchisees.</li>
<li><strong>Franchisee Services</strong>: Comprehensive support including brand recommendations, site selection evaluation, and opening guidance.</li>
<li><strong>Media Cooperation</strong>: Brand promotion, content cooperation, event planning, and other business partnerships.</li>
<li><strong>Overseas Expansion</strong>: Assisting Chinese brands going global or introducing quality overseas brands into the Chinese market.</li>
</ul>
<h3>馃挰 Online Inquiry</h3>
<p>You can also fill out the online inquiry form below. We will respond within 1-2 business days.</p>
</div>`,
  },
  {
    slug: 'contact-th',
    title: '喔曕复喔斷笗喙堗腑喙€喔｀覆',
    locale: 'th',
    status: 'published',
    seoTitle: '喔曕复喔斷笗喙堗腑喙€喔｀覆 - 喙€喔勦福喔粪腑喔傕箞喔侧涪喙佮笩喔｀笝喙勦笂喔箤喔｀赴喔抚喙堗覆喔囙笡喔｀赴喙€喔椸辅喔堗傅喔?,
    seoDesc: '喔曕复喔斷笗喙堗腑喙€喔勦福喔粪腑喔傕箞喔侧涪喙佮笩喔｀笝喙勦笂喔箤喔｀赴喔抚喙堗覆喔囙笡喔｀赴喙€喔椸辅喔堗傅喔權箑喔炧阜喙堗腑喔勦抚喔侧浮喔｀箞喔о浮喔∴阜喔?,
    content: `<div class="prose max-w-none">
<h2>喔曕复喔斷笗喙堗腑喙€喔｀覆</h2>
<p>喙€喔勦福喔粪腑喔傕箞喔侧涪喙佮笩喔｀笝喙勦笂喔箤喔｀赴喔抚喙堗覆喔囙笡喔｀赴喙€喔椸辅喔堗傅喔權競喔箑喔娻复喔嵿笂喔о笝喙佮笟喔｀笝喔斷箤 喔溹腹喙夃福喔编笟喙佮笩喔｀笝喙勦笂喔箤 喙佮弗喔班笧喔编笝喔樴浮喔脆笗喔｀箑喔傕箟喔侧福喙堗抚喔∴箒喔炧弗喔曕笩喔福喙屶浮喔傕腑喔囙箑喔｀覆 喔覆喔佮浮喔掂竸喔赤笘喔侧浮喔福喔粪腑喔曕箟喔竾喔佮覆喔｀福喙堗抚喔∴浮喔粪腑 喔佮福喔膏笓喔侧笗喔脆笖喔曕箞喔箑喔｀覆</p>
<h3>馃摟 喔傅喙€喔∴弗</h3>
<p>business@cnfranchise.com</p>
<h3>馃摫 喙傕笚喔｀辅喔编笧喔椸箤</h3>
<p>+86 138 0242 9520 (WeChat: 喙€喔氞腑喔｀箤喙€喔斷傅喔⑧抚喔佮副喔?</p>
<h3>馃搷 喔椸傅喙堗腑喔⑧腹喙堗釜喔赤笝喔编竵喔囙覆喔?/h3>
<p>喔娻副喙夃笝 13, 257 喔栢笝喔權笁喔侧竾喔佮覆喔囙笗喔班抚喔编笝喔腑喔?喙€喔傕笗喙勦斧喙堗笀喔灌箞 喙€喔∴阜喔竾喔佮抚喙堗覆喔囙箓喔堗抚 喔涏福喔班箑喔椸辅喔堗傅喔?/p>
<h3>馃晲 喔娻副喙堗抚喙傕浮喔囙笚喔赤竵喔侧福</h3>
<p>喔о副喔權笀喔编笝喔椸福喙?- 喔о副喔權辅喔膏竵喔｀箤 09:00 - 18:00 (喔⑧竵喙€喔о箟喔權抚喔编笝喔涪喔膏笖喔｀覆喔娻竵喔侧福)</p>
<h3>馃 喔斷箟喔侧笝喔勦抚喔侧浮喔｀箞喔о浮喔∴阜喔?/h3>
<ul>
<li><strong>喔勦抚喔侧浮喔｀箞喔о浮喔∴阜喔竵喔编笟喙佮笟喔｀笝喔斷箤</strong>: 喙佮笟喔｀笝喔斷箤喔覆喔覆喔｀箒喔ム赴喙€喔勦福喔粪箞喔竾喔斷阜喙堗浮喔堗傅喔權涪喔脆笝喔斷傅喔ム竾喔椸赴喙€喔氞傅喔⑧笝喔氞笝喙佮笧喔ム笗喔熰腑喔｀箤喔∴競喔竾喙€喔｀覆</li>
<li><strong>喔氞福喔脆竵喔侧福喔溹腹喙夃福喔编笟喙佮笩喔｀笝喙勦笂喔箤</strong>: 喔佮覆喔｀釜喔權副喔氞釜喔權父喔權竸喔｀笟喔о竾喔堗福 喔｀抚喔∴笘喔多竾喔勦赋喙佮笝喔班笝喔赤箒喔氞福喔權笖喙?喔佮覆喔｀笡喔｀赴喙€喔∴复喔權釜喔栢覆喔權笚喔掂箞 喙佮弗喔班竵喔侧福喙佮笝喔班笝喔赤竵喔侧福喙€喔涏复喔斷笗喔编抚</li>
<li><strong>喔勦抚喔侧浮喔｀箞喔о浮喔∴阜喔笖喙夃覆喔權釜喔粪箞喔?/strong>: 喔佮覆喔｀釜喙堗竾喙€喔福喔脆浮喙佮笟喔｀笝喔斷箤 喔勦抚喔侧浮喔｀箞喔о浮喔∴阜喔笖喙夃覆喔權箑喔權阜喙夃腑喔覆 喙佮弗喔班竵喔侧福喔о覆喔囙箒喔溹笝喔佮复喔堗竵喔｀福喔?/li>
<li><strong>喔佮覆喔｀競喔⑧覆喔⑧笗喔ム覆喔斷笗喙堗覆喔囙笡喔｀赴喙€喔椸辅</strong>: 喔娻箞喔о涪喙佮笟喔｀笝喔斷箤喔堗傅喔權腑喔竵喔腹喙堗笗喔ム覆喔斷箓喔ム竵 喔福喔粪腑喔權赋喙€喔傕箟喔侧箒喔氞福喔權笖喙屶笗喙堗覆喔囙笂喔侧笗喔脆竸喔膏笓喔犩覆喔炧釜喔灌箞喔曕弗喔侧笖喔堗傅喔?/li>
</ul>
<h3>馃挰 喔腑喔氞笘喔侧浮喔腑喔權箘喔ム笝喙?/h3>
<p>喔勦父喔撪釜喔侧浮喔侧福喔栢竵喔｀腑喔佮箒喔氞笟喔熰腑喔｀箤喔∴釜喔笟喔栢覆喔∴腑喔笝喙勦弗喔權箤喔斷箟喔侧笝喔ム箞喔侧竾 喙€喔｀覆喔堗赴喔曕腑喔氞竵喔ム副喔氞笭喔侧涪喙冟笝 1-2 喔о副喔權笚喔赤竵喔侧福</p>
</div>`,
  },
  {
    slug: 'contact-vi',
    title: 'Li锚n H峄?,
    locale: 'vi',
    status: 'published',
    seoTitle: 'Li锚n H峄?- M岷g L瓢峄沬 Nh瓢峄g Quy峄乶 Qu峄慶 T岷?Trung Qu峄慶',
    seoDesc: 'Li锚n h峄?M岷g l瓢峄沬 Nh瓢峄g quy峄乶 Qu峄慶 t岷?Trung Qu峄慶 v峄?h峄 t谩c nh瓢峄g quy峄乶',
    content: `<div class="prose max-w-none">
<h2>Li锚n H峄?/h2>
<p>M岷g L瓢峄沬 Nh瓢峄g Quy峄乶 Qu峄慶 T岷?Trung Qu峄慶 m峄漣 g峄峣 c谩c th瓢啤ng hi峄噓, nh瓢峄g quy峄乶 v脿 膽峄慽 t谩c tham gia n峄乶 t岷g c峄 ch煤ng t么i. N岷縰 c贸 c芒u h峄廼 ho岷穋 媒 膽峄媙h h峄 t谩c, xin li锚n h峄?v峄沬 ch煤ng t么i.</p>
<h3>馃摟 Email</h3>
<p>business@cnfranchise.com</p>
<h3>馃摫 膼i峄噉 Tho岷</h3>
<p>+86 138 0242 9520 (WeChat: c霉ng s峄?</p>
<h3>馃搷 膼峄媋 Ch峄?V膬n Ph貌ng</h3>
<p>T岷g 13, S峄?257 膼瓢峄漬g Changgang 膼么ng, Qu岷璶 Haizhu, Qu岷g Ch芒u, Trung Qu峄慶</p>
<h3>馃晲 Gi峄?L脿m Vi峄嘽</h3>
<p>Th峄?Hai - Th峄?S谩u, 09:00 - 18:00 (Ngh峄?l峄?</p>
<h3>馃 L末nh V峄眂 H峄 T谩c</h3>
<ul>
<li><strong>H峄 T谩c Th瓢啤ng Hi峄噓</strong>: Th瓢啤ng hi峄噓 F&B Trung Qu峄慶 膽瓢峄 ch脿o 膽贸n 膽膬ng k媒 tr锚n n峄乶 t岷g c峄 ch煤ng t么i</li>
<li><strong>D峄媍h V峄?Nh瓢峄g Quy峄乶</strong>: H峄?tr峄?to脿n di峄噉 bao g峄搈 t瓢 v岷 th瓢啤ng hi峄噓, 膽谩nh gi谩 膽峄媋 膽i峄僲 v脿 h瓢峄沶g d岷玭 khai tr瓢啤ng</li>
<li><strong>H峄 T谩c Truy峄乶 Th么ng</strong>: Qu岷g b谩 th瓢啤ng hi峄噓, h峄 t谩c n峄檌 dung v脿 l岷璸 k岷?ho岷h s峄?ki峄噉</li>
<li><strong>M峄?R峄檔g Th峄?Tr瓢峄漬g N瓢峄沜 Ngo脿i</strong>: H峄?tr峄?th瓢啤ng hi峄噓 Trung Qu峄慶 v瓢啤n ra to脿n c岷 ho岷穋 膽瓢a th瓢啤ng hi峄噓 qu峄慶 t岷?ch岷 l瓢峄g v脿o th峄?tr瓢峄漬g Trung Qu峄慶</li>
</ul>
<h3>馃挰 T瓢 V岷 Tr峄眂 Tuy岷縩</h3>
<p>B岷 c农ng c贸 th峄?膽i峄乶 v脿o m岷玼 t瓢 v岷 tr峄眂 tuy岷縩 b锚n d瓢峄沬. Ch煤ng t么i s岷?ph岷 h峄搃 trong v貌ng 1-2 ng脿y l脿m vi峄嘽.</p>
</div>`,
  },
]

async function main() {
  let created = 0
  let skipped = 0

  for (const page of cmsPages) {
    // Check if exists
    const existing = await prisma.cmsPage.findFirst({ where: { slug: page.slug, locale: page.locale } })
    if (existing) {
      console.log(`鈴笍  Skip existing: ${page.slug} (${page.locale})`)
      skipped++
      continue
    }

    await prisma.cmsPage.create({ data: page })
    console.log(`鉁?Created: ${page.slug} (${page.locale}) 鈥?"${page.title}"`)
    created++
  }

  console.log(`\nDone: ${created} created, ${skipped} skipped`)
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())

/**
 * 出海服务数据
 * 统一管理10大出海服务的多语言内容和图片
 * 图片暂时用 placeholder，后续可替换为后台管理系统上传的真实图片
 */

export interface ServiceData {
  id: string;          // URL slug，如 "legal"
  icon: string;        // 图片URL
  iconAlt: { zh: string; en: string; th: string; vi: string; }; // 图片alt文字（多语言）
  name: {
    zh: string;
    en: string;
    th: string;
    vi: string;
  };
  shortDesc: {
    zh: string;
    en: string;
    th: string;
    vi: string;
  };
  // 详情页内容（多语言）
  heroTitle: {
    zh: string;
    en: string;
    th: string;
    vi: string;
  };
  heroSubtitle: {
    zh: string;
    en: string;
    th: string;
    vi: string;
  };
  features: {
    zh: string[];
    en: string[];
    th: string[];
    vi: string[];
  };
  process: {
    zh: string[];
    en: string[];
    th: string[];
    vi: string[];
  };
  whyChoose: {
    zh: string[];
    en: string[];
    th: string[];
    vi: string[];
  };
}

export const servicesData: ServiceData[] = [
  {
    id: 'legal',
    icon: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400&h=300&fit=crop&auto=format',
    iconAlt: {
      zh: '海外法务服务',
      en: 'Overseas Legal Services',
      th: 'บริการกฎหมายต่างประเทศ',
      vi: 'Dịch vụ pháp lý quốc tế',
    },
    name: {
      zh: '海外法务',
      en: 'Overseas Legal',
      th: 'กฎหมายต่างประเทศ',
      vi: 'Pháp lý quốc tế',
    },
    shortDesc: {
      zh: '公司注册、合同审查、合规、诉讼',
      en: 'Company registration, contract review, compliance, litigation',
      th: 'จดทะเบียนบริษัท ตรวจสอบสัญญา การปฏิบัติตามกฎหมาย การฟ้องร้อง',
      vi: 'Đăng ký công ty, xem xét hợp đồng, tuân thủ, kiện tụng',
    },
    heroTitle: {
      zh: '一站式海外法务解决方案',
      en: 'One-Stop Overseas Legal Solutions',
      th: 'โซลูชันกฎหมายต่างประเทศครบวงจร',
      vi: 'Giải pháp pháp lý quốc tế toàn diện',
    },
    heroSubtitle: {
      zh: '覆盖全球主要市场的专业法律服务，从公司注册到合规运营全程护航',
      en: 'Professional legal services covering major global markets, escorting you from company registration to compliant operations',
      th: 'บริการกฎหมายมืออาชีพครอบคลุมตลาดหลักทั่วโลก ตั้งแต่การจดทะเบียนบริษัทจนถึงการดำเนินงานที่สอดคล้องกับกฎระเบียบ',
      vi: 'Dịch vụ pháp lý chuyên nghiệp bao phủ các thị trường chính trên toàn cầu, từ đăng ký công ty đến vận hành tuân thủ',
    },
    features: {
      zh: [
        '海外实体注册（香港、新加坡、美国、欧洲、东南亚等）',
        '各类合同起草、审查与谈判',
        '劳动法合规与员工手册制定',
        '数据隐私保护合规（GDPR等）',
        '跨境投资并购法律尽职调查',
        '国际商事诉讼与仲裁代理',
      ],
      en: [
        'Overseas entity registration (Hong Kong, Singapore, USA, Europe, Southeast Asia)',
        'Contract drafting, review and negotiation',
        'Labor law compliance and employee handbook development',
        'Data privacy compliance (GDPR, etc.)',
        'Cross-border M&A legal due diligence',
        'International commercial litigation and arbitration',
      ],
      th: [
        'การจดทะเบียนนิติบุคคลในต่างประเทศ (ฮ่องกง สิงคโปร์ สหรัฐอเมริกา ยุโรป เอเชียตะวันออกเฉียงใต้)',
        'การร่างสัญญา การตรวจสอบ และการเจรจาสัญญา',
        'การปฏิบัติตามกฎหมายแรงงานและการจัดทำคู่มือพนักงาน',
        'การปฏิบัติตามกฎหมายความเป็นส่วนตัวของข้อมูล (GDPR ฯลฯ)',
        'การตรวจสอบความถูกต้องทางกฎหมายในการควบรวมและเข้าซื้อกิจการข้ามพรมแดน',
        'การดำเนินคดีแพ่งระหว่างประเทศและการ arbitration',
      ],
      vi: [
        'Đăng ký thực thể nước ngoài (Hồng Kông, Singapore, Hoa Kỳ, Châu Âu, Đông Nam Á)',
        'Soạn thảo, xem xét và đàm phán hợp đồng',
        'Tuân thủ luật lao động và xây dựng sổ tay nhân viên',
        'Tuân thủ bảo mật dữ liệu (GDPR, v.v.)',
        'Thẩm định pháp lý M&A xuyên biên giới',
        'Kiện tụng thương mại quốc tế và trọng tài',
      ],
    },
    process: {
      zh: ['需求沟通与法律风险评估', '方案制定与费用报价', '签约与材料准备', '全程办理与进度跟踪', '交付与后续服务'],
      en: ['Needs assessment & legal risk evaluation', 'Plan development & cost quotation', 'Contract signing & document preparation', 'Full process handling & progress tracking', 'Delivery & follow-up services'],
      th: ['ประเมินความต้องการและความเสี่ยงทางกฎหมาย', 'การจัดทำแผนและการเสนอราคา', 'การลงนามในสัญญาและการเตรียมเอกสาร', 'การดำเนินการและการติดตามความคืบหน้า', 'การส่งมอบและบริการติดตามผล'],
      vi: ['Đánh giá nhu cầu và rủi ro pháp lý', 'Xây dựng kế hoạch và báo giá', 'Ký hợp đồng và chuẩn bị tài liệu', 'Xử lý toàn bộ quy trình và theo dõi tiến độ', 'Bàn giao và dịch vụ hỗ trợ sau'],
    },
    whyChoose: {
      zh: ['深耕海外法律15年+，服务企业超500家', '覆盖全球80+国家和地区的律师网络', '多语言服务团队，无沟通障碍', '收费透明，无隐性费用'],
      en: ['15+ years deep expertise in overseas law, serving 500+ companies', 'Lawyer network covering 80+ countries and regions globally', 'Multilingual service team, no communication barriers', 'Transparent pricing, no hidden fees'],
      th: ['ความเชี่ยวชาญด้านกฎหมายต่างประเทศมากกว่า 15 ปี รับใช้บริษัทมากกว่า 500 แห่ง', 'เครือข่ายทนายความครอบคลุมมากกว่า 80 ประเทศและภูมิภาคทั่วโลก', 'ทีมบริการหลายภาษา ไม่มีอุปสรรคในการสื่อสาร', 'ราคาโปร่งใส ไม่มีค่าใช้จ่ายซ่อนเร้น'],
      vi: ['15+ năm kinh nghiệm sâu về luật nước ngoài, phục vụ 500+ công ty', 'Mạng lưới luật sư bao phủ 80+ quốc gia và vùng lãnh thổ toàn cầu', 'Đội ngũ đa ngôn ngữ, không rào cản giao tiếp', 'Giá minh bạch, không phí ẩn'],
    },
  },
  {
    id: 'ip',
    icon: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop&auto=format',
    iconAlt: {
      zh: '知识产权服务',
      en: 'Intellectual Property Services',
      th: 'บริการทรัพย์สินทางปัญญา',
      vi: 'Dịch vụ sở hữu trí tuệ',
    },
    name: {
      zh: '知识产权',
      en: 'Intellectual Property',
      th: 'ทรัพย์สินทางปัญญา',
      vi: 'Sở hữu trí tuệ',
    },
    shortDesc: {
      zh: '国际商标注册、专利申请、维权',
      en: 'International trademark registration, patent application, rights protection',
      th: 'จดทะเบียนเครื่องหมายการค้าสากล การยื่นจดสิทธิบัตร การคุ้มครองสิทธิ',
      vi: 'Đăng ký nhãn hiệu quốc tế, đăng ký bằng sáng chế, bảo vệ quyền lợi',
    },
    heroTitle: {
      zh: '全球知识产权保护专家',
      en: 'Global Intellectual Property Protection Experts',
      th: 'ผู้เชี่ยวชาญด้านการคุ้มครองทรัพย์สินทางปัญญาระดับโลก',
      vi: 'Chuyên gia bảo vệ sở hữu trí tuệ toàn cầu',
    },
    heroSubtitle: {
      zh: '从商标到专利，从注册到维权，为您的品牌和技术筑起坚实的法律护城河',
      en: 'From trademarks to patents, from registration to rights protection, building a solid legal fortress for your brand and technology',
      th: 'ตั้งแต่เครื่องหมายการค้าจนถึงสิทธิบัตร ตั้งแต่การจดทะเบียนจนถึงการคุ้มครองสิทธิ สร้างป้อมปราบความปลอดภัยทางกฎหมายที่แข็งแกร่งสำหรับแบรนด์และเทคโนโลยีของคุณ',
      vi: 'Từ nhãn hiệu đến bằng sáng chế, từ đăng ký đến bảo vệ quyền, xây dựng pháo đài pháp lý vững chắc cho thương hiệu và công nghệ của bạn',
    },
    features: {
      zh: [
        '全球商标检索与注册（马德里体系优先）',
        '发明专利、实用新型、外观设计申请',
        '版权登记与软件著作权保护',
        '域名争议与品牌保护方案',
        '侵权监测与维权诉讼',
        '知识产权价值评估与交易',
      ],
      en: [
        'Global trademark search and registration (Madrid System priority)',
        'Invention patents, utility models, design patent applications',
        'Copyright registration and software copyright protection',
        'Domain name disputes and brand protection plans',
        'Infringement monitoring and rights protection litigation',
        'IP valuation and transaction',
      ],
      th: [
        'การค้นหาและจดทะเบียนเครื่องหมายการค้าทั่วโลก (ระบบมาดริดเป็นลำดับแรก)',
        'การยื่นจดสิทธิบัตรการประดิษฐ์ สิทธิบัตรแบบอริยาสถาน การออกแบบ',
        'การจดทะเบียนลิขสิทธิ์และการคุ้มครองลิขสิทธิ์ซอฟต์แวร์',
        'ข้อพิพาทเรื่องชื่อโดเมนและแผนการคุ้มครองแบรนด์',
        'การตรวจสอบการละเมิดและการดำเนินคดีคุ้มครองสิทธิ',
        'การประเมินมูลค่าและการซื้อขายทรัพย์สินทางปัญญา',
      ],
      vi: [
        'Tìm kiếm và đăng ký nhãn hiệu toàn cầu (hệ thống Madrid ưu tiên)',
        'Đăng ký sáng chế, mô hình tiện ích, kiểu dáng công nghiệp',
        'Đăng ký bản quyền và bảo vệ bản quyền phần mềm',
        'Tranh chấp tên miền và phương án bảo vệ thương hiệu',
        'Giám sát xâm phạm và khởi kiện bảo vệ quyền',
        'Định giá và giao dịch sở hữu trí tuệ',
      ],
    },
    process: {
      zh: ['品牌诊断与检索分析', '注册方案制定与报价', '全球或区域注册申请', '公告期监控与证书获取', '持续监控与维权支持'],
      en: ['Brand diagnosis & search analysis', 'Registration plan & quotation', 'Global or regional application filing', 'Monitoring & certificate acquisition', 'Ongoing monitoring & enforcement support'],
      th: ['การวินิจฉัยแบรนด์และการวิเคราะห์การค้นหา', 'การจัดทำแผนการจดทะเบียนและการเสนอราคา', 'การยื่นขอจดทะเบียนทั่วโลกหรือระดับภูมิภาค', 'การตรวจสอบระยะเวลาประกาศและการรับใบรับรอง', 'การติดตามอย่างต่อเนื่องและการสนับสนุนการบังคับใช้'],
      vi: ['Chẩn đoán thương hiệu và phân tích tìm kiếm', 'Xây dựng kế hoạch đăng ký và báo giá', 'Nộp đơn đăng ký toàn cầu hoặc khu vực', 'Giám sát thời gian công bố và nhận chứng chỉ', 'Theo dõi liên tục và hỗ trợ thực thi'],
    },
    whyChoose: {
      zh: ['与全球100+知识产权局建立合作关系', '平均注册周期比市场快30%', '一站式解决全球注册、监测、维权', '专业团队全程跟进，成功率超95%'],
      en: ['Partnerships with 100+ global IP offices', '30% faster than market average registration cycle', 'One-stop solution for global registration, monitoring, enforcement', 'Professional team with 95%+ success rate'],
      th: ['ความร่วมมือกับสำนักงานทรัพย์สินทางปัญญากว่า 100 แห่งทั่วโลก', 'รอบการจดทะเบียนเร็วกว่าค่าเฉลี่ยตลาด 30%', 'โซลูชันครบวงจรสำหรับการจดทะเบียน การติดตาม และการบังคับใช้ทั่วโลก', 'ทีมงานมืออาชีพที่มีอัตราความสำเร็จมากกว่า 95%'],
      vi: ['Hợp tác với 100+ cơ quan sở hữu trí tuệ toàn cầu', 'Thời gian đăng ký nhanh hơn 30% so với thị trường', 'Giải pháp tích hợp cho đăng ký, giám sát, thực thi toàn cầu', 'Đội ngũ chuyên nghiệp với tỷ lệ thành công 95%+'],
    },
  },
  {
    id: 'logistics',
    icon: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=400&h=300&fit=crop&auto=format',
    iconAlt: {
      zh: '跨境物流服务',
      en: 'Cross-border Logistics Services',
      th: 'บริการโลจิสติกส์ข้ามพรมแดน',
      vi: 'Dịch vụ logistics xuyên biên giới',
    },
    name: {
      zh: '跨境物流',
      en: 'Cross-border Logistics',
      th: 'โลจิสติกส์ข้ามพรมแดน',
      vi: 'Logistics xuyên biên giới',
    },
    shortDesc: {
      zh: '海运/空运、清关、海外仓、本地配送',
      en: 'Sea/air freight, customs clearance, overseas warehousing, local delivery',
      th: 'ขนส่งทางเรือ/ทางอากาศ พิธีการศุลกากร คลังสินค้าต่างประเทศ การจัดส่งในพื้นที่',
      vi: 'Vận chuyển đường biển/đường hàng không, thông quan, kho nước ngoài, giao hàng nội địa',
    },
    heroTitle: {
      zh: '高效可靠的跨境供应链物流',
      en: 'Efficient & Reliable Cross-border Supply Chain Logistics',
      th: 'โลจิสติกส์ห่วงโซ่อุปทานข้ามพรมแดนที่มีประสิทธิภาพและเชื่อถือได้',
      vi: 'Logistics chuỗi cung ứng xuyên biên giới hiệu quả và đáng tin cậy',
    },
    heroSubtitle: {
      zh: '整合全球优质物流资源，提供海陆空多式联运、仓储清关一站式服务',
      en: 'Integrating global quality logistics resources, providing sea-land-air multimodal transport and one-stop warehousing & customs services',
      th: 'การบูรณาการทรัพยากรโลจิสติกส์คุณภาพทั่วโลก ให้บริการขนส่งหลายรูปแบบทางทะเล บก อากาศ และบริการคลังสินค้าและศุลกากรครบวงจร',
      vi: 'Tích hợp nguồn lực logistics chất lượng toàn cầu, cung cấp vận tải đa phương thức đường biển-đường bộ-đường hàng không và dịch vụ kho vận-thông quan một cửa',
    },
    features: {
      zh: [
        'FBA头程/尾程物流（美/欧/日/澳）',
        '国际海运整柜/拼箱（FCL/LCL）',
        '国际空运与包机服务',
        '海外仓储与一件代发',
        '目的港清关与配送上门',
        '跨境电商小包专线',
      ],
      en: [
        'FBA first/last mile logistics (US/EU/JP/AU)',
        'International FCL/LCL ocean freight',
        'International air freight & charter services',
        'Overseas warehousing & dropshipping',
        'Destination customs clearance & door delivery',
        'Cross-border e-commerce parcel lines',
      ],
      th: [
        'โลจิสติกส์ระยะแรก/ระยะสุดท้ายของ FBA (สหรัฐอเมริกา/ยุโรป/ญี่ปุ่น/ออสเตรเลีย)',
        'การขนส่งทางทะเล FCL/LCL ระหว่างประเทศ',
        'การขนส่งทางอากาศระหว่างประเทศและบริการเช่าเครื่องบิน',
        'คลังสินค้าต่างประเทศและการส่งออกทีละชิ้น',
        'พิธีการศุลกากรและการจัดส่งถึงประตูบ้าน',
        'บริการพัสดุอีคอมเมิร์ซข้ามพรมแดน',
      ],
      vi: [
        'Logistics đầu/cuối FBA (Mỹ/Châu Âu/Nhật/Úc)',
        'Vận chuyển đường biển FCL/LCL quốc tế',
        'Vận chuyển hàng không quốc tế và dịch vụ thuê chuyến',
        'Kho nước ngoài và dropshipping',
        'Thông quan điểm đến và giao hàng tận nhà',
        'Dịch vụ bưu kiện thương mại điện tử xuyên biên giới',
      ],
    },
    process: {
      zh: ['需求沟通与路线规划', '方案对比与报价获取', '订舱与装箱指导', '报关出口与运输跟踪', '清关交付与签收确认'],
      en: ['Needs communication & route planning', 'Plan comparison & quote acquisition', 'Booking & packing guidance', 'Export customs & shipment tracking', 'Import clearance & delivery confirmation'],
      th: ['การสื่อสารความต้องการและการวางแผนเส้นทาง', 'การเปรียบเทียบแผนและการได้รับใบเสนอราคา', 'การจองและการแนะนำการบรรจุ', 'พิธีการศุลกากรส่งออกและการติดตามการขนส่ง', 'พิธีการศุลกากรนำเข้าและการยืนยันการส่งมอบ'],
      vi: ['Giao tiếp nhu cầu và lập kế hoạch tuyến đường', 'So sánh phương án và nhận báo giá', 'Đặt chỗ và hướng dẫn đóng gói', 'Hải quan xuất khẩu và theo dõi lô hàng', 'Thông quan nhập khẩu và xác nhận giao hàng'],
    },
    whyChoose: {
      zh: ['与DHL/FedEx/UPS/顺丰等头部承运商深度合作', '覆盖全球120+国家地区物流网络', '自研TMS系统全程可视化追踪', '专属客服7×24小时响应'],
      en: ['Deep partnerships with DHL/FedEx/UPS/SF Express', 'Global logistics network covering 120+ countries', 'Proprietary TMS system with full visibility tracking', 'Dedicated support 7×24 hours'],
      th: ['ความร่วมมือเชิงลึกกับ DHL/FedEx/UPS/SF Express', 'เครือข่ายโลจิสติกส์ทั่วโลกครอบคลุมกว่า 120 ประเทศ', 'ระบบ TMS ที่พัฒนาเองพร้อมการติดตามที่มองเห็นได้เต็มรูปแบบ', 'ฝ่ายสนับสนุนลูกค้าให้บริการตลอด 24 ชั่วโมง 7 วัน'],
      vi: ['Hợp tác sâu với DHL/FedEx/UPS/SF Express', 'Mạng lưới logistics toàn cầu phủ 120+ quốc gia', 'Hệ thống TMS tự phát triển theo dõi toàn bộ', 'Chăm sóc khách hàng chuyên dụng 7×24 giờ'],
    },
  },
  {
    id: 'hr',
    icon: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=400&h=300&fit=crop&auto=format',
    iconAlt: {
      zh: '海外人力资源服务',
      en: 'Overseas HR Services',
      th: 'บริการบุคลากรต่างประเทศ',
      vi: 'Dịch vụ nhân sự quốc tế',
    },
    name: {
      zh: '海外人力',
      en: 'Overseas HR',
      th: 'บุคลากรต่างประเทศ',
      vi: 'Nhân sự quốc tế',
    },
    shortDesc: {
      zh: '本地招聘、EOR（名义雇主）、薪酬外包',
      en: 'Local recruitment, EOR (Employer of Record), payroll outsourcing',
      th: 'การสรรหาพนักงานท้องถิ่น EOR การจัดการเงินเดือน',
      vi: 'Tuyển dụng địa phương, EOR, thuê ngoài lương thưởng',
    },
    heroTitle: {
      zh: '合规高效的人力资源全球配置',
      en: 'Compliant & Efficient Global HR Solutions',
      th: 'โซลูชัน HR ทั่วโลกที่มีประสิทธิภาพและสอดคล้องกับกฎหมาย',
      vi: 'Giải pháp HR toàn cầu tuân thủ và hiệu quả',
    },
    heroSubtitle: {
      zh: '帮助企业快速组建海外团队，同时满足各国劳动法合规要求，降低用工风险',
      en: 'Helping companies quickly build overseas teams while meeting labor law compliance requirements, reducing employment risks',
      th: 'ช่วยให้บริษัทสามารถสร้างทีมงานต่างประเทศได้อย่างรวดเร็ว พร้อมทั้งปฏิบัติตามข้อกำหนดด้านกฎหมายแรงงาน ลดความเสี่ยงในการจ้างงาน',
      vi: 'Giúp doanh nghiệp nhanh chóng xây dựng đội ngũ ở nước ngoài, đồng thời đáp ứng yêu cầu tuân thủ luật lao động, giảm rủi ro tuyển dụng',
    },
    features: {
      zh: [
        '海外本地招聘（岗位发布、简历筛选、面试安排）',
        'EOR名义雇主服务（无需设立实体即可合规用工）',
        '海外员工薪酬个税代扣代缴',
        '劳动合同起草与劳动争议处理',
        '员工入职培训与本地化合规指导',
        '灵活用工与兼职/自由职业者管理',
      ],
      en: [
        'Overseas local recruitment (posting, screening, interview arrangement)',
        'EOR services (compliant employment without entity setup)',
        'Payroll tax withholding and remittance',
        'Employment contract drafting & dispute resolution',
        'Employee onboarding & localization compliance guidance',
        'Flexible employment & freelancer management',
      ],
      th: [
        'การสรรหาพนักงานท้องถิ่นในต่างประเทศ (การลงประกาศ การคัดกรอง การจัดการสัมภาษณ์)',
        'บริการ EOR (การจ้างงานที่สอดคล้องกับกฎหมายโดยไม่ต้องจัดตั้งนิติบุคคล)',
        'การหักภาษีเงินเดือนและการส่งเงิน',
        'การร่างสัญญาจ้างงานและการระงับข้อพิพาท',
        'การปฐมนิเทศพนักงานและการให้คำแนะนำการปฏิบัติตามกฎหมายท้องถิ่น',
        'การจ้างงานที่ยืดหยุ่นและการจัดการ freelancer',
      ],
      vi: [
        'Tuyển dụng địa phương ở nước ngoài (đăng tin, sàng lọc, sắp xếp phỏng vấn)',
        'Dịch vụ EOR (tuyển dụng tuân thủ không cần thành lập công ty)',
        'Khấu trừ và nộp thuế thu nhập lương',
        'Soạn thảo hợp đồng lao động và giải quyết tranh chấp',
        'Đào tạo nhân viên mới và hướng dẫn tuân thủ địa phương',
        'Tuyển dụng linh hoạt và quản lý freelancer',
      ],
    },
    process: {
      zh: ['岗位需求梳理与 JD 撰写', '渠道发布与候选人筛选', '面试协调与候选人推荐', 'Offer谈判与入职手续', '薪酬发放与合规管理'],
      en: ['Job requirement analysis & JD writing', 'Channel posting & candidate screening', 'Interview coordination & candidate recommendation', 'Offer negotiation & onboarding', 'Payroll & compliance management'],
      th: ['การวิเคราะห์ความต้องการของตำแหน่งและการเขียน JD', 'การลงประกาศในช่องทางและการคัดกรองผู้สมัคร', 'การประสานงานสัมภาษณ์และการแนะนำผู้สมัคร', 'การเจรจาข้อเสนอและการปฐมนิเทศ', 'การจ่ายค่าตอบแทนและการจัดการการปฏิบัติตามกฎหมาย'],
      vi: ['Phân tích yêu cầu công việc và viết JD', 'Đăng tin tuyển dụng và sàng lọc ứng viên', 'Điều phối phỏng vấn và giới thiệu ứng viên', 'Đàm phán offer và thủ tục nhận việc', 'Chi trả lương và quản lý tuân thủ'],
    },
    whyChoose: {
      zh: ['覆盖全球80+国家EOR服务网络', '帮助企业节省60%+合规成本', '专业HR团队精通多国劳动法', '数字化平台一键管理全球员工'],
      en: ['EOR service network covering 80+ countries globally', 'Helping companies save 60%+ on compliance costs', 'Professional HR team proficient in multi-country labor laws', 'Digital platform for one-click global employee management'],
      th: ['เครือข่ายบริการ EOR ครอบคลุมมากกว่า 80 ประเทศทั่วโลก', 'ช่วยให้บริษัทประหยัดค่าใช้จ่ายในการปฏิบัติตามกฎหมายมากกว่า 60%', 'ทีม HR มืออาชีพที่มีความเชี่ยวชาญในกฎหมายแรงงานหลายประเทศ', 'แพลตฟอร์มดิจิทัลสำหรับการจัดการพนักงานทั่วโลกเพียงคลิกเดียว'],
      vi: ['Mạng lưới dịch vụ EOR phủ 80+ quốc gia toàn cầu', 'Giúp doanh nghiệp tiết kiệm 60%+ chi phí tuân thủ', 'Đội ngũ HR chuyên nghiệp thành thạo luật lao động đa quốc gia', 'Nền tảng số quản lý nhân viên toàn cầu chỉ một cú click'],
    },
  },
  {
    id: 'finance',
    icon: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop&auto=format',
    iconAlt: {
      zh: '海外财税服务',
      en: 'Overseas Finance & Tax Services',
      th: 'บริการการเงินและภาษีต่างประเทศ',
      vi: 'Dịch vụ tài chính và thuế quốc tế',
    },
    name: {
      zh: '海外财税',
      en: 'Finance & Tax',
      th: 'การเงินและภาษี',
      vi: 'Tài chính và thuế',
    },
    shortDesc: {
      zh: '记账、报税、税务筹划、审计',
      en: 'Bookkeeping, tax filing, tax planning, auditing',
      th: 'การบัญชี การยื่นภาษี การวางแผนภาษี การตรวจสอบบัญชี',
      vi: 'Kế toán, khai thuế, hoạch định thuế, kiểm toán',
    },
    heroTitle: {
      zh: '专业海外财税合规管家',
      en: 'Professional Overseas Finance & Tax Compliance Manager',
      th: 'ผู้จัดการด้านการเงินและภาษีต่างประเทศที่เป็นมืออาชีพ',
      vi: 'Quản lý tài chính và thuế quốc tế chuyên nghiệp',
    },
    heroSubtitle: {
      zh: '精通各国税法与会计准则，帮助跨境企业优化税务结构，合规高效管理财务',
      en: 'Proficient in tax laws and accounting standards of various countries, helping cross-border enterprises optimize tax structure and manage finances compliantly and efficiently',
      th: 'มีความเชี่ยวชาญในกฎหมายภาษีและมาตรฐานการบัญชีของหลายประเทศ ช่วยให้ธุรกิจข้ามพรมแดนสามารถเพิ่มประสิทธิภาพโครงสร้างภาษีและจัดการการเงินได้อย่างสอดคล้องกับกฎหมาย',
      vi: 'Thành thạo luật thuế và chuẩn mực kế toán của nhiều quốc gia, giúp doanh nghiệp xuyên biên giới tối ưu hóa cấu trúc thuế và quản lý tài chính tuân thủ',
    },
    features: {
      zh: [
        '海外公司会计代理记账（月报/季报/年报）',
        '各国税表申报（香港、新加坡、美国、欧盟等）',
        '跨境转让定价与税务筹划',
        '常设机构（PE）风险评估',
        '企业所得税、个人所得税合规',
        '财务审计与内控体系搭建',
      ],
      en: [
        'Overseas company accounting & bookkeeping (monthly/quarterly/annual)',
        'Tax filing in various countries (HK, Singapore, USA, EU)',
        'Cross-border transfer pricing & tax planning',
        'Permanent Establishment (PE) risk assessment',
        'Corporate & individual income tax compliance',
        'Financial audit & internal control system setup',
      ],
      th: [
        'การบัญชีบริษัทต่างประเทศและการทำบัญชี (รายเดือน/รายไตรมาส/รายปี)',
        'การยื่นแบบแสดงรายการภาษีในหลายประเทศ (ฮ่องกง สิงคโปร์ สหรัฐอเมริกา สหภาพยุโรป)',
        'การกำหนดราคาการโอนข้ามพรมแดนและการวางแผนภาษี',
        'การประเมินความเสี่ยงสถานประกอบการถาวร (PE)',
        'การปฏิบัติตามภาษีเงินได้นิติบุคคลและบุคคลธรรมดา',
        'การตรวจสอบบัญชีและการจัดตั้งระบบควบคุมภายใน',
      ],
      vi: [
        'Kế toán công ty nước ngoài (hàng tháng/tài chính/năm)',
        'Khai thuế ở nhiều quốc gia (HK, Singapore, Mỹ, EU)',
        'Định giá chuyển nhượng và hoạch định thuế xuyên biên giới',
        'Đánh giá rủi ro cơ sở thường trú (PE)',
        'Tuân thủ thuế thu nhập doanh nghiệp và cá nhân',
        'Kiểm toán tài chính và xây dựng hệ thống kiểm soát nội bộ',
      ],
    },
    process: {
      zh: ['财务梳理与历史账务处理', '会计准则适用与科目设置', '日常记账与银行对账', '税务申报与缴款', '年度审计与报告出具'],
      en: ['Financial review & historical bookkeeping', 'Accounting standard application & account setup', 'Daily bookkeeping & bank reconciliation', 'Tax filing & payment', 'Annual audit & report issuance'],
      th: ['การทบทวนการเงินและการบัญชีย้อนหลัง', 'การใช้มาตรฐานการบัญชีและการตั้งค่าบัญชี', 'การบัญชีประจำวันและการกระทบยอดธนาคาร', 'การยื่นแบบแสดงรายการภาษีและการชำระภาษี', 'การตรวจสอบบัญชีประจำปีและการออกรายงาน'],
      vi: ['Rà soát tài chính và xử lý sổ sách lịch sử', 'Áp dụng chuẩn mực kế toán và thiết lập tài khoản', 'Hạch toán hàng ngày và đối soát ngân hàng', 'Khai thuế và nộp thuế', 'Kiểm toán hàng năm và phát hành báo cáo'],
    },
    whyChoose: {
      zh: ['ACCA/CPA持证专业会计师团队', '覆盖全球50+国家/地区的税务知识', '自主研发SaaS财务系统，实时查看报表', '一价全包，无隐藏收费项'],
      en: ['ACCA/CPA certified professional accountant team', 'Tax knowledge covering 50+ countries/regions globally', 'Proprietary SaaS financial system, real-time report viewing', 'All-inclusive pricing, no hidden fees'],
      th: ['ทีมผู้สอบบัญชีมืออาชีพที่มีใบรับรอง ACCA/CPA', 'ความรู้ด้านภาษีครอบคลุมมากกว่า 50 ประเทศ/ภูมิภาคทั่วโลก', 'ระบบการเงิน SaaS ที่พัฒนาเอง สามารถดูรายงานแบบเรียลไทม์', 'ราคาแบบครอบคลุมทุกอย่าง ไม่มีค่าธรรมเนียมซ่อนเร้น'],
      vi: ['Đội ngũ kế toán chuyên nghiệp có chứng chỉ ACCA/CPA', 'Kiến thức thuế phủ 50+ quốc gia/vùng lãnh thổ toàn cầu', 'Hệ thống tài chính SaaS tự phát triển, xem báo cáo real-time', 'Báo giá trọn gói, không phí ẩn'],
    },
  },
  {
    id: 'payment',
    icon: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=300&fit=crop&auto=format',
    iconAlt: {
      zh: '海外支付服务',
      en: 'Overseas Payment Services',
      th: 'บริการการชำระเงินต่างประเทศ',
      vi: 'Dịch vụ thanh toán quốc tế',
    },
    name: {
      zh: '海外支付',
      en: 'Payment & Finance',
      th: 'การชำระเงิน',
      vi: 'Thanh toán',
    },
    shortDesc: {
      zh: '跨境收款、结汇、供应链金融',
      en: 'Cross-border collection, foreign exchange, supply chain finance',
      th: 'การรับเงินข้ามพรมแดน การแลกเปลี่ยนเงินตรา การเงินห่วงโซ่อุปทาน',
      vi: 'Thu tiền xuyên biên giới, đổi ngoại tệ, tài chính chuỗi cung ứng',
    },
    heroTitle: {
      zh: '安全高效的跨境支付解决方案',
      en: 'Secure & Efficient Cross-border Payment Solutions',
      th: 'โซลูชันการชำระเงินข้ามพรมแดนที่ปลอดภัยและมีประสิทธิภาพ',
      vi: 'Giải pháp thanh toán xuyên biên giới an toàn và hiệu quả',
    },
    heroSubtitle: {
      zh: '解决跨境收款难、结汇慢、费用高等痛点，让资金流转更顺畅',
      en: 'Solving pain points such as difficult cross-border collection, slow settlement, and high costs, making capital flow smoother',
      th: 'แก้ไขจุดเจ็บปวด เช่น การรับเงินข้ามพรมแดนที่ยากลำบาก การแลกเปลี่ยนเงินที่ช้า และต้นทุนที่สูง ทำให้กระแสเงินทุนหมุนเวียนได้ราบรื่นขึ้น',
      vi: 'Giải quyết các vấn đề nan giải như thu tiền khó, quy đổi chậm, chi phí cao, giúp dòng tiền lưu thông thuận lợi hơn',
    },
    features: {
      zh: [
        '国际信用卡/借记卡收款（Visa/MasterCard/Amex）',
        '本地化支付方式（东南亚、欧美、中东）',
        '跨境人民币结算与美元/欧元多币种账户',
        '结汇合规指导与最优汇率方案',
        '供应链金融与账期垫付',
        '反欺诈风控与交易安全',
      ],
      en: [
        'International card payment collection (Visa/MasterCard/Amex)',
        'Localized payment methods (Southeast Asia, Europe/US, Middle East)',
        'Cross-border RMB settlement & multi-currency accounts (USD/EUR)',
        'Settlement compliance guidance & optimal exchange rate plans',
        'Supply chain finance & payment term advances',
        'Anti-fraud risk control & transaction security',
      ],
      th: [
        'การรับชำระเงินด้วยบัตรเครดิต/เดบิตระหว่างประเทศ (Visa/MasterCard/Amex)',
        'วิธีการชำระเงินแบบท้องถิ่น (เอเชียตะวันออกเฉียงใต้ ยุโรป/สหรัฐอเมริกา ตะวันออกกลาง)',
        'การชำระเงินข้ามพรมแดนด้วย RMB และบัญชีหลายสกุลเงิน (USD/EUR)',
        'การให้คำแนะนำการปฏิบัติตามกฎหมายการแลกเปลี่ยนเงินตราและแผนอัตราแลกเปลี่ยนที่ดีที่สุด',
        'การเงินห่วงโซ่อุปทานและการชำระเงินล่วงหน้า',
        'การควบคุมความเสี่ยงต่อต้านการฉ้อโกงและความปลอดภัยในการทำธุรกรรม',
      ],
      vi: [
        'Thu tiền bằng thẻ tín dụng/ghi nợ quốc tế (Visa/MasterCard/Amex)',
        'Phương thức thanh toán địa phương (Đông Nam Á, Châu Âu/Mỹ, Trung Đông)',
        'Thanh toán xuyên biên giới RMB và tài khoản đa tiền tệ (USD/EUR)',
        'Hướng dẫn tuân thủ quy đổi và phương án tỷ giá tối ưu',
        'Tài chính chuỗi cung ứng và ứng trước thanh toán',
        'Kiểm soát rủi ro gian lận và bảo mật giao dịch',
      ],
    },
    process: {
      zh: ['业务场景与收款需求分析', '支付方案匹配与接入指导', '商户号申请与支付渠道对接', '测试验证与正式上线', '对账结算与资金回笼'],
      en: ['Business scenario & payment needs analysis', 'Payment solution matching & integration guidance', 'Merchant account application & payment gateway connection', 'Testing & verification & go-live', 'Reconciliation & fund collection'],
      th: ['การวิเคราะห์สถานการณ์ทางธุรกิจและความต้องการรับชำระเงิน', 'การจับคู่โซลูชันการชำระเงินและการให้คำแนะนำการบูรณาการ', 'การสมัครบัญชีผู้ค้าและการเชื่อมต่อช่องทางการชำระเงิน', 'การทดสอบและการตรวจสอบและการเริ่มใช้งานจริง', 'การกระทบยอดและการรับเงินทุน'],
      vi: ['Phân tích kịch bản kinh doanh và nhu cầu thu tiền', 'Ghép nối giải pháp thanh toán và hướng dẫn tích hợp', 'Đăng ký tài khoản merchant và kết nối cổng thanh toán', 'Kiểm thử và xác minh & ra mắt chính thức', 'Đối soát và thu hồi vốn'],
    },
    whyChoose: {
      zh: ['持有全球多个支付牌照，合规有保障', '行业领先汇率，结算速度快至T+0', '覆盖全球200+种本地支付方式', '专业风控团队，欺诈率低于0.3%'],
      en: ['Global payment licenses, compliant and secure', 'Industry-leading exchange rates, T+0 settlement speed', 'Coverage of 200+ local payment methods worldwide', 'Professional risk control team, fraud rate below 0.3%'],
      th: ['มีใบอนุญาตการชำระเงินทั่วโลก มีความปลอดภัยและน่าเชื่อถือ', 'อัตราแลกเปลี่ยนที่นำหน้าอุตสาหกรรม ความเร็วในการชำระเงิน T+0', 'ครอบคลุมวิธีการชำระเงินท้องถิ่นมากกว่า 200 วิธีทั่วโลก', 'ทีมควบคุมความเสี่ยงมืออาชีพ อัตราการฉ้อโกงต่ำกว่า 0.3%'],
      vi: ['Giấy phép thanh toán toàn cầu, tuân thủ và bảo mật', 'Tỷ giá hối đoái hàng đầu, thanh toán T+0', 'Phủ 200+ phương thức thanh toán địa phương toàn cầu', 'Đội ngũ kiểm soát rủi ro chuyên nghiệp, tỷ lệ gian lận dưới 0.3%'],
    },
  },
  {
    id: 'property',
    icon: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop&auto=format',
    iconAlt: {
      zh: '海外选址服务',
      en: 'Overseas Location & Property Services',
      th: 'บริการที่ตั้งและอสังหาริมทรัพย์ต่างประเทศ',
      vi: 'Dịch vụ địa điểm và bất động sản quốc tế',
    },
    name: {
      zh: '海外选址',
      en: 'Location & Property',
      th: 'ที่ตั้งและอสังหาริมทรัพย์',
      vi: 'Địa điểm & BĐS',
    },
    shortDesc: {
      zh: '店铺/仓库租赁、选址评估',
      en: 'Store/warehouse leasing, location assessment',
      th: 'เช่าร้านค้า/คลังสินค้า การประเมินสถานที่',
      vi: 'Thuê cửa hàng/kho bãi, đánh giá địa điểm',
    },
    heroTitle: {
      zh: '专业海外商业地产选址服务',
      en: 'Professional Overseas Commercial Real Estate Location Services',
      th: 'บริการที่ตั้งอสังหาริมทรัพย์เชิงพาณิชย์ต่างประเทศที่เป็นมืออาชีพ',
      vi: 'Dịch vụ bất động sản thương mại nước ngoài chuyên nghiệp',
    },
    heroSubtitle: {
      zh: '依托全球地产数据库和专业本地团队，为品牌找到最适合的海外落位',
      en: 'Relying on global real estate databases and professional local teams to find the most suitable overseas location for your brand',
      th: 'พึ่งพาฐานข้อมูลอสังหาริมทรัพย์ทั่วโลกและทีมท้องถิ่นมืออาชีพเพื่อค้นหาที่ตั้งต่างประเทศที่เหมาะสมที่สุดสำหรับแบรนด์ของคุณ',
      vi: 'Dựa trên cơ sở dữ liệu bất động sản toàn cầu và đội ngũ địa phương chuyên nghiệp, tìm địa điểm nước ngoài phù hợp nhất cho thương hiệu',
    },
    features: {
      zh: [
        '目标市场商业地产大数据分析',
        '优质商铺/写字楼/仓库资源对接',
        '选址可行性评估与客流分析',
        '租赁合同谈判与租金优化',
        '装修许可与消防合规指导',
        '长期租约管理与续租服务',
      ],
      en: [
        'Target market commercial real estate big data analysis',
        'Quality shop/office/warehouse resource matching',
        'Location feasibility assessment & foot traffic analysis',
        'Lease negotiation & rent optimization',
        'Fit-out permit & fire compliance guidance',
        'Long-term lease management & renewal services',
      ],
      th: [
        'การวิเคราะห์ข้อมูลใหญ่ด้านอสังหาริมทรัพย์เชิงพาณิชย์ในตลาดเป้าหมาย',
        'การจับคู่ทรัพยากรร้านค้า/สำนักงาน/คลังสินค้าคุณภาพ',
        'การประเมินความเป็นไปได้ของที่ตั้งและการวิเคราะห์การจราจร',
        'การเจรจาสัญญาเช่าและการเพิ่มประสิทธิภาพค่าเช่า',
        'การให้คำแนะนำการขออนุญาตตกแต่งและการปฏิบัติตามกฎหมายด้านอัคคีภัย',
        'การจัดการสัญญาเช่าระยะยาวและบริการต่ออายุสัญญา',
      ],
      vi: [
        'Phân tích dữ liệu lớn bất động sản thương mại thị trường mục tiêu',
        'Kết nối nguồn lực cửa hàng/văn phòng/kho chất lượng',
        'Đánh giá khả thi vị trí và phân tích lưu lượng người đi bộ',
        'Đàm phán hợp đồng thuê và tối ưu hóa tiền thuê',
        'Hướng dẫn cấp phép trang trí và tuân thủ PCCC',
        'Quản lý hợp đồng thuê dài hạn và dịch vụ gia hạn',
      ],
    },
    process: {
      zh: ['需求梳理与选址标准制定', '资源筛选与实地考察安排', '可行性报告与投资测算', '合同谈判与条款把关', '装修入驻与后续支持'],
      en: ['Needs analysis & location standard setting', 'Resource screening & on-site inspection arrangement', 'Feasibility report & investment calculation', 'Contract negotiation & terms review', 'Fit-out & move-in & follow-up support'],
      th: ['การวิเคราะห์ความต้องการและการกำหนดมาตรฐานที่ตั้ง', 'การคัดกรองทรัพยากรและการจัดการตรวจสอบ ณ ที่พัก', 'รายงานความเป็นไปได้และการคำนวณการลงทุน', 'การเจรจาสัญญาและการตรวจสอบข้อกำหนด', 'การตกแต่งและการย้ายเข้าอยู่และการสนับสนุนติดตามผล'],
      vi: ['Phân tích nhu cầu và thiết lập tiêu chuẩn vị trí', 'Sàng lọc nguồn lực và sắp xếp khảo sát thực địa', 'Báo cáo khả thi và tính toán đầu tư', 'Đàm phán hợp đồng và kiểm tra điều khoản', 'Trang trí và dọn vào & hỗ trợ sau'],
    },
    whyChoose: {
      zh: ['全球20+核心城市商业地产数据库', '本地经纪人团队深耕市场', '租金性价比分析节省20%+成本', '从选址到开业一站式全程服务'],
      en: ['Global commercial real estate database in 20+ core cities', 'Local broker teams deeply rooted in markets', 'Rent cost-effectiveness analysis saving 20%+', 'One-stop service from site selection to opening'],
      th: ['ฐานข้อมูลอสังหาริมทรัพย์เชิงพาณิชย์ในเมืองหลักกว่า 20 เมืองทั่วโลก', 'ทีมนายหน้าท้องถิ่นที่มีความเชี่ยวชาญในตลาด', 'การวิเคราะห์ความคุ้มค่าค่าเช่าช่วยประหยัดมากกว่า 20%', 'บริการครบวงจรตั้งแต่การเลือกที่ตั้งจนถึงการเปิดตัว'],
      vi: ['Cơ sở dữ liệu bất động sản thương mại 20+ thành phố cốt lõi toàn cầu', 'Đội ngũ môi giới địa phương am hiểu thị trường', 'Phân tích hiệu quả chi phí thuê tiết kiệm 20%+', 'Dịch vụ trọn gói từ chọn đến khai trương'],
    },
  },
  {
    id: 'pr',
    icon: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=300&fit=crop&auto=format',
    iconAlt: {
      zh: '海外公关媒体服务',
      en: 'Overseas PR & Media Services',
      th: 'บริการประชาสัมพันธ์และสื่อต่างประเทศ',
      vi: 'Dịch vụ PR và truyền thông quốc tế',
    },
    name: {
      zh: '海外公关',
      en: 'PR & Media',
      th: 'ประชาสัมพันธ์',
      vi: 'PR & Truyền thông',
    },
    shortDesc: {
      zh: '媒体发稿、品牌声誉管理、危机公关',
      en: 'Media distribution, brand reputation management, crisis PR',
      th: 'การเผยแพร่สื่อ การจัดการชื่อเสียงแบรนด์ การประชาสัมพันธ์วิกฤต',
      vi: 'Phát hành truyền thông, quản lý danh tiếng thương hiệu, PR khủng hoảng',
    },
    heroTitle: {
      zh: '打造中国品牌的全球影响力',
      en: 'Building Global Influence for Chinese Brands',
      th: 'สร้างอิทธิพลทั่วโลกสำหรับแบรนด์จีน',
      vi: 'Xây dựng ảnh hưởng toàn cầu cho thương hiệu Trung Quốc',
    },
    heroSubtitle: {
      zh: '整合全球媒体资源，助力品牌在海外市场建立认知度与美誉度',
      en: 'Integrating global media resources to help brands build awareness and reputation in overseas markets',
      th: 'การบูรณาการทรัพยากรสื่อทั่วโลกเพื่อช่วยให้แบรนด์สร้างการรับรู้และชื่อเสียงในตลาดต่างประเทศ',
      vi: 'Tích hợp nguồn lực truyền thông toàn cầu giúp thương hiệu xây dựng nhận thức và danh tiếng tại thị trường quốc tế',
    },
    features: {
      zh: [
        '海外媒体关系与新闻稿发布（英文/本地语言）',
        '品牌故事策划与内容营销',
        '社交媒体账号搭建与运营（Facebook/Instagram等）',
        'KOL/网红合作与口碑营销',
        '品牌声誉监测与危机公关预案',
        '海外展会媒体邀约与采访安排',
      ],
      en: [
        'Overseas media relations & press release distribution (English/local languages)',
        'Brand story planning & content marketing',
        'Social media account setup & management (Facebook/Instagram, etc.)',
        'KOL/influencer collaboration & word-of-mouth marketing',
        'Brand reputation monitoring & crisis PR planning',
        'Media invitation & interview arrangement for overseas exhibitions',
      ],
      th: [
        'ความสัมพันธ์กับสื่อต่างประเทศและการเผยแพร่ข่าวประชาสัมพันธ์ (ภาษาอังกฤษ/ภาษาท้องถิ่น)',
        'การวางแผนเรื่องราวแบรนด์และการตลาดคอนเทนต์',
        'การตั้งค่าบัญชีโซเชียลมีเดียและการจัดการ (Facebook/Instagram ฯลฯ)',
        'การร่วมมือกับ KOL/influencer และการตลาดแบบปากต่อปาก',
        'การติดตามชื่อเสียงแบรนด์และการวางแผนประชาสัมพันธ์ในภาวะวิกฤต',
        'การเชิญสื่อและการจัดการสัมภาษณ์สำหรับงานแสดงสินค้าต่างประเทศ',
      ],
      vi: [
        'Quan hệ truyền thông nước ngoài & phát hành thông cáo báo chí (Tiếng Anh/ngôn ngữ địa phương)',
        'Lập kế hoạch câu chuyện thương hiệu & tiếp thị nội dung',
        'Thiết lập và quản lý tài khoản mạng xã hội (Facebook/Instagram, v.v.)',
        'Hợp tác KOL/người có ảnh hưởng & tiếp thị truyền miệng',
        'Giám sát danh tiếng thương hiệu & lập kế hoạch PR khủng hoảng',
        'Mời gọi truyền thông và sắp xếp phỏng vấn cho hội chợ nước ngoài',
      ],
    },
    process: {
      zh: ['品牌诊断与目标市场调研', '传播策略制定与预算规划', '内容制作与媒体发布执行', '传播效果监测与报告', '持续优化与长期合作'],
      en: ['Brand diagnosis & target market research', 'Communication strategy & budget planning', 'Content creation & media distribution execution', 'Effectiveness monitoring & reporting', 'Continuous optimization & long-term cooperation'],
      th: ['การวินิจฉัยแบรนด์และการวิจัยตลาดเป้าหมาย', 'การจัดทำกลยุทธ์การสื่อสารและการวางแผนงบประมาณ', 'การสร้างสรรค์คอนเทนต์และการเผยแพร่สื่อ', 'การติดตามประสิทธิผลและการรายงาน', 'การเพิ่มประสิทธิภาพอย่างต่อเนื่องและความร่วมมือระยะยาว'],
      vi: ['Chẩn đoán thương hiệu và nghiên cứu thị trường mục tiêu', 'Xây dựng chiến lược truyền thông và lập kế hoạch ngân sách', 'Tạo nội dung và thực thi phân phối truyền thông', 'Theo dõi hiệu quả và báo cáo', 'Tối ưu hóa liên tục và hợp tác dài hạn'],
    },
    whyChoose: {
      zh: ['覆盖全球50+国家5000+家媒体资源', '专业本地化团队，避免文化误区', '按效果付费，无效不收费', '危机公关24小时快速响应机制'],
      en: ['Global coverage of 5,000+ media resources in 50+ countries', 'Professional localization teams, avoiding cultural pitfalls', 'Performance-based pricing, pay only for results', '24-hour rapid response crisis PR mechanism'],
      th: ['ครอบคลุมทรัพยากรสื่อมากกว่า 5,000 แห่งในมากกว่า 50 ประเทศทั่วโลก', 'ทีมท้องถิ่นมืออาชีพ หลีกเลี่ยงข้อผิดพลาดทางวัฒนธรรม', 'การกำหนดราคาตามผลลัพธ์ ไม่มีผลลัพธ์ไม่ต้องจ่าย', 'กลไกตอบสนองอย่างรวดเร็ว 24 ชั่วโมงในภาวะวิกฤต'],
      vi: ['Phủ 5000+ nguồn truyền thông ở 50+ quốc gia toàn cầu', 'Đội ngũ địa phương hóa chuyên nghiệp, tránh bẫy văn hóa', 'Thanh toán theo hiệu quả, không hiệu quả không tính phí', 'Cơ chế phản ứng nhanh PR khủng hoảng 24 giờ'],
    },
  },
  {
    id: 'exhibition',
    icon: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop&auto=format',
    iconAlt: {
      zh: '海外展会服务',
      en: 'Overseas Exhibition Services',
      th: 'บริการงานแสดงสินค้าต่างประเทศ',
      vi: 'Dịch vụ triển lãm quốc tế',
    },
    name: {
      zh: '海外展会',
      en: 'Exhibitions',
      th: 'งานแสดงสินค้า',
      vi: 'Triển lãm',
    },
    shortDesc: {
      zh: '海外展位预定、展台搭建、参展团组织',
      en: 'Booth booking, booth construction, exhibition group organization',
      th: 'การจองบูธ การก่อสร้างบูธ การจัดกลุ่มเข้าร่วมงานแสดงสินค้า',
      vi: 'Đặt gian hàng, xây dựng gian hàng, tổ chức đoàn tham gia triển lãm',
    },
    heroTitle: {
      zh: '让中国品牌闪耀世界舞台',
      en: 'Let Chinese Brands Shine on the World Stage',
      th: 'ให้แบรนด์จีนโดดเด่นบนเวทีโลก',
      vi: 'Để thương hiệu Trung Quốc tỏa sáng trên sân khấu thế giới',
    },
    heroSubtitle: {
      zh: '提供全球顶级展会一站式服务，从展位预订到展台搭建全程无忧',
      en: 'Providing one-stop services for top global exhibitions, from booth booking to booth construction, worry-free throughout',
      th: 'ให้บริการครบวงจรสำหรับงานแสดงสินค้าระดับโลก ตั้งแต่การจองบูธจนถึงการก่อสร้างบูธ ไม่ต้องกังวลตลอดกระบวนการ',
      vi: 'Cung cấp dịch vụ trọn gói cho các hội chợ hàng đầu thế giới, từ đặt gian hàng đến xây dựng gian hàng, không lo lắng toàn bộ',
    },
    features: {
      zh: [
        '全球重点行业展会咨询与展位预订',
        '展位位置优化与面积定制',
        '展台设计、搭建与现场管理',
        '展品运输与现场仓储协调',
        '参展人员签证邀请函与行程安排',
        '展会期间的媒体与VIP接待服务',
      ],
      en: [
        'Global key industry exhibition consultation & booth booking',
        'Booth position optimization & customized area',
        'Booth design, construction & on-site management',
        'Exhibits transportation & on-site storage coordination',
        'Exhibitor visa invitation letter & itinerary arrangement',
        'Media & VIP reception during the exhibition',
      ],
      th: [
        'การให้คำปรึกษางานแสดงสินค้าอุตสาหกรรมหลักทั่วโลกและการจองบูธ',
        'การเพิ่มประสิทธิภาพตำแหน่งบูธและการปรับแต่งพื้นที่',
        'การออกแบบบูธ การก่อสร้างและการจัดการ ณ ที่พัก',
        'การขนส่งสินค้าแสดงและการประสานงานคลังสินค้าที่พัก',
        'หนังสือเชิญวีซ่าและการจัดตารางเดินทางสำหรับผู้เข้าร่วมงาน',
        'การต้อนรับสื่อและ VIP ระหว่างงานแสดงสินค้า',
      ],
      vi: [
        'Tư vấn hội chợ ngành chính toàn cầu & đặt gian hàng',
        'Tối ưu hóa vị trí gian hàng & tùy chỉnh diện tích',
        'Thiết kế gian hàng, xây dựng & quản lý tại chỗ',
        'Vận chuyển hàng triển lãm & điều phối kho tại chỗ',
        'Thư mời visa và sắp xếp lịch trình cho đoàn tham gia',
        'Tiếp khách VIP và truyền thông trong thời gian hội chợ',
      ],
    },
    process: {
      zh: ['展会筛选与可行性评估', '展位预订与合同签订', '展台设计与施工对接', '参展准备与出行安排', '展会执行与效果跟进'],
      en: ['Exhibition screening & feasibility evaluation', 'Booth booking & contract signing', 'Booth design & construction coordination', 'Exhibition preparation & travel arrangement', 'Exhibition execution & follow-up'],
      th: ['การคัดเลือกงานแสดงสินค้าและการประเมินความเป็นไปได้', 'การจองบูธและการลงนามในสัญญา', 'การออกแบบบูธและการประสานงานการก่อสร้าง', 'การเตรียมการเข้าร่วมงานแสดงสินค้าและการจัดการเดินทาง', 'การดำเนินการแสดงสินค้าและการติดตามผล'],
      vi: ['Sàng lọc hội chợ và đánh giá khả thi', 'Đặt gian hàng và ký hợp đồng', 'Thiết kế gian hàng và kết nối xây dựng', 'Chuẩn bị tham gia và sắp xếp đi lại', 'Thực hiện hội chợ và theo dõi'],
    },
    whyChoose: {
      zh: ['官方认证组展资质，一手展位资源', '全球200+热门展会代理权', '自营展台工厂，品质与性价比兼得', '专业执行团队全程跟进，零后顾之忧'],
      en: ['Official certified exhibition organizer, first-hand booth resources', 'Agency rights for 200+ popular exhibitions globally', 'Owned booth factory, quality & cost-effectiveness', 'Professional execution team, zero worries'],
      th: ['ผู้จัดงานแสดงสินค้าที่ได้รับการรับรองอย่างเป็นทางการ ทรัพยากรบูธชั้นหนึ่ง', 'สิทธิ์ตัวแทนงานแสดงสินค้ายอดนิยมมากกว่า 200 งานทั่วโลก', 'โรงงานบูธของตัวเอง คุณภาพและความคุ้มค่า', 'ทีมงานมืออาชีพดำเนินการติดตาม ไม่มีความกังวล'],
      vi: ['Đơn vị tổ chức hội chợ được chứng nhận chính thức, nguồn gian hàng tay một', 'Quyền đại lý 200+ hội chợ nổi tiếng toàn cầu', 'Xưởng gian hàng tự sở hữu, chất lượng và tiết kiệm chi phí', 'Đội ngũ thực thi chuyên nghiệp, không lo lắng'],
    },
  },
  {
    id: 'aftersales',
    icon: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop&auto=format',
    iconAlt: {
      zh: '海外售后客服服务',
      en: 'Overseas After-sales & Customer Service',
      th: 'บริการหลังการขายและลูกค้าสัมพันธ์ต่างประเทศ',
      vi: 'Dịch vụ sau bán hàng và CSKH quốc tế',
    },
    name: {
      zh: '海外售后',
      en: 'After-sales & CS',
      th: 'บริการหลังการขาย',
      vi: 'Sau bán hàng',
    },
    shortDesc: {
      zh: '多语种呼叫中心、设备维修',
      en: 'Multilingual call center, equipment maintenance',
      th: 'ศูนย์บริการลูกค้าหลายภาษา การซ่อมบำรุงอุปกรณ์',
      vi: 'Tổng đài đa ngôn ngữ, bảo trì thiết bị',
    },
    heroTitle: {
      zh: '让海外客户享受极致服务体验',
      en: 'Delivering Exceptional Service Experience to Overseas Customers',
      th: 'มอบประสบการณ์บริการที่ยอดเยี่ยมให้กับลูกค้าต่างประเทศ',
      vi: 'Mang đến trải nghiệm dịch vụ xuất sắc cho khách hàng quốc tế',
    },
    heroSubtitle: {
      zh: '搭建海外本地化客服体系，用本地语言、本地习惯服务本地客户',
      en: 'Building overseas localized customer service systems, serving local customers in local languages and local habits',
      th: 'การสร้างระบบบริการลูกค้าที่เป็นท้องถิ่นในต่างประเทศ ให้บริการลูกค้าท้องถิ่นด้วยภาษาท้องถิ่นและนิสัยท้องถิ่น',
      vi: 'Xây dựng hệ thống chăm sóc khách hàng địa phương hóa ở nước ngoài, phục vụ khách hàng địa phương bằng ngôn ngữ và thói quen địa phương',
    },
    features: {
      zh: [
        '多语种客服呼叫中心（英/泰/越/印尼/马来等）',
        '海外售后工单系统搭建与管理',
        '设备安装调试与定期维护保养',
        '备件仓储与快速供应链支持',
        '客户满意度调研与服务质量提升',
        '7×24小时紧急故障响应机制',
      ],
      en: [
        'Multilingual customer service call center (EN/TH/VI/ID/MS)',
        'Overseas after-sales work order system setup & management',
        'Equipment installation, commissioning & regular maintenance',
        'Spare parts warehousing & fast supply chain support',
        'Customer satisfaction survey & service quality improvement',
        '7×24 hour emergency fault response mechanism',
      ],
      th: [
        'ศูนย์บริการลูกค้าหลายภาษา (อังกฤษ/ไทย/เวียดนาม/อินโดนีเซีย/มาเลย์ ฯลฯ)',
        'การจัดตั้งและการจัดการระบบงานบริการหลังการขายในต่างประเทศ',
        'การติดตั้งอุปกรณ์ การทดสอบและการบำรุงรักษาตามปกติ',
        'การจัดเก็บอะไหล่และการสนับสนุนห่วงโซ่อุปทานที่รวดเร็ว',
        'การสำรวจความพึงพอใจของลูกค้าและการปรับปรุงคุณภาพบริการ',
        'กลไกตอบสนองข้อผิดพลาดฉุกเฉินตลอด 24 ชั่วโมง 7 วัน',
      ],
      vi: [
        'Tổng đài chăm sóc khách hàng đa ngôn ngữ (EN/TH/VI/ID/MS)',
        'Xây dựng và quản lý hệ thống work order sau bán hàng ở nước ngoài',
        'Lắp đặt, vận hành và bảo trì thiết bị định kỳ',
        'Kho phụ tùng và hỗ trợ chuỗi cung ứng nhanh',
        'Khảo sát sự hài lòng khách hàng và cải thiện chất lượng dịch vụ',
        'Cơ chế phản ứng sự cố khẩn cấp 7×24 giờ',
      ],
    },
    process: {
      zh: ['售后体系规划与方案设计', '客服团队组建与培训', '系统平台搭建与工单流程配置', '运营管理与质量监控', '持续优化与KPI达标'],
      en: ['After-sales system planning & solution design', 'Customer service team building & training', 'System platform setup & workflow configuration', 'Operation management & quality monitoring', 'Continuous optimization & KPI achievement'],
      th: ['การวางแผนระบบหลังการขายและการออกแบบโซลูชัน', 'การสร้างทีมบริการลูกค้าและการฝึกอบรม', 'การจัดตั้งแพลตฟอร์มระบบและการกำหนดค่ากระบวนการทำงาน', 'การจัดการการดำเนินงานและการติดตามคุณภาพ', 'การเพิ่มประสิทธิภาพอย่างต่อเนื่องและการบรรลุ KPI'],
      vi: ['Lập kế hoạch hệ thống sau bán hàng & thiết kế giải pháp', 'Xây dựng và đào tạo đội ngũ chăm sóc khách hàng', 'Thiết lập nền tảng hệ thống & cấu hình quy trình', 'Quản lý vận hành & giám sát chất lượng', 'Tối ưu hóa liên tục & đạt KPI'],
    },
    whyChoose: {
      zh: ['10年+海外客服运营经验', '覆盖15+语种的本地客服团队', '自研CRM工单系统，响应速度提升50%', '按需弹性扩容，零固定成本风险'],
      en: ['10+ years overseas customer service experience', 'Localized teams covering 15+ languages', 'Proprietary CRM work order system, 50% faster response', 'Flexible scaling on demand, zero fixed cost risk'],
      th: ['ประสบการณ์บริการลูกค้าต่างประเทศมากกว่า 10 ปี', 'ทีมบริการลูกค้าท้องถิ่นครอบคลุมมากกว่า 15 ภาษา', 'ระบบ CRM work order ที่พัฒนาเอง การตอบสนองเร็วขึ้น 50%', 'การขยายขนาดอย่างยืดหยุ่นตามความต้องการ ไม่มีความเสี่ยงต้นทุนคงที่'],
      vi: ['10+ năm kinh nghiệm chăm sóc khách hàng nước ngoài', 'Đội ngũ CS địa phương phủ 15+ ngôn ngữ', 'Hệ thống CRM work order tự phát triển, phản hồi nhanh hơn 50%', 'Mở rộng linh hoạt theo nhu cầu, không rủi ro chi phí cố định'],
    },
  },
];

/** 根据 serviceId 获取服务数据 */
export function getServiceById(id: string): ServiceData | undefined {
  return servicesData.find((s) => s.id === id);
}

/** 所有服务ID列表 */
export const serviceIds = servicesData.map((s) => s.id);

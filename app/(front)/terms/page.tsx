import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '使用条款 - cnfranchise.com',
  description: '了解使用cnfranchise.com服务的条款和条件',
};

export default function TermsPage() {
  return (
    <div className="page-enter">
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 py-12 text-center">
          <h1 className="text-3xl font-extrabold text-slate-800 mb-4">使用条款</h1>
          <p className="text-slate-500 max-w-2xl mx-auto">
            使用我们的服务前，请仔细阅读以下条款
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl border border-slate-100 p-8 space-y-6">
          <section>
            <h2 className="text-lg font-bold text-slate-800 mb-3">服务说明</h2>
            <p className="text-slate-600 leading-relaxed">
              cnfranchise.com提供加盟品牌信息展示、搜索和咨询服务。我们努力确保信息的准确性和时效性，
              但不保证所有信息的绝对准确。
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-800 mb-3">用户责任</h2>
            <p className="text-slate-600 leading-relaxed">
              用户在使用本服务时，应遵守相关法律法规，不得发布违法、虚假或侵权内容。
              用户应对自己的行为负责。
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-800 mb-3">知识产权</h2>
            <p className="text-slate-600 leading-relaxed">
              本网站的所有内容，包括但不限于文字、图片、代码等，均受知识产权保护。
              未经授权，禁止复制、修改或用于商业用途。
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-800 mb-3">免责声明</h2>
            <p className="text-slate-600 leading-relaxed">
              本网站提供的加盟信息仅供参考，不构成投资建议。用户在做出加盟决策前，
              应自行核实相关信息并承担相应风险。
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-800 mb-3">条款修改</h2>
            <p className="text-slate-600 leading-relaxed">
              我们保留随时修改本条款的权利。修改后的条款将在网站上公布，
              继续使用本服务即表示您接受修改后的条款。
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

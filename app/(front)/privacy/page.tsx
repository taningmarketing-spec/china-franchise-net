import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '隐私政策 - cnfranchise.com',
  description: '了解cnfranchise.com如何保护您的隐私信息',
};

export default function PrivacyPage() {
  return (
    <div className="page-enter">
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 py-12 text-center">
          <h1 className="text-3xl font-extrabold text-slate-800 mb-4">隐私政策</h1>
          <p className="text-slate-500 max-w-2xl mx-auto">
            我们非常重视您的隐私保护
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl border border-slate-100 p-8 space-y-6">
          <section>
            <h2 className="text-lg font-bold text-slate-800 mb-3">信息收集</h2>
            <p className="text-slate-600 leading-relaxed">
              我们可能会收集您在使用我们服务时提供的个人信息，包括但不限于姓名、联系电话、电子邮箱等。
              这些信息仅用于为您提供更好的服务体验。
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-800 mb-3">信息使用</h2>
            <p className="text-slate-600 leading-relaxed">
              我们收集的信息将用于：响应您的咨询、提供加盟品牌推荐、改进我们的服务质量。
              未经您的同意，我们不会将您的个人信息提供给第三方。
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-800 mb-3">信息保护</h2>
            <p className="text-slate-600 leading-relaxed">
              我们采用行业标准的安全措施来保护您的个人信息，防止未经授权的访问、使用或泄露。
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-800 mb-3">Cookie 使用</h2>
            <p className="text-slate-600 leading-relaxed">
              我们使用 Cookie 来改善您的浏览体验。您可以选择在浏览器设置中禁用 Cookie，
              但这可能会影响某些功能的正常使用。
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-800 mb-3">政策更新</h2>
            <p className="text-slate-600 leading-relaxed">
              我们可能会不时更新本隐私政策。更新后的政策将在网站上公布，建议您定期查看。
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

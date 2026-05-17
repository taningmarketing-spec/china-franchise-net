export default function ScrapeLogsPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-extrabold text-slate-800">采集日志</h1>
      <div className="bg-white rounded-xl border border-slate-100 p-8 text-center">
        <div className="text-4xl mb-3">🔄</div>
        <p className="text-slate-500">采集日志将在此显示</p>
        <p className="text-sm text-slate-400 mt-2">每日自动采集任务运行记录</p>
      </div>
    </div>
  );
}

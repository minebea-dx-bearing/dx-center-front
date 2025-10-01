export default function CardProd({ title, target, actual, avgCT, avgOpn }) {
  const formatNumber = (num) => num?.toLocaleString();
  const formatCT = (num) => (num !== undefined && num !== null ? Number(num).toFixed(2) : "");
  const formatDiff = (value) => (value > 0 ? `+${value.toLocaleString()}` : value.toLocaleString());

  const diff_actual = actual !== undefined && target !== undefined ? actual - target : undefined;
  const diffActualColor = diff_actual > 0 ? "text-green-600" : diff_actual < 0 ? "text-red-600" : "text-gray-600";

  return (
    <div
      className="w-150 h-35 p-8 font-semibold text-slate-700 rounded-2xl border border-gray-200 bg-white shadow-md flex flex-col justify-center transition-transform duration-500 ease-in-out transform 
             hover:scale-105 hover:shadow-[0_10px_25px_rgba(0,0,0,0.1)] hover:border-gray-200 cursor-pointer"
    >
      <div className="text-2xl flex justify-center mb-2">{title}</div>
      <div className="w-full text-center flex justify-between">
        <div>
          <div className="text-gray-400">Target Prod.</div>
          <div className="my-2 text-xl">{formatNumber(target)}</div>
        </div>
        <div>
          <div className="text-gray-400">Actual Prod.</div>
          <div className="my-2 text-xl">{formatNumber(actual)}</div>
        </div>
        <div>
          <div className="text-gray-400">Diff</div>
          <div className={`my-2 text-xl ${diffActualColor}`}>{formatDiff(actual - target)}</div>
        </div>
        <div>
          <div className="text-gray-400">AVG.C/T</div>
          <div className="my-2 text-xl">{formatCT(avgCT)}s</div>
        </div>
        <div>
          <div className="text-gray-400">AVG. Opn.</div>
          <div className="my-2 text-xl">{formatCT(avgOpn)}%</div>
        </div>
      </div>
    </div>
  );
}

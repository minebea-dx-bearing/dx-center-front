export default function CardProd({ title, target, actual, avgCT, avgOpn }) {
  return (
    <div className="w-150 h-35 p-4 font-semibold text-slate-700 rounded-2xl border border-gray-200 bg-white shadow-md flex flex-col justify-center">
      <div className="text-2xl flex justify-center mb-2">{title}</div>
      <div className="grid grid-cols-4 gap-4 w-full text-center">
        <div>
          <div className="text-gray-400">Target Prod.</div>
          <div className="my-2 text-xl">{target}</div>
        </div>
        <div>
          <div className="text-gray-400">Actual Prod.</div>
          <div className="my-2 text-xl">{actual}</div>
        </div>
        <div>
          <div className="text-gray-400">AVG.C/T</div>
          <div className="my-2 text-xl">{avgCT}s</div>
        </div>
        <div>
          <div className="text-gray-400">AVG. Opn.</div>
          <div className="my-2 text-xl">{avgOpn}%</div>
        </div>
      </div>
    </div>
  );
}

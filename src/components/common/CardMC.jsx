export default function CardMC({
  mc_no,
  part_no,
  process,
  target,
  actual,
  actual_ng,
  diff_actual,
  target_ct,
  actual_ct,
  diff_ct,
  yield_target,
  yield_rate,
  opn,
  status,
}) {
  // function จัด format
  const formatNumber = (num) => num?.toLocaleString();
  const formatCT = (num) => (num !== undefined && num !== null ? Number(num).toFixed(2) : 0);
  const formatDiff = (value) => (value > 0 ? `+${value.toLocaleString()}` : value.toLocaleString());
  const colorStatus = (status) => {
    switch (status) {
      case "RUNNING":
        return "bg-green-200 text-green-700";
      case "STOP":
        return "bg-red-200 text-red-700";
      case "OFFLINE":
        return "bg-gray-400 text-gray-900";
      case "NO DATA RUN":
        return "bg-gray-200 text-gray-700";
      case "SIGNAL LOSE":
        return "bg-gray-200 text-gray-700";
      default:
        return "bg-yellow-200 text-yellow-700";
    }
  };
  const colorProd = (prod) => {
    if (prod >= 0) {
      return "text-green-600";
    } else {
      return "text-red-600 text-blink";
    }
  };
  const colorCt = (ct) => {
    if (ct < 0) {
      return "text-green-600";
    } else {
      return "text-red-600 text-blink";
    }
  };
  const colorYield = (target, actual) => {
    if (actual >= target) {
      return "bg-green-400";
    } else {
      return "bg-red-400";
    }
  };

  return (
    <div
      className="m-2 w-55 rounded-2xl border border-gray-200 bg-white shadow-md transition-transform duration-500 ease-in-out transform 
             hover:scale-105 hover:shadow-[0_10px_25px_rgba(0,0,0,0.1)] hover:border-gray-200 cursor-pointer overflow-hidden"
    >
      <div className={`text-center font-semibold border-b border-gray-200 ${colorStatus(status)} py-[0.21vw] text-base`}>{mc_no}</div>
      <div className="text-center border-b border-gray-200 py-[0.21vw] text-sm">{part_no}</div>
      <div className={`grid grid-cols-[80px_1fr] border-b border-gray-200`}>
        <div className="p-1 border-r border-gray-200 text-xs text-center flex flex-col justify-center">Process</div>
        <div className="p-1 text-center text-ellipsis overflow-hidden whitespace-nowrap text-sm">{process}</div>
      </div>
      <div className={`grid grid-cols-[80px_1fr] border-b border-gray-200`}>
        <div className="p-1 border-r border-gray-200 text-xs text-center flex flex-col justify-center">Target prod.</div>
        <div className="p-1 text-center text-ellipsis overflow-hidden whitespace-nowrap text-sm">{formatNumber(target)}</div>
      </div>
      <div className={`grid grid-cols-[80px_1fr] border-b border-gray-200`}>
        <div className="p-1 border-r border-gray-200 text-xs text-center flex flex-col justify-center">Actual prod.</div>
        <div className="p-1 text-center text-ellipsis overflow-hidden whitespace-nowrap text-sm">
          <span>{formatNumber(actual)}</span> <span className={`${colorProd(diff_actual)} font-bold`}>({formatDiff(diff_actual)})</span>
        </div>
      </div>
      <div className={`grid grid-cols-[80px_1fr] border-b border-gray-200`}>
        <div className="p-1 border-r border-gray-200 text-xs text-center flex flex-col justify-center">Actual NG</div>
        <div className="p-1 text-center text-red-600 text-ellipsis overflow-hidden whitespace-nowrap text-sm">{formatNumber(actual_ng)}</div>
      </div>
      <div className={`grid grid-cols-[80px_1fr] border-b border-gray-200`}>
        <div className="p-1 border-r border-gray-200 text-xs text-center flex flex-col justify-center">Target C/T.</div>
        <div className="p-1 text-center text-ellipsis overflow-hidden whitespace-nowrap text-sm">{formatCT(target_ct)}</div>
      </div>
      <div className={`grid grid-cols-[80px_1fr] border-b border-gray-200`}>
        <div className="p-1 border-r border-gray-200 text-xs text-center flex flex-col justify-center">Actual C/T.</div>
        <div className="p-1 text-center text-ellipsis overflow-hidden whitespace-nowrap text-sm">
          <span>{formatCT(actual_ct)}</span> <span className={`${colorCt(diff_ct)} font-bold`}>({formatDiff(formatCT(diff_ct))} s)</span>
        </div>
      </div>

      <div className={`grid grid-cols-[80px_1fr] border-b border-gray-200`}>
        <div className="p-1 border-r border-gray-200 text-xs text-center flex flex-col justify-center">
          <div>Yield</div>
        </div>
        <div className={`p-1 text-center text-sm flex flex-col justify-center`}>
          <div className="relative w-full h-5 bg-gray-200 rounded-full overflow-hidden">
            <div
              className={`absolute left-0 top-0 h-full ${colorYield(yield_target, yield_rate)} rounded-full`}
              style={{ width: `${yield_rate}%` }}
            ></div>
            <div className="absolute inset-0 flex items-center justify-center text-sm font-bold text-gray-700">{formatCT(yield_rate)}%</div>
          </div>
        </div>
      </div>

      <div className={`grid grid-cols-[80px_1fr] border-b border-gray-200`}>
        <div className="p-1 border-r border-gray-200 text-xs text-center flex flex-col justify-center">
          <div>Opn.</div>
        </div>
        <div className={`p-1 text-center text-sm flex flex-col justify-center`}>
          <div className="relative w-full h-5 bg-gray-200 rounded-full overflow-hidden">
            <div className={`absolute left-0 top-0 h-full bg-green-400 rounded-full`} style={{ width: `${opn}%` }}></div>
            <div className="absolute inset-0 flex items-center justify-center text-sm font-bold text-gray-700">{formatCT(opn)}%</div>
          </div>
        </div>
      </div>

      <div className={`grid grid-cols-[80px_1fr]`}>
        <div className="p-1 border-r border-gray-200 text-xs text-center flex flex-col justify-center">Status</div>
        <div className={`p-1 font-bold text-center text-sm ${colorStatus(status)} whitespace-nowrap overflow-hidden text-ellipsis`}>{status}</div>
      </div>
    </div>
  );
}

export default function CardMC({ mc_no, part_no, process, target, actual, target_ct, actual_ct, yield_per, opn, status }) {
  const diff_actual = actual !== undefined && target !== undefined ? actual - target : undefined;
  const diff_ct = actual_ct !== undefined && target_ct !== undefined ? actual_ct - target_ct : undefined;
  const formatDiff = (value) => (value > 0 ? `+${value.toLocaleString()}` : value.toLocaleString());
  const formatNumber = (num) => num?.toLocaleString();
  const formatCT = (num) => (num !== undefined && num !== null ? Number(num).toFixed(2) : "");

  const diffActualColor = diff_actual > 0 ? "text-green-600" : diff_actual < 0 ? "text-red-600" : "text-gray-600";
  const diffCTColor = diff_ct > 0 ? "text-red-600" : diff_ct < 0 ? "text-green-600" : "text-gray-600";

  // เงื่อนไขสี status
  let statusColor = "bg-orange-200 text-orange-700";
  if (status === "RUNNING") statusColor = "bg-green-200 text-green-700";
  else if (status === "STOP") statusColor = "bg-red-200 text-red-700";
  else if (status === "SIGNAL LOSE") statusColor = "bg-gray-200 text-gray-700";

  return (
    <div
      className="w-60 rounded-2xl border border-gray-200 bg-white shadow-md transition-transform duration-500 ease-in-out transform 
             hover:scale-105 hover:shadow-[0_10px_25px_rgba(0,0,0,0.1)] hover:border-gray-200 cursor-pointer"
    >
      {mc_no && <div className="text-center font-semibold text-lg border-b border-gray-200 py-1">{mc_no}</div>}
      {part_no && <div className="text-center text-sm border-b border-gray-200 py-1">{part_no}</div>}
      {process !== undefined && (
        <div className="grid grid-cols-[95px_1fr] border-b border-gray-200">
          <div className="py-1 px-2 border-r border-gray-200 text-sm whitespace-nowrap overflow-hidden text-ellipsis">Process</div>
          <div className="py-1 px-2 whitespace-nowrap overflow-hidden text-center text-ellipsis">{process}</div>
        </div>
      )}
      {target !== undefined && (
        <div className="grid grid-cols-[95px_1fr] border-b border-gray-200">
          <div className="py-1 px-2 border-r border-gray-200 text-sm whitespace-nowrap overflow-hidden text-ellipsis">Target</div>
          <div className="py-1 px-2 whitespace-nowrap overflow-hidden text-ellipsis">{formatNumber(target)}</div>
        </div>
      )}
      {actual !== undefined && (
        <div className="grid grid-cols-[95px_1fr] border-b border-gray-200">
          <div className="py-1 px-2 border-r border-gray-200 text-sm whitespace-nowrap overflow-hidden text-ellipsis">Actual</div>
          <div className="py-1 px-2 whitespace-nowrap overflow-hidden text-ellipsis">
            {formatNumber(actual)}
            {diff_actual !== undefined && <span className={`text-xs ${diffActualColor}`}> ({formatDiff(diff_actual)})</span>}
          </div>
        </div>
      )}
      {target_ct !== undefined && (
        <div className="grid grid-cols-[95px_1fr] border-b border-gray-200">
          <div className="py-1 px-2 border-r border-gray-200 text-sm whitespace-nowrap overflow-hidden text-ellipsis">Target C/T</div>
          <div className="py-1 px-2 whitespace-nowrap overflow-hidden text-ellipsis">{formatCT(target_ct)} s</div>
        </div>
      )}
      {actual_ct !== undefined && (
        <div className="grid grid-cols-[95px_1fr] border-b border-gray-200">
          <div className="py-1 px-2 border-r border-gray-200 text-sm whitespace-nowrap overflow-hidden text-ellipsis">Actual C/T</div>
          <div className="py-1 px-2 whitespace-nowrap overflow-hidden text-ellipsis">
            {formatCT(actual_ct)} s{diff_ct !== undefined && <span className={`text-xs ${diffCTColor}`}> ({formatCT(diff_ct)})</span>}
          </div>
        </div>
      )}
      {yield_per !== undefined && (
        <div className="grid grid-cols-[95px_1fr] border-b border-gray-200">
          <div className="py-1 px-2 border-r border-gray-200 text-sm whitespace-nowrap overflow-hidden text-ellipsis">Yield</div>
          <div className="py-1 px-2 whitespace-nowrap overflow-hidden text-ellipsis">{formatCT(yield_per)} %</div>
        </div>
      )}
      {opn !== undefined && (
        <div className="grid grid-cols-[95px_1fr] border-b border-gray-300">
          <div className="py-1 px-2 border-r border-gray-300 text-sm whitespace-nowrap overflow-hidden text-ellipsis">Opn.</div>
          <div className="py-1 px-2 flex items-center">
            <div className="relative w-full h-5 bg-gray-200 rounded-full overflow-hidden">
              <div className="absolute left-0 top-0 h-full bg-green-400 rounded-full" style={{ width: `${opn}%` }}></div>
              <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-gray-700">{formatCT(opn)}%</div>
            </div>
          </div>
        </div>
      )}
      {status && (
        <div className="grid grid-cols-[95px_1fr]">
          <div className="py-1 px-2 border-r border-gray-200 text-sm whitespace-nowrap overflow-hidden text-ellipsis">Status</div>
          <div className={`py-1 px-2 font-bold text-center whitespace-nowrap overflow-hidden text-ellipsis ${statusColor}`}>{status}</div>
        </div>
      )}
    </div>
  );
}

import moment from "moment/moment";

export default function CardMC2({
  mc_no,
  part_no,
  process,
  target,
  actual,
  actual_ng,
  target_ct,
  actual_ct,
  yield_per,
  opn,
  status,
  c1_ok,
  c2_ok,
  c3_ok,
  c4_ok,
  c5_ok,
}) {
  const diff_actual = actual !== undefined && target !== undefined ? actual - target : undefined;
  const diff_ct = actual_ct !== undefined && target_ct !== undefined ? actual_ct - target_ct : undefined;
  const formatDiff = (value) => (value > 0 ? `+${value.toLocaleString()}` : value.toLocaleString());
  const formatNumber = (num) => num?.toLocaleString();
  const formatCT = (num) => (num !== undefined && num !== null ? Number(num).toFixed(2) : "");
  const format1 = (num) => (num !== undefined && num !== null ? Number(num).toFixed(1) : "");

  const diffActualColor = diff_actual > 0 ? "text-green-600" : diff_actual < 0 ? "text-red-600" : "text-gray-600";
  const diffCTColor = diff_ct > 0 ? "text-red-600" : diff_ct < 0 ? "text-green-600" : "text-gray-600";

  let statusColor = "bg-orange-200 text-orange-700";
  if (status === "RUNNING") statusColor = "bg-green-200 text-green-700";
  else if (status === "STOP") statusColor = "bg-red-200 text-red-800";
  else if (status === "SIGNAL LOSE" || status === "NO DATA STATUS") statusColor = "bg-gray-200 text-gray-800";

  const sumTotal = (...numbers) => {
    return numbers.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  };

  const total_c = sumTotal(c1_ok, c2_ok, c3_ok, c4_ok, c5_ok);

  return (
    <div
      className="w-55 rounded-2xl border border-gray-200 bg-white shadow-md transition-transform duration-500 ease-in-out transform 
             hover:scale-105 hover:shadow-[0_10px_25px_rgba(0,0,0,0.1)] hover:border-gray-200 cursor-pointer overflow-hidden"
    >
      {mc_no && <div className="text-center font-semibold border-b border-gray-200 py-1">{mc_no}</div>}
      {part_no && <div className="text-center text-xs border-b border-gray-200 py-1">{part_no}</div>}
      {process !== undefined && (
        <div className="grid grid-cols-[85px_1fr] border-b border-gray-200">
          <div className="py-1 px-2 border-r border-gray-200 text-xs whitespace-nowrap overflow-hidden text-ellipsis">Process</div>
          <div className="py-1 px-2 whitespace-nowrap overflow-hidden text-center text-ellipsis text-sm">{process}</div>
        </div>
      )}
      {target !== undefined && (
        <div className="grid grid-cols-[85px_1fr] border-b border-gray-200">
          <div className="py-1 px-2 border-r border-gray-200 text-xs whitespace-nowrap overflow-hidden text-ellipsis">Target Prod.</div>
          <div className="py-1 px-2 whitespace-nowrap overflow-hidden text-ellipsis text-sm">{formatNumber(target)}</div>
        </div>
      )}
      {actual !== undefined && (
        <div className="grid grid-cols-[85px_1fr] border-b border-gray-200">
          <div className="py-1 px-2 border-r border-gray-200 text-xs whitespace-nowrap overflow-hidden text-ellipsis">Actual Prod.</div>
          <div className="py-1 px-2 whitespace-nowrap overflow-hidden text-ellipsis text-sm">
            {formatNumber(actual)}
            {diff_actual !== undefined && <span className={`text-sm ${diffActualColor}`}> ({formatDiff(diff_actual)})</span>}
          </div>
        </div>
      )}
      {actual_ng !== undefined && (
        <div className="grid grid-cols-[85px_1fr] border-b border-gray-200">
          <div className="py-1 px-2 border-r border-gray-200 text-xs whitespace-nowrap overflow-hidden text-ellipsis">Actual NG</div>
          <div className="py-1 px-2 whitespace-nowrap overflow-hidden text-red-600 text-ellipsis text-sm">{formatNumber(actual_ng)}</div>
        </div>
      )}
      {target_ct !== undefined && (
        <div className="grid grid-cols-[85px_1fr] border-b border-gray-200">
          <div className="py-1 px-2 border-r border-gray-200 text-xs whitespace-nowrap overflow-hidden text-ellipsis">Target C/T</div>
          <div className="py-1 px-2 whitespace-nowrap overflow-hidden text-ellipsis text-sm">{formatCT(target_ct)} s</div>
        </div>
      )}
      {actual_ct !== undefined && (
        <div className="grid grid-cols-[85px_1fr] border-b border-gray-200">
          <div className="py-1 px-2 border-r border-gray-200 text-xs whitespace-nowrap overflow-hidden text-ellipsis">Actual C/T</div>
          <div className="py-1 px-2 whitespace-nowrap overflow-hidden text-ellipsis text-sm">
            {formatCT(actual_ct)} s{diff_ct !== undefined && <span className={`text-sm ${diffCTColor}`}> ({formatDiff(formatCT(diff_ct))})</span>}
          </div>
        </div>
      )}
      {yield_per !== undefined && (
        <div className="grid grid-cols-[85px_1fr] border-b border-gray-300">
          <div className="py-1 px-2 border-r border-gray-300 text-xs whitespace-nowrap overflow-hidden text-ellipsis">Yield</div>
          <div className="py-1 px-2 flex items-center">
            <div className="relative w-full h-5 bg-gray-200 rounded-full overflow-hidden">
              <div className="absolute left-0 top-0 h-full bg-green-400 rounded-full" style={{ width: `${yield_per}%` }}></div>
              <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-gray-700">{formatCT(yield_per)}%</div>
            </div>
          </div>
        </div>
      )}
      {opn !== undefined && (
        <div className="grid grid-cols-[85px_1fr] border-b border-gray-300">
          <div className="py-1 px-2 border-r border-gray-300 text-xs whitespace-nowrap overflow-hidden text-ellipsis">Opn.</div>
          <div className="py-1 px-2 flex items-center">
            <div className="relative w-full h-5 bg-gray-200 rounded-full overflow-hidden">
              <div className="absolute left-0 top-0 h-full bg-green-400 rounded-full" style={{ width: `${opn}%` }}></div>
              <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-gray-700">{formatCT(opn)}%</div>
            </div>
          </div>
        </div>
      )}
      {c1_ok !== undefined && (
        <div className="grid grid-cols-[85px_1fr] border-b border-gray-300">
          <div className="py-1 px-2 border-r border-gray-300 text-xs whitespace-nowrap overflow-hidden text-ellipsis">C1 OK</div>
          <div className="py-1 px-2 flex items-center">
            <div className="relative w-full h-5 bg-gray-200 rounded-full overflow-hidden">
              <div className="absolute left-0 top-0 h-full bg-blue-400 rounded-full" style={{ width: `${(c1_ok / total_c) * 100}%` }}></div>
              <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-gray-700">{`${formatNumber(c1_ok)} (${format1(c1_ok / total_c || 0 * 100)}%)`}</div>
            </div>
          </div>
        </div>
      )}
      {c2_ok !== undefined && (
        <div className="grid grid-cols-[85px_1fr] border-b border-gray-300">
          <div className="py-1 px-2 border-r border-gray-300 text-xs whitespace-nowrap overflow-hidden text-ellipsis">C2 OK</div>
          <div className="py-1 px-2 flex items-center">
            <div className="relative w-full h-5 bg-gray-200 rounded-full overflow-hidden">
              <div className="absolute left-0 top-0 h-full bg-blue-400 rounded-full" style={{ width: `${(c2_ok / total_c) * 100}%` }}></div>
              <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-gray-700">{`${formatNumber(c2_ok)} (${format1(c2_ok / total_c || 0 * 100)}%)`}</div>
            </div>
          </div>
        </div>
      )}
      {c3_ok !== undefined && (
        <div className="grid grid-cols-[85px_1fr] border-b border-gray-300">
          <div className="py-1 px-2 border-r border-gray-300 text-xs whitespace-nowrap overflow-hidden text-ellipsis">C3 OK</div>
          <div className="py-1 px-2 flex items-center">
            <div className="relative w-full h-5 bg-gray-200 rounded-full overflow-hidden">
              <div className="absolute left-0 top-0 h-full bg-blue-400 rounded-full" style={{ width: `${(c3_ok / total_c) * 100}%` }}></div>
              <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-gray-700">{`${formatNumber(c3_ok)} (${format1(c3_ok / total_c || 0 * 100)}%)`}</div>
            </div>
          </div>
        </div>
      )}
      {c4_ok !== undefined && (
        <div className="grid grid-cols-[85px_1fr] border-b border-gray-300">
          <div className="py-1 px-2 border-r border-gray-300 text-xs whitespace-nowrap overflow-hidden text-ellipsis">C4 OK</div>
          <div className="py-1 px-2 flex items-center">
            <div className="relative w-full h-5 bg-gray-200 rounded-full overflow-hidden">
              <div className="absolute left-0 top-0 h-full bg-blue-400 rounded-full" style={{ width: `${(c4_ok / total_c) * 100}%` }}></div>
              <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-gray-700">{`${formatNumber(c4_ok)} (${format1(c4_ok / total_c || 0 * 100)}%)`}</div>
            </div>
          </div>
        </div>
      )}
      {c5_ok !== undefined && (
        <div className="grid grid-cols-[85px_1fr] border-b border-gray-300">
          <div className="py-1 px-2 border-r border-gray-300 text-xs whitespace-nowrap overflow-hidden text-ellipsis">C5 OK</div>
          <div className="py-1 px-2 flex items-center">
            <div className="relative w-full h-5 bg-gray-200 rounded-full overflow-hidden">
              <div className="absolute left-0 top-0 h-full bg-blue-400 rounded-full" style={{ width: `${(c5_ok / total_c) * 100}%` }}></div>
              <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-gray-700">{`${formatNumber(c5_ok)} (${format1(c5_ok / total_c || 0 * 100)}%)`}</div>
            </div>
          </div>
        </div>
      )}
      {status && (
        <div className="grid grid-cols-[85px_1fr]">
          <div className="py-1 px-2 border-r border-gray-200 text-xs whitespace-nowrap overflow-hidden text-ellipsis">Status</div>
          <div className={`py-1 px-2 font-bold text-center text-sm whitespace-nowrap overflow-hidden text-ellipsis ${statusColor}`}>{status}</div>
        </div>
      )}
    </div>
  );
}
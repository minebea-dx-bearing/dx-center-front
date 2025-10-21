const CardProcess = ({ title, subTitle, processes, data, showArrow = true }) => {
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
      return "text-red-600";
    }
  };
  const colorCt = (ct) => {
    if (ct < 0) {
      return "text-green-600";
    } else {
      return "text-red-600";
    }
  };

  // ตรวจสอบว่าเป็น process แบบคู่หรือเดี่ยว
  const isDoubleProcess = processes.length > 1;

  // ฟังก์ชันช่วยสร้าง className สำหรับ grid columns
  const getGridColsClass = () => {
    return isDoubleProcess
      ? "grid-cols-[3.125vw_1fr_1fr]" // 60px -> 3.125vw
      : "grid-cols-[3.125vw_1fr]";
  };

  return (
    <div className="flex items-center">
      <div className="w-[clamp(220px,13.54vw,280px)] rounded-2xl border border-gray-200 bg-white shadow-md transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg cursor-pointer overflow-hidden">
        <div className={`text-center font-semibold border-b border-gray-200 ${colorStatus(data.status.length > 1 ? data.status[1] : data.status[0])} py-[0.21vw] text-[clamp(0.7rem,0.83vw,1rem)]`}>
          {title}
        </div>
        <div className="text-center border-b border-gray-200 py-[0.21vw] text-[clamp(0.6rem,0.625vw,0.75rem)]">{subTitle}</div>

        <div className={`grid ${getGridColsClass()} border-b border-gray-200`}>
          <div className="py-[0.21vw] px-[0.42vw] border-r border-gray-200 text-[clamp(0.6rem,0.625vw,0.75rem)] text-center flex flex-col justify-center">
            Process
          </div>
          <div className="py-[0.21vw] px-[0.42vw] text-center text-ellipsis overflow-hidden whitespace-nowrap text-[clamp(0.6rem,0.625vw,0.75rem)]">
            {processes[0]}
          </div>
          {isDoubleProcess && (
            <div className="py-[0.21vw] px-[0.42vw] text-center text-ellipsis overflow-hidden whitespace-nowrap text-[clamp(0.6rem,0.625vw,0.75rem)] border-l border-gray-200">
              {processes[1]}
            </div>
          )}
        </div>

        <div className={`grid ${getGridColsClass()} border-b border-gray-200`}>
          <div className="py-[0.21vw] px-[0.42vw] border-r border-gray-200 text-[clamp(0.6rem,0.625vw,0.75rem)] text-center flex flex-col justify-center">
            <div>Prod.</div>
            <div>Actual</div>
          </div>
          <div className="py-[0.21vw] px-[0.42vw] text-center text-ellipsis overflow-hidden whitespace-nowrap text-[clamp(0.75rem,0.83vw,1rem)] flex flex-col justify-center">
            <div>{formatNumber(data.prodActual[0].value)}</div>
            <div className={`${colorProd(data.prodActual[0].diff)} font-bold`}>({formatDiff(data.prodActual[0].diff)})</div>
          </div>
          {isDoubleProcess && (
            <div className="py-[0.21vw] px-[0.42vw] text-center text-ellipsis overflow-hidden whitespace-nowrap text-[clamp(0.75rem,0.83vw,1rem)] border-l border-gray-200 flex flex-col justify-center">
              <div>{formatNumber(data.prodActual[1].value)}</div>
              <div className={`${colorProd(data.prodActual[1].diff)} font-bold`}>({formatDiff(data.prodActual[1].diff)})</div>
            </div>
          )}
        </div>

        <div className={`grid ${getGridColsClass()} border-b border-gray-200`}>
          <div className="py-[0.21vw] px-[0.42vw] border-r border-gray-200 text-[clamp(0.6rem,0.625vw,0.75rem)] text-center flex flex-col justify-center">
            <div>C/T</div>
            <div>Actual</div>
          </div>
          <div className="py-[0.21vw] px-[0.42vw] text-center text-ellipsis overflow-hidden whitespace-nowrap text-[clamp(0.75rem,0.83vw,1rem)] flex flex-col justify-center">
            {formatCT(data.ctActual[0].value)} s
            <span className={`${colorCt(data.ctActual[0].diff)} font-bold`}>({formatDiff(formatCT(data.ctActual[0].diff))} s)</span>
          </div>
          {isDoubleProcess && (
            <div className="py-[0.21vw] px-[0.42vw] text-center text-ellipsis overflow-hidden whitespace-nowrap text-[clamp(0.75rem,0.83vw,1rem)] border-l border-gray-200 flex flex-col justify-center">
              {formatCT(data.ctActual[1].value)} s
              <span className={`${colorCt(data.ctActual[1].diff)} font-bold`}>({formatDiff(formatCT(data.ctActual[1].diff))} s)</span>
            </div>
          )}
        </div>

        <div className={`grid ${getGridColsClass()} border-b border-gray-200`}>
          <div className="py-[0.21vw] px-[0.42vw] border-r border-gray-200 text-[clamp(0.6rem,0.625vw,0.75rem)] text-center flex flex-col justify-center">
            <div>Yield</div>
          </div>
          <div className="py-[0.21vw] px-[0.42vw] text-center text-ellipsis overflow-hidden whitespace-nowrap text-[clamp(0.75rem,0.83vw,1rem)] flex flex-col justify-center">
            <div className="relative w-full h-5 bg-gray-200 rounded-full overflow-hidden">
              <div className="absolute left-0 top-0 h-full bg-green-400 rounded-full" style={{ width: `${data.yield_rate[0]}%` }}></div>
              <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-gray-700">{formatCT(data.yield_rate[0])}%</div>
            </div>
          </div>
          {isDoubleProcess && (
            <div className="py-[0.21vw] px-[0.42vw] text-center text-ellipsis overflow-hidden whitespace-nowrap text-[clamp(0.75rem,0.83vw,1rem)] border-l border-gray-200 flex flex-col justify-center">
              <div className="relative w-full h-5 bg-gray-200 rounded-full overflow-hidden">
                <div className="absolute left-0 top-0 h-full bg-green-400 rounded-full" style={{ width: `${data.yield_rate[1]}%` }}></div>
                <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-gray-700">{formatCT(data.yield_rate[1])}%</div>
              </div>
            </div>
          )}
        </div>

        <div className={`grid ${getGridColsClass()}`}>
          <div className="py-[0.21vw] px-[0.42vw] border-r border-gray-200 text-[clamp(0.6rem,0.625vw,0.75rem)] text-center flex flex-col justify-center">
            Status
          </div>
          <div
            className={`py-[0.21vw] px-[0.42vw] font-bold text-center text-[clamp(0.6rem,0.625vw,0.75rem)] ${colorStatus(
              data.status[0]
            )} border-gray-200 whitespace-nowrap overflow-hidden text-ellipsis`}
          >
            {data.status[0]}
          </div>
          {isDoubleProcess && (
            <div
              className={`py-[0.21vw] px-[0.42vw] font-bold text-center text-[clamp(0.6rem,0.625vw,0.75rem)] ${colorStatus(
                data.status[1]
              )} border-l border-gray-200 whitespace-nowrap overflow-hidden text-ellipsis`}
            >
              {data.status[1]}
            </div>
          )}
        </div>
      </div>

      {showArrow && (
        <div
          className={`w-[1.80vw] h-[0.52vw] ${data.status[0] === "RUNNING" || data.status[1] === "RUNNING" ? "animated-flow" : "bg-red-500"}`}
        ></div>
      )}
    </div>
  );
};

export default CardProcess;

import React from "react";

export default function CardOee({ title, subTitle, processes, data, showArrow = true }) {
  // function จัด format
  const formatNumber = (num) => num?.toLocaleString();
  const formatCT = (num) => (num !== undefined && num !== null ? Number(num).toFixed(2) : 0);
  const formatSecondsToHHMMSS = (totalSeconds) => {
    if (isNaN(totalSeconds) || totalSeconds < 0) {
      return "00:00:00";
    }

    const hours = Math.floor(totalSeconds / 3600);

    const minutes = Math.floor((totalSeconds % 3600) / 60);

    const seconds = Math.floor(totalSeconds % 60);

    const formattedHours = String(hours).padStart(2, "0");
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(seconds).padStart(2, "0");

    return `${formattedHours}:${formattedMinutes}`;
  };
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

  // ตรวจสอบว่าเป็น process แบบคู่หรือเดี่ยว
  const isDoubleProcess = processes.length > 1;

  // ฟังก์ชันช่วยสร้าง className สำหรับ grid columns
  const getGridColsClass = () => {
    return isDoubleProcess ? "grid-cols-[4.5vw_1fr_1fr]" : "grid-cols-[4.5vw_1fr]";
  };

  // สร้างตัวแปรเช็คการ Merge
  const shouldMergeTargetCt = isDoubleProcess && data.targetCt?.length === 1;
  const shouldMergeActualCt = isDoubleProcess && data.actualCt?.length === 1;
  const shouldMergePlanRun = isDoubleProcess && data.planRun?.length === 1;
  const shouldMergeDownTime = isDoubleProcess && data.downTime?.length === 1;
  const shouldMergeOee = isDoubleProcess && data.oee?.length === 1;
  const shouldMergeAvailability = isDoubleProcess && data.availability?.length === 1;
  const shouldMergePerformance = isDoubleProcess && data.performance?.length === 1;
  const shouldMergeQuality = isDoubleProcess && data.quality?.length === 1;
  const shouldMergeStatus = isDoubleProcess && data.status?.length === 1;

  return (
    <div className="flex items-center">
      <div className="w-[clamp(220px,13.54vw,280px)] rounded-2xl border border-gray-200 bg-white shadow-md transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg cursor-pointer overflow-hidden">
        <div
          className={`text-center font-semibold border-b border-gray-200 ${colorStatus(
            data.status.length > 1 ? data.status[1] : data.status[0]
          )} py-[0.21vw] text-[clamp(0.7rem,0.83vw,1rem)]`}
        >
          {title}
        </div>
        <div className="text-center border-b border-gray-200 py-[0.21vw] text-[clamp(0.6rem,0.625vw,0.75rem)]">{subTitle}</div>

        <div className={`grid ${getGridColsClass()} border-b border-gray-200`}>
          <div className="p-1 border-r border-gray-200 text-[clamp(0.6rem,0.625vw,0.75rem)] text-center flex flex-col justify-center">Process</div>
          <div className="p-1 text-center text-ellipsis overflow-hidden whitespace-nowrap text-[clamp(0.6rem,0.625vw,0.75rem)]">{processes[0]}</div>
          {isDoubleProcess && (
            <div className="p-1 text-center text-ellipsis overflow-hidden whitespace-nowrap text-[clamp(0.6rem,0.625vw,0.75rem)] border-l border-gray-200">
              {processes[1]}
            </div>
          )}
        </div>

        <div className={`grid ${getGridColsClass()} border-b border-gray-200`}>
          <div className="p-1 border-r border-gray-200 text-[clamp(0.6rem,0.625vw,0.75rem)] text-center flex flex-col justify-center">
            <div>Prod. OK</div>
          </div>
          <div className="p-0 text-center text-ellipsis overflow-hidden whitespace-nowrap text-[clamp(0.75rem,0.83vw,1rem)] flex flex-col justify-center">
            <div>{formatNumber(data.actualOk[0])}</div>
          </div>
          {isDoubleProcess && (
            <div className="p-0 text-center text-ellipsis overflow-hidden whitespace-nowrap text-[clamp(0.75rem,0.83vw,1rem)] border-l border-gray-200 flex flex-col justify-center">
              <div>{formatNumber(data.actualOk[1])}</div>
            </div>
          )}
        </div>

        <div className={`grid ${getGridColsClass()} border-b border-gray-200`}>
          <div className="p-0 border-r border-gray-200 text-[clamp(0.6rem,0.625vw,0.75rem)] text-center flex flex-col justify-center">
            <div>Prod. NG</div>
          </div>
          <div className="p-0 text-center text-ellipsis overflow-hidden whitespace-nowrap text-[clamp(0.75rem,0.83vw,1rem)] flex flex-col justify-center">
            <div>{formatNumber(data.actualNg[0])}</div>
          </div>
          {isDoubleProcess && (
            <div className="p-0 text-center text-ellipsis overflow-hidden whitespace-nowrap text-[clamp(0.75rem,0.83vw,1rem)] border-l border-gray-200 flex flex-col justify-center">
              <div>{formatNumber(data.actualNg[1])}</div>
            </div>
          )}
        </div>

        {/* <div className={`grid ${getGridColsClass()} border-b border-gray-200`}>
          <div className="p-1 border-r border-gray-200 text-[clamp(0.6rem,0.625vw,0.75rem)] text-center flex flex-col justify-center">
            <div>Target C/T.</div>
          </div>
          <div
            className={`p-1 text-center text-[clamp(0.75rem,0.83vw,1rem)] flex flex-col justify-center ${
              shouldMergeTargetCt ? "col-span-2" : ""
            }`}
          >
            <div>{formatCT(data.targetCt[0])} s</div>
          </div>
          {isDoubleProcess && !shouldMergeTargetCt && (
            <div className="p-1 text-center text-ellipsis overflow-hidden whitespace-nowrap text-[clamp(0.75rem,0.83vw,1rem)] border-l border-gray-200 flex flex-col justify-center">
              <div>{formatCT(data.targetCt[1])} s</div>
            </div>
          )}
        </div>  */}

        <div className={`grid ${getGridColsClass()} border-b border-gray-200`}>
          <div className="p-0 border-r border-gray-200 text-[clamp(0.6rem,0.625vw,0.75rem)] text-center flex flex-col justify-center">
            <div>Actual C/T.</div>
          </div>
          <div
            className={`p-0 text-center text-[clamp(0.75rem,0.83vw,1rem)] flex flex-col justify-center ${shouldMergeActualCt ? "col-span-2" : ""}`}
          >
            <div>{formatCT(data.actualCt[0])} s</div>
          </div>
          {isDoubleProcess && !shouldMergeActualCt && (
            <div className="p-0 text-center text-ellipsis overflow-hidden whitespace-nowrap text-[clamp(0.75rem,0.83vw,1rem)] border-l border-gray-200 flex flex-col justify-center">
              <div>{formatCT(data.actualCt[1])} s</div>
            </div>
          )}
        </div>

        {/* <div className={`grid ${getGridColsClass()} border-b border-gray-200`}>
          <div className="p-0 border-r border-gray-200 text-[clamp(0.6rem,0.625vw,0.75rem)] text-center flex flex-col justify-center">
            <div>PlanRun</div>
          </div>
          <div
            className={`p-0 text-center text-[clamp(0.75rem,0.83vw,1rem)] flex flex-col justify-center ${
              shouldMergePlanRun ? "col-span-2" : ""
            }`}
          >
            <div>{formatSecondsToHHMMSS(data.planRun[0])}</div>
          </div>
          {isDoubleProcess && !shouldMergePlanRun && (
            <div className="p-0 text-center text-ellipsis overflow-hidden whitespace-nowrap text-[clamp(0.75rem,0.83vw,1rem)] border-l border-gray-200 flex flex-col justify-center">
              <div>{formatSecondsToHHMMSS(data.planRun[1])}</div>
            </div>
          )}
        </div> */}
        <div className={`grid ${getGridColsClass()} border-b border-gray-200`}>
          <div className="p-0 border-r border-gray-200 text-[clamp(0.6rem,0.625vw,0.75rem)] text-center flex flex-col justify-center">
            <div>DownTime</div>
          </div>
          <div
            className={`p-0 text-center text-[clamp(0.75rem,0.83vw,1rem)] flex flex-col justify-center ${shouldMergeDownTime ? "col-span-2" : ""}`}
          >
            <div>
              {formatSecondsToHHMMSS(data.downTime[0])} <span className="text-xs">min</span>
            </div>
          </div>
          {isDoubleProcess && !shouldMergeDownTime && (
            <div className="p-0 text-center text-ellipsis overflow-hidden whitespace-nowrap text-[clamp(0.75rem,0.83vw,1rem)] border-l border-gray-200 flex flex-col justify-center">
              <div>
                {formatSecondsToHHMMSS(data.downTime[1])} <span className="text-xs">min</span>
              </div>
            </div>
          )}
        </div>

        <div className={`grid ${getGridColsClass()} border-b border-gray-200`}>
          <div className="p-1 border-r border-gray-200 text-[clamp(0.6rem,0.625vw,0.75rem)] text-center flex flex-col justify-center">
            <div>OEE</div>
          </div>
          <div className={`p-1 text-center text-[clamp(0.75rem,0.83vw,1rem)] flex flex-col justify-center ${shouldMergeOee ? "col-span-2" : ""}`}>
            <div className="relative w-full h-5 bg-gray-200 rounded-full overflow-hidden">
              <div className={`absolute left-0 top-0 h-full bg-green-600 rounded-full`} style={{ width: `${data.oee[0]}%` }}></div>
              <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-gray-700">{formatCT(data.oee[0])}%</div>
            </div>
          </div>
          {isDoubleProcess && !shouldMergeOee && (
            <div className="p-1 text-center text-[clamp(0.75rem,0.83vw,1rem)] border-l border-gray-200 flex flex-col justify-center">
              <div className="relative w-full h-5 bg-gray-200 rounded-full overflow-hidden">
                <div className={`absolute left-0 top-0 h-full bg-green-600 rounded-full`} style={{ width: `${data.oee[1]}%` }}></div>
                <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-gray-700">{formatCT(data.oee[1])}%</div>
              </div>
            </div>
          )}
        </div>

        <div className={`grid ${getGridColsClass()} border-b border-gray-200`}>
          <div className="p-1 border-r border-gray-200 text-[clamp(0.6rem,0.625vw,0.75rem)] text-center flex flex-col justify-center">
            <div>Availability</div>
          </div>
          <div
            className={`p-1 text-center text-[clamp(0.75rem,0.83vw,1rem)] flex flex-col justify-center ${
              shouldMergeAvailability ? "col-span-2" : ""
            }`}
          >
            <div className="relative w-full h-5 bg-gray-200 rounded-full overflow-hidden">
              <div className={`absolute left-0 top-0 h-full bg-blue-300 rounded-full`} style={{ width: `${data.availability[0]}%` }}></div>
              <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-gray-700">
                {formatCT(data.availability[0])}%
              </div>
            </div>
          </div>
          {isDoubleProcess && !shouldMergeAvailability && (
            <div className="p-1 text-center text-[clamp(0.75rem,0.83vw,1rem)] border-l border-gray-200 flex flex-col justify-center">
              <div className="relative w-full h-5 bg-gray-200 rounded-full overflow-hidden">
                <div className={`absolute left-0 top-0 h-full bg-blue-300 rounded-full`} style={{ width: `${data.availability[1]}%` }}></div>
                <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-gray-700">
                  {formatCT(data.availability[1])}%
                </div>
              </div>
            </div>
          )}
        </div>

        <div className={`grid ${getGridColsClass()} border-b border-gray-200`}>
          <div className="p-1 border-r border-gray-200 text-[clamp(0.6rem,0.625vw,0.75rem)] text-center flex flex-col justify-center">
            <div>Performance</div>
          </div>
          <div
            className={`p-1 text-center text-[clamp(0.75rem,0.83vw,1rem)] flex flex-col justify-center ${shouldMergePerformance ? "col-span-2" : ""}`}
          >
            <div className="relative w-full h-5 bg-gray-200 rounded-full overflow-hidden">
              <div className={`absolute left-0 top-0 h-full bg-blue-300 rounded-full`} style={{ width: `${data.performance[0]}%` }}></div>
              <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-gray-700">
                {formatCT(data.performance[0])}%
              </div>
            </div>
          </div>
          {isDoubleProcess && !shouldMergePerformance && (
            <div className="p-1 text-center text-[clamp(0.75rem,0.83vw,1rem)] border-l border-gray-200 flex flex-col justify-center">
              <div className="relative w-full h-5 bg-gray-200 rounded-full overflow-hidden">
                <div className={`absolute left-0 top-0 h-full bg-blue-300 rounded-full`} style={{ width: `${data.performance[1]}%` }}></div>
                <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-gray-700">
                  {formatCT(data.performance[1])}%
                </div>
              </div>
            </div>
          )}
        </div>

        <div className={`grid ${getGridColsClass()} border-b border-gray-200`}>
          <div className="p-1 border-r border-gray-200 text-[clamp(0.6rem,0.625vw,0.75rem)] text-center flex flex-col justify-center">
            <div>Quality</div>
          </div>
          <div className={`p-1 text-center text-[clamp(0.75rem,0.83vw,1rem)] flex flex-col justify-center ${shouldMergeQuality ? "col-span-2" : ""}`}>
            <div className="relative w-full h-5 bg-gray-200 rounded-full overflow-hidden">
              <div className={`absolute left-0 top-0 h-full bg-blue-300 rounded-full`} style={{ width: `${data.quality[0]}%` }}></div>
              <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-gray-700">{formatCT(data.quality[0])}%</div>
            </div>
          </div>
          {isDoubleProcess && !shouldMergeQuality && (
            <div className="p-1 text-center text-[clamp(0.75rem,0.83vw,1rem)] border-l border-gray-200 flex flex-col justify-center">
              <div className="relative w-full h-5 bg-gray-200 rounded-full overflow-hidden">
                <div className={`absolute left-0 top-0 h-full bg-blue-300 rounded-full`} style={{ width: `${data.quality[1]}%` }}></div>
                <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-gray-700">{formatCT(data.quality[1])}%</div>
              </div>
            </div>
          )}
        </div>

        <div className={`grid ${getGridColsClass()}`}>
          <div className="p-1 border-r border-gray-200 text-[clamp(0.6rem,0.625vw,0.75rem)] text-center flex flex-col justify-center">Status</div>
          <div
            className={`p-1 font-bold text-center text-[clamp(0.6rem,0.625vw,0.75rem)] ${colorStatus(
              data.status[0]
            )} whitespace-nowrap overflow-hidden text-ellipsis ${shouldMergeStatus ? "col-span-2" : ""}`}
          >
            {data.status[0]}
          </div>
          {isDoubleProcess && !shouldMergeStatus && (
            <div
              className={`p-1 font-bold text-center text-[clamp(0.6rem,0.625vw,0.75rem)] ${colorStatus(
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
}

import React from "react";
import { useLocation, useNavigate } from "react-router";

export default function DefaultCard({ data }) {
  const navigate = useNavigate();
  const location = useLocation();
  let additionalData = "";
  let cardHeight = "h-74";

  const formatNumber = (num) => num?.toLocaleString();
  const formatCT = (num) => (num !== undefined && num !== null ? Number(num).toFixed(2) : 0);
  const formatDiff = (value) => (value > 0 ? `+${value.toLocaleString()}` : value.toLocaleString());
  // const diffProd = data.prod_ok - data.target_actual;

  // check diff production and set text color
  const textDiffProdColor = (diffProdData) => {
    if (diffProdData < 0) {
      return "text-red-500";
    } else {
      return "text-green-500";
    }
  };

  // check cycle time and set text color
  const textCtColor = (CtData) => {
    if (CtData >= 0) {
      return "text-red-500 text-blink";
    } else {
      return "text-green-500";
    }
  };

  const colorGauge = (target, actual) => {
    if (actual >= target) {
      return "bg-good";
    } else {
      return "bg-red-400";
    }
  };

  // check m/c status and set color
  const colorStatus = (status) => {
    switch (status) {
      case "RUNNING":
        return "bg-run text-green-700";
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

  let addCycleTime = (
    <div className="grid grid-cols-2 border-b border-b-bordergray text-xl">
      <h1 className="border-r border-r-bordergray py-1">Actual C/T</h1>
      <h1 className="py-1">
        {formatCT(data.act_ct)}
        <span className={`${textCtColor(data.diff_ct)}`}>({formatDiff(formatCT(data.diff_ct))}s)</span>
      </h1>
    </div>
  );

  // check additional data
  if (data.drop != null) {
    additionalData = (
      <div className="grid grid-cols-2 border-b border-b-bordergray text-xl ">
        <h1 className="border-r border-r-bordergray py-1">Drop part</h1>
        <h1 className="py-1">{data.drop}</h1>
      </div>
    );
    cardHeight = "h-84";
  } else if (data.curr_yield != null && data.ng_pd != null) {
    additionalData = (
      <div>
        <div className="grid grid-cols-2 border-b border-b-bordergray text-xl ">
          <h1 className="border-r border-r-bordergray py-1">NG</h1>
          <h1 className="py-1">{data.ng_pd}</h1>
        </div>
        <div className="grid grid-cols-2 border-b border-b-bordergray text-xl ">
          <h1 className="border-r border-r-bordergray py-1">Yield</h1>
          <div className={`p-1 text-center text-sm flex flex-col justify-center`}>
            <div className="relative w-full h-5 bg-gray-200 rounded-full overflow-hidden">
              <div
                className={`absolute left-0 top-0 h-full  ${colorGauge(data.target_yield, data.curr_yield)} rounded-full`}
                style={{ width: `${data.curr_yield}%` }}
              ></div>
              <div className="absolute inset-0 flex items-center justify-center text-sm font-bold text-gray-700">{data.curr_yield}%</div>
            </div>
          </div>
        </div>
      </div>
    );
  } else if (data.curr_yield) {
    additionalData = (
      <div className="grid grid-cols-2 border-b border-b-bordergray text-xl ">
        <h1 className="border-r border-r-bordergray py-1">Yield</h1>
        <div className={`p-1 text-center text-sm flex flex-col justify-center`}>
          <div className="relative w-full h-5 bg-gray-200 rounded-full overflow-hidden">
            <div
              className={`absolute left-0 top-0 h-full  ${colorGauge(data.target_yield, data.curr_yield)} rounded-full`}
              style={{ width: `${data.curr_yield}%` }}
            ></div>
            <div className="absolute inset-0 flex items-center justify-center text-sm font-bold text-gray-700">{data.curr_yield}%</div>
          </div>
        </div>
      </div>
    );
    cardHeight = "h-84";
  } else if (data.act_ct_2) {
    addCycleTime = (
      <div className="grid grid-cols-2 border-b border-b-bordergray">
        <h1 className="col-span-3 border-b border-b-bordergray">Actual C/T</h1>
        <div className="border-r border-r-bordergray">
          <h1 className="mt-1 text-lg">H-1</h1>
          <h1 className="text-2xl mb-1">
            {formatCT(data.act_ct)}
            <span className={`${textCtColor(data.diff_ct)}`}>({formatDiff(formatCT(data.diff_ct))}s)</span>
          </h1>
        </div>
        <div className="border-r border-r-bordergray">
          <h1 className="mt-1 text-lg">H-2</h1>
          <h1 className="text-2xl mb-1">
            {formatCT(data.act_ct_2)}
            <span className={`${textCtColor(data.diff_ct_2)}`}>({formatDiff(formatCT(data.diff_ct_2))}s)</span>
          </h1>
        </div>
      </div>
    );
    cardHeight = "h-89";
  }

  const onClick = () => {
    navigate(`${location.pathname}/analysis-mc?mc_no=${data.mc_no}`);
  };

  return (
    <div
      className={`w-67 h-fit ml-10 bg-bggray border border-bordergray rounded-2xl flex flex-col 
                    transition-transform duration-500 ease-in-out transform hover:scale-105 
                    hover:shadow-[0_10px_25px_rgba(0,0,0,0.1)] hover:border-gray-300 cursor-pointer`}
      onClick={onClick}
    >
      <h1 className={`w-full h-12 pt-1 ${colorStatus(data.status_alarm)} rounded-t-2xl text-4xl font-medium text-center`}>{data.mc_no}</h1>
      <h1 className="text-xl text-center border border-b-bordergray pt-2 pb-2">{data.part_no}</h1>
      <div className="grid grid-cols-3 text-center border-b border-b-bordergray">
        <h1 className="col-span-3 border-b border-b-bordergray">Production</h1>
        <div className="border-r border-r-bordergray">
          <h1 className="mt-1.5">Target</h1>
          <h1 className="text-2xl mb-1.5">{formatNumber(data.target_pd)}</h1>
        </div>
        <div className="border-r border-r-bordergray">
          <h1 className="mt-1.5">Actual</h1>
          <h1 className="text-2xl mb-1.5">{formatNumber(data.act_pd)}</h1>
        </div>
        <div>
          <h1 className="mt-1.5">Diff</h1>
          <h1 className={`text-2xl mb-1.5 ${textDiffProdColor(data.diff_pd)}`}>{formatNumber(data.diff_pd)}</h1>
        </div>
      </div>
      <div className="text-center">
        {addCycleTime}
        {additionalData}
        <div className="grid grid-cols-2 border-b border-b-bordergray text-xl ">
          <h1 className="border-r border-r-bordergray py-1">Utilization</h1>
          <div className={`p-1 text-center text-sm flex flex-col justify-center`}>
            <div className="relative w-full h-5 bg-gray-200 rounded-full overflow-hidden">
              <div
                className={`absolute left-0 top-0 h-full ${colorGauge(data.target_utl, data.curr_utl)} rounded-full`}
                style={{ width: `${data.curr_utl}%` }}
              ></div>
              <div className="absolute inset-0 flex items-center justify-center text-sm font-bold text-gray-700">{formatCT(data.curr_utl)}%</div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 text-xl ">
          <h1 className="border-r border-r-bordergray py-1">Status</h1>
          <h1 className={`py-1 ${colorStatus(data.status_alarm)} rounded-br-2xl whitespace-nowrap overflow-hidden text-ellipsis px-2`}>
            {data.status_alarm}
          </h1>
        </div>
      </div>
    </div>
  );
}

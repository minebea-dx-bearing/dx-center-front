import React from 'react'

export default function DoubleDataCardCombine({data}) {
    const gridRow = "grid grid-rows-[48px_70px_70px]";
    let firstProcess = "Grease";
    let secondProcess = "Shield"
    let actCT = "";
    let mbrCycleTimeItem = "";
    let setRowSpan = "row-span-2 pt-10";

    console.log(data.f_act_ct)
    const textProdColor = (data) => {
            if (data.startsWith("-")){
                return "text-red-500";
            }
            else{
                return "text-green-500";
            }
        }

    const textCtColor = (data) => {
        // console.log(data)
        if (data.startsWith("-")){
            return "text-green-500";
        }
        else{
            return "text-red-500";
        }
    }

    if(data.s_act_ct){
        firstProcess = "Gauge";
        secondProcess = "Ball";
        actCT = "Gauge";
        mbrCycleTimeItem = (<h1 className="text-2xl border-l border-b">{data.s_act_ct}<br/><span className={`${textCtColor(data.s_diff_ct)}`}> ({data.s_diff_ct})</span></h1>);
        setRowSpan = "";
    }

    // const formatCT = (num) => (num !== undefined && num !== null ? Number(num).toFixed(2) : 0);

    // check m/c status and set color
    const colorStatus = (status) => {
        switch (status) {
          case "RUNNING":
            return "bg-run";
          case "STOP":
            return "bg-red-200";
          case "OFFLINE":
            return "bg-gray-400";
          case "NO DATA RUN":
            return "bg-gray-200";
          case "SIGNAL LOSE":
            return "bg-gray-200";
          default:
            return "bg-yellow-200";
        }
      };
    // console.log(data.part_no)

    return (
    <div className={`w-86 h-97 ml-10 bg-bggray border rounded-2xl flex flex-col`}>
        <h1 className={`w-full h-12 pt-1 ${colorStatus(data.f_status)} rounded-t-2xl text-4xl font-medium text-center`}>
            {data.mc_no}
        </h1>
        <h1 className="text-xl text-center border-b pt-2 pb-2">{data.part_no}</h1>
        <div className="grid grid-cols-[80px_170px_93px] text-center">
            <div className={`${gridRow}`}>
                <h1 className="row-start-2 text-xl border-b border-t pt-5">Gauge</h1>
                <h1 className="row-start-3 text-xl border-b pt-5">Ball</h1>
            </div>
            <div className={`${gridRow}`}>
                <div className="grid grid-cols-2">
                    <h1 className="border-l col-span-2">Production</h1>
                    <h1 className="border-t border-l">Actual</h1>
                    <h1 className="border-t border-l">Diff</h1>
                </div>
                <div className="grid grid-cols-2 border-b border-t">
                    <h1 className="text-2xl border-l pt-5">{data.f_act_pd}</h1>
                    <h1 className={`text-2xl border-l pt-5 ${textProdColor(data.f_diff_pd)}`}>{data.f_diff_pd}</h1>
                </div>
                <div className="grid grid-cols-2 border-b">
                    <h1 className="text-2xl border-l pt-5">{data.s_act_pd}</h1>
                    <h1 className={`text-2xl border-l pt-5 ${textProdColor(data.s_diff_pd)}`}>{data.s_diff_pd}</h1>
                </div>
            </div>
            <div className={`${gridRow}`}>
                <h1 className="border-l pt-3">Actual C/T</h1>
                <h1 className={`text-2xl border-l border-b border-t ${setRowSpan}`}>{data.f_act_ct}<br/><span className={`${textCtColor(data.f_diff_ct)}`}> ({data.f_diff_ct})</span></h1>
                {mbrCycleTimeItem}
            </div>
        </div>
        <div className="text-xl text-center">
            <div className="grid grid-cols-2 border-b border-b-bordergray">
                <h1 className="py-1">Yield</h1>
                <div className={`border-l p-1 text-center text-sm flex flex-col justify-center`}>
                    <div className="relative w-full h-5 bg-gray-200 rounded-full overflow-hidden">
                        <div className={`absolute left-0 top-0 h-full bg-green-400 rounded-full`} style={{ width: `${data.f_yield}%` }}></div>
                        <div className="absolute inset-0 flex items-center justify-center text-sm font-bold text-gray-700">{(data.f_yield)}%</div>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-2 border-b border-b-bordergray">
                <h1 className="py-1">Utilization</h1>
                <div className={`border-l p-1 text-center text-sm flex flex-col justify-center`}>
                    <div className="relative w-full h-5 bg-gray-200 rounded-full overflow-hidden">
                        <div className={`absolute left-0 top-0 h-full bg-green-400 rounded-full`} style={{ width: `${data.f_utl}%` }}></div>
                        <div className="absolute inset-0 flex items-center justify-center text-sm font-bold text-gray-700">{(data.f_utl)}%</div>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-2">
                <h1 className="py-1">Status</h1>
                <h1 className={`border-l py-1 ${colorStatus(data.f_status)} rounded-br-2xl`}>{data.f_status}</h1>
            </div>
        </div>
    </div>
  )
}

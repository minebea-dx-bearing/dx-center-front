import React from 'react'

export default function DefaultCard({data}) {
    // console.log(data)
    let additionalData = "";
    let cardHeight = "h-74";
    
    const formatNumber = (num) => num?.toLocaleString();
    const formatCT = (num) => (num !== undefined && num !== null ? Number(num).toFixed(2) : 0);
    const formatDiff = (value) => (value > 0 ? `+${value.toLocaleString()}` : value.toLocaleString());  

    // check diff production and set text color
    const textProdColor = (data) => {
        // console.log(data)
        if (data < 0){
            return "text-red-500";
        }
        else{
            return "text-green-500";
        }
    }

    // check cycle time and set text color
    const textCtColor = (data) => {
        // console.log(data)
        if (data >= 0){
            return "text-green-500";
        }
        else{
            return "text-red-500";
        }
    }

    // console.log(data.tg_yield, data.curr_yield)
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

    let addCycleTime = (<div className="grid grid-cols-2 border-b border-b-bordergray text-xl">
        <h1 className="border-r border-r-bordergray py-1">Actual C/T</h1>
        <h1 className="py-1">{formatCT(data.act_ct)}<span className={`${textCtColor(data.diff_ct)}`}>({formatDiff(formatCT(data.diff_ct))}s)</span></h1>
    </div>)
    
    // check additional data
    if (data.drop){
        additionalData = 
            (<div className="grid grid-cols-2 border-b border-b-bordergray text-xl ">
            <h1 className="border-r border-r-bordergray py-1">Drop part</h1>
            <h1 className="py-1">{data.drop}</h1>
            </div>)
        cardHeight = "h-84"
    }
    else if (data.tg_yield){
        additionalData = 
            (<div className="grid grid-cols-2 border-b border-b-bordergray text-xl ">
                <h1 className="border-r border-r-bordergray py-1">Yield</h1>
                <div className={`p-1 text-center text-sm flex flex-col justify-center`}>
                    <div className="relative w-full h-5 bg-gray-200 rounded-full overflow-hidden">
                        <div className={`absolute left-0 top-0 h-full  ${colorGauge(data.tg_yield, data.curr_yield)} rounded-full`} style={{ width: `${data.curr_yield}%` }}></div>
                        <div className="absolute inset-0 flex items-center justify-center text-sm font-bold text-gray-700">{(data.curr_yield)}%</div>
                    </div>
                </div>
            </div>)
        cardHeight = "h-84"
    }
    else if (data.act_ct_2){
        addCycleTime = (
            <div className="grid grid-cols-2 border-b border-b-bordergray">
                <h1 className="col-span-3 border-b border-b-bordergray">Actual C/T</h1>
                <div className="border-r border-r-bordergray">
                    <h1 className="mt-1 text-lg">H-1</h1>
                    <h1 className="text-2xl mb-1">{formatCT(data.act_ct)}<span className={`${textCtColor(data.diff_ct)}`}>({formatDiff(formatCT(data.diff_ct))}s)</span></h1>
                </div>
                <div className="border-r border-r-bordergray">
                    <h1 className="mt-1 text-lg">H-2</h1>
                    <h1 className="text-2xl mb-1">{formatCT(data.act_ct_2)}<span className={`${textCtColor(data.diff_ct_2)}`}>({formatDiff(formatCT(data.diff_ct_2))}s)</span></h1>
                </div>
            </div>);
        cardHeight = "h-89"
    }


    return (
    <div className={`w-67 ${cardHeight} ml-10 bg-bggray border border-bordergray rounded-2xl flex flex-col`}>
        <h1 className={`w-full h-12 pt-1 ${colorStatus(data.status_alarm)} rounded-t-2xl text-4xl font-medium text-center`}>
            {data.mc_no}
        </h1>
        <h1 className="text-xl text-center border border-b-bordergray pt-2 pb-2">{data.part_no}</h1>
        <div className="grid grid-cols-3 text-center border-b border-b-bordergray">
            <h1 className="col-span-3 border-b border-b-bordergray">Production</h1>
            <div className="border-r border-r-bordergray">
                <h1 className="mt-1.5">Target</h1>
                <h1 className="text-2xl mb-1.5">{formatNumber(data.tg_pd)}</h1>
            </div>
            <div className="border-r border-r-bordergray">
                <h1 className="mt-1.5">Actual</h1>
                <h1 className="text-2xl mb-1.5">{formatNumber(data.act_pd)}</h1>
            </div>
            <div>
                <h1 className="mt-1.5">Diff</h1>
                <h1 className={`text-2xl mb-1.5 ${textProdColor(data.diff_pd)}`}>{formatNumber(data.diff_pd)}</h1>
            </div>
        </div>
        <div className="text-center">
            {addCycleTime}
            {additionalData}
            <div className="grid grid-cols-2 border-b border-b-bordergray text-xl ">
                <h1 className="border-r border-r-bordergray py-1">Utilization</h1>
                <div className={`p-1 text-center text-sm flex flex-col justify-center`}>
                    <div className="relative w-full h-5 bg-gray-200 rounded-full overflow-hidden">
                        <div className={`absolute left-0 top-0 h-full ${colorGauge(data.tg_utl, data.curr_utl)} rounded-full`} style={{ width: `${data.curr_utl}%` }}></div>
                        <div className="absolute inset-0 flex items-center justify-center text-sm font-bold text-gray-700">{formatCT(data.curr_utl)}%</div>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-2 text-xl ">
                <h1 className="border-r border-r-bordergray py-1">Status</h1>
                <h1 className={`py-1 ${colorStatus(data.status_alarm)} rounded-br-2xl`}>{data.status_alarm}</h1>
            </div>
        </div>
    </div>
  )
}

import React from 'react'
import { useLocation, useNavigate } from 'react-router';

export default function DoubleDataCard({data}) {
    const navigate = useNavigate();
    const location = useLocation();
    const columnStyle = "grid grid-cols-[110px_1fr_1fr] border-b";
    const formatNumber = (num) => num?.toLocaleString();
    const formatCT = (num) => (num !== undefined && num !== null ? Number(num).toFixed(2) : 0);
    const formatDiff = (value) => (value > 0 ? `+${value.toLocaleString()}` : value.toLocaleString());  
    let firstProcess = "Grease";
    let secondProcess = "Shield";
    let cycleTimeItem = "";
    let yieldItem = "";
    let utlItem = "";
    let statusItem = "";
    let statusRounded = "rounded-br-2xl";
    let setCTColSpan = "col-span-2";
    let setColSpan = "col-span-2";
    // console.log(data)

    // check diff production and set text color
    const textDiffProdColor = (diffProdData) => {
        if (diffProdData < 0){
            return "text-red-500";
        }
        else{
            return "text-green-500";
        }
    }

    // check cycle time and set text color
    const textCtColor = (CtData) => {
        if (CtData >= 0){
            return "text-red-500";
        }
        else{
            return "text-green-500";
        }
    }

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

    
    // ANT
     if(data.f_curr_yield){
        firstProcess = "Front";
        secondProcess = "Rear";
        cycleTimeItem = (
            <h1 className="text-xl border-l py-1">{formatCT(data.f_act_ct)}<span className={`${textCtColor(data.f_diff_ct)}`}>({formatDiff(formatCT(data.f_diff_ct))}s)</span></h1>)
        yieldItem = (
            <div className={`border-l p-1 text-center text-sm flex flex-col justify-center`}>
                <div className="relative w-full h-5 bg-gray-200 rounded-full overflow-hidden">
                    <div className={`absolute left-0 top-0 h-full ${colorGauge(data.f_target_yield, data.f_curr_yield)} rounded-full`} style={{ width: `${data.f_curr_yield}%` }}></div>
                    <div className="absolute inset-0 flex items-center justify-center text-sm font-bold text-gray-700">{(data.f_curr_yield)}%</div>
                </div>
            </div>)
        utlItem = (
            <div className={`border-l p-1 text-center text-sm flex flex-col justify-center`}>
                <div className="relative w-full h-5 bg-gray-200 rounded-full overflow-hidden">
                    <div className={`absolute left-0 top-0 h-full ${colorGauge(data.f_target_utl, data.f_curr_utl)} rounded-full`} style={{ width: `${data.f_curr_utl}%` }}></div>
                    <div className="absolute inset-0 flex items-center justify-center text-sm font-bold text-gray-700">{(data.f_curr_utl)}%</div>
                </div>
            </div>)
        statusItem = (<h1 className={`border-l py-1 ${colorStatus(data.f_status_alarm)} `}>{data.f_status_alarm}</h1>)
        setColSpan = "";
        setCTColSpan = "";
        statusRounded = "";
    }
     // MBR
    else if(data.f_act_ct ){
        firstProcess = "Gauge";
        secondProcess = "Ball";
        cycleTimeItem = (
            <h1 className="text-xl border-l py-1">{formatCT(data.s_act_ct)}<span className={`${textCtColor(data.s_diff_ct)}`}>({formatDiff(formatCT(data.s_diff_ct))})s</span></h1>)
        setColSpan = "col-span-2";
        setCTColSpan = "";
    }

    const onClick = (() => {
        // console.log(location.pathname)
        navigate(`${location.pathname}/analysis-mc?mc_no=${data.mc_no}`)
    })

    return (
    <div className={`w-90 h-fit ml-10 bg-bggray border rounded-2xl flex flex-col
                    transition-transform duration-500 ease-in-out transform hover:scale-105 
                    hover:shadow-[0_10px_25px_rgba(0,0,0,0.1)] hover:border-gray-300 cursor-pointer`}
        onClick={onClick}>
        <h1 className={`w-full h-12 pt-1 ${colorStatus(data.s_status_alarm)} rounded-t-2xl text-4xl font-medium text-center`}>
            {data.mc_no}
        </h1>
        <h1 className="text-xl text-center border-b pt-2 pb-2">{data.part_no}</h1>
        <div className="text-center">
            <div className={columnStyle}>
                <h1 className="text-xl border-l col-start-2 pt-0.5">{firstProcess}</h1>
                <h1 className="text-xl border-l pt-0.5">{secondProcess}</h1>
            </div>
            <div className={columnStyle}>
                <h1 className="pt-2">Target Prod.</h1>
                <h1 className="text-2xl py-1 border-l">{formatNumber(data.f_target_pd)}</h1>
                <h1 className="text-2xl py-1 border-l">{formatNumber(data.s_target_pd)}</h1>
            </div>
            <div className={columnStyle}>
                <h1 className="pt-2">Actual Prod.</h1>
                <h1 className="text-2xl py-1 border-l">{formatNumber(data.f_act_pd)}</h1>
                <h1 className="text-2xl py-1 border-l">{formatNumber(data.s_act_pd)}</h1>
            </div>
            <div className={columnStyle}>
                <h1 className="pt-1">Diff</h1>
                <h1 className={`text-2xl py-0.5 border-l ${textDiffProdColor(data.f_diff_pd)}`}>{formatNumber(data.f_diff_pd)}</h1>
                <h1 className={`text-2xl py-0.5 border-l ${textDiffProdColor(data.s_diff_pd)}`}>{formatNumber(data.s_diff_pd)}</h1>
            </div>
            <div className={columnStyle}>
                <h1 className="py-1">Actual C/T</h1>
                {cycleTimeItem}
                <h1 className={`text-xl border-l py-1 ${setCTColSpan}`}>{formatCT(data.s_act_ct)}<span className={`${textCtColor(data.s_diff_ct)}`}>({formatDiff(formatCT(data.s_diff_ct))}s)</span></h1>
            </div>
            <div className={columnStyle}>
                <h1 className="py-1">Yield</h1>
                {yieldItem}
                <div className={`border-l p-1 text-center text-sm flex flex-col justify-center ${setColSpan}`}>
                    <div className="relative w-full h-5 bg-gray-200 rounded-full overflow-hidden">
                        <div className={`absolute left-0 top-0 h-full ${colorGauge(data.s_target_yield, data.s_curr_yield)} rounded-full`} style={{ width: `${data.s_curr_yield}%` }}></div>
                        <div className="absolute inset-0 flex items-center justify-center text-sm font-bold text-gray-700">{(data.s_curr_yield)}%</div>
                    </div>
                </div>
            </div>
            <div className={columnStyle}>
                <h1 className="py-1">Utilization</h1>
                {utlItem}
                <div className={`border-l p-1 text-center text-sm flex flex-col justify-center ${setColSpan}`}>
                    <div className="relative w-full h-5 bg-gray-200 rounded-full overflow-hidden">
                        <div className={`absolute left-0 top-0 h-full ${colorGauge(data.s_target_utl, data.s_curr_utl)} rounded-full`} style={{ width: `${data.s_curr_utl}%` }}></div>
                        <div className="absolute inset-0 flex items-center justify-center text-sm font-bold text-gray-700">{(data.s_curr_utl)}%</div>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-[110px_1fr_1fr]">
                <h1 className="py-1">Status</h1>
                {statusItem}
                <h1 className={`border-l py-1 rounded-br-2xl ${colorStatus(data.s_status_alarm)} ${statusRounded} ${setColSpan}`}>{data.s_status_alarm}</h1>
            </div>
        </div>
    </div>
  )
}

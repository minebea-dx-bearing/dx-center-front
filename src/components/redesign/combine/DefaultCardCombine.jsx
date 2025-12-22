import React from 'react'

export default function DefaultCardCombine({data}) {
  // check diff production and set text color
  const textProdColor = (data) => {
    console.log(data)
    if (data.startsWith("-")){
        return "text-red-500";
    }
    else{
        return "text-green-500";
    }
}

// check cycle time and set text color
const textCtColor = (data) => {
    // console.log(data)
    if (data.startsWith("-")){
        return "text-green-500";
    }
    else{
        return "text-red-500";
    }
}

const formatCT = (num) => (num !== undefined && num !== null ? Number(num).toFixed(2) : 0);

// check m/c status and set color
const colorStatus = (status) => {
    switch (status) {
      case "RUNNING":
        return "bg-run";
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
// console.log(data.part_no)

    return (
    <div className={`w-65 h-97 ml-10 bg-bggray border border-bordergray rounded-2xl flex flex-col`}>
        <h1 className="w-full h-12 pt-1 bg-run rounded-t-2xl text-4xl font-medium text-center">
            {data.mc_no}
        </h1>
        <h1 className="text-xl text-center border-b border-b-bordergray pt-2 pb-2">{data.part_no}</h1>
        <div className="grid grid-cols-2 text-center border-b border-b-bordergray">
            <h1 className="col-span-2 border-b border-b-bordergray">Production</h1>
            <div className="border-r border-r-bordergray h-[80px]">
                <h1 className="mt-1.5">Actual</h1>
                <h1 className="text-2xl mb-1.5">{data.act_pd}</h1>
            </div>
            <div>
                <h1 className="mt-1.5">Diff</h1>
                <h1 className={`text-2xl mb-1.5 ${textProdColor(data.diff_pd)}`}>{data.diff_pd}</h1>
            </div>
        </div>
        <div className="text-xl text-center">
            <div className="grid grid-cols-2 border-b border-b-bordergray h-[80px]">
                <h1 className="flex justify-center items-center border-r border-r-bordergray py-1">Actual C/T</h1>
                <h1 className="py-1 text-2xl">{data.act_ct}<br/><span className={`${textCtColor(data.diff_ct)}`}> ({data.diff_ct})</span></h1>
            </div>
            <div className="grid grid-cols-2 border-b border-b-bordergray">
                <h1 className="py-1">Yield</h1>
                <div className={`border-l p-1 text-center text-sm flex flex-col justify-center`}>
                    <div className="relative w-full h-5 bg-gray-200 rounded-full overflow-hidden">
                        <div className={`absolute left-0 top-0 h-full bg-green-400 rounded-full`} style={{ width: `${data.yield}%` }}></div>
                        <div className="absolute inset-0 flex items-center justify-center text-sm font-bold text-gray-700">{(data.yield)}%</div>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-2 border-b border-b-bordergray">
                <h1 className="border-r border-r-bordergray py-1">Utilization</h1>
                <div className={`p-1 text-center text-sm flex flex-col justify-center`}>
                    <div className="relative w-full h-5 bg-gray-200 rounded-full overflow-hidden">
                        <div className={`absolute left-0 top-0 h-full bg-green-400 rounded-full`} style={{ width: `${data.utl}%` }}></div>
                        <div className="absolute inset-0 flex items-center justify-center text-sm font-bold text-gray-700">{(data.utl)}%</div>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-2">
                <h1 className="border-r border-r-bordergray py-1">Status</h1>
                <h1 className={`py-1 ${colorStatus(data.status)} rounded-br-2xl`}>{data.status}</h1>
            </div>
        </div>
    </div>
    )
}

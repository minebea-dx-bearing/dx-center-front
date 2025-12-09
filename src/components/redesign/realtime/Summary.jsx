import React from 'react'

export default function Summary({process, tg_pd, act_pd, diff, avg_ct, utl}) {
    const formatNumber = (num) => num?.toLocaleString();
    const formatCT = (num) => (num !== undefined && num !== null ? Number(num).toFixed(2) : 0);
    let textColor = ""
    if (diff < 0){
        textColor = "text-red-500";
    }
    else{
        textColor = "text-green-500";
    }
  return (
    <div className="flex justify-center mt-3">
        <div className="w-150 h-33 bg-bggray border border-bordergray rounded-2xl text-center">
            <h1 className="text-3xl mb-3 mt-2">{process}</h1>
            <div className="flex items-center justify-between ml-7 mr-7">
                <div>
                    <h1 className="text-lg">Target Prod.</h1>
                    <p className="text-2xl">{formatNumber(tg_pd)}</p>
                </div>
                <div>
                    <h1 className="text-lg">Actual Prod.</h1>
                    <p className="text-2xl">{formatNumber(act_pd)}</p>
                </div>
                <div>
                    <h1 className="text-lg">Diff</h1>
                    <p className= {`text-2xl ${textColor}`}>{formatNumber(diff)}</p>
                </div>
                <div>
                    <h1 className="text-lg">Avg. C/T</h1>
                    <p className="text-2xl">{formatCT(avg_ct)}s</p>
                </div>
                <div>
                    <h1 className="text-lg">Avg. Utl.</h1>
                    <p className="text-2xl">{formatCT(utl)}%</p>
                </div>
            </div>
        </div>
    </div>
  )
}

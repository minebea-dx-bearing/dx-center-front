import React from 'react'
import CardButton from '../../components/redesign/CardButton'
import BreadCrumbs from '../../components/redesign/BreadCrumbs'

export default function McbHomeNew() {
  return (
    <div>
        <BreadCrumbs/>
        <div className="flex flex-col justify-center mt-5">
            {/* Assy */}
            <h1 className="text-center text-xl font-medium mb-3">Assembly</h1>
            <div className="flex justify-center">
                <div className='grid mt-5 w-[85%] gap-x-10 lg:grid-cols-7 md:grid-cols-4'>
                    <div className="col-span-2 grid grid-cols-2 gap-x-5">
                        <div className="col-span-2">
                            <CardButton title="MBR Combine" sub_title="Matching Ball Retainer" color="bg-lightblue" path="/mcb_new/mbr-combine-realtime_new"/>
                        </div>
                        <div>
                            <CardButton title="Auto Gauge" color="bg-bluegray" path="/mcb_new/auto-gauge-realtime_new"/>
                            <CardButton title="Auto Ball Assembly" color="bg-bluegray" path="/mcb_new/auto-ball-assembly-realtime_new"/>
                            <CardButton title="Auto Visual I" color="bg-bluegray" path="/mcb_new/auto-visual-I-realtime_new"/>
                        </div>
                        <div>
                            <CardButton title="Auto Retainer" color="bg-bluegray" path="/mcb_new/auto-retainer-realtime_new"/>
                            <CardButton title="AAP" sub_title={"Auto Axial Play"} color="bg-bluegray" path="/mcb_new/aap-realtime_new"/>
                        </div>
                    </div>
                    <div>
                        <CardButton title="GSSM Combine" sub_title="Grease Shield Snap" color="bg-lightblue" path="/mcb_new/gssm-combine-realtime_new"/>
                        <CardButton title="Auto Rotation" color="bg-bluegray" path="/mcb_new/auto-rotation-realtime_new"/>
                        <CardButton title="Auto Grease" color="bg-bluegray" path="/mcb_new/auto-grease-realtime_new"/>
                    </div>
                    <div>
                        <CardButton title="Mini Auto Anderon" color="bg-bluegray" path="/mcb_new/mini-auto-anderon-realtime_new"/>
                        <CardButton title="Auto Noise" color="bg-bluegray" path="/mcb_new/auto-noise-realtime_new"/>
                    </div>
                    <div>
                        <CardButton title="AOD" sub_title="Auto OD" color="bg-bluegray" path="/mcb_new/aod-realtime_new"/>
                    </div>
                    <div>
                        <CardButton title="AVS II" sub_title="Auto Visual" color="bg-bluegray" path="/mcb_new/avs-II-realtime_new"/>
                    </div>
                    <div>
                        <CardButton title="ALU" sub_title="Auto Line Up" color="bg-bluegray" path="/mcb_new/alu-realtime_new"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

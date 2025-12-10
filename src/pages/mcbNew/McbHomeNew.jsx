import React from 'react'
import DefaultHeader from '../../components/layouts/DefaultHeader'
import CardButton from '../../components/redesign/CardButton'
import BreadCrumbs from '../../components/redesign/BreadCrumbs'

export default function McbHomeNew() {
  return (
    <div>
        <DefaultHeader plant="mcb"/>
        <BreadCrumbs/>
        <div className="flex flex-col justify-center mt-5 mx-10">
            {/* Assy */}
            <h1 className="text-center text-xl font-medium mb-3">Assembly</h1>
            <div className="flex justify-center gap-10">
                <div className="w-105 grid grid-cols-2 gap-x-5">
                    <div className="col-span-2">
                        <CardButton title="MBR Combine" sub_title="Matching Ball Retainer" color="bg-lightblue" path="/mcb_new/assy-combine-realtime_new"/>
                    </div>
                    <div>
                        <CardButton title="Auto Gauge" color="bg-bluegray" path="/mcb_new/ir-bore-realtime_new"/>
                        <CardButton title="Auto Ball Assembly" color="bg-bluegray" path="/mcb_new/ir-rw-realtime_new"/>
                        <CardButton title="Auto Visual I" color="bg-bluegray" path="/mcb_new/ir-sf-realtime_new"/>
                    </div>
                    <div>
                        <CardButton title="Auto Retainer" color="bg-bluegray" path="/mcb_new/or-rw-realtime_new"/>
                        <CardButton title="AAP" sub_title={"Auto Axial Play"} color="bg-bluegray" path="/mcb_new/or-sf-realtime_new"/>
                    </div>
                </div>
                <div className="w-50">
                    <CardButton title="GSSM Combine" sub_title="Grease Shield Snap" color="bg-lightblue" path="/mcb_new/sl-realtime_new"/>
                    <CardButton title="Auto Rotation" color="bg-bluegray" path="/mcb_new/od-realtime_new"/>
                    <CardButton title="Auto Grease" color="bg-bluegray" path="/mcb_new/od-realtime_new"/>
                </div>
                <div className="w-50">
                    <CardButton title="Mini Auto Anderon" color="bg-bluegray" path="/mcb_new/od-realtime_new"/>
                    <CardButton title="Auto Noise" color="bg-bluegray" path="/mcb_new/od-realtime_new"/>
                </div>
                <div className="w-50">
                    <CardButton title="AOD" sub_title="Auto OD" color="bg-bluegray" path="/mcb_new/od-realtime_new"/>
                </div>
                <div className="w-50">
                    <CardButton title="AVS II" sub_title="Auto Visual" color="bg-bluegray" path="/mcb_new/od-realtime_new"/>
                </div>
                <div className="w-50">
                    <CardButton title="ALU" sub_title="Auto Line Up" color="bg-bluegray" path="/mcb_new/od-realtime_new"/>
                </div>
            </div>
        </div>
    </div>
  )
}

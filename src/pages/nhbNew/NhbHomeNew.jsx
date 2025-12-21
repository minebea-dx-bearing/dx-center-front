import React from 'react'
import CardButton from '../../components/redesign/CardButton'
import BreadCrumbs from '../../components/redesign/BreadCrumbs'

export default function NhbHomeNew() {
  return (
    <div>
        <BreadCrumbs/>
        <div className="flex justify-center">
            <div className='grid mt-5 w-[85%] gap-x-10 lg:grid-cols-7 md:grid-cols-4'>
                {/* TN */}
                <div>
                    <h1 className="text-center text-xl font-medium mb-3">Turning</h1>
                    <CardButton title="Turning" color="bg-bluegray" path="/nhb_new/tn-realtime_new"/>
                </div>

                {/* 1st GD */}
                <div>
                    <h1 className="text-center text-xl font-medium mb-3">1st Grinding</h1>
                    <CardButton disabled title="Sidelap" color="bg-bluegray" path="/nhb_new/sl-realtime_new"/>
                    <CardButton disabled title="OD" color="bg-bluegray" path="/nhb_new/od-realtime_new"/>
                </div>

                {/* 2nd GD */}
                <div className="col-span-2">
                    <h1 className="text-center text-xl font-medium mb-3">2nd Grinding</h1>
                    <div className="grid grid-cols-2 gap-5">
                        <div>
                            <CardButton disabled title="I/R Combine" color="bg-lightblue" path="/nhb_new/ir-combine-realtime_new"/>
                            <CardButton disabled title="I/R Bore" color="bg-bluegray" path="/nhb_new/ir-bore-realtime_new"/>
                            <CardButton disabled title="I/R Raceway" color="bg-bluegray" path="/nhb_new/ir-rw-realtime_new"/>
                            <CardButton disabled title="I/R S/F" color="bg-bluegray" path="/nhb_new/ir-sf-realtime_new"/>
                        </div>
                        <div>
                            <CardButton disabled title="O/R Combine" color="bg-lightblue" path="/nhb_new/or-combine-realtime_new"/>
                            <CardButton disabled title="O/R Raceway" color="bg-darkbluegray" path="/nhb_new/or-rw-realtime_new"/>
                            <CardButton disabled title="O/R S/F" color="bg-darkbluegray" path="/nhb_new/or-sf-realtime_new"/>
                        </div>
                    </div>
                </div>

                {/* Assy */}
                <div className="col-span-3">
                    <h1 className="text-center text-xl font-medium mb-3">Assembly</h1>
                    <div className="grid grid-cols-3 gap-x-5">
                        <div className="col-span-3">
                            <CardButton disabled title="Combine" color="bg-lightblue" path="/nhb_new/assy-combine-realtime_new"/>
                        </div>
                        <div>
                            <CardButton disabled title="MBR" sub_title="Matching Ball Retainer" color="bg-bluegray" path="/nhb_new/assy-mbr-realtime_new"/>
                            <CardButton disabled title="ARP" sub_title="Auto Radial Play" color="bg-bluegray" path="/nhb_new/assy-arp-realtime_new"/>
                        </div>
                        <div>
                            <CardButton disabled title="GSSM" sub_title="Grease Shield Snap" color="bg-darkbluegray" path="/nhb_new/assy-gssm-realtime_new"/>
                            <CardButton disabled title="FIM" sub_title="Final Inspection" color="bg-darkbluegray" path="/nhb_new/assy-fim-realtime_new"/>
                            <CardButton disabled title="ANT" sub_title="Auto Noise" color="bg-darkbluegray" path="/nhb_new/assy-ant-realtime_new"/>
                        </div>
                        <div>
                            <CardButton disabled title="AOD" sub_title="Auto OD" color="bg-darkbluegray" path="/nhb_new/assy-aod-realtime_new"/>
                            <CardButton disabled title="AVS" sub_title="Auto Visual" color="bg-darkbluegray" path="/nhb_new/assy-avs-realtime_new"/>
                            <CardButton disabled title="ALU" sub_title="Auto Line Up" color="bg-darkbluegray" path="/nhb_new/assy-alu-realtime_new"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

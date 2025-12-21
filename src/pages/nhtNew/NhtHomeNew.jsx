import React from 'react'
import CardButton from '../../components/redesign/CardButton'
import BreadCrumbs from '../../components/redesign/BreadCrumbs'

export default function NhtHomeNew() {
  return (
    <div>
        <BreadCrumbs/>
        <div className="flex justify-center">
            <div className='grid mt-5 w-[85%] gap-x-10 lg:grid-cols-7 md:grid-cols-4'>
                {/* TN */}
                <div>
                    <h1 className="text-center text-xl font-medium mb-3">Turning</h1>
                    <CardButton title="Turning" color="bg-bluegray" path="/nht_new/tn-realtime_new"/>
                    <CardButton title="Cold Forming" color="bg-bluegray" path="/nht_new/cf-realtime_new"/>
                    <CardButton title="Chucker" color="bg-bluegray" path="/nht_new/chucker-realtime_new"/>
                </div>

                {/* 1st GD */}
                <div>
                    <h1 className="text-center text-xl font-medium mb-3">1st Grinding</h1>
                    <CardButton title="Sidelap" color="bg-bluegray" path="/nht_new/sl-realtime_new"/>
                    <CardButton title="OD" color="bg-bluegray" path="/nht_new/od-realtime_new"/>
                </div>

                {/* 2nd GD */}
                <div className="col-span-2">
                    <h1 className="text-center text-xl font-medium mb-3">2nd Grinding</h1>
                    <div className="grid grid-cols-2 gap-5">
                        <div>
                            <CardButton title="I/R Combine" color="bg-lightblue" path="/nht_new/ir-combine-realtime_new"/>
                            <CardButton title="I/R Bore" color="bg-bluegray" path="/nht_new/ir-bore-realtime_new"/>
                            <CardButton title="I/R Raceway" color="bg-bluegray" path="/nht_new/ir-rw-realtime_new"/>
                            <CardButton title="I/R S/F" color="bg-bluegray" path="/nht_new/ir-sf-realtime_new"/>
                        </div>
                        <div>
                            <CardButton title="O/R Combine" color="bg-lightblue" path="/nht_new/or-combine-realtime_new"/>
                            <CardButton title="O/R Raceway" color="bg-darkbluegray" path="/nht_new/or-rw-realtime_new"/>
                            <CardButton title="O/R S/F" color="bg-darkbluegray" path="/nht_new/or-sf-realtime_new"/>
                        </div>
                    </div>
                </div>

                {/* Assy */}
                <div className="col-span-3">
                    <h1 className="text-center text-xl font-medium mb-3">Assembly</h1>
                    <div className="grid grid-cols-3 gap-x-5">
                        <div className="col-span-3">
                            <CardButton title="Combine" color="bg-lightblue" path="/nht_new/assy-combine-realtime_new"/>
                        </div>
                        <div>
                            <CardButton title="MBR" sub_title="Matching Ball Retainer" color="bg-bluegray" path="/nht_new/assy-mbr-realtime_new"/>
                            <CardButton disabled title="ARP" sub_title="Auto Radial Play" color="bg-bluegray" path="/nht_new/assy-arp-realtime_new"/>
                        </div>
                        <div>
                            <CardButton title="GSSM" sub_title="Grease Shield Snap" color="bg-darkbluegray" path="/nht_new/assy-gssm-realtime_new"/>
                            <CardButton title="FIM" sub_title="Final Inspection" color="bg-darkbluegray" path="/nht_new/assy-fim-realtime_new"/>
                            <CardButton title="AN" sub_title="Auto Noise" color="bg-darkbluegray" path="/nht_new/assy-an-realtime_new"/>
                        </div>
                        <div>
                            <CardButton title="AOD" sub_title="Auto OD" color="bg-darkbluegray" path="/nht_new/assy-aod-realtime_new"/>
                            <CardButton title="AVS" sub_title="Auto Visual" color="bg-darkbluegray" path="/nht_new/assy-avs-realtime_new"/>
                            <CardButton title="ALU" sub_title="Auto Line Up" color="bg-darkbluegray" path="/nht_new/assy-alu-realtime_new"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

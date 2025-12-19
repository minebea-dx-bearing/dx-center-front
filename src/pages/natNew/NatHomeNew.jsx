import React from 'react'
import CardButton from '../../components/redesign/CardButton'
import BreadCrumbs from '../../components/redesign/BreadCrumbs'
import NatSidebar from './NatSidebar'


export default function NatHomeNew() {
  // console.log(window.innerWidth, window.innerHeight)
  // const screenWidth = window.innerWidth;
  // const screenHeight = window.innerHeight;
  return (
    <div className='w-full'>
      <BreadCrumbs/>
      <div className="flex justify-center gap-10 mt-5">
        {/* TN */}
        <div className="w-50">
          <h1 className="text-center text-xl font-medium mb-3">Turning</h1>
          <CardButton title="Turning" color="bg-bluegray" path="/nat_new/tn-realtime_new"/>
        </div>

        {/* 1st GD */}
        <div className="w-50">
          <h1 className="text-center text-xl font-medium mb-3">1st Grinding</h1>
          <CardButton disabled title="Sidelap" color="bg-bluegray" path="/nat_new/sl-realtime_new"/>
          <CardButton disabled title="OD" color="bg-bluegray" path="/nat_new/od-realtime_new"/>
        </div>

        {/* 2nd GD */}
        <div className="w-105">
          <h1 className="text-center text-xl font-medium mb-3">2nd Grinding</h1>
          <div className="grid grid-cols-2 gap-5">
            <div>
              <CardButton disabled title="I/R Combine" color="bg-lightblue" path="/nat_new/ir-combine-realtime_new"/>
              <CardButton title="I/R Bore" color="bg-bluegray" path="/nat_new/ir-bore-realtime_new"/>
              <CardButton title="I/R Raceway" color="bg-bluegray" path="/nat_new/ir-rw-realtime_new"/>
              <CardButton title="I/R S/F" color="bg-bluegray" path="/nat_new/ir-sf-realtime_new"/>
            </div>
            <div>
              <CardButton disabled title="O/R Combine" color="bg-lightblue" path="/nat_new/or-combine-realtime_new"/>
              <CardButton title="O/R Raceway" color="bg-darkbluegray" path="/nat_new/or-rw-realtime_new"/>
              <CardButton title="O/R S/F" color="bg-darkbluegray" path="/nat_new/or-sf-realtime_new"/>
            </div>
          </div>
        </div>

        {/* Assy */}
        <div className="w-155">
          <h1 className="text-center text-xl font-medium mb-3">Assembly</h1>
          <div className="grid grid-cols-3 gap-x-5">
            <div className="col-span-3">
              <CardButton title="Combine" color="bg-lightblue" path="/nat_new/assy-combine-realtime_new"/>
            </div>
            <div>
              <CardButton title="MBR" sub_title="Matching Ball Retainer" color="bg-bluegray" path="/nat_new/assy-mbr-realtime_new"/>
              <CardButton title="ARP" sub_title="Auto Radial Play" color="bg-bluegray" path="/nat_new/assy-arp-realtime_new"/>
            </div>
            <div>
              <CardButton title="GSSM" sub_title="Grease Shield Snap" color="bg-darkbluegray" path="/nat_new/assy-gssm-realtime_new"/>
              <CardButton title="FIM" sub_title="Final Inspection" color="bg-darkbluegray" path="/nat_new/assy-fim-realtime_new"/>
              <CardButton title="ANT" sub_title="Auto Noise" color="bg-darkbluegray" path="/nat_new/assy-ant-realtime_new"/>
            </div>
            <div>
              <CardButton disabled title="AOD" sub_title="Auto OD" color="bg-darkbluegray" path="/nat_new/assy-aod-realtime_new"/>
              <CardButton title="AVS" sub_title="Auto Visual" color="bg-darkbluegray" path="/nat_new/assy-avs-realtime_new"/>
              <CardButton title="ALU" sub_title="Auto Line Up" color="bg-darkbluegray" path="/nat_new/assy-alu-realtime_new"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

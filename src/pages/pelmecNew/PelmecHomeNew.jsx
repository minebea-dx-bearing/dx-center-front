import React from 'react'
import CardButton from '../../components/redesign/CardButton'
import BreadCrumbs from '../../components/redesign/BreadCrumbs'
import ModalCard from '../../components/redesign/ModalCard'

export default function PelmecHomeNew() {
    const mbrProcessName = [
        {title: "MA", sub_title: "Matching"},
        {title: "BS", sub_title: "Ball Separator"},
        {title: "RC", sub_title: "Retainer Caulking"},
    ]
  return (
    <div>
        <BreadCrumbs/>
        <div className="flex justify-center gap-10 mt-5">
        {/* TN */}
        <div className="w-50">
            <h1 className="text-center text-xl font-medium mb-3">Turning</h1>
            <CardButton title="Turning" color="bg-bluegray" path="/pelmec_new/tn-realtime_new"/>
            <CardButton title="Cold Forming" color="bg-bluegray" path="/pelmec_new/cf-realtime_new"/>
            <CardButton title="Chucker" color="bg-bluegray" path="/pelmec_new/chucker-realtime_new"/>
        </div>

        {/* 1st GD */}
        <div className="w-50">
            <h1 className="text-center text-xl font-medium mb-3">1st Grinding</h1>
            <CardButton title="Sidelap" color="bg-bluegray" path="/pelmec_new/sl-realtime_new"/>
            <CardButton title="OD" color="bg-bluegray" path="/pelmec_new/od-realtime_new"/>
        </div>

        {/* 2nd GD */}
        <div className="w-105">
            <h1 className="text-center text-xl font-medium mb-3">2nd Grinding</h1>
            <div className="grid grid-cols-2 gap-5">
                <div>
                    <CardButton title="I/R Combine" color="bg-lightblue" path="/pelmec_new/ir-combine-realtime_new"/>
                    <CardButton title="I/R Bore" color="bg-bluegray" path="/pelmec_new/ir-bore-realtime_new"/>
                    <CardButton title="I/R Raceway" color="bg-bluegray" path="/pelmec_new/ir-rw-realtime_new"/>
                    <CardButton title="I/R S/F" color="bg-bluegray" path="/pelmec_new/ir-sf-realtime_new"/>
                </div>
                <div>
                    <CardButton title="O/R Combine" color="bg-lightblue" path="/pelmec_new/or-combine-realtime_new"/>
                    <CardButton title="O/R Raceway" color="bg-darkbluegray" path="/pelmec_new/or-rw-realtime_new"/>
                    <CardButton title="O/R S/F" color="bg-darkbluegray" path="/pelmec_new/or-sf-realtime_new"/>
                </div>
            </div>
        </div>

        {/* Assy */}
        <div className="w-155">
            <h1 className="text-center text-xl font-medium mb-3">Assembly</h1>
            <div className="grid grid-cols-3 gap-x-5">
                <div className="col-span-3">
                    <CardButton title="Combine" color="bg-lightblue" path="/pelmec_new/assy-combine-realtime_new"/>
                </div>
                <div>
                    <ModalCard plant="npelmec" title="MBR" sub_title="Matching Ball Retainer" color="bg-bluegray" component={mbrProcessName}/>
                    <CardButton title="ARP" sub_title="Auto Radial Play" color="bg-bluegray" path="/pelmec_new/assy-arp-realtime_new"/>
                </div>
                <div>
                    <CardButton title="GSSM" sub_title="Grease Shield Snap" color="bg-darkbluegray" path="/pelmec_new/assy-gssm-realtime_new"/>
                    <CardButton title="FIM" sub_title="Final Inspection" color="bg-darkbluegray" path="/pelmec_new/assy-fim-realtime_new"/>
                    <CardButton title="AN" sub_title="Auto Noise" color="bg-darkbluegray" path="/pelmec_new/assy-an-realtime_new"/>
                </div>
                <div>
                    <CardButton title="ATO" sub_title="Auto OD" color="bg-darkbluegray" path="/pelmec_new/assy-ato-realtime_new"/>
                    <CardButton title="ATV" sub_title="Auto Visual" color="bg-darkbluegray" path="/pelmec_new/assy-atv-realtime_new"/>
                    <CardButton title="PL & AL" sub_title={`Packing Line Up & Auto Line Up`} color="bg-darkbluegray" path="/pelmec_new/assy-pl-al-realtime_new"/>
                </div>
            </div>
        </div>
        </div>
    </div>
  )
}

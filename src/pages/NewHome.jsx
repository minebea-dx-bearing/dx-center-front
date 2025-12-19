import React from 'react'
import DefaultHeader from '../components/layouts/DefaultHeader'
import CardButton from '../components/redesign/CardButton'

export default function NewHome() {
  return (
    <div>
        <DefaultHeader plant={"dx"}/>
        <div className="ml-36 mr-36">
            <div className="mt-20">
                <h1 className="text-2xl font-medium">Factory</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 
                                gap-8 md:gap-15 mb-10 mt-5">
                    <CardButton title={"NAT"} color={"bg-lightblue"} path={"/nat_new"}/>
                    <CardButton title={"NHT"} color={"bg-lightblue"} path={"/nht_new"}/>
                    <CardButton title={"NMB-T"} color={"bg-lightblue"} path={"/nmb-t_new"}/>
                    <CardButton title={"PELMEC-T"} color={"bg-lightblue"} path={"/pelmec-t_new"}/>
                    <CardButton title={"NHB"} color={"bg-lightblue"} path={"/nhb_new"}/>
                    <CardButton title={"MCB"} color={"bg-lightblue"} path={"/mcb_new"}/>
                </div>
            </div>
            <div className="mt-20">
                <h1 className="text-2xl font-medium">Application center</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 
                                gap-8 md:gap-15 mb-10 mt-5">
                    <CardButton title={"Stock ball"} color={"bg-lightblue"} disabled/>
                    <CardButton title={"Stock retainer"} color={"bg-lightblue"} disabled/>
                    <CardButton title={"DX job request"} color={"bg-lightblue"} disabled/>
                </div>
            </div>
        </div>
    </div>
  )
}

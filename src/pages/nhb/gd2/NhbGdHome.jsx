import React from 'react'
import PageBreadcrumb from '../../../components/common/PageBreadcrumb'
import CardTitle from '../../../components/common/CardTitle'


export default function NhbGdHome() {
  return (
    <div className="min-h-screen justify-center grid gap-4 bg-gradient-to-br from-teal-200 via-white to-gray-200">
      <div className="text-center mt-8 px-4">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-800 drop-shadow-md">DX NHB TURNING</h1>
        <p className="text-lg md:text-xl mt-3 text-slate-500">Digital Transformation</p>
        <br />
        <PageBreadcrumb pageTitle="NHB : TURNING" />
      </div>
      <div>
        <div className="text-center">Section</div>
        <hr className="my-4" />
        <div className="flex flex-wrap justify-center gap-8">
          <CardTitle disabled title={"IN COMBINE"} path={"/nhb/gd/2ndincombine-realtime"} />
          <CardTitle title={"IN BORE"} path={"/nhb/gd/2ndinbore-realtime"} />
          <CardTitle disabled title={"IN RACE"} path={"/nhb/gd/2ndinrace-realtime"} />
          <CardTitle disabled title={"IN S/F"} path={"/nhb/gd/2ndinsuper-realtime"} />
          <CardTitle disabled title={"OUT COMBINE"} path={"/nhb/gd/2ndoutcombine-realtime"} />
          <CardTitle title={"OUT RACE"} path={"/nhb/gd/2ndoutrace-realtime"} />
          <CardTitle disabled title={"OUT S/F"} path={"/nhb/gd/2ndoutsuper-realtime"} />
        </div>
      </div>
    </div>
  )
}

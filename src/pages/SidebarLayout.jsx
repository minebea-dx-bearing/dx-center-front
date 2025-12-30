import { Outlet } from "react-router-dom";
import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import DefaultHeader from "../components/layouts/DefaultHeader";
import NatSidebar from "./natNew/NatSidebar";
import McbSidebar from "./mcbNew/McbSidebar";
import NhbSidebar from "./nhbNew/NhbSidebar";
import NhtSidebar from "./nhtNew/NhtSidebar";
import NmbSidebar from "./nmbNew/NmbSidebar";
import PelmecSidebar from "./pelmecNew/PelmecSidebar";
import { Menu } from "antd";
import SidebarWidget from "../components/layouts/SidebarWidget";

export default function NatLayoutNew({plant}) {
  const [open, setOpen] = useState(false);
  const sidebarWidth = 256;

  const callSidebar = (plant) => {
    switch (plant) {
    case "nat":
        return <NatSidebar />;
    case "nht":
        return <NhtSidebar />;
    case "nmb":
        return <NmbSidebar />;
    case "pelmec":
        return <PelmecSidebar />;
    case "nhb":
        return <NhbSidebar />;
    case "mcb":
        return <McbSidebar />;
    }
  };
  // console.log(callSidebar(plant).type)

  return (
    <div className={`flex min-h-screen ${open ? "-ml-[256px]" : "ml-[0px]"}`}>
      <div className={`bg-lightblue min-h-screen transition-all duration-300 ease-in-out ${open ? "ml-[256px]" : "ml-[0px]"}`}>
          {open ? 
            <div className="h-full flex flex-col">
                <a href='/home' className='flex items-center justify-center text-3xl my-5 font-semibold'>DX Bearing</a>
                <Menu
                mode="inline"
                items={callSidebar(plant).type}
                className="!border-none !bg-lightblue !text-lg !w-64" //set important to override antd style
                /> 
                <div className="mt-10">
                  <SidebarWidget/>
                </div>
            </div>
        : <></>}
      </div>

      <div className={`flex-1`}>
        <DefaultHeader plant={plant}/>
        <div className="absolute top-3 ml-10 transition delay-150 duration-300 ease-in-out hover:scale-110">
          <button onClick={() => setOpen(!open)} className="text-xl">
            {open ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
          </button>
        </div>
        <div className={`flex-1 mb-5`} >
          <Outlet />
        </div>
      </div>
    </div>
  );
}

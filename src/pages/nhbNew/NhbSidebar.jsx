import React from 'react';
import {  Menu } from 'antd';

const NhbSidebar = [
    { key: 'tn', label: <a href="/nhb_new/tn-realtime_new">Turning</a> },
    { key: 'gd', 
    label: 'Grinding',
    children: [
        {
        key: '1gd',
        label: '1st Grinding',
        children: [
        { key: 'sl', label: <a href="/nhb_new/sl-realtime_new">Sidelap</a> },
        { key: 'od', label: <a href="/nhb_new/od-realtime_new">OD</a> },
        ]},
        {
        key: '2gd-ir',
        label: '2nd Grinding - I/R',
        children: [
            { key: 'combine-ir', label: <a href="/nhb_new/ir-combine-realtime_new">Combine</a> },
            { key: 'bore-ir', label: <a href="/nhb_new/ir-bore-realtime_new">Bore</a> },
            { key: 'raceway-ir', label: <a href="/nhb_new/ir-rw-realtime_new">Raceway</a> },
            { key: 's/f-ir', label: <a href="/nhb_new/ir-sf-realtime_new">S/F</a> },
        ]},
        {
        key: '2gd-or',
        label: '2nd Grinding - O/R',
        children: [
            { key: 'combine-or', label: <a href="/nhb_new/or-combine-realtime_new">Combine</a> },
            { key: 'raceway-or', label: <a href="/nhb_new/or-rw-realtime_new">Raceway</a> },
            { key: 's/f-or', label: <a href="/nhb_new/or-sf-realtime_new">S/F</a> },
        ]},
    ]},
    { key: 'assy', 
    label: 'Assembly',
    children: [
        {
        key: 'combine-assy',
        label: <a href="/nhb_new/assy-combine-realtime_new">Combine</a>,
        },
        {
        key: '1st-line',
        label: '1st Line',
        children: [
            { key: 'mbr', label: <a href="/nhb_new/assy-mbr-realtime_new">MBR</a> },
            { key: 'arp', label: <a href="/nhb_new/assy-arp-realtime_new">ARP</a> },
        ]},
        {
        key: '2nd-line',
        label: '2nd Line',
        children: [
            { key: 'gssm', label: <a href="/nhb_new/assy-gssm-realtime_new">GSSM</a> },
            { key: 'fim', label: <a href="/nhb_new/assy-fim-realtime_new">FIM</a> },
            { key: 'ant', label: <a href="/nhb_new/assy-ant-realtime_new">ANT</a> },
            { key: 'aod', label: <a href="/nhb_new/assy-aod-realtime_new">AOD</a> },
            { key: 'avs', label: <a href="/nhb_new/assy-avs-realtime_new">AVS</a> },
            { key: 'alu', label: <a href="/nhb_new/assy-alu-realtime_new">ALU</a> },
        ]},
    ]},
];
// const NhbSidebar = ({collapsed}) => {
//   return (
//     <div>
//         {collapsed ? 
//             <div >
//                 <a href='/home' className='flex items-center justify-center text-3xl my-5 font-semibold'>DX Bearing</a>
//                 <Menu
//                 mode="inline"
//                 items={items}
//                 className="!border-none !bg-lightblue !text-lg !w-68" //set important to override antd style
//                 /> 
//             </div>
//         : <></>}
      
//     </div>
//   );
// };
export default NhbSidebar;
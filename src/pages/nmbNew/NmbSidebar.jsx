import React from 'react';
import { Menu } from 'antd';

const NmbSidebar = [
    { key: 'tn', label: <a href="/nmb_new/tn-realtime_new">Turning</a> },
    { key: 'gd', 
    label: 'Grinding',
    children: [
        {
        key: '1gd',
        label: '1st Grinding',
        children: [
        { key: 'sl', label: <a href="/nmb_new/sl-realtime_new">Sidelap</a> },
        { key: 'od', label: <a href="/nmb_new/od-realtime_new">OD</a> },
        ]},
        {
        key: '2gd-ir',
        label: '2nd Grinding - I/R',
        children: [
            { key: 'combine-ir', label: <a href="/nmb_new/ir-combine-realtime_new">Combine</a> },
            { key: 'bore-ir', label: <a href="/nmb_new/ir-bore-realtime_new">Bore</a> },
            { key: 'raceway-ir', label: <a href="/nmb_new/ir-rw-realtime_new">Raceway</a> },
            { key: 's/f-ir', label: <a href="/nmb_new/ir-sf-realtime_new">S/F</a> },
        ]},
        {
        key: '2gd-or',
        label: '2nd Grinding - O/R',
        children: [
            { key: 'combine-or', label: <a href="/nmb_new/or-combine-realtime_new">Combine</a> },
            { key: 'raceway-or', label: <a href="/nmb_new/or-rw-realtime_new">Raceway</a> },
            { key: 'flange-or', label: <a href="/nmb_new/or-flange-realtime_new">Flange</a> },
            { key: 's/f-or', label: <a href="/nmb_new/or-sf-realtime_new">S/F</a> },
        ]},
    ]},
    { key: 'assy', 
    label: 'Assembly',
    children: [
        {
        key: 'combine-assy',
        label: <a href="/nmb_new/assy-combine-realtime_new">Combine</a>,
        },
        {
        key: '1st-line',
        label: '1st Line',
        children: [
            { key: 'mbr', 
            label: "MBR",
            children: [
                { key: 'agl', label: <a href="/nmb_new/assy-agl-realtime_new">AGL</a> },
                { key: 'ffl', label: <a href="/nmb_new/assy-ffl-realtime_new">FFL</a> },
                { key: 'amt', label: <a href="/nmb_new/assy-amt-realtime_new">AMT</a> },
            ]},
            { key: 'arp', label: <a href="/nmb_new/assy-arp-realtime_new">ARP</a> },
        ]},
        {
        key: '2nd-line',
        label: '2nd Line',
        children: [
            { key: 'gssm', 
            label: "GSSM",
            children: [
                { key: 'agr', label: <a href="/nmb_new/assy-mbr-realtime_new">AGR</a> },
                { key: 'press-shield', label: <a href="/nmb_new/assy-press-shield-realtime_new">Press shield</a> },
            ]},
            { key: 'asl', label: <a href="/nmb_new/assy-asl-realtime_new">ASL</a> },
            { key: 'fim', label: <a href="/nmb_new/assy-fim-realtime_new">FIM</a> },
            { key: 'and', label: <a href="/nmb_new/assy-and-realtime_new">AND</a> },
            { key: 'aod', label: <a href="/nmb_new/assy-aod-realtime_new">AOD</a> },
            { key: 'avs', label: <a href="/nmb_new/assy-avs-realtime_new">AVS</a> },
            { key: 'alu', label: <a href="/nmb_new/assy-alu-realtime_new">ALU</a> },
        ]},
    ]},
];
// const NmbSidebar = ({collapsed}) => {
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
export default NmbSidebar;
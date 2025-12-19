import React from 'react';
import { Menu } from 'antd';

const PelmecSidebar = [
    { key: 'tn', 
    label: "Turning", 
    children: [
    {
    key: 'turning',
    label: <a href="/pelmec_new/tn-realtime_new">Turning</a>,
    },
    {
    key: 'cold-forming',
    label: <a href="/pelmec_new/cf-realtime_new">Cold Forming</a>,
    },
    {
    key: 'chucker',
    label: <a href="/pelmec_new/chucker-realtime_new">Chucker</a>,
    },
    ]}, 
    { key: 'gd', 
    label: 'Grinding',
    children: [
        {
        key: '1gd',
        label: '1st Grinding',
        children: [
        { key: 'sl', label: <a href="/pelmec_new/sl-realtime_new">Sidelap</a> },
        { key: 'od', label: <a href="/pelmec_new/od-realtime_new">OD</a> },
        ]},
        {
        key: '2gd-ir',
        label: '2nd Grinding - I/R',
        children: [
            { key: 'combine-ir', label: <a href="/pelmec_new/ir-combine-realtime_new">Combine</a> },
            { key: 'bore-ir', label: <a href="/pelmec_new/ir-bore-realtime_new">Bore</a> },
            { key: 'raceway-ir', label: <a href="/pelmec_new/ir-rw-realtime_new">Raceway</a> },
            { key: 's/f-ir', label: <a href="/pelmec_new/ir-sf-realtime_new">S/F</a> },
        ]},
        {
        key: '2gd-or',
        label: '2nd Grinding - O/R',
        children: [
            { key: 'combine-or', label: <a href="/pelmec_new/or-combine-realtime_new">Combine</a> },
            { key: 'raceway-or', label: <a href="/pelmec_new/or-rw-realtime_new">Raceway</a> },
            { key: 's/f-or', label: <a href="/pelmec_new/or-sf-realtime_new">S/F</a> },
        ]},
    ]},
    { key: 'assy', 
    label: 'Assembly',
    children: [
        {
        key: 'combine-assy',
        label: <a href="/pelmec_new/assy-combine-realtime_new">Combine</a>,
        },
        {
        key: '1st-line',
        label: '1st Line',
        children: [
            { key: 'mbr', 
            label: "MBR",
            children: [
                { key: 'ma', label: <a href="/pelmec_new/assy-ma-realtime_new">MA</a> },
                { key: 'bs', label: <a href="/pelmec_new/assy-bs-realtime_new">BS</a> },
                { key: 'rc', label: <a href="/pelmec_new/assy-rc-realtime_new">RC</a> },
            ]},
            { key: 'arp', label: <a href="/pelmec_new/assy-arp-realtime_new">ARP</a> },
        ]},
        {
        key: '2nd-line',
        label: '2nd Line',
        children: [
            { key: 'gssm', label: <a href="/pelmec_new/assy-gssm-realtime_new">GSSM</a> },
            { key: 'fim', label: <a href="/pelmec_new/assy-fim-realtime_new">FIM</a> },
            { key: 'an', label: <a href="/pelmec_new/assy-an-realtime_new">AN</a> },
            { key: 'ato', label: <a href="/pelmec_new/assy-ato-realtime_new">ATO</a> },
            { key: 'atv', label: <a href="/pelmec_new/assy-atv-realtime_new">ATV</a> },
            { key: 'pl-al', label: <a href="/pelmec_new/assy-pl-al-realtime_new">PL & AL</a> },
        ]},
    ]},
];

// const PelmecSidebar = ({collapsed}) => {
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
export default PelmecSidebar;
import React from 'react';

const NatSidebar = 
[
    { key: 'tn', label: <a href="/nat_new/tn-realtime_new">Turning</a> },
    { key: 'gd', 
    label: 'Grinding',
    children: [
        {
        key: '1gd',
        label: '1st Grinding',
        children: [
        { key: 'sl', label: <a href="/nat_new/sl-realtime_new">Sidelap</a> },
        { key: 'od', label: <a href="/nat_new/od-realtime_new">OD</a> },
        ]},
        {
        key: '2gd-ir',
        label: '2nd Grinding - I/R',
        children: [
            { key: 'combine-ir', label: <a href="/nat_new/ir-combine-realtime_new">Combine</a> },
            { key: 'bore-ir', label: <a href="/nat_new/ir-bore-realtime_new">Bore</a> },
            { key: 'raceway-ir', label: <a href="/nat_new/ir-rw-realtime_new">Raceway</a> },
            { key: 's/f-ir', label: <a href="/nat_new/ir-sf-realtime_new">S/F</a> },
        ]},
        {
        key: '2gd-or',
        label: '2nd Grinding - O/R',
        children: [
            { key: 'combine-or', label: <a href="/nat_new/or-combine-realtime_new">Combine</a> },
            { key: 'raceway-or', label: <a href="/nat_new/or-rw-realtime_new">Raceway</a> },
            { key: 's/f-or', label: <a href="/nat_new/or-sf-realtime_new">S/F</a> },
        ]},
    ]},
    { key: 'assy', 
    label: 'Assembly',
    children: [
        {
        key: 'combine-assy',
        label: <a href="/nat_new/assy-combine-realtime_new">Combine</a>,
        },
        {
        key: '1st-line',
        label: '1st Line',
        children: [
            { key: 'mbr', label: <a href="/nat_new/assy-mbr-realtime_new">MBR</a> },
            { key: 'mbr-daily', label: <a href="/nat_new/mbr-daily">MBR daily</a> },
            { key: 'mbr-analysis', label: <a href="/nat_new/assy-mbr-realtime_new/analysis-mc">MBR analysis M/C</a> },
            { key: 'mbr-matching', label: <a href="/nat_new/mbr-unmatch">MBR matching</a> },
            { key: 'arp', label: <a href="/nat_new/assy-arp-realtime_new">ARP</a> },
            { key: 'arp-daily', label: <a href="/nat_new/arp-daily">ARP daily</a> },
        ]},
        {
        key: '2nd-line',
        label: '2nd Line',
        children: [
            { key: 'gssm', label: <a href="/nat_new/assy-gssm-realtime_new">GSSM</a> },
            { key: 'gssm-daily', label: <a href="/nat_new/gssm-daily">GSSM daily</a> },
            { key: 'fim', label: <a href="/nat_new/assy-fim-realtime_new">FIM</a> },
            { key: 'fim-daily', label: <a href="/nat_new/fim-daily">FIM daily</a> },
            { key: 'ant', label: <a href="/nat_new/assy-ant-realtime_new">ANT</a> },
            { key: 'aod', label: <a href="/nat_new/assy-aod-realtime_new">AOD</a>, disabled: true },
            { key: 'avs', label: <a href="/nat_new/assy-avs-realtime_new">AVS</a> },
            { key: 'alu', label: <a href="/nat_new/assy-alu-realtime_new">ALU</a> },
        ]},
    ]},
];

export default NatSidebar;
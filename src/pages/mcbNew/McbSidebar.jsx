import React from "react";
import { Menu } from "antd";

const items = [
  {
    key: "assy",
    label: "Assembly",
    children: [
      {
        key: "1st-line",
        label: "1st Line",
        children: [
          {
            key: "mbr-combine",
            label: <a href="/mcb_new/mbr-combine-realtime_new">MBR combine</a>,
          },
          {
            key: "a-gauge",
            label: <a href="/mcb_new/auto-gauge-realtime_new">Auto gauge</a>,
          },
          {
            key: "a-ball-assembly",
            label: (
              <a href="/mcb_new/auto-ball-assembly-realtime_new">Auto ball assembly</a>
            ),
          },
          {
            key: "avs1",
            label: <a href="/mcb_new/auto-visual-I-realtime_new">Auto visual I</a>,
          },
          {
            key: "a-retainer",
            label: <a href="/mcb_new/auto-retainer-realtime_new">Auto retainer</a>,
          },
          {
            key: "aap",
            label: <a href="/mcb_new/aap-realtime_new">AAP</a>,
          },
        ],
      },
      {
        key: "2nd-line",
        label: "2nd Line",
        children: [
          {
            key: "gssm",
            label: "GSSM",
            children: [
              {
                key: "combine-gssm",
                label: <a href="/mcb_new/gssm-combine-realtime_new">Combine</a>,
              },
              { key: "a-rotation", 
                label: <a href="/mcb_new/auto-rotation-realtime_new">Auto rotation</a> 
              },
              {
                key: "a-grease",
                label: <a href="/mcb_new/auto-grease-realtime_new">Auto grease</a>,
              },
            ],
          },
          {
            key: "mini-auto-anderon",
            label: <a href="/mcb_new/mini-auto-anderon-realtime_new">Mini auto anderon</a>,
          },
          {
            key: "ant",
            label: <a href="/mcb_new/auto-noise-realtime_new">Auto noise</a>,
          },
          {
            key: "aod",
            label: <a href="/mcb_new/aod-realtime_new">AOD</a>,
          },
          {
            key: "avs",
            label: <a href="/mcb_new/avs-II-realtime_new">AVS II</a>,
          },
          {
            key: "alu",
            label: <a href="/mcb_new/alu-realtime_new">ALU</a>,
          },
        ],
      },
    ],
  },
];
const McbSidebar = [
  {
    key: "assy",
    label: "Assembly",
    children: [
      {
        key: "1st-line",
        label: "1st Line",
        children: [
          {
            key: "mbr-combine",
            label: <a href="/mcb_new/mbr-combine-realtime_new">MBR combine</a>,
          },
          {
            key: "a-gauge",
            label: <a href="/mcb_new/auto-gauge-realtime_new">Auto gauge</a>,
          },
          {
            key: "a-ball-assembly",
            label: (
              <a href="/mcb_new/auto-ball-assembly-realtime_new">Auto ball assembly</a>
            ),
          },
          {
            key: "avs1",
            label: <a href="/mcb_new/auto-visual-I-realtime_new">Auto visual I</a>,
          },
          {
            key: "a-retainer",
            label: <a href="/mcb_new/auto-retainer-realtime_new">Auto retainer</a>,
          },
          {
            key: "aap",
            label: <a href="/mcb_new/aap-realtime_new">AAP</a>,
          },
        ],
      },
      {
        key: "2nd-line",
        label: "2nd Line",
        children: [
          {
            key: "gssm",
            label: "GSSM",
            children: [
              {
                key: "combine-gssm",
                label: <a href="/mcb_new/gssm-combine-realtime_new">Combine</a>,
              },
              { key: "a-rotation", 
                label: <a href="/mcb_new/auto-rotation-realtime_new">Auto rotation</a> 
              },
              {
                key: "a-grease",
                label: <a href="/mcb_new/auto-grease-realtime_new">Auto grease</a>,
              },
            ],
          },
          {
            key: "mini-auto-anderon",
            label: <a href="/mcb_new/mini-auto-anderon-realtime_new">Mini auto anderon</a>,
          },
          {
            key: "ant",
            label: <a href="/mcb_new/auto-noise-realtime_new">Auto noise</a>,
          },
          {
            key: "aod",
            label: <a href="/mcb_new/aod-realtime_new">AOD</a>,
          },
          {
            key: "avs",
            label: <a href="/mcb_new/avs-II-realtime_new">AVS II</a>,
          },
          {
            key: "alu",
            label: <a href="/mcb_new/alu-realtime_new">ALU</a>,
          },
        ],
      },
    ],
  },
];

// ({ collapsed }) => {
//   return (
//     <div>
//       {collapsed ? (
//         <div>
//           <a href='/home' className='flex items-center justify-center text-3xl my-5 font-semibold'>DX Bearing</a>
//           <Menu
//             mode="inline"
//             items={items}
//             className="!border-none !bg-lightblue !text-lg !w-68" //set important to override antd style
//           />
//         </div>
//       ) : (
//         <></>
//       )}
//     </div>
//   );
// };
export default McbSidebar;

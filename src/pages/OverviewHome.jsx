import { faBug, faCirclePause, faCirclePlay, faCircleStop, faScrewdriverWrench, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Table } from "antd";
import React from "react";

export default function OverviewHome() {
    const sharedOnCell = (_, index) => {
        if (index === 0) {
          return { colSpan: 0 };
        }
        return {};
    };
    
    const natColumns = [
        {
            title: "NAT",
            dataIndex: "nat",
            key: "nat",
            fixed: "start",
            align: "center",
            width: 150,
        },
        {
            title: "Turning",
            align: "center",
            onHeaderCell: () => ({
            style: { background: "#ffeaa6",  },
            }),
            children: [
            {
                title: "TN",
                dataIndex: "tn",
                key: "tn",
                align: "center",
                width: 100,
                onHeaderCell: () => ({
                style: { background: "#ffeaa6" },
                }),
                onCell: (_, index) => ({
                    colSpan: index === 0 ? 3 : 1,
                    className: index === 0 ? "bg-gray-300" : ""
                }),
            },
            ],
        },
        {
            title: "Grinding",
            align: "center",
            onHeaderCell: () => ({
                style: { background: "#b8f5b8" },
            }),
            children: [
            {
                title: "SL",
                dataIndex: "sl",
                key: "sl",
                align: "center",
                width: 100,
                onHeaderCell: () => ({
                style: { background: "#b8f5b8" },
                }),
                onCell: sharedOnCell,
            },
            {
                title: "OD",
                dataIndex: "od",
                key: "od",
                align: "center",
                width: 100,
                onHeaderCell: () => ({
                style: { background: "#b8f5b8" },
                }),
                onCell: sharedOnCell,
            },
            {
                title: "I/R",
                align: "center",
                onHeaderCell: () => ({
                    style: { background: "#b8f5b8" },
                }),
                children: [
                {
                    title: "Bore",
                    dataIndex: "bore",
                    key: "bore",
                    align: "center",
                    width: 100,
                    onHeaderCell: () => ({
                        style: { background: "#b8f5b8" },
                    }),
                    onCell: (_, index) => ({
                        colSpan: index === 0 ? 3 : 1,
                    }),
                },
                {
                    title: "R/W",
                    dataIndex: "ir_rw",
                    key: "ir_rw",
                    align: "center",
                    width: 100,
                    onHeaderCell: () => ({
                    style: { background: "#b8f5b8" },
                    }),
                    onCell: sharedOnCell,
                },
                {
                    title: "S/F",
                    dataIndex: "ir_sf",
                    key: "ir_sf",
                    align: "center",
                    width: 100,
                    onHeaderCell: () => ({
                    style: { background: "#b8f5b8" },
                    }),
                    onCell: sharedOnCell,
                },
                ],
            },
            {
                title: "O/R",
                align: "center",
                onHeaderCell: () => ({
                style: { background: "#b8f5b8" },
                }),
                children: [
                {
                    title: "R/W",
                    dataIndex: "or_rw",
                    key: "or_rw",
                    align: "center",
                    width: 100,
                    onHeaderCell: () => ({
                    style: { background: "#b8f5b8" },
                    }),
                    onCell: (_, index) => ({
                        colSpan: index === 0 ? 2 : 1,
                    }),
                },
                {
                    title: "S/F",
                    dataIndex: "or_sf",
                    key: "or_sf",
                    align: "center",
                    width: 100,
                    onHeaderCell: () => ({
                    style: { background: "#b8f5b8" },
                    }),
                    onCell: sharedOnCell,
                },
                ],
            },
            ],
        },
        {
            title: "Assembly",
            align: "center",
            onHeaderCell: () => ({
            style: { background: "#c7d5ff" },
            }),
            children: [
            {
                title: "MBR",
                dataIndex: "mbr",
                key: "mbr",
                align: "center",
                width: 100,
                onHeaderCell: () => ({
                style: { background: "#c7d5ff" },
                }),
                onCell: (_, index) => ({
                    colSpan: index === 0 ? 7 : 1,
                }),
            },
            {
                title: "ARP",
                dataIndex: "arp",
                key: "arp",
                align: "center",
                width: 100,
                onHeaderCell: () => ({
                style: { background: "#c7d5ff" },
                }),
                onCell: sharedOnCell,
            },
            {
                title: "GSSM",
                dataIndex: "gssm",
                key: "gssm",
                align: "center",
                width: 100,
                onHeaderCell: () => ({
                style: { background: "#c7d5ff" },
                }),
                onCell: sharedOnCell,
            },
            {
                title: "FIM",
                dataIndex: "fim",
                key: "fim",
                align: "center",
                width: 100,
                onHeaderCell: () => ({
                style: { background: "#c7d5ff" },
                }),
                onCell: sharedOnCell,
            },
            {
                title: "ANT",
                dataIndex: "ant",
                key: "ant",
                align: "center",
                width: 100,
                onHeaderCell: () => ({
                style: { background: "#c7d5ff" },
                }),
                onCell: sharedOnCell,
            },
            {
                title: "AOD",
                dataIndex: "aod",
                key: "aod",
                align: "center",
                width: 100,
                onHeaderCell: () => ({
                style: { background: "#c7d5ff" },
                }),
                onCell: sharedOnCell,
            },
            {
                title: "AVS",
                dataIndex: "avs",
                key: "avs",
                align: "center",
                width: 100,
                onHeaderCell: () => ({
                style: { background: "#c7d5ff" },
                }),
                onCell: sharedOnCell,
            },
            ],
        },
    ];

    const natDataSource = [{
        key: 1,
        nat: 'Combine',
    },
    {
        key: 2,
        nat: 'Realtime',
    },
    {
        key: 3,
        nat: 'Machine analysis',
    },
    {
        key: 4,
        nat: 'Alarm',
    },
    {
        key: 5,
        nat: 'Production',
    },
    {
        key: 6,
        nat: 'Report',
    },];

    // ======== NHT ==========
    // const nhtColumns = [
    //     {
    //     title: "NHT",
    //     dataIndex: "nht",
    //     key: "nht",
    //     fixed: "start",
    //     align: "center",
    //     width: 150,
    //     },
    //     {
    //     title: "Turning",
    //     align: "center",
    //     onHeaderCell: () => ({
    //         style: { background: "#ffeaa6",  },
    //     }),
    //     children: [
    //         {
    //         title: "TN",
    //         dataIndex: "tn",
    //         key: "tn",
    //         align: "center",
    //         width: 100,
    //         onHeaderCell: () => ({
    //             style: { background: "#ffeaa6" },
    //         }),
    //         },
    //     ],
    //     },
    //     {
    //     title: "Grinding",
    //     align: "center",
    //     onHeaderCell: () => ({
    //         style: { background: "#b8f5b8" },
    //     }),
    //     children: [
    //         {
    //         title: "SL",
    //         dataIndex: "sl",
    //         key: "sl",
    //         align: "center",
    //         width: 100,
    //         onHeaderCell: () => ({
    //             style: { background: "#b8f5b8" },
    //         }),
    //         },
    //         {
    //         title: "OD",
    //         dataIndex: "od",
    //         key: "od",
    //         align: "center",
    //         width: 100,
    //         onHeaderCell: () => ({
    //             style: { background: "#b8f5b8" },
    //         }),
    //         },
    //         {
    //         title: "I/R",
    //         align: "center",
    //         onHeaderCell: () => ({
    //             style: { background: "#b8f5b8" },
    //         }),
    //         children: [
    //             {
    //             title: "Bore",
    //             dataIndex: "bore",
    //             key: "bore",
    //             align: "center",
    //             width: 100,
    //             onHeaderCell: () => ({
    //                 style: { background: "#b8f5b8" },
    //             }),
    //             },
    //             {
    //             title: "R/W",
    //             dataIndex: "ir_rw",
    //             key: "ir_rw",
    //             align: "center",
    //             width: 100,
    //             onHeaderCell: () => ({
    //                 style: { background: "#b8f5b8" },
    //             }),
    //             },
    //             {
    //             title: "S/F",
    //             dataIndex: "ir_sf",
    //             key: "ir_sf",
    //             align: "center",
    //             width: 100,
    //             onHeaderCell: () => ({
    //                 style: { background: "#b8f5b8" },
    //             }),
    //             },
    //         ],
    //         },
    //         {
    //         title: "O/R",
    //         align: "center",
    //         onHeaderCell: () => ({
    //             style: { background: "#b8f5b8" },
    //         }),
    //         children: [
    //             {
    //             title: "R/W",
    //             dataIndex: "or_rw",
    //             key: "or_rw",
    //             align: "center",
    //             width: 100,
    //             onHeaderCell: () => ({
    //                 style: { background: "#b8f5b8" },
    //             }),
    //             },
    //             {
    //             title: "S/F",
    //             dataIndex: "or_sf",
    //             key: "or_sf",
    //             align: "center",
    //             width: 100,
    //             onHeaderCell: () => ({
    //                 style: { background: "#b8f5b8" },
    //             }),
    //             },
    //         ],
    //         },
    //     ],
    //     },
    //     {
    //     title: "Assembly",
    //     align: "center",
    //     onHeaderCell: () => ({
    //         style: { background: "#c7d5ff" },
    //     }),
    //     children: [
    //         {
    //         title: "MBR",
    //         dataIndex: "mbr",
    //         key: "mbr",
    //         align: "center",
    //         width: 100,
    //         onHeaderCell: () => ({
    //             style: { background: "#c7d5ff" },
    //         }),
    //         },
    //         {
    //         title: "ARP",
    //         dataIndex: "arp",
    //         key: "arp",
    //         align: "center",
    //         width: 100,
    //         onHeaderCell: () => ({
    //             style: { background: "#c7d5ff" },
    //         }),
    //         },
    //         {
    //         title: "GSSM",
    //         dataIndex: "gssm",
    //         key: "gssm",
    //         align: "center",
    //         width: 100,
    //         onHeaderCell: () => ({
    //             style: { background: "#c7d5ff" },
    //         }),
    //         },
    //         {
    //         title: "FIM",
    //         dataIndex: "fim",
    //         key: "fim",
    //         align: "center",
    //         width: 100,
    //         onHeaderCell: () => ({
    //             style: { background: "#c7d5ff" },
    //         }),
    //         },
    //         {
    //         title: "ANT",
    //         dataIndex: "ant",
    //         key: "ant",
    //         align: "center",
    //         width: 100,
    //         onHeaderCell: () => ({
    //             style: { background: "#c7d5ff" },
    //         }),
    //         },
    //         {
    //         title: "AOD",
    //         dataIndex: "aod",
    //         key: "aod",
    //         align: "center",
    //         width: 100,
    //         onHeaderCell: () => ({
    //             style: { background: "#c7d5ff" },
    //         }),
    //         },
    //         {
    //         title: "AVS",
    //         dataIndex: "avs",
    //         key: "avs",
    //         align: "center",
    //         width: 100,
    //         onHeaderCell: () => ({
    //             style: { background: "#c7d5ff" },
    //         }),
    //         },
    //     ],
    //     },
    // ];

    // const nhtDataSource = Array.from({ length: 3 }).map((_, i) => ({
    //     key: i,
    //     nat: `NAT ${i + 1}`,
    //     tn: <div className="transition-transform duration-400 ease-in-out transform hover:scale-115 text-4xl"><a><FontAwesomeIcon icon={faCirclePlay} style={{color: "#32c34a",}} /></a></div>,
    //     sl: <div className="transition-transform duration-400 ease-in-out transform hover:scale-115 text-4xl"><a><FontAwesomeIcon icon={faCirclePause} style={{color: "#ff5900",}} /></a></div>,
    //     od: <div className="transition-transform duration-400 ease-in-out transform hover:scale-115 text-4xl"><a><FontAwesomeIcon icon={faCircleStop} style={{color: "#ff0000",}} /></a></div>,
    //     bore: <div className="transition-transform duration-400 ease-in-out transform hover:scale-115 text-4xl"><a><FontAwesomeIcon icon={faSpinner} style={{color: "#16243b",}} /></a></div>,
    //     ir_rw: <div className="transition-transform duration-400 ease-in-out transform hover:scale-115 text-4xl"><a><FontAwesomeIcon icon={faBug} style={{color: "#005eff",}} /></a></div>,
    //     ir_sf: <div className="transition-transform duration-400 ease-in-out transform hover:scale-115 text-4xl"><a><FontAwesomeIcon icon={faScrewdriverWrench} style={{color: "#000000",}} /></a></div>,
    // }));

  return (
    <div className="w-[90%] mx-auto">
      <Table
        bordered
        size="middle"
        dataSource={natDataSource}
        columns={natColumns}
        pagination={false}
      />
      {/* <Table
        bordered
        size="middle"
        dataSource={nhtDataSource}
        columns={nhtColumns}
        pagination={false}
      /> */}
    </div>
  );
}

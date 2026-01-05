import { Table } from "antd";
import React from "react";

export default function OverviewHome() {
    const columns = [
        {
          title: 'NAT',
          dataIndex: 'nat',
          key: 'nat',
          fixed: 'start',
        },
        {
          title: 'Turning',
          children: [
            {
              title: 'TN',
              dataIndex: 'tn',
              key: 'tn',
            },
          ],
        },
        {
            title: 'Grinding',
            children: [
              {
                title: 'SL',
                dataIndex: 'sl',
                key: 'sl',
              },
              {
                title: 'OD',
                dataIndex: 'od',
                key: 'od',
              },
              {
                title: 'I/R',
                children: [
                  {
                    title: 'Bore',
                    dataIndex: 'bore',
                    key: 'bore',
                  },
                  {
                    title: 'R/W',
                    dataIndex: 'rw',
                    key: 'rw',
                  },
                  {
                    title: 'S/F',
                    dataIndex: 'sf',
                    key: 'sf',
                  },
                ],
              },
              {
                title: 'O/R',
                children: [
                  {
                    title: 'R/W',
                    dataIndex: 'rw',
                    key: 'rw',
                  },
                  {
                    title: 'S/F',
                    dataIndex: 'sf',
                    key: 'sf',
                  },
                ],
              },
            ],
          },
        {
          title: 'Assembly',
          children: [
            {
              title: 'MBR',
              dataIndex: 'mbr',
              key: 'mbr',
            },
            {
              title: 'ARP',
              dataIndex: 'arp',
              key: 'arp',
            },
            {
                title: 'GSSM',
                dataIndex: 'gssm',
                key: 'gssm',
            },
            {
                title: 'FIM',
                dataIndex: 'fim',
                key: 'fim',
            },
            {
                title: 'ANT',
                dataIndex: 'ant',
                key: 'ant',
            },
            {
                title: 'AOD',
                dataIndex: 'aod',
                key: 'aod',
            },
            {
                title: 'AVS',
                dataIndex: 'avs',
                key: 'avs',
            },
          ],
        },
      ];
    const dataSource = Array.from({ length: 1 }).map((_, i) => ({
    key: i,
    nat: `NAT ${i + 1}`,
    tn: <a></a>
    }));

  return (
    <div className="w-[90%] mx-auto">
      <Table bordered dataSource={dataSource} columns={columns} pagination={false}/>
    </div>
  );
}

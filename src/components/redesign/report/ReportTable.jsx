import React from 'react'
import { Table } from 'antd';

export default function ReportTable() {
  const dateOdd = ['1', '2', '3', '4', '5', '6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31', 'Avg', 'Total'];
  const dateEven = ['1', '2', '3', '4', '5', '6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30', 'Avg', 'Total'];
  const columns = [
    {
      title: '',
      dataIndex: 'process',
      render: (text, row, index) => {
        return {
          children: text,
          props: {
            rowSpan: (index/5) in [0,1,2,3,4,5,6,7] ? 5 : 0,
          },
        };
      },
    },
    {
      title: '',
      dataIndex: 'title',
    },
    ...dateOdd.map((name) => ({
      title: name,
      dataIndex: name,
      key: name,
      align: "center",
    })),
  ];
  const data = Array.from({ length: 35 }).map((_, i) => ({
    key: i,
    process: ['MBR', 'ARP', 'GSSM', 'FIM', 'ANT', 'AOD', 'AVS'][Math.floor(i / 5)],
    title: ['Target', 'Production', 'Diff', 'Utl.', 'Yield'][i % 5],
  }));
    
  return (
    <div>
        <Table columns={columns} dataSource={data} bordered pagination={false} />
    </div>
  )
}

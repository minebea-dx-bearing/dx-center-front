import { DatePicker, Segmented, Select, Tabs } from "antd";
import React, { useState } from "react";
import dayjs from "dayjs";
import BreadCrumbs from "../../../../components/redesign/BreadCrumbs";
import ReportTable from "../../../../components/redesign/report/ReportTable";
import RawAssyData from "../../../../components/redesign/report/RawAssyData";

export default function NatAssyReport() {
  const [month, setMonth] = useState(dayjs().format("YYYY-MM"));
  const [process, setProcess] = useState("All");
  let table = 0;

  const processMaster = [
    { value: "all", label: "All" },
    { value: "mbr", label: "MBR" },
    { value: "arp", label: "ARP" },
    { value: "gssm", label: "GSSM" },
    { value: "fim", label: "FIM" },
    { value: "ant", label: "ANT" },
    { value: "aod", label: "AOD" },
    { value: "avs", label: "AVS" },
    { value: "alu", label: "ALU" },
  ];
  const monthChange = (date, dateString) => {
    setMonth(dateString);
  };

  const processChange = (value) => {
    setProcess(value);
  };

  // const segmentedChange = ((value) => {
  //   console.log(value);
  //   if (value === "Report") {
  //     table = 0
  //   } else {
  //     table = <RawAssyData/>
  //   }
  // })

  // console.log(month, process)

  const onChange = (key) => {
    console.log(key);
  };
  const items = [
    {
      key: "report",
      label: "Report",
      children: <ReportTable />,
    },
    {
      key: "raw",
      label: "Raw data",
      children: <RawAssyData />,
    },
  ];

  return (
    <div>
      <BreadCrumbs />
      <div className="flex gap-x-5 justify-center">
        <DatePicker
          onChange={monthChange}
          picker="month"
          defaultValue={dayjs()}
        />
        <Select
          defaultValue="all"
          onChange={processChange}
          style={{ width: 120 }}
          options={processMaster}
        />
        {/* <Segmented
          options={['Report', 'Raw data']}
          onChange={segmentedChange}
          /> */}
      </div>
      <div className="w-[90%] ml-20">
        <Tabs defaultActiveKey="raw" items={items} onChange={onChange} style={{outline: 'none'}}/>
      </div>
    </div>
  );
}

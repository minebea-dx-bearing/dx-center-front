import React, { useState } from "react";
import PageBreadcrumb from "../../../components/common/PageBreadcrumb";
import ReactECharts from "echarts-for-react";
import { Button, DatePicker, Select } from "antd";
const { RangePicker } = DatePicker;
import dayjs from "dayjs";
import moment from "moment";

export default function NatTnProdDash() {
  const [selectDate, setSelectDate] = useState([dayjs().subtract(7, "day"), dayjs()]);
  const [selectMachineType, setSelectMachineType] = useState("ALL");
  const [selectMachineNo, setSelectMachineNo] = useState("ALL");

  const [lastStamp, setLastStamp] = useState("");

  const [machineTypeFetch, setMachineTypeFetch] = useState([{ mc_no_type: "ALL" }, { mc_no_type: "TORNOS" }, { mc_no_type: "MITSUBISHI" }]);
  const [machineNoFetch, setMachineNoFetch] = useState([{ mc_no: "ALL" }, { mc_no: "MC01" }, { mc_no: "MC02" }]);

  const changeSelectDate = (dateRange) => {
    setSelectDate(dateRange);
  };
  const changeSelectMachineType = (value) => {
    setSelectMachineType(value);
  };
  const changeSelectMachineNo = (value) => {
    setSelectMachineNo(value);
  };

  return (
    <div className="grid gap-4">
      <PageBreadcrumb pageTitle={`NAT : TURNING DASHBOARD`} />
      <div className="relative flex items-center justify-end mb-4">
        <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="font-medium">Date :</span>
            <RangePicker allowClear={false} value={selectDate} onChange={changeSelectDate} />
          </div>

          <div className="flex items-center gap-2">
            <span className="font-medium">M/C type :</span>
            <Select defaultValue="ALL" style={{ width: 150 }} onChange={changeSelectMachineType}>
              {machineTypeFetch.map((item) => {
                return <Select.Option value={item.mc_no_type}>{item.mc_no_type}</Select.Option>;
              })}
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-medium">M/C No. :</span>
            <Select defaultValue="ALL" style={{ width: 150 }} onChange={changeSelectMachineNo}>
              {machineNoFetch.map((item) => {
                return <Select.Option value={item.mc_no}>{item.mc_no}</Select.Option>;
              })}
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <Button type="primary">Submit</Button>
          </div>
        </div>

        <div>
          <span>Data as of : {lastStamp}</span>
        </div>
      </div>
      <div>
        <ReactECharts
          // key={JSON.stringify(chartProductionGroup)}
          option={{
            tooltip: {
              trigger: "item",
              axisPointer: {
                type: "shadow",
              },
            },
            legend: {
              type: "scroll",
              orient: "vertical",
              right: 10,
              top: "center",
            },
            xAxis: {
              type: "category",
              data: ["2025-11-19", "2025-11-20"],
              axisLabel: {
                rotate: 90,
                formatter: (val) => moment(val).format("DD-MMM"),
              },
            },
            yAxis: {
              type: "value",
              axisLabel: {
                formatter: (val) => `${val.toLocaleString("en-US", { maximumFractionDigits: 1 })}pcs`,
              },
            },
            dataZoom: [
              {
                type: "slider",
                show: true,
                xAxisIndex: 0,
                start: 0,
                end: 100, // ซูมแค่บางส่วนถ้าเยอะ
              },
            ],
            series: [
              {
                name: "ACME",
                type: "bar",
                stack: "total",
                data: [411837, 403085],
              },
              {
                name: "CNC",
                type: "bar",
                stack: "total",
                data: [13515, 13780],
              },
              {
                name: "MITSUBISHI",
                type: "bar",
                stack: "total",
                data: [966127, 944910],
              },
              {
                name: "TORNOS",
                type: "bar",
                stack: "total",
                data: [3263122, 3318873],
              },
              {
                name: "Total",
                type: "scatter",
                symbolSize: 0,
                color: "black",
                data: [4654601, 4680648],
              },
              {
                name: "Capacity",
                type: "line",
                color: "red",
                data: [4869659, 4872262],
              },
            ],
            grid: {
              left: "1%",
              right: "17%",
              top: "10%",
              bottom: "10%",
              containLabel: true,
            },
          }}
          style={{ width: "100%", height: 500 }}
        />
      </div>
    </div>
  );
}

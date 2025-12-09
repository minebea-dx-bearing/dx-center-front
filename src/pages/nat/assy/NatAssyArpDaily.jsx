import { useEffect, useState } from "react";
import PageBreadcrumb from "../../../components/common/PageBreadcrumb";
import dayjs from "dayjs";
import { DatePicker, Select, Table } from "antd";
import ReactECharts from "echarts-for-react";
import ChartDonutPercent from "../../../components/common/ChartDonutPercent";
import Swal from "sweetalert2";
import axios from "axios";
import { BASE_URL } from "../../../constance/constance";

const OEE_MASTER = {
  OEE: "#1E90FF",
  AVAILABILITY: "#87CEEB",
  PERFORMANCE: "#7CFC00",
  QUALITY: "#FFFF00",
  OPN: "#FF00FF",
  UTILIZATION: "#BDB76B",
};

const formatSecondsToHHMMSS = (totalSeconds) => {
  // ตรวจสอบข้อมูลเบื้องต้น
  const numSeconds = Number(totalSeconds);
  if (isNaN(numSeconds) || numSeconds < 0) {
    return "00:00:00";
  }

  // คำนวณ ชั่วโมง, นาที, และวินาที
  const hours = Math.floor(numSeconds / 3600);
  const minutes = Math.floor((numSeconds % 3600) / 60);
  const seconds = Math.floor(numSeconds % 60);

  // ทำให้เป็นเลข 2 หลักเสมอ (เช่น 01, 09)
  const paddedHours = String(hours).padStart(2, "0");
  const paddedMinutes = String(minutes).padStart(2, "0");
  const paddedSeconds = String(seconds).padStart(2, "0");

  return `${paddedHours}:${paddedMinutes}:${paddedSeconds}`;
};

const renderProgressBar = (val, color) => {
  const num = Number(val);
  if (isNaN(num) || num < 0) return "-";

  return (
    <div className="relative w-full bg-gray-200 rounded-full overflow-hidden">
      <div className={`absolute top-0 left-0 h-full transition-all duration-300 ease-in-out`} style={{ width: `${num}%`, background: color }}></div>
      <div className="relative px-2 text-center text-sm font-bold text-gray-800">{num.toFixed(2)}%</div>
    </div>
  );
};

const columns = [
  {
    title: "M/C No.",
    dataIndex: "mc_no",
    sorter: (a, b) => a.mc_no.localeCompare(b.mc_no),
  },
  {
    title: "Part No.",
    dataIndex: "part_no",
    sorter: (a, b) => a.part_no.localeCompare(b.part_no),
  },
  {
    title: "Production",
    children: [
      {
        title: "Target",
        dataIndex: "target_prod",
        sorter: (a, b) => a.target_prod - b.target_prod,
        render: (val) => (val ? val.toLocaleString("en-US") : "-"),
      },
      {
        title: "Actual",
        dataIndex: "total_prod",
        sorter: (a, b) => a.total_prod - b.total_prod,
        render: (val) => (val ? val.toLocaleString("en-US") : "-"),
      },
    ],
  },
  {
    title: "Cycle time",
    children: [
      {
        title: "Target",
        dataIndex: "target_ct",
        sorter: (a, b) => a.target_ct - b.target_ct,
        render: (val) => {
          if (val === null || val === undefined) return "-";

          const num = Number(val);
          if (isNaN(num)) return "-";

          return num.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          });
        },
      },
      {
        title: "Actual",
        dataIndex: "avg_ct",
        sorter: (a, b) => a.actual_ct - b.actual_ct,
        render: (val) => {
          if (val === null || val === undefined) return "-";

          const num = Number(val);
          if (isNaN(num)) return "-";

          return num.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          });
        },
      },
    ],
  },
  {
    title: "Utilization",
    dataIndex: "utl",
    sorter: (a, b) => a.utilization - b.utilization,
    width: 130,
    render: (val) => renderProgressBar(val, OEE_MASTER.UTILIZATION),
  },
  {
    title: "Opn.",
    dataIndex: "opn",
    sorter: (a, b) => a.opn - b.opn,
    width: 130,
    render: (val) => renderProgressBar(val, OEE_MASTER.OPN),
  },
  {
    title: "Running time",
    dataIndex: "running_time",
    sorter: (a, b) => a.running_time - b.running_time,
    render: (val) => formatSecondsToHHMMSS(val),
  },
  {
    title: "Down time",
    dataIndex: "down_time",
    sorter: (a, b) => a.down_time - b.down_time,
    render: (val) => formatSecondsToHHMMSS(val),
  },
  {
    title: "Stop time",
    dataIndex: "planstop_time",
    sorter: (a, b) => a.plan_stop_time - b.plan_stop_time,
    render: (val) => formatSecondsToHHMMSS(val),
  },
  {
    title: "Availability",
    dataIndex: "availability",
    sorter: (a, b) => a.availability - b.availability,
    width: 130,
    render: (val) => renderProgressBar(val, OEE_MASTER.AVAILABILITY),
  },
  {
    title: "Performance",
    dataIndex: "performance",
    sorter: (a, b) => a.performance - b.performance,
    width: 130,
    render: (val) => renderProgressBar(val, OEE_MASTER.PERFORMANCE),
  },
  {
    title: "Quality",
    dataIndex: "quality",
    sorter: (a, b) => a.quality - b.quality,
    width: 130,
    render: (val) => renderProgressBar(val, OEE_MASTER.QUALITY),
  },
  {
    title: "OEE",
    dataIndex: "oee",
    sorter: (a, b) => a.oee - b.oee,
    width: 130,
    render: (val) => renderProgressBar(val, OEE_MASTER.OEE),
  },
];

export default function NatAssyArpDaily() {
  const [selectDate, setSelectDate] = useState(dayjs());
  const [selectMachineNo, setSelectMachineNo] = useState("ALL");

  const [machineNoFetch, setMachineNoFetch] = useState([]);
  const [lastStamp, setLastStamp] = useState("");
  const [summaryData, setSummaryData] = useState({});

  const [chartProd, setChartProd] = useState([]);
  const [chartAlarm, setChartAlarm] = useState([]);
  const [chartAlarmMC, setChartAlarmMC] = useState([]);
  const [dataTable, setDataTable] = useState([]);

  const changeSelectDate = (date) => {
    setSelectDate(date);
  };

  const changeSelectMachineNo = (value) => {
    setSelectMachineNo(value);
  };

  const getDataSelect = async () => {
    try {
      const resultSelect = await axios.get(`${BASE_URL}/nat/assy/arp-daily/select`);
      if (resultSelect.data.data.success) {
        setMachineNoFetch(resultSelect.data.data.data_select);
      } else {
        Swal.fire({
          title: resultSelect.message,
          icon: "warning",
        });
      }
    } catch (error) {
      Swal.fire({
        title: error.message,
        icon: "warning",
      });
    }
  };

  const getData = async () => {
    try {
      const resultData = await axios.post(`${BASE_URL}/nat/assy/arp-daily/data`, {
        dateQuery: selectDate.format("YYYY-MM-DD"),
        mcNoQuery: selectMachineNo,
      });
      if (resultData.data.data.success) {
        setLastStamp(resultData.data.data.latest_registered);
        setSummaryData(resultData.data.data.summary_data);
        setChartProd(resultData.data.data.chart_data_prod_vs_mc);
        setChartAlarm(resultData.data.data.chart_summary_by_status);
        setChartAlarmMC(resultData.data.data.chart_stacked_by_mc);
        setDataTable(resultData.data.data.data_table);
      } else {
        Swal.fire({
          title: resultSelect.message,
          icon: "warning",
        });
      }
    } catch (error) {
      Swal.fire({
        title: error.message,
        icon: "warning",
      });
    }
  };

  useEffect(() => {
    getDataSelect();
    getData();
  }, [selectDate, selectMachineNo]);

  return (
    <div className="grid gap-4">
      <PageBreadcrumb pageTitle={`NAT : ASSY ARP DAILY`} />
      <div className="relative flex items-center justify-end mb-4">
        <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="font-medium">Date :</span>
            <DatePicker size="large" allowClear={false} value={selectDate} onChange={changeSelectDate} />
          </div>

          <div className="flex items-center gap-2">
            <span className="font-medium">M/C No. :</span>
            <Select size="large" defaultValue="ALL" style={{ width: 150 }} onChange={changeSelectMachineNo}>
              {machineNoFetch.map((item) => {
                return <Select.Option value={item.mc_no}>{item.mc_no}</Select.Option>;
              })}
            </Select>
          </div>
        </div>

        <div>
          <span>Data as of : {lastStamp}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="h-60 font-semibold text-slate-700 rounded-2xl border border-gray-200 bg-white shadow-md flex flex-col p-4">
          <div className="text-lg">%OEE</div>
          <ChartDonutPercent name={OEE_MASTER} percent={summaryData.oee || 0} color={OEE_MASTER.OEE} />
        </div>
        <div className="h-60 font-semibold text-slate-700 rounded-2xl border border-gray-200 bg-white shadow-md flex flex-col p-4">
          <div className="text-lg">%AVAILABILITY</div>
          <ChartDonutPercent name={"AVAILABILITY"} percent={summaryData.availability || 0} color={OEE_MASTER.AVAILABILITY} />
        </div>
        <div className="h-60 font-semibold text-slate-700 rounded-2xl border border-gray-200 bg-white shadow-md flex flex-col p-4">
          <div className="text-lg">%PERFORMANCE</div>
          <ChartDonutPercent name={"PERFORMANCE"} percent={summaryData.performance || 0} color={OEE_MASTER.PERFORMANCE} />
        </div>
        <div className="h-60 font-semibold text-slate-700 rounded-2xl border border-gray-200 bg-white shadow-md flex flex-col p-4">
          <div className="text-lg">%QUALITY</div>
          <ChartDonutPercent name={"QUALITY"} percent={summaryData.quality || 0} color={OEE_MASTER.QUALITY} />
        </div>
      </div>
      <hr className="my-3" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6">
        <div className="h-30 font-semibold text-slate-700 rounded-2xl border border-gray-200 bg-white shadow-md flex flex-col p-4">
          <div className="text-center font-semibold text-xl mb-4 text-gray-400">TARGET PROD.</div>
          <div className="py-1 text-2xl text-center">{Number(summaryData.target_prod || 0).toLocaleString("en-US")} pcs</div>
        </div>
        <div className="h-30 font-semibold text-slate-700 rounded-2xl border border-gray-200 bg-white shadow-md flex flex-col p-4">
          <div className="text-center font-semibold text-xl mb-4 text-gray-400">ACTUAL PROD.</div>
          <div className="py-1 text-2xl text-center">{Number(summaryData.actual_prod || 0).toLocaleString("en-US")} pcs</div>
        </div>
        <div className="h-30 font-semibold text-slate-700 rounded-2xl border border-gray-200 bg-white shadow-md flex flex-col p-4">
          <div className="text-center font-semibold text-xl mb-4 text-gray-400">DOWN TIME</div>
          <div className="py-1 text-2xl text-center">{formatSecondsToHHMMSS(summaryData.down_time)}</div>
        </div>
        <div className="h-30 font-semibold text-slate-700 rounded-2xl border border-gray-200 bg-white shadow-md flex flex-col p-4">
          <div className="text-center font-semibold text-xl mb-4 text-gray-400">STOP TIME</div>
          <div className="py-1 text-2xl text-center">{formatSecondsToHHMMSS(summaryData.planstop_time)}</div>
        </div>
        <div className="h-30 font-semibold text-slate-700 rounded-2xl border border-gray-200 bg-white shadow-md flex flex-col p-4">
          <div className="text-center font-semibold text-xl mb-4 text-gray-400">AVG. %UTL.</div>
          <div className="py-1 text-2xl text-center">{Number(summaryData.avg_utl || 0).toFixed(2)} %</div>
        </div>
        <div className="h-30 font-semibold text-slate-700 rounded-2xl border border-gray-200 bg-white shadow-md flex flex-col p-4">
          <div className="text-center font-semibold text-xl mb-4 text-gray-400">AVG. %OPN.</div>
          <div className="py-1 text-2xl text-center">{Number(summaryData.avg_opn || 0).toFixed(2)} %</div>
        </div>
      </div>
      <div className="h-150 font-semibold text-slate-700 rounded-2xl border border-gray-200 bg-white shadow-md flex flex-col p-4 min-w-0">
        <ReactECharts
          option={{
            title: { text: "CHART PRODUCTION BY M/C", left: "left" },
            tooltip: {},
            grid: {
              left: "2%",
              right: "2%",
              bottom: "5%",
              top: "10%",
              containLabel: true,
            },
            xAxis: {
              type: "category",
              data: (chartProd || []).map((item) => item.mc_no),
              axisLabel: {
                rotate: 90,
              },
            },
            yAxis: {
              type: "value",
            },
            series: [
              {
                data: (chartProd || []).map((item) => item.total_prod),
                type: "bar",
                itemStyle: { color: "#6C88C4" },
                barWidth: "40%",
                label: {
                  show: true,
                  position: "top",
                  formatter: (params) => {
                    return params.value.toLocaleString("en-US");
                  },
                  color: "#4A5568",
                  fontSize: 10,
                },
              },
            ],
          }}
          style={{ height: "100%", width: "100%" }}
        />
      </div>
      <hr className="my-3" />
      <div className="h-150 font-semibold text-slate-700 rounded-2xl border border-gray-200 bg-white shadow-md flex flex-col p-4 min-w-0">
        <ReactECharts
          option={{
            title: { text: "CHART ALARM TOTAL", left: "left" },
            tooltip: {},
            grid: {
              left: "2%",
              right: "2%",
              bottom: "5%",
              top: "10%",
              containLabel: true,
            },
            xAxis: {
              type: "category",
              data: (chartAlarm || []).map((item) => item.status_alarm),
              axisLabel: {
                interval: 0,
                rotate: 90,
              },
            },
            yAxis: {
              type: "value",
            },
            series: [
              {
                data: (chartAlarm || []).map((item) => item.total_duration),
                type: "bar",
                itemStyle: { color: "#6C88C4" },
                barWidth: "40%",
                label: {
                  show: true,
                  position: "top",
                  formatter: (params) => {
                    return formatSecondsToHHMMSS(params.value);
                  },
                  color: "#4A5568",
                  fontSize: 10,
                },
              },
            ],
          }}
          style={{ height: "100%", width: "100%" }}
        />
      </div>
      <div className="h-150 font-semibold text-slate-700 rounded-2xl border border-gray-200 bg-white shadow-md flex flex-col p-4 min-w-0">
        <ReactECharts
          option={{
            title: { text: "CHART ALARM BY M/C", left: "left" },
            tooltip: {
              trigger: "axis",
              axisPointer: {
                type: "shadow",
              },
              formatter: (params) => {
                let tooltipHtml = `<b>${params[0].name}</b><br/>`;
                params.forEach((item) => {
                  const formattedValue = formatSecondsToHHMMSS(item.value);
                  tooltipHtml += `${item.marker} ${item.seriesName}: <b>${formattedValue}</b><br/>`;
                });

                return tooltipHtml;
              },
            },
            legend: {
              data: chartAlarmMC?.legend || [],
              top: "5%",
              type: "scroll",
            },
            grid: {
              left: "2%",
              right: "2%",
              bottom: "5%",
              top: "15%",
              containLabel: true,
            },
            xAxis: {
              type: "category",
              data: chartAlarmMC?.xAxis || [],
              axisLabel: {
                rotate: 90,
              },
            },
            yAxis: {
              type: "value",
              axisLabel: {
                formatter: (value) => formatSecondsToHHMMSS(value),
              },
            },
            series: chartAlarmMC?.series || [],
          }}
          style={{ height: "100%", width: "100%" }}
          notMerge={true}
        />
      </div>
      <hr className="my-3" />
      <div className="font-semibold text-slate-700 rounded-2xl border border-gray-200 bg-white shadow-md flex flex-col p-4">
        <div className="text-lg">DATA TABLE</div>
        <Table
          columns={columns}
          dataSource={dataTable}
          pagination={false}
          bordered
          summary={(currentData) => {
            const totals = currentData.reduce(
              (acc, record) => {
                acc.total_target += Number(record.target_prod) || 0;
                acc.total_prod += Number(record.total_prod) || 0;
                acc.running_time += Number(record.running_time) || 0;
                acc.down_time += Number(record.down_time) || 0;
                acc.planstop_time += Number(record.planstop_time) || 0;
                return acc;
              },
              { total_target: 0, total_prod: 0, running_time: 0, down_time: 0, planstop_time: 0 }
            );

            return (
              <Table.Summary fixed>
                <Table.Summary.Row className="font-bold bg-gray-50">
                  <Table.Summary.Cell index={0} colSpan={2} className="text-right">
                    <div>Total</div>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={2} className="text-right">
                    <div>{totals.total_target.toLocaleString("en-US")}</div>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={3} className="text-right">
                    <div>{totals.total_prod.toLocaleString("en-US")}</div>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={4} colSpan={4} />
                  <Table.Summary.Cell index={8} className="text-right">
                    <div>{formatSecondsToHHMMSS(totals.running_time)}</div>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={9} className="text-right">
                    <div>{formatSecondsToHHMMSS(totals.down_time)}</div>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={10} className="text-right">
                    <div>{formatSecondsToHHMMSS(totals.planstop_time)}</div>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={11} colSpan={4} />
                </Table.Summary.Row>
              </Table.Summary>
            );
          }}
        />
      </div>
    </div>
  );
}

import PageBreadcrumb from "../../../components/common/PageBreadcrumb";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import moment from "moment/moment";
import { BASE_URL } from "../../../constance/constance";
import { DatePicker, Radio, Table } from "antd";
import ReactECharts from "echarts-for-react";
import dayjs from "dayjs";

const refreshTime = 60;

export default function NatTnSummary() {
  const [loading, setLoading] = useState(false);
  const [fetchTime, setFetchTime] = useState();
  const [countdown, setCountdown] = useState(refreshTime);

  const [selectDate, setSelectDate] = useState(dayjs());
  const [toggleRealtime, setToggleRealtime] = useState("realtime");

  const [prodCard, setProdCard] = useState({});
  const [chartProd, setChartProd] = useState({ xAxisData: [], seriesData: [] });
  const [chartDrop, setChartDrop] = useState({ xAxisData: [], seriesData: [] });
  const [dataTable, setDataTable] = useState([]);

  const isFirstLoad = useRef(true);

  const columns = [
    {
      title: "Working Date",
      dataIndex: "working_date",
      sorter: (a, b) => a.working_date.localeCompare(b.working_date),
    },
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
      title: "Prod. pos.4",
      dataIndex: "total_prod_pos4",
      sorter: (a, b) => a.total_prod_pos4 - b.total_prod_pos4,
      render: (val) => `${val.toLocaleString("en-US")}`,
    },
    {
      title: "Prod. pos.6",
      dataIndex: "total_prod_pos6",
      sorter: (a, b) => a.total_prod_pos6 - b.total_prod_pos6,
      render: (val) => `${val.toLocaleString("en-US")}`,
    },
    {
      title: "Total Prod",
      dataIndex: "total_prod",
      sorter: (a, b) => a.total_prod - b.total_prod,
      render: (val) => `${val.toLocaleString("en-US")}`,
    },
    {
      title: "Drop pos.4",
      dataIndex: "total_drop_pos4",
      sorter: (a, b) => a.total_drop_pos4 - b.total_drop_pos4,
      render: (val) => `${val.toLocaleString("en-US")}`,
    },
    {
      title: "Drop pos.6",
      dataIndex: "total_drop_pos6",
      sorter: (a, b) => a.total_drop_pos6 - b.total_drop_pos6,
      render: (val) => `${val.toLocaleString("en-US")}`,
    },
    {
      title: "Total Prod",
      dataIndex: "total_drop",
      sorter: (a, b) => a.total_drop - b.total_drop,
      render: (val) => `${val.toLocaleString("en-US")}`,
    },
    {
      title: "Total Reject",
      dataIndex: "total_reject",
      sorter: (a, b) => a.total_reject - b.total_reject,
      render: (val) => `${val.toLocaleString("en-US")}`,
    },
    {
      title: "Total Adjust",
      dataIndex: "total_adjust",
      sorter: (a, b) => a.total_adjust - b.total_adjust,
      render: (val) => `${val.toLocaleString("en-US")}`,
    },
    {
      title: "Running time",
      dataIndex: "sum_duration",
      sorter: (a, b) => a.sum_duration - b.sum_duration,
      render: (val) => {
        const totalSeconds = Number(val);

        if (isNaN(totalSeconds) || totalSeconds < 0) {
          return "00:00:00";
        }

        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        const hh = String(hours).padStart(2, "0");
        const mm = String(minutes).padStart(2, "0");
        const ss = String(seconds).padStart(2, "0");

        return `${hh}:${mm}:${ss}`;
      },
    },
    {
      title: "Opn. rate",
      dataIndex: "opn",
      sorter: (a, b) => a.opn - b.opn,
      render: (val) => {
        const num = Number(val);
        if (isNaN(num) || num < 0 || num > 100) return "-";

        let barColorClass = "bg-green-500";
        if (num < 85) barColorClass = "bg-yellow-500";
        if (num < 50) barColorClass = "bg-red-500";

        return (
          <div className="relative w-full bg-gray-200 rounded-full overflow-hidden">
            <div
              className={`absolute top-0 left-0 h-full ${barColorClass} transition-all duration-300 ease-in-out`}
              style={{ width: `${num}%` }}
            ></div>

            <div className="relative px-2 text-center text-sm font-bold text-gray-800">{num.toFixed(2)}%</div>
          </div>
        );
      },
    },
  ];

  const changeSelectDate = (date) => {
    setSelectDate(date);
  };

  const changeToggleRealtime = (e) => {
    const value = e.target.value;
    setToggleRealtime(value);
    if (value === "realtime") {
      setSelectDate(dayjs());
    }
  };

  const fetchData = async () => {
    if (isFirstLoad.current) {
      setLoading(true);
    }
    try {
      const response1 = await axios.post(`${BASE_URL}/nat/tn/tn-summary/get_data_realtime`, 
        { dateQuery: moment(selectDate.toDate()).format("YYYY-MM-DD") },
        {
          headers: {
            "Cache-Control": "no-cache",
            Pragma: "no-cache",
            Expires: "0",
          },
        }
      );

      setProdCard(response1.data.data.summaryByType);
      setChartProd(response1.data.data.prod_daily);
      setChartDrop(response1.data.data.drop_daily);
      setDataTable(response1.data.data.data_table);
      setFetchTime(moment().format("DD-MMM HH:mm"));
    } catch (error) {
      if (isFirstLoad.current) {
        setLoading(false);
        isFirstLoad.current = false;
      }
      Swal.fire({
        title: error.message,
        icon: "warning",
        timer: 4000,
        timerProgressBar: true,
      });
    }
  };

  useEffect(() => {
    fetchData();

    if (toggleRealtime === "realtime") {
      const timer = setInterval(() => {
        setCountdown((prevCountdown) => {
          if (prevCountdown <= 1) {
            fetchData();
            return refreshTime;
          }
          return prevCountdown - 1;
        });
      }, 1000);

      return () => {
        clearInterval(timer);
      };
    } else {
      setCountdown(refreshTime);
    }
  }, [selectDate, toggleRealtime]);

  return (
    <div>
      <PageBreadcrumb pageTitle="NAT : TURNING SUMMARY" />
      <div className="relative flex items-center justify-end mb-4">
        <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center gap-3">
          <Radio.Group
            options={[
              { label: "Realtime", value: "realtime" },
              { label: "Select", value: "select" },
            ]}
            value={toggleRealtime}
            onChange={changeToggleRealtime}
            optionType="button"
            buttonStyle="solid"
            size="large"
          />
          <DatePicker disabled={toggleRealtime === "realtime"} size="large" allowClear={false} value={selectDate} onChange={changeSelectDate} />
        </div>

        <div>
          {toggleRealtime === "realtime" ? (
            <span>
              Update : {fetchTime} <span style={{ color: "red" }}>(Refresh in {countdown}s)</span>
            </span>
          ) : (
            <span>
              Data as of : {prodCard.INNER?.latest_registered ? moment(prodCard.INNER.latest_registered).utc().format("DD-MMM HH:mm") : "-"}
            </span>
          )}
        </div>
      </div>

      <div className="w-full h-20 font-semibold text-slate-700 rounded-2xl border border-gray-200 bg-white shadow-md flex flex-col justify-center mb-6">
        <div className="text-3xl flex justify-center mb-2">TURNING SUMMARY</div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="h-40 font-semibold text-slate-700 rounded-2xl border border-gray-200 bg-white shadow-md flex flex-col p-4">
          <div className="text-center font-semibold text-xl mb-2">TOTAL PRODUCTION</div>
          <div className="grid grid-cols-[80px_1fr] gap-y-1">
            <div className="py-1 text-xl">O/R :</div>
            <div className="py-1 text-xl">{prodCard.OUTER?.total_prod.toLocaleString() || 0} pcs</div>
            <div className="py-1 text-xl">I/R :</div>
            <div className="py-1 text-xl">{prodCard.INNER?.total_prod.toLocaleString() || 0} pcs</div>
          </div>
        </div>

        <div className="h-40 font-semibold text-slate-700 rounded-2xl border border-gray-200 bg-white shadow-md flex flex-col p-4">
          <div className="text-center font-semibold text-xl mb-2">TOTAL REJECT</div>
          <div className="grid grid-cols-[80px_1fr] gap-y-1">
            <div className="py-1 text-xl">O/R :</div>
            <div className="py-1 text-xl">{prodCard.OUTER?.total_reject.toLocaleString() || 0} pcs</div>
            <div className="py-1 text-xl">I/R :</div>
            <div className="py-1 text-xl">{prodCard.INNER?.total_reject.toLocaleString() || 0} pcs</div>
          </div>
        </div>

        <div className="h-40 font-semibold text-slate-700 rounded-2xl border border-gray-200 bg-white shadow-md flex flex-col p-4">
          <div className="text-center font-semibold text-xl mb-2">TOTAL DROP</div>
          <div className="grid grid-cols-[80px_1fr] gap-y-1">
            <div className="py-1 text-xl">O/R :</div>
            <div className="py-1 text-xl">{prodCard.OUTER?.total_drop.toLocaleString() || 0} pcs</div>
            <div className="py-1 text-xl">I/R :</div>
            <div className="py-1 text-xl">{prodCard.INNER?.total_drop.toLocaleString() || 0} pcs</div>
          </div>
        </div>

        <div className="h-40 font-semibold text-slate-700 rounded-2xl border border-gray-200 bg-white shadow-md flex flex-col p-4">
          <div className="text-center font-semibold text-xl mb-2">AVG. OPN.</div>
          <div className="grid grid-cols-[80px_1fr] gap-y-1">
            <div className="py-1 text-xl">O/R :</div>
            <div className="relative w-full h-8 bg-gray-200 rounded-full overflow-hidden">
              <div className="absolute left-0 top-0 h-full bg-green-400 rounded-full" style={{ width: `${prodCard.OUTER?.average_opn}%` }}></div>
              <div className="absolute inset-0 flex items-center justify-center text-xl font-bold text-gray-700">{prodCard.OUTER?.average_opn}%</div>
            </div>
            <div className="py-1 text-xl">I/R :</div>
            <div className="relative w-full h-8 bg-gray-200 rounded-full overflow-hidden">
              <div className="absolute left-0 top-0 h-full bg-green-400 rounded-full" style={{ width: `${prodCard.INNER?.average_opn}%` }}></div>
              <div className="absolute inset-0 flex items-center justify-center text-xl font-bold text-gray-700">{prodCard.INNER?.average_opn}%</div>
            </div>
          </div>
        </div>

        <div className="col-span-2 h-120 rounded-2xl border border-gray-200 bg-white shadow-md p-4">
          <ReactECharts
            option={{
              title: { text: "PRODUCTION DAILY", left: "center" },
              tooltip: {},
              xAxis: {
                type: "category",
                data: chartProd.xAxisData,
                axisLabel: {
                  rotate: 90,
                  formatter: (val) => moment(val, "YYYY-MM-DD").format("DD-MMM"),
                },
              },
              yAxis: {
                type: "value",
              },
              series: [
                {
                  data: chartProd.seriesData,
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

        <div className="col-span-2 h-120 rounded-2xl border border-gray-200 bg-white shadow-md p-4">
          <ReactECharts
            option={{
              title: { text: "DROP DAILY", left: "center" },
              tooltip: {},
              xAxis: {
                type: "category",
                data: chartDrop.xAxisData,
                axisLabel: {
                  rotate: 90,
                  formatter: (val) => moment(val, "YYYY-MM-DD").format("DD-MMM"),
                },
              },
              yAxis: {
                type: "value",
              },
              series: [
                {
                  data: chartDrop.seriesData,
                  type: "bar",
                  itemStyle: { color: "#FFA200" },
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

        <div className="col-span-4 rounded-2xl border border-gray-200 bg-white shadow-md p-4">
          <Table
            columns={columns}
            dataSource={dataTable}
            pagination={false}
            bordered
          />
        </div>
      </div>
    </div>
  );
}

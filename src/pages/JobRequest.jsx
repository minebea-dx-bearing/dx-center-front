import { Component } from "react";
import {Card,Button,Form,Input,Select,Space,DatePicker,Tooltip,Row,Col} from "antd";
import {UploadOutlined,MinusCircleOutlined,PlusOutlined,RightCircleOutlined,DownloadOutlined,
  FileZipOutlined,UserSwitchOutlined,CloseCircleOutlined,} from "@ant-design/icons";
import Swal from "sweetalert2";
import moment from "moment";
import { BASE_URL, NOK } from "../constance/constance";
import { CSVLink } from "react-csv";
import axios from "axios";
import PageBreadcrumb from "../components/common/PageBreadcrumb";
import dayjs from "dayjs";
import ReactECharts from "echarts-for-react";

const headers = [
  { label: "Doc.No", key: "DocReq" },
  { label: "Req.Date", key: "ReqDate" },
  { label: "Factory", key: "Factory" },
  { label: "Process", key: "Process" },
  { label: "Category", key: "Category" },
  { label: "Detail", key: "ReqTitle" },
  { label: "Reduced/Month", key: "ImproveM" },
  { label: "Responsible", key: "Responsible" },
  { label: "Status", key: "Status" },
];
const findLatestDate = (dates) => {
  const validDates = dates.filter((date) => date);
  if (validDates.length === 0) {
    return "-";
  }
  const dateObjects = validDates.map((dateStr) => new Date(dateStr));
  const latestTimestamp = Math.max(...dateObjects);
  const latestDate = new Date(latestTimestamp);
  const year = latestDate.getFullYear();
  const month = String(latestDate.getMonth() + 1).padStart(2, "0");
  const day = String(latestDate.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};
class JobRequest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      DocReq: "DX00",
      ReqDate: moment().add(0, "month").format("YYYY-MM-DD"),
      ReqTime: moment().format("HH:mm:ss"),
      UserReq: "",
      Gmail: "",
      Factory: "",
      Process: "",
      Category: "",
      ReqTitle: "",
      Before: "",
      After: "",
      ImproveM: "",
      ReducedY: "",
      CostDetail: "",
      beforeCount: 0,
      afterCount: 0,
      BfStep1: "",
      BfStep2: "",
      BfStep3: "",
      BfStep4: "",
      BfStep5: "",
      BfStep6: "",
      BfStep7: "",
      BfStep8: "",
      BfStep9: "",
      BfStep10: "",
      AfStep1: "",
      AfStep2: "",
      AfStep3: "",
      AfStep4: "",
      AfStep5: "",
      AfStep6: "",
      AfStep7: "",
      AfStep8: "",
      AfStep9: "",
      AfStep10: "",
      FilePic: null,
      FileType: null,
      URLlink: "",
      FromDate1: "",
      ToDate1: "",
      Detail1: "",
      FromDate2: "",
      ToDate2: "",
      Detail2: "",
      FromDate3: "",
      ToDate3: "",
      Detail3: "",
      FromDate4: "",
      ToDate4: "",
      Detail4: "",
      FromDate5: "",
      ToDate5: "",
      Detail5: "",
      Responsible: localStorage.getItem("empNumber"),
      Status: "",
      YearMonth: "",
      NewReqDisplay: "none",
      RequestListDisplay: "block",
      DepDisplay: "none",
      DashDisplay: "none",
      DepAdminDisplay: "block",
      DateSelectDisplay: "none",
      MainAdminDisplay: "block",
      record_table: [],
      count_record: [],
      eventYearMonth: [],
      eventFactory: [],
      eventProcess: [],
      eventCategory: [],
      eventStatus: [],
      dataChartStatus: [],
      dataChartCouCate: [],
      dataChartSumCate: [],
      dataBarCate: [],
      dataStackFac: [],
      CouCategory: 0,
      SumTotalReq: 0,
      CountPercent: 0,
      DateForm: moment().startOf("month").format("YYYY-MM-DD"),
      DateTo: moment().endOf("month").format("YYYY-MM-DD"),
    };
  }
  componentDidMount = () => {
    this.handleOnchang_DocNoPage();
    this.get_TableRecord();
    this.get_DropdownOptions();
    this.fetchData();
    let myCase = localStorage.getItem("levelUser");
    if (myCase == "MainAdmin") {
      this.setState({
        MainAdminDisplay: "",
        AdminDisplay: "",
        UserDisplay: "",
        GuestDisplay: "",
      });
    } else if (myCase == "Admin") {
      this.setState({
        MainAdminDisplay: "none",
        AdminDisplay: "",
        UserDisplay: "",
        GuestDisplay: "",
      });
    } else if (myCase == "User") {
      this.setState({
        MainAdminDisplay: "none",
        AdminDisplay: "none",
        UserDisplay: "",
        GuestDisplay: "",
      });
    } else if (myCase == "Guest") {
      this.setState({
        MainAdminDisplay: "none",
        AdminDisplay: "none",
        UserDisplay: "none",
        GuestDisplay: "",
      });
    }
  };
  loadDashboardData = () => {
    this.ShowSummaryAll();
    this.getChartStatus();
    this.getChartStackFac();
    this.getChartCouCate();
    this.getChartSumCate();
    this.getChartBarCate();
  };
  onChangeDate1 = (date, dateString) => {
    this.setState({ DateForm: dateString }, () => {
      this.updateDateRange(this.state.DateForm, this.state.DateTo);
    });
  };
  onChangeDate2 = (date, dateString) => {
    this.setState({ DateTo: dateString }, () => {
      this.updateDateRange(this.state.DateForm, this.state.DateTo);
    });
  };
  updateDateRange = (DateForm, DateTo) => {
    this.setState({ DateForm: DateForm, DateTo: DateTo }, () => {
      this.ShowSummaryAll();
      this.getChartStatus();
      this.getChartStackFac();
      this.getChartCouCate();
      this.getChartSumCate();
      this.getChartBarCate();
    });
  };
  get_DropdownOptions = async () => {
    try {
      let res = await axios.get(`${BASE_URL}/JobRequest/getFilterOptions`);
      if (res.data.api_result === "ok") {
        const {yearMonthList,factoryList,processList,categoryList,statusList} = res.data.result;
        this.setState({
          eventYearMonth: yearMonthList,
          eventFactory: factoryList,
          eventProcess: processList,
          eventCategory: categoryList,
          eventStatus: statusList,
        });
      }
    } catch (error) {
      console.error("Error fetching dropdown options:", error);
    }
  };
  fetchData = async () => {
    try {
      const { searchTerm, YearMonth, Factory, Process, Category, Status } = this.state;
      let res = await axios.post(`${BASE_URL}/JobRequest/filterWork`, {
        searchTerm,YearMonth,Factory,Process,Category,Status,
      });
      if (res.data.api_result === "ok") {
        this.setState({
          record_table: res.data.result,
          count_record: res.data.result.length,
        });
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  SearchKeywords = (event) => {
    const searchTerm = event.target.value;
    this.setState({ searchTerm }, () => {
      this.fetchData();
    });
  };
  filterData = () => {
    this.fetchData();
  };
  get_TableRecord = () => {
    this.fetchData();
  };
  renderYearMonth = () => {
    return this.state.eventYearMonth?.map((item, index) => (
      <option key={index} value={item.YearMonth}>{item.YearMonth}</option>
    ));
  };
  renderFactory = () => {
    return this.state.eventFactory?.map((item, index) => (
      <option key={index} value={item.Factory}>{item.Factory}</option>
    ));
  };
  renderProcess = () => {
    return this.state.eventProcess?.map((item, index) => (
      <option key={index} value={item.Process}>{item.Process}</option>
    ));
  };
  renderCategory = () => {
    return this.state.eventCategory?.map((item, index) => (
      <option key={index} value={item.Category}>{item.Category}</option>
    ));
  };
  renderStatus = () => {
    return this.state.eventStatus?.map((item, index) => (
      <option key={index} value={item.Status}>{item.Status}</option>
    ));
  };
  getStatusClass = (status) => {
    const baseClass = "px-2 py-0 rounded-full text-xs font-semibold border inline-block";
    const currentStatus = status ? status.trim() : "";
    switch (currentStatus) {
      case "Finished": return `${baseClass} bg-green-100 text-green-700 border-green-200`;
      case "On-Going": return `${baseClass} bg-blue-100 text-blue-700 border-blue-200`;
      case "Waiting": return `${baseClass} bg-yellow-100 text-yellow-700 border-yellow-200`;
      case "Cancelled": return `${baseClass} bg-red-100 text-red-700 border-red-200`;
      default: return `${baseClass} bg-gray-100 text-gray-700 border-gray-200`;
    }
  };
  renderTableRecord = () => {
    try {
      if (this.state.record_table !== null) {
        const myResult = this.state.record_table;
        return myResult.map((item) => (
          <tr key={item.id} style={{ textAlign: "center", fontSize: "13px" }}>
            <td style={{ padding: "5px" }}>{item.Row}</td>
            <td style={{ padding: "5px" }}>{item.DocReq}</td>
            <td style={{ padding: "5px", textAlign: "left" }}>{item.ReqDate}</td>
            <td style={{ padding: "5px", textAlign: "center" }}>{item.Factory}</td>
            <td style={{ padding: "5px", textAlign: "center" }}>{item.Process}</td>
            <td style={{ padding: "5px", textAlign: "center" }}>{item.Category}</td>
            <td className="withprewrap" style={{ padding: "5px", textAlign: "left", minWidth: "100px" }}>{item.ReqTitle}</td>
            <td style={{ padding: "5px", textAlign: "center" }}>{item.ImproveM.toLocaleString()}</td>
            <td className="p-1.5 text-center"><span className={this.getStatusClass(item.Status)}>{item.Status}</span></td>
            <td style={{ padding: "5px", textAlign: "center" }}>{findLatestDate([item.ToDate1,item.ToDate2,item.ToDate3,item.ToDate4,item.ToDate5])}</td>
            <td style={{ padding: "5px", textAlign: "center" }}>
              <Space.Compact>
                <Tooltip title="View File">
                  <Button
                    size="small"
                    style={{ color: "#52c41a", borderColor: "#52c41a" }}
                    icon={<FileZipOutlined />}
                    onClick={(e) => {
                      e.preventDefault();
                      this.viewFile(item.DocReq);
                    }}
                  />
                </Tooltip>
                <Tooltip title="Switch User">
                  <Button
                    size="small"
                    type="outline"
                    style={{ color: "#1677ff", borderColor: "#1677ff" }}
                    icon={<UserSwitchOutlined />}
                    onClick={async (e) => {
                      e.preventDefault();
                      const newState = {
                        NewReqDisplay: "none",
                        RequestListDisplay: "none",
                        DepDisplay: "block",
                        DashDisplay: "none",
                        DepAdminDisplay: "block",
                        DateSelectDisplay: "none",
                        DocReq: item.DocReq,
                        UserReq: item.UserReq,
                        Gmail: item.Gmail,
                        Factory: item.Factory,
                        Process: item.Process,
                        Category: item.Category,
                        ReqTitle: item.ReqTitle,
                        Before: item.Before,
                        After: item.After,
                        ImproveM: item.ImproveM,
                        ReducedY: item.ReducedY,
                        CostDetail: item.CostDetail,
                        BfStep1: item.BfStep1,
                        BfStep2: item.BfStep2,
                        BfStep3: item.BfStep3,
                        BfStep4: item.BfStep4,
                        BfStep5: item.BfStep5,
                        BfStep6: item.BfStep6,
                        BfStep7: item.BfStep8,
                        BfStep9: item.BfStep9,
                        BfStep10: item.BfStep10,
                        AfStep1: item.AfStep1,
                        AfStep2: item.AfStep2,
                        AfStep3: item.AfStep3,
                        AfStep4: item.AfStep4,
                        AfStep5: item.AfStep5,
                        AfStep6: item.AfStep6,
                        AfStep7: item.AfStep7,
                        AfStep8: item.AfStep8,
                        AfStep9: item.AfStep9,
                        AfStep10: item.AfStep10,
                        FromDate1: item.FromDate1,
                        ToDate1: item.ToDate1,
                        Detail1: item.Detail1,
                        FromDate2: item.FromDate2,
                        ToDate2: item.ToDate2,
                        Detail2: item.Detail2,
                        FromDate3: item.FromDate3,
                        ToDate3: item.ToDate3,
                        Detail3: item.Detail3,
                        FromDate4: item.FromDate4,
                        ToDate4: item.ToDate4,
                        Detail4: item.Detail4,
                        FromDate5: item.FromDate5,
                        ToDate5: item.ToDate5,
                        Detail5: item.Detail5,
                        Responsible: localStorage.getItem("empNumber"),
                        Status: item.Status,
                        URLlink: item.URLlink,
                      };
                      await this.setState(newState);
                    }}
                  />
                </Tooltip>
              </Space.Compact>
            </td>
            <td style={{padding: "4px 0px 0px 0px",justifyContent: "center",display: this.state.MainAdminDisplay}}>
              <Tooltip title="Cancel Document">
                <Button
                  size="small"
                  danger
                  icon={<CloseCircleOutlined />}
                  onClick={async (e) => {
                    e.preventDefault();
                    this.CancelledDoc(item.DocReq);
                  }}
                />
              </Tooltip>
            </td>
          </tr>
        ));
      }
    } catch (error) {}
  };
  viewFile = async (DocReq) => {
    try {
      if (DocReq !== null && DocReq !== "") {
        let link1 = await axios.get(`${BASE_URL}` + "/JobRequest/getfilePDF" + `/` + DocReq);
        if (link1.data.message !== NOK) {
          await this.setState({ link1: link1.config.url });
          window.open(link1.config.url, "_blank");
        } else {alert("Do not have file");
        }
      } else {
        alert("Do not have file");
      }
    } catch (error) {}
  };
  handleOnchang_DocNoPage = async () => {
    if (!this.state.DocReq) return;
    const response = await axios.post(`${BASE_URL}` + "/JobRequest/showDocNo", {
      DocReq: this.state.DocReq,
    });
    if (response.data.api_result === "ok") {
      this.setState({ DocReq: response.data.runno });
    } else {
      this.setState({ DocReq: "DX0000001" });
    }
  };
  ShowSummaryAll = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/JobRequest/SummaryAll`, {
        DateForm: this.state.DateForm,DateTo: this.state.DateTo,
      });
      if (response.data?.api_result === "ok") {
        const dataRow = response.data.result?.[0] || {};
        this.setState({
          CouCategory: dataRow.CouCategory ?? 0,
          CountPercent: dataRow.CountPercent ?? 0,
          SumTotalReq: dataRow.SumTotalReq ?? 0,
        });
      }
    } catch (error) {
      console.error("Error fetching summary:", error);
    }
  };
  getChartStatus = async () => {
    let response = await axios.post(`${BASE_URL}/JobRequest/ChartStatus`, {
      DateForm: this.state.DateForm,DateTo: this.state.DateTo,
    });
    if (response.data?.api_result === "ok") {
      this.setState({ dataChartStatus: response.data.result });
    }
  };
  downloadChartStatusCSV = () => {
    const data = this.state.dataChartStatus;
    if (!data || data.length === 0) return;
    let csvContent = "Status,Total\n";
    data.forEach((item) => {
      csvContent += `"${item.Status}",${item.Total}\n`;
    });
    const blob = new Blob(["\ufeff" + csvContent], {
      type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "status_qty_data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  renderStatusDonut = () => {
    var chartData = [];
    var totalSum = 0;
    if (this.state.dataChartStatus !== null) {
      chartData = this.state.dataChartStatus.map((item) => ({
        name: item.Status,
        value: item.Total,
      }));
      totalSum = chartData.reduce((a, b) => a + b.value, 0);
    }
    const option = {
      title: {
        text: "Status (Q'ty)",
        textStyle: { color: "#35a9e4ff", fontSize: 14, fontWeight: "bold" },
        left: "left",
      },
      tooltip: {
        trigger: "item",
        formatter: "{b}: {c} ({d}%)",
      },
      graphic: [
        {
          type: "text",
          left: "center",
          top: "35%",
          style: {
            text: "Total\n" + totalSum.toLocaleString() + "\nItems",
            textAlign: "center",
            fill: "#333",
            fontSize: 14,
            fontWeight: "bold",
            lineHeight: 20,
          },
        },
      ],
      toolbox: {
        feature: {
          dataView: { show: true, readOnly: false, title: "View" },
          saveAsImage: { show: true, title: "Image" },
          myDownload: {
            show: true,
            title: "CSV",
            icon: "path://M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z",
            onclick: () => {
              this.downloadChartStatusCSV();
            },
          },
        },
      },
      legend: {
        orient: "vertical", //horizontal
        bottom: "140",
        right: "right",
        textStyle: { fontSize: 10 },
        itemWidth: 12,
        itemHeight: 12,
      },
      color: ["#747474", "#6595ff", "#79e8a4", "#ff5b5b"],
      series: [
        {
          name: "Status (Q'ty)",
          type: "pie",
          radius: ["45%", "70%"],
          center: ["50%", "45%"],
          avoidLabelOverlap: true,
          label: {
            show: true,
            position: "inside", // แสดง % ภายในแถบสี
            formatter: "{d}%",
            fontSize: 11,
            fontWeight: "bold",
          },
          emphasis: {
            label: { show: false },
          },
          data: chartData,
        },
      ],
    };
    return (
      <div className="content">
        <div className="row" style={{ justifyContent: "left" }}>
          <div id="chart" style={{ width: "350px" }}>
            <ReactECharts
              option={option}
              style={{ height: "260px", width: "100%" }}
              opts={{ renderer: "canvas" }}
            />
          </div>
        </div>
      </div>
    );
  };
  downloadStatusCSV = () => {
    const data = this.state.dataChartStatus;
    if (!data || data.length === 0) return;
    let csvContent = "Status,Total\n";
    data.forEach((item) => {
      csvContent += `"${item.Status}",${item.Total}\n`;
    });
    const blob = new Blob(["\ufeff" + csvContent], {
      type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "requests_status_data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  renderStatusBar = () => {
    var ArrayStatus = [];
    var ArrayTotal = [];
    if (this.state.dataChartStatus !== null) {
      for (var i = 0; i < this.state.dataChartStatus.length; i++) {
        ArrayStatus.push(this.state.dataChartStatus[i].Status);
        ArrayTotal.push(this.state.dataChartStatus[i].Total);
      }
    }
    const option = {
      title: {
        text: "Requests (Q'ty)",
        textStyle: {
          color: "#35A9E7",
          fontSize: 14,
          fontWeight: "bold",
        },
        left: "left",
      },
      tooltip: {
        trigger: "axis",
        axisPointer: { type: "shadow" },
      },
      toolbox: {
        feature: {
          dataView: { show: true, readOnly: false, title: "View" },
          saveAsImage: { show: true, title: "Image" },
          myDownload: {
            show: true,
            title: "CSV",
            icon: "path://M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z",
            onclick: () => {
              this.downloadStatusCSV();
            },
          },
        },
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: {
        type: "category",
        data: ArrayStatus,
        axisLabel: {
          fontSize: 10,
          color: "#120e0e",
        },
      },
      yAxis: {
        type: "value",
        splitArea: {
          show: true,
          areaStyle: {
            color: ["#FCFDFD", "#F5F6F6"],
          },
        },
        axisLabel: {
          formatter: (value) => value.toLocaleString(),
        },
      },
      series: [
        {
          name: "QtyTotal",
          type: "bar",
          barWidth: "60%",
          data: ArrayTotal.map((value, index) => {
            const colors = ["#747474", "#6595ff", "#79e8a4", "#ff5b5b"];
            return {
              value: value,
              itemStyle: {
                color: colors[index % colors.length],
              },
            };
          }),
          label: {
            show: true,
            position: "top",
            color: "#333",
            fontWeight: "bold",
            formatter: (params) => params.value.toLocaleString(),
          },
        },
      ],
    };
    return (
      <div className="content">
        <div className="row" style={{ justifyContent: "left" }}>
          <div id="chart" style={{ width: "340px" }}>
            <ReactECharts
              option={option}
              style={{ height: "220px", width: "100%" }}
              opts={{ renderer: "canvas" }}
            />
          </div>
        </div>
      </div>
    );
  };
  getChartStackFac = async () => {
    let response = await axios.post(`${BASE_URL}/JobRequest/ChartStackFac`, {
      DateForm: this.state.DateForm,DateTo: this.state.DateTo,
    });
    if (response.data?.api_result === "ok") {
      this.setState({ dataStackFac: response.data.result });
    }
  };
  renderChartStack = () => {
    var ArrayFactory = [];
    var ArrayWaiting = [];
    var ArrayOnGoing = [];
    var ArrayFinished = [];
    var ArrayCancelled = [];
    var ArrayTotalPerFactory = [];
    if (this.state.dataStackFac !== null) {
      for (var i = 0; i < this.state.dataStackFac.length; i++) {
        ArrayFactory.push(this.state.dataStackFac[i].Factory);
        ArrayWaiting.push(this.state.dataStackFac[i].Waiting);
        ArrayOnGoing.push(this.state.dataStackFac[i].On_Going);
        ArrayFinished.push(this.state.dataStackFac[i].Finished);
        ArrayCancelled.push(this.state.dataStackFac[i].Cancelled);
        let total =
          (this.state.dataStackFac[i].Waiting || 0) +
          (this.state.dataStackFac[i].On_Going || 0) +
          (this.state.dataStackFac[i].Finished || 0) +
          (this.state.dataStackFac[i].Cancelled || 0);
        ArrayTotalPerFactory.push(total);
      }
    }
    var emphasisStyle = {
      itemStyle: {
        shadowBlur: 10,
        shadowColor: "rgba(0,0,0,0.3)",
      },
    };
    const option = {
      title: {
        text: "Requests Status of each factory (Q'ty)",
        textStyle: { color: "#35a9e4ff", fontSize: 14, fontWeight: "bold" },
        left: "left",
      },
      tooltip: {
        trigger: "axis",
        axisPointer: { type: "shadow" },
      },
      legend: {
        data: ["Waiting", "On-Going", "Finished", "Cancelled"],
        orient: "vertical",
        right: -5,
        top: 50,
        textStyle: {
          fontSize: 10,
        },
      },
      toolbox: {
        feature: {
          magicType: { type: ["stack"], title: { stack: "Stack" } },
          dataView: { show: true, readOnly: false, title: "View" },
          saveAsImage: { show: true, title: "Image" },
          myDownload: {
            show: true,
            title: "CSV",
            icon: "path://M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z",
            onclick: () => {
              this.downloadStackCSV();
            },
          },
        },
      },
      grid: {
        left: "3%",
        right: "12%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: {
        type: "category",
        data: ArrayFactory,
        axisLabel: { fontSize: 10, color: "#120e0e" },
        splitLine: { show: false },
      },
      yAxis: {
        type: "value",
        splitArea: {
          show: true,
          areaStyle: { color: ["#FCFDFD", "#F5F6F6"] },
        },
      },
      color: ["#747474", "#6595ff", "#79e8a4", "#ff5b5b"],
      series: [
        {
          name: "Waiting",
          type: "bar",
          stack: "total",
          emphasis: emphasisStyle,
          data: ArrayWaiting,
          label: {
            show: true,
            position: "inside",
            color: "#fff",
            fontSize: 10,
            formatter: (params) =>
              params.value > 0 ? params.value.toLocaleString() : "",
          },
        },
        {
          name: "On-Going",
          type: "bar",
          stack: "total",
          emphasis: emphasisStyle,
          data: ArrayOnGoing,
          label: {
            show: true,
            position: "inside",
            color: "#fff",
            fontSize: 10,
            formatter: (params) =>
              params.value > 0 ? params.value.toLocaleString() : "",
          },
        },
        {
          name: "Finished",
          type: "bar",
          stack: "total",
          emphasis: emphasisStyle,
          data: ArrayFinished,
          label: {
            show: true,
            position: "inside",
            color: "#fff",
            fontSize: 10,
            formatter: (params) =>
              params.value > 0 ? params.value.toLocaleString() : "",
          },
        },
        {
          name: "Cancelled",
          type: "bar",
          stack: "total",
          emphasis: emphasisStyle,
          data: ArrayCancelled,
          label: {
            show: true,
            position: "inside",
            color: "#fff",
            fontSize: 10,
            formatter: (params) =>
              params.value > 0 ? params.value.toLocaleString() : "",
          },
        },
        {
          name: "Total",
          type: "bar",
          stack: "",
          barGap: "-100%",
          label: {
            show: true,
            position: "top",
            color: "#333",
            fontWeight: "bold",
            fontSize: 12,
            formatter: (params) =>
              params.value > 0 ? params.value.toLocaleString() : "",
          },
          itemStyle: {
            color: "rgba(0,0,0,0)",
          },
          tooltip: { show: false },
          data: ArrayTotalPerFactory,
        },
      ],
    };
    return (
      <div className="content">
        <div className="row" style={{ justifyContent: "left" }}>
          <div id="chart" style={{ width: "710px" }}>
            <ReactECharts
              option={option}
              style={{ height: "213px", width: "100%" }}
              opts={{ renderer: "canvas" }}
            />
          </div>
        </div>
      </div>
    );
  };
  downloadStackCSV = () => {
    const data = this.state.dataStackFac;
    if (!data || data.length === 0) return;
    let csvContent = "Factory,Waiting,On-Going,Finished,Cancelled\n";
    data.forEach((item) => {
      let row = `"${item.Factory}",${item.Waiting},${item.On_Going},${item.Finished},${item.Cancelled}`;
      csvContent += row + "\n";
    });
    const blob = new Blob(["\ufeff" + csvContent], {
      type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "factory_status_stack.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  getChartCouCate = async () => {
    let response = await axios.post(`${BASE_URL}/JobRequest/ChartBarCategory`, {
      DateForm: this.state.DateForm,DateTo: this.state.DateTo,
    });
    if (response.data?.api_result === "ok") {
      this.setState({ dataChartCouCate: response.data.result });
    }
  };
  downloadChartCouCSV = () => {
    const data = this.state.dataChartCouCate;
    if (!data || data.length === 0) return;
    let csvContent = "Category,Total\n";
    data.forEach((item) => {
      csvContent += `"${item.Category}",${item.CouTotal}\n`;
    });
    const blob = new Blob(["\ufeff" + csvContent], {
      type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "total_requests_data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  renderChartCouCate = () => {
    var chartData = [];
    var totalSum = 0;
    if (this.state.dataChartCouCate !== null) {
      chartData = this.state.dataChartCouCate.map((item) => ({
        name: item.Category,
        value: item.CouTotal,
      }));
      totalSum = chartData.reduce((a, b) => a + b.value, 0);
    }
    const option = {
      title: {
        text: "Total Requests",
        textStyle: { color: "#35a9e4ff", fontSize: 14, fontWeight: "bold" },
        left: "left",
      },
      tooltip: {
        trigger: "item",
        formatter: "{b}: {c} ({d}%)",
      },
      graphic: [
        {
          type: "text",
          left: "center",
          top: "35%",
          style: {
            text: "Total\n" + totalSum.toLocaleString() + "\nItems",
            textAlign: "center",
            fill: "#333",
            fontSize: 14,
            fontWeight: "bold",
            lineHeight: 20,
          },
        },
      ],
      toolbox: {
        feature: {
          dataView: { show: true, readOnly: false, title: "View" },
          saveAsImage: { show: true, title: "Image" },
          myDownload: {
            show: true,
            title: "CSV",
            icon: "path://M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z",
            onclick: () => {
              this.downloadChartCouCSV();
            },
          },
        },
      },
      legend: {
        orient: "horizontal",
        bottom: "0",
        left: "center",
        textStyle: { fontSize: 10 },
        itemWidth: 12,
        itemHeight: 12,
      },
      color: ["#747474", "#6595ff", "#79e8a4", "#ff5b5b", "#8e7cc3"],
      series: [
        {
          name: "Total Requests",
          type: "pie",
          radius: ["45%", "70%"],
          center: ["50%", "45%"],
          avoidLabelOverlap: true,
          label: {
            show: true,
            position: "inside", //inside,outside
            fontWeight: "bold",
            formatter: "{d}%",
            fontSize: 11,
          },
          emphasis: {
            label: { show: false },
          },
          data: chartData,
        },
      ],
    };
    return (
      <div className="content">
        <div className="row" style={{ justifyContent: "left" }}>
          <div id="chart" style={{ width: "345px" }}>
            <ReactECharts
              option={option}
              style={{ height: "260px", width: "100%" }}
              opts={{ renderer: "canvas" }}
            />
          </div>
        </div>
      </div>
    );
  };
  getChartSumCate = async () => {
    let response = await axios.post(`${BASE_URL}/JobRequest/ChartBarCategory`, {
      DateForm: this.state.DateForm,DateTo: this.state.DateTo,
    });
    if (response.data?.api_result === "ok") {
      this.setState({ dataChartSumCate: response.data.result });
    }
  };
  downloadChartSumCSV = () => {
    const data = this.state.dataChartSumCate;
    if (!data || data.length === 0) return;
    let csvContent = "Category,Total\n";
    data.forEach((item) => {
      csvContent += `"${item.Category}",${item.SumTotal}\n`;
    });
    const blob = new Blob(["\ufeff" + csvContent], {
      type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "cost_savings_data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  renderChartSumCate = () => {
    var chartData = [];
    var totalSum = 0;
    if (this.state.dataChartSumCate !== null) {
      chartData = this.state.dataChartSumCate.map((item) => ({
        name: item.Category,
        value: item.SumTotal,
      }));
      totalSum = chartData.reduce((a, b) => a + b.value, 0);
    }
    const option = {
      title: {
        text: "Cost Savings (Baht)",
        textStyle: { color: "#35a9e4ff", fontSize: 14, fontWeight: "bold" },
        left: "left",
      },
      tooltip: { trigger: "item", formatter: "{b}: {c} ({d}%)" },
      graphic: [
        {
          type: "text",
          left: "center",
          top: "35%",
          style: {
            text: "Total\n" + totalSum.toLocaleString() + "\nBaht",
            textAlign: "center",
            fill: "#333",
            fontSize: 14,
            fontWeight: "bold",
            lineHeight: 20,
          },
        },
      ],
      toolbox: {
        feature: {
          dataView: { show: true, readOnly: false, title: "View" },
          saveAsImage: { show: true, title: "Image" },
          myDownload: {
            show: true,
            title: "CSV",
            icon: "path://M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z",
            onclick: () => {
              this.downloadChartSumCSV();
            },
          },
        },
      },
      legend: {
        orient: "horizontal",
        bottom: "0",
        left: "center",
        textStyle: { fontSize: 10 },
        itemWidth: 12,
        itemHeight: 12,
      },
      color: ["#747474", "#6595ff", "#79e8a4", "#ff5b5b", "#8e7cc3"],
      series: [
        {
          name: "Cost Savings",
          type: "pie",
          radius: ["45%", "70%"], // ปรับความหนาของ Donut
          center: ["50%", "45%"], // ตำแหน่งศูนย์กลางของวงกลม
          avoidLabelOverlap: true,
          label: {
            show: true,
            position: "inside",
            fontWeight: "bold",
            formatter: "{d}%",
            fontSize: 11,
          },
          emphasis: {
            label: { show: false },
          },
          data: chartData,
        },
      ],
    };
    return (
      <div className="content">
        <div className="row" style={{ justifyContent: "left" }}>
          <div id="chart" style={{ width: "345px" }}>
            <ReactECharts
              option={option}
              style={{ height: "260px", width: "100%" }}
              opts={{ renderer: "canvas" }}
            />
          </div>
        </div>
      </div>
    );
  };
  getChartBarCate = async () => {
    let response = await axios.post(`${BASE_URL}/JobRequest/ChartBarCategory`, {
      DateForm: this.state.DateForm,DateTo: this.state.DateTo,
    });
    if (response.data?.api_result === "ok") {
      this.setState({ dataBarCate: response.data.result });
    }
  };
  downloadCSV = () => {
    const data = this.state.dataBarCate;
    if (!data || data.length === 0) {
      alert("No data to download");
      return;
    }
    let csvContent = "Category,Total Requests(Qty),Total Cost(Baht)\n";
    data.forEach((item) => {
      let row = `"${item.Category}",${item.CouTotal},${item.SumTotal}`;
      csvContent += row + "\n";
    });
    const blob = new Blob(["\ufeff" + csvContent], {
      type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "improve_cost_data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  renderBarCate = () => {
    var ArrayCategory = [];
    var ArrayCouTotal = [];
    var ArraySumTotal = [];
    if (this.state.dataBarCate !== null) {
      for (var i = 0; i < this.state.dataBarCate.length; i++) {
        ArrayCategory.push(this.state.dataBarCate[i].Category);
        ArrayCouTotal.push(this.state.dataBarCate[i].CouTotal);
        ArraySumTotal.push(this.state.dataBarCate[i].SumTotal);
      }
    }
    const option = {
      title: {
        text: "Improve Cost (Baht)",
        textStyle: {
          color: "#35a9e4ff",
          fontSize: 14,
          fontWeight: "bold",
        },
        left: "left",
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "cross",
          crossStyle: { color: "#999" },
        },
      },
      toolbox: {
        feature: {
          dataView: { show: true, readOnly: false, title: "View" },
          saveAsImage: { show: true, title: "Image" },
          myDownload: {
            show: true,
            title: "CSV",
            icon: "path://M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z",
            onclick: () => {
              this.downloadCSV();
            },
          },
        },
      },
      legend: {
        data: ["Total Requests(Q'ty)", "Total Cost(Baht)"],
        orient: "vertical",
        right: 0,
        top: 50,
        textStyle: {
          fontSize: 11,
        },
      },
      grid: {
        left: "3%",
        right: "23%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: [
        {
          type: "category",
          data: ArrayCategory,
          axisPointer: { type: "shadow" },
          axisLabel: {
            fontSize: 6.4,
            color: "#120e0e",
          },
        },
      ],
      yAxis: [
        {
          type: "value",
          name: "Q'ty",
          position: "left",
          splitArea: {
            show: true,
            areaStyle: {
              color: ["#FCFDFD", "#F5F6F6"],
            },
          },
          axisLabel: {
            formatter: (value) => value.toLocaleString(),
          },
        },
        {
          type: "value",
          name: "Baht.",
          position: "right",
          axisLabel: {
            formatter: (value) => value.toLocaleString(),
          },
        },
      ],
      series: [
        {
          name: "Total Requests(Q'ty)",
          type: "bar",
          color: "#7BA4FE",
          label: {
            show: true,
            position: "top",
            formatter: (params) => params.value.toLocaleString(),
          },
          data: ArrayCouTotal,
        },
        {
          name: "Total Cost(Baht)",
          type: "line",
          yAxisIndex: 1,
          color: "#757982",
          smooth: true,
          lineStyle: {
            width: 3,
            type: "dashed",
          },
          label: {
            show: true,
            position: "top",
            formatter: (params) => params.value.toLocaleString(),
          },
          data: ArraySumTotal,
        },
      ],
    };
    return (
      <div className="content">
        <div className="row" style={{ justifyContent: "center" }}>
          <div id="chart" style={{ width: "710px" }}>
            <ReactECharts
              option={option}
              style={{ height: "260px", width: "100%" }}
              opts={{ renderer: "canvas" }}
            />
          </div>
        </div>
      </div>
    );
  };
  SaveJobRequest = async () => {
    if (
      this.state.UserReq === "" ||
      this.state.Gmail === "" ||
      this.state.Factory === "" ||
      this.state.Process === "" ||
      this.state.Category === "" ||
      this.state.ReqTitle === "" ||
      this.state.Before === "" ||
      this.state.After === "" ||
      this.state.CostDetail === ""
    ) {
      await Swal.fire({
        icon: "warning",
        text: "Please input data !",
      });
      return;
    }
    if (this.state.BfStep1 === "" || this.state.AfStep1 === "") {
      await Swal.fire({
        icon: "warning",
        text: "Please input Step !",
      });
      return;
    }
    if (this.state.FilePic === "" || this.state.FilePic === null) {
      await Swal.fire({
        icon: "warning",
        text: "Please input File Referent!",
      });
      return;
    } else {
      const formData = new FormData();
      formData.append("DocReq", this.state.DocReq);
      formData.append("ReqDate", this.state.ReqDate);
      formData.append("ReqTime", moment().format("HH:mm:ss"));
      formData.append("UserReq", this.state.UserReq);
      formData.append("Gmail", this.state.Gmail + "@minebea.co.th");
      formData.append("Factory", this.state.Factory);
      formData.append("Process", this.state.Process);
      formData.append("Category", this.state.Category);
      formData.append("ReqTitle", this.state.ReqTitle);
      formData.append("Before", this.state.Before);
      formData.append("After", this.state.After);
      formData.append(
        "ImproveM",
        this.state.ImproveM
          ? this.state.ImproveM.toString().replace(/,/g, "")
          : ""
      );
      formData.append(
        "ReducedY",
        this.state.ReducedY
          ? this.state.ReducedY.toString().replace(/,/g, "")
          : ""
      );
      formData.append("CostDetail", this.state.CostDetail);
      formData.append("BfStep1", this.state.BfStep1);
      formData.append("BfStep2", this.state.BfStep2);
      formData.append("BfStep3", this.state.BfStep3);
      formData.append("BfStep4", this.state.BfStep4);
      formData.append("BfStep5", this.state.BfStep5);
      formData.append("BfStep6", this.state.BfStep6);
      formData.append("BfStep7", this.state.BfStep7);
      formData.append("BfStep8", this.state.BfStep8);
      formData.append("BfStep9", this.state.BfStep9);
      formData.append("BfStep10", this.state.BfStep10);
      formData.append("AfStep1", this.state.AfStep1);
      formData.append("AfStep2", this.state.AfStep2);
      formData.append("AfStep3", this.state.AfStep3);
      formData.append("AfStep4", this.state.AfStep4);
      formData.append("AfStep5", this.state.AfStep5);
      formData.append("AfStep6", this.state.AfStep6);
      formData.append("AfStep7", this.state.AfStep7);
      formData.append("AfStep8", this.state.AfStep8);
      formData.append("AfStep9", this.state.AfStep9);
      formData.append("AfStep10", this.state.AfStep10);
      if (this.state.FilePic) {
        formData.append("FilePic", this.state.FilePic);
      }
      formData.append("URLlink", this.state.URLlink);
      formData.append("FromDate1", this.state.FromDate1);
      formData.append("ToDate1", this.state.ToDate1);
      formData.append("Detail1", this.state.Detail1);
      formData.append("FromDate2", this.state.FromDate2);
      formData.append("ToDate2", this.state.ToDate2);
      formData.append("Detail2", this.state.Detail2);
      formData.append("FromDate3", this.state.FromDate3);
      formData.append("ToDate3", this.state.ToDate3);
      formData.append("Detail3", this.state.Detail3);
      formData.append("FromDate4", this.state.FromDate4);
      formData.append("ToDate4", this.state.ToDate4);
      formData.append("Detail4", this.state.Detail4);
      formData.append("FromDate5", this.state.FromDate5);
      formData.append("ToDate5", this.state.ToDate5);
      formData.append("Detail5", this.state.Detail5);
      formData.append("Responsible", this.state.Responsible);
      formData.append("Status", "Waiting");
      try {
        let command = await axios.post(
          `${BASE_URL}` + "/JobRequest/insert",
          formData
        );
        this.setState({ record_table: command.data.result });
        if (command.data.api_result === "ok") {
          await Swal.fire({
            icon: "success",
            title: "Complete",
            text: "Save data is complete!",
            showConfirmButton: false,
            timer: 2000,
          });
          window.location.reload();
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
          });
        }
      } catch (error) {
        console.error("Submit error:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to submit data!",
        });
      }
    }
  };
  DevSavedata = async () => {
    let command = await axios.put(`${BASE_URL}` + "/JobRequest/update", {
      DocReq: this.state.DocReq,
      FromDate1: this.state.FromDate1,
      ToDate1: this.state.ToDate1,
      Detail1: this.state.Detail1,
      FromDate2: this.state.FromDate2,
      ToDate2: this.state.ToDate2,
      Detail2: this.state.Detail2,
      FromDate3: this.state.FromDate3,
      ToDate3: this.state.ToDate3,
      Detail3: this.state.Detail3,
      FromDate4: this.state.FromDate4,
      ToDate4: this.state.ToDate4,
      Detail4: this.state.Detail4,
      FromDate5: this.state.FromDate5,
      ToDate5: this.state.ToDate5,
      Detail5: this.state.Detail5,
      Responsible: localStorage.getItem("empNumber"),
      Status: this.state.Status,
      URLlink: this.state.URLlink,
    });
    if (command.data.api_result == "ok") {
      await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, update it!",
      });
      window.location.reload();
    } else {
      Swal.fire({
        icon: "error",
        text: "Something went wrong!",
      });
    }
  };
  CancelledDoc = async (docReqToCancelled) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Cancel it!",
    });
    if (result.isConfirmed) {
      let command = await axios.put(`${BASE_URL}` + "/JobRequest/update", {
        DocReq: docReqToCancelled,
        Status: "Cancelled",
      });
      if (command.data.api_result == "ok") {
        await Swal.fire({
          title: "Canceled!",
          text: "Your request has been successfully canceled.",
          icon: "success",
          timer: 1000,
          showConfirmButton: false,
        });
        this.get_TableRecord();
        this.setState({
          NewReqDisplay: "none",
          RequestListDisplay: "block",
          DepDisplay: "none",
          DashDisplay: "none",
          DepAdminDisplay: "none",
          DateSelectDisplay: "none",
        });
      } else {
        Swal.fire({
          icon: "error",
          text: "Something went wrong! Failed to cancel the request.",
        });
      }
    }
  };
  renderMenu = () => {
    return (
      <div className="flex flex-wrap items-center gap-4 mb-0">
        <Space.Compact>
          <Button
            type={this.state.RequestListDisplay === "default"}
            onClick={() => {
              this.setState({
                NewReqDisplay: "none",
                RequestListDisplay: "block",
                DepDisplay: "none",
                DashDisplay: "none",
                DepAdminDisplay: "none",
                DateSelectDisplay: "none",
              });
            }}
          >
            Request List
          </Button>
          <Button
            type={this.state.NewReqDisplay === "default"}
            onClick={() => {
              this.setState({
                NewReqDisplay: "block",
                RequestListDisplay: "none",
                DepDisplay: "none",
                DashDisplay: "none",
                DepAdminDisplay: "none",
                DateSelectDisplay: "none",
              });
            }}
          >
            Form Request
          </Button>
          <Button
            type={this.state.DashDisplay === "default"}
            onClick={async () => {
              await this.setState({
                NewReqDisplay: "none",
                RequestListDisplay: "none",
                DepDisplay: "none",
                DashDisplay: "block",
                DepAdminDisplay: "none",
                DateSelectDisplay: "block",
              });
              this.loadDashboardData();
            }}
          >
            Dashboard
          </Button>
        </Space.Compact>
        {this.state.DateSelectDisplay === "block" && (
          <div className="flex items-right animate-fade-in">
            <DatePicker
              placeholder="From Date"
              style={{ width: "160px", height: "32px" }}
              value={this.state.DateForm ? dayjs(this.state.DateForm) : null}
              onChange={(date, dateString) => {
                this.setState({ DateForm: dateString }, () => {
                  this.loadDashboardData();
                });
              }}
            />
            <span className="mx-2 text-gray-500">to</span>
            <DatePicker
              placeholder="To Date"
              style={{ width: "160px", height: "32px" }}
              value={this.state.DateTo ? dayjs(this.state.DateTo) : null}
              onChange={(date, dateString) => {
                this.setState({ DateTo: dateString }, () => {
                  this.loadDashboardData();
                });
              }}
            />
          </div>
        )}
        <oi style={{ color: "#ffffff" }}>
          {localStorage.getItem("levelUser")}
        </oi>
      </div>
    );
  };
  renderRequestList = () => {
    const userLevel = localStorage.getItem("levelUser");
    return (
      <Card
        className={`mb-4 shadow-md w-full ${
          this.state.RequestListDisplay === "none" ? "hidden" : "block"
        }`}
        title={
          <span>
            Data List Request &nbsp;
            <span
              style={{ color: "blue" }}
            >{`( ${this.state.count_record} Item )`}</span>
          </span>
        }
      >
        <div className="w-full mb-2">
          <div className="flex flex-wrap items-center space-x-0.5 md:space-x-1">
            <span className="flex-shrink-0 flex items-center">
              <button
                type="text"
                className="text-cent text-black text-sm px-2 py-1 border border-gray-300 bg-blue-100 cursor-default rounded-l-md w-[101px]"
                disabled
              >
                Search by
                <RightCircleOutlined className="ml-1" />
              </button>
            </span>
            <span className="flex-shrink-0 flex items-center">
              <button
                type="text"
                className="text-right text-black text-sm px-2 py-1 border  border-gray-300 bg-blue-100 cursor-default w-[100px]"
                disabled
              >
                Year/Month :
              </button>
            </span>
            <select
              className="text-sm px-2 py-1 border focus:ring-blue-500 focus:border-blue-500 block w-auto max-w-[110px] flex-grow"
              value={this.state.YearMonth}
              onChange={(e) =>
                this.setState({ YearMonth: e.target.value }, this.filterData)
              }
            >
              <option value="">ALL</option>
              {this.renderYearMonth()}
            </select>
            <span className="flex-shrink-0 flex items-center">
              <button
                type="text"
                className="text-right text-black text-sm px-2 py-1 border border-gray-300 bg-blue-100 cursor-default w-[100px]"
                disabled
              >
                Factory :
              </button>
            </span>
            <select
              className="text-sm px-2 py-1 border focus:ring-blue-500 focus:border-blue-500 block w-auto max-w-[110px] flex-grow"
              value={this.state.Factory}
              onChange={(e) =>
                this.setState({ Factory: e.target.value }, this.filterData)
              }
            >
              <option value="">ALL</option>
              {this.renderFactory()}
            </select>
            <span className="flex-shrink-0 flex items-center">
              <button
                type="text"
                className="text-right text-black text-sm px-2 py-1 border border-gray-300 bg-blue-100 cursor-default w-[100px]"
                disabled
              >
                Process :
              </button>
            </span>
            <select
              className="text-sm px-2 py-1 border focus:ring-blue-500 focus:border-blue-500 block w-auto max-w-[150px] flex-grow"
              value={this.state.Process}
              onChange={(e) =>
                this.setState({ Process: e.target.value }, this.filterData)
              }
            >
              <option value="">ALL</option>
              {this.renderProcess()}
            </select>
            <span className="flex-shrink-0 flex items-center">
              <button
                type="text"
                className="text-right text-black text-sm px-2 py-1 border border-gray-300 bg-blue-100 cursor-default w-[100px]"
                disabled
              >
                Category :
              </button>
            </span>
            <select
              className="text-sm px-2 py-1 border focus:ring-blue-500 focus:border-blue-500 block w-auto max-w-[150px] flex-grow"
              value={this.state.Category}
              onChange={(e) =>
                this.setState({ Category: e.target.value }, this.filterData)
              }
            >
              <option value="">ALL</option>
              {this.renderCategory()}
            </select>
            <span className="flex-shrink-0 flex items-center">
              <button
                type="text"
                className="text-right text-black text-sm px-2 py-1 border border-gray-300 bg-blue-100 cursor-default w-[100px]"
                disabled
              >
                Status :
              </button>
            </span>
            <select
              className="text-sm px-2 py-1 border focus:ring-blue-500 focus:border-blue-500 block w-auto max-w-[110px] flex-grow"
              value={this.state.Status}
              onChange={(e) =>
                this.setState({ Status: e.target.value }, this.filterData)
              }
            >
              <option value="">ALL</option>
              {this.renderStatus()}
            </select>
            <span className="flex-shrink-0 flex items-center">
              <button
                type="text"
                className="text-right text-black text-sm px-2 py-1 border border-gray-300 bg-blue-100 cursor-default w-[100px]"
                disabled
              >
                Search :
              </button>
            </span>
            <input
              type="search"
              className="text-sm px-2 py-1 border focus:ring-blue-500 focus:border-blue-500 block w-auto max-w-[110px] flex-grow"
              placeholder="Search"
              value={this.state.searchTerm}
              onChange={(e) => {
                this.setState({ searchTerm: e.target.value }, this.filterData);
              }}
            />
            <span className="flex-shrink-0 flex items-center">
              <button
                type="text"
                className="text-center text-black text-sm py-1 border border-gray-300 bg-blue-100 cursor-default rounded-r-md w-[40px]"
              >
                <CSVLink
                  headers={headers}
                  data={this.state.record_table}
                  className="text-black p-0"
                  filename={
                    "JobRequest" + moment().add(0, "days").format("YYYY-MM-DD")
                  }
                >
                  <DownloadOutlined />
                </CSVLink>
              </button>
            </span>
          </div>
        </div>
        <div
          className="w-full overflow-auto border border-gray-200 rounded-lg"
          style={{ height: "500px" }}
        >
          <table className="min-w-full divide-y divide-gray-200 bg-white text-black text-xs md:text-sm">
            <thead className="sticky top-0 bg-gray-100">
              <tr className="text-center align-middle font-semibold whitespace-nowrap">
                <th className="p-2 border border-gray-300 align-middle">Row</th>
                <th className="p-2 border border-gray-300 align-middle">
                  Doc No
                </th>
                <th className="p-2 border border-gray-300 align-middle">
                  Date
                </th>
                <th className="p-2 border border-gray-300 align-middle">
                  Factory
                </th>
                <th className="p-2 border border-gray-300 align-middle">
                  Process
                </th>
                <th className="p-2 border border-gray-300 align-middle">
                  Category
                </th>
                <th className="p-2 border border-gray-300 align-middle">
                  Detail
                </th>
                <th className="p-2 border border-gray-300">
                  Reduced <br /> Month(฿)
                </th>
                <th className="p-2 border border-gray-300 align-middle">
                  Status
                </th>
                <th className="p-2 border border-gray-300 align-middle">
                  DueDate
                </th>
                <th className="p-2 border border-gray-300 align-middle">
                  File|View
                </th>
                <th
                  className={`p-2 border border-gray-300 align-middle ${
                    this.state.MainAdminDisplay === "none"
                      ? "hidden"
                      : "table-cell"
                  }`}
                >
                  Cancelled
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {this.renderTableRecord()}
            </tbody>
          </table>
        </div>
      </Card>
    );
  };
  renderJobRequest = () => {
    const { beforeCount, afterCount } = this.state;
    return (
      <Card
        style={{ display: this.state.NewReqDisplay }}
        title={
          <span>
            แบบฟอร์มร้องขอเขียนโปรแกรม &nbsp;
            <span
              style={{ color: "blue" }}
            >{`DocNo: ${this.state.DocReq}`}</span>
          </span>
        }
        className="mb-4 shadow-md"
      >
        <div className="w-full overflow-auto rounded-lg">
          <Form
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{
              UserReq: this.state.UserReq,
              Gmail: this.state.Gmail,
              Factory: this.state.Factory,
              Process: this.state.Process,
              Category: this.state.Category,
              ReqTitle: this.state.ReqTitle,
              Before: this.state.Before,
              After: this.state.After,
              ImproveM: this.state.ImproveM,
              ReducedY: this.state.ReducedY,
              CostDetail: this.state.CostDetail,
            }}
          >
            <div className="grid grid-cols-1 md:grid-cols-12">
              <div className="col-span-full md:col-span-3">
                <Form.Item
                  name="UserReq"
                  label="User Request"
                  rules={[
                    { required: true, message: "Please input User Request" },
                  ]}
                >
                  <Input
                    placeholder="Employee No"
                    value={this.state.UserReq}
                    onChange={(e) => {
                      this.setState({
                        UserReq: e.target.value,
                      });
                    }}
                  />
                </Form.Item>
              </div>
              <div className="col-span-full md:col-span-3">
                <Form.Item
                  labelCol={{ span: 8 }}
                  wrapperCol={{ span: 16 }}
                  name="Gmail"
                  label="G-mail"
                  rules={[{ required: true, message: "Please input G-mail" }]}
                  style={{ width: "100%" }}
                >
                  <Input
                    suffix="@minebea.co.th"
                    style={{ width: "100%" }}
                    value={this.state.Gmail}
                    onChange={(e) => {
                      this.setState({
                        Gmail: e.target.value,
                      });
                    }}
                  />
                </Form.Item>
              </div>
              <div className="col-span-full md:col-span-3">
                <Form.Item
                  name="Factory"
                  label="Factory"
                  rules={[{ required: true, message: "Please input Factory" }]}
                >
                  <Select
                    value={this.state.Factory}
                    onChange={(value) => {
                      this.setState({ Factory: value });
                    }}
                  >
                    <Select.Option value="null">-Select-</Select.Option>
                    <Select.Option value="NMB">NMB</Select.Option>
                    <Select.Option value="NAT">NAT</Select.Option>
                    <Select.Option value="NHT">NHT</Select.Option>
                    <Select.Option value="NHB">NHB</Select.Option>
                    <Select.Option value="PELMEC">PELMEC</Select.Option>
                  </Select>
                </Form.Item>
              </div>
              <div className="col-span-full md:col-span-3">
                <Form.Item
                  name="Process"
                  label="Process"
                  rules={[{ required: true, message: "Please input Process" }]}
                >
                  <Select
                    value={this.state.Process}
                    onChange={(value) => {
                      this.setState({
                        Process: value,
                      });
                    }}
                  >
                    <Select.Option value="null">-Select-</Select.Option>
                    <Select.Option value="COLD FORMING">
                      COLD FORMING
                    </Select.Option>
                    <Select.Option value="ROUGH GRINDING">
                      ROUGH GRINDING
                    </Select.Option>
                    <Select.Option value="TURNING">TURNING</Select.Option>
                    <Select.Option value="HEAT TREATMENT">
                      HEAT TREATMENT
                    </Select.Option>
                    <Select.Option value="1ST GRINDING">
                      1ST GRINDING
                    </Select.Option>
                    <Select.Option value="2ND GRINDING">
                      2ND GRINDING
                    </Select.Option>
                    <Select.Option value="WASHING">WASHING</Select.Option>
                    <Select.Option value="AUTO LINE">AUTO LINE</Select.Option>
                    <Select.Option value="MANUAL">MANUAL</Select.Option>
                    <Select.Option value="PACKING">PACKING</Select.Option>
                    <Select.Option value="DESPATCH">DESPATCH</Select.Option>
                    <Select.Option value="PRODUCTION CONTROL">
                      PRODUCTION CONTROL
                    </Select.Option>
                    <Select.Option value="QUALITY CONTROL">
                      QUALITY CONTROL
                    </Select.Option>
                    <Select.Option value="ENGINEER">ENGINEER</Select.Option>
                    <Select.Option value="MAINTENANCE">
                      MAINTENANCE
                    </Select.Option>
                    <Select.Option value="TOOLING">TOOLING</Select.Option>
                    <Select.Option value="STORE">STORE</Select.Option>
                    <Select.Option value="OTHERS">OTHERS</Select.Option>
                  </Select>
                </Form.Item>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-12">
              <div className="col-span-full md:col-span-3">
                <Form.Item
                  name="Category"
                  label="Category"
                  labelCol={{ span: 8 }}
                  wrapperCol={{ span: 16 }}
                  rules={[
                    { required: true, message: "Please select Category" },
                  ]}
                >
                  <Select
                    value={this.state.Category}
                    onChange={(value) => {
                      this.setState({
                        Category: value,
                      });
                    }}
                  >
                    <Select.Option value="null">-Select-</Select.Option>
                    <Select.Option value="Modify M/C Program">
                      Modify M/C Program
                    </Select.Option>
                    <Select.Option value="e-Record">e-Record</Select.Option>
                    <Select.Option value="Dashboard Report">
                      Dashboard Report
                    </Select.Option>
                    <Select.Option value="Auto input AS400">
                      Auto input AS400
                    </Select.Option>
                    <Select.Option value="Other">Other</Select.Option>
                  </Select>
                </Form.Item>
              </div>
              <div className="col-span-full md:col-span-9">
                <Form.Item
                  name="ReqTitle"
                  label="Request Title"
                  labelCol={{ span: 3, offset: 0 }}
                  wrapperCol={{ span: 22 }}
                  style={{ marginLeft: "-2%" }}
                  rules={[
                    { required: true, message: "Please input Request Title" },
                  ]}
                >
                  <Input.TextArea
                    showCount
                    maxLength={150}
                    placeholder="Project Name"
                    value={this.state.ReqTitle}
                    onChange={(e) => {
                      this.setState({
                        ReqTitle: e.target.value,
                      });
                    }}
                  />
                </Form.Item>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-12">
              <div className="col-span-full md:col-span-3">
                <Form.Item
                  name="Before"
                  label="Before"
                  rules={[{ required: true, message: "Please input Before" }]}
                >
                  <Input
                    addonAfter="Bath/Month"
                    value={this.state.Before}
                    onChange={(e) => {
                      const before =
                        parseFloat(e.target.value.replace(/,/g, "")) || 0;
                      const after =
                        parseFloat(
                          (this.state.After || "0").toString().replace(/,/g, "")
                        ) || 0;
                      const improve = before - after;
                      this.setState({
                        Before: e.target.value,
                        ImproveM: improve.toLocaleString(),
                        ReducedY: (improve * 12).toLocaleString(),
                      });
                    }}
                  />
                </Form.Item>
              </div>
              <div className="col-span-full md:col-span-3">
                <Form.Item
                  name="After"
                  label="After"
                  rules={[{ required: true, message: "Please input After" }]}
                >
                  <Input
                    addonAfter="Bath/Month"
                    value={this.state.After}
                    onChange={(e) => {
                      const after =
                        parseFloat(e.target.value.replace(/,/g, "")) || 0;
                      const before =
                        parseFloat(
                          (this.state.Before || "0")
                            .toString()
                            .replace(/,/g, "")
                        ) || 0;
                      const improve = before - after;
                      this.setState({
                        After: e.target.value,
                        ImproveM: improve.toLocaleString(),
                        ReducedY: (improve * 12).toLocaleString(),
                      });
                    }}
                  />
                </Form.Item>
              </div>
              <div className="col-span-full md:col-span-3">
                <Form.Item label="Improve">
                  <Input
                    addonAfter="Bath/Month"
                    value={this.state.ImproveM}
                    readOnly
                  />
                </Form.Item>
              </div>
              <div className="col-span-full md:col-span-3">
                <Form.Item label="Reduced Cost">
                  <Input
                    addonAfter="Bath/Year"
                    value={this.state.ReducedY}
                    readOnly
                  />
                </Form.Item>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-12">
              <div className="col-span-full md:col-span-12">
                <Form.Item
                  name="CostDetail"
                  label="Cost Detail"
                  labelCol={{ span: 2 }}
                  wrapperCol={{ span: 22 }}
                  rules={[
                    { required: true, message: "Please input Cost Detail" },
                  ]}
                >
                  <Input.TextArea
                    showCount
                    maxLength={255}
                    value={this.state.CostDetail}
                    placeholder="Calulate Cost Detail"
                    onChange={(e) => {
                      this.setState({
                        CostDetail: e.target.value,
                      });
                    }}
                  />
                </Form.Item>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-12">
              <div className="col-span-full md:col-span-6">
                <Card
                  type="inner"
                  title={
                    <div style={{ textAlign: "left", fontWeight: "bold" }}>
                      Before
                    </div>
                  }
                >
                  <Form>
                    {Array.from({ length: beforeCount }).map((_, index) => {
                      const fieldName = `BfStep${index + 1}`;
                      return (
                        <Form.Item key={fieldName} label={`Step ${index + 1}`}>
                          <Input
                            placeholder={`Before Step ${index + 1}`}
                            value={this.state[fieldName]}
                            onChange={(e) =>
                              this.setState({ [fieldName]: e.target.value })
                            }
                            style={{ width: "60%" }}
                          />
                          <MinusCircleOutlined
                            style={{ marginLeft: 8 }}
                            onClick={() =>
                              this.setState({
                                beforeCount: beforeCount - 1,
                                [fieldName]: "",
                              })
                            }
                          />
                        </Form.Item>
                      );
                    })}
                    {beforeCount < 10 && (
                      <Form.Item>
                        <Button
                          type="dashed"
                          onClick={() =>
                            this.setState({ beforeCount: beforeCount + 1 })
                          }
                          style={{ width: "60%" }}
                          icon={<PlusOutlined />}
                        >
                          Add field
                        </Button>
                      </Form.Item>
                    )}
                  </Form>
                </Card>
              </div>
              <div className="col-span-full md:col-span-6">
                <Card
                  type="inner"
                  title={
                    <div style={{ textAlign: "left", fontWeight: "bold" }}>
                      After
                    </div>
                  }
                >
                  <Form>
                    {Array.from({ length: afterCount }).map((_, index) => {
                      const fieldName = `AfStep${index + 1}`;
                      return (
                        <Form.Item key={fieldName} label={`Step ${index + 1}`}>
                          <Input
                            placeholder={`After Step ${index + 1}`}
                            value={this.state[fieldName]}
                            onChange={(e) =>
                              this.setState({ [fieldName]: e.target.value })
                            }
                            style={{ width: "60%" }}
                          />
                          <MinusCircleOutlined
                            style={{ marginLeft: 8 }}
                            onClick={() =>
                              this.setState({
                                afterCount: afterCount - 1,
                                [fieldName]: "",
                              })
                            }
                          />
                        </Form.Item>
                      );
                    })}
                    {afterCount < 10 && (
                      <Form.Item>
                        <Button
                          type="dashed"
                          onClick={() =>
                            this.setState({ afterCount: afterCount + 1 })
                          }
                          style={{ width: "60%" }}
                          icon={<PlusOutlined />}
                        >
                          Add field
                        </Button>
                      </Form.Item>
                    )}
                  </Form>
                </Card>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-12 mt-3">
              <div className="col-span-full md:col-span-4 text-left">
                <Form.Item label="Upload File">
                  <input
                    type="file"
                    id="hiddenFileInput"
                    style={{ display: "none" }}
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        this.setState({ FilePic: e.target.files[0] });
                        document.getElementById("chooseDrawing").innerHTML =
                          e.target.files[0].name;
                      }
                    }}
                  />
                  <Button
                    icon={<UploadOutlined />}
                    onClick={() =>
                      document.getElementById("hiddenFileInput").click()
                    }
                  >
                    Upload
                  </Button>
                  <span id="chooseDrawing" style={{ marginLeft: "10px" }}>
                    No file chosen
                  </span>
                </Form.Item>
              </div>
              <div className="col-span-full md:col-span-2">
                <Form.Item>
                  <Button
                    type="primary"
                    onClick={(e) => {
                      e.preventDefault();
                      this.SaveJobRequest();
                    }}
                  >
                    Submit
                  </Button>
                </Form.Item>
              </div>
            </div>
          </Form>
        </div>
      </Card>
    );
  };
  renderDashboard = () => {
    return (
      <Card
        style={{ display: this.state.DashDisplay }}
        className="mb-3 shadow-md overflow-hidden"
        headStyle={{
          backgroundColor: "#DBEAFE",
          textAlign: "center",
          fontSize: "20px",
        }}
        title={
          <span className="font-bold text-black">
            Programmer Job Request Dashboard
          </span>
        }
      >
        <div className="grid grid-cols-3 gap-4 pb-3">
          <div className="col-span-1">
            <div className="h-28 bg-gray-50 p-3 rounded-xl flex flex-col shadow-md">
              <h3 className="text-md font-medium text-gray-600 ml-5 text-left mb-1">
                Total Requests
              </h3>
              <h1 className="text-4xl font-bold text-blue-600 text-center mt-auto">
                {this.state.CouCategory}
              </h1>
            </div>
          </div>
          <div className="col-span-1">
            <div className="h-28 bg-gray-50 p-3 rounded-xl flex flex-col shadow-md">
              <h5 className="text-md font-medium text-gray-600 ml-5 text-left mb-1">
                Total Finished Requests
              </h5>
              <h1 className="text-4xl font-bold text-green-600 text-center mt-auto">
                {this.state.CountPercent}
              </h1>
            </div>
          </div>
          <div className="col-span-1">
            <div className="h-28 bg-gray-50 p-3 rounded-xl flex flex-col shadow-md">
              <h5 className="text-md font-medium text-gray-600 ml-5 text-left mb-1">
                Total Reduced Cost
              </h5>
              <h1 className="text-4xl font-bold text-red-600 text-center mt-auto">
                ฿ {this.state.SumTotalReq.toLocaleString()}
              </h1>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap -mx-2">
          <div className="w-full lg:w-1/2 px-2 mb-2">
            <h4 className="text-lg font-semibold text-gray-800 border-b pb-1 mb-2 text-left">
              📈 Summary By Status
            </h4>
            <div className="flex flex-wrap -mx-1">
              <div className="w-full sm:w-1/2 px-1 mb-2">
                <div className="h-58 bg-gray-50 p-2 rounded-lg shadow-inner">
                  {this.renderStatusDonut()}
                </div>
              </div>
              <div className="w-full sm:w-1/2 px-1 mb-2">
                <div className="h-58 bg-gray-50 p-2 rounded-lg shadow-inner">
                  {this.renderStatusBar()}
                </div>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-1/2 px-2 mb-2">
            <h4 className="text-lg font-semibold text-gray-800 border-b pb-1 mb-2 text-left">
              🏭 Requests Status By Factory
            </h4>
            <div className="h-58 bg-gray-50 p-2 rounded-lg shadow-inner">
              {this.renderChartStack()}
            </div>
          </div>
        </div>
        <div className="flex flex-wrap -mx-2">
          <div className="w-full lg:w-1/2 px-2 mb-2">
            <h4 className="text-lg font-semibold text-gray-800 border-b pb-1 mb-2 text-left">
              📊 Summary By Objective
            </h4>
            <div className="flex flex-wrap -mx-1">
              <div className="w-full sm:w-1/2 px-1 mb-2">
                <div className="h-67 bg-gray-50 p-2 rounded-lg shadow-inner">
                  {this.renderChartCouCate()}
                </div>
              </div>
              <div className="w-full sm:w-1/2 px-1 mb-2">
                <div className="h-67 bg-gray-50 p-2 rounded-lg shadow-inner">
                  {this.renderChartSumCate()}
                </div>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-1/2 px-2 mb-2">
            <h4 className="text-lg font-semibold text-gray-800 border-b pb-1 mb-2 text-left">
              💰 Cost Savings By Objective
            </h4>
            <div className="h-67 bg-gray-50 p-2 rounded-lg shadow-inner">
              {this.renderBarCate()}
            </div>
          </div>
        </div>
      </Card>
    );
  };
  renderProgrammer = () => {
    const userLevel = localStorage.getItem("levelUser");
    return (
      <Card
        style={{ display: this.state.DepDisplay }}
        title={
          <span>
            แบบฟอร์มร้องขอเขียนโปรแกรม &nbsp;
            <span
              style={{ color: "blue" }}
            >{`DocNo: ${this.state.DocReq}`}</span>
          </span>
        }
        className="mb-4 shadow-md"
      >
        <div className="w-full overflow-auto rounded-lg">
          <Form labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
            <div className="grid grid-cols-1 md:grid-cols-12">
              <div className="col-span-full md:col-span-3">
                <Form.Item label="User Request" style={{ margin: 0 }}>
                  <Input value={this.state.UserReq} readOnly />
                </Form.Item>
              </div>
              <div className="col-span-full md:col-span-3">
                <Form.Item
                  labelCol={{ span: 8 }}
                  wrapperCol={{ span: 16 }}
                  label="G-mail"
                  style={{ width: "100%", margin: 0 }}
                >
                  <Input value={this.state.Gmail} readOnly />
                </Form.Item>
              </div>
              <div className="col-span-full md:col-span-3">
                <Form.Item label="Factory" style={{ margin: 0 }}>
                  <Input value={this.state.Factory} readOnly />
                </Form.Item>
              </div>
              <div className="col-span-full md:col-span-3">
                <Form.Item label="Process" style={{ margin: 0 }}>
                  <Input
                    value={this.state.Process}
                    readOnly
                    style={{ margin: "1px 0 5px 0px" }}
                  />
                </Form.Item>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-12">
              <div className="col-span-full md:col-span-3">
                <Form.Item
                  label="Category"
                  labelCol={{ span: 8 }}
                  wrapperCol={{ span: 16 }}
                >
                  <Input value={this.state.Category} readOnly />
                </Form.Item>
              </div>
              <div className="col-span-full md:col-span-9">
                <Form.Item
                  label="Request Title"
                  labelCol={{ flex: "90%", span: 3 }}
                  wrapperCol={{ flex: "auto" }}
                  style={{ margin: "1px 0 6px -18px" }}
                >
                  <Input.TextArea value={this.state.ReqTitle} readOnly />
                </Form.Item>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-12">
              <div className="col-span-full md:col-span-3">
                <Form.Item label="Before" style={{ margin: 0 }}>
                  <Input
                    addonAfter="Bath/Month"
                    value={this.state.Before}
                    readOnly
                  />
                </Form.Item>
              </div>
              <div className="col-span-full md:col-span-3">
                <Form.Item label="After" style={{ margin: 0 }}>
                  <Input
                    addonAfter="Bath/Month"
                    value={this.state.After}
                    readOnly
                  />
                </Form.Item>
              </div>
              <div className="col-span-full md:col-span-3">
                <Form.Item label="Improve" style={{ margin: 0 }}>
                  <Input
                    addonAfter="Bath/Month"
                    value={this.state.ImproveM}
                    readOnly
                  />
                </Form.Item>
              </div>
              <div className="col-span-full md:col-span-3">
                <Form.Item label="Reduced Cost" style={{ margin: 0 }}>
                  <Input
                    addonAfter="Bath/Year"
                    value={this.state.ReducedY}
                    style={{ margin: "1px 0 5px 0px" }}
                    readOnly
                  />
                </Form.Item>
              </div>
            </div>
            <h5 />
            <div className="grid grid-cols-1 md:grid-cols-12">
              <div className="col-span-full md:col-span-12">
                <Form.Item
                  label="Cost Detail"
                  labelCol={{ span: 2 }}
                  wrapperCol={{ span: 22 }}
                  style={{ margin: "1px 0 5px 0px" }}
                >
                  <Input.TextArea value={this.state.CostDetail} readOnly />
                </Form.Item>
              </div>
            </div>
            <h5 />
            <div className="grid grid-cols-1 md:grid-cols-12">
              <div className="col-span-full md:col-span-6">
                <Card
                  type="inner"
                  size="small"
                  title={
                    <div style={{ textAlign: "left", fontWeight: "bold" }}>
                      Before
                    </div>
                  }
                >
                  <Form.Item
                    label="Step 1"
                    labelCol={{ span: 3 }}
                    wrapperCol={{ span: 22 }}
                    style={{ margin: 0 }}
                  >
                    <Input value={this.state.BfStep1} readOnly />
                  </Form.Item>
                  {this.state.BfStep1 && (
                    <Form.Item
                      label="Step 2"
                      labelCol={{ span: 3 }}
                      wrapperCol={{ span: 22 }}
                      style={{ margin: 0 }}
                    >
                      <Input value={this.state.BfStep2} readOnly />
                    </Form.Item>
                  )}
                  {this.state.BfStep2 && (
                    <Form.Item
                      label="Step 3"
                      labelCol={{ span: 3 }}
                      wrapperCol={{ span: 22 }}
                      style={{ margin: 0 }}
                    >
                      <Input value={this.state.BfStep3} readOnly />
                    </Form.Item>
                  )}
                  {this.state.BfStep3 && (
                    <Form.Item
                      label="Step 4"
                      labelCol={{ span: 3 }}
                      wrapperCol={{ span: 22 }}
                      style={{ margin: 0 }}
                    >
                      <Input value={this.state.BfStep4} readOnly />
                    </Form.Item>
                  )}
                  {this.state.BfStep4 && (
                    <Form.Item
                      label="Step 5"
                      labelCol={{ span: 3 }}
                      wrapperCol={{ span: 22 }}
                      style={{ margin: 0 }}
                    >
                      <Input value={this.state.BfStep5} readOnly />
                    </Form.Item>
                  )}
                  {this.state.BfStep5 && (
                    <Form.Item
                      label="Step 6"
                      labelCol={{ span: 3 }}
                      wrapperCol={{ span: 22 }}
                      style={{ margin: 0 }}
                    >
                      <Input value={this.state.BfStep6} readOnly />
                    </Form.Item>
                  )}
                  {this.state.BfStep6 && (
                    <Form.Item
                      label="Step 7"
                      labelCol={{ span: 3 }}
                      wrapperCol={{ span: 22 }}
                      style={{ margin: 0 }}
                    >
                      <Input value={this.state.BfStep7} readOnly />
                    </Form.Item>
                  )}
                  {this.state.BfStep7 && (
                    <Form.Item
                      label="Step 8"
                      labelCol={{ span: 3 }}
                      wrapperCol={{ span: 22 }}
                      style={{ margin: 0 }}
                    >
                      <Input value={this.state.BfStep8} readOnly />
                    </Form.Item>
                  )}
                  {this.state.BfStep8 && (
                    <Form.Item
                      label="Step 9"
                      labelCol={{ span: 3 }}
                      wrapperCol={{ span: 22 }}
                      style={{ margin: 0 }}
                    >
                      <Input value={this.state.BfStep9} readOnly />
                    </Form.Item>
                  )}
                  {this.state.BfStep9 && (
                    <Form.Item
                      label="Step 10"
                      labelCol={{ span: 3 }}
                      wrapperCol={{ span: 22 }}
                      style={{ margin: 0 }}
                    >
                      <Input value={this.state.BfStep10} readOnly />
                    </Form.Item>
                  )}
                </Card>
              </div>
              <div className="col-span-full md:col-span-6">
                <Card
                  type="inner"
                  size="small"
                  title={
                    <div style={{ textAlign: "left", fontWeight: "bold" }}>
                      After
                    </div>
                  }
                >
                  <Form.Item
                    label="Step 1"
                    labelCol={{ span: 3 }}
                    wrapperCol={{ span: 22 }}
                    style={{ margin: 0 }}
                  >
                    <Input value={this.state.AfStep1} readOnly />
                  </Form.Item>
                  {this.state.AfStep1 && (
                    <Form.Item
                      label="Step 2"
                      labelCol={{ span: 3 }}
                      wrapperCol={{ span: 22 }}
                      style={{ margin: 0 }}
                    >
                      <Input value={this.state.AfStep2} readOnly />
                    </Form.Item>
                  )}
                  {this.state.AfStep2 && (
                    <Form.Item
                      label="Step 3"
                      labelCol={{ span: 3 }}
                      wrapperCol={{ span: 22 }}
                      style={{ margin: 0 }}
                    >
                      <Input value={this.state.AfStep3} readOnly />
                    </Form.Item>
                  )}
                  {this.state.AfStep3 && (
                    <Form.Item
                      label="Step 4"
                      labelCol={{ span: 3 }}
                      wrapperCol={{ span: 22 }}
                      style={{ margin: 0 }}
                    >
                      <Input value={this.state.AfStep4} readOnly />
                    </Form.Item>
                  )}
                  {this.state.AfStep4 && (
                    <Form.Item
                      label="Step 5"
                      labelCol={{ span: 3 }}
                      wrapperCol={{ span: 22 }}
                      style={{ margin: 0 }}
                    >
                      <Input value={this.state.AfStep5} readOnly />
                    </Form.Item>
                  )}
                  {this.state.AfStep5 && (
                    <Form.Item
                      label="Step 6"
                      labelCol={{ span: 3 }}
                      wrapperCol={{ span: 22 }}
                      style={{ margin: 0 }}
                    >
                      <Input value={this.state.AfStep6} readOnly />
                    </Form.Item>
                  )}
                  {this.state.AfStep6 && (
                    <Form.Item
                      label="Step 7"
                      labelCol={{ span: 3 }}
                      wrapperCol={{ span: 22 }}
                      style={{ margin: 0 }}
                    >
                      <Input value={this.state.AfStep7} readOnly />
                    </Form.Item>
                  )}
                  {this.state.AfStep7 && (
                    <Form.Item
                      label="Step 8"
                      labelCol={{ span: 3 }}
                      wrapperCol={{ span: 22 }}
                      style={{ margin: 0 }}
                    >
                      <Input value={this.state.AfStep8} readOnly />
                    </Form.Item>
                  )}
                  {this.state.AfStep8 && (
                    <Form.Item
                      label="Step 9"
                      labelCol={{ span: 3 }}
                      wrapperCol={{ span: 22 }}
                      style={{ margin: 0 }}
                    >
                      <Input value={this.state.AfStep9} readOnly />
                    </Form.Item>
                  )}
                  {this.state.AfStep9 && (
                    <Form.Item
                      label="Step 10"
                      labelCol={{ span: 3 }}
                      wrapperCol={{ span: 22 }}
                      style={{ margin: 0 }}
                    >
                      <Input value={this.state.AfStep10} readOnly />
                    </Form.Item>
                  )}
                </Card>
              </div>
            </div>
            <div className="p-0 bg-gray-100">
              <Card
                size="small"
                type="inner"
                title={
                  <span className="font-bold text-gray-700">
                    Action Database | For Programmer
                  </span>
                }
                className="shadow-md"
              >
                <Row
                  gutter={0}
                  className="bg-gray-50 border-b border-gray-200 text-center font-bold"
                >
                  <Col span={2} className="border-r p-1">
                    Item
                  </Col>
                  <Col span={4} className="border-r p-1">
                    From Date
                  </Col>
                  <Col span={4} className="border-r p-1">
                    To Date
                  </Col>
                  <Col span={14} className="p-1 text-left pl-4">
                    Detail
                  </Col>
                </Row>
                <Row
                  gutter={0}
                  className="border-b border-gray-200 items-stretch"
                >
                  <Col
                    span={2}
                    className="flex text-center justify-center bg-gray-50 border-r font-bold"
                  >
                    #1
                  </Col>
                  <Col span={4} className="border-r">
                    <DatePicker
                      variant="borderless"
                      className="w-full"
                      value={
                        this.state.FromDate1
                          ? dayjs(this.state.FromDate1)
                          : null
                      }
                      onChange={(date, dateString) =>
                        this.setState({ FromDate1: dateString })
                      }
                    />
                  </Col>
                  <Col span={4} className="border-r">
                    <DatePicker
                      variant="borderless"
                      className="w-full"
                      value={
                        this.state.ToDate1 ? dayjs(this.state.ToDate1) : null
                      }
                      onChange={(date, dateString) =>
                        this.setState({ ToDate1: dateString })
                      }
                    />
                  </Col>
                  <Col span={14}>
                    <Input
                      variant="borderless"
                      value={this.state.Detail1}
                      onChange={(e) =>
                        this.setState({ Detail1: e.target.value })
                      }
                    />
                  </Col>
                </Row>
                <Row
                  gutter={0}
                  className="border-b border-gray-200 items-stretch"
                >
                  <Col
                    span={2}
                    className="flex text-center justify-center bg-gray-50 border-r font-bold"
                  >
                    #2
                  </Col>
                  <Col span={4} className="border-r">
                    <DatePicker
                      variant="borderless"
                      className="w-full"
                      value={
                        this.state.FromDate2
                          ? dayjs(this.state.FromDate2)
                          : null
                      }
                      onChange={(date, dateString) =>
                        this.setState({ FromDate2: dateString })
                      }
                    />
                  </Col>
                  <Col span={4} className="border-r">
                    <DatePicker
                      variant="borderless"
                      className="w-full"
                      value={
                        this.state.ToDate2 ? dayjs(this.state.ToDate2) : null
                      }
                      onChange={(date, dateString) =>
                        this.setState({ ToDate2: dateString })
                      }
                    />
                  </Col>
                  <Col span={14}>
                    <Input
                      variant="borderless"
                      value={this.state.Detail2}
                      onChange={(e) =>
                        this.setState({ Detail2: e.target.value })
                      }
                    />
                  </Col>
                </Row>
                <Row
                  gutter={0}
                  className="border-b border-gray-200 items-stretch"
                >
                  <Col
                    span={2}
                    className="flex text-center justify-center bg-gray-50 border-r font-bold"
                  >
                    #3
                  </Col>
                  <Col span={4} className="border-r">
                    <DatePicker
                      variant="borderless"
                      className="w-full"
                      value={
                        this.state.FromDate3
                          ? dayjs(this.state.FromDate3)
                          : null
                      }
                      onChange={(date, dateString) =>
                        this.setState({ FromDate3: dateString })
                      }
                    />
                  </Col>
                  <Col span={4} className="border-r">
                    <DatePicker
                      variant="borderless"
                      className="w-full"
                      value={
                        this.state.ToDate3 ? dayjs(this.state.ToDate3) : null
                      }
                      onChange={(date, dateString) =>
                        this.setState({ ToDate3: dateString })
                      }
                    />
                  </Col>
                  <Col span={14}>
                    <Input
                      variant="borderless"
                      value={this.state.Detail3}
                      onChange={(e) =>
                        this.setState({ Detail3: e.target.value })
                      }
                    />
                  </Col>
                </Row>
                <Row
                  gutter={0}
                  className="border-b border-gray-200 items-stretch"
                >
                  <Col
                    span={2}
                    className="flex text-center justify-center bg-gray-50 border-r font-bold"
                  >
                    #4
                  </Col>
                  <Col span={4} className="border-r">
                    <DatePicker
                      variant="borderless"
                      className="w-full"
                      value={
                        this.state.FromDate4
                          ? dayjs(this.state.FromDate4)
                          : null
                      }
                      onChange={(date, dateString) =>
                        this.setState({ FromDate4: dateString })
                      }
                    />
                  </Col>
                  <Col span={4} className="border-r">
                    <DatePicker
                      variant="borderless"
                      className="w-full"
                      value={
                        this.state.ToDate4 ? dayjs(this.state.ToDate4) : null
                      }
                      onChange={(date, dateString) =>
                        this.setState({ ToDate4: dateString })
                      }
                    />
                  </Col>
                  <Col span={14}>
                    <Input
                      variant="borderless"
                      value={this.state.Detail4}
                      onChange={(e) =>
                        this.setState({ Detail4: e.target.value })
                      }
                    />
                  </Col>
                </Row>
                <Row
                  gutter={0}
                  className="border-b border-gray-200 items-stretch"
                >
                  <Col
                    span={2}
                    className="flex text-center justify-center bg-gray-50 border-r font-bold"
                  >
                    #5
                  </Col>
                  <Col span={4} className="border-r">
                    <DatePicker
                      variant="borderless"
                      className="w-full"
                      value={
                        this.state.FromDate5
                          ? dayjs(this.state.FromDate5)
                          : null
                      }
                      onChange={(date, dateString) =>
                        this.setState({ FromDate5: dateString })
                      }
                    />
                  </Col>
                  <Col span={4} className="border-r">
                    <DatePicker
                      variant="borderless"
                      className="w-full"
                      value={
                        this.state.ToDate5 ? dayjs(this.state.ToDate5) : null
                      }
                      onChange={(date, dateString) =>
                        this.setState({ ToDate5: dateString })
                      }
                    />
                  </Col>
                  <Col span={14}>
                    <Input
                      variant="borderless"
                      value={this.state.Detail5}
                      onChange={(e) =>
                        this.setState({ Detail5: e.target.value })
                      }
                    />
                  </Col>
                </Row>
                <div className="mt-1 p-1">
                  <Row gutter={[16, 8]} align="middle">
                    <Col xs={24} md={6}>
                      <div className="flex items-center">
                        <span className="mr-2 font-bold whitespace-nowrap">
                          Action By:
                        </span>
                        <Input
                          value={this.state.Responsible}
                          readOnly
                          className="bg-white"
                        />
                      </div>
                    </Col>
                    <Col xs={24} md={6}>
                      <div className="flex items-center">
                        <span className="mr-2 font-bold whitespace-nowrap">
                          Status:
                        </span>
                        <Select
                          className="w-full"
                          value={this.state.Status}
                          onChange={(value) => this.setState({ Status: value })}
                        >
                          <Select.Option value="null">-Select-</Select.Option>
                          <Select.Option value="Waiting">Waiting</Select.Option>
                          <Select.Option value="On-Going">
                            On-Going
                          </Select.Option>
                          <Select.Option value="Finished">
                            Finished
                          </Select.Option>
                        </Select>
                      </div>
                    </Col>
                    <Col xs={24} md={10}>
                      <div className="flex items-center gap-2">
                        <span className="font-bold whitespace-nowrap">
                          URL:
                        </span>
                        <Input
                          placeholder="Paste link here..."
                          value={this.state.URLlink}
                          onChange={(e) =>
                            this.setState({ URLlink: e.target.value })
                          }
                        />
                        {this.state.MainAdminDisplay === "block" && (
                          <Button
                            type="primary"
                            onClick={() => this.DevSavedata()}
                          >
                            Submit
                          </Button>
                        )}
                      </div>
                    </Col>
                    <Col xs={24} md={2}>
                      <div
                        className="flex items-center gap-2"
                        style={{ display: this.state.MainAdminDisplay }}
                      >
                        <Button
                          type="primary"
                          onClick={(e) => {
                            e.preventDefault();
                            this.DevSavedata();
                          }}
                        >
                          Submit
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </div>
              </Card>
            </div>
          </Form>
        </div>
      </Card>
    );
  };
  render() {
    return (
      <div className="content-wrapper">
        <PageBreadcrumb pageTitle="JOB REQUEST" />
        {this.renderMenu()}
        {this.renderJobRequest()}
        {this.renderRequestList()}
        {this.renderProgrammer()}
        {this.renderDashboard()}
      </div>
    );
  }
}
export default JobRequest;

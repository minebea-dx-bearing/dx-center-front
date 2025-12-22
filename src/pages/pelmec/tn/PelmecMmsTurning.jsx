import { useEffect, useState, useRef } from "react";
import { RotatingLines } from "react-loader-spinner";
import moment from "moment";
import axios from "axios";
import { Autocomplete, TextField, Button, FormControl, InputLabel, ListItemText, MenuItem, OutlinedInput, Select } from "@mui/material";
import { Select as AntDSelect } from "antd";
import Swal from "sweetalert2";
import ReactECharts from "echarts-for-react";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import Checkbox from "@mui/material/Checkbox";
import ToggleButton from "react-bootstrap/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import { AgGridReact } from "ag-grid-react";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DatePicker, Space } from "antd";
import dayjs from "dayjs";

const process = "turning";
const url = "http://pbp143.bp.minebea.local:2221";
// const url = "http://localhost:2221"

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

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

const generateColumnDefs = (baseColumns, sampleData) => {
  const dynamicNames = new Set();

  // รวบรวม name ทั้งหมดจาก nameDurations
  sampleData.forEach((item) => {
    item.nameDurations.forEach((nd) => {
      dynamicNames.add(nd.name);
    });
  });

  const dynamicColumns = Array.from(dynamicNames).map((name) => ({
    headerName: name,
    children: [
      {
        headerName: "Duration",
        field: `${name}_duration`,
        width: 100,
        valueFormatter: (params) => {
          const seconds = Number(params.value);
          if (!seconds || isNaN(seconds)) return "00:00:00";

          const hrs = Math.floor(seconds / 3600);
          const mins = Math.floor((seconds % 3600) / 60);
          const secs = seconds % 60;

          return `${hrs.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
        },
      },
      {
        headerName: "Count",
        field: `${name}_count`,
        width: 80,
        valueFormatter: (params) => (!params.value || isNaN(params.value) ? 0 : params.value.toLocaleString()),
      },
      {
        headerName: "Lose (pcs)",
        field: `${name}_prod_lose`,
        width: 100,
        valueFormatter: (params) => (!params.value || isNaN(params.value) ? 0 : params.value.toLocaleString()),
      },
    ],
  }));

  return [...baseColumns, ...dynamicColumns];
};

const flattenRowData = (rawData) => {
  return rawData.map((item) => {
    const flatItem = { ...item };

    item.nameDurations.forEach((nd) => {
      flatItem[`${nd.name}_duration`] = nd.duration;
      flatItem[`${nd.name}_count`] = nd.count;
      flatItem[`${nd.name}_prod_lose`] = nd.prod_lose;
    });

    return flatItem;
  });
};

export default function PelmecMmsTurning() {
  const gridRef = useRef();
  const [loading, setLoading] = useState(false);

  const [selectStartDate, setSelectStartDate] = useState(dayjs().subtract(7, "day"));
  const [selectEndDate, setSelectEndDate] = useState(dayjs());
  const [selectShift, setSelectShift] = useState([]);
  const [selectMachineTypeGroup, setSelectMachineTypeGroup] = useState([]);
  const [selectMachineType, setSelectMachineType] = useState([]);
  const [selectMachineNo, setSelectMachineNo] = useState([]);

  const [selectStatusAlarm, setSelectStatusAlarm] = useState([]);
  const [selectStatusMachine, setSelectStatusMachine] = useState([]);

  const [selectPercent, setSelectPercent] = useState(0);

  const [itemForSelect, setItemForSelect] = useState([]);
  const [shiftFetch, setShiftFetch] = useState([]);
  const [machineTypeGroupFetch, setMachineTypeGroupFetch] = useState([]);
  const [machineTypeFetch, setMachineTypeFetch] = useState([]);
  const [machineNoFetch, setMachineNoFetch] = useState([]);

  const [statusAlarmFetch, setStatusAlarmFetch] = useState([]);

  const [maxRegistered, setMaxRegistered] = useState();
  const [chartProduction, setChartProduction] = useState({ categories: [], series: [] });
  const [chartNG, setChartNG] = useState({ categories: [], series: [] });
  const [chartOperationRate, setChartOperationRate] = useState({ categories: [], series: [] });
  const [chartCycleTime, setChartCycleTime] = useState({ categories: [], series: [] });

  const [rawChartAlarmTime, setRawChartAlarmTime] = useState({ categories: [], series: [] });
  const [chartAlarmTime, setChartAlarmTime] = useState({ categories: [], series: [] });

  const [rawChartAlarmTimeLose, setRawChartAlarmTimeLose] = useState({ categories: [], series: [] });
  const [chartAlarmTimeLose, setChartAlarmTimeLose] = useState({ categories: [], series: [] });

  const [chartProductionGroup, setChartProductionGroup] = useState({ categories: [], series: [] });
  const [chartNGGroup, setChartNGGroup] = useState({ categories: [], series: [] });
  const [chartOperationRateGroup, setChartOperationRateGroup] = useState({ categories: [], series: [] });
  const [chartCycleTimeGroup, setChartCycleTimeGroup] = useState({ categories: [], series: [] });

  const [chartProductionMonth, setChartProductionMonth] = useState({ categories: [], series: [] });
  const [chartNGMonth, setChartNGMonth] = useState({ categories: [], series: [] });
  const [chartProductionMonthAvg, setChartProductionMonthAvg] = useState({ categories: [], series: [] });
  const [chartNGMonthAvg, setChartNGMonthAvg] = useState({ categories: [], series: [] });
  const [chartOperationRateMonth, setChartOperationRateMonth] = useState({ categories: [], series: [] });
  const [chartCycleTimeMonth, setChartCycleTimeMonth] = useState({ categories: [], series: [] });

  const [rawChartAlarmTimeMonth, setRawChartAlarmTimeMonth] = useState({ categories: [], series: [] });
  const [chartAlarmTimeMonth, setChartAlarmTimeMonth] = useState({ categories: [], series: [] });

  const [rawChartAlarmTimeMonthAvg, setRawChartAlarmTimeMonthAvg] = useState({ categories: [], series: [] });
  const [chartAlarmTimeMonthAvg, setChartAlarmTimeMonthAvg] = useState({ categories: [], series: [] });

  const [rawChartAlarmTimeMonthLose, setRawChartAlarmTimeMonthLose] = useState({ categories: [], series: [] });
  const [chartAlarmTimeMonthLose, setChartAlarmTimeMonthLose] = useState({ categories: [], series: [] });

  const [rawChartAlarmTimeMonthLoseAvg, setRawChartAlarmTimeMonthLoseAvg] = useState({ categories: [], series: [] });
  const [chartAlarmTimeMonthLoseAvg, setChartAlarmTimeMonthLoseAvg] = useState({ categories: [], series: [] });

  const [chartProductionGroupMonth, setChartProductionGroupMonth] = useState({ categories: [], series: [] });
  const [chartNGGroupMonth, setChartNGGroupMonth] = useState({ categories: [], series: [] });
  const [chartProductionGroupMonthAvg, setChartProductionGroupMonthAvg] = useState({ categories: [], series: [] });
  const [chartNGGroupMonthAvg, setChartNGGroupMonthAvg] = useState({ categories: [], series: [] });
  const [chartOperationRateGroupMonth, setChartOperationRateGroupMonth] = useState({ categories: [], series: [] });
  const [chartCycleTimeGroupMonth, setChartCycleTimeGroupMonth] = useState({ categories: [], series: [] });

  const [chartProdMachine, setChartProdMachine] = useState({ categories: [], series: [] });
  const [chartNGMachine, setChartNGMachine] = useState({ categories: [], series: [] });
  const [chartOpnMachine, setChartOpnMachine] = useState({ categories: [], series: [] });
  const [chartCycletimeMachine, setChartCycletimeMachine] = useState({ categories: [], series: [] });

  const [rawChartAlarmTimeMachine, setRawChartAlarmTimeMachine] = useState({ categories: [], series: [] });
  const [chartAlarmTimeMachine, setChartAlarmTimeMachine] = useState({ categories: [], series: [] });

  const [rawChartAlarmTimeMachineLose, setRawChartAlarmTimeMachineLose] = useState({ categories: [], series: [] });
  const [chartAlarmTimeMachineLose, setChartAlarmTimeMachineLose] = useState({ categories: [], series: [] });

  const [tableTotalColumnDefs, setTableTotalColumnDefs] = useState([]);
  const [tableTotalRowData, setTableTotalRowData] = useState([]);

  const [tableTotalDailyColumnDefs, setTableTotalDailyColumnDefs] = useState([]);
  const [tableTotalDailyRowData, setTableTotalDailyRowData] = useState([]);

  const [toggleNG, setToggleNG] = useState("Prod.");
  const [toggleProd, setToggleProd] = useState("Daily");
  const [toggleProdGroup, setToggleProdGroup] = useState("Type");
  const [toggleProdMonthly, setToggleProdMonthly] = useState("Sum");

  const [toggleCt, setToggleCt] = useState("Daily");
  const [toggleCtGroup, setToggleCtGroup] = useState("Type");

  const [toggleAlarmTime, setToggleAlarmTime] = useState("Daily");
  const [toggleAlarmCal, setToggleAlarmCal] = useState("Sum");
  const [toggleAlarmType, setToggleAlarmType] = useState("Time");

  const [toggleOpn, setToggleOpn] = useState("Daily");
  const [toggleOpnGroup, setToggleOpnGroup] = useState("Type");

  const [toggleMachine, setToggleMachine] = useState("Prod.");
  const [toggleMachineAlarmType, setToggleMachineAlarmType] = useState("Time");

  const [toggleTable, setToggleTable] = useState("Day");

  const handleToggleProd = (value) => {
    setToggleProd(value);
  };
  const handleToggleNG = (value) => {
    setToggleNG(value);
  };
  const handleToggleProdMonthly = (value) => {
    setToggleProdMonthly(value);
  };

  const handleToggleAlarmTime = (value) => {
    setToggleAlarmTime(value);
  };
  const handleToggleAlarmTimeCal = (value) => {
    setToggleAlarmCal(value);
  };
  const handleToggleAlarmTimeType = (value) => {
    setToggleAlarmType(value);
  };

  const handleToggleOpn = (value) => {
    setToggleOpn(value);
  };
  const handleToggleCt = (value) => {
    setToggleCt(value);
  };

  const handleToggleProdGroup = (value) => {
    setToggleProdGroup(value);
  };
  const handleToggleOpnGroup = (value) => {
    setToggleOpnGroup(value);
  };
  const handleToggleCtGroup = (value) => {
    setToggleCtGroup(value);
  };

  const handleToggleMachine = (value) => {
    setToggleMachine(value);
  };
  const handleToggleMachineAlarmType = (value) => {
    setToggleMachineAlarmType(value);
  };

  const handleToggleTable = (value) => {
    setToggleTable(value);
  };

  const handleChangeSelectStartDate = (date) => {
    setSelectStartDate(date);
  };
  const handleChangeSelectEndDate = (date) => {
    setSelectEndDate(date);
  };
  const handleChangeShift = (value) => {
    setSelectShift(value);
  };
  const handleChangeMachineTypeGroup = (value) => {
    setSelectMachineTypeGroup(value);
  };
  const handleChangeMachineType = (value) => {
    setSelectMachineType(value);
  };
  const handleChangeMachineNo = (value) => {
    setSelectMachineNo(value);
  };

  const handleChangeStatusAlarm = (event) => {
    const { value } = event.target;
    setSelectStatusAlarm(typeof value === "string" ? value.split(",") : value);
  };

  const handleChangeStatusMachine = (event) => {
    const { value } = event.target;
    setSelectStatusMachine(typeof value === "string" ? value.split(",") : value);
  };

  const exportToExcel = () => {
    if (gridRef.current) {
      gridRef.current.api.exportDataAsCsv({
        fileName: `exported_data_${selectStartDate}_${selectEndDate}.csv`,
        allColumns: true,
        processCellCallback: (params) => {
          const colDef = params.column.getColDef();

          // ใช้ valueFormatter ถ้ามี
          if (colDef.valueFormatter) {
            return colDef.valueFormatter({ value: params.value });
          }

          return params.value;
        },
      });
    }
  };

  const handleClickStatusAlarm = () => {
    if (selectStatusAlarm.length > 0) {
      setSelectStatusAlarm([]);
    } else {
      setSelectStatusAlarm(statusAlarmFetch.filter((item) => !item.includes("RUN")));
    }
  };

  const handleClickStatusMachine = () => {
    if (selectStatusMachine.length > 0) {
      setSelectStatusMachine([]);
    } else {
      setSelectStatusMachine(statusAlarmFetch.filter((item) => !item.includes("RUN")));
    }
  };

  const handleChangeSelectPercent = (value) => {
    setSelectPercent(value);
  };

  const onClickSubmit = () => {
    getData();
  };

  const getDataSelect = async () => {
    try {
      const resultSelect = await axios.post(`${url}/PELMEC_MMS_${process}/select`, {
        startDateQuery: selectStartDate.format("YYYY-MM-DD"),
        endDateQuery: selectEndDate.format("YYYY-MM-DD"),
      });
      if (resultSelect.data.success) {
        setItemForSelect(resultSelect.data.resultSelect);
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
      setLoading(true);
      const resultData = await axios.post(`${url}/PELMEC_MMS_${process}/status`, {
        startDateQuery: selectStartDate.format("YYYY-MM-DD"),
        endDateQuery: selectEndDate.format("YYYY-MM-DD"),
        shiftQuery: selectShift,
        machineTypeGroupQuery: selectMachineTypeGroup,
        machineTypeQuery: selectMachineType,
        machineNoQuery: selectMachineNo,
        percentQuery: selectPercent,
      });
      if (resultData.data.success) {
        setMaxRegistered(resultData.data.maxRegistered);
        setChartProduction(resultData.data.chart_production);
        setChartNG(resultData.data.chart_ng);
        setChartOperationRate(resultData.data.chart_operation_rate);
        setChartCycleTime(resultData.data.chart_cycle_time);

        setRawChartAlarmTime(resultData.data.chart_alarm_time);
        setRawChartAlarmTimeLose(resultData.data.chart_alarm_time_lose);

        setStatusAlarmFetch(resultData.data.chart_alarm_time_lose.series.map((item) => item.name).sort((a, b) => a.localeCompare(b)));
        setSelectStatusAlarm(
          resultData.data.chart_alarm_time_lose.series
            .map((item) => item.name)
            .sort((a, b) => a.localeCompare(b))
            .filter((item) => !item.includes("RUN"))
        );

        setSelectStatusMachine(
          resultData.data.chart_alarm_time_machine_lose.series
            .map((item) => item.name)
            .sort((a, b) => a.localeCompare(b))
            .filter((item) => !item.includes("RUN"))
        );

        setChartProductionGroup(resultData.data.chart_production_group);
        setChartNGGroup(resultData.data.chart_ng_group);
        setChartOperationRateGroup(resultData.data.chart_operation_rate_group);
        setChartCycleTimeGroup(resultData.data.chart_cycle_time_group);

        setChartProductionMonth(resultData.data.chart_production_month);
        setChartNGMonth(resultData.data.chart_ng_month);
        setChartProductionMonthAvg(resultData.data.chart_production_month_avg);
        setChartNGMonthAvg(resultData.data.chart_ng_month_avg);
        setChartOperationRateMonth(resultData.data.chart_operation_rate_month);
        setChartCycleTimeMonth(resultData.data.chart_cycle_time_month);

        setRawChartAlarmTimeMonth(resultData.data.chart_alarm_time_month);
        setRawChartAlarmTimeMonthAvg(resultData.data.chart_alarm_time_month_avg);
        setRawChartAlarmTimeMonthLose(resultData.data.chart_alarm_time_month_lose);
        setRawChartAlarmTimeMonthLoseAvg(resultData.data.chart_alarm_time_month_lose_avg);

        setChartProductionGroupMonth(resultData.data.chart_production_group_month);
        setChartNGGroupMonth(resultData.data.chart_ng_group_month);
        setChartProductionGroupMonthAvg(resultData.data.chart_production_group_month_avg);
        setChartNGGroupMonthAvg(resultData.data.chart_ng_group_month_avg);
        setChartOperationRateGroupMonth(resultData.data.chart_operation_rate_group_month);
        setChartCycleTimeGroupMonth(resultData.data.chart_cycle_time_group_month);

        setChartProdMachine(resultData.data.chart_prod_machine);
        setChartNGMachine(resultData.data.chart_ng_machine);
        setChartOpnMachine(resultData.data.chart_opn_machine);
        setChartCycletimeMachine(resultData.data.chart_cycletime_machine);

        setRawChartAlarmTimeMachine(resultData.data.chart_alarm_time_machine);
        setRawChartAlarmTimeMachineLose(resultData.data.chart_alarm_time_machine_lose);

        // manage tabledata
        setTableTotalRowData(flattenRowData(resultData.data.tableTotal));
        setTableTotalDailyRowData(flattenRowData(resultData.data.tableTotal_daily));

        const baseColumns = [
          { headerName: "Date", field: "date", filter: true, pinned: "left", width: 110 },
          { headerName: "Shift", field: "shift", filter: true, pinned: "left", width: 80 },
          { headerName: "M/C Line", field: "mc_type", filter: true, pinned: "left", width: 110 },
          { headerName: "M/C No.", field: "mc_no", filter: true, pinned: "left", width: 110 },
          { headerName: "Part No.", field: "part_no", filter: true, pinned: "left", width: 200 },
          {
            headerName: "Production (pcs)",
            children: [
              {
                headerName: "Target",
                field: "prod_target",
                filter: true,
                width: 100,
                valueFormatter: (params) => (params.value ? params.value.toLocaleString("en-US") : ""),
              },
              {
                headerName: "Result",
                field: "prod_result",
                filter: true,
                width: 100,
                valueFormatter: (params) => (params.value ? params.value.toLocaleString("en-US") : ""),
              },
              {
                headerName: "Diff",
                field: "prod_diff",
                filter: true,
                width: 100,
                valueFormatter: (params) => (params.value ? params.value.toLocaleString("en-US") : ""),
                cellStyle: (params) => {
                  const value = params.value;
                  if (value == null) return {};
                  if (value > 0) {
                    return { backgroundColor: "#d4edda", color: "#155724" }; // เขียว
                  } else {
                    return { backgroundColor: "#f8d7da", color: "#721c24" }; // แดง
                  }
                },
              },
              {
                headerName: "NG",
                field: "prod_ng",
                filter: true,
                width: 100,
                valueFormatter: (params) => (params.value != null ? params.value.toLocaleString("en-US") : ""),
              },
              {
                headerName: "Yield",
                field: "yield",
                filter: true,
                width: 100,
                valueFormatter: (params) => (params.value != null ? `${params.value.toLocaleString("en-US")}%` : ""),
              },
            ],
          },
          {
            headerName: "C/T (sec)",
            children: [
              {
                headerName: "Target",
                field: "cycle_time_target",
                filter: true,
                width: 100,
                valueFormatter: (params) => (params.value ? params.value.toLocaleString("en-US", { minimumFractionDigits: 2 }) : ""),
              },
              {
                headerName: "Actual",
                field: "cycle_time_actual",
                filter: true,
                width: 100,
                valueFormatter: (params) => (params.value ? params.value.toLocaleString("en-US", { minimumFractionDigits: 2 }) : ""),
              },
              {
                headerName: "Diff",
                field: "cycle_time_diff",
                filter: true,
                width: 100,
                valueFormatter: (params) => (params.value ? params.value.toLocaleString("en-US", { minimumFractionDigits: 2 }) : ""),
                cellStyle: (params) => {
                  const value = params.value;
                  if (value == null) return {};
                  if (value > 0) {
                    return { backgroundColor: "#d4edda", color: "#155724" }; // เขียว
                  } else {
                    return { backgroundColor: "#f8d7da", color: "#721c24" }; // แดง
                  }
                },
              },
            ],
          },
          {
            headerName: "Opn. rate",
            field: "opn_rate",
            width: 110,
            valueFormatter: (params) => (params.value != null ? `${params.value.toFixed(1)}%` : ""),
            filter: true,
            cellStyle: (params) => {
              const value = params.value;
              if (value == null) return {};
              if (value >= 80) {
                return { backgroundColor: "#d4edda", color: "#155724" }; // เขียว
              } else if (value >= 50) {
                return { backgroundColor: "#fff3cd", color: "#856404" }; // เหลือง
              } else {
                return { backgroundColor: "#f8d7da", color: "#721c24" }; // แดง
              }
            },
          },
        ];

        setTableTotalColumnDefs(generateColumnDefs(baseColumns, resultData.data.tableTotal));

        const baseColumnsDaily = [
          { headerName: "Date", field: "date", filter: true, pinned: "left", width: 110 },
          { headerName: "M/C Line", field: "mc_type", filter: true, pinned: "left", width: 110 },
          { headerName: "M/C No.", field: "mc_no", filter: true, pinned: "left", width: 110 },
          { headerName: "Part No.", field: "part_no", filter: true, pinned: "left", width: 200 },
          {
            headerName: "Production (pcs)",
            children: [
              {
                headerName: "Target",
                field: "prod_target",
                filter: true,
                width: 100,
                valueFormatter: (params) => (params.value ? params.value.toLocaleString("en-US") : ""),
              },
              {
                headerName: "Result",
                field: "prod_result",
                filter: true,
                width: 100,
                valueFormatter: (params) => (params.value ? params.value.toLocaleString("en-US") : ""),
              },
              {
                headerName: "Diff",
                field: "prod_diff",
                filter: true,
                width: 100,
                valueFormatter: (params) => (params.value ? params.value.toLocaleString("en-US") : ""),
                cellStyle: (params) => {
                  const value = params.value;
                  if (value == null) return {};
                  if (value > 0) {
                    return { backgroundColor: "#d4edda", color: "#155724" }; // เขียว
                  } else {
                    return { backgroundColor: "#f8d7da", color: "#721c24" }; // แดง
                  }
                },
              },
              {
                headerName: "NG",
                field: "prod_ng",
                filter: true,
                width: 100,
                valueFormatter: (params) => (params.value != null ? params.value.toLocaleString("en-US") : ""),
              },
              {
                headerName: "Yield",
                field: "yield",
                filter: true,
                width: 100,
                valueFormatter: (params) => (params.value != null ? `${params.value.toLocaleString("en-US")}%` : ""),
              },
            ],
          },
          {
            headerName: "C/T (sec)",
            children: [
              {
                headerName: "Target",
                field: "cycle_time_target",
                filter: true,
                width: 100,
                valueFormatter: (params) => (params.value ? params.value.toLocaleString("en-US", { minimumFractionDigits: 2 }) : ""),
              },
              {
                headerName: "Actual",
                field: "cycle_time_actual",
                filter: true,
                width: 100,
                valueFormatter: (params) => (params.value ? params.value.toLocaleString("en-US", { minimumFractionDigits: 2 }) : ""),
              },
              {
                headerName: "Diff",
                field: "cycle_time_diff",
                filter: true,
                width: 100,
                valueFormatter: (params) => (params.value ? params.value.toLocaleString("en-US", { minimumFractionDigits: 2 }) : ""),
                cellStyle: (params) => {
                  const value = params.value;
                  if (value == null) return {};
                  if (value > 0) {
                    return { backgroundColor: "#d4edda", color: "#155724" }; // เขียว
                  } else {
                    return { backgroundColor: "#f8d7da", color: "#721c24" }; // แดง
                  }
                },
              },
            ],
          },
          {
            headerName: "Opn. rate",
            field: "opn_rate",
            width: 110,
            valueFormatter: (params) => (params.value != null ? `${params.value.toFixed(1)}%` : ""),
            filter: true,
            cellStyle: (params) => {
              const value = params.value;
              if (value == null) return {};
              if (value >= 80) {
                return { backgroundColor: "#d4edda", color: "#155724" }; // เขียว
              } else if (value >= 50) {
                return { backgroundColor: "#fff3cd", color: "#856404" }; // เหลือง
              } else {
                return { backgroundColor: "#f8d7da", color: "#721c24" }; // แดง
              }
            },
          },
        ];

        setTableTotalDailyColumnDefs(generateColumnDefs(baseColumnsDaily, resultData.data.tableTotal_daily));
      } else {
        Swal.fire({
          title: resultData.data.message,
          icon: "warning",
        });
      }
    } catch (error) {
      Swal.fire({
        title: error.message,
        icon: "warning",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDataSelect();
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getDataSelect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectStartDate, selectEndDate]);

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectPercent]);

  useEffect(() => {
    if (itemForSelect.length > 0) {
      const shift = [...new Set(itemForSelect.map((item) => item.shift))].sort((a, b) => a.localeCompare(b));
      setShiftFetch(shift);

      const machineTypeGroup = [...new Set(itemForSelect.map((item) => item.mc_type_group))].sort((a, b) => a.localeCompare(b));
      setMachineTypeGroupFetch(machineTypeGroup);

      const machineType = [...new Set(itemForSelect.map((item) => item.mc_type))].sort((a, b) => a.localeCompare(b));
      setMachineTypeFetch(machineType);

      const machineNo = [...new Set(itemForSelect.map((item) => item.mc_no))].sort((a, b) => a.localeCompare(b));
      setMachineNoFetch(machineNo);
    } else {
      setShiftFetch([]);
      setMachineTypeGroupFetch([]);
      setMachineTypeFetch([]);
      setMachineNoFetch([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemForSelect]);

  useEffect(() => {
    const filtered = itemForSelect.filter((item) => selectShift.length === 0 || selectShift.includes(item.shift));

    const machineTypeGroup = [...new Set(filtered.map((item) => item.mc_type_group))].sort((a, b) => a.localeCompare(b));
    setMachineTypeGroupFetch(machineTypeGroup);

    const machineType = [...new Set(filtered.map((item) => item.mc_type))].sort((a, b) => a.localeCompare(b));
    setMachineTypeFetch(machineType);

    const machineNo = [...new Set(filtered.map((item) => item.mc_no))].sort((a, b) => a.localeCompare(b));
    setMachineNoFetch(machineNo);

    setSelectMachineTypeGroup([]);
    setSelectMachineType([]);
    setSelectMachineNo([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectShift]);

  useEffect(() => {
    const filtered = itemForSelect.filter(
      (item) =>
        (selectShift.length === 0 || selectShift.includes(item.shift)) &&
        (selectMachineTypeGroup.length === 0 || selectMachineTypeGroup.includes(item.mc_type_group))
    );

    const machineType = [...new Set(filtered.map((item) => item.mc_type))].sort((a, b) => a.localeCompare(b));
    setMachineTypeFetch(machineType);

    const machineNo = [...new Set(filtered.map((item) => item.mc_no))].sort((a, b) => a.localeCompare(b));
    setMachineNoFetch(machineNo);

    setSelectMachineType([]);
    setSelectMachineNo([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectMachineTypeGroup]);

  useEffect(() => {
    const filtered = itemForSelect.filter(
      (item) =>
        (selectShift.length === 0 || selectShift.includes(item.shift)) &&
        (selectMachineTypeGroup.length === 0 || selectMachineTypeGroup.includes(item.mc_type_group)) &&
        (selectMachineType.length === 0 || selectMachineType.includes(item.mc_type))
    );

    const machineNo = [...new Set(filtered.map((item) => item.mc_no))].sort((a, b) => a.localeCompare(b));
    setMachineNoFetch(machineNo);

    setSelectMachineNo([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectMachineType]);

  useEffect(() => {
    let chartAlarmTimeFilter = { ...rawChartAlarmTime };
    chartAlarmTimeFilter.series = chartAlarmTimeFilter.series.filter((item) => selectStatusAlarm.includes(item.name));
    setChartAlarmTime(chartAlarmTimeFilter);

    let chartAlarmTimeLoseFilter = { ...rawChartAlarmTimeLose };
    chartAlarmTimeLoseFilter.series = chartAlarmTimeLoseFilter.series.filter((item) => selectStatusAlarm.includes(item.name));
    setChartAlarmTimeLose(chartAlarmTimeLoseFilter);

    let chartAlarmTimeMonthFilter = { ...rawChartAlarmTimeMonth };
    chartAlarmTimeMonthFilter.series = chartAlarmTimeMonthFilter.series.filter((item) => selectStatusAlarm.includes(item.name));
    setChartAlarmTimeMonth(chartAlarmTimeMonthFilter);

    let chartAlarmTimeMonthAvgFilter = { ...rawChartAlarmTimeMonthAvg };
    chartAlarmTimeMonthAvgFilter.series = chartAlarmTimeMonthAvgFilter.series.filter((item) => selectStatusAlarm.includes(item.name));
    setChartAlarmTimeMonthAvg(chartAlarmTimeMonthAvgFilter);

    let chartAlarmTimeMonthLoseFilter = { ...rawChartAlarmTimeMonthLose };
    chartAlarmTimeMonthLoseFilter.series = chartAlarmTimeMonthLoseFilter.series.filter((item) => selectStatusAlarm.includes(item.name));
    setChartAlarmTimeMonthLose(chartAlarmTimeMonthLoseFilter);

    let chartAlarmTimeMonthLoseAvgFilter = { ...rawChartAlarmTimeMonthLoseAvg };
    chartAlarmTimeMonthLoseAvgFilter.series = chartAlarmTimeMonthLoseAvgFilter.series.filter((item) => selectStatusAlarm.includes(item.name));
    setChartAlarmTimeMonthLoseAvg(chartAlarmTimeMonthLoseAvgFilter);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectStatusAlarm]);

  useEffect(() => {
    let chartAlarmTimeMachineFilter = { ...rawChartAlarmTimeMachine };
    chartAlarmTimeMachineFilter.series = chartAlarmTimeMachineFilter.series.filter((item) => selectStatusMachine.includes(item.name));
    setChartAlarmTimeMachine(chartAlarmTimeMachineFilter);

    let chartAlarmTimeMachineLoseFilter = { ...rawChartAlarmTimeMachineLose };
    chartAlarmTimeMachineLoseFilter.series = chartAlarmTimeMachineLoseFilter.series.filter((item) => selectStatusMachine.includes(item.name));
    setChartAlarmTimeMachineLose(chartAlarmTimeMachineLoseFilter);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectStatusMachine]);

  return (
    <div>
      {loading ? (
        <div
          className="overlay text-center"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.2)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: "9999",
          }}
        >
          <RotatingLines
            visible={true}
            height="100"
            width="100"
            color="#4fa94d"
            radius="9"
            ariaLabel="rotating-lines-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      ) : (
        ""
      )}

      <div className="container-fluid grid gap-2">
        <div className="d-flex justify-content-between my-1">
          <div>
            <span className="h5">PELMEC : MMS TURNING DASHBOARD</span>
          </div>

          <div className="">Update : {maxRegistered}</div>
        </div>

        <div className="row my-2 justify-content-center">
          <div className="d-flex align-items-center col-auto">
            {/* Start Date */}
            <div className="d-flex align-items-center col-auto px-1">
              <span className="font-medium">Start :</span>
              <DatePicker
                format="YYYY-MM-DD"
                allowClear={false}
                style={{ width: "140px" }}
                value={selectStartDate}
                onChange={handleChangeSelectStartDate}
              />
            </div>

            {/* End Date */}
            <div className="d-flex align-items-center col-auto px-1">
              <span className="font-medium">End :</span>
              <DatePicker
                format="YYYY-MM-DD"
                allowClear={false}
                style={{ width: "140px" }}
                value={selectEndDate}
                onChange={handleChangeSelectEndDate}
              />
            </div>
          </div>

          <div className="d-flex align-items-center col-auto px-1">
            <Autocomplete
              multiple
              id="autocomplete-shift"
              options={shiftFetch}
              disableCloseOnSelect
              renderOption={(props, option, { selected }) => {
                const { key, ...optionProps } = props;
                return (
                  <li key={key} {...optionProps}>
                    <Checkbox icon={icon} checkedIcon={checkedIcon} className="m-0" checked={selected} />
                    {option}
                  </li>
                );
              }}
              value={selectShift}
              onChange={(event, value) => handleChangeShift(value)}
              renderInput={(params) => <TextField {...params} label="Shift" />}
              limitTags={1}
              size="small"
              sx={{
                display: "inline-block",
                "& .MuiInputBase-root": {
                  fontSize: 12,
                  padding: "4px 8px",
                  minWidth: 150,
                  maxWidth: 150,
                  maxHeight: 38,
                  width: "auto",
                  backgroundColor: "white",
                },
                "& .MuiAutocomplete-input": {
                  fontSize: 12,
                },
                "& .MuiAutocomplete-option": {
                  fontSize: 12,
                },
                "& .MuiInputLabel-root": {
                  fontSize: 13,
                },
              }}
            />
          </div>

          <div className="d-flex align-items-center col-auto px-1">
            <Autocomplete
              multiple
              id="autocomplete-machinetypeGroup"
              options={machineTypeGroupFetch}
              disableCloseOnSelect
              renderOption={(props, option, { selected }) => {
                const { key, ...optionProps } = props;
                return (
                  <li key={key} {...optionProps}>
                    <Checkbox icon={icon} checkedIcon={checkedIcon} className="m-0" checked={selected} />
                    {option}
                  </li>
                );
              }}
              value={selectMachineTypeGroup}
              onChange={(event, value) => handleChangeMachineTypeGroup(value)}
              renderInput={(params) => <TextField {...params} label="M/C type" />}
              limitTags={1}
              size="small"
              sx={{
                display: "inline-block",
                "& .MuiInputBase-root": {
                  fontSize: 12,
                  padding: "4px 8px",
                  minWidth: 220,
                  maxWidth: 220,
                  maxHeight: 38,
                  width: "auto",
                  backgroundColor: "white",
                },
                "& .MuiAutocomplete-input": {
                  fontSize: 12,
                },
                "& .MuiAutocomplete-option": {
                  fontSize: 12,
                },
                "& .MuiInputLabel-root": {
                  fontSize: 13,
                },
              }}
            />
          </div>

          <div className="d-flex align-items-center col-auto px-1">
            <Autocomplete
              multiple
              id="autocomplete-machinetype"
              options={machineTypeFetch}
              disableCloseOnSelect
              renderOption={(props, option, { selected }) => {
                const { key, ...optionProps } = props;
                return (
                  <li key={key} {...optionProps}>
                    <Checkbox icon={icon} checkedIcon={checkedIcon} className="m-0" checked={selected} />
                    {option}
                  </li>
                );
              }}
              value={selectMachineType}
              onChange={(event, value) => handleChangeMachineType(value)}
              renderInput={(params) => <TextField {...params} label="M/C Line" />}
              limitTags={1}
              size="small"
              sx={{
                display: "inline-block",
                "& .MuiInputBase-root": {
                  fontSize: 12,
                  padding: "4px 8px",
                  minWidth: 240,
                  maxWidth: 240,
                  maxHeight: 38,
                  width: "auto",
                  backgroundColor: "white",
                },
                "& .MuiAutocomplete-input": {
                  fontSize: 12,
                },
                "& .MuiAutocomplete-option": {
                  fontSize: 12,
                },
                "& .MuiInputLabel-root": {
                  fontSize: 13,
                },
              }}
            />
          </div>

          <div className="d-flex align-items-center col-auto px-1">
            <Autocomplete
              multiple
              id="autocomplete-machineno"
              options={machineNoFetch}
              disableCloseOnSelect
              renderOption={(props, option, { selected }) => {
                const { key, ...optionProps } = props;
                return (
                  <li key={key} {...optionProps}>
                    <Checkbox icon={icon} checkedIcon={checkedIcon} className="m-0" checked={selected} />
                    {option}
                  </li>
                );
              }}
              value={selectMachineNo}
              onChange={(event, value) => handleChangeMachineNo(value)}
              renderInput={(params) => <TextField {...params} label="M/C No." />}
              limitTags={1}
              size="small"
              sx={{
                display: "inline-block",
                "& .MuiInputBase-root": {
                  fontSize: 12,
                  padding: "4px 8px",
                  minWidth: 180,
                  maxWidth: 180,
                  maxHeight: 38,
                  width: "auto",
                  backgroundColor: "white",
                },
                "& .MuiAutocomplete-input": {
                  fontSize: 12,
                },
                "& .MuiAutocomplete-option": {
                  fontSize: 12,
                },
                "& .MuiInputLabel-root": {
                  fontSize: 13,
                },
              }}
            />
          </div>

          <div className="col-auto my-1">
            <button type="button" className="btn btn-primary btn-sm" onClick={onClickSubmit}>
              Submit
            </button>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <div className="card">
              <div className="card-header d-flex justify-content-between">
                <div className="card-title" style={{ fontWeight: 600 }}>
                  Total production daily
                </div>
                <div className="row">
                  <div className="col-auto">
                    <ToggleButtonGroup type="radio" name="toggleNg" defaultValue={"Prod."} onChange={handleToggleNG}>
                      <ToggleButton
                        id="toggleNg-1"
                        variant="outline-secondary"
                        className="mb-0"
                        size="sm"
                        value={"Prod."}
                        style={{ borderRadius: "5px 0 0 5px" }}
                      >
                        Prod.
                      </ToggleButton>
                      <ToggleButton
                        id="toggleNg-2"
                        variant="outline-secondary"
                        className="mb-0"
                        size="sm"
                        value={"NG"}
                        style={{ borderRadius: "0 5px 5px 0" }}
                      >
                        NG
                      </ToggleButton>
                    </ToggleButtonGroup>
                  </div>

                  <div className="col-auto">
                    <ToggleButtonGroup type="radio" name="toggleProdGroup" defaultValue={"Type"} onChange={handleToggleProdGroup}>
                      <ToggleButton
                        id="toggleProdGroup-1"
                        variant="outline-success"
                        className="mb-0"
                        size="sm"
                        value={"Type"}
                        style={{ borderRadius: "5px 0 0 5px" }}
                      >
                        Type
                      </ToggleButton>
                      <ToggleButton
                        id="toggleProdGroup-2"
                        variant="outline-success"
                        className="mb-0"
                        size="sm"
                        value={"Line"}
                        style={{ borderRadius: "0 5px 5px 0" }}
                      >
                        Line
                      </ToggleButton>
                    </ToggleButtonGroup>
                  </div>

                  <div className="col-auto">
                    <ToggleButtonGroup type="radio" name="toggleProd" defaultValue={"Daily"} onChange={handleToggleProd}>
                      <ToggleButton
                        id="toggleProd-1"
                        variant="outline-primary"
                        className="mb-0"
                        size="sm"
                        value={"Daily"}
                        style={{ borderRadius: "5px 0 0 5px" }}
                      >
                        Daily
                      </ToggleButton>
                      <ToggleButton
                        id="toggleProd-2"
                        variant="outline-primary"
                        className="mb-0"
                        size="sm"
                        value={"Monthly"}
                        style={{ borderRadius: "0 5px 5px 0" }}
                      >
                        Monthly
                      </ToggleButton>
                    </ToggleButtonGroup>
                  </div>

                  {toggleProd === "Monthly" ? (
                    <div className="col-auto">
                      <ToggleButtonGroup type="radio" name="toggleProdMonthly" defaultValue={"Sum"} onChange={handleToggleProdMonthly}>
                        <ToggleButton
                          id="toggleProdMonthly-1"
                          variant="outline-warning"
                          className="mb-0"
                          size="sm"
                          value={"Sum"}
                          style={{ borderRadius: "5px 0 0 5px" }}
                        >
                          Sum
                        </ToggleButton>
                        <ToggleButton
                          id="toggleProdMonthly-2"
                          variant="outline-warning"
                          className="mb-0"
                          size="sm"
                          value={"AVG."}
                          style={{ borderRadius: "0 5px 5px 0" }}
                        >
                          AVG.
                        </ToggleButton>
                      </ToggleButtonGroup>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div className="card-body">
                {toggleNG === "Prod." ? (
                  <>
                    {toggleProd === "Daily" ? (
                      <>
                        {toggleProdGroup === "Type" ? (
                          <ReactECharts
                            key={JSON.stringify(chartProductionGroup)}
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
                                data: chartProductionGroup.categories,
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
                                ...chartProductionGroup.series.map((item) => ({
                                  ...item,
                                  label: {
                                    show: item.name === "Capacity" || item.name === "Total" ? true : false,
                                    position: item.name === "Capacity" || item.name === "Total" ? "top" : "",
                                    verticalAlign: "middle",
                                    formatter: (val) => val.data.toLocaleString("en-US", { maximumFractionDigits: 1 }),
                                  },
                                })),
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
                        ) : (
                          ""
                        )}
                        {toggleProdGroup === "Line" ? (
                          <ReactECharts
                            key={JSON.stringify(chartProduction)}
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
                                data: chartProduction.categories,
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
                                ...chartProduction.series.map((item) => ({
                                  ...item,
                                  label: {
                                    show: item.name === "Capacity" || item.name === "Total" ? true : false,
                                    position: item.name === "Capacity" || item.name === "Total" ? "top" : "",
                                    verticalAlign: "middle",
                                    formatter: (val) => val.data.toLocaleString("en-US", { maximumFractionDigits: 1 }),
                                  },
                                })),
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
                        ) : (
                          ""
                        )}
                      </>
                    ) : (
                      ""
                    )}

                    {toggleProd === "Monthly" ? (
                      <>
                        {toggleProdGroup === "Type" ? (
                          <>
                            {toggleProdMonthly === "Sum" ? (
                              <ReactECharts
                                key={JSON.stringify(chartProductionGroupMonth)}
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
                                    data: chartProductionGroupMonth.categories,
                                    axisLabel: {
                                      rotate: 90,
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
                                      end: 100,
                                    },
                                  ],
                                  series: [
                                    ...chartProductionGroupMonth.series.map((item) => ({
                                      ...item,
                                      label: {
                                        show: true,
                                        position: item.name === "Capacity" || item.name === "Total" ? "top" : "",
                                        verticalAlign: "middle",
                                        formatter: (val) => val.data.toLocaleString("en-US", { maximumFractionDigits: 1 }),
                                      },
                                    })),
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
                            ) : (
                              ""
                            )}

                            {toggleProdMonthly === "AVG." ? (
                              <ReactECharts
                                key={JSON.stringify(chartProductionGroupMonthAvg)}
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
                                    data: chartProductionGroupMonthAvg.categories,
                                    axisLabel: {
                                      rotate: 90,
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
                                      end: 100,
                                    },
                                  ],
                                  series: [
                                    ...chartProductionGroupMonthAvg.series.map((item) => ({
                                      ...item,
                                      label: {
                                        show: true,
                                        position: item.name === "Capacity" || item.name === "Total" ? "top" : "",
                                        verticalAlign: "middle",
                                        formatter: (val) => val.data.toLocaleString("en-US", { maximumFractionDigits: 1 }),
                                      },
                                    })),
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
                            ) : (
                              ""
                            )}
                          </>
                        ) : (
                          ""
                        )}
                        {toggleProdGroup === "Line" ? (
                          <>
                            {toggleProdMonthly === "Sum" ? (
                              <ReactECharts
                                key={JSON.stringify(chartProductionMonth)}
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
                                    data: chartProductionMonth.categories,
                                    axisLabel: {
                                      rotate: 90,
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
                                      end: 100,
                                    },
                                  ],
                                  series: [
                                    ...chartProductionMonth.series.map((item) => ({
                                      ...item,
                                      label: {
                                        show: true,
                                        position: item.name === "Capacity" || item.name === "Total" ? "top" : "",
                                        verticalAlign: "middle",
                                        formatter: (val) => val.data.toLocaleString("en-US", { maximumFractionDigits: 1 }),
                                      },
                                    })),
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
                            ) : (
                              ""
                            )}

                            {toggleProdMonthly === "AVG." ? (
                              <ReactECharts
                                key={JSON.stringify(chartProductionMonthAvg)}
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
                                    data: chartProductionMonthAvg.categories,
                                    axisLabel: {
                                      rotate: 90,
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
                                      end: 100,
                                    },
                                  ],
                                  series: [
                                    ...chartProductionMonthAvg.series.map((item) => ({
                                      ...item,
                                      label: {
                                        show: true,
                                        position: item.name === "Capacity" || item.name === "Total" ? "top" : "",
                                        verticalAlign: "middle",
                                        formatter: (val) => val.data.toLocaleString("en-US", { maximumFractionDigits: 1 }),
                                      },
                                    })),
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
                            ) : (
                              ""
                            )}
                          </>
                        ) : (
                          ""
                        )}
                      </>
                    ) : (
                      ""
                    )}
                  </>
                ) : (
                  <>
                    {toggleProd === "Daily" ? (
                      <>
                        {toggleProdGroup === "Type" ? (
                          <ReactECharts
                            key={JSON.stringify(chartNGGroup)}
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
                                data: chartNGGroup.categories,
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
                                ...chartNGGroup.series.map((item) => ({
                                  ...item,
                                  label: {
                                    show: item.name === "Capacity" || item.name === "Total" ? true : false,
                                    position: item.name === "Capacity" || item.name === "Total" ? "top" : "",
                                    verticalAlign: "middle",
                                    formatter: (val) => val.data.toLocaleString("en-US", { maximumFractionDigits: 1 }),
                                  },
                                })),
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
                        ) : (
                          ""
                        )}
                        {toggleProdGroup === "Line" ? (
                          <ReactECharts
                            key={JSON.stringify(chartNG)}
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
                                data: chartNG.categories,
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
                                ...chartNG.series.map((item) => ({
                                  ...item,
                                  label: {
                                    show: item.name === "Capacity" || item.name === "Total" ? true : false,
                                    position: item.name === "Capacity" || item.name === "Total" ? "top" : "",
                                    verticalAlign: "middle",
                                    formatter: (val) => val.data.toLocaleString("en-US", { maximumFractionDigits: 1 }),
                                  },
                                })),
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
                        ) : (
                          ""
                        )}
                      </>
                    ) : (
                      ""
                    )}

                    {toggleProd === "Monthly" ? (
                      <>
                        {toggleProdGroup === "Type" ? (
                          <>
                            {toggleProdMonthly === "Sum" ? (
                              <ReactECharts
                                key={JSON.stringify(chartNGGroupMonth)}
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
                                    data: chartNGGroupMonth.categories,
                                    axisLabel: {
                                      rotate: 90,
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
                                      end: 100,
                                    },
                                  ],
                                  series: [
                                    ...chartNGGroupMonth.series.map((item) => ({
                                      ...item,
                                      label: {
                                        show: true,
                                        position: item.name === "Capacity" || item.name === "Total" ? "top" : "",
                                        verticalAlign: "middle",
                                        formatter: (val) => val.data.toLocaleString("en-US", { maximumFractionDigits: 1 }),
                                      },
                                    })),
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
                            ) : (
                              ""
                            )}

                            {toggleProdMonthly === "AVG." ? (
                              <ReactECharts
                                key={JSON.stringify(chartNGGroupMonthAvg)}
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
                                    data: chartNGGroupMonthAvg.categories,
                                    axisLabel: {
                                      rotate: 90,
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
                                      end: 100,
                                    },
                                  ],
                                  series: [
                                    ...chartNGGroupMonthAvg.series.map((item) => ({
                                      ...item,
                                      label: {
                                        show: true,
                                        position: item.name === "Capacity" || item.name === "Total" ? "top" : "",
                                        verticalAlign: "middle",
                                        formatter: (val) => val.data.toLocaleString("en-US", { maximumFractionDigits: 1 }),
                                      },
                                    })),
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
                            ) : (
                              ""
                            )}
                          </>
                        ) : (
                          ""
                        )}
                        {toggleProdGroup === "Line" ? (
                          <>
                            {toggleProdMonthly === "Sum" ? (
                              <ReactECharts
                                key={JSON.stringify(chartNGMonth)}
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
                                    data: chartNGMonth.categories,
                                    axisLabel: {
                                      rotate: 90,
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
                                      end: 100,
                                    },
                                  ],
                                  series: [
                                    ...chartNGMonth.series.map((item) => ({
                                      ...item,
                                      label: {
                                        show: true,
                                        position: item.name === "Capacity" || item.name === "Total" ? "top" : "",
                                        verticalAlign: "middle",
                                        formatter: (val) => val.data.toLocaleString("en-US", { maximumFractionDigits: 1 }),
                                      },
                                    })),
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
                            ) : (
                              ""
                            )}

                            {toggleProdMonthly === "AVG." ? (
                              <ReactECharts
                                key={JSON.stringify(chartNGMonthAvg)}
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
                                    data: chartNGMonthAvg.categories,
                                    axisLabel: {
                                      rotate: 90,
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
                                      end: 100,
                                    },
                                  ],
                                  series: [
                                    ...chartNGMonthAvg.series.map((item) => ({
                                      ...item,
                                      label: {
                                        show: true,
                                        position: item.name === "Capacity" || item.name === "Total" ? "top" : "",
                                        verticalAlign: "middle",
                                        formatter: (val) => val.data.toLocaleString("en-US", { maximumFractionDigits: 1 }),
                                      },
                                    })),
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
                            ) : (
                              ""
                            )}
                          </>
                        ) : (
                          ""
                        )}
                      </>
                    ) : (
                      ""
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <div className="card">
              <div className="card-header d-flex align-items-center justify-content-between">
                <div className="card-title" style={{ fontWeight: 600 }}>
                  Chart alarm time
                </div>
                <div className="mx-auto row">
                  <div className="col">
                    <FormControl sx={{ ml: 2, width: 300 }}>
                      <InputLabel
                        id="demo-multiple-checkbox-label"
                        style={{ fontSize: "14px" }}
                        sx={selectStatusAlarm.length > 0 ? {} : { top: "-6px" }}
                      >
                        Status Alarm
                      </InputLabel>
                      <Select
                        labelId="demo-multiple-checkbox-label"
                        id="demo-multiple-checkbox"
                        multiple
                        size="small"
                        value={selectStatusAlarm}
                        onChange={handleChangeStatusAlarm}
                        input={<OutlinedInput label="Status Alarm" />}
                        renderValue={(selected) => selected.join(", ")}
                      >
                        {statusAlarmFetch.map((item) => (
                          <MenuItem key={item} value={item}>
                            <Checkbox checked={selectStatusAlarm.includes(item)} />
                            <ListItemText primary={item} />
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                  <div className="col">
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<FontAwesomeIcon icon={selectStatusAlarm.length > 0 ? faXmark : faCheck} />}
                      color={selectStatusAlarm.length > 0 ? "warning" : "secondary"}
                      style={{ height: "100%" }}
                      onClick={handleClickStatusAlarm}
                    >
                      {selectStatusAlarm.length > 0 ? "Clear all" : "Select all"}
                    </Button>
                  </div>
                </div>
                <div className="card-tools">
                  <div className="row">
                    {toggleAlarmTime === "Monthly" ? (
                      <div className="col-auto">
                        <ToggleButtonGroup type="radio" name="toggleAlarmTimeCal" defaultValue={"Sum"} onChange={handleToggleAlarmTimeCal}>
                          <ToggleButton
                            id="toggleAlarmTimeCal-1"
                            variant="outline-warning"
                            className="mb-0"
                            size="sm"
                            value={"Sum"}
                            style={{ borderRadius: "5px 0 0 5px" }}
                          >
                            Sum
                          </ToggleButton>
                          <ToggleButton
                            id="toggleAlarmTimeCal-2"
                            variant="outline-warning"
                            className="mb-0"
                            size="sm"
                            value={"AVG."}
                            style={{ borderRadius: "0 5px 5px 0" }}
                          >
                            AVG.
                          </ToggleButton>
                        </ToggleButtonGroup>
                      </div>
                    ) : (
                      ""
                    )}
                    <div className="col-auto">
                      <ToggleButtonGroup type="radio" name="toggleAlarmTimeType" defaultValue={"Time"} onChange={handleToggleAlarmTimeType}>
                        <ToggleButton
                          id="toggleAlarmTimeType-1"
                          variant="outline-info"
                          className="mb-0"
                          size="sm"
                          value={"Time"}
                          style={{ borderRadius: "5px 0 0 5px" }}
                        >
                          Time
                        </ToggleButton>
                        <ToggleButton
                          id="toggleAlarmTimeType-2"
                          variant="outline-info"
                          className="mb-0"
                          size="sm"
                          value={"Prod."}
                          style={{ borderRadius: "0 5px 5px 0" }}
                        >
                          Prod.
                        </ToggleButton>
                      </ToggleButtonGroup>
                    </div>
                    <div className="col-auto">
                      <ToggleButtonGroup type="radio" name="toggleAlarmTime" defaultValue={"Daily"} onChange={handleToggleAlarmTime}>
                        <ToggleButton
                          id="toggleAlarmTime-1"
                          variant="outline-primary"
                          className="mb-0"
                          size="sm"
                          value={"Daily"}
                          style={{ borderRadius: "5px 0 0 5px" }}
                        >
                          Daily
                        </ToggleButton>
                        <ToggleButton
                          id="toggleAlarmTime-2"
                          variant="outline-primary"
                          className="mb-0"
                          size="sm"
                          value={"Monthly"}
                          style={{ borderRadius: "0 5px 5px 0" }}
                        >
                          Monthly
                        </ToggleButton>
                      </ToggleButtonGroup>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-body">
                {toggleAlarmTime === "Daily" ? (
                  <>
                    {toggleAlarmType === "Time" ? (
                      <ReactECharts
                        key={JSON.stringify(chartAlarmTime)}
                        option={{
                          tooltip: {
                            trigger: "item",
                            formatter: (params) => {
                              return `${params.seriesName}<br/>${params.name} : ${formatSecondsToHHMMSS(params.value)}`;
                            },
                          },
                          legend: {
                            type: "scroll",
                            orient: "vertical",
                            right: 10,
                            top: "center",
                            selectedMode: false,
                          },
                          xAxis: {
                            type: "category",
                            data: chartAlarmTime.categories,
                            axisLabel: {
                              rotate: 90,
                              formatter: (val) => moment(val).format("DD-MMM"),
                            },
                          },
                          yAxis: {
                            type: "value",
                            axisLabel: {
                              formatter: (val) => {
                                return `${formatSecondsToHHMMSS(val)} hrs`;
                              },
                            },
                          },
                          color: chartAlarmTime.series.map((item) => item.color),
                          dataZoom: [
                            {
                              type: "slider",
                              show: true,
                              xAxisIndex: 0,
                              start: 0,
                              end: 100,
                            },
                          ],
                          series: [
                            ...chartAlarmTime.series.map((item) => ({
                              ...item,
                            })),
                            {
                              name: "Total",
                              type: "scatter",
                              symbolSize: 0,
                              label: {
                                show: true,
                                position: "top",
                                color: "black",
                                formatter: (val) => {
                                  return formatSecondsToHHMMSS(val.data);
                                },
                              },
                              data: chartAlarmTime.categories.map((_, index) => {
                                return chartAlarmTime.series.reduce((sum, seriesItem) => {
                                  const val = seriesItem.data[index];
                                  return sum + (typeof val === "number" ? val : 0);
                                }, 0);
                              }),
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
                    ) : (
                      ""
                    )}

                    {toggleAlarmType === "Prod." ? (
                      <ReactECharts
                        key={JSON.stringify(chartAlarmTimeLose)}
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
                            data: chartAlarmTimeLose.categories,
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
                              end: 100,
                            },
                          ],
                          series: [
                            ...chartAlarmTimeLose.series.map((item) => ({
                              ...item,
                            })),
                            {
                              name: "Total",
                              type: "scatter",
                              symbolSize: 0,
                              label: {
                                show: true,
                                position: "top",
                                color: "black",
                                formatter: (val) => val.data.toLocaleString("en-US", { maximumFractionDigits: 1 }),
                              },
                              data: chartAlarmTimeLose.categories.map((_, index) => {
                                return chartAlarmTimeLose.series.reduce((sum, seriesItem) => {
                                  const val = seriesItem.data[index];
                                  return sum + (typeof val === "number" ? val : 0);
                                }, 0);
                              }),
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
                    ) : (
                      ""
                    )}
                  </>
                ) : (
                  ""
                )}

                {toggleAlarmTime === "Monthly" ? (
                  <>
                    {toggleAlarmType === "Time" ? (
                      <>
                        {toggleAlarmCal === "Sum" ? (
                          <ReactECharts
                            key={JSON.stringify(chartAlarmTimeMonth)}
                            option={{
                              tooltip: {
                                trigger: "item",
                                formatter: (params) => {
                                  return `${params.seriesName}<br/>${params.name} : ${formatSecondsToHHMMSS(params.value)}`;
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
                                data: chartAlarmTimeMonth.categories,
                                axisLabel: {
                                  rotate: 90,
                                },
                              },
                              yAxis: {
                                type: "value",
                                axisLabel: {
                                  formatter: (val) => {
                                    return `${formatSecondsToHHMMSS(val)} hrs`;
                                  },
                                },
                              },
                              color: chartAlarmTime.series.map((item) => item.color),
                              dataZoom: [
                                {
                                  type: "slider",
                                  show: true,
                                  xAxisIndex: 0,
                                  start: 0,
                                  end: 100,
                                },
                              ],
                              series: [
                                ...chartAlarmTimeMonth.series.map((item) => ({
                                  ...item,
                                })),
                                {
                                  name: "Total",
                                  type: "scatter",
                                  symbolSize: 0,
                                  label: {
                                    show: true,
                                    position: "top",
                                    color: "black",
                                    formatter: (val) => {
                                      return formatSecondsToHHMMSS(val.data);
                                    },
                                  },
                                  data: chartAlarmTimeMonth.categories.map((_, index) => {
                                    return chartAlarmTimeMonth.series.reduce((sum, seriesItem) => {
                                      const val = seriesItem.data[index];
                                      return sum + (typeof val === "number" ? val : 0);
                                    }, 0);
                                  }),
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
                        ) : (
                          ""
                        )}

                        {toggleAlarmCal === "AVG." ? (
                          <ReactECharts
                            key={JSON.stringify(chartAlarmTimeMonthAvg)}
                            option={{
                              tooltip: {
                                trigger: "item",
                                formatter: function (params) {
                                  const val = Number(params.value);
                                  const h = Math.floor(val / 3600);
                                  const m = Math.floor((val % 3600) / 60);
                                  const s = val % 60;
                                  const hhmmss = `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
                                  return `${params.seriesName}<br/>${params.name} : ${hhmmss}`;
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
                                data: chartAlarmTimeMonthAvg.categories,
                                axisLabel: {
                                  rotate: 90,
                                },
                              },
                              yAxis: {
                                type: "value",
                                axisLabel: {
                                  formatter: (val) => {
                                    const totalSeconds = Number(val);
                                    const hours = Math.floor(totalSeconds / 3600);
                                    return `${hours.toString().padStart(2, "0")}hrs`;
                                  },
                                },
                              },
                              dataZoom: [
                                {
                                  type: "slider",
                                  show: true,
                                  xAxisIndex: 0,
                                  start: 0,
                                  end: 100,
                                },
                              ],
                              series: [
                                ...chartAlarmTimeMonthAvg.series.map((item) => ({
                                  ...item,
                                })),
                                {
                                  name: "Total",
                                  type: "scatter",
                                  symbolSize: 0,
                                  label: {
                                    show: true,
                                    position: "top",
                                    color: "black",
                                    formatter: (val) => {
                                      const totalSeconds = Number(val.data);
                                      const hours = Math.floor(totalSeconds / 3600);
                                      const minutes = Math.floor((totalSeconds % 3600) / 60);
                                      return `${hours.toString().padStart(1, "0")}:${minutes.toString().padStart(2, "0")}`;
                                    },
                                  },
                                  data: chartAlarmTimeMonthAvg.categories.map((_, index) => {
                                    return chartAlarmTimeMonthAvg.series.reduce((sum, seriesItem) => {
                                      const val = seriesItem.data[index];
                                      return sum + (typeof val === "number" ? val : 0);
                                    }, 0);
                                  }),
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
                        ) : (
                          ""
                        )}
                      </>
                    ) : (
                      ""
                    )}
                    {toggleAlarmType === "Prod." ? (
                      <>
                        {toggleAlarmCal === "Sum" ? (
                          <ReactECharts
                            key={JSON.stringify(chartAlarmTimeMonthLose)}
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
                                data: chartAlarmTimeMonthLose.categories,
                                axisLabel: {
                                  rotate: 90,
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
                                  end: 100,
                                },
                              ],
                              series: [
                                ...chartAlarmTimeMonthLose.series.map((item) => ({
                                  ...item,
                                })),
                                {
                                  name: "Total",
                                  type: "scatter",
                                  symbolSize: 0,
                                  label: {
                                    show: true,
                                    position: "top",
                                    color: "black",
                                    formatter: (val) => val.data.toLocaleString("en-US", { maximumFractionDigits: 1 }),
                                  },
                                  data: chartAlarmTimeMonthLose.categories.map((_, index) => {
                                    return chartAlarmTimeMonthLose.series.reduce((sum, seriesItem) => {
                                      const val = seriesItem.data[index];
                                      return sum + (typeof val === "number" ? val : 0);
                                    }, 0);
                                  }),
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
                        ) : (
                          ""
                        )}
                        {toggleAlarmCal === "AVG." ? (
                          <ReactECharts
                            key={JSON.stringify(chartAlarmTimeMonthLoseAvg)}
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
                                data: chartAlarmTimeMonthLoseAvg.categories,
                                axisLabel: {
                                  rotate: 90,
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
                                  end: 100,
                                },
                              ],
                              series: [
                                ...chartAlarmTimeMonthLoseAvg.series.map((item) => ({
                                  ...item,
                                })),
                                {
                                  name: "Total",
                                  type: "scatter",
                                  symbolSize: 0,
                                  label: {
                                    show: true,
                                    position: "top",
                                    color: "black",
                                    formatter: (val) => val.data.toLocaleString("en-US", { maximumFractionDigits: 1 }),
                                  },
                                  data: chartAlarmTimeMonthLoseAvg.categories.map((_, index) => {
                                    return chartAlarmTimeMonthLoseAvg.series.reduce((sum, seriesItem) => {
                                      const val = seriesItem.data[index];
                                      return sum + (typeof val === "number" ? val : 0);
                                    }, 0);
                                  }),
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
                        ) : (
                          ""
                        )}
                      </>
                    ) : (
                      ""
                    )}
                  </>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <div className="card">
              <div className="card-header d-flex justify-content-between">
                <div className="card-title" style={{ fontWeight: 600 }}>
                  Cycle time Harmonic daily
                </div>
                <div className="row">
                  <div className="col-auto">
                    <ToggleButtonGroup type="radio" name="toggleCt" defaultValue={"Daily"} onChange={handleToggleCt}>
                      <ToggleButton
                        id="toggleCt-1"
                        variant="outline-primary"
                        className="mb-0"
                        size="sm"
                        value={"Daily"}
                        style={{ borderRadius: "5px 0 0 5px" }}
                      >
                        Daily
                      </ToggleButton>
                      <ToggleButton
                        id="toggleCt-2"
                        variant="outline-primary"
                        className="mb-0"
                        size="sm"
                        value={"Monthly"}
                        style={{ borderRadius: "0 5px 5px 0" }}
                      >
                        Monthly
                      </ToggleButton>
                    </ToggleButtonGroup>
                  </div>

                  <div className="col-auto">
                    <ToggleButtonGroup type="radio" name="toggleCtGroup" defaultValue={"Type"} onChange={handleToggleCtGroup}>
                      <ToggleButton
                        id="toggleCtGroup-1"
                        variant="outline-success"
                        className="mb-0"
                        size="sm"
                        value={"Type"}
                        style={{ borderRadius: "5px 0 0 5px" }}
                      >
                        Type
                      </ToggleButton>
                      <ToggleButton
                        id="toggleCtGroup-2"
                        variant="outline-success"
                        className="mb-0"
                        size="sm"
                        value={"Line"}
                        style={{ borderRadius: "0 5px 5px 0" }}
                      >
                        Line
                      </ToggleButton>
                    </ToggleButtonGroup>
                  </div>
                </div>
              </div>
              <div className="card-body">
                {toggleCt === "Daily" ? (
                  <>
                    {toggleCtGroup === "Type" ? (
                      <ReactECharts
                        key={JSON.stringify(chartCycleTimeGroup)}
                        option={{
                          tooltip: {
                            trigger: "item",
                            axisPointer: {
                              type: "shadow",
                            },
                            formatter: (params) => {
                              return `${params.seriesName} : ${params.value.toLocaleString("en-US", {
                                minimumFractionDigits: 2,
                              })}s`;
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
                            data: chartCycleTimeGroup.categories,
                            axisLabel: {
                              rotate: 90,
                              formatter: (val) => moment(val).format("DD-MMM"),
                            },
                          },
                          yAxis: {
                            type: "value",
                            axisLabel: {
                              formatter: (val) => `${val.toLocaleString("en-US", { minimumFractionDigits: 1 })}s`,
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
                            ...chartCycleTimeGroup.series.map((item) => ({
                              ...item,
                              barGap: 0,
                              label: {
                                show: true,
                                rotate: item.type === "bar" ? 90 : 0,
                                verticalAlign: "middle",
                                formatter: (val) => `${val.data.toLocaleString("en-US", { minimumFractionDigits: 2 })}s`,
                              },
                            })),
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
                    ) : (
                      ""
                    )}
                    {toggleCtGroup === "Line" ? (
                      <ReactECharts
                        key={JSON.stringify(chartCycleTime)}
                        option={{
                          tooltip: {
                            trigger: "item",
                            axisPointer: {
                              type: "shadow",
                            },
                            formatter: (params) => {
                              return `${params.seriesName} : ${params.value.toLocaleString("en-US", {
                                minimumFractionDigits: 2,
                              })}s`;
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
                            data: chartCycleTime.categories,
                            axisLabel: {
                              rotate: 90,
                              formatter: (val) => moment(val).format("DD-MMM"),
                            },
                          },
                          yAxis: {
                            type: "value",
                            axisLabel: {
                              formatter: (val) => `${val.toLocaleString("en-US", { minimumFractionDigits: 1 })}s`,
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
                            ...chartCycleTime.series.map((item) => ({
                              ...item,
                              barGap: 0,
                              label: {
                                show: true,
                                rotate: item.type === "bar" ? 90 : 0,
                                verticalAlign: "middle",
                                formatter: (val) => `${val.data.toLocaleString("en-US", { minimumFractionDigits: 2 })}s`,
                              },
                            })),
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
                    ) : (
                      ""
                    )}
                  </>
                ) : (
                  ""
                )}

                {toggleCt === "Monthly" ? (
                  <>
                    {toggleCtGroup === "Type" ? (
                      <ReactECharts
                        key={JSON.stringify(chartCycleTimeGroupMonth)}
                        option={{
                          tooltip: {
                            trigger: "item",
                            axisPointer: {
                              type: "shadow",
                            },
                            formatter: (params) => {
                              return `${params.seriesName} : ${params.value.toLocaleString("en-US", {
                                minimumFractionDigits: 2,
                              })}s`;
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
                            data: chartCycleTimeGroupMonth.categories,
                            axisLabel: {
                              rotate: 90,
                              // formatter: (val) => moment(val).format("MMM"),
                            },
                          },
                          yAxis: {
                            type: "value",
                            axisLabel: {
                              formatter: (val) => `${val.toLocaleString("en-US", { minimumFractionDigits: 1 })}s`,
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
                            ...chartCycleTimeGroupMonth.series.map((item) => ({
                              ...item,
                              barGap: 0,
                              label: {
                                show: true,
                                rotate: item.type === "bar" ? 90 : 0,
                                verticalAlign: "middle",
                                formatter: (val) => `${val.data.toLocaleString("en-US", { minimumFractionDigits: 2 })}s`,
                              },
                            })),
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
                    ) : (
                      ""
                    )}
                    {toggleCtGroup === "Line" ? (
                      <ReactECharts
                        key={JSON.stringify(chartCycleTimeMonth)}
                        option={{
                          tooltip: {
                            trigger: "item",
                            axisPointer: {
                              type: "shadow",
                            },
                            formatter: (params) => {
                              return `${params.seriesName} : ${params.value.toLocaleString("en-US", {
                                minimumFractionDigits: 2,
                              })}s`;
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
                            data: chartCycleTimeMonth.categories,
                            axisLabel: {
                              rotate: 90,
                              // formatter: (val) => moment(val).format("MMM"),
                            },
                          },
                          yAxis: {
                            type: "value",
                            axisLabel: {
                              formatter: (val) => `${val.toLocaleString("en-US", { minimumFractionDigits: 1 })}s`,
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
                            ...chartCycleTimeMonth.series.map((item) => ({
                              ...item,
                              barGap: 0,
                              label: {
                                show: true,
                                rotate: item.type === "bar" ? 90 : 0,
                                verticalAlign: "middle",
                                formatter: (val) => `${val.data.toLocaleString("en-US", { minimumFractionDigits: 2 })}s`,
                              },
                            })),
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
                    ) : (
                      ""
                    )}
                  </>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <div className="card">
              <div className="card-header d-flex justify-content-between">
                <div className="card-title" style={{ fontWeight: 600 }}>
                  {`Operation rate daily (calculate Opn. > ${selectPercent * 100}%)`}
                </div>
                <div className="row">
                  <div className="col-auto">
                    <AntDSelect
                      defaultValue="0"
                      style={{ width: 120 }}
                      onChange={handleChangeSelectPercent}
                      options={[
                        { value: "0", label: "0%" },
                        { value: "0.05", label: "5%" },
                        { value: "0.1", label: "10%" },
                        { value: "0.15", label: "15%" },
                        { value: "0.20", label: "20%" },
                        { value: "0.25", label: "25%" },
                        { value: "0.30", label: "30%" },
                        { value: "0.35", label: "35%" },
                        { value: "0.40", label: "40%" },
                        { value: "0.45", label: "45%" },
                        { value: "0.50", label: "50%" },
                      ]}
                    />
                  </div>
                  <div className="col-auto">
                    <ToggleButtonGroup type="radio" name="toggleOpn" defaultValue={"Daily"} onChange={handleToggleOpn}>
                      <ToggleButton
                        id="toggleOpn-1"
                        variant="outline-primary"
                        className="mb-0"
                        size="sm"
                        value={"Daily"}
                        style={{ borderRadius: "5px 0 0 5px" }}
                      >
                        Daily
                      </ToggleButton>
                      <ToggleButton
                        id="toggleOpn-2"
                        variant="outline-primary"
                        className="mb-0"
                        size="sm"
                        value={"Monthly"}
                        style={{ borderRadius: "0 5px 5px 0" }}
                      >
                        Monthly
                      </ToggleButton>
                    </ToggleButtonGroup>
                  </div>

                  <div className="col-auto">
                    <ToggleButtonGroup type="radio" name="toggleOpnGroup" defaultValue={"Type"} onChange={handleToggleOpnGroup}>
                      <ToggleButton
                        id="toggleOpnGroup-1"
                        variant="outline-success"
                        className="mb-0"
                        size="sm"
                        value={"Type"}
                        style={{ borderRadius: "5px 0 0 5px" }}
                      >
                        Type
                      </ToggleButton>
                      <ToggleButton
                        id="toggleOpnGroup-2"
                        variant="outline-success"
                        className="mb-0"
                        size="sm"
                        value={"Line"}
                        style={{ borderRadius: "0 5px 5px 0" }}
                      >
                        Line
                      </ToggleButton>
                    </ToggleButtonGroup>
                  </div>
                </div>
              </div>
              <div className="card-body">
                {toggleOpn === "Daily" ? (
                  <>
                    {toggleOpnGroup === "Type" ? (
                      <ReactECharts
                        key={JSON.stringify(chartOperationRateGroup)}
                        option={{
                          tooltip: {
                            trigger: "item",
                            axisPointer: {
                              type: "shadow",
                            },
                            formatter: (params) => {
                              return `${params.seriesName} : ${params.value.toLocaleString("en-US", {
                                minimumFractionDigits: 1,
                              })}%`;
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
                            data: chartOperationRateGroup.categories,
                            axisLabel: {
                              rotate: 90,
                              formatter: (val) => moment(val).format("DD-MMM"),
                            },
                          },
                          yAxis: {
                            type: "value",
                            axisLabel: {
                              formatter: (val) => `${val.toLocaleString("en-US", { minimumFractionDigits: 1 })}%`,
                            },
                          },
                          dataZoom: [
                            {
                              type: "slider",
                              show: true,
                              xAxisIndex: 0,
                              start: 0,
                              end: 100,
                            },
                          ],
                          series: [
                            ...chartOperationRateGroup.series.map((item) => ({
                              ...item,
                              barGap: 0,
                              label: {
                                show: true,
                                rotate: item.type === "bar" ? 90 : 0,
                                verticalAlign: "middle",
                                formatter: (val) => `${val.data.toLocaleString("en-US", { minimumFractionDigits: 1 })}%`,
                              },
                            })),
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
                    ) : (
                      ""
                    )}
                    {toggleOpnGroup === "Line" ? (
                      <ReactECharts
                        key={JSON.stringify(chartOperationRate)}
                        option={{
                          tooltip: {
                            trigger: "item",
                            axisPointer: {
                              type: "shadow",
                            },
                            formatter: (params) => {
                              return `${params.seriesName} : ${params.value.toLocaleString("en-US", {
                                minimumFractionDigits: 1,
                              })}%`;
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
                            data: chartOperationRate.categories,
                            axisLabel: {
                              rotate: 90,
                              formatter: (val) => moment(val).format("DD-MMM"),
                            },
                          },
                          yAxis: {
                            type: "value",
                            axisLabel: {
                              formatter: (val) => `${val.toLocaleString("en-US", { minimumFractionDigits: 1 })}%`,
                            },
                          },
                          dataZoom: [
                            {
                              type: "slider",
                              show: true,
                              xAxisIndex: 0,
                              start: 0,
                              end: 100,
                            },
                          ],
                          series: [
                            ...chartOperationRate.series.map((item) => ({
                              ...item,
                              barGap: 0,
                              label: {
                                show: true,
                                rotate: item.type === "bar" ? 90 : 0,
                                verticalAlign: "middle",
                                formatter: (val) => `${val.data.toLocaleString("en-US", { minimumFractionDigits: 1 })}%`,
                              },
                            })),
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
                    ) : (
                      ""
                    )}
                  </>
                ) : (
                  ""
                )}

                {toggleOpn === "Monthly" ? (
                  <>
                    {toggleOpnGroup === "Type" ? (
                      <ReactECharts
                        key={JSON.stringify(chartOperationRateGroupMonth)}
                        option={{
                          tooltip: {
                            trigger: "item",
                            axisPointer: {
                              type: "shadow",
                            },
                            formatter: (params) => {
                              return `${params.seriesName} : ${params.value.toLocaleString("en-US", {
                                minimumFractionDigits: 1,
                              })}%`;
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
                            data: chartOperationRateGroupMonth.categories,
                            axisLabel: {
                              rotate: 90,
                            },
                          },
                          yAxis: {
                            type: "value",
                            axisLabel: {
                              formatter: (val) => `${val.toLocaleString("en-US", { minimumFractionDigits: 1 })}%`,
                            },
                          },
                          dataZoom: [
                            {
                              type: "slider",
                              show: true,
                              xAxisIndex: 0,
                              start: 0,
                              end: 100,
                            },
                          ],
                          series: [
                            ...chartOperationRateGroupMonth.series.map((item) => ({
                              ...item,
                              barGap: 0,
                              label: {
                                show: true,
                                rotate: item.type === "bar" ? 90 : 0,
                                verticalAlign: "middle",
                                formatter: (val) => `${val.data.toLocaleString("en-US", { minimumFractionDigits: 1 })}%`,
                              },
                            })),
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
                    ) : (
                      ""
                    )}
                    {toggleOpnGroup === "Line" ? (
                      <ReactECharts
                        key={JSON.stringify(chartOperationRateMonth)}
                        option={{
                          tooltip: {
                            trigger: "item",
                            axisPointer: {
                              type: "shadow",
                            },
                            formatter: (params) => {
                              return `${params.seriesName} : ${params.value.toLocaleString("en-US", {
                                minimumFractionDigits: 1,
                              })}%`;
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
                            data: chartOperationRateMonth.categories,
                            axisLabel: {
                              rotate: 90,
                            },
                          },
                          yAxis: {
                            type: "value",
                            axisLabel: {
                              formatter: (val) => `${val.toLocaleString("en-US", { minimumFractionDigits: 1 })}%`,
                            },
                          },
                          dataZoom: [
                            {
                              type: "slider",
                              show: true,
                              xAxisIndex: 0,
                              start: 0,
                              end: 100,
                            },
                          ],
                          series: [
                            ...chartOperationRateMonth.series.map((item) => ({
                              ...item,
                              barGap: 0,
                              label: {
                                show: true,
                                rotate: item.type === "bar" ? 90 : 0,
                                verticalAlign: "middle",
                                formatter: (val) => `${val.data.toLocaleString("en-US", { minimumFractionDigits: 1 })}%`,
                              },
                            })),
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
                    ) : (
                      ""
                    )}
                  </>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <div className="card">
              <div className="card-header d-flex align-items-center justify-content-between">
                <div className="card-title" style={{ fontWeight: 600 }}>
                  Chart by machine
                </div>
                <div className="mx-auto row">
                  {toggleMachine === "Alarm time" ? (
                    <>
                      <div className="col">
                        <FormControl sx={{ ml: 2, width: 300 }}>
                          <InputLabel
                            id="demo-multiple-checkbox-label"
                            style={{ fontSize: "14px" }}
                            sx={selectStatusMachine.length > 0 ? {} : { top: "-6px" }}
                          >
                            Status Alarm
                          </InputLabel>
                          <Select
                            labelId="demo-multiple-checkbox-label"
                            id="demo-multiple-checkbox"
                            multiple
                            size="small"
                            value={selectStatusMachine}
                            onChange={handleChangeStatusMachine}
                            input={<OutlinedInput label="Status Alarm" />}
                            renderValue={(selected) => selected.join(", ")}
                          >
                            {statusAlarmFetch.map((item) => (
                              <MenuItem key={item} value={item}>
                                <Checkbox checked={selectStatusMachine.includes(item)} />
                                <ListItemText primary={item} />
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </div>
                      <div className="col">
                        <Button
                          variant="outlined"
                          size="small"
                          startIcon={<FontAwesomeIcon icon={selectStatusMachine.length > 0 ? faXmark : faCheck} />}
                          color={selectStatusMachine.length > 0 ? "warning" : "secondary"}
                          style={{ height: "100%" }}
                          onClick={handleClickStatusMachine}
                        >
                          {selectStatusMachine.length > 0 ? "Clear all" : "Select all"}
                        </Button>
                      </div>
                    </>
                  ) : (
                    ""
                  )}
                </div>
                <div className="card-tools">
                  <div className="row">
                    {toggleMachine === "Alarm time" ? (
                      <div className="col-auto">
                        <ToggleButtonGroup type="radio" name="toggleMachineAlarmType" defaultValue={"Time"} onChange={handleToggleMachineAlarmType}>
                          <ToggleButton
                            id="toggleMachineAlarmType-1"
                            variant="outline-warning"
                            className="mb-0"
                            size="sm"
                            value={"Time"}
                            style={{ borderRadius: "5px 0 0 5px" }}
                          >
                            Time
                          </ToggleButton>
                          <ToggleButton
                            id="toggleMachineAlarmType-2"
                            variant="outline-warning"
                            className="mb-0"
                            size="sm"
                            value={"Prod."}
                            style={{ borderRadius: "0 5px 5px 0" }}
                          >
                            Prod.
                          </ToggleButton>
                        </ToggleButtonGroup>
                      </div>
                    ) : (
                      ""
                    )}
                    <div className="col-auto">
                      <ToggleButtonGroup type="radio" name="toggleMachine" defaultValue={"Prod."} onChange={handleToggleMachine}>
                        <ToggleButton
                          id="toggleMachine-1"
                          variant="outline-primary"
                          className="mb-0"
                          size="sm"
                          value={"Prod."}
                          style={{ borderRadius: "5px 0 0 5px" }}
                        >
                          Prod.
                        </ToggleButton>
                        <ToggleButton id="toggleMachine-2" variant="outline-primary" className="mb-0" size="sm" value={"NG"}>
                          NG
                        </ToggleButton>
                        <ToggleButton id="toggleMachine-3" variant="outline-primary" className="mb-0" size="sm" value={"Alarm time"}>
                          Alarm time
                        </ToggleButton>
                        <ToggleButton id="toggleMachine-4" variant="outline-primary" className="mb-0" size="sm" value={"Cycle time"}>
                          Cycle time
                        </ToggleButton>
                        <ToggleButton
                          id="toggleMachine-5"
                          variant="outline-primary"
                          className="mb-0"
                          size="sm"
                          value={"Opn. rate"}
                          style={{ borderRadius: "0 5px 5px 0" }}
                        >
                          Opn. rate
                        </ToggleButton>
                      </ToggleButtonGroup>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-body">
                {toggleMachine === "Prod." ? (
                  <ReactECharts
                    key={JSON.stringify(chartProdMachine)}
                    option={{
                      tooltip: {
                        trigger: "item",
                        axisPointer: {
                          type: "shadow",
                        },
                        formatter: (params) => {
                          return `${params.seriesName} : ${params.value.toLocaleString("en-US")}`;
                        },
                      },
                      xAxis: {
                        type: "category",
                        data: chartProdMachine.categories,
                        axisLabel: {
                          rotate: 90,
                        },
                      },
                      yAxis: {
                        type: "value",
                        axisLabel: {
                          formatter: (val) => `${val.toLocaleString("en-US")}pcs`,
                        },
                      },
                      dataZoom: [
                        {
                          type: "slider",
                          show: true,
                          xAxisIndex: 0,
                          start: 0,
                          end: 100,
                        },
                      ],
                      series: [
                        {
                          name: "prod.",
                          type: "bar",
                          stack: "total",
                          data: chartProdMachine.series,
                          label: {
                            show: true,
                            position: "top",
                            formatter: (params) => params.value.toLocaleString("en-US"),
                          },
                        },
                      ],
                      grid: {
                        left: "1%",
                        right: "3%",
                        top: "10%",
                        bottom: "10%",
                        containLabel: true,
                      },
                    }}
                    style={{ width: "100%", height: 500 }}
                  />
                ) : (
                  ""
                )}
                {toggleMachine === "NG" ? (
                  <ReactECharts
                    key={JSON.stringify(chartNGMachine)}
                    option={{
                      tooltip: {
                        trigger: "item",
                        axisPointer: {
                          type: "shadow",
                        },
                        formatter: (params) => {
                          return `${params.seriesName} : ${params.value.toLocaleString("en-US")}`;
                        },
                      },
                      xAxis: {
                        type: "category",
                        data: chartNGMachine.categories,
                        axisLabel: {
                          rotate: 90,
                        },
                      },
                      yAxis: {
                        type: "value",
                        axisLabel: {
                          formatter: (val) => `${val.toLocaleString("en-US")}pcs`,
                        },
                      },
                      dataZoom: [
                        {
                          type: "slider",
                          show: true,
                          xAxisIndex: 0,
                          start: 0,
                          end: 100,
                        },
                      ],
                      series: [
                        {
                          name: "prod.",
                          type: "bar",
                          stack: "total",
                          data: chartNGMachine.series,
                          label: {
                            show: true,
                            position: "top",
                            formatter: (params) => params.value.toLocaleString("en-US"),
                          },
                        },
                      ],
                      grid: {
                        left: "1%",
                        right: "3%",
                        top: "10%",
                        bottom: "10%",
                        containLabel: true,
                      },
                    }}
                    style={{ width: "100%", height: 500 }}
                  />
                ) : (
                  ""
                )}
                {toggleMachine === "Opn. rate" ? (
                  <ReactECharts
                    key={JSON.stringify(chartOpnMachine)}
                    option={{
                      tooltip: {
                        trigger: "item",
                        axisPointer: {
                          type: "shadow",
                        },
                        formatter: (params) => {
                          return `${params.seriesName} : ${params.value.toLocaleString("en-US")}%`;
                        },
                      },
                      xAxis: {
                        type: "category",
                        data: chartOpnMachine.categories,
                        axisLabel: {
                          rotate: 90,
                        },
                      },
                      yAxis: {
                        type: "value",
                        axisLabel: {
                          formatter: (val) => `${val.toLocaleString("en-US")}%`,
                        },
                      },
                      dataZoom: [
                        {
                          type: "slider",
                          show: true,
                          xAxisIndex: 0,
                          start: 0,
                          end: 100,
                        },
                      ],
                      series: [
                        {
                          name: "prod.",
                          type: "bar",
                          stack: "total",
                          data: chartOpnMachine.series,
                          label: {
                            show: true,
                            position: "top",
                            formatter: (params) => params.value.toLocaleString("en-US") + "%",
                          },
                        },
                      ],
                      grid: {
                        left: "1%",
                        right: "3%",
                        top: "10%",
                        bottom: "10%",
                        containLabel: true,
                      },
                    }}
                    style={{ width: "100%", height: 500 }}
                  />
                ) : (
                  ""
                )}
                {toggleMachine === "Cycle time" ? (
                  <ReactECharts
                    key={JSON.stringify(chartCycletimeMachine)}
                    option={{
                      tooltip: {
                        trigger: "item",
                        axisPointer: {
                          type: "shadow",
                        },
                        formatter: (params) => {
                          return `${params.seriesName} : ${params.value.toLocaleString("en-US", {
                            minimumFractionDigits: 2,
                          })}s`;
                        },
                      },
                      xAxis: {
                        type: "category",
                        data: chartCycletimeMachine.categories,
                        axisLabel: {
                          rotate: 90,
                        },
                      },
                      yAxis: {
                        type: "value",
                        axisLabel: {
                          formatter: (val) =>
                            `${val.toLocaleString("en-US", {
                              minimumFractionDigits: 2,
                            })}s`,
                        },
                      },
                      dataZoom: [
                        {
                          type: "slider",
                          show: true,
                          xAxisIndex: 0,
                          start: 0,
                          end: 100,
                        },
                      ],
                      series: [
                        {
                          name: "prod.",
                          type: "bar",
                          stack: "total",
                          data: chartCycletimeMachine.series,
                          label: {
                            show: true,
                            position: "top",
                            formatter: (params) => params.value.toLocaleString("en-US"),
                          },
                        },
                      ],
                      grid: {
                        left: "1%",
                        right: "3%",
                        top: "10%",
                        bottom: "10%",
                        containLabel: true,
                      },
                    }}
                    style={{ width: "100%", height: 500 }}
                  />
                ) : (
                  ""
                )}
                {toggleMachine === "Alarm time" ? (
                  <>
                    {toggleMachineAlarmType === "Time" ? (
                      <ReactECharts
                        key={JSON.stringify(chartAlarmTimeMachine)}
                        option={{
                          tooltip: {
                            trigger: "item",
                            formatter: (params) => {
                              return `${params.seriesName}<br/>${params.name} : ${formatSecondsToHHMMSS(params.value)}`;
                            },
                          },
                          legend: {
                            type: "scroll",
                            orient: "vertical",
                            right: 10,
                            top: "center",
                            selectedMode: false,
                          },
                          xAxis: {
                            type: "category",
                            data: chartAlarmTimeMachine.categories,
                            axisLabel: {
                              rotate: 90,
                            },
                          },
                          yAxis: {
                            type: "value",
                            axisLabel: {
                              formatter: (val) => {
                                return `${formatSecondsToHHMMSS(val)} hrs`;
                              },
                            },
                          },
                          dataZoom: [
                            {
                              type: "slider",
                              show: true,
                              xAxisIndex: 0,
                              start: 0,
                              end: 100,
                            },
                          ],
                          series: [
                            ...chartAlarmTimeMachine.series.map((item) => ({
                              ...item,
                            })),
                            {
                              name: "Total",
                              type: "scatter",
                              symbolSize: 0,
                              label: {
                                show: true,
                                position: "top",
                                color: "black",
                                formatter: (val) => {
                                  return formatSecondsToHHMMSS(val.data);
                                },
                              },
                              data: chartAlarmTimeMachine.categories.map((_, index) => {
                                return chartAlarmTimeMachine.series.reduce((sum, seriesItem) => {
                                  const val = seriesItem.data[index];
                                  return sum + (typeof val === "number" ? val : 0);
                                }, 0);
                              }),
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
                    ) : (
                      ""
                    )}

                    {toggleMachineAlarmType === "Prod." ? (
                      <ReactECharts
                        key={JSON.stringify(chartAlarmTimeMachineLose)}
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
                            data: chartAlarmTimeMachineLose.categories,
                            axisLabel: {
                              rotate: 90,
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
                              end: 100,
                            },
                          ],
                          series: [
                            ...chartAlarmTimeMachineLose.series.map((item) => ({
                              ...item,
                            })),
                            {
                              name: "Total",
                              type: "scatter",
                              symbolSize: 0,
                              label: {
                                show: true,
                                position: "top",
                                color: "black",
                                formatter: (val) => val.data.toLocaleString("en-US", { maximumFractionDigits: 1 }),
                              },
                              data: chartAlarmTimeMachineLose.categories.map((_, index) => {
                                return chartAlarmTimeMachineLose.series.reduce((sum, seriesItem) => {
                                  const val = seriesItem.data[index];
                                  return sum + (typeof val === "number" ? val : 0);
                                }, 0);
                              }),
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
                    ) : (
                      ""
                    )}
                  </>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <div className="card">
              <div className="card-header d-flex align-items-center justify-content-between">
                <div className="card-title" style={{ fontWeight: 600 }}>
                  Table Data
                </div>
                <div className="row">
                  <div className="col-auto">
                    <ToggleButtonGroup type="radio" name="toggleTable" defaultValue={"Day"} onChange={handleToggleTable}>
                      <ToggleButton
                        id="toggleTable-1"
                        variant="outline-primary"
                        className="mb-0"
                        size="sm"
                        value={"Day"}
                        style={{ borderRadius: "5px 0 0 5px" }}
                      >
                        Day
                      </ToggleButton>
                      <ToggleButton
                        id="toggleTable-2"
                        variant="outline-primary"
                        className="mb-0"
                        size="sm"
                        value={"Shift"}
                        style={{ borderRadius: "0 5px 5px 0" }}
                      >
                        Shift
                      </ToggleButton>
                    </ToggleButtonGroup>
                  </div>
                  <div className="col-auto">
                    <button onClick={exportToExcel} className="btn btn-sm btn-success">
                      Export to Excel
                    </button>
                  </div>
                </div>
              </div>
              <div className="card-body">
                {toggleTable === "Day" ? (
                  <div style={{ height: "calc(100vh - 195px)" }}>
                    <AgGridReact ref={gridRef} rowData={tableTotalDailyRowData} columnDefs={tableTotalDailyColumnDefs} />
                  </div>
                ) : (
                  ""
                )}
                {toggleTable === "Shift" ? (
                  <div style={{ height: "calc(100vh - 195px)" }}>
                    <AgGridReact ref={gridRef} rowData={tableTotalRowData} columnDefs={tableTotalColumnDefs} />
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

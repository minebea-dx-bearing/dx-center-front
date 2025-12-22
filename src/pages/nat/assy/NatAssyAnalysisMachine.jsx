import { useEffect, useState } from "react";
import { DatePicker, Select } from "antd";
import PageBreadcrumb from "../../../components/common/PageBreadcrumb";
import MachineProductionTable from "../../../components/common/MachineProductionTable";
import MachineProductionChart from "../../../components/common/MachineProductionChart";
import MachineCycleTimeChart from "../../../components/common/MachineCycleTimeChart";
import MachineStatusTimeline from "../../../components/common/MachineStatusTimeline";
import dayjs from "dayjs";
import axios from "axios";
import MachineSumAlarmTable from "../../../components/common/MachineSumAlarmTable";
import Swal from "sweetalert2";
import { TWN_URL } from "../../../constance/constance";
import { useSearchParams } from "react-router";
import BreadCrumbs from "../../../components/redesign/BreadCrumbs";

export default function NatAssyAnalysisMachine({ defaultMC, defaultDate }) {
  const [masterMachine, setMasterMachine] = useState([]);
  const [searchParams] = useSearchParams();
  const mcNoFromUrl = searchParams.get('mc_no');
  const [machine, setMachine] = useState(mcNoFromUrl || defaultMC || null);
  const [date, setDate] = useState(defaultDate ? dayjs(defaultDate) : dayjs());
  const [dataProdShift, setDataProdShift] = useState([]);
  const [dataProd, setDataProd] = useState([0]);
  const [dataCT, setDataCT] = useState([0]);
  const [dataStatus, setDataStatus] = useState([0]);
  const [dataSumAlarm, setDataSumAlarm] = useState([]);
  const [loading, setLoading] = useState(true);


  const GET_MASTER_MACHINE_MBR_API = async () => {
    try {
      let dataMC = await axios.get(
        `${TWN_URL}/nat/assy/analisis-by-mc/master_machine_mbr`
      );
      if (dataMC.data.success === true) {
        setMasterMachine(dataMC.data.data);
        setLoading(false);
        if (dataMC.data.data.length > 0) {
          if (machine === null) {
            setMachine(dataMC.data.data[0]?.mc_no);
          }
        }
      } else {
        setMasterMachine([]);
      }
    } catch (error) {
      if (error.code === "ERR_NETWORK") {
        Swal.fire({
          icon: "error",
          text: "Network Error",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        Swal.fire({
          icon: "error",
          text: "เกิดข้อผิดพลาดในการโหลดข้อมูล",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  };

  const GET_PRODUCTION_BY_HOUR_API = async () => {
    try {
      setLoading(true);
      let data = await axios.get(
        `${TWN_URL}/nat/assy/analisis-by-mc/mbr_production_hour_by_mc/${machine}/${date.format(
          "YYYY-MM-DD"
        )}`
      );

      if (data.data.success === true) {
        setDataProd(data.data.data);
        setDataCT(data.data.data_raw.map((item) => item.cycle_t / 100));
      } else {
        setDataProd([]);
        setDataCT([]);
      }
    } catch (error) {
      if (error.code === "ERR_NETWORK") {
        Swal.fire({
          icon: "error",
          text: "Network Error",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        Swal.fire({
          icon: "error",
          text: "เกิดข้อผิดพลาดในการโหลดข้อมูล",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const GET_STATUS_BY_HOUR_API = async () => {
    try {
      setLoading(true);
      let data = await axios.get(
        `${TWN_URL}/nat/assy/analisis-by-mc/status_mbr/${machine}/${date.format(
          "YYYY-MM-DD"
        )}`
      );

      if (data.data.success === true) {
        setDataStatus(data.data.data);
        setDataSumAlarm(data.data.dataAlarm);
      } else {
        setDataStatus([0]);
        setDataSumAlarm([]);
      }
      // console.log(data.data.data)
    } catch (error) {
      if (error.code === "ERR_NETWORK") {
        Swal.fire({
          icon: "error",
          text: "Network Error",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        Swal.fire({
          icon: "error",
          text: "เกิดข้อผิดพลาดในการโหลดข้อมูล",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const GET_PRODUCTION_SHIFT_API = async () => {
    try {
      setLoading(true);
      let data = await axios.get(
        `${TWN_URL}/nat/assy/analisis-by-mc/get_production_analysis_by_mc/${machine}/${date.format(
          "YYYY-MM-DD"
        )}`
      );

      if (data.data.success === true) {
        setDataProdShift(data.data.data);
      } else {
        setDataProdShift([]);
      }
    } catch (error) {
      if (error.code === "ERR_NETWORK") {
        Swal.fire({
          icon: "error",
          text: "Network Error",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        Swal.fire({
          icon: "error",
          text: "เกิดข้อผิดพลาดในการโหลดข้อมูล",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } finally {
      setLoading(false);
    }
  };
  // first
  useEffect(() => {
    GET_MASTER_MACHINE_MBR_API();
  }, []);

  // render when change
  useEffect(() => {
    if (!machine || !date) return;
    GET_PRODUCTION_SHIFT_API();
    GET_PRODUCTION_BY_HOUR_API();
    GET_STATUS_BY_HOUR_API();
  }, [machine, date]);

  // โหลดซ้ำทุก 30 นาที
  useEffect(() => {
    if (!machine || !date) return;

    const interval = setInterval(() => {
      GET_PRODUCTION_SHIFT_API();
      GET_PRODUCTION_BY_HOUR_API();
      GET_STATUS_BY_HOUR_API();
    }, 30 * 60 * 1000); // 30 นาที

    // cleanup ตอน component ถูก unmount
    return () => clearInterval(interval);
  }, [machine, date]);

  const onChangeMC = (value) => {
    setMachine(value);
  };
  const onChangeDate = (dateObject, dateString) => {
    if (dateObject) {
      setDate(dateObject);
    }
  };

  return (
    <div>
      {/* <PageBreadcrumb pageTitle="ASSY : Analysis by M/C" /> */}
      <BreadCrumbs/>
      <div className="flex flex-row justify-center gap-2">
        <div>
          <DatePicker
            onChange={onChangeDate}
            value={date}
            format={"YYYY-MM-DD"}
          />
        </div>
        <div>
          <Select
            placeholder="Select M/C No"
            showSearch
            optionFilterProp="label"
            value={machine?.toUpperCase()}
            onChange={onChangeMC}
            options={(masterMachine ?? []).map((item) => ({
              value: item.mc_no,
              label: item.mc_no,
            }))}
          />
        </div>
      </div>
      <b className="flex flex-row justify-center text-lg">
        Process : {machine}
      </b>

      {/* <Loading />  */}
      <MachineProductionTable Arrdata={dataProdShift} />
      <MachineProductionChart Arrdata={dataProd} />
      <MachineCycleTimeChart Arrdata={dataCT} />
      <MachineStatusTimeline Arrdata={dataStatus} />
      <MachineSumAlarmTable data={dataSumAlarm} />
    </div>
  );
}
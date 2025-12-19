import { useEffect, useState } from 'react'
import { DatePicker, Select } from 'antd'
import PageBreadcrumb from '../../../components/common/PageBreadcrumb'
import MachineProductionTable from '../../../components/common/MachineProductionTable'
import MachineProductionChart from '../../../components/common/MachineProductionChart'
import MachineCycleTimeChart from '../../../components/common/MachineCycleTimeChart'
import MachineStatusTimeline from '../../../components/common/MachineStatusTimeline'
import moment from 'moment'
import axios from 'axios'
// import Loading from '../../../components/common/Loading'
import MachineSumAlarmTable from '../../../components/common/MachineSumAlarmTable'
import Swal from 'sweetalert2'
import { BASE_URL } from '../../../constance/constance'

export default function NatAssyAnalysisMachine({defaultMC, defaultDate}) {

    const [masterMachine, setMasterMachine] = useState([]);
    const [machine, setMachine] = useState(defaultMC);
    const [date, setDate] = useState(moment(defaultDate).format("YYYY-MM-DD"));
    const [dataProdShift, setDataProdShift] = useState([]);
    const [dataProd, setDataProd] = useState([0]);
    const [dataCT, setDataCT] = useState([0]);
    const [dataStatus, setDataStatus] = useState([0]);
    const [dataSumAlarm, setDataSumAlarm] = useState([]);
    const [loading, setLoading] = useState(true);

    const GET_MASTER_MACHINE_MBR_API = async () => {
        try {
            let dataMC = await axios.get(`${BASE_URL}/nat/assy/analisis-by-mc/master_machine_mbr`);
            if (dataMC.data.success === true) {
                setMasterMachine(dataMC.data.data);
                setLoading(false)
            } else {
                setMasterMachine([]);
            }
        } catch (error) {
            if (error.code === 'ERR_NETWORK') {
                Swal.fire({ icon: "error", text: "Network Error", showConfirmButton: false, timer: 1500, })
            } else {
                Swal.fire({ icon: "error", text: "เกิดข้อผิดพลากในการโหลดข้อมูล", showConfirmButton: false, timer: 1500, })

            }
        }

    };
    const GET_PRODUCTION_BY_HOUR_API = async () => {
        try {
            setLoading(true)
            let data = await axios.get(
                `${BASE_URL}/nat/assy/analisis-by-mc/mbr_production_hour_by_mc/${machine}/${date}`
            );

            if (data.data.success === true) {
                setDataProd(data.data.data);
                setDataCT(data.data.data_raw.map((item: any) => item.cycle_t / 100));
            } else {
                setDataProd([]);
                setDataCT([]);
            }


        } catch (error) {
            if (error.code === 'ERR_NETWORK') {
                Swal.fire({ icon: "error", text: "Network Error", showConfirmButton: false, timer: 1500, })
            } else {
                Swal.fire({ icon: "error", text: "เกิดข้อผิดพลากในการโหลดข้อมูล", showConfirmButton: false, timer: 1500, })
            }
        } finally {
            setLoading(false)
        }
    };

    const GET_STATUS_BY_HOUR_API = async () => {
        try {
            setLoading(true)
            let data = await axios.get(
                `${BASE_URL}/nat/assy/analisis-by-mc/status_mbr/${machine}/${date}`
            );

            if (data.data.success === true) {
                setDataStatus(data.data.data);
                setDataSumAlarm(data.data.dataAlarm)
            } else {
                setDataStatus([0]);
                setDataSumAlarm([]);
            }
        } catch (error) {
            if (error.code === 'ERR_NETWORK') {
                Swal.fire({ icon: "error", text: "Network Error", showConfirmButton: false, timer: 1500, })
            } else {
                Swal.fire({ icon: "error", text: "เกิดข้อผิดพลากในการโหลดข้อมูล", showConfirmButton: false, timer: 1500, })
            }
        } finally {
            setLoading(false)
        }
    };

    const GET_PRODUCTION_SHIFT_API = async () => {
        try {
            setLoading(true)
            let data = await axios.get(
                `${BASE_URL}/nat/assy/analisis-by-mc/get_production_analysis_by_mc/${machine}/${date}`
            );

            if (data.data.success === true) {
                setDataProdShift(data.data.data)
            } else {
                setDataProdShift([]);
            }
        } catch (error) {
            if (error.code === 'ERR_NETWORK') {
                Swal.fire({ icon: "error", text: "Network Error", showConfirmButton: false, timer: 1500, })
            } else {
                Swal.fire({ icon: "error", text: "เกิดข้อผิดพลากในการโหลดข้อมูล", showConfirmButton: false, timer: 1500, })
            }
        } finally {
            setLoading(false)
        }
    };
    // first
    useEffect(() => {
        GET_MASTER_MACHINE_MBR_API();
        console.log("....", defaultDate, defaultMC);
        
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
            console.log("Refresh every 30 minutes...");
            GET_PRODUCTION_SHIFT_API();
            GET_PRODUCTION_BY_HOUR_API();
            GET_STATUS_BY_HOUR_API();
        }, 30 * 60 * 1000); // 30 นาที

        // cleanup ตอน component ถูก unmount
        return () => clearInterval(interval);
    }, [machine, date]);

    const onChangeMC = value => {
        setMachine(value);
    };
    const onChangeDate = (date: Date, dateString: any) => {
        //   console.log(dateString);
        setDate(dateString);
    };

    return (
        <div>
            <PageBreadcrumb pageTitle="ASSY : Analysis by M/C"></PageBreadcrumb>
            <div className='flex flex-row justify-center gap-2'>
                <div><DatePicker onChange={onChangeDate} /></div>
                <div><Select placeholder="Select M/C No"
                    showSearch
                    optionFilterProp="label"
                    onChange={onChangeMC}
                    options={(masterMachine ?? []).map(item => ({
                        value: (item as any).mc_no,
                        label: (item as any).mc_no
                    }))}
                /></div>
            </div>
            <div className='flex flex-row justify-center'>Process : {machine}</div>

            {/* <Loading />  */}
            <MachineProductionTable Arrdata={dataProdShift}/>
            <MachineProductionChart Arrdata={dataProd} />
            <MachineCycleTimeChart Arrdata={dataCT} />
            <MachineStatusTimeline Arrdata={dataStatus} />
            <MachineSumAlarmTable data={dataSumAlarm} />

        </div>
    )
}

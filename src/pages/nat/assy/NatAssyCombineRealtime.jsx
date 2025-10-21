import PageBreadcrumb from "../../../components/common/PageBreadcrumb";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import moment from "moment/moment";
import { BASE_URL } from "../../../constance/constance";
import CardProcess from "../../../components/common/CardProcess";

const refreshTime = 60;

export default function NatAssyCombineRealtime() {
  const [loading, setLoading] = useState(false);
  const [fetchTime, setFetchTime] = useState();
  const [countdown, setCountdown] = useState(refreshTime);

  const isFirstLoad = useRef(true);

  const [realtime_data, setRealtimeData] = useState([]);

  const fetchData = async () => {
    if (isFirstLoad.current) {
      setLoading(true);
    }
    try {
      const response1 = await axios.get(`${BASE_URL}/nat/assy/combine-realtime/get_data_realtime`, {
        headers: {
          "Cache-Control": "no-cache",
          Pragma: "no-cache",
          Expires: "0",
        },
      });
      setFetchTime(moment().format("DD-MMM HH:mm"));
      setRealtimeData(response1.data.data.data);

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
  }, []);

  return (
    <div>
      <PageBreadcrumb pageTitle="NAT : ASSY COMBINE REALTIME1" />
      <div className="flex flex-row-reverse">
        <div>
          Update : {fetchTime} <span style={{ color: "red" }}>(Refresh in {countdown}s)</span>
        </div>
      </div>

      <div className="p-0">
        {Object.keys(realtime_data).map((item, index) => {
          const data = realtime_data[item];
          return (
            <div key={index} className="grid grid-cols-26 grid-rows-15 items-end mb-15">
              <div className="col-start-1 row-start-1 col-span-14 row-span-2">
                <div className="flex gap-[0.83vw] mb-[0.42vw]">
                  <div className="w-[8.33vw] h-[4.5vw] font-semibold text-slate-700 rounded-xl border bg-white shadow-md flex flex-col justify-center items-center">
                    <div className="text-[clamp(1rem,1.25vw,1.5rem)]">LINE : {item.split("&")[0]}</div>
                  </div>
                  <div className="w-[8.33vw] h-[4.5vw] font-semibold text-slate-700 rounded-xl border bg-white shadow-md flex flex-col justify-center items-center">
                    <div className="text-[clamp(0.8rem,0.94vw,1.125rem)]">PACKING</div>
                    <div className="text-[clamp(0.875rem,1.04vw,1.25rem)]">{data["ALU-FIRST"].prod_ok.toLocaleString()}</div>
                  </div>
                </div>
              </div>

              <div className="col-start-1 row-start-9 col-span-14 row-span-2">
                <div className="flex gap-[0.83vw] mb-[0.42vw]">
                  <div className="w-[8.33vw] h-[4.5vw] font-semibold text-slate-700 rounded-xl border bg-white shadow-md flex flex-col justify-center items-center">
                    <div className="text-[clamp(1rem,1.25vw,1.5rem)]">LINE : {item.split("&")[1]}</div>
                  </div>
                  <div className="w-[8.33vw] h-[4.5vw] font-semibold text-slate-700 rounded-xl border bg-white shadow-md flex flex-col justify-center items-center">
                    <div className="text-[clamp(0.8rem,0.94vw,1.125rem)]">PACKING</div>
                    <div className="text-[clamp(0.875rem,1.04vw,1.25rem)]">{data["ALU-SECOND"].prod_ok.toLocaleString()}</div>
                  </div>
                </div>
              </div>

              <div className="col-start-1 col-span-4 row-start-3 row-span-5">
                <CardProcess
                  title={data["MBR-FIRST"].mc_no}
                  subTitle={data["MBR-FIRST"].model}
                  processes={["GAUGE", "BALL"]}
                  data={{
                    prodActual: [
                      { value: 0, diff: 0 },
                      { value: data["MBR-FIRST"].prod_ok, diff: data["MBR-FIRST"].diff_prod },
                    ],
                    ctActual: [
                      { value: 0, diff: 0 },
                      { value: data["MBR-FIRST"].cycle_t, diff: data["MBR-FIRST"].diff_ct },
                    ],
                    yield_rate: [0, data["MBR-FIRST"].yield_rate],
                    status: ["OFFLINE", data["MBR-FIRST"].status_alarm],
                  }}
                />
              </div>
              <div className="col-start-5 col-span-3 row-start-3 row-span-5">
                <CardProcess
                  title={data["ARP-FIRST"].mc_no}
                  subTitle={data["ARP-FIRST"].model}
                  processes={["ARP"]}
                  data={{
                    prodActual: [{ value: data["ARP-FIRST"].prod_ok, diff: data["ARP-FIRST"].diff_prod }],
                    ctActual: [{ value: data["ARP-FIRST"].cycle_t, diff: data["ARP-FIRST"].diff_ct }],
                    yield_rate: [data["ARP-FIRST"].yield_rate],
                    status: [data["ARP-FIRST"].status_alarm],
                  }}
                />
              </div>
              <div className="col-start-8 col-span-4 row-start-3 row-span-5">
                <CardProcess
                  title={data["GSSM-FIRST"].mc_no}
                  subTitle={data["GSSM-FIRST"].model}
                  processes={["GREASE", "SHIELD"]}
                  data={{
                    prodActual: [
                      { value: data["GSSM-FIRST"].grease_ok, diff: data["GSSM-FIRST"].diff_prod_grease },
                      { value: data["GSSM-FIRST"].shield_ok, diff: data["GSSM-FIRST"].diff_prod_shield },
                    ],
                    ctActual: [
                      { value: data["GSSM-FIRST"].cycle_t, diff: data["GSSM-FIRST"].diff_ct },
                      { value: data["GSSM-FIRST"].cycle_t, diff: data["GSSM-FIRST"].diff_ct },
                    ],
                    yield_rate: [data["GSSM-FIRST"].yield_grease, data["GSSM-FIRST"].yield_shield],
                    status: [data["GSSM-FIRST"].status_alarm, data["GSSM-FIRST"].status_alarm],
                  }}
                />
              </div>
              <div className="col-start-12 col-span-3 row-start-3 row-span-5">
                <CardProcess
                  title={data["FIM-FIRST"].mc_no}
                  subTitle={data["FIM-FIRST"].model}
                  processes={["FIM"]}
                  data={{
                    prodActual: [{ value: data["FIM-FIRST"].prod_ok, diff: data["FIM-FIRST"].diff_prod }],
                    ctActual: [{ value: data["FIM-FIRST"].cycle_t, diff: data["FIM-FIRST"].diff_ct }],
                    yield_rate: [data["FIM-FIRST"].yield_rate],
                    status: [data["FIM-FIRST"].status_alarm],
                  }}
                />
              </div>
              <div className="col-start-15 col-span-3 row-start-3 row-span-5">
                <CardProcess
                  title={`${data["ANT-FIRST"].mc_no} (REAR)`}
                  subTitle={data["ANT-FIRST"].model}
                  processes={["ANT"]}
                  data={{
                    prodActual: [{ value: data["ANT-FIRST"].rear_ok, diff: data["ANT-FIRST"].diff_prod_rear }],
                    ctActual: [{ value: data["ANT-FIRST"].rear_cycle_t, diff: data["ANT-FIRST"].diff_ct_rear }],
                    yield_rate: [data["ANT-FIRST"].yield_rear],
                    status: ["OFFLINE"],
                  }}
                />
              </div>
              <div className="col-start-18 col-span-3 row-start-3 row-span-5">
                <CardProcess
                  title="AOD01"
                  subTitle="TEST"
                  processes={["AOD"]}
                  data={{
                    prodActual: [{ value: 0, diff: 0 }],
                    ctActual: [{ value: 0, diff: 0 }],
                    yield_rate: [0],
                    status: ["OFFLINE"],
                  }}
                />
              </div>
              <div className="col-start-21 col-span-3 row-start-3 row-span-5">
                <CardProcess
                  title={data["AVS-FIRST"].mc_no}
                  subTitle={data["AVS-FIRST"].model}
                  processes={["AVS"]}
                  data={{
                    prodActual: [{ value: data["AVS-FIRST"].prod_ok, diff: data["AVS-FIRST"].diff_prod }],
                    ctActual: [{ value: data["AVS-FIRST"].cycle_t, diff: data["AVS-FIRST"].diff_ct }],
                    yield_rate: [data["AVS-FIRST"].yield_rate],
                    status: [data["AVS-FIRST"].status_alarm],
                  }}
                />
              </div>
              <div className="col-start-24 col-span-3 row-start-3 row-span-5">
                <CardProcess
                  title={data["ALU-FIRST"].mc_no}
                  subTitle={data["ALU-FIRST"].model}
                  processes={["ALU"]}
                  showArrow={false}
                  data={{
                    prodActual: [{ value: data["ALU-FIRST"].prod_ok, diff: data["ALU-FIRST"].diff_prod }],
                    ctActual: [{ value: data["ALU-FIRST"].cycle_t, diff: data["ALU-FIRST"].diff_ct }],
                    yield_rate: [0],
                    status: [data["ALU-FIRST"].status_alarm],
                  }}
                />
              </div>

              <div className="col-start-1 col-span-4 row-start-11 row-span-5">
                <CardProcess
                  title={data["MBR-SECOND"].mc_no}
                  subTitle={data["MBR-SECOND"].model}
                  processes={["GAUGE", "BALL"]}
                  data={{
                    prodActual: [
                      { value: 0, diff: 0 },
                      { value: data["MBR-SECOND"].prod_ok, diff: data["MBR-SECOND"].diff_prod },
                    ],
                    ctActual: [
                      { value: 0, diff: 0 },
                      { value: data["MBR-SECOND"].cycle_t, diff: data["MBR-SECOND"].diff_ct },
                    ],
                    yield_rate: [0, data["MBR-SECOND"].yield_rate],
                    status: ["OFFLINE", data["MBR-SECOND"].status_alarm],
                  }}
                />
              </div>
              <div className="col-start-5 col-span-3 row-start-11 row-span-5">
                <CardProcess
                  title={data["ARP-SECOND"].mc_no}
                  subTitle={data["ARP-SECOND"].model}
                  processes={["ARP"]}
                  data={{
                    prodActual: [{ value: data["ARP-SECOND"].prod_ok, diff: data["ARP-SECOND"].diff_prod }],
                    ctActual: [{ value: data["ARP-SECOND"].cycle_t, diff: data["ARP-SECOND"].diff_ct }],
                    yield_rate: [data["ARP-SECOND"].yield_rate],
                    status: [data["ARP-SECOND"].status_alarm],
                  }}
                />
              </div>
              <div className="col-start-8 col-span-4 row-start-11 row-span-5">
                <CardProcess
                  title={data["GSSM-SECOND"].mc_no}
                  subTitle={data["GSSM-SECOND"].model}
                  processes={["GREASE", "SHIELD"]}
                  data={{
                    prodActual: [
                      { value: data["GSSM-SECOND"].grease_ok, diff: data["GSSM-SECOND"].diff_prod_grease },
                      { value: data["GSSM-SECOND"].shield_ok, diff: data["GSSM-SECOND"].diff_prod_shield },
                    ],
                    ctActual: [
                      { value: data["GSSM-SECOND"].cycle_t, diff: data["GSSM-SECOND"].diff_ct },
                      { value: data["GSSM-SECOND"].cycle_t, diff: data["GSSM-SECOND"].diff_ct },
                    ],
                    yield_rate: [data["GSSM-SECOND"].yield_grease, data["GSSM-SECOND"].yield_shield],
                    status: [data["GSSM-SECOND"].status_alarm, data["GSSM-SECOND"].status_alarm],
                  }}
                />
              </div>
              <div className="col-start-12 col-span-3 row-start-11 row-span-5">
                <CardProcess
                  title={data["FIM-SECOND"].mc_no}
                  subTitle={data["FIM-SECOND"].model}
                  processes={["FIM"]}
                  data={{
                    prodActual: [{ value: data["FIM-SECOND"].prod_ok, diff: data["FIM-SECOND"].diff_prod }],
                    ctActual: [{ value: data["FIM-SECOND"].cycle_t, diff: data["FIM-SECOND"].diff_ct }],
                    yield_rate: [data["FIM-SECOND"].yield_rate],
                    status: [data["FIM-SECOND"].status_alarm],
                  }}
                />
              </div>
              <div className="col-start-15 col-span-3 row-start-11 row-span-5">
                <CardProcess
                  title={`${data["ANT-FIRST"].mc_no} (FRONT)`}
                  subTitle={data["ANT-FIRST"].model}
                  processes={["ANT"]}
                  data={{
                    prodActual: [{ value: data["ANT-FIRST"].front_ok, diff: data["ANT-FIRST"].diff_prod_front }],
                    ctActual: [{ value: data["ANT-FIRST"].front_cycle_t, diff: data["ANT-FIRST"].diff_ct_front }],
                    yield_rate: [data["ANT-FIRST"].yield_front],
                    status: ["OFFLINE"],
                  }}
                />
              </div>
              <div className="col-start-18 col-span-3 row-start-11 row-span-5">
                <CardProcess
                  title="AOD02"
                  subTitle="TEST"
                  processes={["AOD"]}
                  data={{
                    prodActual: [{ value: 0, diff: 0 }],
                    ctActual: [{ value: 0, diff: 0 }],
                    yield_rate: [0],
                    status: ["OFFLINE"],
                  }}
                />
              </div>
              <div className="col-start-21 col-span-3 row-start-11 row-span-5">
                <CardProcess
                  title={data["AVS-SECOND"].mc_no}
                  subTitle={data["AVS-SECOND"].model}
                  processes={["AVS"]}
                  data={{
                    prodActual: [{ value: data["AVS-SECOND"].prod_ok, diff: data["AVS-SECOND"].diff_prod }],
                    ctActual: [{ value: data["AVS-SECOND"].cycle_t, diff: data["AVS-SECOND"].diff_ct }],
                    yield_rate: [data["AVS-SECOND"].yield_rate],
                    status: [data["AVS-SECOND"].status_alarm],
                  }}
                />
              </div>
              <div className="col-start-24 col-span-3 row-start-11 row-span-5">
                <CardProcess
                  title={data["ALU-SECOND"].mc_no}
                  subTitle={data["ALU-SECOND"].model}
                  processes={["ALU"]}
                  showArrow={false}
                  data={{
                    prodActual: [{ value: data["ALU-SECOND"].prod_ok, diff: data["ALU-SECOND"].diff_prod }],
                    ctActual: [{ value: data["ALU-SECOND"].cycle_t, diff: data["ALU-SECOND"].diff_ct }],
                    yield_rate: [0],
                    status: [data["ALU-SECOND"].status_alarm],
                  }}
                />
              </div>

              <div className="col-start-15 row-start-8 col-span-3 row-span-3 flex flex-col items-center mr-5 h-full">
                <div className={`w-3 h-full bg-red-500`}></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

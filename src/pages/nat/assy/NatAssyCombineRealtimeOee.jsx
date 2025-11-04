import PageBreadcrumb from "../../../components/common/PageBreadcrumb";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import moment from "moment/moment";
import { BASE_URL } from "../../../constance/constance";
import CardProcess from "../../../components/common/CardProcess";
import CardOee from "../../../components/common/CardOee";

const refreshTime = 30;

export default function NatAssyCombineRealtimeOee() {
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
      <PageBreadcrumb pageTitle="NAT : ASSY COMBINE REALTIME OEE" />
      <div className="flex flex-row-reverse">
        <div>
          Update : {fetchTime} <span className="text-red-600">(Refresh in {countdown}s)</span>
        </div>
      </div>

      <div className="p-0">
        {Object.keys(realtime_data).map((item, index) => {
          const data = realtime_data[item];
          return (
            <div key={index} className="grid grid-cols-26 grid-rows-21 items-end mb-15">
              <div className="col-start-1 row-start-1 col-span-14 row-span-2">
                <div className="flex gap-[0.83vw] mb-2">
                  <div className="w-[8.33vw] h-[4.7vw] font-semibold text-slate-700 rounded-xl border bg-white shadow-md flex flex-col justify-center items-center">
                    <div className="text-[clamp(1rem,1.25vw,1.5rem)]">LINE : {item.split("&")[0]}</div>
                  </div>
                  <div className="w-[9vw] h-[4.7vw] font-semibold text-slate-700 rounded-xl border bg-white shadow-md flex flex-col justify-center items-center">
                    <div className="text-[clamp(0.8rem,0.94vw,1.125rem)]">PACKING</div>
                    <div className="text-[clamp(0.875rem,1.04vw,1.25rem)]">{data["ALU-FIRST"].prod_ok.toLocaleString()}</div>
                  </div>
                </div>
              </div>

              <div className="col-start-1 row-start-10 col-span-14 row-span-2">
                <div className="flex gap-[0.83vw] mb-2">
                  <div className="w-[8.33vw] h-[4.7vw] font-semibold text-slate-700 rounded-xl border bg-white shadow-md flex flex-col justify-center items-center">
                    <div className="text-[clamp(1rem,1.25vw,1.5rem)]">LINE : {item.split("&")[1]}</div>
                  </div>
                  <div className="w-[9vw] h-[4.7vw] font-semibold text-slate-700 rounded-xl border bg-white shadow-md flex flex-col justify-center items-center">
                    <div className="text-[clamp(0.8rem,0.94vw,1.125rem)]">PACKING</div>
                    <div className="text-[clamp(0.875rem,1.04vw,1.25rem)]">{data["ALU-SECOND"].prod_ok.toLocaleString()}</div>
                  </div>
                </div>
              </div>

              <div className="col-start-1 col-span-4 row-start-3 row-span-6">
                <CardOee
                  title={data["MBR-FIRST"].mc_no}
                  subTitle={data["MBR-FIRST"].part_no}
                  processes={["GAUGE", "BALL"]}
                  data={{
                    actualOk: [0, data["MBR-FIRST"].prod_ok],
                    actualNg: [0, data["MBR-FIRST"].prod_ng],
                    targetCt: [0, data["MBR-FIRST"].target_ct],
                    actualCt: [0, data["MBR-FIRST"].cycle_t],
                    planRun: [0, data["MBR-FIRST"].total_time],
                    downTime: [0, data["MBR-FIRST"].downtime_seconds],
                    oee: [0, data["MBR-FIRST"].oee],
                    availability: [0, data["MBR-FIRST"].availability],
                    performance: [0, data["MBR-FIRST"].performance],
                    quality: [0, data["MBR-FIRST"].yield_rate],
                    status: ["OFFLINE", data["MBR-FIRST"].status_alarm],
                  }}
                />
              </div>
              <div className="col-start-5 col-span-3 row-start-3 row-span-6">
                <CardOee
                  title={data["ARP-FIRST"].mc_no}
                  subTitle={data["ARP-FIRST"].part_no}
                  processes={["ARP"]}
                  data={{
                    actualOk: [data["ARP-FIRST"].prod_ok],
                    actualNg: [data["ARP-FIRST"].prod_ng],
                    targetCt: [data["ARP-FIRST"].target_ct],
                    actualCt: [data["ARP-FIRST"].cycle_t],
                    planRun: [data["ARP-FIRST"].total_time],
                    downTime: [data["ARP-FIRST"].downtime_seconds],
                    oee: [data["ARP-FIRST"].oee],
                    availability: [data["ARP-FIRST"].availability],
                    performance: [data["ARP-FIRST"].performance],
                    quality: [data["ARP-FIRST"].yield_rate],
                    status: [data["ARP-FIRST"].status_alarm],
                  }}
                />
              </div>
              <div className="col-start-8 col-span-4 row-start-3 row-span-6">
                <CardOee
                  title={data["GSSM-FIRST"].mc_no}
                  subTitle={data["GSSM-FIRST"].part_no}
                  processes={["GAUGE", "BALL"]}
                  data={{
                    actualOk: [data["GSSM-FIRST"].grease_ok, data["GSSM-FIRST"].shield_ok],
                    actualNg: [data["GSSM-FIRST"].prod_ng_grease, data["GSSM-FIRST"].prod_ng_shield],
                    targetCt: [data["GSSM-FIRST"].target_ct],
                    actualCt: [data["GSSM-FIRST"].cycle_t],
                    planRun: [data["GSSM-FIRST"].total_time],
                    downTime: [data["GSSM-FIRST"].downtime_seconds],
                    oee: [data["GSSM-FIRST"].oee_grease, data["GSSM-FIRST"].oee_shield],
                    availability: [data["GSSM-FIRST"].availability, data["GSSM-FIRST"].availability],
                    performance: [data["GSSM-FIRST"].performance_grease, data["GSSM-FIRST"].performance_shield],
                    quality: [data["GSSM-FIRST"].yield_grease, data["GSSM-FIRST"].yield_shield],
                    status: [data["GSSM-FIRST"].status_alarm],
                  }}
                />
              </div>
              <div className="col-start-12 col-span-3 row-start-3 row-span-6">
                <CardOee
                  title={data["FIM-FIRST"].mc_no}
                  subTitle={data["FIM-FIRST"].part_no}
                  processes={["FIM"]}
                  data={{
                    actualOk: [data["FIM-FIRST"].prod_ok],
                    actualNg: [data["FIM-FIRST"].prod_ng],
                    targetCt: [data["FIM-FIRST"].target_ct],
                    actualCt: [data["FIM-FIRST"].cycle_t],
                    planRun: [data["FIM-FIRST"].total_time],
                    downTime: [data["FIM-FIRST"].downtime_seconds],
                    oee: [data["FIM-FIRST"].oee],
                    availability: [data["FIM-FIRST"].availability],
                    performance: [data["FIM-FIRST"].performance],
                    quality: [data["FIM-FIRST"].yield_rate],
                    status: [data["FIM-FIRST"].status_alarm],
                  }}
                />
              </div>
              <div className="col-start-15 col-span-3 row-start-3 row-span-6">
                <CardOee
                  title={`${data["ANT-FIRST"].mc_no} (REAR)`}
                  subTitle={data["ANT-FIRST"].part_no}
                  processes={["ANT"]}
                  data={{
                    actualOk: [data["ANT-FIRST"].rear_ok],
                    actualNg: [data["ANT-FIRST"].prod_ng_rear],
                    targetCt: [data["ANT-FIRST"].target_ct],
                    actualCt: [data["ANT-FIRST"].rear_cycle_t],
                    planRun: [data["ANT-FIRST"].total_time_rear],
                    downTime: [data["ANT-FIRST"].downtime_seconds_rear],
                    oee: [data["ANT-FIRST"].oee_rear],
                    availability: [data["ANT-FIRST"].availability_rear],
                    performance: [data["ANT-FIRST"].performance_rear],
                    quality: [data["ANT-FIRST"].yield_rear],
                    status: [data["ANT-FIRST"].status_alarm_rear],
                  }}
                />
              </div>
              <div className="col-start-18 col-span-3 row-start-3 row-span-6">
                <CardOee
                  title="AOD01"
                  subTitle="TEST"
                  processes={["AOD"]}
                  data={{
                    actualOk: [0],
                    actualNg: [0],
                    targetCt: [0],
                    actualCt: [0],
                    planRun: [0],
                    downTime: [0],
                    oee: [0],
                    availability: [0],
                    performance: [0],
                    quality: [0],
                    status: ["OFFLINE"],
                  }}
                />
              </div>
              <div className="col-start-21 col-span-3 row-start-3 row-span-6">
                <CardOee
                  title={data["AVS-FIRST"].mc_no}
                  subTitle={data["AVS-FIRST"].part_no}
                  processes={["AVS"]}
                  data={{
                    actualOk: [data["AVS-FIRST"].prod_ok],
                    actualNg: [data["AVS-FIRST"].prod_ng],
                    targetCt: [data["AVS-FIRST"].target_ct],
                    actualCt: [data["AVS-FIRST"].cycle_t],
                    planRun: [data["AVS-FIRST"].total_time],
                    downTime: [data["AVS-FIRST"].downtime_seconds],
                    oee: [data["AVS-FIRST"].oee],
                    availability: [data["AVS-FIRST"].availability],
                    performance: [data["AVS-FIRST"].performance],
                    quality: [data["AVS-FIRST"].yield_rate],
                    status: [data["AVS-FIRST"].status_alarm],
                  }}
                />
              </div>
              <div className="col-start-24 col-span-3 row-start-3 row-span-6">
                <CardOee
                  title={data["ALU-FIRST"].mc_no}
                  subTitle={data["ALU-FIRST"].part_no}
                  processes={["ALU"]}
                  showArrow={false}
                  data={{
                    actualOk: [data["ALU-FIRST"].prod_ok],
                    actualNg: [data["ALU-FIRST"].prod_ng],
                    targetCt: [data["ALU-FIRST"].target_ct],
                    actualCt: [data["ALU-FIRST"].cycle_t],
                    planRun: [data["ALU-FIRST"].total_time],
                    downTime: [data["ALU-FIRST"].downtime_seconds],
                    oee: [data["ALU-FIRST"].oee],
                    availability: [data["ALU-FIRST"].availability],
                    performance: [data["ALU-FIRST"].performance],
                    quality: [data["ALU-FIRST"].yield_rate],
                    status: [data["ALU-FIRST"].status_alarm],
                  }}
                />
              </div>

              <div className="col-start-1 col-span-4 row-start-12 row-span-6">
                <CardOee
                  title={data["MBR-SECOND"].mc_no}
                  subTitle={data["MBR-SECOND"].part_no}
                  processes={["GAUGE", "BALL"]}
                  data={{
                    actualOk: [0, data["MBR-SECOND"].prod_ok],
                    actualNg: [0, data["MBR-SECOND"].prod_ng],
                    targetCt: [0, data["MBR-SECOND"].target_ct],
                    actualCt: [0, data["MBR-SECOND"].cycle_t],
                    planRun: [0, data["MBR-SECOND"].total_time],
                    downTime: [0, data["MBR-SECOND"].downtime_seconds],
                    oee: [0, data["MBR-SECOND"].oee],
                    availability: [0, data["MBR-SECOND"].availability],
                    performance: [0, data["MBR-SECOND"].performance],
                    quality: [0, data["MBR-SECOND"].yield_rate],
                    status: ["OFFLINE", data["MBR-SECOND"].status_alarm],
                  }}
                />
              </div>
              <div className="col-start-5 col-span-3 row-start-12 row-span-6">
                <CardOee
                  title={data["ARP-SECOND"].mc_no}
                  subTitle={data["ARP-SECOND"].part_no}
                  processes={["ARP"]}
                  data={{
                    actualOk: [data["ARP-SECOND"].prod_ok],
                    actualNg: [data["ARP-SECOND"].prod_ng],
                    targetCt: [data["ARP-SECOND"].target_ct],
                    actualCt: [data["ARP-SECOND"].cycle_t],
                    planRun: [data["ARP-SECOND"].total_time],
                    downTime: [data["ARP-SECOND"].downtime_seconds],
                    oee: [data["ARP-SECOND"].oee],
                    availability: [data["ARP-SECOND"].availability],
                    performance: [data["ARP-SECOND"].performance],
                    quality: [data["ARP-SECOND"].yield_rate],
                    status: [data["ARP-SECOND"].status_alarm],
                  }}
                />
              </div>
              <div className="col-start-8 col-span-4 row-start-12 row-span-6">
                <CardOee
                  title={data["GSSM-SECOND"].mc_no}
                  subTitle={data["GSSM-SECOND"].part_no}
                  processes={["GREASE", "SHIELD"]}
                  data={{
                    actualOk: [data["GSSM-SECOND"].grease_ok, data["GSSM-SECOND"].shield_ok],
                    actualNg: [data["GSSM-SECOND"].prod_ng_grease, data["GSSM-SECOND"].prod_ng_shield],
                    targetCt: [data["GSSM-SECOND"].target_ct],
                    actualCt: [data["GSSM-SECOND"].cycle_t],
                    planRun: [data["GSSM-SECOND"].total_time],
                    downTime: [data["GSSM-SECOND"].downtime_seconds],
                    oee: [data["GSSM-SECOND"].oee_grease, data["GSSM-SECOND"].oee_shield],
                    availability: [data["GSSM-SECOND"].availability, data["GSSM-SECOND"].availability],
                    performance: [data["GSSM-SECOND"].performance_grease, data["GSSM-SECOND"].performance_shield],
                    quality: [data["GSSM-SECOND"].yield_grease, data["GSSM-SECOND"].yield_shield],
                    status: [data["GSSM-SECOND"].status_alarm],
                  }}
                />
              </div>
              <div className="col-start-12 col-span-3 row-start-12 row-span-6">
                <CardOee
                  title={data["FIM-SECOND"].mc_no}
                  subTitle={data["FIM-SECOND"].part_no}
                  processes={["FIM"]}
                  data={{
                    actualOk: [data["FIM-SECOND"].prod_ok],
                    actualNg: [data["FIM-SECOND"].prod_ng],
                    targetCt: [data["FIM-SECOND"].target_ct],
                    actualCt: [data["FIM-SECOND"].cycle_t],
                    planRun: [data["FIM-SECOND"].total_time],
                    downTime: [data["FIM-SECOND"].downtime_seconds],
                    oee: [data["FIM-SECOND"].oee],
                    availability: [data["FIM-SECOND"].availability],
                    performance: [data["FIM-SECOND"].performance],
                    quality: [data["FIM-SECOND"].yield_rate],
                    status: [data["FIM-SECOND"].status_alarm],
                  }}
                />
              </div>
              <div className="col-start-15 col-span-3 row-start-12 row-span-6">
                <CardOee
                  title={`${data["ANT-FIRST"].mc_no} (FRONT)`}
                  subTitle={data["ANT-FIRST"].part_no}
                  processes={["ANT"]}
                  data={{
                    actualOk: [data["ANT-FIRST"].front_ok],
                    actualNg: [data["ANT-FIRST"].prod_ng_front],
                    targetCt: [data["ANT-FIRST"].target_ct],
                    actualCt: [data["ANT-FIRST"].front_cycle_t],
                    planRun: [data["ANT-FIRST"].total_time_front],
                    downTime: [data["ANT-FIRST"].downtime_seconds_front],
                    oee: [data["ANT-FIRST"].oee_front],
                    availability: [data["ANT-FIRST"].availability_front],
                    performance: [data["ANT-FIRST"].performance_front],
                    quality: [data["ANT-FIRST"].yield_front],
                    status: [data["ANT-FIRST"].status_alarm_front],
                  }}
                />
              </div>
              <div className="col-start-18 col-span-3 row-start-12 row-span-6">
                <CardOee
                  title="AOD02"
                  subTitle="TEST"
                  processes={["AOD"]}
                  data={{
                    actualOk: [0],
                    actualNg: [0],
                    targetCt: [0],
                    actualCt: [0],
                    planRun: [0],
                    downTime: [0],
                    oee: [0],
                    availability: [0],
                    performance: [0],
                    quality: [0],
                    status: ["OFFLINE"],
                  }}
                />
              </div>
              <div className="col-start-21 col-span-3 row-start-12 row-span-6">
                <CardOee
                  title={data["AVS-SECOND"].mc_no}
                  subTitle={data["AVS-SECOND"].part_no}
                  processes={["AVS"]}
                  data={{
                    actualOk: [data["AVS-SECOND"].prod_ok],
                    actualNg: [data["AVS-SECOND"].prod_ng],
                    targetCt: [data["AVS-SECOND"].target_ct],
                    actualCt: [data["AVS-SECOND"].cycle_t],
                    planRun: [data["AVS-SECOND"].total_time],
                    downTime: [data["AVS-SECOND"].downtime_seconds],
                    oee: [data["AVS-SECOND"].oee],
                    availability: [data["AVS-SECOND"].availability],
                    performance: [data["AVS-SECOND"].performance],
                    quality: [data["AVS-SECOND"].yield_rate],
                    status: [data["AVS-SECOND"].status_alarm],
                  }}
                />
              </div>
              <div className="col-start-24 col-span-3 row-start-12 row-span-6">
                <CardOee
                  title={data["ALU-SECOND"].mc_no}
                  subTitle={data["ALU-SECOND"].part_no}
                  processes={["ALU"]}
                  showArrow={false}
                  data={{
                    actualOk: [data["ALU-SECOND"].prod_ok],
                    actualNg: [data["ALU-SECOND"].prod_ng],
                    targetCt: [data["ALU-SECOND"].target_ct],
                    actualCt: [data["ALU-SECOND"].cycle_t],
                    planRun: [data["ALU-SECOND"].total_time],
                    downTime: [data["ALU-SECOND"].downtime_seconds],
                    oee: [data["ALU-SECOND"].oee],
                    availability: [data["ALU-SECOND"].availability],
                    performance: [data["ALU-SECOND"].performance],
                    quality: [data["ALU-SECOND"].yield_rate],
                    status: [data["ALU-SECOND"].status_alarm],
                  }}
                />
              </div>

              <div className="col-start-15 row-start-9 col-span-3 row-span-3 flex flex-col items-center mr-5 h-full">
                <div
                  className={`w-3 h-full ${
                    data["ANT-FIRST"].status_alarm_front === "RUNNING" && data["ANT-FIRST"].status_alarm_rear === "RUNNING"
                      ? "animated-flow"
                      : "bg-red-500"
                  }`}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

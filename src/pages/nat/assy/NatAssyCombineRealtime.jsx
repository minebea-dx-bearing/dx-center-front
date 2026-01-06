import PageBreadcrumb from "../../../components/common/PageBreadcrumb";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import moment from "moment/moment";
import { BASE_URL, TWN_URL } from "../../../constance/constance";
import CardProcess from "../../../components/common/CardProcess";
import BreadCrumbs from "../../../components/redesign/BreadCrumbs";

const refreshTime = 30;

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
      const response1 = await axios.get(`${TWN_URL}/nat/assy/combine-realtime`, {
          headers: {
          "Cache-Control": "no-cache",
          Pragma: "no-cache",
          Expires: "0",
        },
      });
      setFetchTime(moment().format("DD-MMM HH:mm"));
      setRealtimeData(response1.data.data);
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
      {/* <PageBreadcrumb pageTitle="NAT : ASSY COMBINE REALTIME" /> */}
      <BreadCrumbs />
      <div className="flex flex-row-reverse">
        <div>
          Update : {fetchTime} <span className="text-red-600">(Refresh in {countdown}s)</span>
        </div>
      </div>

      <div className="p-0">
        {Object.keys(realtime_data).map((item, index) => {
          const data = realtime_data[item];
          return (
            <div key={index} className="grid grid-cols-26 grid-rows-15 items-end mb-15">
              <div className="col-start-1 row-start-1 col-span-14 row-span-2">
                <div className="flex gap-[0.83vw] mb-2">
                  <div className="w-[8.33vw] h-[4.0vw] font-semibold text-slate-700 rounded-xl border bg-white shadow-md flex flex-col justify-center items-center">
                    <div className="text-[clamp(1rem,1.25vw,1.5rem)]">LINE : {item.split("&")[0]}</div>
                  </div>
                  <div className="w-[9vw] h-[4.0vw] font-semibold text-slate-700 rounded-xl border bg-white shadow-md flex flex-col justify-center items-center">
                    <div className="text-[clamp(0.8rem,0.94vw,1.125rem)]">PACKING</div>
                    <div className="text-[clamp(0.875rem,1.04vw,1.25rem)]">{data["ALU-FIRST"]?.act_pd.toLocaleString()}</div>
                  </div>
                </div>
              </div>

              <div className="col-start-1 row-start-9 col-span-14 row-span-2">
                <div className="flex gap-[0.83vw] mb-2">
                  <div className="w-[8.33vw] h-[4.0vw] font-semibold text-slate-700 rounded-xl border bg-white shadow-md flex flex-col justify-center items-center">
                    <div className="text-[clamp(1rem,1.25vw,1.5rem)]">LINE : {item.split("&")[1]}</div>
                  </div>
                  <div className="w-[9vw] h-[4.0vw] font-semibold text-slate-700 rounded-xl border bg-white shadow-md flex flex-col justify-center items-center">
                    <div className="text-[clamp(0.8rem,0.94vw,1.125rem)]">PACKING</div>
                    <div className="text-[clamp(0.875rem,1.04vw,1.25rem)]">{data["ALU-SECOND"]?.act_pd.toLocaleString()}</div>
                  </div>
                </div>
              </div>

              <div className="col-start-1 col-span-4 row-start-3 row-span-5">
                <CardProcess
                  title={data["MBR-FIRST"]?.mc_no || "N/A"}
                  subTitle={data["MBR-FIRST"]?.part_no || "N/A"}
                  processes={["GAUGE", "BALL"]}
                  data={{
                    prodActual: [
                      {
                        value: data["MBR_F-FIRST"]?.f_act_pd,
                        diff: data["MBR_F-FIRST"]?.f_diff_pd,
                      },
                      {
                        value: data["MBR-FIRST"]?.s_act_pd,
                        diff: data["MBR-FIRST"]?.s_diff_pd,
                      },
                    ],
                    ctActual: [
                      {
                        value: data["MBR_F-FIRST"]?.f_act_ct,
                        diff: data["MBR_F-FIRST"]?.f_diff_ct,
                      },
                      {
                        value: data["MBR-FIRST"]?.s_act_ct,
                        diff: data["MBR-FIRST"]?.s_diff_ct,
                      },
                    ],
                    yield_target: [data["MBR_F-FIRST"]?.f_target_yield, data["MBR-FIRST"]?.s_target_yield],
                    yield_rate: [data["MBR_F-FIRST"]?.f_curr_yield, data["MBR-FIRST"]?.s_curr_yield],
                    status: [data["MBR_F-FIRST"]?.f_status_alarm, data["MBR-FIRST"]?.s_status_alarm],
                  }}
                />
              </div>
              <div className="col-start-5 col-span-3 row-start-3 row-span-5">
                <CardProcess
                  title={data["ARP-FIRST"]?.mc_no || "N/A"}
                  subTitle={data["ARP-FIRST"]?.part_no || "N/A"}
                  processes={["ARP"]}
                  data={{
                    prodActual: [
                      {
                        value: data["ARP-FIRST"]?.act_pd,
                        diff: data["ARP-FIRST"]?.diff_pd,
                      },
                    ],
                    ctActual: [
                      {
                        value: data["ARP-FIRST"]?.act_ct,
                        diff: data["ARP-FIRST"]?.diff_ct,
                      },
                    ],
                    yield_target: [data["ARP-FIRST"]?.target_yield],
                    yield_rate: [data["ARP-FIRST"]?.curr_yield],
                    status: [data["ARP-FIRST"]?.status_alarm],
                  }}
                />
              </div>
              <div className="col-start-8 col-span-4 row-start-3 row-span-5">
                <CardProcess
                  title={data["GSSM-FIRST"]?.mc_no || "N/A"}
                  subTitle={data["GSSM-FIRST"]?.part_no || "N/A"}
                  processes={["GREASE", "SHIELD"]}
                  data={{
                    prodActual: [
                      {
                        value: data["GSSM-FIRST"]?.grease_ok,
                        diff: data["GSSM-FIRST"]?.diff_prod_grease,
                      },
                      {
                        value: data["GSSM-FIRST"]?.shield_ok,
                        diff: data["GSSM-FIRST"]?.diff_prod_shield,
                      },
                    ],
                    ctActual: [
                      {
                        value: data["GSSM-FIRST"]?.cycle_t,
                        diff: data["GSSM-FIRST"]?.diff_ct,
                      },
                    ],
                    yield_target: [data["GSSM-FIRST"]?.target_yield],
                    yield_rate: [data["GSSM-FIRST"]?.yield_shield],
                    status: [data["GSSM-FIRST"]?.status_alarm],
                  }}
                />
              </div>
              <div className="col-start-12 col-span-3 row-start-3 row-span-5">
                <CardProcess
                  title={data["FIM-FIRST"]?.mc_no || "N/A"}
                  subTitle={data["FIM-FIRST"]?.part_no || "N/A"}
                  processes={["FIM"]}
                  data={{
                    prodActual: [
                      {
                        value: data["FIM-FIRST"]?.act_pd,
                        diff: data["FIM-FIRST"]?.diff_pd,
                      },
                    ],
                    ctActual: [
                      {
                        value: data["FIM-FIRST"]?.act_ct,
                        diff: data["FIM-FIRST"]?.diff_ct,
                      },
                    ],
                    yield_target: [data["FIM-FIRST"]?.target_yield],
                    yield_rate: [data["FIM-FIRST"]?.curr_yield],
                    status: [data["FIM-FIRST"]?.status_alarm],
                  }}
                />
              </div>
              <div className="col-start-15 col-span-3 row-start-3 row-span-5">
                <CardProcess
                  title={`${data["ANT-FIRST"]?.mc_no || "N/A"} (REAR)`}
                  subTitle={data["ANT-FIRST"]?.part_no || "-"}
                  processes={["ANT"]}
                  data={{
                    prodActual: [
                      {
                        value: data["ANT-FIRST"]?.ok_rear,
                        diff: data["ANT-FIRST"]?.diff_prod_rear,
                      },
                    ],
                    ctActual: [
                      {
                        value: data["ANT-FIRST"]?.cycle_time_rear,
                        diff: data["ANT-FIRST"]?.diff_ct_rear,
                      },
                    ],
                    yield_target: [data["ANT-FIRST"]?.target_yield],
                    yield_rate: [data["ANT-FIRST"]?.yield_rear],
                    status: [data["ANT-FIRST"]?.status_alarm_rear],
                  }}
                />
              </div>
              <div className="col-start-18 col-span-3 row-start-3 row-span-5">
                <CardProcess
                  title={data["AOD-FIRST"]?.mc_no || "N/A"}
                  subTitle={data["AOD-FIRST"]?.part_no || "N/A"}
                  processes={["AOD"]}
                  data={{
                    prodActual: [
                      {
                        value: data["AOD-FIRST"]?.act_pd,
                        diff: data["AOD-FIRST"]?.diff_pd,
                      },
                    ],
                    ctActual: [
                      {
                        value: data["AOD-FIRST"]?.act_ct,
                        diff: data["AOD-FIRST"]?.diff_ct,
                      },
                    ],
                    yield_target: [data["AOD-FIRST"]?.target_yield],
                    yield_rate: [data["AOD-FIRST"]?.curr_yield],
                    status: [data["AOD-FIRST"]?.status_alarm],
                  }}
                />
              </div>
              <div className="col-start-21 col-span-3 row-start-3 row-span-5">
                <CardProcess
                  title={data["AVS-FIRST"]?.mc_no || "N/A"}
                  subTitle={data["AVS-FIRST"]?.part_no || "N/A"}
                  processes={["AVS"]}
                  data={{
                    prodActual: [
                      {
                        value: data["AVS-FIRST"]?.act_pd,
                        diff: data["AVS-FIRST"]?.diff_pd,
                      },
                    ],
                    ctActual: [
                      {
                        value: data["AVS-FIRST"]?.act_ct,
                        diff: data["AVS-FIRST"]?.diff_ct,
                      },
                    ],
                    yield_target: [data["AVS-FIRST"]?.target_yield],
                    yield_rate: [data["AVS-FIRST"]?.curr_yield],
                    status: [data["AVS-FIRST"]?.status_alarm],
                  }}
                />
              </div>
              <div className="col-start-24 col-span-3 row-start-3 row-span-5">
                <CardProcess
                  title={data["ALU-FIRST"]?.mc_no || "N/A"}
                  subTitle={data["ALU-FIRST"]?.part_no || "N/A"}
                  processes={["ALU"]}
                  showArrow={false}
                  data={{
                    prodActual: [
                      {
                        value: data["ALU-FIRST"]?.act_pd,
                        diff: data["ALU-FIRST"]?.diff_pd,
                      },
                    ],
                    ctActual: [
                      {
                        value: data["ALU-FIRST"]?.act_ct,
                        diff: data["ALU-FIRST"]?.diff_ct,
                      },
                    ],
                    yield_target: [data["ALU-FIRST"]?.target_yield],
                    yield_rate: [data["ALU-FIRST"]?.curr_yield],
                    status: [data["ALU-FIRST"]?.status_alarm],
                  }}
                />
              </div>

              <div className="col-start-1 col-span-4 row-start-11 row-span-5">
                <CardProcess
                  title={data["MBR-SECOND"]?.mc_no || "N/A"}
                  subTitle={data["MBR-SECOND"]?.part_no || "N/A"}
                  processes={["GAUGE", "BALL"]}
                  data={{
                    prodActual: [
                      {
                        value: data["MBR_F-SECOND"]?.f_act_pd,
                        diff: data["MBR_F-SECOND"]?.f_diff_pd,
                      },
                      {
                        value: data["MBR-SECOND"]?.s_act_pd,
                        diff: data["MBR-SECOND"]?.s_diff_pd,
                      },
                    ],
                    ctActual: [
                      {
                        value: data["MBR_F-SECOND"]?.f_act_ct,
                        diff: data["MBR_F-SECOND"]?.f_diff_ct,
                      },
                      {
                        value: data["MBR-SECOND"]?.s_act_ct,
                        diff: data["MBR-SECOND"]?.s_diff_ct,
                      },
                    ],
                    yield_target: [data["MBR_F-SECOND"]?.f_target_yield, data["MBR-SECOND"]?.s_target_yield],
                    yield_rate: [data["MBR_F-SECOND"]?.f_curr_yield, data["MBR-SECOND"]?.s_curr_yield],
                    status: [data["MBR_F-SECOND"]?.f_status_alarm, data["MBR-SECOND"]?.s_status_alarm],
                  }}
                />
              </div>
              <div className="col-start-5 col-span-3 row-start-11 row-span-5">
                <CardProcess
                  title={data["ARP-SECOND"]?.mc_no || "N/A"}
                  subTitle={data["ARP-SECOND"]?.part_no || "N/A"}
                  processes={["ARP"]}
                  data={{
                    prodActual: [
                      {
                        value: data["ARP-SECOND"]?.act_pd,
                        diff: data["ARP-SECOND"]?.diff_pd,
                      },
                    ],
                    ctActual: [
                      {
                        value: data["ARP-SECOND"]?.act_ct,
                        diff: data["ARP-SECOND"]?.diff_ct,
                      },
                    ],
                    yield_target: [data["ARP-SECOND"]?.target_yield],
                    yield_rate: [data["ARP-SECOND"]?.curr_yield],
                    status: [data["ARP-SECOND"]?.status_alarm],
                  }}
                />
              </div>
              <div className="col-start-8 col-span-4 row-start-11 row-span-5">
                <CardProcess
                  title={data["GSSM-SECOND"]?.mc_no || "N/A"}
                  subTitle={data["GSSM-SECOND"]?.part_no || "N/A"}
                  processes={["GREASE", "SHIELD"]}
                  data={{
                    prodActual: [
                      {
                        value: data["GSSM-SECOND"]?.grease_ok,
                        diff: data["GSSM-SECOND"]?.diff_prod_grease,
                      },
                      {
                        value: data["GSSM-SECOND"]?.shield_ok,
                        diff: data["GSSM-SECOND"]?.diff_prod_shield,
                      },
                    ],
                    ctActual: [
                      {
                        value: data["GSSM-SECOND"]?.cycle_t,
                        diff: data["GSSM-SECOND"]?.diff_ct,
                      },
                    ],
                    yield_target: [data["GSSM-SECOND"]?.target_yield],
                    yield_rate: [data["GSSM-SECOND"]?.yield_shield],
                    status: [data["GSSM-SECOND"]?.status_alarm],
                  }}
                />
              </div>
              <div className="col-start-12 col-span-3 row-start-11 row-span-5">
                <CardProcess
                  title={data["FIM-SECOND"]?.mc_no || "N/A"}
                  subTitle={data["FIM-SECOND"]?.part_no || "N/A"}
                  processes={["FIM"]}
                  data={{
                    prodActual: [
                      {
                        value: data["FIM-SECOND"]?.act_pd,
                        diff: data["FIM-SECOND"]?.diff_pd,
                      },
                    ],
                    ctActual: [
                      {
                        value: data["FIM-SECOND"]?.act_ct,
                        diff: data["FIM-SECOND"]?.diff_ct,
                      },
                    ],
                    yield_target: [data["FIM-SECOND"]?.target_yield],
                    yield_rate: [data["FIM-SECOND"]?.curr_yield],
                    status: [data["FIM-SECOND"]?.status_alarm],
                  }}
                />
              </div>
              <div className="col-start-15 col-span-3 row-start-11 row-span-5">
                <CardProcess
                  title={`${data["ANT-FIRST"]?.mc_no || "N/A"} (FRONT)`}
                  subTitle={data["ANT-FIRST"]?.part_no || "N/A"}
                  processes={["ANT"]}
                  data={{
                    prodActual: [
                      {
                        value: data["ANT-FIRST"]?.ok_front,
                        diff: data["ANT-FIRST"]?.diff_prod_front,
                      },
                    ],
                    ctActual: [
                      {
                        value: data["ANT-FIRST"]?.cycle_time_front,
                        diff: data["ANT-FIRST"]?.diff_ct_front,
                      },
                    ],
                    yield_target: [data["ANT-FIRST"]?.target_yield],
                    yield_rate: [data["ANT-FIRST"]?.yield_front],
                    status: [data["ANT-FIRST"]?.status_alarm_front],
                  }}
                />
              </div>
              <div className="col-start-18 col-span-3 row-start-11 row-span-5">
                <CardProcess
                  title={data["AOD-SECOND"]?.mc_no || "N/A"}
                  subTitle={data["AOD-SECOND"]?.part_no || "N/A"}
                  processes={["AOD"]}
                  data={{
                    prodActual: [
                      {
                        value: data["AOD-SECOND"]?.act_pd,
                        diff: data["AOD-SECOND"]?.diff_pd,
                      },
                    ],
                    ctActual: [
                      {
                        value: data["AOD-SECOND"]?.act_ct,
                        diff: data["AOD-SECOND"]?.diff_ct,
                      },
                    ],
                    yield_target: [data["AOD-SECOND"]?.target_yield],
                    yield_rate: [data["AOD-SECOND"]?.curr_yield],
                    status: [data["AOD-SECOND"]?.status_alarm],
                  }}
                />
              </div>
              <div className="col-start-21 col-span-3 row-start-11 row-span-5">
                <CardProcess
                  title={data["AVS-SECOND"]?.mc_no || "N/A"}
                  subTitle={data["AVS-SECOND"]?.part_no || "N/A"}
                  processes={["AVS"]}
                  data={{
                    prodActual: [
                      {
                        value: data["AVS-SECOND"]?.act_pd,
                        diff: data["AVS-SECOND"]?.diff_pd,
                      },
                    ],
                    ctActual: [
                      {
                        value: data["AVS-SECOND"]?.act_ct,
                        diff: data["AVS-SECOND"]?.diff_ct,
                      },
                    ],
                    yield_target: [data["AVS-SECOND"]?.target_yield],
                    yield_rate: [data["AVS-SECOND"]?.curr_yield],
                    status: [data["AVS-SECOND"]?.status_alarm],
                  }}
                />
              </div>
              <div className="col-start-24 col-span-3 row-start-11 row-span-5">
                <CardProcess
                  title={data["ALU-SECOND"]?.mc_no || "N/A"}
                  subTitle={data["ALU-SECOND"]?.part_no || "N/A"}
                  processes={["ALU"]}
                  showArrow={false}
                  data={{
                    prodActual: [
                      {
                        value: data["ALU-SECOND"]?.act_pd,
                        diff: data["ALU-SECOND"]?.diff_pd,
                      },
                    ],
                    ctActual: [
                      {
                        value: data["ALU-SECOND"]?.act_ct,
                        diff: data["ALU-SECOND"]?.diff_ct,
                      },
                    ],
                    yield_target: [data["ALU-SECOND"]?.target_yield],
                    yield_rate: [data["ALU-SECOND"]?.curr_yield],
                    status: [data["ALU-SECOND"]?.status_alarm],
                  }}
                />
              </div>

              <div className="col-start-15 row-start-8 col-span-3 row-span-3 flex flex-col items-center mr-5 h-full">
                <div
                  className={`w-3 h-full ${
                    data["ANT-FIRST"]?.status_alarm_front === "RUNNING" && data["ANT-FIRST"]?.status_alarm_rear === "RUNNING"
                      ? "animated-flow"
                      : data["ANT-FIRST"]?.status_alarm_front === undefined && data["ANT-FIRST"]?.status_alarm_rear === undefined
                      ? "bg-gray-300"
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

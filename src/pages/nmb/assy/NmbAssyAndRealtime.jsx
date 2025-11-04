import PageBreadcrumb from "../../../components/common/PageBreadcrumb";
import CardProd from "../../../components/common/CardProd";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import moment from "moment/moment";
import { BASE_URL } from "../../../constance/constance";
import CardMC2 from "../../../components/common/CardMC2";

const refreshTime = 60;

export default function NmbAssyAndRealtime() {
  const [loading, setLoading] = useState(false);
  const [fetchTime, setFetchTime] = useState();
  const [countdown, setCountdown] = useState(refreshTime);

  const isFirstLoad = useRef(true);

  const [realtime_data, setRealtimeData] = useState([]);
  const [summaryData, setSummaryData] = useState({ sum_target: 0, sum_daily_ok: 0, avg_cycle_t: 0, avg_opn: 0 });

  const fetchData = async () => {
    if (isFirstLoad.current) {
      setLoading(true);
    }
    try {
      const response1 = await axios.get(`${BASE_URL}/nmb/assy/and-realtime/get_data_realtime`, {
        headers: {
          "Cache-Control": "no-cache",
          Pragma: "no-cache",
          Expires: "0",
        },
      });
      setFetchTime(moment().format("DD-MMM HH:mm"));
      setRealtimeData(response1.data.data.data);
      setSummaryData(response1.data.data.resultSummary);
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
      <PageBreadcrumb pageTitle="ASSY : Realtime AND" />
      <div className="flex flex-row-reverse">
        <div>
          Update : {fetchTime} <span style={{ color: "red" }}>(Refresh in {countdown}s)</span>
        </div>
      </div>
      <div className="flex justify-center m-2">
        <CardProd title={"AND"} target={summaryData.sum_target} actual={summaryData.sum_daily_ok} avgCT={summaryData.avg_cycle_t} avgOpn={summaryData.avg_opn} />
      </div>

      <div className="flex flex-wrap">
        {realtime_data.map((mc) => {
          return (
            <div className="m-2" key={mc.mc_no}>
              <CardMC2
                mc_no={mc.mc_no}
                part_no={mc.wos || "-"}
                target={mc.target}
                actual={mc.prod_ok}
                actual_ng={mc.prod_ng}
                actual_ct={mc.average_cycle_time}
                yield_per={mc.yield_per}
                opn={mc.opn}
                status={mc.status_alarm}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

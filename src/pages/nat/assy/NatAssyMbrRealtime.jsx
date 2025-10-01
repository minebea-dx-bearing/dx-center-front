import PageBreadcrumb from "../../../components/common/PageBreadcrumb";
import CardProd from "../../../components/common/CardProd";
import CardMC from "../../../components/common/CardMC";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import moment from "moment/moment";
import { BASE_URL } from "../../../constance/constance";

const refreshTime = 60;

export default function NatAssyMbrRealtime() {
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
      const response1 = await axios.get(`${BASE_URL}/nat/assy/mbr-realtime/get_data_realtime`, {
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
      <PageBreadcrumb pageTitle="ASSY : Realtime MBR" />
      <div className="flex flex-row-reverse">
        <div>
          Update : {fetchTime} <span style={{ color: "red" }}>(Refresh in {countdown}s)</span>
        </div>
      </div>
      <div className="flex justify-center m-2">
        <CardProd
          title={"MBR"}
          target={summaryData.sum_target}
          actual={summaryData.sum_daily_ok}
          avgCT={summaryData.avg_cycle_t}
          avgOpn={summaryData.avg_opn}
        />
      </div>

      <div className="flex flex-wrap">
        {realtime_data.map((mc) => {
          return (
            <div className="m-2" key={mc.mc_no}>
              <CardMC
                mc_no={mc.mc_no}
                part_no={mc.model}
                target={mc.target}
                actual={mc.daily_ok}
                actual_ng={mc.daily_ng}
                target_ct={1.6}
                actual_ct={mc.cycle_t}
                yield_per={mc.yield_per}
                opn={mc.opn}
                c1_ok={mc.c1_ok}
                c2_ok={mc.c2_ok}
                c3_ok={mc.c3_ok}
                c4_ok={mc.c4_ok}
                c5_ok={mc.c5_ok}
                status={mc.status_alarm}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

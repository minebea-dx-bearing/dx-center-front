import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react'
import Swal from 'sweetalert2';
import PageBreadcrumb from '../../../components/common/PageBreadcrumb';
import Summary from '../../../components/redesign/realtime/Summary';
import DoubleDataCard from '../../../components/redesign/realtime/DoubleDataCard';
import DefaultCard from '../../../components/redesign/realtime/DefaultCard';
import { BASE_URL } from '../../../constance/constance';

// const refreshTime = 60;
const process = "2NDINBORE";

export default function NhbGd2IRBore() {
  const [loading, setLoading] = useState(false);
  // const [fetchTime, setFetchTime] = useState();
  const [countdown, setCountdown] = useState();
  let selectCard = "";
  let timeCounter = 0;

  const isFirstLoad = useRef(true);

  const [realtime_data, setRealtimeData] = useState([]);
  const [summaryData, setSummaryData] = useState({ sum_target: 0, sum_daily_ok: 0, avg_cycle_t: 0, avg_opn: 0 });

  const fetchData = async () => {
    if (isFirstLoad.current) {
      setLoading(true);
    }
    try {
      const response1 = await axios.get(`${BASE_URL}/nat/gd/${process}-realtime/get_data_realtime`, {
        headers: {
          "Cache-Control": "no-cache",
          Pragma: "no-cache",
          Expires: "0",
        },
      });
      // setFetchTime(moment().format("DD-MMM HH:mm"));
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

    setInterval(() => {
      // console.log('time count down',60-(moment().format("ss")), 'time',moment().format("ss"))
      timeCounter = 60 - moment().format("ss");
      setCountdown(timeCounter)
      if (timeCounter == 60) {
          fetchData();
      }
    }, 1000);

    // const timer = setInterval(() => {
    //   setCountdown((prevCountdown) => {
    //     if (prevCountdown <= 1) {
    //       fetchData();
    //       return refreshTime;
    //     }
    //     return prevCountdown - 1;
    //   });
    // }, 1000);

    // return () => {
    //   clearInterval(timer);
    // };
  }, []);

  const cardItem = realtime_data?.map((data) => {
    if (data.f_tg_pd) {
      selectCard = <DoubleDataCard data={data} />;
    } else {
      selectCard = <DefaultCard data={data} />;
    }
    // console.log(data)
    return <div key={data.mc_no}>{selectCard}</div>;
  });

  return (
    <div>
      <PageBreadcrumb pageTitle={`NHB : ${process} REALTIME`} />
      <div className="flex flex-row-reverse">
        <div>
          Update : {moment().format("DD-MMM HH:mm")} <span className="text-red-600">(Refresh in {countdown}s)</span>
        </div>
      </div>
      <div className="flex justify-center m-2">
        {/* <CardProd
          title={"BORE"}
          target={summaryData.sum_target}
          actual={summaryData.sum_daily_ok}
          avgCT={summaryData.avg_cycle_t}
          avgOpn={summaryData.avg_opn}
        /> */}
        <Summary
          process={"Bore"}
          tg_pd={summaryData?.sum_target}
          act_pd={summaryData?.sum_daily_ok}
          diff={summaryData?.sum_daily_ok - summaryData?.sum_target}
          avg_ct={summaryData?.avg_cycle_t}
          utl={summaryData?.avg_opn}
        />
      </div>
      <div className="flex flex-wrap gap-y-5 mt-5">{cardItem}</div>

      {/* <div className="flex flex-wrap">
        
        {realtime_data.map((mc) => {
          return (
            <div className="m-2" key={mc.mc_no}>
              <CardMC
                mc_no={mc.mc_no}
                part_no={mc.part_no}
                process={"BORE"}
                target={mc.target_actual}
                actual={mc.prod_ok}
                actual_ng={mc.prod_ng}
                diff_actual={mc.diff_prod}
                target_ct={mc.target_ct}
                actual_ct={mc.cycle_t}
                diff_ct={mc.diff_ct}
                yield_target={mc.target_yield}
                yield_rate={mc.yield_rate}
                opn={mc.opn}
                status={mc.status_alarm}
              />
            </div>
          );
        })}
      </div> */}
    </div>
  );
}

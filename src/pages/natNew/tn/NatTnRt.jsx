import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import moment from "moment";
import MasterRtPage from "../../../components/redesign/realtime/MasterRtPage";
import DefaultCardCombine from "../../../components/redesign/combine/DefaultCardCombine";
import DoubleDataCardCombine from "../../../components/redesign/combine/DoubleDataCardCombine";
import DoubleDataCard from "../../../components/redesign/realtime/DoubleDataCard";
import DefaultCard from "../../../components/redesign/realtime/DefaultCard";
import { LOCAL_URL, TWN_URL } from "../../../constance/constance";
import Swal from "sweetalert2";
import Loading from "../../../components/common/Loading";

export default function NatTnRt() {
  const isFirstLoad = useRef(true);
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSourse] = useState([]);
  const [dataSummary, setdataSummary] = useState({
    sum_target: 0,
    sum_daily_ok: 0,
    avg_cycle_t: 0,
    avg_utl: 0,
  });
  let timeCounter = 0;

  // const dataSource = Array.from({ length: 2 }).map((_, i) => ({
  //   mc_no:`TB0${i+1}`,
  //   part_no:"1R-830X10ZZSD718MTTP93",
  //   tg_pd:"10,234",
  //   act_pd:"7,000",
  //   diff_pd:"-3,234",
  //   // drop:"20",
  //   act_ct:"1.37",
  //   diff_ct:"-0.03",
  //   act_ct_2:"1.37",
  //   diff_ct_2:"-0.03",
  //   tg_utl:"100",
  //   curr_utl:"100",
  //   // tg_yield:"100",
  //   // curr_yield:"80",
  //   status_alarm:"RUNNING",
  // }));

  // const dataSourcembr = Array.from({ length: 2 }).map((_, i) => ({
  //   mc_no:`MBR0${i+1}`,
  //   part_no:"1R-830X10ZZSD718MTTP93",
  //   f_tg_pd:"10,234",
  //   f_act_pd:"7,000",
  //   f_diff_pd:"-3,234",
  //   f_act_ct:"1.37",
  //   f_diff_ct:"-0.03",
  //   f_tg_utl: "100",
  //   f_curr_utl: "80",
  //   f_tg_yield: "100",
  //   f_curr_yield: "80",
  //   f_status_alarm:"RUNNING",
  //   s_tg_pd:"10,123",
  //   s_act_pd:"8,000",
  //   s_diff_pd:"-2,123",
  //   s_tg_utl: "100",
  //   s_curr_utl: "80",
  //   s_act_ct:"1.02",
  //   s_diff_ct:"-0.03",
  //   s_tg_yield: "100",
  //   s_curr_yield: "80",
  //   s_status_alarm:"RUNNING",
  // }));

  async function fetchData() {
    if (isFirstLoad.current) {
      setLoading(true);
    }
    try{
      const response1 = await axios.get(`${TWN_URL}/nat/tn/tn-realtime/machines`, {
        headers: {
          "Cache-Control": "no-cache",
          Pragma: "no-cache",
          Expires: "0",
        },
      });
      console.log(response1.data.data)
      setDataSourse(response1.data.data);
      setdataSummary(response1.data.resultSummary);
      if (isFirstLoad.current) {
        setLoading(false);
        isFirstLoad.current = false;
      }
    }
    catch (error) {
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
  }

  useEffect(() => {
    fetchData();
    
    setInterval(() => {
      // console.log('time count down',60-(moment().format("ss")), 'time',moment().format("ss"))
      timeCounter = 60 - moment().format("ss");
      if (timeCounter == 60) {
        fetchData();
      }
    }, 1000);
  }, []);
  // console.log(dataSource)
  
  // const cardItem = dataSource.map(data => {
  //   return (
  //     <div key={data.mc_no}>
  //       <DefaultCard data={data}/>
  //     </div>
  //   )
  // })

  // const cardItemmbr = dataSourcembr.map(data => {
  //   return (
  //     <div key={data.mc_no}>
  //       <DoubleDataCard data={data}/>
  //     </div>
  //   )
  // })

  // const [currentPage, setCurrentPage] = useState('realtime');

  // const handleSegmentChange = (value) => {
  //     setCurrentPage(value);
  // }

  // const renderPageContent = () => {
  //     switch (currentPage) {
  //         case 'realtime':
  //             return <MasterRtPage plant_={"nat"} process_={"Turning"} data={dataSource}/>;
  //         case 'history':
  //             return <MasterRtPage plant_={"nht"} process_={"Test"} data={dataSource}/>;
  //         default:
  //             return null;
  //     }
  // }

  return (
    <div>
      {loading && <Loading />}
      <MasterRtPage
        plant_={"nat"}
        process_={"Turning"}
        data={dataSource}
        dataSum={dataSummary}
      />
    </div>
  );
}

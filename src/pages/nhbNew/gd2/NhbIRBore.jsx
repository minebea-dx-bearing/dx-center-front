import React, { useEffect, useRef, useState } from 'react'
import MasterRtPage from '../../../components/redesign/realtime/MasterRtPage'
import moment from 'moment';
import Swal from 'sweetalert2';
import axios from 'axios';
import { BASE_URL, TWN_URL } from '../../../constance/constance';
import DefaultCard from '../../../components/redesign/realtime/DefaultCard';

const process = "2NDINBORE";

export default function NhbIRBore() {
    const isFirstLoad = useRef(true);
    const [loading, setLoading] = useState(false);
    const [dataSource, setDataSourse] = useState([]);
    const [dataSummary, setdataSummary] = useState({
    sum_target: 0,
    sum_daily_ok: 0,
    avg_cycle_t: 0,
    avg_opn: 0,
    });
    let timeCounter = 0;

    async function fetchData() {
        if (isFirstLoad.current) {
          setLoading(true);
        }
        try{
          const response1 = await axios.get(`${BASE_URL}/nat/gd/${process}-realtime/get_data_realtime`, {
            headers: {
              "Cache-Control": "no-cache",
              Pragma: "no-cache",
              Expires: "0",
            },
          });
          console.log(response1.data.data.data)
          setDataSourse(response1.data.data.data);
          setdataSummary(response1.data.data.resultSummary);
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


  //   const dataSource = Array.from({ length: 2 }).map((_, i) => ({
  //   mc_no:`TB0${i+1}`,
  //   part_no:"1R-830X10ZZSD718MTTP93",
  //   target_actual:"10,234",
  //   prod_ok:"7,000",
  //   diff_prod:"-3,234",
  //   // drop:"20",
  //   ng: "10",
  //   cycle_t:"1.37",
  //   diff_ct:"-0.03",
  //   // act_ct_2:"1.37",
  //   // diff_ct_2:"-0.03",
  //   tg_utl:"100",
  //   curr_utl:"100",
  //   // tg_yield:"100",
  //   // curr_yield:"80",
  //   status_alarm:"RUNNING",
  // }));
  //   const cardItem = dataSource.map(data => {
  //   return (
  //     <div key={data.mc_no}>
  //       <DefaultCard data={data}/>
  //     </div>
  //   )
  // })

  return (
    // <div>
    //   {cardItem}
    // </div>
    <MasterRtPage plant_={"nhb"} process_={"I/R Bore"} data={dataSource} dataSum={dataSummary}/>
  )
}

import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import Swal from 'sweetalert2';
import MasterRtPage from '../../../components/redesign/realtime/MasterRtPage';
import { NHB_TN_URL, TWN_URL } from '../../../constance/constance';
import moment from 'moment';

export default function NhbTnRt() {
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
      const response1 = await axios.get(`${NHB_TN_URL}/nhb/tn/tn-realtime/machines`, {
        headers: {
          "Cache-Control": "no-cache",
          Pragma: "no-cache",
          Expires: "0",
        },
      });
      console.log(response1.data.data)
      setDataSourse(response1.data.data);
      setdataSummary(response1.data.resultSummary);
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

  return (
    <MasterRtPage
        plant_={"nhb"}
        process_={"Turning"}
        data={dataSource}
        dataSum={dataSummary}
    />
  )
}

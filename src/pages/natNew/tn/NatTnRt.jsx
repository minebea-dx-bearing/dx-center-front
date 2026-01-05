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
      timeCounter = 60 - moment().format("ss");
      if (timeCounter == 60) {
        fetchData();
      }
    }, 1000);
  }, []);

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

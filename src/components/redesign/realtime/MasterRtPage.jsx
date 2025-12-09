import React, { useState } from "react";
import { useLocation } from "react-router";
import { useNavigate } from "react-router-dom";
import { Segmented } from "antd";
import moment from "moment";
import DefaultHeader from "../../layouts/DefaultHeader";
import BreadCrumbs from "../BreadCrumbs";
import Summary from "./Summary";
import DefaultCard from "./DefaultCard";
import DoubleDataCard from "./DoubleDataCard";

export default function MasterRtPage({ plant_, process_, data, dataSum }) {
  const location = useLocation();
  const navigate = useNavigate();
  let [countDown, setCountDown] = useState();
  let selectCard = "";
  // console.log(location.pathname)
  // console.log(moment().format("ss"));

  const [segmented, setSegmented] = useState("Realtime");

  const cardItem = data.map((data) => {
    if (data.f_tg_pd) {
      selectCard = <DoubleDataCard data={data} />;
    } else {
      selectCard = <DefaultCard data={data} />;
    }
    // console.log(data)
    return <div key={data.mc_no}>{selectCard}</div>;
  });

  const setHistoryPath = location.pathname.replace("realtime","history")

  // console.log(setHistoryPath)

  const changeState = (value) => {
    // console.log(value)
    setSegmented(value);
    if(value === "history"){
      navigate(setHistoryPath, {
        state:{
          rtPath:location.pathname,
          plant:plant_,
        }
      })
    }
  }

  setInterval(() => {
    // console.log('time count down',60-(moment().format("ss")), 'time',moment().format("ss"))
    setCountDown(60-(moment().format("ss")))
  }, 1000);
  // console.log(countDown)

  return (
    <div>
      <DefaultHeader plant={plant_}/>
      <BreadCrumbs />
      <div className="flex justify-center items-baseline -mt-8 mb-8">
        <Segmented
          size="large"
          shape="round"
          options={[{label:"Realtime", value:"realtime"}, 
                    {label:"History", value:"history"}]}
          onChange={changeState}
        />
      </div>
      <div className="flex justify-end items-center -mt-17 mb-5 mr-5 text-lg">
        <h1 >Update: {moment().format("DD-MMM HH:mm")} <span className="text-red-500">(Refresh in {countDown}s)</span></h1>
      </div>
      {/* <TimeCounter/> */}
      {segmented === "Realtime" ? (
        <>
          <Summary
            process={process_}
            tg_pd={dataSum.sum_target}
            act_pd={dataSum.sum_daily_ok}
            diff={dataSum.sum_daily_ok - dataSum.sum_target}
            avg_ct={dataSum.avg_cycle_t}
            utl={dataSum.avg_opn}
          />
          <div className="flex flex-wrap gap-y-5 mt-5">{cardItem}</div>
        </>
      ) : ("")}
    </div>
  );
}

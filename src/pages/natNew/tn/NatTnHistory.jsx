import React from 'react'
import { useLocation } from "react-router";
import { useNavigate } from 'react-router-dom';
import BreadCrumbs from '../../../components/redesign/BreadCrumbs';
import { Segmented, DatePicker, Select, Form, Button } from "antd";
import MasterHistory from '../../../components/redesign/history/MasterHistory';
import Loading from '../../../components/common/Loading';

export default function NatTnHistory() {
    // // console.log(path)
    // const navigate = useNavigate();
    // const location = useLocation();
    // const {RangePicker} = DatePicker;
    // const data = location.state
    // // console.log(data.rtPath)
    // const options = Array.from({ length: 10 }).map((_, i) => ({
    //   label: i,
    //   value: i,
    // }));
    
    // const changeState = (value) => {
    //     // console.log(value)
    //     if(value === "realtime"){
    //         navigate(data.rtPath)
    //     }
    //   }

    // const handleDateChange = (date, dateString) => {
    //   console.log(dateString)
    // }

    // const handleMCTypyChange = (value) => {
    //   console.log(value)
    // }

    // const handleMCNoChange = (value) => {
    //   console.log(value)
    // }

    // const onFinish = (value) => {
    //   console.log(value)
    // }
  
    return (
      <div>
        <MasterHistory/>
      </div>
    )
}

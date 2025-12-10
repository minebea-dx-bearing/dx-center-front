import React from 'react'
import { Link, useLocation } from "react-router";
import { useNavigate } from 'react-router-dom';
import DefaultHeader from '../../../components/layouts/DefaultHeader';
import BreadCrumbs from '../../../components/redesign/BreadCrumbs';
import { Segmented } from "antd";

export default function NatTnHistory() {
    // console.log(path)
    const navigate = useNavigate();
    const location = useLocation();

    const data = location.state
    console.log(data.rtPath)

    const changeState = (value) => {
        // console.log(value)
        if(value === "realtime"){
            navigate(data.rtPath)
        }
      }
  
    return (
      <div>
        <DefaultHeader plant={data.plant}/>
        <BreadCrumbs/>
        <div className="flex justify-center items-baseline -mt-8 mb-8">
            <Segmented
                size="large"
                shape="round"
                value="history"
                options={[{label:"Realtime", value:"realtime"}, 
                        {label:"History", value:"history"}]}
                onChange={changeState}
            />
        </div>
      </div>
    )
}

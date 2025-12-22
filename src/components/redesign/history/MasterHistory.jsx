import React, { useState } from 'react'
import { useLocation } from "react-router";
import { useNavigate } from 'react-router';
import BreadCrumbs from '../BreadCrumbs'
import { Segmented, Form, DatePicker, Select, Button } from 'antd'
import TotalProdDaily from './TotalProdDaily';
import dayjs from "dayjs";

export default function MasterHistory() {
  const DATE_FORMAT = 'DD-MMM-YY';
  const navigate = useNavigate();
  const location = useLocation();
  const [form] = Form.useForm();
  const {RangePicker} = DatePicker;
  const realtimeLocation = location.state
  const today = dayjs();
  const lastSevenDay = dayjs().subtract(7, 'day');
  const [date, setDate] = useState([lastSevenDay, today]);
  const [formData, setFormData] = useState([
      {date: [lastSevenDay.format("YYYY-MM-DD"), today.format("YYYY-MM-DD")], 
      mc_type: "All", 
      mc_no:"All"}])

  const options = Array.from({ length: 10 }).map((_, i) => ({
    label: "Line "+ i,
    value: "Line "+ i,
  }));
  
  // change to realtime page
  const changeState = (value) => {
      // console.log(value)
      if(value === "realtime"){
          navigate(realtimeLocation.rtPath)
      }
    }

  const onFinish = (value) => {
    setFormData(value)
  }
  // console.log(formData)

  return (
    <div>
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
        <Form 
        form={form}
        className='flex items-center justify-center gap-x-5' 
        initialValues={{date: [lastSevenDay, today]}}
        onFinish={onFinish}>
            <Form.Item name={"date"}>
              <RangePicker 
              format={DATE_FORMAT}
              />
            </Form.Item>
            <Form.Item className='w-60' name={"mc_type"}>
              <Select
              mode="multiple"
              allowClear
              style={{ width: '100%' }}
              placeholder="Please select M/C Line"
              options={options}
              />
            </Form.Item>
            <Form.Item className='w-60' name={"mc_no"}>
              <Select
              mode="multiple"
              allowClear
              style={{ width: '100%' }}
              placeholder="Please select M/C No."
              options={options}
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
        </Form>
        <TotalProdDaily formData={formData}/>
      </div>
  )
}

import { Card, Table } from 'antd';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import Swal from 'sweetalert2';

export default function RawAssyData() {
  const isFirstLoad = useRef(true);
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSourse] = useState([]);
  const dateOdd = ['01', '02', '03', '04', '05', '06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31', 'Avg', 'Total'];
  const dateEven = ['01', '02', '03', '04', '05', '06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30', 'Avg', 'Total'];
  
  async function fetchData() {
    if (isFirstLoad.current) {
      setLoading(true);
    }
    try{
      const response1 = await axios.get(`http://localhost:8009/nat/assy/report/data`, {
        headers: {
          "Cache-Control": "no-cache",
          Pragma: "no-cache",
          Expires: "0",
        },
      });
      // console.log(response1.data.data[0])
      setDataSourse(response1.data.data[0]);
      if (isFirstLoad.current) {
        setLoading(false);
        isFirstLoad.current = false;
      }
    }
    catch (error) {
      console.log(error)
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
  // console.log(dataSource)

  useEffect(() => {
    fetchData();
  }, []);
  
  const columns = [{
    title: "mc_no",
    dataIndex: "mc_no",
    key: "mc_no",
  },
  {
    title: "date",
    dataIndex: "date",
    key: "date",
  },
  {
    title: "title",
    dataIndex: "title",
    key: "title",
  },
  ...Array.from({ length: 31 }, (_, i) => ({
    title: i + 1,
    dataIndex: String(i + 1).padStart(2, '0'),
    key: String(i + 1),
    align: 'right',
  })),

  ]

  const valuesArray = Object.values(dataSource);
  console.log(valuesArray)

  let finalArr = [];
  const arpTitle = ['RP OK', 'RP NG+', 'RP NG-'];
  const arpData = ['daily_ok', 'ng_pos', 'ng_neg']
  valuesArray.forEach(person => { //4
    // console.log(person);
    let arr = [];
    for(let i=0; i<3; i++){
      let obj = {};
      person.forEach(element => {
        const title = arpTitle[i];
        // const data = arpData[i];
        // console.log(element.data);
        obj.mc_no = element.mc_no;
        obj.date = (element.date);
        obj.title = title;
        for(let j=0; j<dateOdd.length; j++){
          obj[dateOdd[j]] = 0;
        }
        
        // console.log(obj);
      });
      arr.push(obj);
    }
    finalArr.push(arr);
    console.log(finalArr);
  });

    return (
      <div>
        <Table
          columns={columns}
          dataSource={finalArr[0]}
          bordered
          scroll={{ x: 'max-content' }}
          pagination={false}
        />
    </div>
  )
}

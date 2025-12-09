import React, {useEffect, useState} from 'react'
import axios from 'axios';
import MasterRtPage from '../../../components/redesign/realtime/MasterRtPage';

export default function NatSLRt() {
  const [dataSource, setDataSourse] = useState([])
  const [dataSummary, setdataSummary] = useState({ sum_target: 0, sum_daily_ok: 0, avg_cycle_t: 0, avg_opn: 0 })
  
  async function fetchData() {
    axios.get('http://10.120.139.25:4005/nat/tn/tn-realtime/machines')
    .then(response => {
      // console.log(response.data);
      setDataSourse(response.data.data)
      setdataSummary(response.data.resultSummary);
    })
    .catch(error => {
      console.error('There was a problem with the Axios request:', error);
    });
  }

  useEffect(() => {
      fetchData()
    }, [])
  return (
    <div><MasterRtPage plant_={"nat"} process_={"Sidelap"} data={dataSource} dataSum={dataSummary}/></div>
  )
}

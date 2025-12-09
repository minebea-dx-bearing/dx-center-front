import Chart from "react-apexcharts";
import moment from "moment";

export default function test() {
  // 1. เตรียมข้อมูลในรูปแบบของ ApexCharts
  const series = [
    {
      name: "Machine A-01",
      data: [
        {
          x: "MC-01", // ชื่อของแถว
          y: [
            // [เวลาเริ่ม, เวลาจบ]
            moment("2025-10-25 08:00:00").valueOf(),
            moment("2025-10-25 10:30:00").valueOf(),
          ],
          fillColor: "#22c55e", // สีเขียวสำหรับ RUNNING
        },
        {
          x: "MC-01",
          y: [moment("2025-10-25 10:30:00").valueOf(), moment("2025-10-25 11:00:00").valueOf()],
          fillColor: "#a1a1aa", // สีเทาสำหรับ STOP
        },
      ],
    },
    {
      name: "Machine A-02",
      data: [
        {
          x: "MC-01", // ชื่อของแถว
          y: [
            // [เวลาเริ่ม, เวลาจบ]
            moment("2025-10-25 08:00:00").valueOf(),
            moment("2025-10-25 10:30:00").valueOf(),
          ],
          fillColor: "#22c55e", // สีเขียวสำหรับ RUNNING
        },
        {
          x: "MC-01",
          y: [moment("2025-10-25 10:30:00").valueOf(), moment("2025-10-25 11:00:00").valueOf()],
          fillColor: "#a1a1aa", // สีเทาสำหรับ STOP
        },
      ],
    },
  ];

  // 2. ตั้งค่า Option ของชาร์ต
  const options = {
    chart: {
      type: "rangeBar",
      height: 350,
    },
    plotOptions: {
      bar: {
        horizontal: true, // กำหนดให้เป็นแท่งแนวนอน
        barHeight: "50%",
      },
    },
    xaxis: {
      type: "datetime", // บอกว่าเป็นแกนเวลา
    },
    fill: {
      type: "solid",
    },
    legend: {
      position: "top",
    },
    title: {
      text: "Machine Status Timeline (ApexCharts)",
      align: "center",
    },
  };

  return <Chart options={options} series={series} type="rangeBar" height={350} />;
}

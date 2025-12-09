import * as echarts from "echarts";
import ReactECharts from "echarts-for-react";
import moment from "moment";

const MachineStatusTimeline = ({ Arrdata }) => {
  // ----------------------------
  // แปลงข้อมูลสำหรับ ECharts
  // ----------------------------

  const data = Arrdata.map((item) => {
     const start = moment(item.occurred_start).utc().format("YYYY-MM-DD HH:mm:ss");
    const end = moment(item.occurred_end).utc().format("YYYY-MM-DD HH:mm:ss");
    return {
      name: item.alarm_base,
      value: [
        0,
        start,
        end,
        item.duration_seconds,
        item.occurred_start,
        item.occurred_end,
      ],
      itemStyle: { color: item.color },
      // itemStyle: { color: getColor(item.alarm_base) },
    };
  });

  const startDay = new Date(Arrdata[0]?.occurred_start);
  startDay.setHours(7, 0, 0, 0); // เริ่มจาก 07:00
  const endDay = new Date(startDay);
  endDay.setHours(6 + 24, 59, 59, 999); // จบที่ 06:00 วันถัดไป

  // ----------------------------
  // renderItem สำหรับ custom series
  // ----------------------------

  const renderItem = (params, api) => {
    const categoryIndex = api.value(0);
    const start = api.coord([api.value(1), categoryIndex]);
    const end = api.coord([api.value(2), categoryIndex]);
    const height = api.size([0, 1])[1] * 0.6;

    const rectShape = echarts.graphic.clipRectByRect(
      {
        x: start[0],
        y: start[1] - height / 2,
        width: end[0] - start[0],
        height,
      },
      {
        x: params.coordSys.x,
        y: params.coordSys.y,
        width: params.coordSys.width,
        height: params.coordSys.height,
      }
    );

    return (
      rectShape && {
        type: "rect",
        shape: rectShape,
        style: api.style(),
      }
    );
  };

  // ----------------------------
  // Set Option
  // ----------------------------
  const option = {
    title: {
      text: "Machine Status Timeline",
      left: "center",
    },
    tooltip: {
      formatter: (params) => {
        const v = params.value;
        return `
          <b>Status:</b> ${params.name}<br/>
          <b>Start:</b> ${moment(v[4]).utc().format("HH:mm:ss")}<br/>
          <b>End:</b> ${moment(v[5]).utc().format("HH:mm:ss")}<br/>
          <b>Duration:</b> ${v[3]} sec
        `;
      },
    },
    grid: {
      height: 100,
      left: 60,
      right: 40,
      top: 60,
    },
    dataZoom: [
      {
        type: "slider",
        showDataShadow: false,
        top: 200,
        height: 15,
        // bottom: 10,
      },
      { type: "inside" },
    ],
    xAxis: {
      type: "time",
      min: startDay,
      max: endDay,
      axisLabel: {
        formatter: (val) => echarts.format.formatTime("hh:mm", new Date(val)),
      },
    },

    yAxis: {
      data: ["Status"],
    },
    series: [
      {
        type: "custom",
        renderItem,
        itemStyle: { opacity: 0.8 },
        encode: { x: [1, 2], y: 0 },
        data,
      },
    ],
  };

  // ----------------------------
  // 6 Return JSX
  // ----------------------------
  return (
    <div style={{ width: "100%", height: "260px" }}>
      <ReactECharts
        option={option}
        style={{ height: "100%", width: "100%" }}
        notMerge={true}
        lazyUpdate={true}
        theme="light"
      />
    </div>
  );
};

export default MachineStatusTimeline;

import ReactECharts from "echarts-for-react";

export default function ChartDonutPercent({ percent, color }) {
  return (
    <ReactECharts
      option={{
        title: {
          text: `${percent}%`,
          left: "center",
          top: "40%",
          textStyle: {
            fontSize: 30,
            fontWeight: "bold",
            color: "#2c3e50",
          },
        },
        tooltip: {
          show: false,
        },
        legend: {
          show: false,
        },
        series: [
          {
            type: "pie",
            radius: ["60%", "80%"],
            avoidLabelOverlap: true,

            data: [
              {
                value: percent,
                itemStyle: {
                  color: `${color}`,
                },
              },
              {
                value: 100 - percent,
                name: "Blank",
                itemStyle: {
                  color: "#E0E0E0",
                },
                emphasis: {
                  disabled: true,
                },
              },
            ],
            label: {
              show: false,
            },
            labelLine: {
              show: false,
            },
          },
        ],
      }}
      style={{ height: "100%", width: "100%" }}
    />
  );
}

import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";
import styles from "./pricechart.module.css";
const prices = [30, 20, 50, 40, 70, 60];
const dates = [
  "2021-01-01",
  "2021-02-01",
  "2021-03-01",
  "2021-04-01",
  "2021-05-01",
  "2021-06-01",
];

const ApexChart = () => {
  const [chartData] = useState({
    series: [
      {
        name: "STOCK ABC",
        data: prices,
      },
    ],
    options: {
      chart: {
        type: "area",
        height: 350,
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "straight",
      },

      labels: dates,
      xaxis: {
        type: "datetime",
        labels: {
          show: false,
        },
      },
      yaxis: {
        labels: {
          style: {
            colors: "#7C8DB0",
            fontSize: "18px",
          },
        },
      },
      legend: {
        horizontalAlign: "left",
      },
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          type: "vertical",
          opacityFrom: 0.7,
          opacityTo: 0.9,
          stops: [0, 32.81, 100],
          colorStops: [
            {
              offset: 0,
              color: "#D2D1FA",
            },
            {
              offset: 32.81,
              color: "#C3C2F8",
            },
            {
              offset: 100,
              color: "#A5A4F4",
            },
          ],
        },
      },
    },
  });

  return (
    <div className={styles.container}>
      <div className={styles.pricesheader}>
        <h4>Price history</h4>
      </div>
      <div className={styles.chartcontainer}>
        <div id="chart">
          <ReactApexChart
            options={chartData.options}
            series={chartData.series}
            type="area"
            height={200}
          />
        </div>
      </div>
    </div>
  );
};

export default ApexChart;

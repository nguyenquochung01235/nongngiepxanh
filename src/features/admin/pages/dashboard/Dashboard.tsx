import { Col, Row } from "antd";
import React from "react";
import ReactApexChart from "react-apexcharts";
import Card from "../../../home/components/card/Card";

type Props = {};

const Dashboard = (props: Props) => {
  let chart: any = {
    series: [14, 23, 21, 17, 15, 10, 12, 17, 21],
    options: {
      chart: {
        type: "polarArea",
      },
      stroke: {
        colors: ["#fff"],
      },
      fill: {
        opacity: 0.8,
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
  };

  let table_chard: any = {
    series: [
      {
        name: "Inflation",
        data: [2.3, 3.1, 4.0, 10.1, 4.0, 3.6, 3.2, 2.3, 1.4, 0.8, 0.5, 0.2],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "bar",
      },
      plotOptions: {
        bar: {
          borderRadius: 10,
          dataLabels: {
            position: "top", // top, center, bottom
          },
        },
      },
      dataLabels: {
        enabled: true,
        formatter: function (val: any) {
          return val + "%";
        },
        offsetY: -20,
        style: {
          fontSize: "12px",
          colors: ["#304758"],
        },
      },

      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        position: "top",
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        crosshairs: {
          fill: {
            type: "gradient",
            gradient: {
              colorFrom: "#D8E3F0",
              colorTo: "#BED1E6",
              stops: [0, 100],
              opacityFrom: 0.4,
              opacityTo: 0.5,
            },
          },
        },
        tooltip: {
          enabled: true,
        },
      },
      yaxis: {
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        labels: {
          show: false,
          formatter: function (val: any) {
            return val + "%";
          },
        },
      },
      title: {
        text: "Monthly Inflation in Argentina, 2002",
        floating: true,
        offsetY: 330,
        align: "center",
        style: {
          color: "#444",
        },
      },
    },
  };

  return (
    <div className="htx-management-dashboard">
      <Row gutter={16}>
        <Col lg={14} md={14} sm={24} xs={24}>
          <Row gutter={16}>
            <Col lg={12} md={12} sm={24} xs={24}>
              <Card>
                <div>text</div>
                <div>text</div>
                <div>text</div>
                <div>text</div>
              </Card>
            </Col>
            <Col lg={12} md={12} sm={24} xs={24}>
              <Card>
                <div>text</div>
                <div>text</div>
                <div>text</div>
                <div>text</div>
              </Card>
            </Col>
          </Row>
          <br />
          <Row gutter={16}>
            <Col lg={12} md={12} sm={24} xs={24}>
              <Card>
                <div>text</div>
                <div>text</div>
                <div>text</div>
              </Card>
            </Col>
            <Col lg={12} md={12} sm={24} xs={24}>
              <Card>
                <div>text</div>
                <div>text</div>
                <div>text</div>
              </Card>
            </Col>
          </Row>
        </Col>
        <Col lg={10} md={10} sm={24} xs={24}>
          <div className="shadow-wrapper">
            <ReactApexChart
              options={(chart && chart.options) || {}}
              series={chart.series}
              type="polarArea"
              width={350}
            />
          </div>
        </Col>
      </Row>
      <br />
      <Row>
        <Col span={24}>
          <div className="shadow-wrapper">
            <ReactApexChart
              options={table_chard.options}
              series={table_chard.series}
              type="bar"
              height={350}
            />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;

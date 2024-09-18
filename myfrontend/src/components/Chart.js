import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CanvasJSChart } from 'canvasjs-react-charts';

const Chart = () => {
  const [chartData, setChartData] = useState({
    temperature: [],
    humidity: [],
    temp_ds18b20: [],
    ec: [],
    salinity_ppm: [],
    salinity_gl: []
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://ttdtmt.xyz/api/sensor-data/');
        const latestData = response.data[0];

        // Update chart data
        const timestamp = new Date();
        setChartData(prevData => ({
          temperature: [...prevData.temperature, { x: timestamp, y: latestData.temperature }],
          humidity: [...prevData.humidity, { x: timestamp, y: parseFloat(latestData.humidity) }],
          temp_ds18b20: [...prevData.temp_ds18b20, { x: timestamp, y: latestData.temp_ds18b20 }],
          ec: [...prevData.ec, { x: timestamp, y: latestData.ec }],
          salinity_ppm: [...prevData.salinity_ppm, { x: timestamp, y: latestData.salinity_ppm }],
          salinity_gl: [...prevData.salinity_gl, { x: timestamp, y: latestData.salinity_gl }]
        }));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); // Fetch data immediately on mount

    const interval = setInterval(fetchData, 5000); // Fetch data every 5 seconds

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  const options = {
    animationEnabled: true,
    title: {
      text: "Sensor Data"
    },
    axisX: {
      valueFormatString: "HH:mm:ss" // Display time in hours, minutes, and seconds
    },
    axisY: {
      title: "Value",
      suffix: ""
    },
    legend: {
      // cursor: "pointer",
      fontSize: 16,
      itemclick: toggleDataSeries
    },
    toolTip: {
      shared: true
    },
    data: [
      {
        type: "splineArea",
        name: "Nhiệt độ không khí (°C)",
        showInLegend: true,
        yValueFormatString: "#0.##",
        dataPoints: chartData.temperature,
        color: "#228B22" // xanh la 
      },
      {
        type: "splineArea",
        name: "Độ ẩm (%)",
        showInLegend: true,
        yValueFormatString: "# ",
        dataPoints: chartData.humidity,
        color: "#FFD700" // Mau vang
      },
      {
        type: "splineArea",
        name: "Nhiệt độ nước (°C)",
        showInLegend: true,
        yValueFormatString: "#0.## ",
        dataPoints: chartData.temp_ds18b20,
        color: "#20B2AA" // xanh ngoc
      },
      {
        type: "splineArea",
        name: "Độ dẫn điện EC (ms/cm)",
        showInLegend: true,
        yValueFormatString: "#0.##",
        dataPoints: chartData.ec,
        color: "#FF6347" // do hong
      },
      // {
      //   type: "splineArea",
      //   name: "Độ mặn (ppm)",
      //   showInLegend: true,
      //   yValueFormatString: "#0.##",
      //   dataPoints: chartData.salinity_ppm,
      //   color: "#E0FFFF" // Đổi màu chú thích độ mặn ppm thành màu trắng
      // },
      {
        type: "splineArea",
        name: "Độ mặn (g/L)",
        showInLegend: true,
        yValueFormatString: "#0.## ",
        dataPoints: chartData.salinity_gl,
        color: "#7FFF00" // mau do
      }
    ]
  };

  function toggleDataSeries(e) {
    if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
      e.dataSeries.visible = false;
    } else {
      e.dataSeries.visible = true;
    }
    e.chart.render(); // Use e.chart to render the chart

  }

  return (
    <div className="chart-container">
      <CanvasJSChart options={options} />
    </div>
  );
};

export default Chart;

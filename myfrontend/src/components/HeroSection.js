import React from 'react';
import axios from 'axios';
import Chart from './Chart';
import '../App.css';
import './HeroSection.css';

const HeroSection = () => {
  const [sensorData, setSensorData] = React.useState(null);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://ttdtmt.xyz/api/sensor-data/');
        const latestData = response.data[0];
        setSensorData(latestData);
      } catch (error) {
        console.error('Lỗi lấy dữ liệu:', error);
      }
    };

    fetchData(); // Fetch data immediately on mount

    const interval = setInterval(fetchData, 5000); // Fetch data every 5 seconds

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (

    <div className="hero-section">
      <h1>Dữ liệu đo hôm nay:</h1>
      <div className="sensor-data">
        {/* <h1>Dữ liệu đo hôm nay:</h1> */}
        {sensorData ? (
          <table>
            <thead>
              <tr>
                <th>Tham số:</th>
                <th>Giá trị:</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Nhiệt độ không khí (°C)</td>
                <td>{sensorData.temperature}</td>
              </tr>
              <tr>
                <td>Độ ẩm (%)</td>
                <td>{sensorData.humidity}</td>
              </tr>
              <tr>
                <td>Nhiệt độ nước (°C)</td>
                <td>{sensorData.temp_ds18b20}</td>
              </tr>
              <tr>
                <td>Độ dẫn điện EC (ms/cm)</td>
                <td>{sensorData.ec}</td>
              </tr>
              <tr>
                <td>Độ mặn (ppm)</td>
                <td>{sensorData.salinity_ppm}</td>
              </tr>
              <tr>
                <td>Độ mặn (g/L)</td>
                <td>{sensorData.salinity_gl}</td>
              </tr>
            </tbody>
          </table>
        ) : (
          <p>Đang tải dữ liệu...</p>
        )}
      </div>
      <div className="embed-container" dangerouslySetInnerHTML={{
        __html: `
        <iframe width="500" height="400" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" title="Map" src="//www.arcgis.com/apps/Embed/index.html?webmap=414ffa446fbf46dca0193ce20594601c&extent=106.3237,10.3439,106.4072,10.383&home=true&zoom=true&previewImage=false&scale=true&search=true&searchextent=true&disable_scroll=true&theme=light"></iframe>
      `}} />
      <div className="chart-container">
        <Chart />
      </div>
    </div>
  );
};

export default HeroSection;

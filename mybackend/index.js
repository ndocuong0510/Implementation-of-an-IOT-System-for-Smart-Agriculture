const express = require('express'); // load express vào ứng dụng
const mysql = require('mysql');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Cài đặt kết nối cơ sở dữ liệu MySQL
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// Kết nối với cơ sở dữ liệu MySQL
db.connect(err => {
  if (err) {
    console.error('Lỗi kết nối cơ sở dữ liệu:', err);
    return;
  }
  console.log('Đã kết nối với máy chủ MySQL.');
});

// Định nghĩa route để lấy tất cả dữ liệu cảm biến khi người dùng GET địa chỉ
app.get('/api/sensor-data', (req, res) => {
  const query = 'SELECT * FROM sensor_data ORDER BY timestamp DESC';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Lỗi lấy dữ liệu:', err);
      res.status(500).send('Lỗi máy chủ');
      return;
    }
    res.json(results);
  });
});

app.listen(port, () => {
  console.log(`Máy chủ đang chạy tại http://localhost:${port}`);
});

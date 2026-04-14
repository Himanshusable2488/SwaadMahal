const express = require('express');
const cors = require('cors');
require('dotenv').config();

const bookingRoutes = require('./routes/bookings');
const orderRoutes = require('./routes/orders');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Backend is running 🚀');
});

app.use('/api/bookings', bookingRoutes);
app.use('/api/orders',orderRoutes);

const PORT = 5000;

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
});
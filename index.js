const { config } = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');


let cors= require('cors');
const enquiryRouter = require('./app/routes/web/enquiryRoutes');
// Load environment variables from .env file
require('dotenv').config();
let app = express();
app.use(cors());
app.use(express.json());

app.use('/api/website/enquiry',enquiryRouter);


app.get("/", (req, res) => {
  res.send({
    status: true,
    message: "Hello, I'm here!",
  });
}); 



mongoose
  .connect(process.env.DBURL)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(process.env.PORT || 3000, () => {
      console.log(`Server is running on port ${process.env.PORT || 3000}`);
    });
  })
  .catch((err) => {
    console.error('Database connection error:', err.message);
  });

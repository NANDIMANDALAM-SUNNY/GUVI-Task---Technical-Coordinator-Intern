const mongoose = require('mongoose')
require('dotenv').config()

const dburl = process.env.dbConnection;
mongoose.connect(dburl,{ useNewUrlParser: true})
.then(res => console.log(`Database is Connected`),
  err =>  console.log(`Not Connected`) 
);


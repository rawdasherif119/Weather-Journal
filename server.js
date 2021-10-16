// Required packages for app
const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Cors for cross origin allowance
app.use(cors());

//Listen to server
app.listen(process.env.PORT, () => {
    console.log(`listen to server successfully to port : ${process.env.PORT}`)
});
// Initialize the main project folder
app.use(express.static('website'));


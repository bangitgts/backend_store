require('dotenv').config();  
const express = require("express");
const app = express();
const path = require("path");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const route = require("./app/routes");
const dbConnect = require("./config/connectDb.js");
const port = process.env.PORT;
const publicIp = require('public-ip');

//use cors
app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// [USE] parse application/json
app.use(bodyParser.json());
// [USE] Morgan
app.use(morgan("combined"));
dbConnect.connect();
route(app);
app.get("/", (req, res) => {
    const parseIp = (req) =>
    req.headers['x-forwarded-for']?.split(',').shift()
    || req.socket?.remoteAddress ; 
    res.json(parseIp(req));
});

var server = app.listen(port, function() {
    var host = server.address().address
    var port = server.address().port
    console.log("Listening at http://%s:%s", host, port)
});

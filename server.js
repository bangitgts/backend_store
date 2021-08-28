  
const express = require("express");
const app = express();
const path = require("path");
const port = 4000;
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const route = require("./app/routes");
const dbConnect = require("./config/connectDb.js");
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
    res.json("API for Book Store");
});

// app.listen(port, () => {
//     console.log(`Example app listening at http://localhost:${port}`);
// });


var server = app.listen(port, function() {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
});

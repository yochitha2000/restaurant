var express=require('express');
var app=express();
var bodyparser=require('body-parser');
const dbconnection=require('./db_connection/dbConnection');

// All Api url
const restaurant_route=require("./routes/restaurant_route");
const product_route=require("./routes/product_route");


dbconnection()
//body parser for sending & recieving the data in json format
app.use(bodyparser.json());

// for sending and recieving the data via form-data format
app.use(bodyparser.urlencoded());


// Handling routes request
app.use("/restaurant",restaurant_route);
app.use("/product",product_route);


// testing server
app.get('/',(req,res)=>{
    res.send("foobar");
});

const port=process.env.PORT||3003;
app.listen(port,()=>{
    console.log("server started at port:"+port);
});

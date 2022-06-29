const express = require("express");
const http = require("https")
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended:true}));


app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
    
    
});

app.post("/",function(req,res){
 console.log( req.body.cityname)
   const city =  req.body.cityname;
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+ city + "&appid=350b23f02ef922128df783cae875d795&units=metric"
    http.get(url, function (response) {

        // console.log(response.statusCode)
        response.on("data", function (data) {
            const whetherdata = JSON.parse(data)
           const temp = whetherdata.main.temp
           const icon = whetherdata.weather[0].icon 
           console.log(data)
           const imgurl = "http://openweathermap.org/img/wn/ " + icon + "@2x.png"
           res.write("<h1>temperature.com</h1>")
           res.write("temperature in "+ city +" is " + temp)
           res.write("<img src ="+ imgurl +">")
            res.send();
        })
    })
})

app.listen(3000, function (req, res) {
    console.log("server is running.......")

})















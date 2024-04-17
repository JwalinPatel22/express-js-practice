const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res){
    res.sendFile(__dirname+"/index.html")
});

app.post("/", function(req, res){

    const query = req.body.cityName;
    const apiKey = "" //enter your OpenWeatherData api key here;
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" +query+ "&appid=" +apiKey+ "&units=metric";
    
    //making a GET request to the api using HTTPS GET method to get all the data for the location 
    https.get(url, function(response){
        console.log(response.statusCode);

        //retrieving / getting hold of data from the json from the api 
        response.on("data", function(data){
            //storing all the collected data in weatherData variable
            const weatherData = JSON.parse(data);
            const temperature = weatherData.main.temp;
            const description = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imgUrl = "https://openweathermap.org/img/wn/" + icon + "@2x.png"


            //there can only be one res.send method in app methods, however there can be multiple res.write methods
            res.write("<h1> temperature in "+ query +" is " + temperature + " degree celcius </h1>");
            res.write("<h2> the weather is " + description + "</h2>");
            res.write("<img src=" + imgUrl + ">");
            res.send();
        });
    });


});



app.listen(3000, function(){
    console.log("Listening on port 3000");
});

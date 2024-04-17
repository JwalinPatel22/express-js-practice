//jshint esversion:6

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.get('/bmicalculator', function(req, res){
    res.sendFile(__dirname + "/index.html");
});

app.post('/', function(req,res){
    var height = Number(req.body.height);
    var weight = Number(req.body.weight);
    var bmi = weight / (height * height);

    res.send("Your BMI is: " + bmi);

});

app.listen(3000, () => {
    console.log("listening on port 3000");
});
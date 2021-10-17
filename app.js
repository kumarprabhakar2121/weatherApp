const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  const query = req.body.cityName;
  const apiKey = "9003515f4fc4da6aa0fbfaa2889129db";
  const units = "metric";
  const url ="https://api.openweathermap.org/data/2.5/weather?q=" +query +"&appid=" +apiKey +"&units=" +units;

  https.get(url, function (response) {
    console.log(response.statusCode);
    console.log(response.statusMessage);

    response.on("data", function (data) {
      const weatherData = JSON.parse(data);
      console.log(weatherData);
      const temperature = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      console.log(icon);
      const imageUrl = "https://openweathermap.org/img/wn/" + icon + "@4x.png";
      res.write("<p> THe weather is currently " + weatherDescription + ".</p>");
      res.write(
        "<h1>The temperature of " +
          query +
          " is <u> " +
          temperature +
          "</u> degree Celcius. </h1>"
      );
      res.write("<img src=" + imageUrl + "></img>");
      res.send();
    });
  });
});

app.listen(3000, function () {
  console.log("Server running on port 3000!");
});

/* 



*/

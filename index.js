const express = require('express');
const fetch = require('node-fetch');
const app = express();
app.set("view engine","ejs");
app.use(express.static("public"));


app.get('/', async(req, res) => {
    let date = await randomDate(new Date(2012, 0, 1), new Date())
    console.log(date);
    let url = `https://api.nasa.gov/planetary/apod?api_key=k5GAqQW09GS6X9dGsbHEOlvjFewdqYZmkCBWhM6U&date=${date}`;
    let data = await getData(url);
    
    res.render('nasa', {"nasaIMG": data.url});
});

async function getData(url){
    let response = await fetch(url);
    let data     = await response.json();
    return data;
}

app.listen(3000, () => {
   console.log('server started');
});

async function randomDate(start, end) {
  // YYYY-MM-DD FORMAT
    // retrieve random date between 01 Jan 1995 ~ 31 Dec 2021
    let rndYear = Math.floor(Math.random() * (2022 - 1995)) + 1995,
          rndMonth = Math.floor(Math.random() * (13 - 1)) + 1,
          rndDay = Math.floor(Math.random() * (31 - 1)) + 1;

    // convert int to string for api call
    let year = rndYear.toString(),
        month = rndMonth.toString(),
        day = rndDay.toString();

    // format day/month to always contain 2 chars (req for api call)
    if (month.length === 1) {
        month = ('0' + month);
    }
    
    if (day.length === 1) {
        day = ('0' + day);
    }

    return `${year}-${month}-${day}`;
}

// Generate API Key
// Your API key for alexisanchez@csumb.edu is:

// k5GAqQW09GS6X9dGsbHEOlvjFewdqYZmkCBWhM6U
// You can start using this key to make web service requests. Simply pass your key in the URL when making a web request. Here's an example:

// https://api.nasa.gov/planetary/apod?api_key=k5GAqQW09GS6X9dGsbHEOlvjFewdqYZmkCBWhM6U
// For additional support, please contact us. When contacting us, please tell us what API you're accessing and provide the following account details so we can quickly find you:

// Account Email: alexisanchez@csumb.edu
// Account ID: 90e596be-c322-44eb-987f-c633b9e8289e
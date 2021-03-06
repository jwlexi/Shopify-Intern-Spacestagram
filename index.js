// Hello! I used Replit to build my project because I find it very convenient compared to other hosting sites. 
// You can run the website by simply clicking "run" at the top. 
// My Github link is: https://github.com/jwlexi/Shopify-Intern-Spacestagram
// I really loved doing this and would love to build more applications with you guys :)

const express = require('express');
const fetch = require('node-fetch');
const app = express();
app.set("view engine","ejs");
app.use(express.static(__dirname + '/public'));


app.get('/', async(req, res) => {
    let cards = await createCards();
    let moreCards = await createCards();
    let moreCards3 = await createCards();
    res.render('nasa', {"reports": JSON.stringify(cards), "reports2": JSON.stringify(moreCards), "reports3": JSON.stringify(moreCards3)});
});

app.listen(3000, () => {
   console.log('server started');
});

// functions 
async function getData(url){
    let response = await fetch(url);
    let data = await response.json();
    return data;
}

async function randomDate(start, end) {
    // YYYY-MM-DD FORMAT
    // retrieve random date between 01 Jan 1996 ~ 31 Dec 2021
    let rndYear = Math.floor(Math.random() * (2022 - 1996)) + 1996,
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

async function createCard() {
    let date = await randomDate(new Date(1996, 1, 1), new Date())
    let url = `https://api.nasa.gov/planetary/apod?api_key=k5GAqQW09GS6X9dGsbHEOlvjFewdqYZmkCBWhM6U&date=${date}`;
    let data = await getData(url);
    if(String(data.url).includes("youtube") || String(data.url).includes("vimeo") || String(data.url).includes("ustream")){
        card =
        `<div class="col-lg p-2">
            <div class='card shadow' style = "border-radius:2%;">
                <iframe width="420" height="315"
                src="${data.url}">
                </iframe>
                    <div class='card-body'>
                        <h5 class='card-title'>${data.title}</h5>
                        <p class='card-text'>${data.explanation}</p>
                        <p class='card-text'>${data.date}</p>
                    </div>
                <i onClick="like(this)" class="fa fa-thumbs-up"></i>
            </div>
        </div>`;
    }
    else if(String(data.media_type).includes("other")) {
        card =
        `<div class="col-lg p-2">
            <div class='card shadow' style = "border-radius:2%;">
                <p class = "text-center">No image found</p>
                    <div class='card-body'>
                        <h5 class='card-title'>${data.title}</h5>
                        <p class='card-text'>${data.explanation}</p>
                        <p class='card-text'>${data.date}</p>
                    </div>
                <i onClick="like(this)" class="fa fa-thumbs-up"></i>
            </div>
        </div>`;
    }
    else if(String(data.title).includes("undefined") && String(data.url).includes("undefined")) {
        card =
        ``;
    }
    else {
        card =
    `<div class="col-lg p-2">
    <div class='card shadow' style = "border-radius:2%;">
        <img id = "spaceImage" src="${data.url}" class="card-img-top cardsImages" alt="Space Image">
          <div class='card-body'>
            <h5 class='card-title'>${data.title}</h5>
            <p class='card-text'>${data.explanation}</p>
            <p class='card-text'>${data.date}</p>
          </div>
        <i onClick="like(this)" class="fa fa-thumbs-up"></i>
        <button class = "btn getImageLink">Share</button>
        <small class="imageLink text-center" style = "display:none;">
        </small>
    </div>
    </div>`;
    }
    
    return card;
}

async function createCards() {
  cards = [];
  let card = "";
  for (let i = 0; i < 2; i++) {
    card = await createCard();
    cards.push(card);
  }

  return cards;
}

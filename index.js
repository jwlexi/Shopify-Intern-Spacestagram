const express = require('express');
const fetch = require('node-fetch');
const app = express();
app.set("view engine","ejs");
app.use(express.static(__dirname + '/public'));


app.get('/', async(req, res) => {
    let cards = await createCards();
    res.render('nasa', {"reports": JSON.stringify(cards)});
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
    let date = await randomDate(new Date(2012, 0, 1), new Date())
    let url = `https://api.nasa.gov/planetary/apod?api_key=k5GAqQW09GS6X9dGsbHEOlvjFewdqYZmkCBWhM6U&date=${date}`;
    let data = await getData(url);
    let title =  data.title;
    if(String(data.url).includes("youtube")){
        card =
        `<div class="col-lg p-2">
        <div class='card report-card shadow' style = "border-radius:2%;">
        <iframe width="420" height="315"
        src="${data.url}">
        </iframe>
        <div class='card-body'>
        <h5 class='card-title'>${title}</h5>
        <p class='card-text'>${data.explanation}</p>
        <p class='card-text'>${data.date}</p>
        </div>
        <button class = "like-button">Like</button>
        <button class = "generateLink">Generate link for image</button>
        <p style = "display:none" class = "text-center imageLink"></p>
        </div>
        </div>`;
    }
    else if(String(data.url).includes("vimeo")){
        card =
        `<div class="col-lg p-2">
        <div class='card report-card shadow' style = "border-radius:2%;">
        <p class="text-center">${data.url}</p>
        <div class='card-body'>
        <h5 class='card-title'>${title}</h5>
        <p class='card-text'>${data.explanation}</p>
        <p class='card-text'>${data.date}</p>
        </div>
        <button class = "like-button">Like</button>
        <button class = "generateLink">Generate link for image</button>
        <p style = "display:none" class = "text-center imageLink"></p>
        </div>
        </div>`
    }
    else {
        card =
    `<div class="col-lg p-2">
    <div class='card report-card shadow' style = "border-radius:2%;">
        <img src="${data.url}" class="card-img-top cardsImages" alt="Report Image">
          <div class='card-body'>
            <h5 class='card-title'>${title}</h5>
            <p class='card-text'>${data.explanation}</p>
            <p class='card-text'>${data.date}</p>
          </div>
        <button class = "like-button">Like</button>
        <button class = "generateLink">Generate link for image</button>
        <p style = "display:none" class = "text-center imageLink"></p>
    </div>
    </div>`;
    }
    
    return card;
}

async function createCards() {
  cards = [];
  let card = "";
  for (let i = 0; i < 10; i++) {
    card = await createCard();
    cards.push(card);
  }

  return cards;
}

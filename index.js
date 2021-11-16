"use strict";

let deck = {}; //spara ner den man hämta till deck
const Cardsdiv = document.getElementById("cardsdiv");
const drawCard = document.getElementById("drawCard");
const h = document.querySelector(".H");
const l = document.querySelector(".L");
const reset=document.querySelector(".r")
const game = document.querySelector(".game");
const lose = document.querySelector(".lose");
const win = document.querySelector(".win");
const draw=document.querySelector(".draw")
let start;
let value;

//hämta API
//skapa en funktion getDesk
async function getDeck() {
  //skapa en variabel res och vänta på hämtade filer
  const res = await fetch(
    " https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
  );
  //skapa variabel data och lägger till hämtade filer till data
  const data = await res.json();
  //lägger till hämtade filer till data
  console.log(data);
  deck = data;
  //skriver ut
  console.log(deck);
}
getDeck();

//dra ett kort
//hämta knapp för att dra ut kort



drawCard.addEventListener("click", async () => {
  //vänta på att häm
  const rest = await fetch(
    //backstick används om du vill har med variabel
    `https://deckofcardsapi.com/api/deck/${deck.deck_id}/draw/?count=1`
  );
  //vänta på
  const data = await rest.json(); //lägger till hämtade sida till data
  switch (data.cards[0].value) {
    case "ACE":
      data.cards[0].value = 14;
      break;
    case "KING":
      data.cards[0].value = 13;
      break;
    case "QUEEN":
      data.cards[0].value = 12;
      break;
    case "JACK":
      data.cards[0].value = 11;
      break;
    default:
      data.cards[0].value = Number(data.cards[0].value);
  }
  const img = document.createElement("img");
  //array
  img.src = data.cards[0].image;
  img.alt = data.cards[0].value;
  //koppla img med cardsiv
  Cardsdiv.appendChild(img);
  drawCard.classList.add("inv");
  h.classList.remove("inv");
  l.classList.remove("inv");
  start=data.cards[0].value;  
 

  console.log(start)
  console.log(data.cards[0].value)
});

h.addEventListener("click", async function () {
  const rest = await fetch(
    `https://deckofcardsapi.com/api/deck/${deck.deck_id}/draw/?count=1`
  );
  const data = await rest.json();
  const img = document.createElement("img");
  img.src = data.cards[0].image;
  img.alt = data.cards[0].value;
  Cardsdiv.appendChild(img);
  switch (data.cards[0].value) {
    case "ACE":
      data.cards[0].value = 14;
      break;
    case "KING":
      data.cards[0].value = 13;
      break;
    case "QUEEN":
      data.cards[0].value = 12;
      break;
    case "JACK":
      data.cards[0].value = 11;
      break;
    default:
      data.cards[0].value = Number(data.cards[0].value);
  }
  value=data.cards[0].value;
  
  if(start<value){
    game.classList.add("inv")
    lose.classList.add("inv")
    draw.classList.add("inv")
    win.classList.remove("inv")

  }
  else if(start>value){
    game.classList.add("inv");
    win.classList.add("inv")
    draw.classList.add("inv")
    lose.classList.remove("inv")
  }
  else if(start==value){
    game.classList.add("inv")
    win.classList.add("inv")
    lose.classList.add("inv")
    draw.classList.remove("inv")

  }
  h.classList.add("inv")
  l.classList.add("inv")
 
});

l.addEventListener("click", async function () {
  const rest = await fetch(
    `https://deckofcardsapi.com/api/deck/${deck.deck_id}/draw/?count=1`
  );
  const data = await rest.json();
  const img = document.createElement("img");
  
  switch (data.cards[0].value) {
    case "ACE":
      data.cards[0].value = 14;
      break;
    case "KING":
      data.cards[0].value = 13;
      break;
    case "QUEEN":
      data.cards[0].value = 12;
      break;
    case "JACK":
      data.cards[0].value = 11;
      break;
    default:
      data.cards[0].value = Number(data.cards[0].value);
  }
  value=data.cards[0].value;
  if(start>value){
    game.classList.add("inv")
    lose.classList.add("inv")
    draw.classList.add("inv")
    win.classList.remove("inv")
    
  }
  else if(start<value){
    game.classList.add("inv")
    lose.classList.remove("inv")
    draw.classList.add("inv")
    win.classList.add("inv")
  }
  else if(start==value){
    game.classList.add("inv")
    lose.classList.add("inv")
    draw.classList.remove("inv")
    win.classList.add("inv")
  }
  img.src = data.cards[0].image;
  img.alt = data.cards[0].value;
  Cardsdiv.appendChild(img);

  h.classList.add("inv")
  l.classList.add("inv")

  
});


reset.addEventListener("click", function(){
Cardsdiv.innerHTML="";
drawCard.classList.remove("inv");
win.classList.add("inv");
lose.classList.add("inv");
draw.classList.add("inv");
game.classList.remove("inv");
h.classList.add("inv");
l.classList.add("inv");
//addClass(l,h,draw,lose,win)
});

function addClass(...e) {
  for (let i = 0; i < arguments.length; i++) {
    e[i].classList.add("inv");
  }
}
//ta bort class
function removeClass(...e) {
  for (let i = 0; i < arguments.length; i++) {
    e[i].classList.remove("inv");
  }
}

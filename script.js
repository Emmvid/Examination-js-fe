"use strict";
const url = "https://api.punkapi.com/v2/beers?20";
let shoppingCart = document.getElementsByClassName(".shopping-cart")

let beers = [];
let cart = (localStorage.getItem("data")) || [];


document.addEventListener("DOMContentLoaded", (event) => {
  fetch(url)
  .then(res => {
    return res.json()
  })
  .then(data => {
    console.log(data);

    for(let i=0; i < data.length; i++){
      beers.push(data[i])
    }
    let cardContainer = document.querySelector("#cardContainer")
    let cardContent = `<div class="row my-2">`
    for(let i = 0; i < beers.length; i++){
      if( i % 3 == 0 && i > 0)
      {
        //console.log(i)
        cardContent += `</div> <br>
        <div class"row my-2">`
      }
      cardContent += `<div class="card-group">
      <div class="card mt-4 ml-4 p-3" style="width: 18rem;  ">
      <img class="card-img-top" src="${beers[i].image_url}" style="height: 200px; width: 80px; align-items: center;" alt="Picture of the beer">
      <div class="card-body">
        <h5 class="card-title"> ${beers[i].name + " " + i}</h5>
        <p class="card-text">${beers[i].description}</p>
        <p class="card-text"> Alchol amount: ${beers[i].abv} % </p>
        <h6 class="card-subtitle text-muted text-center">Price: ${Math.floor(Math.random() * (35 - 20) + 20)}:-</h6>
        <div id=${i} class="add btn btn-primary mt-2">Add to cart</div>
      </div>
    </div>
    </div>`
    }
    cardContainer.innerHTML += cardContent;
  })
  .then(() => {
    let addButtons = document.querySelectorAll(".add")
    addButtons.forEach(btn => {
      btn.addEventListener('click', (event) =>{
        cart.push(beers[event.target.id]);
        
        cartNumbers(cart);
        
      })
    })
  })
  .catch((error) => console.log("ERROR" + error));
})
//funktion för att uppdatera det som finns i varukorgen
function reloadCartNumbers () {
  let productNumbers = localStorage.getItem('cartNumbers');

  if (productNumbers) {
    document.querySelector(".cart span").textContent = productNumbers;
  }
}

//Lägger till det man klickar på i varukorgen
function cartNumbers(cart) {
  let productNumbers = localStorage.getItem('cartNumbers');
  productNumbers = parseInt(productNumbers);
  if(productNumbers) {
    localStorage.setItem('cartNumbers', productNumbers +1);
    document.querySelector(".cart span").textContent = productNumbers +1;
  }
  else {
    localStorage.setItem('cartNumbers', 1);
    document.querySelector(".cart span").textContent  = 1
  }
  setItems(cart)
}

function setItems(cart) {
  let cartItems = localStorage.getItem('productsInCart');
  cartItems = JSON.parse(cartItems);
  console.log("my cartItems are", cartItems)
  if (cartItems != null) {
    cartItems[cart.i].inCart += 1;
  }
  else {
    cart.inCart =1;
    cartItems = {
      [cart.i]: cart
    }
  }
}

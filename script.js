"use strict";
const url = "https://api.punkapi.com/v2/beers?per_page=20";
const itemContainer = document.querySelector(".item-container");

let output = "";

let beers =[]


let getBeer = fetch(url)
  .then((res) => res.json())
  .then((getBeer) => {
    for (let i = 0; i < 20; i++) {
      let beerID = getBeer[i].id;
      let img = getBeer[i].image_url;
      let name = getBeer[i].name;
      let description = getBeer[i].description;
      let alcohol = getBeer[i].abv;
     //beers[getBeer[i].id]= {
     // "name":getBeer[i].name
      //}
      beers[i] = {
       "name": getBeer[i].name, 
       "description": getBeer[i].description,
    }
    

    output += `
        <div class="card-group">
        <div class="card mt-4 ml-4 p-3" style="width: 18rem;  ">
        <img class="card-img-top" src="${img}" style="height: 200px; width: 80px; align-items: center;" alt="Picture of the beer">
        <div class="card-body">
          <h5 class="card-title"> ${name + " " + beerID}</h5>
          <p class="card-text">${description}</p>
          <p class="card-text"> Alchol amount: ${alcohol} </p>
          <div id=${beerID} class="add-to-cart btn btn-primary mt-2">Add to cart</div>
          <a href="#" class="btn btn-primary mt-2">More information</a> 
        </div>
      </div>
      </div>
      
        `;
    }
     itemContainer.innerHTML = output;
  });

document.addEventListener('DOMContentLoaded', (event) => {
    console.log("Domloaded")
    addListeners()
    

})

  function addListeners(beerID) {
    let cart = document.getElementsByClassName('add-to-cart')

    console.log(cart)
      for(let i=0; i <cart.length; i++) {
     cart[i].addEventListener('click', (event) => {
        console.log(event.target)
        
     })
   }
   console.log(this.id)
 }
addListeners();

  function cartNumbers() {
    let productNumbers = localStorage.getItem("cartNumbers")
    console.log(productNumbers)
    localStorage.setItem("cartNumbers", 1)
 }
    
//    console.log(beers)

//   // console.log(beers[parseInt(beerID)])
// //    cart.push(beers[parseInt(beerID)])
   
// //    JSON.stringify(beers)
// //  console.log(Object.keys(beers));
   
//     //JSON.stringify --> för att få unikt id i själva funktionen
//     //JSON.parse() för att göra det tillbaka till ett objekt i själva kassan
//   }


"use strict";
const main = document.querySelector("main");
const loadMoreBeer = document.querySelector("#load-beer");
const url = "https://api.punkapi.com/v2/beers/";
let backToTopButton = document.getElementById("btn-back-to-top");
let wishList;

if (localStorage.getItem("wishList")) {
  wishList = JSON.parse(localStorage.getItem("wishList"));
} else {
  wishList = [];
}

function getBeer(id) {
  fetch(url + id)
    .then((res) => res.json())
    .then((data) => displayBeer(data[0]));
}

function displayBeer(data) {
  const article = document.createElement("article");
  article.classList.add("card");
  article.innerHTML = `
  <img class="image-html" src="${
    data.image_url
  }" style="height: 200px; align-items: center;" alt="Picture of the beer">
  <h2 class="card-title text-center">${data.name}</h2>
  <h4 class="card-text py-1 text-muted">${data.tagline}</h4>
  <p class="card-text py-1"> Food-pairing: ${data.food_pairing} </p>
  <p class="card-text py-1">Alcohol: ${data.abv} % </p> 
  <h6 class="card-subtitle text-muted "> Recommended retail price: ${Math.floor(
    Math.random() * (35 - 20) + 20
  )}:-</h6>
  `;

  const button = document.createElement("button");
  button.classList.add("btn", "btn-info");
  button.innerText = "Add to Wishlist";
  button.addEventListener(
    "click",
    function () {
      wishList.push(data);
      localStorage.setItem("wishList", JSON.stringify(wishList));
      displayWishList();
      button.innerText = "You've added the beer to your wishlist";
    },
    { once: true }
  );
  article.append(button);
  main.append(article);
}

function displayWishList() {
  let list = document.querySelector(".offcanvas-body");
  list.innerHTML = "";

  for (let beer of wishList) {
    const addText = document.createElement("p");
    const removeItem = document.createElement("button");
    addText.innerHTML = `<img src="${beer.image_url}" style="height: 70px;" alt="picture of beer"> ${beer.name} `;
    list.appendChild(addText);
    removeItem.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
    <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
  </svg>`;
    removeItem.classList.add("removeButton");
    addText.appendChild(removeItem);
    removeItem.addEventListener("click", () => {
      removeItem.parentElement.remove();
      wishList.splice(wishList.indexOf(beer), 1);
      localStorage.setItem("wishList", JSON.stringify(wishList));
    });
  }
}

function showMoreBeer(start, end) {
  for (let i = start; i < end; i++) {
    getBeer(i);
  }
}

document.addEventListener("DOMContentLoaded", (event) => {
  showMoreBeer(1, 21);
});

let loadedAmount = 20;

loadMoreBeer.onclick = function () {
  if (loadedAmount >= 100) return;
  showMoreBeer(loadedAmount + 1, loadedAmount + 21);
  loadedAmount += 20;
};

function checkAge() {
  let age = prompt("How old are you?");

  if (age < 18) {
    alert("You can't buy alcohol");
  } else {
    alert("Have fun browsing good beer!");
  }
}

window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    backToTopButton.style.display = "block";
  } else {
    backToTopButton.style.display = "none";
  }

  backToTopButton.addEventListener("click", backToTop);
}

  function backToTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

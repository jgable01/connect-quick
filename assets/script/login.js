/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

  Object-oriented JavaScript
  Joshua Gable

  

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

"use strict";

const emailBox = document.querySelector("#email");
const passwordBox = document.querySelector("#password");
const loginBtn = document.querySelector(".loginBtn");

localStorage.setItem("email", "login@email.com");
localStorage.setItem("password", "password");
console.log(localStorage.getItem("email"));
console.log(localStorage.getItem("password"));

loginBtn.addEventListener("click", login);

function login() {
  const email = emailBox.value;
  const password = passwordBox.value;
  console.log(email, password);
  if (
    email === localStorage.getItem("email") &&
    password === localStorage.getItem("password")
  ) {
    window.location.href = "index.html";
  } else {
    console.log("Incorrect email or password");
  }
}

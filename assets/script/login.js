/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

  Object-oriented JavaScript
  Joshua Gable

  

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

"use strict";

const emailBox = document.querySelector("#email");
const passwordBox = document.querySelector("#password");
const loginBtn = document.querySelector(".loginBtn");
const info = document.querySelector(".info");
const forgotPassword = document.querySelector(".forgotPassword");

localStorage.setItem("email", "login@email.com");
localStorage.setItem("password", "password");
console.log(localStorage.getItem("email"));
console.log(localStorage.getItem("password"));

loginBtn.addEventListener("click", login);
document.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    login();
  }
});

function login() {
  const email = emailBox.value;
  const password = passwordBox.value;
  console.log(email, password);
  if (
    email === localStorage.getItem("email") &&
    password === localStorage.getItem("password")
  ) {
    window.location.href = "./index.html";
  } else {
    info.innerHTML = '<p class="loginFailed" >Incorrect email or password</p>';
  }
}

forgotPassword.addEventListener("click", () => {
  info.innerHTML = '<p class="loginDetails" >Email: login@email.com</p>'
  info.innerHTML += '<p class="loginDetails" >Password: password</p>';
});



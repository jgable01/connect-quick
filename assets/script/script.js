/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

  Object-oriented JavaScript
  Joshua Gable

  

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

"use strict";

const postBtn = document.querySelector(".addPost");
const content = document.querySelector(".content");
const imgUpload = document.querySelector("#imgUpload");
let file = imgUpload.files[0];
const fileResult = document.querySelector(".fileName");
const profileIcon = document.querySelector(".profile");
const textArea = document.querySelector(".post");
const postArea = document.querySelector(".postArea");
const infoMsg = document.querySelector(".infoMsg");
const reader = new FileReader();
const userInfo = document.querySelector(".userInfo");
const exitBtn = document.querySelector(".fa-xmark");
const localUserInfo = document.createElement("p");
const rightBox = document.querySelector(".rightBox");
const leftBox = document.querySelector(".leftBox");
const grid = document.querySelector(".grid");
const dropDown = document.querySelector(".dropdown");
const nav = document.querySelector(".header-nav");
const dropdownNav = document.querySelector(".dropdown-header-nav");
let currentImg;


/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

  Utils

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

// Random User generator is a free open-source API for generating random user
// data. Like 'lorem ipsum', but for people
const api = "https://randomuser.me/api/?nat=ca&results=10";

const options = {
  method: "GET",
  headers: {
    "Content-Type": "application/json; charset=utf-8",
  },
  // CORS (Cross-Origin Resource Sharing) helps JavaScript to make an
  // asynchronous call to an API running in a different domain
  mode: "cors",
};

async function getUser(num) {
  try {
    const response = await fetch(api, options);
    const json = await response.json();
    const user = json.results[num - 1];
    console.log(user);
    console.log(json.results);
    return user;
  } catch (error) {
    console.log(error);
  }
}

/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

  PostBox & header

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

class User {
  #id;
  #name;
  #userName;
  #email;

  constructor(id, name, userName, email) {
    this.#id = id;
    this.#name = name;
    this.#userName = userName;
    this.#email = email;
  }

  get id() {
    return this.#id;
  }

  get name() {
    return this.#name;
  }

  get userName() {
    return this.#userName;
  }

  get email() {
    return this.#email;
  }

  getInfo() {
    return this.id + this.name + this.userName + this.email;
  }
}

class Subscriber extends User {
  #pages;
  #groups;
  #canMonetize;

  constructor(id, name, userName, email, pages, groups, canMonetize) {
    super(id, name, userName, email);
    this.#pages = pages;
    this.#groups = groups;
    this.#canMonetize = canMonetize;
  }

  get pages() {
    return this.#pages;
  }

  get groups() {
    return this.#groups;
  }

  get canMonetize() {
    return this.#canMonetize;
  }

  getInfo() {
    return `ID: ${this.id}, \nName: ${this.name}, \nUsername: ${this.userName},
  \nemail: ${this.email}, \nPages: ${this.pages}, \nGroups: ${this.groups},  
  \nCan monetize: ${this.canMonetize}`;
  }
}

const sub1 = new Subscriber(
  6969,
  "Josh",
  "jgable",
  "jj@email.com",
  10,
  5,
  false
);
textArea.placeholder += sub1.name;

imgUpload.addEventListener("change", () => {
  file = imgUpload.files[0];
  const fileName = file.name;
  const extension = fileName.split(".").pop(); // extension comes after .
  const allowedExtensions = ["jpg", "jpeg", "png", "gif"];
  if (allowedExtensions.includes(extension)) {
    // file type validation via extension
    fileResult.innerText = fileName;
    imgUpload.src = reader.result;
    reader.readAsDataURL(file);
  } else {
    postArea.style.border = "1px solid #ff2846";
    infoMsg.innerHTML = `Invalid file. Please upload ${allowedExtensions.join(
      ", "
    )} files`;
    postArea.appendChild(infoMsg);
  }
});

reader.addEventListener("load", () => {
  //  on load, creates post img element

  currentImg = document.createElement("img");
  currentImg.src = reader.result;
});

function addPost(input) {
  //  function to add post
  let date = new Date();
  let div = document.createElement("div");
  let postInfo = document.createElement("div");
  postInfo.classList.add("postInfo", "flex");
  let dateInfo = document.createElement("p");
  let userInfo = document.createElement("p");
  userInfo.classList.add("flex");
  let img = document.createElement("img");
  img.src = "./assets/img/profile.JPG";
  img.classList.add("flex");
  userInfo.appendChild(img);
  userInfo.innerHTML += sub1.userName;
  dateInfo.innerHTML = date.toDateString();
  postInfo.appendChild(userInfo);
  postInfo.appendChild(dateInfo);
  div.appendChild(postInfo);
  div.classList.add("postBox");
  let pText = document.createElement("p");
  let pImg = document.createElement("p");
  pText.innerHTML = input;
  div.appendChild(pText);
  if (fileResult.innerHTML != "") {
    pImg.appendChild(currentImg);
    div.appendChild(pImg);
  }
  content.appendChild(div);
  grid.appendChild(content);
  clearPost();
}

function clearPost() {
  textArea.value = "";
  fileResult.innerHTML = "";
}

postBtn.addEventListener("click", () => {
  let input = textArea.value.trim();
  try {
    if (input.toString().length >= 1 || fileResult.innerHTML != "") {
      postArea.style.border = "";
      infoMsg.innerHTML = "";
      addPost(input);
    } else {
      postArea.style.border = "1px solid #ff2846";
      infoMsg.innerHTML = "Invalid Input, you cannot post Nothing!";
      postArea.appendChild(infoMsg);
    }
  } catch (err) {
    throw "Invalid input";
  }
});

profileIcon.addEventListener("click", () => {
  localUserInfo.innerHTML = sub1.getInfo().replace(/,/g, "<br>");
  localUserInfo.classList.add("infoLocalUser");
  localUserInfo.classList.add("flex");
  userInfo.classList.add("infotest");
  userInfo.appendChild(localUserInfo);
  userInfo.style.display = "flex";
  postArea.style.display = "none";
  content.style.display = "none";
});

exitBtn.addEventListener("click", () => {
  userInfo.style.display = "none";
  postArea.style.display = "inline";
  content.style.display = "grid";
});

dropDown.addEventListener("click", () => {
  dropdownNav.classList.toggle("active");
  console.log("clicked");
});

getUser(10);
/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

  Left & right Columns

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

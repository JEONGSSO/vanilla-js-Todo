const form = document.querySelector(".js-form"),
   input = form.querySelector("#askName"),
   greeting = document.querySelector(".js-greetings"),
   reset = document.querySelector(".reName"),
   delName = document.querySelector("h4");

const USER_LS = "currentUser",
   SHOWING_CN = "showing";

function changeName() {
   localStorage.removeItem("currentUser")
   delName.textContent = "";  //HTML 비우기
   input.value = "";
   askForName();
}

function saveName(text) {
   localStorage.setItem(USER_LS, text);// 키 밸류
}

function handleSubmit(evt) {
   evt.preventDefault();   //이벤트의 기본동작을 막음
   // console.log(evt);
   const currentValue = input.value;
   paintGreeting(currentValue);
   saveName(currentValue);
}

function askForName() {
   form.classList.add(SHOWING_CN);
   reset.classList.remove(SHOWING_CN);
   form.addEventListener("submit", handleSubmit);
}

function paintGreeting(text) {
   form.classList.remove(SHOWING_CN);   //텍스트 색칠하려면 폼을 숨겨야 함.
   reset.classList.add(SHOWING_CN);
   greeting.classList.add(SHOWING_CN); //클래스 네임(CN) 보여주기 
   greeting.innerText = `Hello ${text}`;
}

function loadName() {
   const currentUser = localStorage.getItem(USER_LS);
   if (currentUser === null) {
      askForName();
   } else { //유저(currentUser)가 존재
      paintGreeting(currentUser); //화면에 찍어줌
   }
}

function init() {
   loadName();
}

init();
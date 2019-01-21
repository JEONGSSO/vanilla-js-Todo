const body = document.querySelector("body");

const IMG_NUMBER = 2;

function handleImageLoad() {
   console.log("finished loading!");
}

function paintImg(imgNumber) {
   const image = new Image();
   image.src = `photos/${imgNumber + 1}.jpg`;
   image.classList.add("bgImage")
   body.appendChild(image);
}

function genRandomBg() {
   const number = Math.floor(Math.random() * IMG_NUMBER);
   return number;
}

function init(){
   const randomNumber = genRandomBg();
   paintImg(randomNumber);
}

init();
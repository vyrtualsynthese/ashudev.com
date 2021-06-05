require('normalize.css/normalize.css')
require('./css/materialize.css')
require('./css/all.css')
require('./css/style.css')
const resume = require('./resources/CV_EN_Multi.pdf')

window.addEventListener("DOMContentLoaded", function(){
  console.log("loaded")
  document.getElementById("wrapper").removeAttribute("hidden");
});

const imgLazy = async () => {
  console.log("async")
  const app = document.querySelectorAll('.avatar > img')
  app.forEach(element => {
    const img = require('./img/profile.jpg');
    element.setAttribute('src', img)
  })
}

imgLazy().then()

const pdf = document.querySelector('.pdf')

pdf.setAttribute('href', resume);

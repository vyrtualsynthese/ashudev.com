require('normalize.css/normalize.css')
require('./css/materialize.css')
require('./css/all.css')
require('./css/style.css')
import profile from /* webpackPreload: true */ './img/profile.jpg';
const resume = require('./resources/CV_EN_Multi.pdf')


// Unhide content when DOM is ready
const unHide = () => document.getElementById("wrapper").removeAttribute("hidden");


if (document.readyState === 'loading') {
  window.addEventListener("DOMContentLoaded", function(){
    unHide()
  });
} else {
  unHide()
}

// Img place holder to avoid moving content on img loads.
const imgLazy = async () => {
  const app = document.querySelectorAll('.avatar > img')
  app.forEach(element => {
    element.setAttribute('src', profile)
  })
}

imgLazy().then()

// Pdf link injecter
const pdf = document.querySelector('.pdf')
pdf.setAttribute('href', resume);

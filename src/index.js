import ('normalize.css/normalize.css')
import ('./css/materialize.css')
import ('./css/all.css')
import ('./css/style.css')
import profile from /* webpackPreload: true */ './img/profile.jpg';
const resume = require('./resources/CV_EN_Multi.pdf')

if (document.readyState === 'complete') {
  console.log('loaded')
  document.getElementById('wrapper').removeAttribute("hidden");
} else {
  console.log('loading load else')
  window.addEventListener('load', function(){
    document.getElementById("wrapper").removeAttribute("hidden");
  });
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

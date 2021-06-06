import ('normalize.css/normalize.css')
import ('./css/materialize.css')
import ('./css/all.css')
import ('./css/style.css')
const imgLazy = () => import (/* webpackPreload: true */'./js/img.js');

// import profile from  './img/profile.jpg';
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

imgLazy().then(({imgLazy}) =>{
  imgLazy().then()
})

// Pdf link injecter
const pdf = document.querySelector('.pdf')
pdf.setAttribute('href', resume);

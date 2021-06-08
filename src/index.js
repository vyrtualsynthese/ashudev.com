import('normalize.css/normalize.css')
import('./css/materialize.css')
import('./css/style.css')
const imgLazy = () => import('./js/img.js')
const fontLoader = () => import('./js/fontLoader.js')
const resume = require('./resources/CV_EN_Multi.pdf')

if (document.readyState === 'complete') {
  document.getElementById('wrapper').removeAttribute('hidden')
} else {
  window.addEventListener('load', function () {
    document.getElementById('wrapper').removeAttribute('hidden')
  })
}

imgLazy().then(({ imgLazy }) => {
  imgLazy().then()
})

fontLoader().then(({ fontLoader }) => {
    fontLoader().then()

})

// Pdf link injecter
const pdf = document.querySelector('.pdf')
pdf.setAttribute('href', resume)

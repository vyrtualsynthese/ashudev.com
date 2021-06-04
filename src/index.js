require('normalize.css/normalize.css')
require('./css/materialize.css')
require('./css/all.css')
require('./css/style.css')

const avatar = document.createElement('img')
const img = require('./img/profile.jpg');
avatar.src = img
avatar.classList.add('responsive-img', 'z-depth-1');
avatar.alt = 'Valentin RONTEIX';

const app = document.querySelectorAll('.avatar')

app.forEach((userItem) => {
  userItem.append(avatar);
});

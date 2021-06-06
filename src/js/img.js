const profile = () => import(/* webpackPreload: true */ '../img/profile.jpg');

// Img place holder to avoid moving content on img loads.
export function imgLazy () {
  return profile().then((img) => {
      const app = document.querySelectorAll('.avatar > img')
      app.forEach(element => {
        element.setAttribute('src', img.default)
      })
  })
}

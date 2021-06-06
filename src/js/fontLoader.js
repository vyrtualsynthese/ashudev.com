const font = () => import (/* webpackPreload: true */'@fortawesome/fontawesome-free/js/brands.min')
const fa = () => import (/* webpackPreload: true */'@fortawesome/fontawesome-free/js/fontawesome.min')

// Img place holder to avoid moving content on img loads.
export function fontLoader () {
  return font().then(fa().then)
}

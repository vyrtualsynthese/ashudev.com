import { library, dom } from '@fortawesome/fontawesome-svg-core'
import { faLinkedinIn, faGithub, faMedium, faDev, faYoutube } from '@fortawesome/free-brands-svg-icons'

// Img place holder to avoid moving content on img loads.
export function fontLoader () {
  library.add(faLinkedinIn, faGithub, faMedium, faDev, faYoutube)

  dom.i2svg()
  return Promise.resolve()
}

import type { MobileInfo } from '../types'

export default function Detail({ brand, model, price, spec }: MobileInfo) {
  return `
    <h1>${brand}</h1>
    <h2>${model}</h2>
    <h3>${price}</h3>
    <h4>${spec}</h4>
  `
}

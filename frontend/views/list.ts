import type { MobileInfo, MobileList } from '../types'

export default function List(mobileData: MobileList) {
  return `
    <h1>List</h1>

    <ul id="mobile-list">
      ${mobileData.map((item) => `<li>${mobileListItem(item)}</li>`).join('')}
    </ul>
    
    ${mobileForm()}
  `
}

export function mobileListItem({ id, brand, model }: MobileInfo): string {
  return `
    <a href="http:#/detail/${id}">${brand + ' ' + model}</a>
    <button class="remove-button" data-id="${id}">REMOVE</button>
  `
}

export function mobileForm(): string {
  return `
    <div>
      <p><input type="text" placeholder="Brand" id="brand" /></p>
      <p><input type="text" placeholder="Model" id="model" /></p>
      <p><input type="text" placeholder="Price" id="price" /></p>
      <p><input type="text" placeholder="Spec" id="spec" /></p>
      <p><button id="add-button">ADD</button></p>
    </div>
  `
}

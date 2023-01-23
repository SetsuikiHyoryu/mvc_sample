import type { MobileInfo } from '../types'

import {
  addMobileModel,
  getMobileListModel,
  removeMobileModel,
} from '../services'
import { list, mobileListItem } from '../views'

export async function listView(): Promise<string> {
  const response = await getMobileListModel()
  return list(response.data)
}

export async function removeMobile(): Promise<void> {
  const nodeMobileList = document.querySelector('#mobile-list')

  function bindEvent() {
    if (nodeMobileList) {
      nodeMobileList.addEventListener('click', handleRemoveButtonClick, false)
    }
  }

  async function handleRemoveButtonClick(event: Event) {
    const target = event.target as HTMLButtonElement
    const className = target.className

    if (className === 'remove-button') {
      const id = target.dataset.id

      if (id) {
        const response = await removeMobileModel(Number(id))
        response.status === 200 && target.parentElement?.remove()
      }
    }
  }

  bindEvent()
}

export async function addMobile(): Promise<void> {
  const nodeMobileList = document.querySelector('#mobile-list')

  const nodeBrand = document.querySelector('#brand') as HTMLInputElement
  const nodeModel = document.querySelector('#model') as HTMLInputElement
  const nodePrice = document.querySelector('#price') as HTMLInputElement
  const nodeSpec = document.querySelector('#spec') as HTMLInputElement

  const nodeAddButton = document.querySelector(
    '#add-button'
  ) as HTMLButtonElement

  function bindEvent(): void {
    nodeAddButton.addEventListener('click', handleAddButtonClick, false)
  }

  async function handleAddButtonClick() {
    if (
      !nodeBrand.value ||
      !nodeModel.value ||
      !nodePrice.value ||
      !nodeSpec.value
    ) {
      alert('Pleas input value.')
      return
    }

    const response = await addMobileModel({
      brand: nodeBrand.value,
      model: nodeModel.value,
      price: nodePrice.value,
      spec: nodeSpec.value,
    })

    if (response.status === 200 && nodeMobileList) {
      createMobileListITem(response.data)
      resetForm()
    }

    function createMobileListITem(mobileInfo: MobileInfo): void {
      const item = document.createElement('li')
      item.innerHTML = mobileListItem(mobileInfo)
      nodeMobileList?.appendChild(item)
    }

    function resetForm(): void {
      nodeBrand.value = ''
      nodeModel.value = ''
      nodePrice.value = ''
      nodeSpec.value = ''
    }
  }

  bindEvent()
}

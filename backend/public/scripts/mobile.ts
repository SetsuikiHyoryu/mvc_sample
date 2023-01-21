// 这里是全局作用域，所以使用立即执行函数避免污染全局
// 需要后需要执行 npx / yarn tsc .\public\scripts\mobile.ts 来生成 js 文件
;(() => {
  const nodeMobileList = document.querySelector('#mobile-list') as HTMLElement

  const nodeBrand = document.querySelector('#brand') as HTMLInputElement
  const nodeModel = document.querySelector('#model') as HTMLInputElement
  const nodePrice = document.querySelector('#price') as HTMLInputElement
  const nodeSpec = document.querySelector('#spec') as HTMLInputElement

  const nodeAddButton = document.querySelector(
    '#add-button'
  ) as HTMLButtonElement

  const init = () => {
    bindEvent()
  }

  function bindEvent() {
    nodeMobileList.addEventListener('click', handleRemoveButtonClick, false)
    nodeAddButton.addEventListener('click', handleAddButtonClick)
  }

  // 删除 mobile
  async function handleRemoveButtonClick(event: Event): Promise<void> {
    const target = event.target as HTMLButtonElement
    const id = target.dataset.id

    if (target.className === 'remove-button' && id) {
      await removeMobile(target, Number(id))
    }
  }

  async function removeMobile(target: HTMLElement, id: Number): Promise<void> {
    const response = await fetch('http://localhost:9090/list/remove_mobile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    })

    if (response.ok) {
      target.parentElement?.remove()
    }
  }

  // 追加 mobile
  async function handleAddButtonClick(event: Event): Promise<void> {
    if (
      !nodeBrand.value.length ||
      !nodeModel.value.length ||
      !nodePrice.value.length ||
      !nodeSpec.value.length
    ) {
      alert('Please input.')
      return
    }

    await addMobile({
      id: -1,
      brand: nodeBrand.value,
      model: nodeModel.value,
      price: nodePrice.value,
      spec: nodeSpec.value,
    })
  }

  async function addMobile(mobileInfo: any): Promise<void> {
    const response = await fetch('http://localhost:9090/list/add_mobile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(mobileInfo),
    })

    if (response.ok) {
      const newItem = await response.json()
      createMobileListITem(newItem)
      resetForm()
    }
  }

  function createMobileListITem(mobileInfo: any): void {
    const item = document.createElement('li')

    item.innerHTML = `
      <a href="http://localhost:9090/detail/${mobileInfo.id}">
        ${mobileInfo.brand + ' ' + mobileInfo.model}
      </a>

      <button class="remove-button" data-id="${mobileInfo.id}">REMOVE</button>
    `

    nodeMobileList.appendChild(item)
  }

  function resetForm(): void {
    nodeBrand.value = ''
    nodeModel.value = ''
    nodePrice.value = ''
    nodeSpec.value = ''
  }

  init()
})()

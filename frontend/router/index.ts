import type { RouteInfo, RouteItem, Routes } from './types'
import type { ViewParameters } from '../types'

import {
  addMobile,
  detailView,
  homeView,
  listView,
  removeMobile,
} from '../controllers'

export default function (selector: string): void {
  const $app = document.querySelector(selector)

  const routes: Routes = [
    { path: '/', view: homeView },
    { path: '/list', view: listView, controllers: [removeMobile, addMobile] },
    { path: '/detail/:id', view: detailView },
  ]

  const init = () => {
    bindEvent()
  }

  async function initControllers(route: RouteItem): Promise<void> {
    if (route.controllers) {
      for (const controller of route.controllers) {
        await controller()
      }
    }
  }

  function bindEvent() {
    window.addEventListener('load', loadView, false)
    // 当哈希型路由切换时，会触发 hashchange
    window.addEventListener('hashchange', loadView, false)
  }

  async function loadView() {
    // location.hash: #/xxx/xxx
    const pathInfo: RouteInfo = getRouteInfo(location.hash)

    const targetRoute: RouteItem | undefined = routes.find((item) => {
      const routeInfo: RouteInfo = getRouteInfo(item.path)
      return routeInfo.viewName === pathInfo.viewName
    })

    if (targetRoute) {
      const routeInfo: RouteInfo = getRouteInfo(targetRoute.path)
      const parameters: ViewParameters = {}

      routeInfo.parameters.forEach((item, index) => {
        parameters[item] = pathInfo.parameters[index]
      })

      $app && ($app.innerHTML = await targetRoute.view(parameters))
      initControllers(targetRoute)
    }
  }

  /**
   * @description 获取路由信息
   * @param hash #/xxx/xxx
   */
  function getRouteInfo(hash: string): RouteInfo {
    // ['detail', ':id', ':name']
    const pathItems = hash
      .substring([...hash][0] === '#' ? 1 : 0)
      .split('/')
      .filter((item) => item !== '')

    // ['id', 'name']
    const parameters = pathItems
      .slice(1)
      .map((item) => item.replaceAll(':', ''))

    return {
      viewName: pathItems[0],
      parameters,
    }
  }

  init()
}

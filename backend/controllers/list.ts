import { response } from 'express'
import type { RequestHandler } from 'express-serve-static-core'

import { listModel } from '../models'

export const viewHandler: RequestHandler = (request, response): void => {
  // 调用模型层 获取 mobile 数据提供给视图层
  const mobileData = listModel.getMobileList()
  // render 查找的目录名默认为 views
  response.render('list', { mobileData })
}

export const removeMobileHandler: RequestHandler = (
  request,
  response
): void => {
  const id: number = request.body.id
  const succeed = listModel.removeMobile(id)
  response.send(succeed && 'Succeed.')
}

export const addMobileHandler: RequestHandler = (request, response): void => {
  const newMobileInfo = listModel.addMobile({ ...request.body })
  response.send(newMobileInfo)
}

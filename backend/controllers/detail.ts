import type { RequestHandler } from 'express-serve-static-core'
import { detailModel } from '../models'

export const viewHandler: RequestHandler = (request, response): void => {
  const id = Number(request.params.id)
  const mobileDetail = detailModel.getMobileDetail(id)

  // render 查找的目录名默认为 views
  mobileDetail && response.render('detail', { mobileDetail })
}

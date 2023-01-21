import { Router } from 'express'
import * as core from 'express-serve-static-core'
import bodyParser from 'body-parser'
import { detailController, listController } from '../controllers'

const router: core.Router = Router()
const jsonParser = bodyParser.json()

router.get('/list', listController.viewHandler)

// 需要使用 jsonParder 中间件处理 json
router.post(
  '/list/remove_mobile',
  jsonParser,
  listController.removeMobileHandler
)

router.post('/list/add_mobile', jsonParser, listController.addMobileHandler)

router.get('/detail/:id', detailController.viewHandler)

export default router

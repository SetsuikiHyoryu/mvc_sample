import express from 'express'
import { join } from 'path'
import router from './router'

const app = express()

// 设置模版引擎
app.set('view engine', 'ejs')
// 设置静态目录以直接通过 uri 访问资源
app.use(express.static(join(__dirname, 'public')))

app.use(router)

app.listen(9090, () => {
  const fontBlue = '\x1b[34m'
  const url = 'http://localhost:9090/'
  console.log('Server served on:', fontBlue + url)
})

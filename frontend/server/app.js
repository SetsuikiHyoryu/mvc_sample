const express = require('express')
const bodyParser = require('body-parser')
const { readFileSync, writeFileSync } = require('fs')
const { resolve } = require('path')

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// CORS 处理
app.all('*', (request, response, next) => {
  response.header('Access-Control-Allow-Origin', '*')
  response.header('Access-Control-Allow-Methods', 'GET,POST')
  next()
})

app.get('/get_mobile_list', (request, response) => {
  const mobileData = getMobileData()
  response.send(mobileData)
})

app.post('/get_mobile_detail', (request, response) => {
  const id = Number(request.body.id)
  const mobileData = getMobileData()
  const mobileDetail = mobileData.find((item) => item.id === id)
  response.send(mobileDetail)
})

app.post('/remove_mobile', (request, response) => {
  const id = Number(request.body.id)
  let mobileData = getMobileData()
  mobileData = mobileData.filter((item) => item.id !== id)

  writeFileSync(
    resolve(__dirname, './data/mobile.json'),
    JSON.stringify(mobileData)
  )

  response.send(request.body.id)
})

app.post('/add_mobile', (request, response) => {
  const mobileData = getMobileData()
  const mobileItem = { ...request.body, id: Date.now() }
  mobileData.push(mobileItem)

  writeFileSync(
    resolve(__dirname, './data/mobile.json'),
    JSON.stringify(mobileData)
  )

  response.send(mobileItem)
})

function getMobileData() {
  const mobileData = JSON.parse(
    readFileSync(resolve(__dirname, './data/mobile.json'), 'utf-8')
  )

  return mobileData
}

app.listen(9091, () => {
  const fontBlue = '\x1b[34m'
  const url = 'http://localhost:9091/'
  console.log('Server served on:', fontBlue + url)
})

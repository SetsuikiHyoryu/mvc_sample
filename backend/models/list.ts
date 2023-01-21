import type { MobileDetail, MobileList } from '../types'

import { readFileSync, writeFileSync } from 'fs'
import { resolve } from 'path'

export function getMobileList(): MobileList {
  const mobileData: MobileList = JSON.parse(
    readFileSync(resolve(__dirname, '../data/mobile.json'), 'utf-8')
  )

  return mobileData
}

export function removeMobile(id: number): boolean {
  try {
    let mobileData = getMobileList()
    mobileData = mobileData.filter((item) => item.id !== id)

    writeFileSync(
      resolve(__dirname, '../data/mobile.json'),
      JSON.stringify(mobileData)
    )

    console.log('remove mobile', id)
    return true
  } catch (error) {
    console.error(error)
    return false
  }
}

export function addMobile(mobileInfo: MobileDetail): MobileDetail | null {
  try {
    const mobileList = getMobileList()
    const newItem = { ...mobileInfo, id: Date.now() }
    mobileList.push(newItem)

    writeFileSync(
      resolve(__dirname, '../data/mobile.json'),
      JSON.stringify(mobileList)
    )

    return newItem
  } catch (error) {
    console.error(error)
    return null
  }
}

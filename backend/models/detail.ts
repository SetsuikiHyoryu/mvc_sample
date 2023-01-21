import type { MobileDetail } from '../types'

import { getMobileList } from './list'

export function getMobileDetail(id: number): MobileDetail | undefined {
  const mobileData = getMobileList()
  return mobileData.find((item) => item.id === id)
}

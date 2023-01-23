import type { MobileInfo, ViewParameters } from '../types'

import { getMobileDetailModel } from '../services'
import { detail } from '../views'

export async function detailView(parameters: ViewParameters) {
  const response = await getMobileDetailModel(parameters)
  return detail(response.data as MobileInfo)
}

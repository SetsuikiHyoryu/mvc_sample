import type { ViewParameters } from '../types'

import axios from 'axios'
import Qs from 'qs'

export async function getMobileDetailModel(parameters: ViewParameters) {
  return axios.post(
    'http://localhost:9091/get_mobile_detail',
    Qs.stringify(parameters)
  )
}

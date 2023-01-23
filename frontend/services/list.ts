import type { MobileInfo } from '../types'

import axios from 'axios'
import Qs from 'qs'

export async function getMobileListModel() {
  return axios.get('http://localhost:9091/get_mobile_list')
}

export async function removeMobileModel(id: number) {
  return axios.post('http://localhost:9091/remove_mobile', Qs.stringify({ id }))
}

export async function addMobileModel(mobileInfo: MobileInfo) {
  return axios.post(
    'http://localhost:9091/add_mobile',
    Qs.stringify(mobileInfo)
  )
}

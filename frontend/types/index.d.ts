export interface ViewParameters {
  [property: string]: string
}

export interface MobileInfo {
  id?: number
  brand: string
  model: string
  price: string
  spec: string
}

export type MobileList = MobileInfo[]

import type { ViewParameters } from '../../types'

export interface RouteItem {
  path: string
  view: (parameters: ViewParameters) => string | Promise<string>
  controllers?: Function[]
}

export type Routes = RouteItem[]

export interface RouteInfo {
  viewName: string
  parameters: string[]
}

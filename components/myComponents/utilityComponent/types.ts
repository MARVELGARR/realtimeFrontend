import type { ReactNode } from "react"

export interface MenuItem {
  id: string
  label: string
  view?: string
  icon?: ReactNode
}

export interface View {
  title: string
  items: MenuItem[]
}

export interface Views {
  [key: string]: View
}

export interface User {
  id: string
  name: string
  selected: boolean
}


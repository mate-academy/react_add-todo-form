/// <reference types="react-scripts" />

export interface User {
  id: number
  name: string
  username: string
  email: string
}

export interface Todo {
  id: number
  title: string
  description?: string
  completed: boolean
  userId: number
  user: User | null
}

import { User } from './User';

export interface PreparedTodo {
  title: string
  completed: boolean
  user: User
}

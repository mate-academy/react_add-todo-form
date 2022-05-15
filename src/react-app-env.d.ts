/// <reference types="react-scripts" />
interface User {
  id: number,
  name: string,
  username: string,
  email: string,
}

interface Todo {
  userId?: number,
  id: number,
  title: string,
}

interface TodoWithUser extends Todo {
  user?: User,
}

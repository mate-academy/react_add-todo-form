/// <reference types="react-scripts" />

interface User {
  id: numder,
  name: string,
  username: string,
  email: string,
}

interface TodoWithUser {
  userId: number,
  id: number,
  title: string,
  completed: boolean,
  user: User | null,
}

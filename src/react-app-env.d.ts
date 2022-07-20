interface Todo {
  id: number,
  title: string,
  userId: number | null,
  completed: boolean,
  user: User | null,
}

interface User {
  name: string,
  email: string,
}

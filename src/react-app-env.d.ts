interface User {
  id: number,
  name: string,
  username: string,
  email: string,
}

interface Todo {
  userId: number,
  id: number,
  title: string,
  completed: boolean,
}

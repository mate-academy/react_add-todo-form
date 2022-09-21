export interface TodoWithPerson {
  id: number,
  title: string,
  completed: boolean,
  userId: number,
  user: Person | null,
}

export interface Person {
  id: number,
  name: string,
  username: string,
  email: string,
}

export interface Todo {
  id: number,
  title: string,
  completed: boolean,
  userId: number,
}

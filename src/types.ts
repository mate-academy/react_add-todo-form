export interface TodoFromServer {
  id: number,
  title: string,
  completed: boolean,
  userId: number,
}

export interface UserFromServer {
  id: number,
  name: string,
  username: string,
  email: string,
}

export interface Todo extends TodoFromServer {
  user: UserFromServer | undefined,
}

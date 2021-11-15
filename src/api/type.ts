export interface Todo {
  userId: number,
  id: number,
  title: string,
  completed: boolean,
}

export interface State {
  userId: number | undefined,
  title: string,
  userName: string | undefined,
  validationTitle:boolean,
  validationUserName: boolean,
  todos: Todo[],
}

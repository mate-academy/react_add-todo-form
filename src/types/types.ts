export interface User {
  id: number,
  name: string,
  username: string,
  email: string
}

export interface Todo {
  id: number,
  title: string,
  completed: boolean,
  userId: number,
}

export type FindUser = (arr: User[], id: number) => User;

export interface Completed {
  id: number,
  title: string,
  completed: boolean,
  userId: number,
  user: User,
}

export type OnSubmit = (todo: Completed) => void;

export type SetTodo = (Todo:Completed) => Completed [];

export type MakeTodo = (todos: Todo[], users: User []) => Completed[];

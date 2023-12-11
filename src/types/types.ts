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

export type FindUser = (users: User[], id: number) => User | null;

export interface Completed {
  id: number,
  title: string,
  completed: boolean,
  userId: number,
  user: User | null,
}

export type OnSubmit = (todo: Completed) => void;

export type SetTodo = (Todo:Completed) => Completed [];

export type MakeTodo = (todos: Todo[], users: User []) => Completed[];

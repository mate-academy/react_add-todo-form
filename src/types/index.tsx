export interface User {
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
  user: User | null;
}

export enum FormError {
  userFieldIsRequired = 'Please choose a user',
  titleFieldIsRequired = 'Please enter a title',
}

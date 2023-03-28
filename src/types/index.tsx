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

export enum Error {
  UserAbsence = 'Please choose a user',
  TitleAbsence = 'Please enter a title',
}

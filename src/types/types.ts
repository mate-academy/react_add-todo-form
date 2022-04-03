export type MyDate = {
  [key: string]: string;
};

export interface Todo {
  userId: number;
  title: string;
  completed: boolean;
  id?: number;
}

export interface User {
  name: string;
  email: string;
  website: string;
}

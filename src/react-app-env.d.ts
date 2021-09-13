/// <reference types="react-scripts" />

interface Todo {
  id?: number;
  uuid: string;
  userId: number;
  title: string;
  completed: boolean;
  user: User | null;
}

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

interface UserCompany {
  name: string;
  catchPhrase: string;
  bs: string;
}

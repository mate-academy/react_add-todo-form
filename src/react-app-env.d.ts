/// <reference types="react-scripts" />

interface Todo {
  // [x: string]: number;
  id: number,
  title: string,
  completed: boolean,
  userId: number,
}

interface Users {
  id: number,
  name: string,
  username: string,
  email: string,
}

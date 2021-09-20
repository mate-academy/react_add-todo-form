/// <reference types="react-scripts" />

interface User {
  id: number;
  name: string;
  username: string;
}

interface Todo {
  uuid: string;
  id: number | string;
  title: string;
  user: User | null;
}

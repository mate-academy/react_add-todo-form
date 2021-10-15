/// <reference types="react-scripts" />

interface Todo {
  title: string;
  id: number;
  userId: number | null;
}

interface User {
  id: number,
  name: string,
  username: string,
  email: string,
  phone: string,
  website: string,
}

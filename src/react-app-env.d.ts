/// <reference types="react-scripts" />

interface TodosFromServer {
  userId?: number,
  id: number,
  title: string,
  completed: boolean,
}

interface Todo {
  userId?: number,
  id: number,
  title: string,
  completed: boolean,
  user?: User | null,
}

interface User {
  id: number,
  name: string,
  email: string,
}

type Props = {};

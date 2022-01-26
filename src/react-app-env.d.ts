/// <reference types="react-scripts" />

interface User {
  id: number,
  name: string,
  email: string,
}

interface Todo {
  userId?: number,
  id: number,
  title: string,
  completed: boolean,
  user: User | null,
}

interface TodosFromServer {
  userId?: number,
  id: number,
  title: string,
  completed: boolean,
}

type State = {
  title: string,
  name: string,
  todosFromServer: TodosFromServer[],
  invalidTitle: boolean,
  invalidName: boolean,
};

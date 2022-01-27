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
  user: User | null,
}

type State = {
  name: string;
  title: string;
  invalidTitle: boolean;
  invalidName: boolean;
  todosFromServer: TodosFromServer[];
};

interface User {
  id: number,
  name: string,
  email: string,
}

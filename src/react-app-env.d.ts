/// <reference types="react-scripts" />

interface Todo {
  id: number,
  title: string,
  completed: boolean,
  userId: number | null,
  user: User | null,
}

type TodoInfoTitle = {
  title: string
};

type TodosItems = {
  todosItems: Todo[],
};

interface User {
  id: number,
  name: string,
  email: string,
}

interface UserInfoType {
  name: string;
  email: string,
}
